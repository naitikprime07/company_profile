import { ENVIRONMENT } from "../constants/environment";

export async function submitContact(payload) {
  const response = await fetch(`${ENVIRONMENT.apiBaseUrl}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      result?.message || "We could not send your project brief. Please try again.",
    );
    error.fields = result?.errors || {};
    throw error;
  }

  return result;
}
