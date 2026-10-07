import { ENVIRONMENT } from "../constants/environment";

export async function getHomeStats() {
  const response = await fetch(`${ENVIRONMENT.apiBaseUrl}/home-stats`);
  if (!response.ok) throw new Error("Unable to load home stats");
  return (await response.json()).data;
}
