// Single source of truth for site configuration.
//
// Values are resolved in this order:
//  1. Runtime config fetched from the backend (GET /api/site-config) — the
//     canonical place to manage these values (they live in the server .env).
//  2. Build-time VITE_* variables — kept only as a local override/legacy path.
//  3. Built-in defaults — so the site still renders when the API is offline.
const runtimeConfig =
  (typeof window !== "undefined" && window.__PRIME_SITE_CONFIG__) || {};

const clean = (value) =>
  typeof value === "string" && value.trim() ? value.trim() : "";

const readValue = (runtimeValue, envName, fallback) =>
  clean(runtimeValue) || clean(import.meta.env[envName]) || fallback;

// Production deploys must never talk to localhost. If VITE_API_BASE_URL is not
// baked into the build (e.g. the Vercel env var was removed or left as the
// localhost default), fall back to the deployed API. Otherwise every request —
// including the runtime GET /site-config that carries the Lottie animation
// URLs — silently fails on the live site.
const PRODUCTION_API_BASE_URL = "https://company-profile-be.vercel.app/api";

const resolveApiBaseUrl = () =>
  clean(import.meta.env.VITE_API_BASE_URL) ||
  (import.meta.env.PROD
    ? PRODUCTION_API_BASE_URL
    : "http://localhost:5000/api");

export const ENVIRONMENT = Object.freeze({
  apiBaseUrl: resolveApiBaseUrl().replace(/\/$/, ""),
  contactEmail: readValue(
    runtimeConfig.contactEmail,
    "VITE_CONTACT_EMAIL",
    "info@primesoftechs.com",
  ),
  contactMobile: readValue(
    runtimeConfig.contactMobile,
    "VITE_CONTACT_MOBILE",
    "+91 70647 02015",
  ),
  careersEmail: readValue(
    runtimeConfig.careersEmail,
    "VITE_CAREERS_EMAIL",
    "hr@primesoftechs.com",
  ),
  linkedInUrl: readValue(
    runtimeConfig.linkedInUrl,
    "VITE_LINKEDIN_URL",
    "https://in.linkedin.com/company/primesoftech",
  ),
  instagramUrl: readValue(
    runtimeConfig.instagramUrl,
    "VITE_INSTAGRAM_URL",
    "https://www.instagram.com/prime_softech/",
  ),
  facebookUrl: readValue(
    runtimeConfig.facebookUrl,
    "VITE_FACEBOOK_URL",
    "https://www.facebook.com/primesoftech67",
  ),
  office: Object.freeze({
    name: readValue(runtimeConfig.office?.name, "VITE_OFFICE_NAME", "Prime Softech"),
    location: readValue(
      runtimeConfig.office?.location,
      "VITE_OFFICE_LOCATION",
      "Surat, Gujarat, India",
    ),
    address: readValue(
      runtimeConfig.office?.address,
      "VITE_OFFICE_ADDRESS",
      "Surat, Gujarat, India",
    ),
    timezone: readValue(
      runtimeConfig.office?.timezone,
      "VITE_OFFICE_TIMEZONE",
      "India Standard Time · UTC+5:30",
    ),
    hours: readValue(
      runtimeConfig.office?.hours,
      "VITE_OFFICE_HOURS",
      "Monday to Saturday: 10:00am - 7:00pm",
    ),
    mapEmbedUrl: readValue(runtimeConfig.office?.mapEmbedUrl, "VITE_MAP_EMBED_URL", ""),
    directionsUrl: readValue(
      runtimeConfig.office?.directionsUrl,
      "VITE_MAP_DIRECTIONS_URL",
      "https://www.openstreetmap.org",
    ),
  }),
  animations: Object.freeze({
    home: readValue(runtimeConfig.animations?.home, "VITE_HOME_LOTTIE_URL", ""),
    career: readValue(runtimeConfig.animations?.career, "VITE_CAREER_LOTTIE_URL", ""),
    contact: readValue(runtimeConfig.animations?.contact, "VITE_CONTACT_LOTTIE_URL", ""),
    about: readValue(runtimeConfig.animations?.about, "VITE_ABOUT_LOTTIE_URL", ""),
    android: readValue(runtimeConfig.animations?.android, "VITE_ANDROID_LOTTIE_URL", ""),
    flutter: readValue(runtimeConfig.animations?.flutter, "VITE_FLUTTER_LOTTIE_URL", ""),
    ios: readValue(runtimeConfig.animations?.ios, "VITE_IOS_LOTTIE_URL", ""),
    unity: readValue(runtimeConfig.animations?.unity, "VITE_UNITY_LOTTIE_URL", ""),
    unityBackground: readValue(
      runtimeConfig.animations?.unityBackground,
      "VITE_UNITY_BACKGROUND_LOTTIE_URL",
      "",
    ),
    angular: readValue(runtimeConfig.animations?.angular, "VITE_ANGULAR_LOTTIE_URL", ""),
    typescript: readValue(
      runtimeConfig.animations?.typescript,
      "VITE_TYPESCRIPT_LOTTIE_URL",
      "",
    ),
    html5: readValue(runtimeConfig.animations?.html5, "VITE_HTML5_LOTTIE_URL", ""),
  }),
});

export const mailTo = (email = ENVIRONMENT.contactEmail) => `mailto:${email}`;

// Opens the real Gmail send-mail (compose) page in the browser with To,
// subject and body prefilled. Works on every device without a default mail
// app — `tf=1` forces the full compose window instead of a small draft popup.
export const contactMailHref = (
  email = ENVIRONMENT.contactEmail,
  subject = "Contact via Prime Softech website",
  body = "Hello Prime Softech team,\n\nI would like to discuss:\n\n\nThanks & regards,\n",
) =>
  `https://mail.google.com/mail/?view=cm&tf=1&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const telTo = (phone = ENVIRONMENT.contactMobile) =>
  `tel:${String(phone).replace(/[^\d+]/g, "")}`;
