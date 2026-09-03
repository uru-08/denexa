(() => {
  "use strict";

  const SESSION_KEY = "denexa_merchant_session_v1";
  const $ = (id) => document.getElementById(id);
  let session = null;
  let data = { items:[], products:[], options:[], category_rules:[], product_rules:[], option_rules:[] };

  function headers(extra={}) {
    return {
      ...supabaseHeaders(extra),
      Authorization:`Bearer ${session?.access_token || SUPABASE_KEY}`
    };
  }

  async function rpc(name, payload={}) {
    const res = await fetch(`${SUPABASE_REST}/rpc/${name}`, {
      method:"POST",
      headers:headers({Prefer:"return=representation"}),
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

  function itemOptions(selected, allowEmpty=true) {
    return (allowEmpty ? `<option value="">Sin consumo</option>` : "") +
      data.items.filter(x => x.active !== false)
        .map(x => `<option value="${x.id}" ${String(x.id)===String(selected)?"selected":""}>${esc(x.name)}</option>`)
        .join("");
  }

  function categoryList() {
    return [...new Map(data.products.map(p => [
      String(p.category_id),
      {id:p.category_id,name:p.category_name}
    ])).values()];
  }

  function categoryRule(id) {
    return data.category_rules.find(r => String(r.category_id)===String(id)) || null;
  }
  function productRule(id) {
    return data.product_rules.find(r => String(r.product_id)===String(id)) || null;
  }
  function optionRule(id) {
    return data.option_rules.find(r => String(r.option_id)===String(id)) || null;
  }
  function itemName(id) {
    return data.items.find(i => String(i.id)===String(id))?.name || "Sin consumo";
  }

  function renderItems() {
    $("countItems").textContent = data.items.filter(x=>x.active!==false).length;
    $("countLow").textContent = data.items.filter(x=>x.active!==false && Number(x.quantity)>0 && Number(x.quantity)<=Number(x.low_threshold||0)).length;
    $("countOut").textContent = data.items.filter(x=>x.active!==false && Number(x.quantity)<=0).length;

    $("itemsList").innerHTML = data.items.length ? data.items.map(item => {
      const q=Number(item.quantity||0), low=Number(item.low_threshold||0);
      const cls=q<=0?"out":q<=low?"low":"";
      const label=q<=0?"AGOTADO":q<=low?`BAJO \u00b7 ${q}`:`OK \u00b7 ${q}`;
      return `
        <article class="item-row" data-item-id="${item.id}">
          <div class="item-copy">
            <strong>${esc(item.name)}</strong>
            <small>Stock real disponible</small>
          </div>
          <span class="item-status ${cls}">${label}</span>
          <div class="qty-controls">
            <button type="button" data-delta="-1">&minus;</button>
            <input class="qty-input" type="number" min="0" step="1" value="${q}">
            <button type="button" data-delta="1">+</button>
          </div>
          <label class="low-control">Avisar en
            <input class="low-input" type="number" min="0" step="1" value="${low}">
          </label>
        </article>`;
    }).join("") : '<div class="empty">Todav\u00eda no hay insumos. Cre\u00e1 el primero.</div>';
  }

  function renderCategories() {
    const cats = categoryList();
    $("categoryRules").innerHTML = cats.length ? cats.map(c => {
      const r = categoryRule(c.id);
      return `
        <article class="rule-row" data-category-id="${c.id}">
          <div class="rule-copy">
            <strong>${esc(c.name)}</strong>
            <small>Todos los productos de esta categor\u00eda</small>
          </div>
          <select class="rule-item">${itemOptions(r?.inventory_item_id)}</select>
          <input class="rule-units" type="number" min="1" step="1" value="${Number(r?.units || 1)}">
          <button class="button secondary rule-save" type="button">Guardar</button>
        </article>`;
    }).join("") : '<div class="empty">No hay categor\u00edas con productos.</div>';
  }

  function renderExceptionControls() {
    $("exceptionProduct").innerHTML = data.products.map(p =>
      `<option value="${p.id}">${esc(p.name)} \u00b7 ${esc(p.category_name||"")}</option>`
    ).join("");
    $("exceptionInventory").innerHTML = itemOptions("", false);

    const rules = data.product_rules;
    $("exceptionsList").innerHTML = rules.length ? rules.map(r => {
      const p=data.products.find(x=>String(x.id)===String(r.product_id));
      if(!p) return "";
      return `
        <article class="rule-row">
          <div class="rule-copy">
            <strong>${esc(p.name)}</strong>
            <small>Excepci\u00f3n sobre ${esc(p.category_name||"su categor\u00eda")}</small>
          </div>
          <div>${esc(itemName(r.inventory_item_id))}</div>
          <div>${Number(r.units||1)} unidad(es)</div>
          <button class="button secondary" type="button" data-remove-product="${p.id}">Quitar</button>
        </article>`;
    }).join("") : '<div class="empty">No hay excepciones. Eso est\u00e1 bien para la mayor\u00eda de los productos.</div>';
  }

  function renderOptions() {
    $("optionSelect").innerHTML = data.options.map(o =>
      `<option value="${o.id}">${esc(o.product_name)} \u00b7 ${esc(o.group_name)} \u00b7 ${esc(o.option_name)}</option>`
    ).join("");
    $("optionInventory").innerHTML = itemOptions("", false);

    const rules=data.option_rules;
    $("optionsList").innerHTML = rules.length ? rules.map(r => {
      const o=data.options.find(x=>String(x.id)===String(r.option_id));
      if(!o) return "";
      return `
        <article class="rule-row">
          <div class="rule-copy">
            <strong>${esc(o.option_name)}</strong>
            <small>${esc(o.product_name)} \u00b7 ${esc(o.group_name)}</small>
          </div>
          <div>${esc(itemName(r.inventory_item_id))}</div>
          <div>+${Number(r.units||1)} unidad(es)</div>
          <button class="button secondary" type="button" data-remove-option="${o.id}">Quitar</button>
        </article>`;
    }).join("") : '<div class="empty">No hay extras que descuenten stock todav\u00eda.</div>';
  }

  async function load() {
    $("message").textContent="";
    data = await rpc("denexa_inventory_snapshot_v21") || data;
    renderItems();
    renderCategories();
    renderExceptionControls();
    renderOptions();
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
      $("itemQty").value="0";
      $("itemLow").value="3";
      await load();
    } catch(err) {
      $("message").textContent="No se pudo crear el insumo.";
      console.error(err);
    }
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
    } catch(err) {
      $("message").textContent="No se pudo modificar el stock.";
      console.error(err);
    }
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
    } catch(err) {
      $("message").textContent="No se pudo guardar el insumo.";
      console.error(err);
    }
  });

  $("categoryRules").addEventListener("click", async (e) => {
    const btn=e.target.closest(".rule-save");
    if(!btn) return;
    const row=btn.closest("[data-category-id]");
    try {
      await rpc("denexa_inventory_set_category_rule", {
        p_category_id:Number(row.dataset.categoryId),
        p_inventory_item_id:row.querySelector(".rule-item").value ? Number(row.querySelector(".rule-item").value) : null,
        p_units:Number(row.querySelector(".rule-units").value||1)
      });
      await load();
    } catch(err) {
      $("message").textContent="No se pudo guardar la regla de categor\u00eda.";
      console.error(err);
    }
  });

  $("saveExceptionBtn").addEventListener("click", async () => {
    if(!$("exceptionProduct").value || !$("exceptionInventory").value) return;
    try {
      await rpc("denexa_inventory_set_product_rule", {
        p_product_id:Number($("exceptionProduct").value),
        p_inventory_item_id:Number($("exceptionInventory").value),
        p_units:Number($("exceptionUnits").value||1)
      });
      await load();
    } catch(err) {
      $("message").textContent="No se pudo guardar la excepci\u00f3n.";
      console.error(err);
    }
  });

  $("exceptionsList").addEventListener("click", async (e) => {
    const btn=e.target.closest("[data-remove-product]");
    if(!btn) return;
    try {
      await rpc("denexa_inventory_set_product_rule", {
        p_product_id:Number(btn.dataset.removeProduct),
        p_inventory_item_id:null,
        p_units:1
      });
      await load();
    } catch(err) {
      $("message").textContent="No se pudo quitar la excepci\u00f3n.";
      console.error(err);
    }
  });

  $("saveOptionBtn").addEventListener("click", async () => {
    if(!$("optionSelect").value || !$("optionInventory").value) return;
    try {
      await rpc("denexa_inventory_set_option_rule", {
        p_option_id:Number($("optionSelect").value),
        p_inventory_item_id:Number($("optionInventory").value),
        p_units:Number($("optionUnits").value||1)
      });
      await load();
    } catch(err) {
      $("message").textContent="No se pudo guardar el extra.";
      console.error(err);
    }
  });

  $("optionsList").addEventListener("click", async (e) => {
    const btn=e.target.closest("[data-remove-option]");
    if(!btn) return;
    try {
      await rpc("denexa_inventory_set_option_rule", {
        p_option_id:Number(btn.dataset.removeOption),
        p_inventory_item_id:null,
        p_units:1
      });
      await load();
    } catch(err) {
      $("message").textContent="No se pudo quitar el extra.";
      console.error(err);
    }
  });

  $("reloadBtn").addEventListener("click", () => load().catch(console.error));
  window.addEventListener("message", e => {
    if(e.data?.type==="denexa-stock-refresh") load().catch(()=>{});
  });

  session=readSession();
  if(!session?.access_token) {
    $("message").textContent="Volv\u00e9 al panel e inici\u00e1 sesi\u00f3n.";
  } else {
    load().catch(err => {
      console.error(err);
      $("message").textContent="No se pudo cargar la correcci\u00f3n de Stock.";
    });
  }
})();
