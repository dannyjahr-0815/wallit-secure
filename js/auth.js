import { api } from "./api.js";

export async function login(email, password) {
  try {
    await api("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    return true;
  } catch {
    alert("Login fehlgeschlagen");
    return false;
  }
}
