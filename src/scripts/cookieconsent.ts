/**
 * Cookie Consent Configuration
 *
 * Uses vanilla-cookieconsent v3 for GDPR-compliant cookie consent
 * German language configuration with equal-effort opt-in/opt-out
 *
 * Categories:
 * - necessary: Always enabled (consent storage)
 * - analytics: Disabled by default (placeholder for future use)
 *
 * To block scripts until consent is given for a category, add these attributes:
 * <script type="text/plain" data-category="analytics">
 *   // This script will only run after analytics consent is given
 * </script>
 *
 * @see https://cookieconsent.orestbida.com/
 */

import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

/**
 * Initialize cookie consent with German language configuration
 */
export function initCookieConsent(): void {
  CookieConsent.run({
    // Root element for the modal
    root: document.body,

    // Disable page interactions while modal is open
    disablePageInteraction: false,

    // Auto-show consent modal on first visit
    autoShow: true,

    // Hide from bots
    hideFromBots: true,

    // Cookie configuration
    cookie: {
      name: 'cc_cookie',
      // Cookie expires in 365 days
      expiresAfterDays: 365,
      // Use same domain as the website
      sameSite: 'Lax',
    },

    // GUI options
    guiOptions: {
      consentModal: {
        layout: 'box wide',
        position: 'bottom center',
        equalWeightButtons: true, // GDPR requirement: equal effort opt-in/opt-out
        flipButtons: false,
      },
      preferencesModal: {
        layout: 'box',
        position: 'right',
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    // Categories configuration
    categories: {
      necessary: {
        enabled: true,
        readOnly: true, // Cannot be disabled
      },
      analytics: {
        enabled: false, // Disabled by default (opt-in)
        readOnly: false,
        // Placeholder for future Google Analytics or similar
        // autoClear: {
        //   cookies: [
        //     { name: /^_ga/ },
        //     { name: '_gid' },
        //   ],
        // },
      },
    },

    // German language configuration
    language: {
      default: 'de',
      translations: {
        de: {
          consentModal: {
            title: 'Wir verwenden Cookies',
            description:
              'Wir nutzen Cookies, um unsere Website fur Sie optimal zu gestalten. Einige sind technisch notwendig, andere helfen uns, die Website zu verbessern. Sie konnen Ihre Einstellungen jederzeit anpassen.',
            acceptAllBtn: 'Alle akzeptieren',
            acceptNecessaryBtn: 'Nur notwendige',
            showPreferencesBtn: 'Einstellungen',
            footer: `
              <a href="/datenschutz">Datenschutzerklarung</a>
              <a href="/impressum">Impressum</a>
            `,
          },
          preferencesModal: {
            title: 'Cookie-Einstellungen',
            acceptAllBtn: 'Alle akzeptieren',
            acceptNecessaryBtn: 'Nur notwendige',
            savePreferencesBtn: 'Einstellungen speichern',
            closeIconLabel: 'SchlieBen',
            serviceCounterLabel: 'Dienst|Dienste',
            sections: [
              {
                title: 'Cookie-Nutzung',
                description:
                  'Wir verwenden Cookies, um grundlegende Funktionen der Website zu ermoglichen und Ihr Online-Erlebnis zu verbessern. Sie konnen fur jede Kategorie entscheiden, ob Sie diese zulassen mochten.',
              },
              {
                title: 'Notwendige Cookies',
                description:
                  'Diese Cookies sind fur die Grundfunktionen der Website erforderlich und konnen nicht deaktiviert werden. Sie speichern zum Beispiel Ihre Cookie-Einstellungen.',
                linkedCategory: 'necessary',
              },
              {
                title: 'Analyse-Cookies',
                description:
                  'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren. Alle Daten werden anonymisiert erhoben. Derzeit verwenden wir keine Analyse-Cookies.',
                linkedCategory: 'analytics',
              },
              {
                title: 'Weitere Informationen',
                description:
                  'Bei Fragen zum Datenschutz kontaktieren Sie uns bitte unter <a href="mailto:mail@via-immobilien.com">mail@via-immobilien.com</a>. Weitere Details finden Sie in unserer <a href="/datenschutz">Datenschutzerklarung</a>.',
              },
            ],
          },
        },
      },
    },

    // Callbacks for consent changes (useful for analytics initialization)
    // onFirstConsent: ({ cookie }) => {
    //   console.log('First consent given', cookie);
    // },
    // onConsent: ({ cookie }) => {
    //   console.log('Consent updated', cookie);
    // },
    // onChange: ({ cookie, changedCategories }) => {
    //   console.log('Consent changed', cookie, changedCategories);
    //   // Example: Initialize/remove analytics based on consent
    //   // if (changedCategories.includes('analytics')) {
    //   //   if (CookieConsent.acceptedCategory('analytics')) {
    //   //     // Initialize analytics
    //   //   } else {
    //   //     // Remove analytics
    //   //   }
    //   // }
    // },
  });
}

// Export CookieConsent for use in other files if needed
export { CookieConsent };
