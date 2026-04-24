const BASE_URL = "https://proyecto1-web-bck.onrender.com"; // en el caso que se este corriendo local cambiar este url

async function apiRequest(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (res.status === 204) return null;

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong");
  return data;
}

// Series
export const getSeries = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return apiRequest(`/series${qs ? "?" + qs : ""}`);
};

export const getSeriesByID = (id) => apiRequest(`/series/${id}`);

export const createSeries = (body) =>
  apiRequest("/series", { method: "POST", body: JSON.stringify(body) });

export const updateSeries = (id, body) =>
  apiRequest(`/series/${id}`, { method: "PUT", body: JSON.stringify(body) });

export const deleteSeries = (id) =>
  apiRequest(`/series/${id}`, { method: "DELETE" });

// Ratings
export const getRating = (id) => apiRequest(`/series/${id}/rating`);

export const createRating = (id, score) =>
  apiRequest(`/series/${id}/rating`, {
    method: "POST",
    body: JSON.stringify({ score }),
  });