/* =========================================================
   DENEXA V167 - CANTIDAD DE EXTRAS UNIVERSAL
   Se carga DESPUES de app.js.
   No modifica tamaños, opciones single, empanadas ni promos.
   ========================================================= */

(function () {
  "use strict";

  /*
    Mapa:
      optionId -> cantidad elegida de ese extra.
    El checkbox original sigue siendo la fuente de "seleccionado/no seleccionado"
    para mantener compatibilidad con validaciones y dependencias de app.js.
  */
  let denexaExtraCounts = new Map();

  const originalOpenProduct = openProduct;
  const originalCloseProductModal = closeProductModal;
  const originalCurrentUnitPrice = currentUnitPrice;
  const originalAddCurrentProductToCart = addCurrentProductToCart;

  function normalized(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function groupOptions(group) {
    return getGroupOptions(group.id);
  }

  /*
    Una sección admite cantidades cuando:
    - no es selección única;
    - no es el sistema especial de empanadas;
    - y es claramente un grupo de extras/adicionales/agregados,
      O es un grupo opcional múltiple con opciones pagas.
    Esto hace la función reutilizable para cualquier comercio DENEXA.
  */
  function isQuantityExtraGroup(group) {
    if (!group || currentProductIsEmpanadas()) {
      return false;
    }

    if (String(group.selection_type || "").toLowerCase() === "single") {
      return false;
    }

    if (typeof isSizeGroup === "function" && isSizeGroup(group)) {
      return false;
    }

    const name = normalized(group.name);
    const namedAsExtra =
      name.includes("extra") ||
      name.includes("adicional") ||
      name.includes("agregado") ||
      name.includes("complemento") ||
      name.includes("topping");

    const opts = groupOptions(group);
    const hasPaidOptions =
      opts.some((option) => Number(option.price_delta || 0) > 0);

    const optionalPaidMultiple =
      !group.required && hasPaidOptions;

    return namedAsExtra || optionalPaidMultiple;
  }

  function extraCount(optionId) {
    return Math.max(
      0,
      Number(
        denexaExtraCounts.get(String(optionId)) || 0
      )
    );
  }

  function optionById(optionId) {
    return options.find(
      (option) => String(option.id) === String(optionId)
    ) || null;
  }

  function groupById(groupId) {
    return groups.find(
      (group) => String(group.id) === String(groupId)
    ) || null;
  }

  function groupForOption(option) {
    return option ? groupById(option.group_id) : null;
  }

  function refreshExtraControl(control, optionId) {
    const count = extraCount(optionId);
    const value = control.querySelector(".denexa-extra-count");
    const minus = control.querySelector(".denexa-extra-minus");

    if (value) {
      value.textContent = String(count);
    }

    if (minus) {
      minus.disabled = count <= 0;
    }

    const row = control.closest(".option-row");
    row?.classList.toggle("denexa-extra-selected", count > 0);
  }

  function setExtraCount(control, optionId, nextCount) {
    const row = control.closest(".option-row");
    const input = row?.querySelector("input");
    const previous = extraCount(optionId);
    const safeCount = Math.max(0, Number(nextCount || 0));

    if (!input) {
      return;
    }

    /*
      Al pasar 0 -> 1 o 1 -> 0 actualizamos también el checkbox original.
      Así siguen funcionando:
      - max_select de opciones distintas,
      - dependencias,
      - required,
      - selectedOptions.
    */
    if (previous <= 0 && safeCount > 0) {
      input.checked = true;
      input.dispatchEvent(
        new Event("change", { bubbles:true })
      );

      /*
        app.js puede rechazar el check si se alcanzó max_select.
        En ese caso no aumentamos la cantidad.
      */
      if (!input.checked) {
        denexaExtraCounts.delete(String(optionId));
        refreshExtraControl(control, optionId);
        return;
      }
    }

    if (previous > 0 && safeCount <= 0) {
      input.checked = false;
      input.dispatchEvent(
        new Event("change", { bubbles:true })
      );
    }

    if (safeCount > 0) {
      denexaExtraCounts.set(
        String(optionId),
        safeCount
      );
    } else {
      denexaExtraCounts.delete(
        String(optionId)
      );
    }

    refreshExtraControl(control, optionId);
    refreshPrice();
    hideProductError();
  }

  function enhanceExtraGroups() {
    if (!currentProduct || currentProductIsEmpanadas()) {
      return;
    }

    getProductGroups(currentProduct.id)
      .forEach((group) => {
        if (!isQuantityExtraGroup(group)) {
          return;
        }

        const section =
          productModalContent.querySelector(
            `.option-group[data-group-id="${group.id}"]`
          );

        if (!section) {
          return;
        }

        section.classList.add("denexa-quantity-extra-group");

        const headerTag =
          section.querySelector(".option-group-header span");

        if (headerTag && !group.required) {
          headerTag.textContent = "ELEGÍ CANTIDAD";
        }

        section
          .querySelectorAll(".option-row")
          .forEach((row) => {
            const input = row.querySelector("input");
            const optionId =
              String(
                row.dataset.optionId ||
                input?.value ||
                ""
              );

            if (!input || !optionId) {
              return;
            }

            /*
              Conservamos el input para la lógica original, pero visualmente
              lo reemplazamos por - cantidad +.
            */
            input.classList.add("denexa-extra-native-input");
            input.tabIndex = -1;

            if (
              row.querySelector(
                ".denexa-extra-quantity-control"
              )
            ) {
              return;
            }

            const control =
              document.createElement("div");

            control.className =
              "denexa-extra-quantity-control";

            control.dataset.optionId = optionId;

            control.innerHTML = `
              <button
                type="button"
                class="denexa-extra-minus"
                aria-label="Quitar unidad"
              >−</button>

              <strong
                class="denexa-extra-count"
                aria-live="polite"
              >0</strong>

              <button
                type="button"
                class="denexa-extra-plus"
                aria-label="Agregar unidad"
              >+</button>
            `;

            control.addEventListener(
              "click",
              (event) => {
                /*
                  Está dentro de <label>; impedimos que el click del botón
                  altere el checkbox automáticamente.
                */
                event.preventDefault();
                event.stopPropagation();
              }
            );

            control
              .querySelector(".denexa-extra-minus")
              ?.addEventListener(
                "click",
                (event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  setExtraCount(
                    control,
                    optionId,
                    extraCount(optionId) - 1
                  );
                }
              );

            control
              .querySelector(".denexa-extra-plus")
              ?.addEventListener(
                "click",
                (event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  setExtraCount(
                    control,
                    optionId,
                    extraCount(optionId) + 1
                  );
                }
              );

            /*
              Tocar el texto del extra también suma una unidad.
              Es más cómodo en móvil.
            */
            row.addEventListener(
              "click",
              (event) => {
                if (
                  event.target.closest(
                    ".denexa-extra-quantity-control"
                  )
                ) {
                  return;
                }

                event.preventDefault();

                setExtraCount(
                  control,
                  optionId,
                  extraCount(optionId) + 1
                );
              }
            );

            row.appendChild(control);
            refreshExtraControl(control, optionId);
          });
      });
  }

  /*
    Precio:
    app.js ya suma una vez cada option seleccionada.
    Aquí sumamos únicamente las copias adicionales:
    cantidad 1 => +0 extra sobre lo original
    cantidad 2 => +1 precio_delta adicional
    cantidad 3 => +2, etc.
  */
  currentUnitPrice = function () {
    const originalValue =
      Number(originalCurrentUnitPrice() || 0);

    let repeatedExtras = 0;

    denexaExtraCounts.forEach(
      (quantity, optionId) => {
        const qty = Math.max(0, Number(quantity || 0));

        if (qty <= 1) {
          return;
        }

        const option = optionById(optionId);
        const group = groupForOption(option);

        if (
          !option ||
          !group ||
          !isQuantityExtraGroup(group)
        ) {
          return;
        }

        repeatedExtras +=
          (qty - 1) *
          Number(option.price_delta || 0);
      }
    );

    return originalValue + repeatedExtras;
  };

  /*
    Abrir producto:
    reinicia cantidades y luego transforma visualmente
    solamente los grupos de extras.
  */
  openProduct = function (product) {
    denexaExtraCounts = new Map();

    originalOpenProduct(product);

    enhanceExtraGroups();
    refreshPrice();
  };

  /*
    Al agregar:
    - app.js calcula el total usando currentUnitPrice() ya corregido.
    - después ajustamos la descripción almacenada:
      "2 x Extra carne"
    - option.price pasa a representar el costo total de esas unidades
      por cada unidad del producto principal.
  */
  addCurrentProductToCart = async function () {
    const snapshot =
      new Map(denexaExtraCounts);

    const previousLength =
      Array.isArray(cart)
        ? cart.length
        : 0;

    await originalAddCurrentProductToCart();

    if (
      !Array.isArray(cart) ||
      cart.length <= previousLength
    ) {
      return;
    }

    const item =
      cart[cart.length - 1];

    if (
      !item ||
      item.type === "empanadas" ||
      !Array.isArray(item.options)
    ) {
      return;
    }

    item.options.forEach((storedOption) => {
      const qty =
        Math.max(
          0,
          Number(
            snapshot.get(
              String(storedOption.optionId)
            ) || 0
          )
        );

      if (qty <= 1) {
        return;
      }

      const sourceOption =
        optionById(storedOption.optionId);

      const rawPrice =
        Number(
          sourceOption?.price_delta ??
          storedOption.price ??
          0
        );

      storedOption.optionName =
        `${qty} x ${sourceOption?.name || storedOption.optionName}`;

      storedOption.price =
        rawPrice * qty;

      storedOption.quantity = qty;
      storedOption.unitPrice = rawPrice;
    });

    saveCart();
    updateCartBar();
  };

  closeProductModal = function () {
    denexaExtraCounts = new Map();
    originalCloseProductModal();
  };

  /*
    Estilos globales, independientes de la estética de cada comercio.
    Se insertan desde JS para no modificar app.css ni los temas existentes.
  */
  const style =
    document.createElement("style");

  style.id = "denexaExtraQuantityStyles";

  style.textContent = `
    .denexa-quantity-extra-group .option-row{
      cursor:pointer;
    }

    .denexa-quantity-extra-group .denexa-extra-native-input{
      position:absolute !important;
      width:1px !important;
      height:1px !important;
      opacity:0 !important;
      pointer-events:none !important;
    }

    .denexa-extra-quantity-control{
      flex:0 0 auto;
      display:grid;
      grid-template-columns:34px 34px 34px;
      align-items:center;
      justify-content:center;
      gap:4px;
      margin-left:auto;
      padding-left:8px;
    }

    .denexa-extra-quantity-control button{
      width:34px;
      height:34px;
      display:grid;
      place-items:center;
      padding:0;
      border:1px solid rgba(120,130,145,.28);
      border-radius:10px;
      background:#fff;
      color:#162235;
      font-size:1.22rem;
      font-weight:900;
      line-height:1;
      cursor:pointer;
    }

    .denexa-extra-quantity-control button:disabled{
      opacity:.35;
      cursor:default;
    }

    .denexa-extra-quantity-control .denexa-extra-plus{
      background:#111;
      color:#fff;
      border-color:#111;
    }

    .denexa-extra-count{
      min-width:34px;
      text-align:center;
      font-size:.94rem;
      font-weight:950;
    }

    .denexa-extra-selected{
      outline:2px solid rgba(245,197,24,.42);
      outline-offset:-2px;
    }

    html[data-store-theme*="mamma"] .denexa-extra-quantity-control .denexa-extra-plus{
      background:#0B4FB3;
      border-color:#0B4FB3;
      color:#fff;
    }

    html[data-store-theme*="mamma"] .denexa-extra-selected{
      outline-color:rgba(11,79,179,.28);
    }

    @media(max-width:430px){
      .denexa-extra-quantity-control{
        grid-template-columns:32px 30px 32px;
        gap:3px;
        padding-left:5px;
      }

      .denexa-extra-quantity-control button{
        width:32px;
        height:32px;
        border-radius:9px;
      }

      .denexa-extra-count{
        min-width:30px;
        font-size:.88rem;
      }

      .denexa-quantity-extra-group .option-copy{
        min-width:0;
      }
    }
  `;

  document.head.appendChild(style);

  /* =========================================================
     DENEXA - CONTROL DE INVENTARIO EN MENU PUBLICO
     Usa Stock V2/V2.1 sin tocar la estetica del comercio.
     - Agotado automatico por insumo real.
     - Limite de cantidad segun stock disponible.
     - Suma consumos de extras (incluye cantidades repetidas).
     - Revalida stock antes de agregar y antes de confirmar.
     ========================================================= */

  const denexaInventoryState = {
    ready:false,
    loading:false,
    products:new Map(),
    options:new Map(),
    items:new Map(),
    manualAvailability:new Map(),
    lastRefresh:0
  };

  function denexaInventoryMessage(text) {
    if (typeof showToast === "function") {
      showToast(text);
      return;
    }
    window.alert(text);
  }

  async function denexaInventoryRpc(name, payload={}) {
    const response = await fetch(
      `${SUPABASE_REST}/rpc/${name}`,
      {
        method:"POST",
        headers:supabaseHeaders({ Prefer:"return=representation" }),
        body:JSON.stringify(payload)
      }
    );

    const text = await response.text();

    if (!response.ok) {
      throw new Error(text || `Error ${response.status}`);
    }

    return text.trim() ? JSON.parse(text) : null;
  }

  function denexaInventoryProductRule(productId) {
    return denexaInventoryState.products.get(String(productId)) || null;
  }

  function denexaInventoryOptionRule(optionId) {
    return denexaInventoryState.options.get(String(optionId)) || null;
  }

  function denexaInventoryItem(itemId) {
    return denexaInventoryState.items.get(String(itemId)) || null;
  }

  function denexaInventoryCartConsumption() {
    const needed = new Map();

    function add(itemId, units) {
      if (!itemId || !Number.isFinite(Number(units)) || Number(units) <= 0) {
        return;
      }
      const key=String(itemId);
      needed.set(key, Number(needed.get(key) || 0) + Number(units));
    }

    if (!Array.isArray(cart)) {
      return needed;
    }

    cart.forEach((item) => {
      const qty=Math.max(0, Number(item?.quantity || 0));
      if (qty <= 0) return;

      const base=denexaInventoryProductRule(item.productId);
      if (base?.inventory_item_id && Number(base.units_per_product || 0) > 0) {
        add(base.inventory_item_id, Number(base.units_per_product) * qty);
      }

      if (Array.isArray(item.options)) {
        item.options.forEach((storedOption) => {
          const rule=denexaInventoryOptionRule(storedOption.optionId);
          if (!rule?.inventory_item_id) return;

          const optionQty=Math.max(1, Number(storedOption.quantity || 1));
          add(rule.inventory_item_id, Number(rule.units || 1) * optionQty * qty);
        });
      }
    });

    return needed;
  }

  function denexaInventorySelectedOptionQuantities(overrideOptionId=null, overrideCount=null) {
    const result=new Map();

    if (selectedOptions instanceof Map) {
      selectedOptions.forEach((ids) => {
        (Array.isArray(ids) ? ids : []).forEach((id) => {
          const key=String(id);
          const repeated=extraCount(key);
          result.set(key, repeated > 0 ? repeated : 1);
        });
      });
    }

    if (overrideOptionId !== null) {
      const key=String(overrideOptionId);
      const count=Math.max(0, Number(overrideCount || 0));
      if (count > 0) result.set(key,count);
      else result.delete(key);
    }

    return result;
  }

  function denexaInventoryCurrentPerUnit(overrideOptionId=null, overrideCount=null) {
    const perUnit=new Map();

    function add(itemId, units) {
      if (!itemId || Number(units) <= 0) return;
      const key=String(itemId);
      perUnit.set(key, Number(perUnit.get(key) || 0) + Number(units));
    }

    if (!currentProduct) {
      return perUnit;
    }

    const base=denexaInventoryProductRule(currentProduct.id);
    if (base?.inventory_item_id && Number(base.units_per_product || 0) > 0) {
      add(base.inventory_item_id, Number(base.units_per_product));
    }

    denexaInventorySelectedOptionQuantities(overrideOptionId,overrideCount)
      .forEach((optionQty, optionId) => {
        const rule=denexaInventoryOptionRule(optionId);
        if (!rule?.inventory_item_id) return;
        add(rule.inventory_item_id, Number(rule.units || 1) * Number(optionQty || 1));
      });

    return perUnit;
  }

  function denexaInventoryLimitForCurrent(overrideOptionId=null, overrideCount=null) {
    if (!denexaInventoryState.ready || !currentProduct) {
      return { max:Infinity, limiter:null };
    }

    const cartNeed=denexaInventoryCartConsumption();
    const perUnit=denexaInventoryCurrentPerUnit(overrideOptionId,overrideCount);

    if (!perUnit.size) {
      return { max:Infinity, limiter:null };
    }

    let max=Infinity;
    let limiter=null;

    perUnit.forEach((unitsPerProduct,itemId) => {
      const item=denexaInventoryItem(itemId);
      if (!item) return;

      const stock=Math.max(0,Number(item.quantity || 0));
      const already=Math.max(0,Number(cartNeed.get(String(itemId)) || 0));
      const free=Math.max(0,stock-already);
      const candidate=Math.floor(free / Math.max(1,Number(unitsPerProduct || 1)));

      if (candidate < max) {
        max=candidate;
        limiter={
          item,
          stock,
          already,
          free,
          unitsPerProduct:Number(unitsPerProduct || 1),
          max:candidate
        };
      }
    });

    return { max, limiter };
  }

  function denexaInventoryLimitText(limit) {
    const info=limit?.limiter;
    if (!info) {
      return "No hay stock suficiente para agregar esa cantidad.";
    }

    const name=String(info.item?.name || "este insumo").toUpperCase();

    if (info.unitsPerProduct > 1) {
      return `Solo quedan ${info.free} ${name} disponibles. Este producto usa ${info.unitsPerProduct} por unidad; podés pedir hasta ${info.max}.`;
    }

    return `Solo quedan ${info.free} ${name} disponibles. Podés pedir hasta ${info.max}.`;
  }

  function denexaInventoryCanApplyExtraCount(optionId,nextCount) {
    if (!denexaInventoryState.ready || !currentProduct) {
      return true;
    }

    const limit=denexaInventoryLimitForCurrent(optionId,nextCount);
    const qty=Math.max(1,Number(currentQuantity || 1));

    if (qty <= limit.max) {
      return true;
    }

    denexaInventoryMessage(denexaInventoryLimitText(limit));
    return false;
  }

  const denexaOriginalSetExtraCount=setExtraCount;
  setExtraCount=function(control,optionId,nextCount) {
    const safe=Math.max(0,Number(nextCount || 0));

    if (!denexaInventoryCanApplyExtraCount(optionId,safe)) {
      return;
    }

    denexaOriginalSetExtraCount(control,optionId,safe);
  };

  function denexaInventoryApplyToProducts() {
    if (!Array.isArray(products) || !products.length) {
      return false;
    }

    let changed=false;

    products.forEach((product) => {
      const key=String(product.id);

      if (!denexaInventoryState.manualAvailability.has(key)) {
        denexaInventoryState.manualAvailability.set(key, product.available !== false);
      }

      const manual=denexaInventoryState.manualAvailability.get(key) !== false;
      const rule=denexaInventoryProductRule(product.id);
      const stockAllows=rule ? Number(rule.max_quantity || 0) > 0 : true;
      const next=manual && stockAllows;

      if (product.available !== next) {
        product.available=next;
        changed=true;
      }

      product.denexaInventoryMax = rule ? Number(rule.max_quantity || 0) : Infinity;
    });

    return changed;
  }

  async function denexaRefreshInventory(force=false,rerender=true) {
    if (!business?.id || denexaInventoryState.loading) {
      return denexaInventoryState.ready;
    }

    if (!force && Date.now()-denexaInventoryState.lastRefresh < 2500) {
      return denexaInventoryState.ready;
    }

    denexaInventoryState.loading=true;

    try {
      const snapshot=await denexaInventoryRpc(
        "denexa_public_inventory_availability",
        { p_business_id:Number(business.id) }
      );

      const productRows=Array.isArray(snapshot?.products) ? snapshot.products : [];
      const optionRows=Array.isArray(snapshot?.options) ? snapshot.options : [];
      const itemRows=Array.isArray(snapshot?.items) ? snapshot.items : [];

      denexaInventoryState.products=new Map(
        productRows.map((row) => [String(row.product_id),row])
      );
      denexaInventoryState.options=new Map(
        optionRows.map((row) => [String(row.option_id),row])
      );
      denexaInventoryState.items=new Map(
        itemRows.map((row) => [String(row.id),row])
      );
      denexaInventoryState.ready=true;
      denexaInventoryState.lastRefresh=Date.now();

      const changed=denexaInventoryApplyToProducts();
      if (changed && rerender && typeof renderCatalog === "function") {
        renderCatalog();
      }

      return true;
    } catch(error) {
      console.error("DENEXA inventario publico:",error);
      return false;
    } finally {
      denexaInventoryState.loading=false;
    }
  }

  function denexaInventoryAttachMainQuantityGuard() {
    const plus=document.getElementById("increaseQuantity");
    if (!plus || plus.dataset.denexaInventoryGuard === "1") {
      return;
    }

    plus.dataset.denexaInventoryGuard="1";

    plus.addEventListener("click",(event) => {
      if (!denexaInventoryState.ready) return;

      const limit=denexaInventoryLimitForCurrent();
      const next=Math.max(1,Number(currentQuantity || 1))+1;

      if (next > limit.max) {
        event.preventDefault();
        event.stopImmediatePropagation();
        denexaInventoryMessage(denexaInventoryLimitText(limit));
      }
    },true);
  }

  const denexaQuantityOpenProduct=openProduct;
  openProduct=function(product) {
    const rule=denexaInventoryProductRule(product?.id);

    if (denexaInventoryState.ready && rule && Number(rule.max_quantity || 0) <= 0) {
      denexaInventoryMessage("Este producto está agotado por el momento.");
      return;
    }

    denexaQuantityOpenProduct(product);
    denexaInventoryAttachMainQuantityGuard();
  };

  const denexaInventoryAddToCart=addCurrentProductToCart;
  addCurrentProductToCart=async function() {
    await denexaRefreshInventory(true,true);

    const limit=denexaInventoryLimitForCurrent();
    const qty=Math.max(1,Number(currentQuantity || 1));

    if (qty > limit.max) {
      denexaInventoryMessage(denexaInventoryLimitText(limit));
      return;
    }

    await denexaInventoryAddToCart();
  };

  function denexaInventoryValidateCart() {
    if (!denexaInventoryState.ready || !Array.isArray(cart)) {
      return { ok:true };
    }

    const need=denexaInventoryCartConsumption();

    for (const [itemId,required] of need.entries()) {
      const item=denexaInventoryItem(itemId);
      if (!item) continue;

      const stock=Math.max(0,Number(item.quantity || 0));
      if (Number(required) > stock) {
        const name=String(item.name || "este insumo").toUpperCase();
        return {
          ok:false,
          message:`Stock actualizado: solo quedan ${stock} ${name} disponibles. Ajustá tu pedido para continuar.`
        };
      }
    }

    return { ok:true };
  }

  let denexaInventoryCheckoutBypass=false;

  function denexaInventoryInstallCheckoutGuard() {
    if (!checkoutForm || checkoutForm.dataset.denexaInventoryGuard === "1") {
      return;
    }

    checkoutForm.dataset.denexaInventoryGuard="1";

    checkoutForm.addEventListener("submit",async(event) => {
      if (denexaInventoryCheckoutBypass) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();

      await denexaRefreshInventory(true,true);
      const check=denexaInventoryValidateCart();

      if (!check.ok) {
        if (typeof showCheckoutError === "function") {
          showCheckoutError(check.message);
        } else {
          denexaInventoryMessage(check.message);
        }
        return;
      }

      denexaInventoryCheckoutBypass=true;
      try {
        checkoutForm.requestSubmit(confirmOrderButton || undefined);
      } finally {
        setTimeout(() => { denexaInventoryCheckoutBypass=false; },0);
      }
    },true);
  }

  async function denexaInventoryBootstrap() {
    let tries=0;

    while ((!business?.id || !Array.isArray(products) || products.length===0) && tries<80) {
      await new Promise(resolve => setTimeout(resolve,250));
      tries+=1;
    }

    if (!business?.id) {
      return;
    }

    await denexaRefreshInventory(true,true);
    denexaInventoryInstallCheckoutGuard();

    window.setInterval(() => {
      if (!document.hidden) {
        denexaRefreshInventory(true,true).catch(()=>{});
      }
    },20000);

    document.addEventListener("visibilitychange",() => {
      if (!document.hidden) {
        denexaRefreshInventory(true,true).catch(()=>{});
      }
    });
  }

  denexaInventoryBootstrap().catch((error) => {
    console.error("DENEXA inventario bootstrap:",error);
  });

})();
