import { API_BASE } from "./config.js";

export async function api(path, options = {}) {
  const res = await fetch(API_BASE + path, {
    credentials: "include",
    ...options
  });

  if (!res.ok) {
    throw new Error(String(res.status));
  }

  // Some endpoints may return no body; guard to avoid parse errors
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return null;
  return res.json();
}
