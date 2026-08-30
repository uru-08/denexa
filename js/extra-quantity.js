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
})();
