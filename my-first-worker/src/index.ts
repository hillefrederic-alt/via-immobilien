/**
 * Via Immobilien - Kontaktformular Worker
 *
 * Empfängt Formular-Daten, validiert sie und sendet E-Mails.
 * Verwendet Resend für den E-Mail-Versand.
 *
 * Features:
 * - Rate Limiting (max 5 Anfragen pro IP pro Stunde)
 * - Honeypot Spam-Schutz
 * - Bestätigungs-E-Mail an Absender
 */

export interface Env {
	RESEND_API_KEY: string;
	TO_EMAIL: string;
	ALLOWED_ORIGIN: string;
	TURNSTILE_SECRET_KEY: string;
}

interface FormData {
	name: string;
	email: string;
	phone?: string;
	message: string;
	consent: string;
	contact_number?: string; // Honeypot field
	'cf-turnstile-response'?: string; // Turnstile token
}

// In-memory rate limit store (resets on worker restart, but good for basic protection)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// CORS Headers
		const corsHeaders = {
			'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		};

		// Handle CORS preflight
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		// Only accept POST requests
		if (request.method !== 'POST') {
			return new Response(
				JSON.stringify({ error: 'Method not allowed' }),
				{
					status: 405,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				}
			);
		}

		// Get client IP for rate limiting
		const clientIP = request.headers.get('CF-Connecting-IP') ||
		                 request.headers.get('X-Forwarded-For')?.split(',')[0] ||
		                 'unknown';

		// Check rate limit
		const rateLimitResult = checkRateLimit(clientIP);
		if (!rateLimitResult.allowed) {
			return new Response(
				JSON.stringify({
					error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.',
					retryAfter: Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)
				}),
				{
					status: 429,
					headers: {
						...corsHeaders,
						'Content-Type': 'application/json',
						'Retry-After': String(Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000))
					},
				}
			);
		}

		try {
			// Parse form data
			const contentType = request.headers.get('Content-Type') || '';
			let formData: FormData;

			if (contentType.includes('application/json')) {
				formData = await request.json();
			} else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
				const data = await request.formData();
				formData = {
					name: data.get('name') as string,
					email: data.get('email') as string,
					phone: data.get('phone') as string || undefined,
					message: data.get('message') as string,
					consent: data.get('consent') as string,
					contact_number: data.get('contact_number') as string || undefined,
				};
			} else {
				return new Response(
					JSON.stringify({ error: 'Unsupported content type' }),
					{
						status: 400,
						headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					}
				);
			}

			// Honeypot check - if filled, it's likely a bot
			if (formData.contact_number) {
				// Silently accept but don't send email
				return new Response(
					JSON.stringify({ success: true, message: 'Nachricht gesendet' }),
					{
						status: 200,
						headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					}
				);
			}

			// Verify Turnstile token
			const turnstileToken = formData['cf-turnstile-response'];
			if (turnstileToken && env.TURNSTILE_SECRET_KEY) {
				const turnstileValid = await verifyTurnstile(turnstileToken, clientIP, env.TURNSTILE_SECRET_KEY);
				if (!turnstileValid) {
					return new Response(
						JSON.stringify({ error: 'Verifizierung fehlgeschlagen. Bitte versuchen Sie es erneut.' }),
						{
							status: 400,
							headers: { ...corsHeaders, 'Content-Type': 'application/json' },
						}
					);
				}
			}

			// Validate required fields
			const errors: string[] = [];

			if (!formData.name || formData.name.trim().length < 2) {
				errors.push('Name muss mindestens 2 Zeichen haben');
			}

			if (!formData.email || !isValidEmail(formData.email)) {
				errors.push('Gültige E-Mail-Adresse erforderlich');
			}

			if (!formData.message || formData.message.trim().length < 10) {
				errors.push('Nachricht muss mindestens 10 Zeichen haben');
			}

			if (!formData.consent || formData.consent !== 'on') {
				errors.push('Datenschutz-Zustimmung erforderlich');
			}

			if (errors.length > 0) {
				return new Response(
					JSON.stringify({ error: 'Validierungsfehler', details: errors }),
					{
						status: 400,
						headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					}
				);
			}

			// Send email to Via Immobilien
			const emailResponse = await sendEmailToOwner(env, formData);

			if (!emailResponse.ok) {
				const errorText = await emailResponse.text();
				console.error('Resend error:', errorText);
				return new Response(
					JSON.stringify({ error: 'E-Mail konnte nicht gesendet werden' }),
					{
						status: 500,
						headers: { ...corsHeaders, 'Content-Type': 'application/json' },
					}
				);
			}

			// Send confirmation email to the sender (don't wait for response)
			ctx.waitUntil(sendConfirmationEmail(env, formData));

			return new Response(
				JSON.stringify({ success: true, message: 'Nachricht erfolgreich gesendet' }),
				{
					status: 200,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				}
			);

		} catch (error) {
			console.error('Worker error:', error);
			return new Response(
				JSON.stringify({ error: 'Interner Serverfehler' }),
				{
					status: 500,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				}
			);
		}
	},
} satisfies ExportedHandler<Env>;

/**
 * Check and update rate limit for an IP
 */
function checkRateLimit(ip: string): { allowed: boolean; resetAt: number } {
	const now = Date.now();
	const existing = rateLimitMap.get(ip);

	// Clean up old entries periodically
	if (rateLimitMap.size > 10000) {
		for (const [key, value] of rateLimitMap.entries()) {
			if (value.resetAt < now) {
				rateLimitMap.delete(key);
			}
		}
	}

	if (!existing || existing.resetAt < now) {
		// New window
		const resetAt = now + RATE_LIMIT_WINDOW_MS;
		rateLimitMap.set(ip, { count: 1, resetAt });
		return { allowed: true, resetAt };
	}

	if (existing.count >= RATE_LIMIT_MAX) {
		return { allowed: false, resetAt: existing.resetAt };
	}

	// Increment count
	existing.count++;
	return { allowed: true, resetAt: existing.resetAt };
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Send email to Via Immobilien (owner notification)
 */
async function sendEmailToOwner(env: Env, formData: FormData): Promise<Response> {
	const emailHtml = `
		<h2>Neue Kontaktanfrage von Via Immobilien</h2>
		<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
			<tr>
				<td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name:</td>
				<td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(formData.name)}</td>
			</tr>
			<tr>
				<td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">E-Mail:</td>
				<td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${escapeHtml(formData.email)}">${escapeHtml(formData.email)}</a></td>
			</tr>
			${formData.phone ? `
			<tr>
				<td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Telefon:</td>
				<td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(formData.phone)}</td>
			</tr>
			` : ''}
			<tr>
				<td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Nachricht:</td>
				<td style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${escapeHtml(formData.message)}</td>
			</tr>
		</table>
		<p style="color: #666; font-size: 12px; margin-top: 20px;">
			Diese Nachricht wurde über das Kontaktformular auf via-immobilien.com gesendet.
		</p>
	`;

	return fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${env.RESEND_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: 'Via Immobilien <kontakt@via-immobilien.com>',
			to: env.TO_EMAIL,
			reply_to: formData.email,
			subject: `Neue Kontaktanfrage von ${formData.name}`,
			html: emailHtml,
		}),
	});
}

/**
 * Send confirmation email to the person who submitted the form
 */
async function sendConfirmationEmail(env: Env, formData: FormData): Promise<void> {
	const confirmationHtml = `
		<!DOCTYPE html>
		<html lang="de">
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
		</head>
		<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #142333; max-width: 600px; margin: 0 auto; padding: 20px;">
			<div style="background-color: #142333; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
				<h1 style="color: #F5F0EA; margin: 0; font-size: 24px;">Via Immobilien</h1>
				<p style="color: #D1B787; margin: 10px 0 0 0;">Denise Semmel</p>
			</div>

			<div style="background-color: #F5F0EA; padding: 30px; border-radius: 0 0 8px 8px;">
				<h2 style="color: #142333; margin-top: 0;">Vielen Dank für Ihre Nachricht!</h2>

				<p>Hallo ${escapeHtml(formData.name)},</p>

				<p>ich habe Ihre Anfrage erhalten und werde mich schnellstmöglich bei Ihnen melden – in der Regel innerhalb von 24 Stunden.</p>

				<div style="background-color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #D1B787;">
					<p style="margin: 0 0 10px 0; font-weight: bold;">Ihre Nachricht:</p>
					<p style="margin: 0; white-space: pre-wrap; color: #666;">${escapeHtml(formData.message)}</p>
				</div>

				<p>Falls Sie dringende Fragen haben, erreichen Sie mich auch telefonisch:</p>
				<p style="font-size: 18px; font-weight: bold;">
					<a href="tel:+4917633445373" style="color: #142333; text-decoration: none;">+49 176 33445373</a>
				</p>

				<p>Herzliche Grüße,<br>
				<strong>Denise Semmel</strong><br>
				Via Immobilien</p>
			</div>

			<div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
				<p style="margin: 0;">
					Via Immobilien · Denise Semmel<br>
					Emser Straße 15 · 65195 Wiesbaden<br>
					<a href="https://via-immobilien.com" style="color: #142333;">via-immobilien.com</a>
				</p>
			</div>
		</body>
		</html>
	`;

	try {
		await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'Via Immobilien <kontakt@via-immobilien.com>',
				to: formData.email,
				subject: 'Ihre Anfrage bei Via Immobilien',
				html: confirmationHtml,
			}),
		});
	} catch (error) {
		console.error('Failed to send confirmation email:', error);
		// Don't throw - confirmation email is not critical
	}
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;',
	};
	return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Verify Cloudflare Turnstile token
 */
async function verifyTurnstile(token: string, ip: string, secretKey: string): Promise<boolean> {
	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				secret: secretKey,
				response: token,
				remoteip: ip,
			}),
		});

		const result = await response.json() as { success: boolean };
		return result.success;
	} catch (error) {
		console.error('Turnstile verification error:', error);
		return false;
	}
}
