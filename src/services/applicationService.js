import { ENVIRONMENT } from "../constants/environment";

const parseResponse = async (response, fallback) => {
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(result?.message || fallback);
    error.fields = result?.errors || {};
    throw error;
  }
  return result;
};

export async function uploadResume(file) {
  const signingResponse = await fetch(
    `${ENVIRONMENT.apiBaseUrl}/applications/resume-upload-url`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
        size: file.size,
      }),
    },
  );
  const signingResult = await parseResponse(
    signingResponse,
    "Unable to prepare the resume upload.",
  );
  const uploadResponse = await fetch(signingResult.data.uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!uploadResponse.ok) throw new Error("Unable to upload the resume.");
  return signingResult.data.fileUrl;
}

export async function submitApplication(openingId, application) {
  const response = await fetch(`${ENVIRONMENT.apiBaseUrl}/applications/${openingId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
  return parseResponse(response, "Unable to submit your application.");
}
export async function submitGeneralApplication(application) {
  const response = await fetch(`${ENVIRONMENT.apiBaseUrl}/applications/general`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(application) });
  return parseResponse(response, "Unable to submit your introduction.");
}
