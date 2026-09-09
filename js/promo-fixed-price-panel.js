/* =========================================================
   DENEXA - PROMO PRECIO ESPECIAL / PANEL V2 DEFINITIVO
   Integración persistente con Supabase mediante RPC propio.
   ========================================================= */
(function () {
  "use strict";

  const FIXED_TYPE = "fixed_price";
  let installed = false;
  let loadingConfig = false;
  let saving = false;

  function el(id) {
    return document.getElementById(id);
  }

  function businessId() {
    try {
      if (
        typeof MERCHANT_BUSINESS_ID !== "undefined" &&
        Number(MERCHANT_BUSINESS_ID) > 0
      ) {
        return Number(MERCHANT_BUSINESS_ID);
      }
    } catch (_) {}

    try {
      if (
        typeof selectedBusiness !== "undefined" &&
        selectedBusiness &&
        Number(selectedBusiness.id) > 0
      ) {
        return Number(selectedBusiness.id);
      }
    } catch (_) {}

    return 0;
  }

  function sessionToken() {
    try {
      const raw = localStorage.getItem("denexa_merchant_session_v1");
      const session = raw ? JSON.parse(raw) : null;
      return session?.access_token || "";
    } catch (_) {
      return "";
    }
  }

  function headers(extra = {}) {
    const token = sessionToken();

    return {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${token || SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...extra
    };
  }

  function ensureOption() {
    const select = el("dailyPromoRuleType");
    if (!select) return false;

    let option = select.querySelector(`option[value="${FIXED_TYPE}"]`);

    if (!option) {
      option = document.createElement("option");
      option.value = FIXED_TYPE;
      option.textContent = "Precio especial de un producto";
      select.appendChild(option);
    }

    return true;
  }

  function ensureField() {
    const automatic = el("promoAutomaticFields");
    if (!automatic) return null;

    let box = el("promoFixedPriceFields");

    if (!box) {
      box = document.createElement("div");
      box.id = "promoFixedPriceFields";
      box.className = "promo-rule-grid";
      box.hidden = true;

      box.innerHTML = `
        <label>
          Precio especial
          <input
            id="promoFixedPrice"
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            placeholder="Ej.: 740"
          >
          <small>
            El precio normal no se modifica. Al apagar la promo vuelve automáticamente.
          </small>
        </label>

        <div class="promo-rule-example" id="promoFixedPriceExample">
          Elegí un producto y escribí el precio de oferta.
        </div>
      `;

      automatic.appendChild(box);
    }

    return box;
  }

  function setMessage(text) {
    const message = el("dailyPromoMessage");
    if (message) message.textContent = text || "";
  }

  function selectedProductName() {
    return (
      el("promoTargetId")
        ?.selectedOptions?.[0]
        ?.textContent
        ?.trim() ||
      "Producto"
    );
  }

  function updateExample() {
    const type = el("dailyPromoRuleType");
    if (!type || type.value !== FIXED_TYPE) return;

    const input = el("promoFixedPrice");
    const example = el("promoFixedPriceExample");
    const preview = el("dailyPromoPreviewText");
    const productName = selectedProductName();

    const hasPrice =
      input &&
      input.value !== "" &&
      Number.isFinite(Number(input.value)) &&
      Number(input.value) >= 0;

    const fixedPrice =
      hasPrice
        ? Math.round(Number(input.value))
        : null;

    if (example) {
      example.textContent =
        hasPrice
          ? `${productName}: precio promo $${fixedPrice}`
          : "Elegí un producto y escribí el precio de oferta.";
    }

    if (preview) {
      const base =
        el("dailyPromoText")?.value?.trim() ||
        "Promo del día";

      preview.textContent =
        hasPrice
          ? `${base} · ${productName} a $${fixedPrice}`
          : base;
    }
  }

  function forceProductTarget() {
    const targetType = el("promoTargetType");
    if (!targetType) return;

    if (targetType.value !== "product") {
      targetType.value = "product";

      try {
        if (typeof refreshPromoTargetOptions === "function") {
          refreshPromoTargetOptions();
        } else {
          targetType.dispatchEvent(
            new Event("change", { bubbles: true })
          );
        }
      } catch (_) {
        targetType.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }
    }

    targetType.disabled = true;
  }

  function updateFixedUI() {
    const type = el("dailyPromoRuleType");
    const box = ensureField();

    if (!type || !box) return;

    const fixed = type.value === FIXED_TYPE;

    box.hidden = !fixed;

    if (fixed) {
      forceProductTarget();

      const percent = el("promoPercentFields");
      const gift = el("promoGiftFields");

      if (percent) percent.hidden = true;
      if (gift) gift.hidden = true;
    } else {
      const targetType = el("promoTargetType");
      if (targetType) targetType.disabled = false;
    }

    updateExample();
  }

  async function readSavedConfig() {
    const id = businessId();
    if (!id || loadingConfig) return null;

    loadingConfig = true;

    try {
      const response = await fetch(
        `${SUPABASE_REST}/businesses?id=eq.${encodeURIComponent(id)}` +
        `&select=id,promo_active,promo_badge,promo_title,promo_text,` +
        `promo_rule_type,promo_target_type,promo_target_id,promo_fixed_price`,
        { headers: headers() }
      );

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text || `Error ${response.status}`);
      }

      const rows = text.trim() ? JSON.parse(text) : [];
      const row = Array.isArray(rows) ? rows[0] : null;

      if (!row) return null;

      try {
        if (
          typeof selectedBusiness !== "undefined" &&
          selectedBusiness
        ) {
          Object.assign(selectedBusiness, row);
        }
      } catch (_) {}

      return row;
    } finally {
      loadingConfig = false;
    }
  }

  async function loadFixedConfigIntoForm() {
    if (!ensureOption()) return;

    try {
      const row = await readSavedConfig();
      if (!row) return;

      if (row.promo_rule_type !== FIXED_TYPE) {
        updateFixedUI();
        return;
      }

      const type = el("dailyPromoRuleType");
      const targetType = el("promoTargetType");

      if (type) type.value = FIXED_TYPE;

      if (targetType) {
        targetType.value = "product";

        try {
          if (typeof refreshPromoTargetOptions === "function") {
            refreshPromoTargetOptions();
          } else {
            targetType.dispatchEvent(
              new Event("change", { bubbles: true })
            );
          }
        } catch (_) {}
      }

      window.setTimeout(() => {
        const target = el("promoTargetId");
        const price = el("promoFixedPrice");

        if (target && row.promo_target_id != null) {
          target.value = String(row.promo_target_id);
        }

        if (price && row.promo_fixed_price != null) {
          price.value = String(row.promo_fixed_price);
        }

        updateFixedUI();
      }, 80);
    } catch (error) {
      console.error(
        "DENEXA - error cargando Precio especial:",
        error
      );
    }
  }

  async function saveFixedPromo(activeOverride = null) {
    if (saving) return;

    const id = businessId();
    const type = el("dailyPromoRuleType");

    if (!id || !type || type.value !== FIXED_TYPE) {
      return;
    }

    forceProductTarget();

    const productId =
      Number(el("promoTargetId")?.value || 0);

    const priceInput =
      el("promoFixedPrice");

    const fixedPrice =
      Number(priceInput?.value);

    const active =
      activeOverride === null
        ? el("dailyPromoActive")?.checked === true
        : Boolean(activeOverride);

    if (!productId) {
      setMessage(
        "Elegí el producto que va a quedar en oferta."
      );
      return;
    }

    if (
      !priceInput ||
      priceInput.value === "" ||
      !Number.isFinite(fixedPrice) ||
      fixedPrice < 0
    ) {
      setMessage(
        "Escribí un precio especial válido."
      );
      return;
    }

    const title =
      el("dailyPromoTitle")?.value?.trim() || "";

    const promoText =
      el("dailyPromoText")?.value?.trim() || "";

    if (active && (!title || !promoText)) {
      setMessage(
        "Para activar la promo, completá el título y la promoción."
      );
      return;
    }

    const saveButton =
      el("saveDailyPromoButton");

    const disableButton =
      el("disableDailyPromoButton");

    saving = true;

    if (saveButton) {
      saveButton.disabled = true;
      saveButton.textContent = "Guardando...";
    }

    if (disableButton) {
      disableButton.disabled = true;
    }

    setMessage("Guardando precio especial...");

    try {
      const response = await fetch(
        `${SUPABASE_REST}/rpc/set_business_fixed_price_promo`,
        {
          method: "POST",
          headers: headers({
            Prefer: "return=representation"
          }),
          body: JSON.stringify({
            p_business_id: id,
            p_active: active,
            p_badge:
              el("dailyPromoBadge")?.value?.trim() ||
              "PROMO DEL DÍA",
            p_title: title || null,
            p_text: promoText || null,
            p_product_id: productId,
            p_fixed_price: fixedPrice
          })
        }
      );

      const text = await response.text();

      if (!response.ok) {
        throw new Error(
          text || `Error ${response.status}`
        );
      }

      let saved = null;

      try {
        const parsed =
          text.trim()
            ? JSON.parse(text)
            : null;

        saved =
          Array.isArray(parsed)
            ? parsed[0] || null
            : parsed;
      } catch (_) {}

      if (!saved?.id) {
        throw new Error(
          "Supabase no confirmó la promoción guardada."
        );
      }

      try {
        if (
          typeof selectedBusiness !== "undefined" &&
          selectedBusiness
        ) {
          Object.assign(selectedBusiness, saved);
        }
      } catch (_) {}

      if (el("dailyPromoActive")) {
        el("dailyPromoActive").checked =
          saved.promo_active === true;
      }

      if (el("dailyPromoRuleType")) {
        el("dailyPromoRuleType").value =
          FIXED_TYPE;
      }

      if (el("promoTargetType")) {
        el("promoTargetType").value =
          "product";
      }

      if (el("promoTargetId")) {
        el("promoTargetId").value =
          String(saved.promo_target_id || productId);
      }

      if (el("promoFixedPrice")) {
        el("promoFixedPrice").value =
          String(
            saved.promo_fixed_price ?? fixedPrice
          );
      }

      try {
        if (typeof updateDailyPromoUI === "function") {
          updateDailyPromoUI();
        }
      } catch (_) {}

      updateFixedUI();

      setMessage(
        saved.promo_active
          ? "Precio especial activado correctamente."
          : "Precio especial guardado y desactivado."
      );

      try {
        if (typeof showToast === "function") {
          showToast(
            saved.promo_active
              ? "Precio especial activado."
              : "Promo desactivada.",
            "success"
          );
        }
      } catch (_) {}
    } catch (error) {
      console.error(
        "DENEXA - error guardando Precio especial:",
        error
      );

      setMessage(
        `No se pudo guardar: ${error.message || "error desconocido"}`
      );

      try {
        if (typeof showToast === "function") {
          showToast(
            "No se pudo guardar la promo.",
            "error"
          );
        }
      } catch (_) {}
    } finally {
      saving = false;

      if (saveButton) {
        saveButton.disabled = false;
        saveButton.textContent = "Guardar promo";
      }

      if (disableButton) {
        disableButton.disabled = false;
      }
    }
  }

  function installHandlers() {
    if (installed) return true;

    const type = el("dailyPromoRuleType");
    const form = el("dailyPromoForm");
    const disable = el("disableDailyPromoButton");

    if (!type || !form) {
      return false;
    }

    ensureOption();
    ensureField();

    type.addEventListener(
      "change",
      () => {
        updateFixedUI();

        if (type.value === FIXED_TYPE) {
          forceProductTarget();
          loadFixedConfigIntoForm();
        }
      },
      true
    );

    el("promoTargetId")
      ?.addEventListener(
        "change",
        updateExample,
        true
      );

    el("promoFixedPrice")
      ?.addEventListener(
        "input",
        updateExample,
        true
      );

    el("dailyPromoText")
      ?.addEventListener(
        "input",
        updateExample,
        true
      );

    /*
      Capturamos el SUBMIT del formulario antes de la lógica antigua.
      Solo intervenimos cuando se eligió "Precio especial".
      Los otros tipos de promo quedan exactamente como estaban.
    */
    form.addEventListener(
      "submit",
      (event) => {
        if (
          el("dailyPromoRuleType")?.value !==
          FIXED_TYPE
        ) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        saveFixedPromo(null);
      },
      true
    );

    /*
      Desactivar también usa el RPC nuevo si la promo actual es fixed_price.
    */
    disable?.addEventListener(
      "click",
      (event) => {
        if (
          el("dailyPromoRuleType")?.value !==
          FIXED_TYPE
        ) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        if (el("dailyPromoActive")) {
          el("dailyPromoActive").checked = false;
        }

        saveFixedPromo(false);
      },
      true
    );

    document.addEventListener(
      "click",
      (event) => {
        const nav =
          event.target.closest(
            '[data-section="dailyPromo"]'
          );

        if (nav) {
          window.setTimeout(
            loadFixedConfigIntoForm,
            120
          );
        }
      },
      true
    );

    installed = true;
    updateFixedUI();
    loadFixedConfigIntoForm();

    return true;
  }

  function bootstrap() {
    const timer =
      window.setInterval(
        () => {
          if (installHandlers()) {
            window.clearInterval(timer);
          }
        },
        100
      );

    window.setTimeout(
      () => window.clearInterval(timer),
      15000
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      bootstrap,
      { once: true }
    );
  } else {
    bootstrap();
  }
})();
