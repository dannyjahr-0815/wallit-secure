import { api } from "./api.js";

const form = document.getElementById("loginForm");
const errorEl = document.getElementById("error");

function resolveNext() {
  const sp = new URLSearchParams(window.location.search);
  const next = sp.get("next") || "app.html";
  // Resolve relative to current page (login.html) so it works under /wallit-secure/
  try {
    return new URL(next, window.location.href).toString();
  } catch {
    return "app.html";
  }
}

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

    window.location.href = resolveNext();
  } catch (err) {
    errorEl.textContent = err?.message || "Login fehlgeschlagen";
    errorEl.hidden = false;
  }
});
