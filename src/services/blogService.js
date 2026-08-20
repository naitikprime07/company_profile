import { ENVIRONMENT } from "../constants/environment";

// React StrictMode intentionally mounts effects twice in development. Share an
// active GET request so both effect runs receive the same response without
// sending the same request to the API more than once.
const inFlightRequests = new Map();

const parse = async (response) => {
  const body = await response.json();
  if (!response.ok)
    throw new Error(body.message || "Unable to load blog posts.");
  return body.data;
};

const getOnce = (url) => {
  const activeRequest = inFlightRequests.get(url);
  if (activeRequest) return activeRequest;

  const request = fetch(url)
    .then(parse)
    .finally(() => inFlightRequests.delete(url));

  inFlightRequests.set(url, request);
  return request;
};

export const getBlogs = (
  page = 1,
  limit = 9,
  category = "",
  query = "",
  all = false,
) =>
  getOnce(
    `${ENVIRONMENT.apiBaseUrl}/blogs?${new URLSearchParams({ page: String(page), limit: String(limit), category, query, all: String(all) })}`,
  );

export const getBlogBySlug = (slug) =>
  getOnce(
    `${ENVIRONMENT.apiBaseUrl}/blogs/${encodeURIComponent(slug)}`,
  );
