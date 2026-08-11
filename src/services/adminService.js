import { ENVIRONMENT } from "../constants/environment";
const inFlight = new Map();
const executeRequest = async (path, options = {}) => {
  const token = sessionStorage.getItem("adminToken");
  const response = await fetch(`${ENVIRONMENT.apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message);
  return body.data;
};
const request = (path, options = {}) => {
  const method = String(options.method || "GET").toUpperCase();
  if (method !== "GET") return executeRequest(path, options);
  const token = sessionStorage.getItem("adminToken") || "anonymous";
  const key = `${token}:${path}`;
  if (inFlight.has(key)) return inFlight.get(key);
  const pending = executeRequest(path, options).finally(() => inFlight.delete(key));
  inFlight.set(key, pending);
  return pending;
};
const requestOnce = (key, path) => {
  if (inFlight.has(key)) return inFlight.get(key);
  const pending = request(path).finally(() => inFlight.delete(key));
  inFlight.set(key, pending);
  return pending;
};
const normalizeContact = (contact) => {
  const id = contact?._id || contact?.id;
  if (!id) throw new Error("Inquiry response is missing its ID.");
  return { ...contact, _id: String(id), id: String(id) };
};
const requireContactId = (id) => {
  const value = String(id || "");
  if (!/^[a-f\d]{24}$/i.test(value))
    throw new Error("A valid inquiry ID is required.");
  return value;
};
const requireApplicationId = (id) => {
  const value = String(id || "");
  if (!/^[a-f\d]{24}$/i.test(value))
    throw new Error("A valid application ID is required.");
  return value;
};
export const loginAdmin = (email, password) =>
  request("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
export const getDashboard = () => requestOnce("dashboard", "/admin/dashboard");
export const searchContacts = (
  query = "",
  status = "all",
  page = 1,
  limit = 10,
  dateRange = "all",
  fromDate = "",
  toDate = "",
) =>
  request(
    `/admin/contacts/search?${new URLSearchParams({ query, status, page: String(page), limit: String(limit), dateRange, fromDate, toDate })}`,
  ).then((result) => ({
    ...result,
    items: result.items.map(normalizeContact),
  }));
export const getContact = (id) =>
  request(`/admin/contacts/${requireContactId(id)}`).then(normalizeContact);
export const setContactStatus = (id, status) =>
  request(`/admin/contacts/${requireContactId(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  }).then(normalizeContact);
export const deleteContact = (id) =>
  request(`/admin/contacts/${requireContactId(id)}`, { method: "DELETE" });
export const getApplications = () => request("/admin/applications");
export const searchApplications = (
  query,
  status,
  page,
  limit,
  fromDate,
  toDate,
) =>
  request(
    `/admin/applications/search?${new URLSearchParams({ query, status, page: String(page), limit: String(limit), fromDate, toDate })}`,
  );
export const getApplication = (id) =>
  request(`/admin/applications/${requireApplicationId(id)}`);
export const setApplicationStatus = (id, status) =>
  request(`/admin/applications/${requireApplicationId(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
export const deleteApplication = (id) =>
  request(`/admin/applications/${requireApplicationId(id)}`, {
    method: "DELETE",
  });
export const getGeneralApplications = () =>
  request("/admin/general-applications");
export const searchGeneralApplications = (
  query,
  status,
  page,
  limit,
  fromDate,
  toDate,
) =>
  request(
    `/admin/general-applications/search?${new URLSearchParams({ query, status, page: String(page), limit: String(limit), fromDate, toDate })}`,
  );
export const getGeneralApplication = (id) =>
  request(`/admin/general-applications/${id}`);
export const setGeneralApplicationStatus = (id, status) =>
  request(`/admin/general-applications/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
export const deleteGeneralApplication = (id) =>
  request(`/admin/general-applications/${id}`, { method: "DELETE" });
export const getAdminOpenings = () => requestOnce("openings", "/admin/openings");
export const searchAdminOpenings = (query = "", status = "all", page = 1, limit = 6, fromDate = "", toDate = "") =>
  request(`/admin/openings/search?${new URLSearchParams({ query, status, page: String(page), limit: String(limit), fromDate, toDate })}`);
export const getAdminOpening = (id) => request(`/admin/openings/${id}`);
export const createOpening = (data) =>
  request("/admin/openings", { method: "POST", body: JSON.stringify(data) });
export const updateOpening = (id, data) =>
  request(`/admin/openings/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteOpening = (id) =>
  request(`/admin/openings/${id}`, { method: "DELETE" });
