const SUPABASE_URL = "https://farpkwpxnnfloesivkxv.supabase.co";
const SUPABASE_KEY = "sb_publishable_xDGhJja9MTcw8pOcypDITg_bRIbMg5E";
const SUPABASE_REST = `${SUPABASE_URL}/rest/v1`;

function supabaseHeaders(extraHeaders = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    ...extraHeaders
  };
}

if (/\/comercio\.html$/i.test(window.location.pathname)) {
  (function () {
    "use strict";

    const SESSION_KEY = "denexa_merchant_session_v1";

    const style = document.createElement("style");
    style.id = "denexa-merchant-final-style";
    style.textContent = `
      body.denexa-panel-booting{
        background:#050505!important;
        overflow:hidden!important;
      }
      body.denexa-panel-booting>.sidebar,
      body.denexa-panel-booting>.main,
      body.denexa-panel-booting>.merchant-session-float,
      body.denexa-panel-booting>#merchantLoginScreen{
        visibility:hidden!important;
        opacity:0!important;
        pointer-events:none!important;
      }
      body.denexa-panel-booting::before{
        content:"DENEXA 🇺🇾";
        position:fixed;inset:0;z-index:2147483646;
        display:grid;place-items:center;padding-bottom:24px;
        background:#050505;color:#FFD000;
        font:1000 clamp(24px,7vw,38px)/1 Arial,sans-serif;
      }
      body.denexa-panel-booting::after{
        content:"Cargando panel...";
        position:fixed;left:0;right:0;top:calc(50% + 35px);
        z-index:2147483647;text-align:center;
        color:#cfcfcf;font:700 12px Arial,sans-serif;letter-spacing:.08em;
      }

      html[data-merchant-theme="carro-kechu-carmelo"],
      html[data-merchant-theme="carro-kechu-carmelo"] body,
      body.merchant-kechu{
        background:#050505!important;color:#fff!important;
      }

      html[data-merchant-theme="carro-kechu-carmelo"] .main,
      body.merchant-kechu .main{
        background:radial-gradient(circle at 50% -180px,rgba(255,208,0,.08),transparent 430px),#050505!important;
        color:#fff!important;
      }

      html[data-merchant-theme="carro-kechu-carmelo"] .sidebar,
      body.merchant-kechu .sidebar{
        background:#070707!important;border-color:#302900!important;color:#fff!important;box-shadow:none!important;
      }

      html[data-merchant-theme="carro-kechu-carmelo"] .brand strong,
      body.merchant-kechu .brand strong{color:#FFD000!important}

      html[data-merchant-theme="carro-kechu-carmelo"] .brand span,
      html[data-merchant-theme="carro-kechu-carmelo"] .merchant-user-caption,
      body.merchant-kechu .brand span,
      body.merchant-kechu .merchant-user-caption{color:#c4c4c4!important}

      html[data-merchant-theme="carro-kechu-carmelo"] .nav-item,
      body.merchant-kechu .nav-item{
        color:#dedede!important;background:transparent!important;border-color:transparent!important
      }
      html[data-merchant-theme="carro-kechu-carmelo"] .nav-item:hover,
      body.merchant-kechu .nav-item:hover{background:#121212!important;color:#fff!important}
      html[data-merchant-theme="carro-kechu-carmelo"] .nav-item.active,
      body.merchant-kechu .nav-item.active{
        background:#191500!important;border-color:#FFD000!important;color:#FFD000!important;
        box-shadow:inset 0 -3px 0 #FFD000!important
      }
      html[data-merchant-theme="carro-kechu-carmelo"] .nav-icon,
      body.merchant-kechu .nav-icon{
        background:#151515!important;border-color:#383838!important;color:#FFD000!important
      }

      html[data-merchant-theme="carro-kechu-carmelo"] h1,
      html[data-merchant-theme="carro-kechu-carmelo"] h2,
      html[data-merchant-theme="carro-kechu-carmelo"] h3,
      body.merchant-kechu h1,
      body.merchant-kechu h2,
      body.merchant-kechu h3{color:#fff!important}

      html[data-merchant-theme="carro-kechu-carmelo"] .eyebrow,
      body.merchant-kechu .eyebrow{color:#FFD000!important}

      html[data-merchant-theme="carro-kechu-carmelo"] .subtitle,
      html[data-merchant-theme="carro-kechu-carmelo"] .helper-text,
      html[data-merchant-theme="carro-kechu-carmelo"] .field-help,
      html[data-merchant-theme="carro-kechu-carmelo"] .design-help,
      body.merchant-kechu .subtitle,
      body.merchant-kechu .helper-text,
      body.merchant-kechu .field-help,
      body.merchant-kechu .design-help{color:#bdbdbd!important}

      html[data-merchant-theme="carro-kechu-carmelo"] .panel,
      html[data-merchant-theme="carro-kechu-carmelo"] .metric-card,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-summary-card,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-card,
      html[data-merchant-theme="carro-kechu-carmelo"] .merchant-product-card,
      html[data-merchant-theme="carro-kechu-carmelo"] .merchant-product-category-group,
      html[data-merchant-theme="carro-kechu-carmelo"] .products-main-toolbar,
      html[data-merchant-theme="carro-kechu-carmelo"] .notice-setting-card,
      html[data-merchant-theme="carro-kechu-carmelo"] .notice-settings-intro,
      html[data-merchant-theme="carro-kechu-carmelo"] .notice-settings-list,
      html[data-merchant-theme="carro-kechu-carmelo"] .notice-placeholders,
      html[data-merchant-theme="carro-kechu-carmelo"] .fulfillment-toggle-row,
      html[data-merchant-theme="carro-kechu-carmelo"] .fulfillment-address-fields,
      html[data-merchant-theme="carro-kechu-carmelo"] .promo-switch-card,
      html[data-merchant-theme="carro-kechu-carmelo"] .promo-fields,
      html[data-merchant-theme="carro-kechu-carmelo"] .promo-rule-box,
      html[data-merchant-theme="carro-kechu-carmelo"] .promo-preview-panel,
      html[data-merchant-theme="carro-kechu-carmelo"] .design-form,
      html[data-merchant-theme="carro-kechu-carmelo"] .design-preview-card,
      html[data-merchant-theme="carro-kechu-carmelo"] .detail-item,
      html[data-merchant-theme="carro-kechu-carmelo"] .modifier-group-card,
      html[data-merchant-theme="carro-kechu-carmelo"] .modifier-option-row,
      body.merchant-kechu .panel,
      body.merchant-kechu .metric-card,
      body.merchant-kechu .order-summary-card,
      body.merchant-kechu .order-card,
      body.merchant-kechu .merchant-product-card,
      body.merchant-kechu .merchant-product-category-group,
      body.merchant-kechu .products-main-toolbar,
      body.merchant-kechu .notice-setting-card,
      body.merchant-kechu .notice-settings-intro,
      body.merchant-kechu .notice-settings-list,
      body.merchant-kechu .notice-placeholders,
      body.merchant-kechu .fulfillment-toggle-row,
      body.merchant-kechu .fulfillment-address-fields,
      body.merchant-kechu .promo-switch-card,
      body.merchant-kechu .promo-fields,
      body.merchant-kechu .promo-rule-box,
      body.merchant-kechu .promo-preview-panel,
      body.merchant-kechu .design-form,
      body.merchant-kechu .design-preview-card,
      body.merchant-kechu .detail-item,
      body.merchant-kechu .modifier-group-card,
      body.merchant-kechu .modifier-option-row{
        background:#111!important;border-color:#353535!important;color:#fff!important;box-shadow:none!important
      }

      html[data-merchant-theme="carro-kechu-carmelo"] .panel strong,
      html[data-merchant-theme="carro-kechu-carmelo"] .panel label,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-summary-card span,
      body.merchant-kechu .panel strong,
      body.merchant-kechu .panel label,
      body.merchant-kechu .order-summary-card span{color:#f2f2f2!important}

      html[data-merchant-theme="carro-kechu-carmelo"] .metric-card strong,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-summary-card strong,
      html[data-merchant-theme="carro-kechu-carmelo"] .merchant-product-price-row .product-price,
      body.merchant-kechu .metric-card strong,
      body.merchant-kechu .order-summary-card strong,
      body.merchant-kechu .merchant-product-price-row .product-price{color:#FFD000!important}

      html[data-merchant-theme="carro-kechu-carmelo"] .orders-whatsapp-note,
      body.merchant-kechu .orders-whatsapp-note{
        background:#171400!important;border-color:#584b00!important;color:#f5e9a9!important
      }
      html[data-merchant-theme="carro-kechu-carmelo"] .orders-whatsapp-note *,
      body.merchant-kechu .orders-whatsapp-note *{color:#f5e9a9!important}

      html[data-merchant-theme="carro-kechu-carmelo"] .orders-cleanup-hint,
      body.merchant-kechu .orders-cleanup-hint{
        margin-top:12px!important;padding:12px!important;border:1px solid #4a3730!important;
        border-radius:12px!important;background:#17110f!important;color:#d5c5bf!important
      }
      html[data-merchant-theme="carro-kechu-carmelo"] .orders-cleanup-hint strong,
      body.merchant-kechu .orders-cleanup-hint strong{color:#ff8f87!important}
      html[data-merchant-theme="carro-kechu-carmelo"] .orders-cleanup-hint span,
      body.merchant-kechu .orders-cleanup-hint span{color:#d5c5bf!important}

      html[data-merchant-theme="carro-kechu-carmelo"] .order-card-top,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-customer-grid,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-products-box,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-total-row,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-payment,
      body.merchant-kechu .order-card-top,
      body.merchant-kechu .order-customer-grid,
      body.merchant-kechu .order-products-box,
      body.merchant-kechu .order-total-row,
      body.merchant-kechu .order-payment{
        background:#111!important;border-color:#333!important;color:#eee!important
      }

      html[data-merchant-theme="carro-kechu-carmelo"] .order-number-line strong,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-customer-grid strong,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-product-title strong,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-total-row strong,
      body.merchant-kechu .order-number-line strong,
      body.merchant-kechu .order-customer-grid strong,
      body.merchant-kechu .order-product-title strong,
      body.merchant-kechu .order-total-row strong{color:#fff!important}

      html[data-merchant-theme="carro-kechu-carmelo"] .order-number-line span,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-business-name,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-customer-grid span,
      html[data-merchant-theme="carro-kechu-carmelo"] .order-options-list span,
      html[data-merchant-theme="carro-kechu-carmelo"] .orders-last-update,
      body.merchant-kechu .order-number-line span,
      body.merchant-kechu .order-business-name,
      body.merchant-kechu .order-customer-grid span,
      body.merchant-kechu .order-options-list span,
      body.merchant-kechu .orders-last-update{color:#bdbdbd!important}

      html[data-merchant-theme="carro-kechu-carmelo"] .design-logo-preview,
      body.merchant-kechu .design-logo-preview{
        background:#090909!important;border-color:#5b4d00!important;color:#FFD000!important
      }

      html[data-merchant-theme="carro-kechu-carmelo"] input,
      html[data-merchant-theme="carro-kechu-carmelo"] select,
      html[data-merchant-theme="carro-kechu-carmelo"] textarea,
      body.merchant-kechu input,
      body.merchant-kechu select,
      body.merchant-kechu textarea{
        background:#090909!important;border:1px solid #444!important;color:#fff!important;
        -webkit-text-fill-color:#fff!important;caret-color:#FFD000!important
      }
      html[data-merchant-theme="carro-kechu-carmelo"] select option,
      html[data-merchant-theme="carro-kechu-carmelo"] select optgroup,
      body.merchant-kechu select option,
      body.merchant-kechu select optgroup{
        background:#111!important;color:#fff!important;-webkit-text-fill-color:#fff!important
      }
      html[data-merchant-theme="carro-kechu-carmelo"] select option:checked,
      body.merchant-kechu select option:checked{
        background:#FFD000!important;color:#050505!important;-webkit-text-fill-color:#050505!important
      }
      html[data-merchant-theme="carro-kechu-carmelo"] input::placeholder,
      html[data-merchant-theme="carro-kechu-carmelo"] textarea::placeholder,
      body.merchant-kechu input::placeholder,
      body.merchant-kechu textarea::placeholder{
        color:#858585!important;-webkit-text-fill-color:#858585!important;opacity:1!important
      }
      html[data-merchant-theme="carro-kechu-carmelo"] input:focus,
      html[data-merchant-theme="carro-kechu-carmelo"] select:focus,
      html[data-merchant-theme="carro-kechu-carmelo"] textarea:focus,
      body.merchant-kechu input:focus,
      body.merchant-kechu select:focus,
      body.merchant-kechu textarea:focus{
        outline:none!important;border-color:#FFD000!important;box-shadow:0 0 0 3px rgba(255,208,0,.13)!important
      }

      html[data-merchant-theme="carro-kechu-carmelo"] .primary-button,
      body.merchant-kechu .primary-button{
        background:#FFD000!important;border-color:#FFD000!important;color:#050505!important;box-shadow:none!important
      }
      html[data-merchant-theme="carro-kechu-carmelo"] .secondary-button,
      body.merchant-kechu .secondary-button{
        background:#181818!important;border-color:#484848!important;color:#f3f3f3!important
      }
      html[data-merchant-theme="carro-kechu-carmelo"] .danger-button,
      body.merchant-kechu .danger-button{
        background:#251211!important;border-color:#73342f!important;color:#ff827b!important
      }

      #ordersBusinessFilter{display:none!important}
      .orders-toolbar label:has(#ordersBusinessFilter){display:none!important}

      .merchant-login-screen{
        background:linear-gradient(145deg,#050505,#111 58%,#191919)!important
      }
      .merchant-login-card{
        background:#101010!important;border:1px solid #3a3a3a!important;color:#fff!important
      }
      .merchant-login-card h1,.merchant-login-brand strong{color:#fff!important}
      .merchant-login-brand strong{color:#FFD000!important}
      .merchant-login-brand span,.merchant-login-copy,.merchant-login-foot,.merchant-login-form label{color:#c2c2c2!important}
      .merchant-login-mark{
        background:#111!important;border:2px solid #FFD000!important;color:#FFD000!important
      }
      .merchant-login-form input{
        background:#090909!important;border-color:#444!important;color:#fff!important;-webkit-text-fill-color:#fff!important
      }
      .merchant-login-button{
        background:#FFD000!important;color:#050505!important
      }

      @media(max-width:760px){
        html[data-merchant-theme="carro-kechu-carmelo"] .main,
        body.merchant-kechu .main{padding:16px 12px 70px!important}
        html[data-merchant-theme="carro-kechu-carmelo"] .orders-summary-grid,
        body.merchant-kechu .orders-summary-grid{
          grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important
        }
        html[data-merchant-theme="carro-kechu-carmelo"] .merchant-session-float,
        body.merchant-kechu .merchant-session-float{display:none!important}
      }
    `;
    document.head.appendChild(style);

    function hasSavedSession() {
      try {
        return Boolean(localStorage.getItem(SESSION_KEY));
      } catch (error) {
        return false;
      }
    }

    function beginBootGate() {
      document.body?.classList.add("denexa-panel-booting");
    }

    function endBootGate() {
      document.body?.classList.remove("denexa-panel-booting");
    }

    function panelIsReady() {
      const body = document.body;
      if (!body) return false;

      const theme = String(document.documentElement.dataset.merchantTheme || "").trim();
      const statusText = String(document.getElementById("merchantStoreStatusBadge")?.textContent || "").trim();
      const lastUpdateText = String(document.getElementById("ordersLastUpdate")?.textContent || "").trim();

      return (
        !body.classList.contains("auth-locked") &&
        Boolean(theme) &&
        Boolean(statusText) &&
        !/cargando/i.test(statusText) &&
        Boolean(lastUpdateText) &&
        !/esperando datos/i.test(lastUpdateText)
      );
    }

    function loginReallyNeeded() {
      return Boolean(
        document.body?.classList.contains("auth-locked") &&
        !hasSavedSession()
      );
    }

    let pollTimer = null;
    let safetyTimer = null;

    function stopWatch() {
      if (pollTimer) clearInterval(pollTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
      pollTimer = null;
      safetyTimer = null;
    }

    function watchUntilReady() {
      stopWatch();
      pollTimer = setInterval(() => {
        if (panelIsReady() || loginReallyNeeded()) {
          stopWatch();
          endBootGate();
        }
      }, 80);

      safetyTimer = setTimeout(() => {
        stopWatch();
        endBootGate();
      }, 12000);
    }

    function cleanPanelCopy() {
      const setText = (selector, value) => {
        const el = document.querySelector(selector);
        if (el) el.textContent = value;
      };

      setText(".merchant-login-brand strong", "DENEXA 🇺🇾");
      setText(".merchant-login-brand span", "Plataforma de pedidos online");
      setText("#merchantLogoutButton", "Cerrar sesión");
      setText("#merchantMobileLogoutButton", "Cerrar sesión");
      setText("#customerNoticesOrdersState", "Configurables desde “Avisos al cliente”.");

      const cleanup = document.querySelector(".orders-cleanup-hint span");
      if (cleanup) {
        cleanup.textContent = "Quita del panel los pedidos del turno actual, activos y finalizados, para comenzar el próximo turno desde cero.";
      }

      const restore = document.getElementById("restoreStoreDesignButton");
      if (restore) restore.textContent = "Restaurar estilo del comercio";

      const settingsSubtitle = document.querySelector("#settings .subtitle");
      if (settingsSubtitle && /Proyecto X/i.test(settingsSubtitle.textContent)) {
        settingsSubtitle.textContent = "Configuración general de DENEXA.";
      }

      const filter = document.getElementById("ordersBusinessFilter");
      if (filter) {
        filter.style.display = "none";
        filter.setAttribute("aria-hidden", "true");
        const label = filter.closest("label");
        if (label) {
          label.style.display = "none";
          label.setAttribute("aria-hidden", "true");
        }
      }
    }

    function start() {
      cleanPanelCopy();

      if (hasSavedSession()) {
        beginBootGate();
        watchUntilReady();
      }

      document.getElementById("merchantLoginForm")?.addEventListener("submit", () => {
        beginBootGate();
        watchUntilReady();
      }, true);

      window.setInterval(cleanPanelCopy, 5000);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start, { once:true });
    } else {
      start();
    }
  })();
}
