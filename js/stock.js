(() => {
  "use strict";

  const SESSION_KEY = "denexa_merchant_session_v1";
  const list = document.getElementById("stockList");
  const message = document.getElementById("stockMessage");
  const businessCaption = document.getElementById("businessCaption");
  const search = document.getElementById("stockSearch");
  const filter = document.getElementById("stockFilter");
  const refreshButton = document.getElementById("refreshStockButton");

  let session = null;
  let businessId = null;
  let business = null;
  let products = [];
  let refreshTimer = null;

  function headers(extra = {}) {
    return {
      ...supabaseHeaders(extra),
      Authorization: `Bearer ${session?.access_token || SUPABASE_KEY}`
    };
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#039;");
  }

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g,"")
      .trim().toLowerCase();
  }

  async function request(path, options = {}) {
    const response = await fetch(`${SUPABASE_REST}/${path}`, {
      ...options,
      headers: headers(options.headers || {})
    });
    const text = await response.text();
    if (!response.ok) {
      throw new Error(text || `Error ${response.status}`);
    }
    return text.trim() ? JSON.parse(text) : null;
  }

  function readSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  }

  function sessionStillUsable(value) {
    if (!value?.access_token) return false;
    const expiresAt = Number(value.expires_at || 0);
    return !expiresAt || expiresAt > Math.floor(Date.now()/1000) + 20;
  }

  async function resolveBusiness() {
    const userId = session?.user?.id;
    if (!userId) throw new Error("La sesión no contiene un usuario válido.");

    const access = await request(
      `merchant_users?user_id=eq.${encodeURIComponent(userId)}&active=eq.true&select=business_id,role&limit=1`
    );

    const row = Array.isArray(access) ? access[0] : null;
    if (!row?.business_id) {
      throw new Error("Esta cuenta no tiene un comercio asignado.");
    }

    businessId = Number(row.business_id);

    const businessRows = await request(
      `businesses?id=eq.${encodeURIComponent(businessId)}&select=id,name,slug&limit=1`
    );

    business = Array.isArray(businessRows) ? businessRows[0] : null;
    businessCaption.textContent =
      business?.name ? `Stock de ${business.name}` : `Comercio #${businessId}`;
  }

  function stockState(product) {
    if (product.stock_control !== true) return "off";
    const qty = Number(product.stock_quantity || 0);
    const low = Math.max(0, Number(product.stock_low_threshold || 0));
    if (qty <= 0) return "out";
    if (qty <= low) return "low";
    return "ok";
  }

  function stateLabel(state, qty) {
    if (state === "off") return "SIN CONTROL";
    if (state === "out") return "AGOTADO";
    if (state === "low") return `STOCK BAJO · ${qty}`;
    return `DISPONIBLE · ${qty}`;
  }

  function visibleProducts() {
    const q = normalize(search?.value);
    const selected = filter?.value || "all";

    return products.filter(product => {
      if (product.active === false) return false;
      if (q && !normalize(product.name).includes(q)) return false;
      const state = stockState(product);
      if (selected === "low" && state !== "low") return false;
      if (selected === "out" && state !== "out") return false;
      if (selected === "uncontrolled" && state !== "off") return false;
      return true;
    });
  }

  function updateSummary() {
    const published = products.filter(p => p.active !== false);
    const low = published.filter(p => stockState(p) === "low").length;
    const out = published.filter(p => stockState(p) === "out").length;

    document.getElementById("summaryProducts").textContent = published.length;
    document.getElementById("summaryLow").textContent = low;
    document.getElementById("summaryOut").textContent = out;
  }

  function render() {
    updateSummary();
    const rows = visibleProducts();

    if (!rows.length) {
      list.innerHTML = '<div class="panel empty">No hay productos para mostrar con este filtro.</div>';
      return;
    }

    list.innerHTML = rows.map(product => {
      const qty = Math.max(0, Number(product.stock_quantity || 0));
      const low = Math.max(0, Number(product.stock_low_threshold || 0));
      const state = stockState(product);
      return `
        <article class="panel stock-card" data-product-id="${escapeHTML(product.id)}">
          <div class="product-copy">
            <strong>${escapeHTML(product.name || "Producto")}</strong>
            <small>${product.active === false ? "No publicado" : "Publicado en el menú"}</small>
          </div>

          <span class="status-badge ${state}">
            ${escapeHTML(stateLabel(state, qty))}
          </span>

          <div class="stock-controls">
            <button class="step-button" type="button" data-adjust="-1" aria-label="Restar una unidad">−</button>
            <input class="stock-number" type="number" min="0" step="1" value="${qty}" aria-label="Cantidad disponible">
            <button class="step-button" type="button" data-adjust="1" aria-label="Sumar una unidad">+</button>
          </div>

          <div class="stock-settings">
            <label class="control-toggle">
              <input class="stock-enabled" type="checkbox" ${product.stock_control === true ? "checked" : ""}>
              <span>Controlar stock</span>
            </label>

            <label class="low-field">
              Avisar en
              <input class="low-number" type="number" min="0" step="1" value="${low}">
            </label>
          </div>
        </article>
      `;
    }).join("");
  }

  async function loadProducts({silent=false} = {}) {
    if (!silent) {
      list.innerHTML = '<div class="panel loading">Cargando productos...</div>';
      message.textContent = "";
    }

    const data = await request(
      `products?business_id=eq.${encodeURIComponent(businessId)}&select=id,business_id,name,active,available,sort_order,stock_control,stock_quantity,stock_low_threshold&order=sort_order.asc,id.asc`
    );

    products = Array.isArray(data) ? data : [];
    render();
  }

  async function callRpc(name, payload) {
    return request(`rpc/${name}`, {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(payload)
    });
  }

  function productByCard(card) {
    return products.find(p => String(p.id) === String(card?.dataset.productId));
  }

  async function saveQuantity(card, quantity) {
    const product = productByCard(card);
    if (!product) return;

    const clean = Math.max(0, Math.floor(Number(quantity || 0)));
    card.classList.add("saving");
    try {
      await callRpc("denexa_set_product_stock", {
        p_product_id: Number(product.id),
        p_quantity: clean
      });
      product.stock_quantity = clean;
      product.available = product.stock_control === true ? clean > 0 : product.available;
      message.textContent = "";
      render();
    } catch (error) {
      console.error(error);
      message.textContent = "No se pudo guardar la cantidad. Revisá que la actualización SQL de Stock V1 esté instalada.";
    } finally {
      card.classList.remove("saving");
    }
  }

  async function adjustQuantity(card, delta) {
    const product = productByCard(card);
    if (!product) return;

    card.classList.add("saving");
    try {
      const result = await callRpc("denexa_adjust_product_stock", {
        p_product_id: Number(product.id),
        p_delta: Number(delta)
      });

      const row = Array.isArray(result) ? result[0] : result;
      if (row && row.stock_quantity !== undefined) {
        product.stock_quantity = Number(row.stock_quantity);
        product.available = row.available;
      } else {
        product.stock_quantity = Math.max(0, Number(product.stock_quantity || 0) + Number(delta));
      }
      message.textContent = "";
      render();
    } catch (error) {
      console.error(error);
      message.textContent = "No se pudo modificar el stock.";
    } finally {
      card.classList.remove("saving");
    }
  }

  async function saveControl(card, enabled, threshold) {
    const product = productByCard(card);
    if (!product) return;

    card.classList.add("saving");
    try {
      const result = await callRpc("denexa_set_stock_control", {
        p_product_id: Number(product.id),
        p_enabled: Boolean(enabled),
        p_low_threshold: Math.max(0, Math.floor(Number(threshold || 0)))
      });

      const row = Array.isArray(result) ? result[0] : result;
      product.stock_control = Boolean(enabled);
      product.stock_low_threshold = Math.max(0, Math.floor(Number(threshold || 0)));
      if (row?.available !== undefined) product.available = row.available;

      message.textContent = "";
      render();
    } catch (error) {
      console.error(error);
      message.textContent = "No se pudo guardar la configuración de stock.";
    } finally {
      card.classList.remove("saving");
    }
  }

  list.addEventListener("click", async event => {
    const button = event.target.closest("[data-adjust]");
    if (!button) return;
    const card = button.closest(".stock-card");
    await adjustQuantity(card, Number(button.dataset.adjust || 0));
  });

  list.addEventListener("change", async event => {
    const card = event.target.closest(".stock-card");
    if (!card) return;

    if (event.target.classList.contains("stock-number")) {
      await saveQuantity(card, event.target.value);
      return;
    }

    if (
      event.target.classList.contains("stock-enabled") ||
      event.target.classList.contains("low-number")
    ) {
      const enabled = card.querySelector(".stock-enabled")?.checked === true;
      const threshold = card.querySelector(".low-number")?.value || 0;
      await saveControl(card, enabled, threshold);
    }
  });

  search?.addEventListener("input", render);
  filter?.addEventListener("change", render);
  refreshButton?.addEventListener("click", () => loadProducts());

  async function init() {
    session = readSession();

    if (!sessionStillUsable(session)) {
      window.location.href = "comercio.html";
      return;
    }

    try {
      await resolveBusiness();
      await loadProducts();

      refreshTimer = window.setInterval(
        () => loadProducts({silent:true}).catch(() => {}),
        15000
      );
    } catch (error) {
      console.error(error);
      message.textContent = error.message || "No se pudo abrir el control de stock.";
      list.innerHTML = '<div class="panel empty">Volvé al panel e iniciá sesión nuevamente.</div>';
    }
  }

  window.addEventListener("beforeunload", () => {
    if (refreshTimer) clearInterval(refreshTimer);
  });

  init();
})();
