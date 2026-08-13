const TARGET_BUSINESS_SLUG = "mamma-mia";
const TARGET_BUSINESS_NAME = "mamma mia";
const LOCAL_LOGO_URL = "assets/mamma-mia-logo.png";

const welcomeScreen = document.getElementById("welcomeScreen");
const enterStoreButton = document.getElementById("enterStoreButton");
const orderingStatusNotice = document.getElementById("orderingStatusNotice");
const welcomeStatusText = document.getElementById("welcomeStatusText");

const storeName = document.getElementById("storeName");
const storeNameSmall = document.getElementById("storeNameSmall");
const storeSubtitle = document.getElementById("storeSubtitle");
const storeLogo = document.getElementById("storeLogo");
const welcomeLogo = document.getElementById("welcomeLogo");
const welcomeBusinessName = document.getElementById("welcomeBusinessName");
const welcomeBusinessDescription = document.getElementById("welcomeBusinessDescription");
const welcomeButtonText = document.getElementById("welcomeButtonText");
const dailyPromoBanner = document.getElementById("dailyPromoBanner");
const dailyPromoBannerBadge = document.getElementById("dailyPromoBannerBadge");
const dailyPromoBannerTitle = document.getElementById("dailyPromoBannerTitle");
const dailyPromoBannerText = document.getElementById("dailyPromoBannerText");


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


const checkoutModal = document.getElementById("checkoutModal");
const checkoutForm = document.getElementById("checkoutForm");
const closeCheckoutButton = document.getElementById("closeCheckoutButton");
const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");
const deliveryType = document.getElementById("deliveryType");
const customerAddress = document.getElementById("customerAddress");
const customerReference = document.getElementById("customerReference");
const addressField = document.getElementById("addressField");
const referenceField = document.getElementById("referenceField");
const deliveryExtraFields = document.getElementById("deliveryExtraFields");
const paymentMethod = document.getElementById("paymentMethod");
const cashAmount = document.getElementById("cashAmount");
const cashAmountField = document.getElementById("cashAmountField");
const customerNotes = document.getElementById("customerNotes");
const checkoutItemsCount = document.getElementById("checkoutItemsCount");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutFormError = document.getElementById("checkoutFormError");
const confirmOrderButton = document.getElementById("confirmOrderButton");

const orderSuccessModal = document.getElementById("orderSuccessModal");
const closeSuccessButton = document.getElementById("closeSuccessButton");

const toast = document.getElementById("toast");

let business = null;
let categories = [];
let products = [];
let groups = [];
let options = [];

let currentProduct = null;
let currentQuantity = 1;
let selectedOptions = new Map();
let empanadaFlavorCounts = new Map();

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


async function insertRow(tableName, payload, returnRepresentation = true) {
  const response = await fetch(
    `${SUPABASE_REST}/${tableName}`,
    {
      method:"POST",
      headers:supabaseHeaders({
        Prefer:returnRepresentation
          ? "return=representation"
          : "return=minimal"
      }),
      body:JSON.stringify(payload)
    }
  );

  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `Supabase ${response.status}: ${text || response.statusText}`
    );
  }

  if (!returnRepresentation || !text.trim()) {
    return null;
  }

  const data = JSON.parse(text);

  return Array.isArray(data)
    ? data[0]
    : data;
}


function applyOrderingStatus() {
  if (!business) {
    return;
  }

  const status =
    business.ordering_status || "open";

  const isOpen =
    status === "open";

  if (enterStoreButton) {
    enterStoreButton.disabled = !isOpen;
    enterStoreButton.classList.toggle(
      "disabled",
      !isOpen
    );

    const label =
      enterStoreButton.querySelector("span");

    if (label) {
      label.textContent =
        status === "sold_out"
          ? "Pedidos cerrados por hoy"
          : status === "closed"
            ? "Pedidos cerrados"
            : "Hacer mi pedido";
    }
  }

  const welcomeStatusText =
    document.getElementById("welcomeStatusText");

  if (welcomeStatusText) {
    welcomeStatusText.textContent =
      status === "sold_out"
        ? "Stock agotado por hoy"
        : status === "closed"
          ? "Pedidos cerrados"
          : "Tomando pedidos";
  }

  if (orderingStatusNotice) {
    if (status === "sold_out") {
      orderingStatusNotice.hidden = false;
      orderingStatusNotice.innerHTML = `
        <strong>POR HOY AGOTAMOS NUESTRO STOCK</strong>
        <span>
          ${escapeHTML(
            business.sold_out_message ||
            "Muchas gracias a todos. Nos reencontramos manana."
          )}
        </span>
      `;
    } else if (status === "closed") {
      orderingStatusNotice.hidden = false;
      orderingStatusNotice.innerHTML = `
        <strong>PEDIDOS CERRADOS</strong>
        <span>
          En este momento no estamos tomando nuevos pedidos.
        </span>
      `;
    } else {
      orderingStatusNotice.hidden = true;
      orderingStatusNotice.innerHTML = "";
    }
  }
}


function orderingIsOpen() {
  return (
    business &&
    (business.ordering_status || "open") === "open"
  );
}

function closeOrderingModals() {
  if (productModal?.classList.contains("open")) {
    closeProductModal();
  }

  if (cartModal?.classList.contains("open")) {
    closeCartModal();
  }

  if (checkoutModal?.classList.contains("open")) {
    closeCheckoutModal();
  }
}

function showOrderingClosedMessage() {
  const status =
    business?.ordering_status || "closed";

  showToast(
    status === "sold_out"
      ? "Por hoy agotamos nuestro stock. No estamos tomando mas pedidos."
      : "En este momento no estamos tomando pedidos."
  );
}

async function refreshOrderingStatusFromSupabase() {
  if (!business?.id) {
    return false;
  }

  try {
    const rows =
      await requestJSON(
        `businesses?id=eq.${encodeURIComponent(business.id)}&select=id,ordering_status,sold_out_message,promo_active,promo_badge,promo_title,promo_text,active`
      );

    const fresh =
      Array.isArray(rows)
        ? rows[0]
        : null;

    if (!fresh) {
      return orderingIsOpen();
    }

    const previousStatus =
      business.ordering_status || "open";

    business.ordering_status =
      fresh.ordering_status || "open";

    business.sold_out_message =
      fresh.sold_out_message ??
      business.sold_out_message;

    business.active =
      fresh.active ?? business.active;

    business.promo_active =
      fresh.promo_active ?? false;

    business.promo_badge =
      fresh.promo_badge ??
      business.promo_badge;

    business.promo_title =
      fresh.promo_title ??
      business.promo_title;

    business.promo_text =
      fresh.promo_text ??
      business.promo_text;
    business.promo_rule_type = fresh.promo_rule_type ?? business.promo_rule_type;
    business.promo_target_type = fresh.promo_target_type ?? business.promo_target_type;
    business.promo_target_id = fresh.promo_target_id ?? business.promo_target_id;
    business.promo_discount_percent = fresh.promo_discount_percent ?? business.promo_discount_percent;
    business.promo_trigger_qty = fresh.promo_trigger_qty ?? business.promo_trigger_qty;
    business.promo_reward_product_id = fresh.promo_reward_product_id ?? business.promo_reward_product_id;
    business.promo_reward_qty = fresh.promo_reward_qty ?? business.promo_reward_qty;
    business.promo_repeat = fresh.promo_repeat ?? business.promo_repeat;

    applyDailyPromo();

    applyOrderingStatus();

    if (storeStatus) {
      const status =
        business.ordering_status || "open";

      const label =
        status === "sold_out"
          ? "Stock agotado"
          : status === "closed"
            ? "Pedidos cerrados"
            : "Tomando pedidos";

      storeStatus.innerHTML = `
        <span class="status-dot"></span>
        <span>${label}</span>
      `;

      storeStatus.classList.toggle(
        "closed",
        status !== "open"
      );
    }

    if (
      previousStatus === "open" &&
      business.ordering_status !== "open"
    ) {
      closeOrderingModals();
      showOrderingClosedMessage();
    }

    return orderingIsOpen();
  } catch (error) {
    console.error(
      "Error verificando estado de pedidos:",
      error
    );

    return orderingIsOpen();
  }
}

async function requireOrderingOpen() {
  const isOpen =
    await refreshOrderingStatusFromSupabase();

  if (!isOpen) {
    showOrderingClosedMessage();
    return false;
  }

  return true;
}

async function loadStore() {
  catalogContent.innerHTML =
    '<div class="loading-card">Cargando el men\u00fa...</div>';

  try {
    const businesses = await requestJSON(
      "businesses?select=id,name,slug,phone,address,logo_url,primary_color,secondary_color,accent_color,hero_title,hero_description,hero_image_url,welcome_button_text,promo_active,promo_badge,promo_title,promo_text,promo_rule_type,promo_target_type,promo_target_id,promo_discount_percent,promo_trigger_qty,promo_reward_product_id,promo_reward_qty,promo_repeat,active,ordering_status,sold_out_message"
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
    applyDailyPromo();
    applyOrderingStatus();

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
        "products?select=id,business_id,category_id,name,description,price,image_url,featured,active,available,sort_order,old_price"
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

function hexToDark(hex, factor = 0.62) {
  const value =
    /^#[0-9a-f]{6}$/i.test(
      String(hex || "")
    )
      ? String(hex).slice(1)
      : "0B43A0";

  const r =
    Math.round(
      parseInt(value.slice(0,2),16) *
      factor
    );

  const g =
    Math.round(
      parseInt(value.slice(2,4),16) *
      factor
    );

  const b =
    Math.round(
      parseInt(value.slice(4,6),16) *
      factor
    );

  return (
    "#" +
    [r,g,b]
      .map(
        (n) =>
          n
            .toString(16)
            .padStart(2,"0")
      )
      .join("")
  );
}

function safeBrandColor(
  value,
  fallback
) {
  return /^#[0-9a-f]{6}$/i.test(
    String(value || "")
  )
    ? String(value)
    : fallback;
}


function applyDailyPromo() {
  if (!dailyPromoBanner) {
    return;
  }

  const active =
    business?.promo_active === true;

  const title =
    String(
      business?.promo_title || ""
    ).trim();

  const text =
    String(
      business?.promo_text || ""
    ).trim();

  if (
    !active ||
    !title ||
    !text
  ) {
    dailyPromoBanner.hidden = true;
    dailyPromoBanner.classList.remove(
      "is-visible"
    );
    return;
  }

  dailyPromoBannerBadge.textContent =
    String(
      business?.promo_badge ||
      "PROMO DEL DÍA"
    ).trim();

  dailyPromoBannerTitle.textContent =
    title;

  dailyPromoBannerText.textContent =
    text;

  dailyPromoBanner.hidden = false;

  requestAnimationFrame(
    () => {
      dailyPromoBanner.classList.add(
        "is-visible"
      );
    }
  );
}

function applyBusinessBranding() {
  const name =
    business.name || "Mamma Mia";

  const primary =
    safeBrandColor(
      business.primary_color,
      "#0B43A0"
    );

  const secondary =
    safeBrandColor(
      business.secondary_color,
      "#0E5BD8"
    );

  const accent =
    safeBrandColor(
      business.accent_color,
      "#F4C565"
    );

  const dark =
    hexToDark(primary,.60);

  const deep =
    hexToDark(primary,.42);

  storeName.textContent = name;
  storeNameSmall.textContent = name;
  document.title =
    `${name} | Pedidos`;

  document.documentElement.style.setProperty(
    "--primary",
    primary
  );

  document.documentElement.style.setProperty(
    "--primary-2",
    secondary
  );

  document.documentElement.style.setProperty(
    "--primary-dark",
    dark
  );

  document.documentElement.style.setProperty(
    "--primary-deep",
    deep
  );

  document.documentElement.style.setProperty(
    "--accent",
    accent
  );

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute(
      "content",
      primary
    );

  const logoUrl =
    business.logo_url ||
    LOCAL_LOGO_URL;

  storeLogo.innerHTML = `
    <img
      src="${escapeHTML(logoUrl)}"
      alt="${escapeHTML(name)}"
    >
  `;

  if (welcomeLogo) {
    welcomeLogo.src =
      logoUrl;
    welcomeLogo.alt =
      name;
  }

  if (welcomeBusinessName) {
    welcomeBusinessName.textContent =
      business.hero_title ||
      name;
  }

  if (welcomeBusinessDescription) {
    welcomeBusinessDescription.textContent =
      business.hero_description ||
      "Pizzas y empanadas preparadas para disfrutar. Elegí lo que más te guste y armá tu pedido.";
  }

  if (welcomeButtonText) {
    welcomeButtonText.textContent =
      business.welcome_button_text ||
      "Hacer mi pedido";
  }

  if (welcomeScreen) {
    const heroImage =
      business.hero_image_url || "";

    welcomeScreen.classList.toggle(
      "has-custom-hero",
      Boolean(heroImage)
    );

    if (heroImage) {
      welcomeScreen.style.setProperty(
        "--custom-hero-image",
        `url("${heroImage.replaceAll('"','%22')}")`
      );
    } else {
      welcomeScreen.style.removeProperty(
        "--custom-hero-image"
      );
    }
  }

  const isClosed =
    business.active === false;

  storeStatus.innerHTML = `
    <span class="status-dot"></span>
    <span>${isClosed ? "Cerrado" : "Tomando pedidos"}</span>
  `;

  storeStatus.classList.toggle(
    "closed",
    isClosed
  );

  welcomeStatusText.textContent =
    isClosed
      ? "Cerrado en este momento"
      : "Tomando pedidos";

  if (business.address) {
    storeSubtitle.textContent =
      `${business.address} · Elegí tus favoritos y armá tu pedido.`;
  }
}


function activePromoRuleType(){
  return business?.promo_active===true ? (business.promo_rule_type||"announcement") : "announcement";
}

function productMatchesPromo(product){
  if(!product || business?.promo_active!==true) return false;
  const target=String(business?.promo_target_id??"");
  if(!target) return false;
  return business?.promo_target_type==="product"
    ? String(product.id)===target
    : String(product.category_id)===target;
}

function percentPromoForProduct(product){
  if(activePromoRuleType()!=="percent" || !productMatchesPromo(product)) return 0;
  return Math.min(100,Math.max(0,Number(business?.promo_discount_percent||0)));
}

function applyPercentDiscount(amount,product){
  const value=Number(amount||0);
  const percent=percentPromoForProduct(product);
  return percent>0 ? Math.round(value*(1-percent/100)) : value;
}

function productById(id){
  return products.find(x=>String(x.id)===String(id))||null;
}

function cartGiftItems(){
  if(activePromoRuleType()!=="gift") return [];
  const target=String(business?.promo_target_id??"");
  const trigger=Math.max(1,Number(business?.promo_trigger_qty||1));
  const rewardQty=Math.max(1,Number(business?.promo_reward_qty||1));
  const reward=productById(business?.promo_reward_product_id);
  if(!target || !reward) return [];

  let matched=0;
  cart.forEach(item=>{
    const p=productById(item.productId);
    if(!p) return;
    const ok=business?.promo_target_type==="product"
      ? String(p.id)===target
      : String(p.category_id)===target;
    if(ok) matched+=Number(item.quantity||0);
  });

  let times=Math.floor(matched/trigger);
  if(business?.promo_repeat===false) times=Math.min(1,times);
  const qty=times*rewardQty;
  return qty>0 ? [{
    type:"promo_gift",productId:reward.id,productName:reward.name,
    quantity:qty,unitPrice:0,total:0,options:[],promoLabel:"REGALO PROMO"
  }] : [];
}

function renderCatalog() {
  const visibleCategories = categories.filter(
    (category) =>
      products.some(
        (product) =>
          String(product.category_id) ===
          String(category.id)
      )
  );

  if (!visibleCategories.length) {
    categoryTabs.innerHTML = "";
    catalogContent.innerHTML =
      '<div class="empty-card">Todav\u00eda no hay productos disponibles.</div>';
    return;
  }

  categoryTabs.innerHTML = visibleCategories.map((category, index) => `
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

  catalogContent.innerHTML = visibleCategories.map((category) => {
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

        <div class="products-grid">
          ${categoryProducts.map(renderProductCard).join("")}
        </div>
      </section>
    `;
  }).join("");

  catalogContent
    .querySelectorAll(".product-card")
    .forEach((card) => {
      const openCardProduct = async () => {
        if (!(await requireOrderingOpen())) {
          return;
        }

        const product = products.find(
          (item) =>
            String(item.id) ===
            String(card.dataset.productId)
        );

        if (product) {
          if (product.available === false) {
            showToast("Este producto esta agotado por el momento.");
            return;
          }

          openProduct(product);
        }
      };

      card.addEventListener(
        "click",
        openCardProduct
      );

      card.addEventListener(
        "keydown",
        (event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            openCardProduct();
          }
        }
      );
    });
}

function renderProductCard(product) {
  const productGroups = getProductGroups(product.id);
  const hasOptions = productGroups.length > 0;

  const productCategory =
    categories.find(
      (category) =>
        String(category.id) ===
        String(product.category_id)
    );

  const pizzaProduct =
    normalizeText(
      productCategory?.name || ""
    ).includes("pizza");

  const promoPercent =
    percentPromoForProduct(product);

  const discountedFixedPrice =
    applyPercentDiscount(product.price,product);

  const priceText =
    pizzaProduct && hasOptions
      ? promoPercent > 0
        ? `<span class="promo-price-chip">-${promoPercent}% HOY</span> Elegí tamaño`
        : "Elegí tamaño"
      : Number(product.price || 0) > 0
        ? promoPercent > 0
          ? `<span class="promo-old-price">${money(product.price)}</span> <strong class="promo-new-price">${money(discountedFixedPrice)}</strong> <span class="promo-price-chip">-${promoPercent}%</span>`
          : money(product.price)
        : hasOptions
          ? promoPercent > 0
            ? `<span class="promo-price-chip">-${promoPercent}% HOY</span> Elegí opciones`
            : "Elegí opciones"
          : money(0);

  return `
    <div
      class="product-card ${product.available === false ? "product-sold-out" : ""}"
      role="button"
      tabindex="${product.available === false ? "-1" : "0"}"
      data-product-id="${escapeHTML(product.id)}"
      aria-label="Abrir ${escapeHTML(product.name)}"
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
                <span class="product-placeholder-mark">
                  ${escapeHTML(
                    String(product.name || "MM")
                      .trim()
                      .split(/\s+/)
                      .slice(0,2)
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()
                  )}
                </span>
              </div>
            `
        }

        ${
          product.available === false
            ? '<span class="sold-out-badge">AGOTADO</span>'
            : product.featured
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
    </div>
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


function currentProductIsPizza() {
  const category =
    categories.find(
      (item) =>
        String(item.id) ===
        String(currentProduct?.category_id)
    );

  return normalizeText(
    category?.name || ""
  ).includes("pizza");
}

function isSizeGroup(group) {
  const name =
    normalizeText(group?.name || "");

  if (
    name.includes("tamano") ||
    name.includes("medida") ||
    name.includes("size")
  ) {
    return true;
  }

  const groupOptions =
    options.filter(
      (option) =>
        String(option.group_id) ===
        String(group?.id)
    );

  return groupOptions.some((option) => {
    const optionName =
      normalizeText(
        option.name || ""
      );

    return (
      optionName.includes("individual") ||
      optionName.includes("1/2 metro") ||
      optionName.includes("medio metro") ||
      optionName.includes("1 metro")
    );
  });
}


function isPlainMuzzarellaOption(option) {
  const name =
    normalizeText(
      option?.name || ""
    );

  const mentionsMuzzarella =
    name.includes("muzzarella") ||
    name.includes("mozzarella");

  const saysSolo =
    name.includes("solo");

  return (
    mentionsMuzzarella &&
    saysSolo
  );
}

function syncExclusivePlainOption(group) {
  if (!group) {
    return;
  }

  const groupOptions =
    getGroupOptions(group.id);

  const plainOption =
    groupOptions.find(
      isPlainMuzzarellaOption
    );

  if (!plainOption) {
    return;
  }

  const groupElement =
    productModalContent.querySelector(
      `.option-group[data-group-id="${group.id}"]`
    );

  if (!groupElement) {
    return;
  }

  const plainRow =
    groupElement.querySelector(
      `.option-row[data-option-id="${plainOption.id}"]`
    );

  const plainInput =
    plainRow?.querySelector("input");

  const extraRows =
    Array.from(
      groupElement.querySelectorAll(
        ".option-row"
      )
    ).filter(
      (row) =>
        String(row.dataset.optionId) !==
        String(plainOption.id)
    );

  if (!plainInput) {
    return;
  }

  const selectedExtraRows =
    extraRows.filter(
      (row) =>
        row.querySelector("input")?.checked
    );

  if (plainInput.checked) {
    extraRows.forEach((row) => {
      const input =
        row.querySelector("input");

      if (input) {
        input.checked = false;
      }

      row.classList.add(
        "pizza-exclusive-hidden"
      );
    });

    plainRow?.classList.remove(
      "pizza-exclusive-hidden"
    );

    selectedOptions.set(
      String(group.id),
      [String(plainOption.id)]
    );

    return;
  }

  if (selectedExtraRows.length) {
    plainRow?.classList.add(
      "pizza-exclusive-hidden"
    );

    extraRows.forEach((row) => {
      row.classList.remove(
        "pizza-exclusive-hidden"
      );
    });

    return;
  }

  plainRow?.classList.remove(
    "pizza-exclusive-hidden"
  );

  extraRows.forEach((row) => {
    row.classList.remove(
      "pizza-exclusive-hidden"
    );
  });
}


function currentProductIsEmpanadas() {
  const category =
    categories.find(
      (item) =>
        String(item.id) ===
        String(currentProduct?.category_id)
    );

  const categoryName =
    normalizeText(
      category?.name || ""
    );

  const productName =
    normalizeText(
      currentProduct?.name || ""
    );

  return (
    categoryName.includes("empanada") ||
    productName.includes("empanada")
  );
}

function empanadaFlavorCount(optionId) {
  return Number(
    empanadaFlavorCounts.get(
      String(optionId)
    ) || 0
  );
}

function empanadaTotalQuantity() {
  let total = 0;

  empanadaFlavorCounts.forEach(
    (quantity) => {
      total += Number(quantity || 0);
    }
  );

  return total;
}

function empanadaTotalPrice() {
  let total = 0;

  empanadaFlavorCounts.forEach(
    (quantity, optionId) => {
      const option =
        options.find(
          (item) =>
            String(item.id) ===
            String(optionId)
        );

      if (!option) {
        return;
      }

      total +=
        Number(quantity || 0) *
        applyPercentDiscount(
          Number(option.price_delta || 0),
          currentProduct
        );
    }
  );

  return total;
}

function selectedEmpanadaFlavors() {
  const result = [];

  empanadaFlavorCounts.forEach(
    (quantity, optionId) => {
      const qty =
        Number(quantity || 0);

      if (qty <= 0) {
        return;
      }

      const option =
        options.find(
          (item) =>
            String(item.id) ===
            String(optionId)
        );

      if (!option) {
        return;
      }

      const group =
        groups.find(
          (item) =>
            String(item.id) ===
            String(option.group_id)
        );

      result.push({
        optionId:option.id,
        optionName:option.name,
        groupId:group?.id ?? option.group_id,
        groupName:group?.name || "Sabores",
        quantity:qty,
        unitPrice:Number(option.price_delta || 0),
        total:
          qty *
          Number(option.price_delta || 0)
      });
    }
  );

  return result;
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
  empanadaFlavorCounts = new Map();

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

    <div class="product-modal-layout">

      <div class="product-modal-scroll">

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

        </div>

      </div>

      <div class="product-actions">

        <div class="quantity-control ${
          currentProductIsEmpanadas()
            ? "empanadas-main-quantity-hidden"
            : ""
        }">
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

  getProductGroups(currentProduct.id)
    .forEach(
      syncExclusivePlainOption
    );

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
              currentProductIsEmpanadas()
                ? "ELEG&Iacute; CANTIDADES"
                : group.required
                  ? "OBLIGATORIO"
                  : "OPCIONAL"
            }
          </span>
        </div>

        <div class="option-list">
          ${groupOptions.map((option) => {
            if (currentProductIsEmpanadas()) {
              return `
                <div
                  class="option-row empanada-flavor-row"
                  data-option-id="${escapeHTML(option.id)}"
                >
                  <span class="option-copy">
                    <strong>${escapeHTML(option.name)}</strong>
                    <small>${percentPromoForProduct(currentProduct)>0 ? `<s>${money(option.price_delta)}</s> ${money(applyPercentDiscount(option.price_delta,currentProduct))}` : money(option.price_delta)} c/u</small>
                  </span>

                  <div
                    class="empanada-quantity-control"
                    data-empanada-option-id="${escapeHTML(option.id)}"
                  >
                    <button type="button" class="empanada-minus">-</button>
                    <strong class="empanada-flavor-count">0</strong>
                    <button type="button" class="empanada-plus">+</button>
                  </div>
                </div>
              `;
            }

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
                      isSizeGroup(group)
                        ? (
                            percentPromoForProduct(product) > 0
                              ? `<s>${money(Number(option.price_delta || 0))}</s> ${money(applyPercentDiscount(Number(option.price_delta || 0),product))}`
                              : money(Number(option.price_delta || 0))
                          )
                        : Number(option.price_delta || 0) > 0
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
  if (currentProductIsEmpanadas()) {
    productModalContent
      .querySelectorAll(".empanada-quantity-control")
      .forEach((control) => {
        const optionId =
          String(control.dataset.empanadaOptionId);

        const countElement =
          control.querySelector(".empanada-flavor-count");

        const syncCount = () => {
          const count =
            empanadaFlavorCount(optionId);

          if (countElement) {
            countElement.textContent =
              String(count);
          }

          control
            .closest(".empanada-flavor-row")
            ?.classList.toggle(
              "has-quantity",
              count > 0
            );

          refreshPrice();
          hideProductError();
        };

        control
          .querySelector(".empanada-minus")
          ?.addEventListener("click", () => {
            empanadaFlavorCounts.set(
              optionId,
              Math.max(
                0,
                empanadaFlavorCount(optionId) - 1
              )
            );

            syncCount();
          });

        control
          .querySelector(".empanada-plus")
          ?.addEventListener("click", () => {
            empanadaFlavorCounts.set(
              optionId,
              empanadaFlavorCount(optionId) + 1
            );

            syncCount();
          });
      });
  }

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

      const plainOption =
        getGroupOptions(group.id)
          .find(isPlainMuzzarellaOption);

      if (plainOption) {
        const currentOption =
          options.find(
            (option) =>
              String(option.id) ===
              String(input.value)
          );

        const plainInput =
          groupElement.querySelector(
            `input[value="${plainOption.id}"]`
          );

        if (
          input.checked &&
          isPlainMuzzarellaOption(
            currentOption
          )
        ) {
          groupElement
            .querySelectorAll("input")
            .forEach((otherInput) => {
              if (otherInput !== input) {
                otherInput.checked = false;
              }
            });
        } else if (
          input.checked &&
          plainInput
        ) {
          plainInput.checked = false;
        }
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

      syncExclusivePlainOption(group);
      clearInvalidSelections();
      refreshDependentOptions();
      syncExclusivePlainOption(group);
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
    ?.addEventListener(
      "click",
      addCurrentProductToCart
    );
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
  if (currentProductIsEmpanadas()) {
    return empanadaTotalPrice();
  }

  const pizzaProduct=currentProductIsPizza();
  const selectedIds=getSelectedOptionIds();
  let basePrice=pizzaProduct ? 0 : Number(currentProduct?.price||0);
  let extrasTotal=0;

  getProductGroups(currentProduct.id).forEach(group=>{
    getGroupOptions(group.id).forEach(option=>{
      if(!selectedIds.has(String(option.id))) return;
      const price=Number(option.price_delta||0);
      if(pizzaProduct && isSizeGroup(group)) basePrice=price;
      else extrasTotal+=price;
    });
  });

  return applyPercentDiscount(basePrice,currentProduct)+extrasTotal;
}

function refreshPrice() {
  const target =
    document.getElementById("liveProductPrice");

  const button =
    document.getElementById("addToCartButton");

  if (!target || !button) {
    return;
  }

  if (currentProductIsEmpanadas()) {
    const quantity =
      empanadaTotalQuantity();

    const total =
      empanadaTotalPrice();

    target.textContent =
      quantity > 0
        ? `${quantity} empanada${quantity === 1 ? "" : "s"} - ${money(total)}`
        : "Elegi los sabores y cantidades";

    button.textContent =
      quantity > 0
        ? `Agregar ${quantity} empanada${quantity === 1 ? "" : "s"} - ${money(total)}`
        : "Elegi al menos 1 empanada";

    button.disabled =
      quantity === 0;

    return;
  }

  button.disabled = false;

  const unitPrice =
    currentUnitPrice();

  const total =
    unitPrice * currentQuantity;

  target.textContent =
    `Total: ${money(total)}`;

  button.textContent =
    `Agregar - ${money(total)}`;
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
  if (currentProductIsEmpanadas()) {
    return (
      empanadaTotalQuantity() > 0
        ? ""
        : "Elegi al menos una empanada."
    );
  }

  const productGroups =
    getProductGroups(currentProduct.id);

  const pizzaProduct =
    currentProductIsPizza();

  for (const group of productGroups) {
    const visibleOptions =
      visibleOptionsForGroup(group);

    if (!visibleOptions.length) {
      continue;
    }

    const chosen =
      selectedOptions.get(
        String(group.id)
      ) || [];

    if (
      chosen.length > 1 &&
      getGroupOptions(group.id)
        .some(isPlainMuzzarellaOption)
    ) {
      const chosenOptions =
        chosen
          .map(
            (id) =>
              options.find(
                (option) =>
                  String(option.id) ===
                  String(id)
              )
          )
          .filter(Boolean);

      if (
        chosenOptions.some(
          isPlainMuzzarellaOption
        )
      ) {
        return "Elegi Solo Muzzarella o los extras, no ambas cosas.";
      }
    }

    const requiredForThisProduct =
      pizzaProduct
        ? isSizeGroup(group)
        : Boolean(group.required);

    if (
      requiredForThisProduct &&
      chosen.length === 0
    ) {
      return pizzaProduct
        ? "Eleg\u00ed el tama\u00f1o de la pizza."
        : `Eleg\u00ed una opci\u00f3n en ${group.name}.`;
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

async function addCurrentProductToCart() {
  if (!(await requireOrderingOpen())) {
    return;
  }

  const error =
    validateProductSelection();

  if (error) {
    showProductError(error);
    return;
  }

  if (currentProductIsEmpanadas()) {
    const flavors =
      selectedEmpanadaFlavors();

    const quantity =
      empanadaTotalQuantity();

    const total =
      empanadaTotalPrice();

    cart.push({
      key:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      type:"empanadas",
      productId:currentProduct.id,
      productName:currentProduct.name,
      quantity,
      unitPrice:
        quantity > 0
          ? total / quantity
          : 0,
      total,
      promoPercent:percentPromoForProduct(currentProduct),
      flavors,
      options:flavors.map(
        (flavor) => ({
          groupId:flavor.groupId,
          groupName:flavor.groupName,
          optionId:flavor.optionId,
          optionName:
            `${flavor.quantity} ${flavor.optionName}`,
          price:flavor.unitPrice
        })
      )
    });

    saveCart();
    updateCartBar();
    closeProductModal();

    showToast(
      `${quantity} empanada${quantity === 1 ? "" : "s"} agregada${quantity === 1 ? "" : "s"} al pedido.`
    );

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
          const rawOptionPrice =
            Number(
              option.price_delta || 0
            );

          const optionContribution =
            rawOptionPrice;

          selected.push({
            groupId:group.id,
            groupName:group.name,
            optionId:option.id,
            optionName:option.name,
            price:optionContribution
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
    promoPercent:percentPromoForProduct(currentProduct),
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
  empanadaFlavorCounts = new Map();
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

  cartItems.innerHTML =
    cart.map((item) => {
      if (
        item.type === "empanadas" &&
        Array.isArray(item.flavors)
      ) {
        return `
          <article class="cart-item empanadas-cart-item">

            <div class="cart-item-top">
              <div>
                <h3>
                  ${item.quantity} EMPANADA${item.quantity === 1 ? "" : "S"}
                </h3>

                <p class="cart-item-options empanadas-cart-breakdown">
                  ${item.flavors.map(
                    (flavor) =>
                      `<strong>${escapeHTML(flavor.quantity)}</strong> ${escapeHTML(flavor.optionName)}`
                  ).join("<br>")}
                </p>
              </div>

              <strong>${money(item.total)}</strong>
            </div>

            <div class="cart-item-bottom">
              <span>
                ${item.flavors.length}
                sabor${item.flavors.length === 1 ? "" : "es"}
              </span>

              <button
                type="button"
                class="cart-remove"
                data-cart-key="${escapeHTML(item.key)}"
              >
                Eliminar
              </button>
            </div>

          </article>
        `;
      }

      return `
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
              ${
                Number(item.promoPercent || 0) > 0
                  ? `<p class="cart-promo-applied">PROMO -${Number(item.promoPercent)}% APLICADA</p>`
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
      `;
    }).join("");

  const giftItems = cartGiftItems();

  if (giftItems.length) {
    cartItems.innerHTML += giftItems.map(gift => `
      <article class="cart-item promo-gift-cart-item">
        <div class="cart-item-top">
          <div>
            <h3>${gift.quantity} x ${escapeHTML(gift.productName)}</h3>
            <p class="cart-item-options">🎁 REGALO PROMO</p>
          </div>
          <strong>GRATIS</strong>
        </div>
      </article>
    `).join("");
  }

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


function openCheckoutModal() {
  checkoutFormError.classList.remove("show");
  checkoutFormError.textContent = "";

  checkoutItemsCount.textContent =
    cart.reduce(
      (sum,item) =>
        sum + Number(item.quantity || 0),
      0
    );

  checkoutTotal.textContent =
    money(cartGrandTotal());

  syncDeliveryFields();
  syncPaymentFields();

  checkoutModal.classList.add("open");
  checkoutModal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");

  setTimeout(() => customerName.focus(),50);
}

function closeCheckoutModal() {
  checkoutModal.classList.remove("open");
  checkoutModal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}

function syncDeliveryFields() {
  const isDelivery =
    deliveryType.value === "delivery";

  deliveryExtraFields.style.display =
    isDelivery ? "grid" : "none";

  customerAddress.required = isDelivery;
  paymentMethod.required = isDelivery;

  if (!isDelivery) {
    customerAddress.value = "";
    customerReference.value = "";
    cashAmount.value = "";
    paymentMethod.required = false;
  }

  syncPaymentFields();
}

function syncPaymentFields() {
  const isDelivery =
    deliveryType.value === "delivery";

  const isCash =
    paymentMethod.value === "cash";

  cashAmountField.style.display =
    isDelivery && isCash
      ? "grid"
      : "none";

  if (!isDelivery || !isCash) {
    cashAmount.value = "";
  }
}

function showCheckoutError(message) {
  checkoutFormError.textContent = message;
  checkoutFormError.classList.add("show");
}

function hideCheckoutError() {
  checkoutFormError.classList.remove("show");
}

async function saveOrderToSupabase() {
  const total = cartGrandTotal();

  const order = await insertRow(
    "orders",
    {
      business_id:business.id,
      customer_name:customerName.value.trim(),
      customer_phone:customerPhone.value.trim(),
      delivery_type:deliveryType.value,
      delivery_address:
        deliveryType.value === "delivery"
          ? customerAddress.value.trim()
          : null,
      delivery_reference:
        deliveryType.value === "delivery"
          ? customerReference.value.trim() || null
          : null,
      payment_method:
        deliveryType.value === "delivery"
          ? paymentMethod.value
          : null,
      cash_amount:
        deliveryType.value === "delivery" &&
        paymentMethod.value === "cash" &&
        cashAmount.value
          ? Number(cashAmount.value)
          : null,
      notes:
        customerNotes.value.trim() || null,
      status:"received",
      total,
      source:"web"
    }
  );

  if (!order?.id) {
    throw new Error(
      "Supabase no devolvio el ID del pedido."
    );
  }

  for (const item of cart) {
    const orderItem = await insertRow(
      "order_items",
      {
        order_id:order.id,
        product_id:item.productId,
        product_name:item.productName,
        quantity:item.quantity,
        unit_price:item.unitPrice,
        total:item.total
      }
    );

    if (!orderItem?.id) {
      continue;
    }

    for (const option of item.options) {
      await insertRow(
        "order_item_options",
        {
          order_item_id:orderItem.id,
          group_name:option.groupName,
          option_name:option.optionName,
          price_delta:option.price
        },
        false
      );
    }
  }

  for (const gift of cartGiftItems()) {
    const giftOrderItem=await insertRow(
      "order_items",
      {
        order_id:order.id,
        product_id:gift.productId,
        product_name:gift.productName,
        quantity:gift.quantity,
        unit_price:0,
        total:0
      }
    );

    if(giftOrderItem?.id){
      await insertRow(
        "order_item_options",
        {
          order_item_id:giftOrderItem.id,
          group_name:"PROMO",
          option_name:"REGALO",
          price_delta:0
        },
        false
      );
    }
  }

  return order;
}


const WHATSAPP_ORDER_PHONE = "59892569559";

function whatsappOrderMessage() {
  const lines = [
    "\ud83c\udf55 *MAMMA MIA - NUEVO PEDIDO*",
    "",
    "\ud83e\uddfe *PEDIDO*",
    ""
  ];

  cart.forEach((item) => {
    if (
      item.type === "empanadas" &&
      Array.isArray(item.flavors)
    ) {
      const quantity =
        Number(item.quantity || 0);

      lines.push(
        `*${quantity} EMPANADA${quantity === 1 ? "" : "S"}*`
      );

      item.flavors.forEach((flavor) => {
        lines.push(
          `${flavor.quantity} ${String(flavor.optionName || "").trim().toUpperCase()}`
        );
      });

      lines.push(
        `Subtotal: *${money(item.total)}*`
      );
      lines.push("");
      return;
    }

    const quantity = Number(item.quantity || 1);
    const productName =
      String(item.productName || "Producto")
        .trim()
        .toUpperCase();

    const sizeOption = item.options.find((option) => {
      const group =
        String(option.groupName || "")
          .trim()
          .toUpperCase();

      return (
        group.includes("TAMANO") ||
        group.includes("TAMA\u00d1O")
      );
    });

    const sizeName =
      sizeOption
        ? String(sizeOption.optionName || "")
            .trim()
            .toUpperCase()
        : "";

    let title =
      `${quantity} ${productName}`;

    if (sizeName) {
      title += ` - ${sizeName}`;
    }

    lines.push(`*${title}*`);

    item.options.forEach((option) => {
      if (option === sizeOption) {
        return;
      }

      const optionName =
        String(option.optionName || "").trim();

      if (!optionName) {
        return;
      }

      const extra =
        Number(option.price || 0);

      lines.push(
        extra > 0
          ? `+ ${optionName} - ${money(extra)}`
          : `+ ${optionName}`
      );
    });

    if (Number(item.promoPercent || 0) > 0) {
      lines.push(`PROMO APLICADA: -${Number(item.promoPercent)}%`);
    }

    lines.push(
      `Subtotal: *${money(item.total)}*`
    );
    lines.push("");
  });

  const gifts=cartGiftItems();
  if(gifts.length){
    lines.push("🎁 *REGALO PROMO*");
    gifts.forEach(gift=>{
      lines.push(`${gift.quantity} ${String(gift.productName||"").trim().toUpperCase()} - GRATIS`);
    });
    lines.push("");
  }

  const notes =
    customerNotes.value.trim();

  if (notes) {
    lines.push("\ud83d\udcdd *OBSERVACIONES*");
    lines.push(`*${notes.toUpperCase()}*`);
    lines.push("");
  }

  lines.push(
    `\ud83d\udcb5 *TOTAL: ${money(cartGrandTotal())}*`
  );
  lines.push("");

  lines.push("\ud83d\udc64 *CLIENTE*");
  lines.push(customerName.value.trim());
  lines.push(customerPhone.value.trim());
  lines.push("");

  if (deliveryType.value === "pickup") {
    lines.push("\ud83c\udfea *RETIRO EN EL LOCAL*");
  } else {
    lines.push("\ud83d\udef5 *DELIVERY*");
    lines.push(
      `Direccion: ${customerAddress.value.trim()}`
    );

    const reference =
      customerReference.value.trim();

    if (reference) {
      lines.push(`Referencia: ${reference}`);
    }

    lines.push("");
    lines.push("\ud83d\udcb3 *PAGO*");

    if (paymentMethod.value === "cash") {
      lines.push("Efectivo");

      if (cashAmount.value) {
        lines.push(
          `Paga con: ${money(Number(cashAmount.value))}`
        );
      }
    } else {
      lines.push("Transferencia");
    }
  }

  lines.push("");
  lines.push("--------------------");
  lines.push("*Pedido realizado desde Mamma Mia*");

  return lines.join("\n");
}

function whatsappOrderUrl() {
  return (
    `https://wa.me/${WHATSAPP_ORDER_PHONE}` +
    `?text=${encodeURIComponent(whatsappOrderMessage())}`
  );
}

checkoutForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();
    hideCheckoutError();

    if (!cart.length) {
      showCheckoutError(
        "El carrito est\u00e1 vac\u00edo."
      );
      return;
    }

    if (!customerName.value.trim()) {
      showCheckoutError(
        "Escrib\u00ed tu nombre."
      );
      return;
    }

    if (!customerPhone.value.trim()) {
      showCheckoutError(
        "Escrib\u00ed tu tel\u00e9fono."
      );
      return;
    }

    if (
      deliveryType.value === "delivery" &&
      !customerAddress.value.trim()
    ) {
      showCheckoutError(
        "Escrib\u00ed la direcci\u00f3n de entrega."
      );
      return;
    }

    if (
      deliveryType.value === "delivery" &&
      paymentMethod.value === "cash" &&
      cashAmount.value &&
      Number(cashAmount.value) < cartGrandTotal()
    ) {
      showCheckoutError(
        "El monto en efectivo no puede ser menor al total."
      );
      return;
    }

    confirmOrderButton.disabled = true;
    confirmOrderButton.textContent =
      "Verificando disponibilidad...";

    try {
      if (!(await requireOrderingOpen())) {
        confirmOrderButton.disabled = false;
        confirmOrderButton.textContent =
          "Confirmar pedido";
        return;
      }

      confirmOrderButton.textContent =
        "Enviando pedido...";

      const order =
        await saveOrderToSupabase();

      const whatsappUrl =
        whatsappOrderUrl();

      closeCheckoutModal();

      cart = [];
      saveCart();
      updateCartBar();

      checkoutForm.reset();
      deliveryType.value = "delivery";
      paymentMethod.value = "cash";
      syncDeliveryFields();

      window.location.href =
        whatsappUrl;

    } catch (error) {
      console.error(
        "Error confirmando pedido:",
        error
      );

      showCheckoutError(
        "No se pudo enviar el pedido. Revis\u00e1 la configuraci\u00f3n de Supabase."
      );
    } finally {
      confirmOrderButton.disabled = false;
      confirmOrderButton.textContent =
        "Confirmar pedido";
    }
  }
);

deliveryType.addEventListener(
  "change",
  syncDeliveryFields
);

paymentMethod.addEventListener(
  "change",
  syncPaymentFields
);

closeCheckoutButton.addEventListener(
  "click",
  closeCheckoutModal
);

document
  .querySelector("[data-close-checkout]")
  ?.addEventListener(
    "click",
    closeCheckoutModal
  );

closeSuccessButton.addEventListener(
  "click",
  () => {
    orderSuccessModal.classList.remove("open");
    orderSuccessModal.setAttribute(
      "aria-hidden",
      "true"
    );
    document.body.classList.remove("modal-open");
  }
);


function enterStore() {
  if (!welcomeScreen) {
    return;
  }

  welcomeScreen.classList.add("is-leaving");

  document.body.classList.remove("welcome-open");

  window.setTimeout(() => {
    welcomeScreen.style.display = "none";
  }, 560);
}

document.body.classList.add("welcome-open");

enterStoreButton?.addEventListener(
  "click",
  async () => {
    if (!(await requireOrderingOpen())) {
      return;
    }

    enterStore();
  }
);

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
  async () => {
    if (!(await requireOrderingOpen())) {
      return;
    }

    openCartModal();
  }
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
  async () => {
    if (!(await requireOrderingOpen())) {
      return;
    }

    if (!cart.length) {
      showToast(
        "Agregá al menos un producto antes de continuar."
      );
      return;
    }

    closeCartModal();
    openCheckoutModal();
  }
);

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (orderSuccessModal.classList.contains("open")) {
      return;
    }

    if (checkoutModal.classList.contains("open")) {
      closeCheckoutModal();
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

window.setInterval(
  () => {
    if (business?.id) {
      refreshOrderingStatusFromSupabase();
    }
  },
  10000
);
