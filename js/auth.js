import { api } from "./api.js";

const form = document.getElementById("loginForm");
const errorEl = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.hidden = true;

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await api("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const next = new URLSearchParams(window.location.search).get("next") || "app.html";
window.location.href = next;
  } catch (err) {
    errorEl.textContent = err.message || "Login fehlgeschlagen";
    errorEl.hidden = false;
  }
});
