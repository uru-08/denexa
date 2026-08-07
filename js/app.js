const TARGET_BUSINESS_SLUG = "mamma-mia";
const TARGET_BUSINESS_NAME = "mamma mia";

const storeName = document.getElementById("storeName");
const storeNameSmall = document.getElementById("storeNameSmall");
const storeSubtitle = document.getElementById("storeSubtitle");
const storeLogo = document.getElementById("storeLogo");
const storeStatus = document.getElementById("storeStatus");

const categoryTabs = document.getElementById("categoryTabs");
const catalogContent = document.getElementById("catalogContent");

const productModal = document.getElementById("productModal");
const productModalContent = document.getElementById("productModalContent");
const closeProductButton = document.getElementById("closeProductButton");

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const cartModal = document.getElementById("cartModal");
const closeCartButton = document.getElementById("closeCartButton");
const cartItems = document.getElementById("cartItems");
const cartModalTotal = document.getElementById("cartModalTotal");
const continueOrderButton = document.getElementById("continueOrderButton");

const toast = document.getElementById("toast");

let business = null;
let categories = [];
let products = [];
let groups = [];
let options = [];

let currentProduct = null;
let currentQuantity = 1;
let selectedOptions = new Map();

let cart = [];

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function money(value) {
  const number = Number(value || 0);
  return `$${Math.round(number).toLocaleString("es-UY")}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timer);

  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

async function requestJSON(path) {
  const response = await fetch(
    `${SUPABASE_REST}/${path}`,
    {
      method: "GET",
      headers: supabaseHeaders()
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `Supabase ${response.status}: ${text || response.statusText}`
    );
  }

  if (!text.trim()) {
    return [];
  }

  return JSON.parse(text);
}

async function loadStore() {
  catalogContent.innerHTML =
    '<div class="loading-card">Cargando el men\u00fa...</div>';

  try {
    const businesses = await requestJSON(
      "businesses?select=id,name,slug,phone,address,logo_url,primary_color,secondary_color,active"
    );

    business =
      businesses.find(
        (item) =>
          normalizeText(item.slug) === TARGET_BUSINESS_SLUG
      ) ||
      businesses.find(
        (item) =>
          normalizeText(item.name) === TARGET_BUSINESS_NAME
      ) ||
      businesses.find(
        (item) => item.active !== false
      );

    if (!business) {
      throw new Error("No se encontr\u00f3 Mamma Mia.");
    }

    applyBusinessBranding();

    const [
      allCategories,
      allProducts,
      allGroups,
      allOptions
    ] = await Promise.all([
      requestJSON(
        "categories?select=id,business_id,name,active,sort_order"
      ),
      requestJSON(
        "products?select=id,business_id,category_id,name,description,price,image_url,featured,active,sort_order,old_price"
      ),
      requestJSON(
        "product_option_groups?select=id,product_id,name,selection_type,required,max_select,sort_order,active"
      ),
      requestJSON(
        "product_options?select=id,group_id,name,price_delta,sort_order,active,depends_on_option_id"
      )
    ]);

    categories = allCategories
      .filter(
        (item) =>
          String(item.business_id) === String(business.id) &&
          item.active !== false
      )
      .sort(sortByOrderThenId);

    products = allProducts
      .filter(
        (item) =>
          String(item.business_id) === String(business.id) &&
          item.active !== false
      )
      .sort(sortByOrderThenId);

    const productIds = new Set(
      products.map((item) => String(item.id))
    );

    groups = allGroups
      .filter(
        (item) =>
          productIds.has(String(item.product_id)) &&
          item.active !== false
      )
      .sort(sortByOrderThenId);

    const groupIds = new Set(
      groups.map((item) => String(item.id))
    );

    options = allOptions
      .filter(
        (item) =>
          groupIds.has(String(item.group_id)) &&
          item.active !== false
      )
      .sort(sortByOrderThenId);

    renderCatalog();
    restoreCart();

  } catch (error) {
    console.error("Error cargando tienda:", error);

    catalogContent.innerHTML = `
      <div class="error-card">
        No se pudo cargar el men\u00fa de Mamma Mia.
        Revis\u00e1 la conexi\u00f3n con Supabase.
      </div>
    `;

    storeStatus.textContent = "No disponible";
    storeStatus.classList.add("closed");
  }
}

function sortByOrderThenId(a, b) {
  const orderDiff =
    Number(a.sort_order || 0) -
    Number(b.sort_order || 0);

  if (orderDiff !== 0) {
    return orderDiff;
  }

  return Number(a.id || 0) - Number(b.id || 0);
}

function applyBusinessBranding() {
  const name = business.name || "Mamma Mia";

  storeName.textContent = name;
  storeNameSmall.textContent = name;
  document.title = `${name} | Pedidos`;

  if (business.primary_color) {
    document.documentElement.style.setProperty(
      "--primary",
      business.primary_color
    );
  }

  if (business.secondary_color) {
    document.documentElement.style.setProperty(
      "--secondary",
      business.secondary_color
    );
  }

  storeStatus.textContent =
    business.active === false
      ? "Cerrado"
      : "Tomando pedidos";

  storeStatus.classList.toggle(
    "closed",
    business.active === false
  );

  if (business.logo_url) {
    storeLogo.innerHTML = `
      <img
        src="${escapeHTML(business.logo_url)}"
        alt="${escapeHTML(name)}"
      >
    `;
  } else {
    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0,2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    storeLogo.textContent = initials || "MM";
  }

  if (business.address) {
    storeSubtitle.textContent =
      `${business.address} \u00b7 Eleg\u00ed tus favoritos y arm\u00e1 tu pedido.`;
  }
}

function renderCatalog() {
  if (!categories.length) {
    categoryTabs.innerHTML = "";
    catalogContent.innerHTML =
      '<div class="empty-card">Todav\u00eda no hay categor\u00edas disponibles.</div>';
    return;
  }

  categoryTabs.innerHTML = categories.map((category, index) => `
    <button
      type="button"
      class="category-tab ${index === 0 ? "active" : ""}"
      data-category-id="${escapeHTML(category.id)}"
    >
      ${escapeHTML(category.name)}
    </button>
  `).join("");

  categoryTabs
    .querySelectorAll(".category-tab")
    .forEach((button) => {
      button.addEventListener("click", () => {
        categoryTabs
          .querySelectorAll(".category-tab")
          .forEach((item) => item.classList.remove("active"));

        button.classList.add("active");

        const target =
          document.getElementById(
            `category-${button.dataset.categoryId}`
          );

        target?.scrollIntoView({
          behavior:"smooth",
          block:"start"
        });
      });
    });

  catalogContent.innerHTML = categories.map((category) => {
    const categoryProducts = products.filter(
      (product) =>
        String(product.category_id) === String(category.id)
    );

    return `
      <section
        id="category-${escapeHTML(category.id)}"
        class="category-section"
      >
        <div class="category-section-title">
          <h3>${escapeHTML(category.name)}</h3>
          <span>
            ${categoryProducts.length}
            ${categoryProducts.length === 1 ? "producto" : "productos"}
          </span>
        </div>

        ${
          categoryProducts.length
            ? `
              <div class="products-grid">
                ${categoryProducts.map(renderProductCard).join("")}
              </div>
            `
            : `
              <div class="empty-card">
                Todav\u00eda no hay productos en esta categor\u00eda.
              </div>
            `
        }
      </section>
    `;
  }).join("");

  catalogContent
    .querySelectorAll(".product-card")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const product = products.find(
          (item) =>
            String(item.id) ===
            String(button.dataset.productId)
        );

        if (product) {
          openProduct(product);
        }
      });
    });
}

function renderProductCard(product) {
  const productGroups = getProductGroups(product.id);
  const hasOptions = productGroups.length > 0;

  const priceText =
    Number(product.price || 0) > 0
      ? money(product.price)
      : hasOptions
        ? "Eleg\u00ed opciones"
        : money(0);

  return `
    <button
      type="button"
      class="product-card"
      data-product-id="${escapeHTML(product.id)}"
    >
      <div class="product-image">
        ${
          product.image_url
            ? `
              <img
                src="${escapeHTML(product.image_url)}"
                alt="${escapeHTML(product.name)}"
                loading="lazy"
              >
            `
            : `
              <div class="product-image-placeholder">
                ${escapeHTML(product.name)}
              </div>
            `
        }

        ${
          product.featured
            ? '<span class="featured-badge">DESTACADO</span>'
            : ""
        }
      </div>

      <div class="product-info">
        <h4>${escapeHTML(product.name)}</h4>

        ${
          product.description
            ? `
              <p class="product-description">
                ${escapeHTML(product.description)}
              </p>
            `
            : ""
        }

        <div class="product-price">
          ${priceText}
          ${
            Number(product.old_price || 0) > Number(product.price || 0)
              ? `<small><s>${money(product.old_price)}</s></small>`
              : ""
          }
        </div>
      </div>
    </button>
  `;
}

function getProductGroups(productId) {
  return groups
    .filter(
      (group) =>
        String(group.product_id) === String(productId)
    )
    .sort(sortByOrderThenId);
}

function getGroupOptions(groupId) {
  return options
    .filter(
      (option) =>
        String(option.group_id) === String(groupId)
    )
    .sort(sortByOrderThenId);
}

function openProduct(product) {
  currentProduct = product;
  currentQuantity = 1;
  selectedOptions = new Map();

  productModalContent.innerHTML = `
    ${
      product.image_url
        ? `
          <img
            class="product-modal-image"
            src="${escapeHTML(product.image_url)}"
            alt="${escapeHTML(product.name)}"
          >
        `
        : ""
    }

    <div class="product-modal-body">

      <h2>${escapeHTML(product.name)}</h2>

      ${
        product.description
          ? `
            <p class="product-modal-description">
              ${escapeHTML(product.description)}
            </p>
          `
          : ""
      }

      <div id="liveProductPrice" class="live-price">
        ${money(product.price)}
      </div>

      <div id="productFormError" class="form-error"></div>

      <div id="optionGroups" class="option-groups">
        ${renderOptionGroups(product)}
      </div>

      <div class="product-actions">

        <div class="quantity-control">
          <button id="decreaseQuantity" type="button" aria-label="Quitar uno">-</button>
          <strong id="quantityValue">1</strong>
          <button id="increaseQuantity" type="button" aria-label="Agregar uno">+</button>
        </div>

        <button id="addToCartButton" class="primary-action" type="button">
          Agregar al pedido
        </button>

      </div>

    </div>
  `;

  bindProductFormEvents();

  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");

  refreshDependentOptions();
  refreshPrice();
}

function renderOptionGroups(product) {
  const productGroups = getProductGroups(product.id);

  if (!productGroups.length) {
    return "";
  }

  return productGroups.map((group) => {
    const groupOptions = getGroupOptions(group.id);

    return `
      <section
        class="option-group"
        data-group-id="${escapeHTML(group.id)}"
        data-required="${group.required ? "true" : "false"}"
        data-selection-type="${escapeHTML(group.selection_type)}"
        data-max-select="${escapeHTML(group.max_select ?? "")}"
      >
        <div class="option-group-header">
          <h3>${escapeHTML(group.name)}</h3>
          <span>
            ${
              group.required
                ? "OBLIGATORIO"
                : "OPCIONAL"
            }
          </span>
        </div>

        <div class="option-list">
          ${groupOptions.map((option) => {
            const inputType =
              group.selection_type === "single"
                ? "radio"
                : "checkbox";

            return `
              <label
                class="option-row"
                data-option-id="${escapeHTML(option.id)}"
                data-parent-option-id="${escapeHTML(option.depends_on_option_id ?? "")}"
              >
                <input
                  type="${inputType}"
                  name="group-${escapeHTML(group.id)}"
                  value="${escapeHTML(option.id)}"
                >

                <span class="option-copy">
                  <strong>${escapeHTML(option.name)}</strong>
                  <small>
                    ${
                      Number(option.price_delta || 0) > 0
                        ? `+ ${money(option.price_delta)}`
                        : "Sin costo adicional"
                    }
                  </small>
                </span>
              </label>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function bindProductFormEvents() {
  const optionInputs =
    productModalContent.querySelectorAll(
      '.option-row input'
    );

  optionInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const groupElement =
        input.closest(".option-group");

      const groupId =
        groupElement.dataset.groupId;

      const group = groups.find(
        (item) =>
          String(item.id) === String(groupId)
      );

      if (!group) {
        return;
      }

      if (group.selection_type === "single") {
        selectedOptions.set(
          String(group.id),
          input.checked
            ? [String(input.value)]
            : []
        );
      } else {
        const checked =
          Array.from(
            groupElement.querySelectorAll(
              'input:checked'
            )
          ).map((item) => String(item.value));

        const maxSelect =
          Number(group.max_select || 0);

        if (
          maxSelect > 0 &&
          checked.length > maxSelect
        ) {
          input.checked = false;

          showToast(
            `Pod\u00e9s elegir hasta ${maxSelect} opciones en ${group.name}.`
          );

          return;
        }

        selectedOptions.set(
          String(group.id),
          Array.from(
            groupElement.querySelectorAll(
              'input:checked'
            )
          ).map((item) => String(item.value))
        );
      }

      clearInvalidSelections();
      refreshDependentOptions();
      refreshPrice();
      hideProductError();
    });
  });

  document
    .getElementById("decreaseQuantity")
    ?.addEventListener("click", () => {
      currentQuantity =
        Math.max(1,currentQuantity - 1);

      document.getElementById("quantityValue").textContent =
        currentQuantity;

      refreshPrice();
    });

  document
    .getElementById("increaseQuantity")
    ?.addEventListener("click", () => {
      currentQuantity += 1;

      document.getElementById("quantityValue").textContent =
        currentQuantity;

      refreshPrice();
    });

  document
    .getElementById("addToCartButton")
    ?.addEventListener("click", addCurrentProductToCart);
}

function getSelectedOptionIds() {
  const result = new Set();

  selectedOptions.forEach((ids) => {
    ids.forEach((id) => result.add(String(id)));
  });

  return result;
}

function optionIsVisible(option, selectedIds) {
  if (!option.depends_on_option_id) {
    return true;
  }

  return selectedIds.has(
    String(option.depends_on_option_id)
  );
}

function refreshDependentOptions() {
  const selectedIds = getSelectedOptionIds();

  getProductGroups(currentProduct.id)
    .forEach((group) => {
      const groupElement =
        productModalContent.querySelector(
          `.option-group[data-group-id="${group.id}"]`
        );

      if (!groupElement) {
        return;
      }

      let visibleCount = 0;

      getGroupOptions(group.id)
        .forEach((option) => {
          const row =
            groupElement.querySelector(
              `.option-row[data-option-id="${option.id}"]`
            );

          if (!row) {
            return;
          }

          const visible =
            optionIsVisible(option,selectedIds);

          row.style.display =
            visible ? "flex" : "none";

          if (visible) {
            visibleCount += 1;
          }
        });

      groupElement.classList.toggle(
        "hidden",
        visibleCount === 0
      );
    });
}

function clearInvalidSelections() {
  const selectedIds = getSelectedOptionIds();

  getProductGroups(currentProduct.id)
    .forEach((group) => {
      const visibleIds = new Set(
        getGroupOptions(group.id)
          .filter(
            (option) =>
              optionIsVisible(option,selectedIds)
          )
          .map((option) => String(option.id))
      );

      const current =
        selectedOptions.get(String(group.id)) || [];

      const filtered =
        current.filter((id) => visibleIds.has(String(id)));

      if (filtered.length !== current.length) {
        selectedOptions.set(
          String(group.id),
          filtered
        );

        const groupElement =
          productModalContent.querySelector(
            `.option-group[data-group-id="${group.id}"]`
          );

        groupElement
          ?.querySelectorAll("input")
          .forEach((input) => {
            if (!visibleIds.has(String(input.value))) {
              input.checked = false;
            }
          });
      }
    });
}

function currentUnitPrice() {
  let total =
    Number(currentProduct?.price || 0);

  const selectedIds =
    getSelectedOptionIds();

  options
    .filter(
      (option) =>
        selectedIds.has(String(option.id))
    )
    .forEach((option) => {
      total += Number(option.price_delta || 0);
    });

  return total;
}

function refreshPrice() {
  const target =
    document.getElementById("liveProductPrice");

  const button =
    document.getElementById("addToCartButton");

  if (!target || !button) {
    return;
  }

  const unitPrice = currentUnitPrice();
  const total = unitPrice * currentQuantity;

  target.textContent =
    `Total: ${money(total)}`;

  button.textContent =
    `Agregar \u00b7 ${money(total)}`;
}

function visibleOptionsForGroup(group) {
  const selectedIds = getSelectedOptionIds();

  return getGroupOptions(group.id)
    .filter(
      (option) =>
        optionIsVisible(option,selectedIds)
    );
}

function validateProductSelection() {
  const productGroups =
    getProductGroups(currentProduct.id);

  for (const group of productGroups) {
    const visibleOptions =
      visibleOptionsForGroup(group);

    if (!visibleOptions.length) {
      continue;
    }

    const chosen =
      selectedOptions.get(String(group.id)) || [];

    if (
      group.required &&
      chosen.length === 0
    ) {
      return `Eleg\u00ed una opci\u00f3n en ${group.name}.`;
    }

    const maxSelect =
      Number(group.max_select || 0);

    if (
      maxSelect > 0 &&
      chosen.length > maxSelect
    ) {
      return `Pod\u00e9s elegir hasta ${maxSelect} opciones en ${group.name}.`;
    }
  }

  return "";
}

function addCurrentProductToCart() {
  const error =
    validateProductSelection();

  if (error) {
    showProductError(error);
    return;
  }

  const selected = [];

  getProductGroups(currentProduct.id)
    .forEach((group) => {
      const ids =
        selectedOptions.get(String(group.id)) || [];

      ids.forEach((id) => {
        const option = options.find(
          (item) =>
            String(item.id) === String(id)
        );

        if (option) {
          selected.push({
            groupId:group.id,
            groupName:group.name,
            optionId:option.id,
            optionName:option.name,
            price:Number(option.price_delta || 0)
          });
        }
      });
    });

  const unitPrice =
    currentUnitPrice();

  cart.push({
    key:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
    productId:currentProduct.id,
    productName:currentProduct.name,
    quantity:currentQuantity,
    unitPrice,
    total:unitPrice * currentQuantity,
    options:selected
  });

  saveCart();
  updateCartBar();
  closeProductModal();

  showToast(
    `${currentProduct.name} agregado al pedido.`
  );
}

function showProductError(message) {
  const element =
    document.getElementById("productFormError");

  if (!element) {
    return;
  }

  element.textContent = message;
  element.classList.add("show");
}

function hideProductError() {
  document
    .getElementById("productFormError")
    ?.classList.remove("show");
}

function closeProductModal() {
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");

  currentProduct = null;
  selectedOptions = new Map();
}

function openCartModal() {
  renderCart();

  cartModal.classList.add("open");
  cartModal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}

function closeCartModal() {
  cartModal.classList.remove("open");
  cartModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML =
      '<div class="empty-card">Tu pedido todav\u00eda est\u00e1 vac\u00edo.</div>';

    cartModalTotal.textContent = "$0";
    return;
  }

  cartItems.innerHTML = cart.map((item) => `
    <article class="cart-item">

      <div class="cart-item-top">
        <div>
          <h3>
            ${item.quantity} x ${escapeHTML(item.productName)}
          </h3>

          ${
            item.options.length
              ? `
                <p class="cart-item-options">
                  ${item.options.map(
                    (option) =>
                      `${escapeHTML(option.groupName)}: ${escapeHTML(option.optionName)}`
                  ).join("<br>")}
                </p>
              `
              : ""
          }
        </div>

        <strong>${money(item.total)}</strong>
      </div>

      <div class="cart-item-bottom">
        <span>${money(item.unitPrice)} c/u</span>

        <button
          type="button"
          class="cart-remove"
          data-cart-key="${escapeHTML(item.key)}"
        >
          Eliminar
        </button>
      </div>

    </article>
  `).join("");

  cartItems
    .querySelectorAll(".cart-remove")
    .forEach((button) => {
      button.addEventListener("click", () => {
        cart = cart.filter(
          (item) =>
            item.key !== button.dataset.cartKey
        );

        saveCart();
        updateCartBar();
        renderCart();
      });
    });

  cartModalTotal.textContent =
    money(cartGrandTotal());
}

function cartGrandTotal() {
  return cart.reduce(
    (sum,item) =>
      sum + Number(item.total || 0),
    0
  );
}

function updateCartBar() {
  const quantity =
    cart.reduce(
      (sum,item) =>
        sum + Number(item.quantity || 0),
      0
    );

  cartCount.textContent =
    quantity === 1
      ? "1 producto"
      : `${quantity} productos`;

  cartTotal.textContent =
    money(cartGrandTotal());

  cartModalTotal.textContent =
    money(cartGrandTotal());
}

function saveCart() {
  try {
    localStorage.setItem(
      "proyecto-x-cart-mamma-mia",
      JSON.stringify(cart)
    );
  } catch (error) {
    console.warn("No se pudo guardar el carrito:", error);
  }
}

function restoreCart() {
  try {
    const stored =
      localStorage.getItem(
        "proyecto-x-cart-mamma-mia"
      );

    cart =
      stored
        ? JSON.parse(stored)
        : [];

    if (!Array.isArray(cart)) {
      cart = [];
    }

  } catch (error) {
    cart = [];
  }

  updateCartBar();
}

closeProductButton.addEventListener(
  "click",
  closeProductModal
);

document
  .querySelector("[data-close-product]")
  ?.addEventListener(
    "click",
    closeProductModal
  );

cartButton.addEventListener(
  "click",
  openCartModal
);

closeCartButton.addEventListener(
  "click",
  closeCartModal
);

document
  .querySelector("[data-close-cart]")
  ?.addEventListener(
    "click",
    closeCartModal
  );

continueOrderButton.addEventListener(
  "click",
  () => {
    showToast(
      "El siguiente paso ser\u00e1 configurar entrega, pago y confirmaci\u00f3n."
    );
  }
);

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (productModal.classList.contains("open")) {
      closeProductModal();
      return;
    }

    if (cartModal.classList.contains("open")) {
      closeCartModal();
    }
  }
);

loadStore();
