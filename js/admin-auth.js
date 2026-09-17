(function () {
  "use strict";

  const SESSION_KEY = "denexa_superpanel_session_v1";
  const AUTH_URL = `${SUPABASE_URL}/auth/v1`;
  let resolveAuthentication;
  let rejectAuthentication;

  window.denexaAdminAuthReady = new Promise((resolve, reject) => {
    resolveAuthentication = resolve;
    rejectAuthentication = reject;
  });

  function readSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch (_) {
      return null;
    }
  }

  function saveSession(session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    window.DENEXA_ADMIN_SESSION = session;
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    delete window.DENEXA_ADMIN_SESSION;
  }

  async function authRequest(path, options) {
    const response = await fetch(`${AUTH_URL}${path}`, options);
    const text = await response.text();
    let data = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch (_) {
        data = null;
      }
    }

    if (!response.ok) {
      const message =
        data?.msg ||
        data?.message ||
        data?.error_description ||
        "No se pudo validar la sesión.";
      throw new Error(message);
    }

    return data;
  }

  async function getUser(accessToken) {
    return authRequest("/user", {
      method: "GET",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  async function refreshSession(refreshToken) {
    return authRequest("/token?grant_type=refresh_token", {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });
  }

  async function restoreSession() {
    const stored = readSession();

    if (!stored?.access_token) {
      return null;
    }

    try {
      const user = await getUser(stored.access_token);
      saveSession(stored);
      return { session: stored, user };
    } catch (_) {
      if (!stored.refresh_token) {
        clearSession();
        return null;
      }

      try {
        const refreshed = await refreshSession(stored.refresh_token);
        const user = await getUser(refreshed.access_token);
        saveSession(refreshed);
        return { session: refreshed, user };
      } catch (_) {
        clearSession();
        return null;
      }
    }
  }

  function addStyles() {
    const style = document.createElement("style");
    style.id = "denexa-admin-auth-styles";
    style.textContent = `
      body.denexa-admin-locked > :not(#denexaAdminLogin) {
        visibility: hidden !important;
      }
      #denexaAdminLogin {
        position: fixed;
        inset: 0;
        z-index: 100000;
        display: grid;
        place-items: center;
        padding: 20px;
        background:
          radial-gradient(circle at top, rgba(14,165,233,.18), transparent 42%),
          #05070b;
        color: #f8fafc;
        font-family: Inter, system-ui, sans-serif;
      }
      .denexa-admin-login-card {
        width: min(420px, 100%);
        padding: 30px;
        border: 1px solid rgba(56,189,248,.28);
        border-radius: 22px;
        background: rgba(10,15,25,.96);
        box-shadow: 0 24px 80px rgba(0,0,0,.5);
      }
      .denexa-admin-login-card strong {
        display: block;
        color: #38bdf8;
        font-size: 13px;
        letter-spacing: .14em;
      }
      .denexa-admin-login-card h1 {
        margin: 10px 0 8px;
        font-size: 28px;
      }
      .denexa-admin-login-card p {
        margin: 0 0 22px;
        color: #94a3b8;
        line-height: 1.5;
      }
      .denexa-admin-login-card label {
        display: grid;
        gap: 7px;
        margin-top: 14px;
        color: #cbd5e1;
        font-size: 14px;
      }
      .denexa-admin-login-card input {
        width: 100%;
        box-sizing: border-box;
        padding: 13px 14px;
        border: 1px solid #334155;
        border-radius: 12px;
        background: #0f172a;
        color: #f8fafc;
        font: inherit;
      }
      .denexa-admin-login-card button {
        width: 100%;
        margin-top: 20px;
        padding: 13px 16px;
        border: 0;
        border-radius: 12px;
        background: #0284c7;
        color: white;
        font: inherit;
        font-weight: 800;
        cursor: pointer;
      }
      .denexa-admin-login-card button:disabled {
        opacity: .65;
        cursor: wait;
      }
      #denexaAdminLoginMessage {
        min-height: 22px;
        margin: 12px 0 0;
        color: #fca5a5;
      }
      #denexaAdminLogout {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 9000;
        padding: 10px 14px;
        border: 1px solid #334155;
        border-radius: 999px;
        background: #0f172a;
        color: #e2e8f0;
        font-weight: 700;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
  }

  function removeLogin() {
    document.body.classList.remove("denexa-admin-locked");
    document.getElementById("denexaAdminLogin")?.remove();
  }

  function addLogoutButton() {
    if (document.getElementById("denexaAdminLogout")) {
      return;
    }

    const button = document.createElement("button");
    button.id = "denexaAdminLogout";
    button.type = "button";
    button.textContent = "Cerrar sesión";
    button.addEventListener("click", async () => {
      const session = readSession();

      try {
        if (session?.access_token) {
          await fetch(`${AUTH_URL}/logout`, {
            method: "POST",
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${session.access_token}`
            }
          });
        }
      } finally {
        clearSession();
        window.location.reload();
      }
    });

    document.body.appendChild(button);
  }

  function isSuperAdmin(user) {
    return user?.app_metadata?.denexa_role === "super_admin";
  }

  function unlock(result) {
    saveSession(result.session);
    removeLogin();
    addLogoutButton();
    resolveAuthentication(result);
  }

  function showLogin() {
    document.body.classList.add("denexa-admin-locked");

    const screen = document.createElement("section");
    screen.id = "denexaAdminLogin";
    screen.setAttribute("aria-label", "Acceso al superpanel");
    screen.innerHTML = `
      <form class="denexa-admin-login-card" id="denexaAdminLoginForm">
        <strong>DENEXA 🇺🇾</strong>
        <h1>Acceso al superpanel</h1>
        <p>Ingresá con una cuenta autorizada de DENEXA.</p>
        <label>
          Correo
          <input id="denexaAdminEmail" type="email" autocomplete="username" required>
        </label>
        <label>
          Contraseña
          <input id="denexaAdminPassword" type="password" autocomplete="current-password" required>
        </label>
        <button id="denexaAdminLoginButton" type="submit">Ingresar</button>
        <p id="denexaAdminLoginMessage" role="alert"></p>
      </form>
    `;

    document.body.appendChild(screen);

    const form = document.getElementById("denexaAdminLoginForm");
    const button = document.getElementById("denexaAdminLoginButton");
    const message = document.getElementById("denexaAdminLoginMessage");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      button.disabled = true;
      button.textContent = "Verificando...";
      message.textContent = "";

      try {
        const email = document.getElementById("denexaAdminEmail").value.trim();
        const password = document.getElementById("denexaAdminPassword").value;
        const session = await authRequest("/token?grant_type=password", {
          method: "POST",
          headers: {
            apikey: SUPABASE_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
        const user = await getUser(session.access_token);

        if (!isSuperAdmin(user)) {
          throw new Error("Esta cuenta no tiene acceso al superpanel.");
        }

        unlock({ session, user });
      } catch (error) {
        clearSession();
        message.textContent =
          error.message === "Esta cuenta no tiene acceso al superpanel."
            ? error.message
            : "Correo o contraseña incorrectos.";
        console.error("Error de autenticación del superpanel:", error);
      } finally {
        button.disabled = false;
        button.textContent = "Ingresar";
      }
    });
  }

  async function initializeAuthentication() {
    try {
      addStyles();
      const restored = await restoreSession();

      if (restored && isSuperAdmin(restored.user)) {
        unlock(restored);
        return;
      }

      if (restored) {
        clearSession();
      }

      showLogin();
    } catch (error) {
      clearSession();
      rejectAuthentication(error);
      showLogin();
    }
  }

  initializeAuthentication();
})();