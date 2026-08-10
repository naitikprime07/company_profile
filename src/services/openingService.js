import { ENVIRONMENT } from "../constants/environment";

export async function getOpenings(type = "") {
  const response = await fetch(
    `${ENVIRONMENT.apiBaseUrl}/openings?type=${type}`,
  );
  if (!response.ok) throw new Error("Unable to load openings");
  return (await response.json()).data;
}

export async function getOneOpenings(id) {
  const response = await fetch(`${ENVIRONMENT.apiBaseUrl}/openings/${id}`);
  if (!response.ok) throw new Error("Unable to load opening");
  return (await response.json()).data;
}
