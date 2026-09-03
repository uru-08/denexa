(() => {
  "use strict";

  const SESSION_KEY = "denexa_merchant_session_v1";
  const $ = (id) => document.getElementById(id);

  let session = null;
  let data = { items:[], products:[], options:[], product_rules:[], option_rules:[] };

  function h(extra={}) {
    return {
      ...supabaseHeaders(extra),
      Authorization:`Bearer ${session?.access_token || SUPABASE_KEY}`
    };
  }

  async function rpc(name, payload={}) {
    const res = await fetch(`${SUPABASE_REST}/rpc/${name}`, {
      method:"POST",
      headers:h({Prefer:"return=representation"}),
      body:JSON.stringify(payload)
    });
    const text = await res.text();
    if (!res.ok) throw new Error(text || `Error ${res.status}`);
    return text.trim() ? JSON.parse(text) : null;
  }

  function esc(v) {
    return String(v ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;").replace(/'/g,"&#039;");
  }

  function readSession() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); }
    catch { return null; }
  }

  function itemOptions(selected) {
    return `<option value="">Sin consumo</option>` + data.items
      .filter(x => x.active !== false)
      .map(x => `<option value="${x.id}" ${String(x.id)===String(selected)?"selected":""}>${esc(x.name)}</option>`)
      .join("");
  }

  function ruleForProduct(id) {
    return data.product_rules.find(r => String(r.product_id)===String(id)) || null;
  }

  function ruleForOption(id) {
    return data.option_rules.find(r => String(r.option_id)===String(id)) || null;
  }

  function state(item) {
    const q=Number(item.quantity||0), low=Number(item.low_threshold||0);
    if(q<=0) return ["out","AGOTADO"];
    if(q<=low) return ["low",`BAJO · ${q}`];
    return ["",`OK · ${q}`];
  }

  function renderItems() {
    $("countItems").textContent = data.items.filter(x=>x.active!==false).length;
    $("countLow").textContent = data.items.filter(x=>x.active!==false && Number(x.quantity)>0 && Number(x.quantity)<=Number(x.low_threshold||0)).length;
    $("countOut").textContent = data.items.filter(x=>x.active!==false && Number(x.quantity)<=0).length;

    $("itemsList").innerHTML = data.items.length ? data.items.map(item => {
      const [cls,label] = state(item);
      return `
        <article class="item-row" data-item-id="${item.id}">
          <div class="item-copy">
            <strong>${esc(item.name)}</strong>
            <small>Stock real disponible</small>
          </div>
          <span class="item-status ${cls}">${label}</span>
          <div class="qty-controls">
            <button type="button" data-delta="-1">−</button>
            <input class="qty-input" type="number" min="0" step="1" value="${Number(item.quantity||0)}">
            <button type="button" data-delta="1">+</button>
          </div>
          <label class="low-control">Avisar en
            <input class="low-input" type="number" min="0" step="1" value="${Number(item.low_threshold||0)}">
          </label>
        </article>`;
    }).join("") : '<div class="empty">Todavía no hay insumos. Creá el primero.</div>';

    fillBulkSelectors();
  }

  function renderProducts() {
    $("productsRules").innerHTML = data.products.length ? data.products.map(p => {
      const rule = ruleForProduct(p.id);
      return `
        <article class="rule-row" data-product-id="${p.id}">
          <div class="rule-copy">
            <strong>${esc(p.name)}</strong>
            <small>${esc(p.category_name || "Sin categoría")}</small>
          </div>
          <select class="rule-item">${itemOptions(rule?.inventory_item_id)}</select>
          <input class="rule-units" type="number" min="1" step="1" value="${Number(rule?.units || 1)}">
          <button class="button secondary rule-save" type="button">Guardar</button>
        </article>`;
    }).join("") : '<div class="empty">No hay productos publicados.</div>';
  }

  function renderOptions() {
    $("optionsRules").innerHTML = data.options.length ? data.options.map(o => {
      const rule = ruleForOption(o.id);
      return `
        <article class="rule-row" data-option-id="${o.id}">
          <div class="rule-copy">
            <strong>${esc(o.option_name)}</strong>
            <small>${esc(o.product_name)} · ${esc(o.group_name)}</small>
          </div>
          <select class="rule-item">${itemOptions(rule?.inventory_item_id)}</select>
          <input class="rule-units" type="number" min="1" step="1" value="${Number(rule?.units || 1)}">
          <button class="button secondary rule-save" type="button">Guardar</button>
        </article>`;
    }).join("") : '<div class="empty">No hay opciones/extras configurados.</div>';
  }

  function fillBulkSelectors() {
    const categories = [...new Map(data.products.map(p => [String(p.category_id), {id:p.category_id,name:p.category_name}])).values()];
    $("bulkCategory").innerHTML = categories.map(c=>`<option value="${c.id}">${esc(c.name||"Sin categoría")}</option>`).join("");
    $("bulkInventory").innerHTML = itemOptions("");
  }

  async function load() {
    $("message").textContent="";
    const snap = await rpc("denexa_inventory_snapshot");
    data = snap || data;
    renderItems(); renderProducts(); renderOptions();
  }

  $("newItemBtn").addEventListener("click", () => $("itemDialog").showModal());
  $("cancelItemBtn").addEventListener("click", () => $("itemDialog").close());

  $("itemForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await rpc("denexa_inventory_create_item", {
        p_name:$("itemName").value.trim(),
        p_quantity:Number($("itemQty").value||0),
        p_low_threshold:Number($("itemLow").value||0)
      });
      $("itemDialog").close();
      $("itemForm").reset();
      $("itemQty").value="0"; $("itemLow").value="3";
      await load();
    } catch(err) { $("message").textContent="No se pudo crear el insumo."; console.error(err); }
  });

  $("itemsList").addEventListener("click", async (e) => {
    const btn=e.target.closest("[data-delta]");
    if(!btn) return;
    const row=btn.closest("[data-item-id]");
    try {
      await rpc("denexa_inventory_adjust_item", {
        p_inventory_item_id:Number(row.dataset.itemId),
        p_delta:Number(btn.dataset.delta)
      });
      await load();
    } catch(err) { $("message").textContent="No se pudo modificar el stock."; console.error(err); }
  });

  $("itemsList").addEventListener("change", async (e) => {
    const row=e.target.closest("[data-item-id]");
    if(!row) return;
    try {
      await rpc("denexa_inventory_set_item", {
        p_inventory_item_id:Number(row.dataset.itemId),
        p_quantity:Number(row.querySelector(".qty-input").value||0),
        p_low_threshold:Number(row.querySelector(".low-input").value||0)
      });
      await load();
    } catch(err) { $("message").textContent="No se pudo guardar el insumo."; console.error(err); }
  });

  $("productsRules").addEventListener("click", async (e) => {
    const btn=e.target.closest(".rule-save"); if(!btn) return;
    const row=btn.closest("[data-product-id]");
    try {
      await rpc("denexa_inventory_set_product_rule", {
        p_product_id:Number(row.dataset.productId),
        p_inventory_item_id:row.querySelector(".rule-item").value ? Number(row.querySelector(".rule-item").value) : null,
        p_units:Number(row.querySelector(".rule-units").value||1)
      });
      await load();
    } catch(err) { $("message").textContent="No se pudo guardar el consumo del producto."; console.error(err); }
  });

  $("optionsRules").addEventListener("click", async (e) => {
    const btn=e.target.closest(".rule-save"); if(!btn) return;
    const row=btn.closest("[data-option-id]");
    try {
      await rpc("denexa_inventory_set_option_rule", {
        p_option_id:Number(row.dataset.optionId),
        p_inventory_item_id:row.querySelector(".rule-item").value ? Number(row.querySelector(".rule-item").value) : null,
        p_units:Number(row.querySelector(".rule-units").value||1)
      });
      await load();
    } catch(err) { $("message").textContent="No se pudo guardar el consumo del extra."; console.error(err); }
  });

  $("applyCategoryBtn").addEventListener("click", async () => {
    if(!$("bulkInventory").value) { $("message").textContent="Elegí un insumo."; return; }
    try {
      await rpc("denexa_inventory_apply_category_rule", {
        p_category_id:Number($("bulkCategory").value),
        p_inventory_item_id:Number($("bulkInventory").value),
        p_units:Number($("bulkUnits").value||1)
      });
      await load();
    } catch(err) { $("message").textContent="No se pudo aplicar el consumo a la categoría."; console.error(err); }
  });

  $("reloadBtn").addEventListener("click", () => load().catch(console.error));
  window.addEventListener("message", e => { if(e.data?.type==="denexa-stock-refresh") load().catch(()=>{}); });

  session = readSession();
  if(!session?.access_token) {
    $("message").textContent="Volvé al panel e iniciá sesión.";
  } else {
    load().catch(err => {
      console.error(err);
      $("message").textContent="No se pudo cargar Stock V2. Ejecutá primero el SQL de instalación.";
    });
  }
})();
