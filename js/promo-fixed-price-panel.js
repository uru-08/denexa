/* =========================================================
   DENEXA - PROMO PRECIO ESPECIAL / PANEL DEL COMERCIO V1
   Agrega un cuarto tipo de Promo del dia:
   "Precio especial de un producto".
   ========================================================= */
(function () {
  "use strict";

  const FIXED_TYPE = "fixed_price";
  let installed = false;
  let loading = false;

  function el(id) {
    return document.getElementById(id);
  }

  function merchantBusinessId() {
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
    const type = el("dailyPromoRuleType");
    if (!type) return false;

    if (!type.querySelector(`option[value="${FIXED_TYPE}"]`)) {
      const option = document.createElement("option");
      option.value = FIXED_TYPE;
      option.textContent = "Precio especial de un producto";
      type.appendChild(option);
    }

    return true;
  }

  function ensureFixedPriceField() {
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
            Reemplaza el precio normal mientras la promo esté activa.
            Los extras siguen sumando normalmente.
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

  function targetGrid() {
    return el("promoTargetId")?.closest(".promo-rule-grid") || null;
  }

  function updateFixedUI() {
    const type = el("dailyPromoRuleType");
    const fixedBox = ensureFixedPriceField();
    if (!type || !fixedBox) return;

    const isFixed = type.value === FIXED_TYPE;
    fixedBox.hidden = !isFixed;

    const targetType = el("promoTargetType");

    if (isFixed && targetType) {
      if (targetType.value !== "product") {
        targetType.value = "product";
        targetType.dispatchEvent(
          new Event("change", { bubbles: true })
        );
      }

      targetType.disabled = true;
    } else if (targetType) {
      targetType.disabled = false;
    }

    if (isFixed) {
      const percent = el("promoPercentFields");
      const gift = el("promoGiftFields");
      if (percent) percent.hidden = true;
      if (gift) gift.hidden = true;
    }

    updateExample();
  }

  function updateExample() {
    const type = el("dailyPromoRuleType");
    if (!type || type.value !== FIXED_TYPE) return;

    const product = el("promoTargetId");
    const price = Number(el("promoFixedPrice")?.value || 0);
    const name =
      product?.selectedOptions?.[0]?.textContent?.trim() ||
      "Producto";

    const example = el("promoFixedPriceExample");
    if (example) {
      example.textContent =
        price >= 0 && el("promoFixedPrice")?.value !== ""
          ? `${name}: precio promo $${Math.round(price)}`
          : "Elegí un producto y escribí el precio de oferta.";
    }

    const preview = el("dailyPromoPreviewText");
    const baseText =
      el("dailyPromoText")?.value?.trim() ||
      "Promo del día";

    if (preview) {
      preview.textContent =
        price >= 0 && el("promoFixedPrice")?.value !== ""
          ? `${baseText} · ${name} a $${Math.round(price)}`
          : baseText;
    }
  }

  async function fetchPromoConfig() {
    const businessId = merchantBusinessId();
    if (!businessId || loading) return;

    loading = true;

    try {
      const response = await fetch(
        `${SUPABASE_REST}/businesses?id=eq.${businessId}` +
        `&select=id,promo_active,promo_rule_type,promo_target_type,promo_target_id,promo_fixed_price`,
        {
          headers: headers()
        }
      );

      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || `Error ${response.status}`);
      }

      const rows = text.trim() ? JSON.parse(text) : [];
      const row = Array.isArray(rows) ? rows[0] : null;
      if (!row) return;

      if (row.promo_rule_type === FIXED_TYPE) {
        const type = el("dailyPromoRuleType");
        const targetType = el("promoTargetType");

        if (type) type.value = FIXED_TYPE;

        if (targetType) {
          targetType.value = "product";
          targetType.dispatchEvent(
            new Event("change", { bubbles: true })
          );
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
        }, 180);
      }
    } catch (error) {
      console.error("DENEXA - cargar precio especial:", error);
    } finally {
      loading = false;
    }
  }

  async function saveFixedPromo(event) {
    const type = el("dailyPromoRuleType");
    if (!type || type.value !== FIXED_TYPE) return;

    event?.preventDefault?.();
    event?.stopPropagation?.();
    event?.stopImmediatePropagation?.();

    const businessId = merchantBusinessId();
    const productId = Number(el("promoTargetId")?.value || 0);
    const fixedInput = el("promoFixedPrice");
    const fixedPrice = Number(fixedInput?.value);

    const message = el("dailyPromoMessage");
    const button = el("saveDailyPromoButton");

    if (!businessId) {
      if (message) message.textContent = "No se pudo identificar el comercio.";
      return;
    }

    if (!productId) {
      if (message) message.textContent = "Elegí el producto que va a quedar en oferta.";
      return;
    }

    if (!fixedInput || fixedInput.value === "" || !Number.isFinite(fixedPrice) || fixedPrice < 0) {
      if (message) message.textContent = "Escribí un precio especial válido.";
      return;
    }

    const payload = {
      promo_active: el("dailyPromoActive")?.checked === true,
      promo_badge: el("dailyPromoBadge")?.value?.trim() || "PROMO DEL DÍA",
      promo_title: el("dailyPromoTitle")?.value?.trim() || "Precio especial",
      promo_text: el("dailyPromoText")?.value?.trim() || "",
      promo_rule_type: FIXED_TYPE,
      promo_target_type: "product",
      promo_target_id: productId,
      promo_fixed_price: fixedPrice
    };

    if (button) {
      button.disabled = true;
      button.textContent = "Guardando...";
    }

    if (message) {
      message.textContent = "Guardando precio especial...";
    }

    try {
      const response = await fetch(
        `${SUPABASE_REST}/businesses?id=eq.${businessId}`,
        {
          method: "PATCH",
          headers: headers({
            Prefer: "return=representation"
          }),
          body: JSON.stringify(payload)
        }
      );

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text || `Error ${response.status}`);
      }

      try {
        if (
          typeof selectedBusiness !== "undefined" &&
          selectedBusiness
        ) {
          Object.assign(selectedBusiness, payload);
        }
      } catch (_) {}

      if (message) {
        message.textContent =
          payload.promo_active
            ? "Precio especial activado correctamente."
            : "Precio especial guardado. Activá la promo para mostrarlo.";
      }

      try {
        if (typeof showToast === "function") {
          showToast("Promo guardada");
        }
      } catch (_) {}

      updateExample();
    } catch (error) {
      console.error("DENEXA - guardar precio especial:", error);

      if (message) {
        message.textContent =
          "No se pudo guardar. Verificá que el SQL de Precio especial esté instalado.";
      }
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = "Guardar promo";
      }
    }
  }

  function bind() {
    if (installed) return;
    if (!ensureOption()) return;

    ensureFixedPriceField();

    const type = el("dailyPromoRuleType");
    const target = el("promoTargetId");
    const price = el("promoFixedPrice");
    const save = el("saveDailyPromoButton");

    type?.addEventListener("change", () => {
      updateFixedUI();

      if (type.value === FIXED_TYPE) {
        fetchPromoConfig();
      }
    });

    target?.addEventListener("change", updateExample);
    price?.addEventListener("input", updateExample);

    /*
      Captura antes que comercio.js SOLO cuando el tipo es fixed_price.
      Los otros 3 tipos siguen usando exactamente la lógica original.
    */
    save?.addEventListener("click", saveFixedPromo, true);

    installed = true;
    updateFixedUI();
    fetchPromoConfig();
  }

  function bootstrap() {
    const timer = setInterval(() => {
      bind();

      if (installed) {
        clearInterval(timer);
      }
    }, 120);

    document.addEventListener("click", (event) => {
      const button = event.target.closest(
        '[data-section="dailyPromo"]'
      );

      if (button) {
        window.setTimeout(fetchPromoConfig, 180);
      }
    }, true);
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
