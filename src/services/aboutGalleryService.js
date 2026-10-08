import { ENVIRONMENT } from "../constants/environment";

const parse = async (response) => {
  const body = await response.json();
  if (!response.ok)
    throw new Error(body.message || "Unable to load company images.");
  return body.data;
};

export const getAboutGalleryImages = async () => {
  try {
    const images = await fetch(`${ENVIRONMENT.apiBaseUrl}/about-gallery`).then(
      parse,
    );
    return Array.isArray(images) ? images : [];
  } catch {
    return [];
  }
};
