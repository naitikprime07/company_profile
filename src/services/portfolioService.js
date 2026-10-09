import { ENVIRONMENT } from "../constants/environment";

const activeRequests = new Map();

export const getPortfolioItems = async (page = 1, type = "all", limit = 10) => {
  const key = `${page}:${type}:${limit}`;
  if (activeRequests.has(key)) return activeRequests.get(key);
  const request = fetch(
    `${ENVIRONMENT.apiBaseUrl}/portfolio?${new URLSearchParams({ page: String(page), type, limit: String(limit) })}`,
  )
    .then(async (response) => {
      const body = await response.json();
      if (!response.ok) throw new Error(body.message || "Unable to load portfolio.");
      return body.data;
    })
    .finally(() => {
      activeRequests.delete(key);
    });
  activeRequests.set(key, request);
  return request;
};

export const getPortfolioItem = async (id) => {
  const response = await fetch(`${ENVIRONMENT.apiBaseUrl}/portfolio/${id}`);
  const body = await response.json();
  if (!response.ok) {
    const error = new Error(body.message || "Unable to load this project.");
    error.status = response.status;
    throw error;
  }
  return body.data;
};
