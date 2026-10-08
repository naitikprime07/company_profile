// Bootstrap: load the site configuration from the backend before rendering so
// constants/environment.js can read runtime values. Contact details, office
// info, and animation URLs live in the server's .env (not in this client
// bundle). If the request fails we fall back to bundled defaults seamlessly.
const apiBaseUrl = String(
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
).replace(/\/$/, "");

async function loadSiteConfig() {
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 3000);
    const response = await fetch(`${apiBaseUrl}/site-config`, {
      signal: controller.signal,
    });
    window.clearTimeout(timer);
    if (!response.ok) return;
    const payload = await response.json();
    if (payload && payload.success && payload.data) {
      window.__PRIME_SITE_CONFIG__ = payload.data;
    }
  } catch {
    // Offline or API not ready: environment.js falls back to defaults.
  }
}

loadSiteConfig().finally(() => {
  import("./render.jsx");
});
