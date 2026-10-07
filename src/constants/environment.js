const readEnvironmentValue = (name, fallback) => {
  const value = import.meta.env[name];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
};

export const ENVIRONMENT = Object.freeze({
  apiBaseUrl: readEnvironmentValue(
    "VITE_API_BASE_URL",
    "http://localhost:5000/api",
  ).replace(/\/$/, ""),
  contactEmail: readEnvironmentValue(
    "VITE_CONTACT_EMAIL",
    "info@primesoftechs.com",
  ),
  contactMobile: readEnvironmentValue(
    "VITE_CONTACT_MOBILE",
    "+91 70647 02015",
  ),
  careersEmail: readEnvironmentValue(
    "VITE_CAREERS_EMAIL",
    "hr@primesoftechs.com",
  ),
  linkedInUrl: readEnvironmentValue(
    "VITE_LINKEDIN_URL",
    "https://in.linkedin.com/company/primesoftech",
  ),
  instagramUrl: readEnvironmentValue(
    "VITE_INSTAGRAM_URL",
    "https://www.instagram.com/prime_softech/",
  ),
  facebookUrl: readEnvironmentValue(
    "VITE_FACEBOOK_URL",
    "https://www.facebook.com/primesoftech67",
  ),
  office: Object.freeze({
    name: readEnvironmentValue("VITE_OFFICE_NAME", "Prime Softech Studio"),
    location: readEnvironmentValue("VITE_OFFICE_LOCATION", "New Delhi, India"),
    address: readEnvironmentValue("VITE_OFFICE_ADDRESS", "New Delhi, India"),
    timezone: readEnvironmentValue(
      "VITE_OFFICE_TIMEZONE",
      "India Standard Time · UTC+5:30",
    ),
    mapEmbedUrl: readEnvironmentValue("VITE_MAP_EMBED_URL", ""),
    directionsUrl: readEnvironmentValue(
      "VITE_MAP_DIRECTIONS_URL",
      "https://www.openstreetmap.org",
    ),
  }),
  animations: Object.freeze({
    home: readEnvironmentValue("VITE_HOME_LOTTIE_URL", ""),
    career: readEnvironmentValue("VITE_CAREER_LOTTIE_URL", ""),
    contact: readEnvironmentValue("VITE_CONTACT_LOTTIE_URL", ""),
    about: readEnvironmentValue("VITE_ABOUT_LOTTIE_URL", ""),
    android: readEnvironmentValue("VITE_ANDROID_LOTTIE_URL", ""),
    flutter: readEnvironmentValue("VITE_FLUTTER_LOTTIE_URL", ""),
    ios: readEnvironmentValue("VITE_IOS_LOTTIE_URL", ""),
    unity: readEnvironmentValue("VITE_UNITY_LOTTIE_URL", ""),
    unityBackground: readEnvironmentValue(
      "VITE_UNITY_BACKGROUND_LOTTIE_URL",
      "",
    ),
    angular: readEnvironmentValue("VITE_ANGULAR_LOTTIE_URL", ""),
    typescript: readEnvironmentValue("VITE_TYPESCRIPT_LOTTIE_URL", ""),
    html5: readEnvironmentValue("VITE_HTML5_LOTTIE_URL", ""),
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
