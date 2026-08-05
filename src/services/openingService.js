import { ENVIRONMENT } from "../constants/environment";
export async function getOpenings(){const response=await fetch(`${ENVIRONMENT.apiBaseUrl}/openings`);if(!response.ok)throw new Error("Unable to load openings");return (await response.json()).data;}
