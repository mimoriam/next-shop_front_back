const CMS_URL = process.env.CMS_URL;

export class ApiError extends Error {
  constructor(url, status) {
    super(`'${url}' returned ${status}`);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = "ApiError";
    this.status = status;
  }
}

export async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new ApiError(url, response.status);
  }
  return await response.json();
}

// GET All:
export async function getProducts() {
  return await fetchJson(`${CMS_URL}/api/products/`);
}

// GET One:
export async function getProductBy(id) {
  return await fetchJson(`${CMS_URL}/api/products/${id}`);
}
