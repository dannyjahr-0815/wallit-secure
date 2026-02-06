import { API_BASE } from "./config.js";

export async function api(path, options = {}) {
  const res = await fetch(API_BASE + path, {
    credentials: "include",
    ...options
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`${res.status} ${txt}`);
  }
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) return null;
  return res.json();
}
