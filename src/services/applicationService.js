import { ENVIRONMENT } from "../constants/environment";

export async function submitApplication(openingId, formData) {
  const response = await fetch(`${ENVIRONMENT.apiBaseUrl}/applications/${openingId}`, { method: "POST", body: formData });
  const result = await response.json().catch(() => null);
  if (!response.ok) { const error = new Error(result?.message || "Unable to submit your application."); error.fields = result?.errors || {}; throw error; }
  return result;
}
