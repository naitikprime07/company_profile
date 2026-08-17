import { ENVIRONMENT } from "../constants/environment";

const parse = async (response) => {
  const body = await response.json();
  if (!response.ok)
    throw new Error(body.message || "Unable to load leadership data.");
  return body.data;
};

const CACHE_TTL = 5 * 60 * 1000;
let cachedTeams = null;
let cachedAt = 0;
let pendingRequest = null;

export const invalidateLeadershipCache = () => {
  cachedTeams = null;
  cachedAt = 0;
};

export const getLeadershipTeams = ({ force = false } = {}) => {
  const cacheIsFresh = cachedTeams && Date.now() - cachedAt < CACHE_TTL;

  if (!force && cacheIsFresh) return Promise.resolve(cachedTeams);
  if (!force && pendingRequest) return pendingRequest;

  pendingRequest = fetch(`${ENVIRONMENT.apiBaseUrl}/leadership`)
    .then(parse)
    .then((teams) => {
      cachedTeams = teams;
      cachedAt = Date.now();
      return teams;
    })
    .finally(() => {
      pendingRequest = null;
    });

  return pendingRequest;
};
