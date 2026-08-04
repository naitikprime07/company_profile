const readEnvironmentValue = (name, fallback) => {
  const value = import.meta.env[name]
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

export const ENVIRONMENT = Object.freeze({
  contactEmail: readEnvironmentValue('VITE_CONTACT_EMAIL', 'hello@primesoftech.com'),
  careersEmail: readEnvironmentValue('VITE_CAREERS_EMAIL', 'careers@primesoftech.com'),
  linkedInUrl: readEnvironmentValue('VITE_LINKEDIN_URL', 'https://www.linkedin.com'),
  animations: Object.freeze({
    home: readEnvironmentValue('VITE_HOME_LOTTIE_URL', ''),
    android: readEnvironmentValue('VITE_ANDROID_LOTTIE_URL', ''),
    flutter: readEnvironmentValue('VITE_FLUTTER_LOTTIE_URL', ''),
    ios: readEnvironmentValue('VITE_IOS_LOTTIE_URL', ''),
    unity: readEnvironmentValue('VITE_UNITY_LOTTIE_URL', ''),
    angular: readEnvironmentValue('VITE_ANGULAR_LOTTIE_URL', ''),
    typescript: readEnvironmentValue('VITE_TYPESCRIPT_LOTTIE_URL', ''),
    html5: readEnvironmentValue('VITE_HTML5_LOTTIE_URL', ''),
  }),
})

export const mailTo = (email = ENVIRONMENT.contactEmail) => `mailto:${email}`
