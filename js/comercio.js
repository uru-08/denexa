const navItems = document.querySelectorAll(".nav-item");
const merchantPanelLogo = document.getElementById("merchantPanelLogo");
const storeDesignForm = document.getElementById("storeDesignForm");
const designLogoFile = document.getElementById("designLogoFile");
const designLogoUrl = document.getElementById("designLogoUrl");
const designLogoPreview = document.getElementById("designLogoPreview");
const designPrimaryColor = document.getElementById("designPrimaryColor");
const designSecondaryColor = document.getElementById("designSecondaryColor");
const designAccentColor = document.getElementById("designAccentColor");
const designHeroTitle = document.getElementById("designHeroTitle");
const designHeroDescription = document.getElementById("designHeroDescription");
const designButtonText = document.getElementById("designButtonText");
const designHeroImageFile = document.getElementById("designHeroImageFile");
const designHeroImageUrl = document.getElementById("designHeroImageUrl");
const storeDesignMessage = document.getElementById("storeDesignMessage");
const saveStoreDesignButton = document.getElementById("saveStoreDesignButton");
const restoreStoreDesignButton = document.getElementById("restoreStoreDesignButton");
const dailyPromoForm = document.getElementById("dailyPromoForm");
const dailyPromoActive = document.getElementById("dailyPromoActive");
const dailyPromoActiveText = document.getElementById("dailyPromoActiveText");
const dailyPromoBadge = document.getElementById("dailyPromoBadge");
const dailyPromoTitle = document.getElementById("dailyPromoTitle");
const dailyPromoText = document.getElementById("dailyPromoText");
const dailyPromoMessage = document.getElementById("dailyPromoMessage");
const saveDailyPromoButton = document.getElementById("saveDailyPromoButton");
const disableDailyPromoButton = document.getElementById("disableDailyPromoButton");
const dailyPromoStatusBadge = document.getElementById("dailyPromoStatusBadge");
const dailyPromoPreview = document.getElementById("dailyPromoPreview");
const dailyPromoPreviewBadge = document.getElementById("dailyPromoPreviewBadge");
const dailyPromoPreviewTitle = document.getElementById("dailyPromoPreviewTitle");
const dailyPromoPreviewText = document.getElementById("dailyPromoPreviewText");
const paymentSettingsForm = document.getElementById("paymentSettingsForm");
const paymentBankName = document.getElementById("paymentBankName");
const paymentAccountHolder = document.getElementById("paymentAccountHolder");
const paymentAccountNumber = document.getElementById("paymentAccountNumber");
const paymentCurrency = document.getElementById("paymentCurrency");
const paymentInstructions = document.getElementById("paymentInstructions");
const paymentSettingsMessage = document.getElementById("paymentSettingsMessage");
const savePaymentSettingsButton = document.getElementById("savePaymentSettingsButton");
const customerNoticesForm = document.getElementById("customerNoticesForm");
const noticeApprovedEnabled = document.getElementById("noticeApprovedEnabled");
const noticeApprovedMessage = document.getElementById("noticeApprovedMessage");
const noticeReadyEnabled = document.getElementById("noticeReadyEnabled");
const noticeReadyMessage = document.getElementById("noticeReadyMessage");
const noticeDeliveryEnabled = document.getElementById("noticeDeliveryEnabled");
const noticeDeliveryMessage = document.getElementById("noticeDeliveryMessage");
const customerNoticesMessage = document.getElementById("customerNoticesMessage");
const saveCustomerNoticesButton = document.getElementById("saveCustomerNoticesButton");
const customerNoticesOrdersState = document.getElementById("customerNoticesOrdersState");


const dailyPromoRuleType = document.getElementById("dailyPromoRuleType");
const promoAutomaticFields = document.getElementById("promoAutomaticFields");
const promoTargetType = document.getElementById("promoTargetType");
const promoTargetId = document.getElementById("promoTargetId");
const promoPercentFields = document.getElementById("promoPercentFields");
const promoDiscountPercent = document.getElementById("promoDiscountPercent");
const promoGiftFields = document.getElementById("promoGiftFields");
const promoTriggerQty = document.getElementById("promoTriggerQty");
const promoRewardProductId = document.getElementById("promoRewardProductId");
const promoRewardQty = document.getElementById("promoRewardQty");
const promoRepeat = document.getElementById("promoRepeat");

const designPreview = document.getElementById("designPreview");
const designPreviewLogo = document.getElementById("designPreviewLogo");
const designPreviewTitle = document.getElementById("designPreviewTitle");
const designPreviewDescription = document.getElementById("designPreviewDescription");
const designPreviewButton = document.getElementById("designPreviewButton");

const sections = document.querySelectorAll(".page-section");

const businessModal = document.getElementById("businessModal");
const businessForm = document.getElementById("businessForm");
const businessModalTitle = document.getElementById("businessModalTitle");
const businessName = document.getElementById("businessName");
const businessSlug = document.getElementById("businessSlug");
const businessPhone = document.getElementById("businessPhone");
const businessAddress = document.getElementById("businessAddress");
const businessLogoUrl = document.getElementById("businessLogoUrl");
const businessPrimaryColor = document.getElementById("businessPrimaryColor");
const businessSecondaryColor = document.getElementById("businessSecondaryColor");
const businessActive = document.getElementById("businessActive");
const businessFormMessage = document.getElementById("businessFormMessage");
const saveBusinessButton = document.getElementById("saveBusinessButton");
const newBusinessButton = document.getElementById("newBusinessButton");
const closeBusinessModalButton = document.getElementById("closeBusinessModal");
const cancelBusinessButton = document.getElementById("cancelBusinessButton");

const businessDetailModal = document.getElementById("businessDetailModal");
const businessDetailTitle = document.getElementById("businessDetailTitle");
const businessDetailContent = document.getElementById("businessDetailContent");
const closeBusinessDetailButton = document.getElementById("closeBusinessDetailButton");
const businessCategoriesButton = document.getElementById("businessCategoriesButton");
const businessProductsButton = document.getElementById("businessProductsButton");
const editBusinessButton = document.getElementById("editBusinessButton");
const businessStoreButton = document.getElementById("businessStoreButton");

const categoryModal = document.getElementById("categoryModal");
const categoryForm = document.getElementById("categoryForm");
const categoryName = document.getElementById("categoryName");
const categoryActive = document.getElementById("categoryActive");
const categoryFormMessage = document.getElementById("categoryFormMessage");
const saveCategoryButton = document.getElementById("saveCategoryButton");
const closeCategoryModalButton = document.getElementById("closeCategoryModalButton");
const cancelCategoryButton = document.getElementById("cancelCategoryButton");


const productModal = document.getElementById("productModal");
const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productPrice = document.getElementById("productPrice");
const productOldPrice = document.getElementById("productOldPrice");
const productSortOrder = document.getElementById("productSortOrder");
const productFeatured = document.getElementById("productFeatured");
const productDescription = document.getElementById("productDescription");
const productActive = document.getElementById("productActive");
const productFormMessage = document.getElementById("productFormMessage");
const saveProductButton = document.getElementById("saveProductButton");
const closeProductModalButton = document.getElementById("closeProductModalButton");
const cancelProductButton = document.getElementById("cancelProductButton");
const productImageInput = document.getElementById("productImageInput");
const selectProductImageButton = document.getElementById("selectProductImageButton");
const removeProductImageButton = document.getElementById("removeProductImageButton");
const productImagePreview = document.getElementById("productImagePreview");

const imageCropModal = document.getElementById("imageCropModal");
const imageCropCanvas = document.getElementById("imageCropCanvas");
const imageCropContext = imageCropCanvas.getContext("2d");
const imageZoomRange = document.getElementById("imageZoomRange");
const cancelImageCropButton = document.getElementById("cancelImageCropButton");
const confirmImageCropButton = document.getElementById("confirmImageCropButton");


const modifiersModal = document.getElementById("modifiersModal");
const modifiersModalTitle = document.getElementById("modifiersModalTitle");
const modifiersModalSubtitle = document.getElementById("modifiersModalSubtitle");
const closeModifiersModalButton = document.getElementById("closeModifiersModalButton");
const newModifierGroupButton = document.getElementById("newModifierGroupButton");
const modifierGroupsList = document.getElementById("modifierGroupsList");

const modifierGroupModal = document.getElementById("modifierGroupModal");
const modifierGroupForm = document.getElementById("modifierGroupForm");
const modifierGroupModalTitle = document.getElementById("modifierGroupModalTitle");
const modifierGroupName = document.getElementById("modifierGroupName");
const modifierGroupType = document.getElementById("modifierGroupType");
const modifierGroupMax = document.getElementById("modifierGroupMax");
const modifierGroupSortOrder = document.getElementById("modifierGroupSortOrder");
const modifierGroupRequired = document.getElementById("modifierGroupRequired");
const modifierGroupActive = document.getElementById("modifierGroupActive");
const modifierGroupFormMessage = document.getElementById("modifierGroupFormMessage");
const saveModifierGroupButton = document.getElementById("saveModifierGroupButton");
const closeModifierGroupModalButton = document.getElementById("closeModifierGroupModalButton");
const cancelModifierGroupButton = document.getElementById("cancelModifierGroupButton");

const modifierOptionModal = document.getElementById("modifierOptionModal");
const modifierOptionForm = document.getElementById("modifierOptionForm");
const modifierOptionModalTitle = document.getElementById("modifierOptionModalTitle");
const modifierOptionGroupName = document.getElementById("modifierOptionGroupName");
const modifierOptionName = document.getElementById("modifierOptionName");
const modifierOptionPrice = document.getElementById("modifierOptionPrice");
const modifierOptionPriceLabel = document.getElementById("modifierOptionPriceLabel");
const modifierOptionParent = document.getElementById("modifierOptionParent");
const modifierOptionSortOrder = document.getElementById("modifierOptionSortOrder");
const modifierOptionActive = document.getElementById("modifierOptionActive");
const modifierOptionFormMessage = document.getElementById("modifierOptionFormMessage");
const saveModifierOptionButton = document.getElementById("saveModifierOptionButton");
const closeModifierOptionModalButton = document.getElementById("closeModifierOptionModalButton");
const cancelModifierOptionButton = document.getElementById("cancelModifierOptionButton");

const ordersList = document.getElementById("ordersList");
const ordersBusinessFilter = document.getElementById("ordersBusinessFilter");
const ordersStatusFilter = document.getElementById("ordersStatusFilter");
const refreshOrdersButton = document.getElementById("refreshOrdersButton");
const clearShiftOrdersButton = document.getElementById("clearShiftOrdersButton");
const ordersLastUpdate = document.getElementById("ordersLastUpdate");
const dashboardOrdersList = document.getElementById("dashboardOrdersList");
const dashboardGoOrdersButton = document.getElementById("dashboardGoOrdersButton");

const MERCHANT_BUSINESS_ID = 1;
const merchantStoreStatusBadge = document.getElementById("merchantStoreStatusBadge");
const merchantQuickStatusText = document.getElementById("merchantQuickStatusText");
const merchantOpenButton = document.getElementById("merchantOpenButton");
const merchantCloseButton = document.getElementById("merchantCloseButton");
const merchantSoldOutButton = document.getElementById("merchantSoldOutButton");
const merchantStatusLarge = document.getElementById("merchantStatusLarge");
const merchantStatusOpen = document.getElementById("merchantStatusOpen");
const merchantStatusClosed = document.getElementById("merchantStatusClosed");
const merchantStatusSoldOut = document.getElementById("merchantStatusSoldOut");
const merchantSoldOutMessage = document.getElementById("merchantSoldOutMessage");
const merchantSaveMessage = document.getElementById("merchantSaveMessage");

const toast = document.getElementById("toast");

let businessesCache = [];
let selectedBusiness = null;
let editingBusinessId = null;
let editingProductId = null;
let existingProductImageUrl = "";
let removeExistingProductImage = false;
let croppedProductImageBlob = null;
let croppedProductImageUrl = "";
let cropImage = null;
let cropBaseScale = 1;
let cropZoom = 1;
let cropOffsetX = 0;
let cropOffsetY = 0;
let cropDragging = false;
let cropPointerX = 0;
let cropPointerY = 0;
let selectedProduct = null;
let selectedModifierGroup = null;
let editingModifierGroupId = null;
let editingModifierOptionId = null;
let currentModifierGroups = [];
let currentModifierOptions = [];
let ordersCache = [];
let orderItemsCache = [];
let orderItemOptionsCache = [];
let knownOrderIds = new Set();
let ordersFirstLoad = true;
let ordersLoading = false;
let ordersPollTimer = null;



function openSection(sectionId) {
  navItems.forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.section === sectionId
    );
  });

  sections.forEach((section) => {
    section.classList.toggle(
      "active",
      section.id === sectionId
    );
  });
}

navItems.forEach((button) => {
  button.addEventListener("click", async () => {
    const sectionId = button.dataset.section;

    openSection(sectionId);

    if (sectionId === "categories") {
      await loadCategories();
    }

    if (sectionId === "products") {
      await loadProducts();
    }

    if (sectionId === "orders") {
      await loadOrders();
    }

    if (sectionId === "storeDesign") {
      fillStoreDesignForm();
    }

    if (sectionId === "dailyPromo") {
      await fillDailyPromoForm();
    }

    if (sectionId === "payments") {
      fillPaymentSettingsForm();
    }

    if (sectionId === "customerNotices") {
      fillCustomerNoticesForm();
    }
  });
});

document
  .querySelector(".go-businesses")
  ?.addEventListener("click", () => {
    openSection("businesses");
  });

function normalizeSlug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message, type = "success") {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.className = `toast show ${type}`;

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.className = "toast";
  }, 3200);
}

async function requestText(url, options = {}) {
  const response = await fetch(url, options);
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Error ${response.status}: ${responseText || response.statusText}`
    );
  }

  return responseText;
}


async function setBusinessOrderingStatusRPC(
  businessId,
  status,
  soldOutMessage = null
) {
  const responseText =
    await requestText(
      `${SUPABASE_REST}/rpc/set_business_ordering_status`,
      {
        method: "POST",
        headers: supabaseHeaders({
          Prefer: "return=representation"
        }),
        body: JSON.stringify({
          p_business_id:
            Number(businessId),
          p_status:
            status,
          p_message:
            soldOutMessage
        })
      }
    );

  if (!responseText.trim()) {
    return null;
  }

  const data =
    JSON.parse(responseText);

  if (Array.isArray(data)) {
    return data[0] || null;
  }

  return data;
}

async function readBusinessOrderingStatus(
  businessId
) {
  const responseText =
    await requestText(
      `${SUPABASE_REST}/businesses?id=eq.${encodeURIComponent(businessId)}&select=id,name,ordering_status,sold_out_message`,
      {
        method: "GET",
        headers: supabaseHeaders()
      }
    );

  if (!responseText.trim()) {
    return null;
  }

  const rows =
    JSON.parse(responseText);

  return Array.isArray(rows)
    ? rows[0] || null
    : null;
}

async function getTableData(tableName, select = "*") {
  const responseText = await requestText(
    `${SUPABASE_REST}/${tableName}?select=${encodeURIComponent(select)}`,
    {
      method: "GET",
      headers: supabaseHeaders()
    }
  );

  if (!responseText.trim()) {
    return [];
  }

  const data = JSON.parse(responseText);

  return Array.isArray(data) ? data : [];
}

async function insertTableRow(tableName, payload) {
  await requestText(
    `${SUPABASE_REST}/${tableName}`,
    {
      method: "POST",
      headers: supabaseHeaders({
        Prefer: "return=minimal"
      }),
      body: JSON.stringify(payload)
    }
  );

  return true;
}

async function updateTableRow(tableName, id, payload) {
  await requestText(
    `${SUPABASE_REST}/${tableName}?id=eq.${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: supabaseHeaders({
        Prefer: "return=minimal"
      }),
      body: JSON.stringify(payload)
    }
  );

  return true;
}

async function deleteTableRow(tableName, id) {
  await requestText(
    `${SUPABASE_REST}/${tableName}?id=eq.${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: supabaseHeaders({
        Prefer: "return=minimal"
      })
    }
  );

  return true;
}


async function deleteTableRow(tableName, id) {
  await requestText(
    `${SUPABASE_REST}/${tableName}?id=eq.${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      headers: supabaseHeaders({
        Prefer: "return=minimal"
      })
    }
  );

  return true;
}




function safeThemeColor(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(
    String(value || "")
  )
    ? String(value)
    : fallback;
}

function renderMerchantPanelLogo() {
  if (!merchantPanelLogo) {
    return;
  }

  const url =
    selectedBusiness?.logo_url || "";

  if (url) {
    merchantPanelLogo.innerHTML = `
      <img
        src="${escapeHTML(url)}"
        alt="${escapeHTML(selectedBusiness?.name || "Logo")}"
      >
    `;
  } else {
    merchantPanelLogo.innerHTML = "<span>MM</span>";
  }
}

function fillStoreDesignForm() {
  if (!selectedBusiness) {
    return;
  }

  const primary =
    safeThemeColor(
      selectedBusiness.primary_color,
      "#0B43A0"
    );

  const secondary =
    safeThemeColor(
      selectedBusiness.secondary_color,
      "#0E5BD8"
    );

  const accent =
    safeThemeColor(
      selectedBusiness.accent_color,
      "#F4C565"
    );

  designLogoUrl.value =
    selectedBusiness.logo_url || "";

  designPrimaryColor.value = primary;
  designSecondaryColor.value = secondary;
  designAccentColor.value = accent;

  designHeroTitle.value =
    selectedBusiness.hero_title ||
    selectedBusiness.name ||
    "Mamma Mia";

  designHeroDescription.value =
    selectedBusiness.hero_description ||
    "Pizzas y empanadas preparadas para disfrutar. Elegí lo que más te guste y armá tu pedido.";

  designButtonText.value =
    selectedBusiness.welcome_button_text ||
    "Hacer mi pedido";

  designHeroImageUrl.value =
    selectedBusiness.hero_image_url || "";

  updateStoreDesignPreview();
  renderMerchantPanelLogo();
}

function updateStoreDesignPreview() {
  if (!designPreview) {
    return;
  }

  const primary =
    designPrimaryColor?.value || "#0B43A0";

  const secondary =
    designSecondaryColor?.value || "#0E5BD8";

  const accent =
    designAccentColor?.value || "#F4C565";

  designPreview.style.setProperty(
    "--preview-primary",
    primary
  );

  designPreview.style.setProperty(
    "--preview-secondary",
    secondary
  );

  designPreview.style.setProperty(
    "--preview-accent",
    accent
  );

  const logoUrl =
    designLogoUrl?.value.trim() || "";

  designLogoPreview.innerHTML =
    logoUrl
      ? `<img src="${escapeHTML(logoUrl)}" alt="Logo">`
      : "<span>MM</span>";

  designPreviewLogo.innerHTML =
    logoUrl
      ? `<img src="${escapeHTML(logoUrl)}" alt="Logo">`
      : "MM";

  designPreviewTitle.textContent =
    designHeroTitle?.value.trim() ||
    selectedBusiness?.name ||
    "Mamma Mia";

  designPreviewDescription.textContent =
    designHeroDescription?.value.trim() ||
    "Pizzas y empanadas preparadas para disfrutar.";

  designPreviewButton.textContent =
    designButtonText?.value.trim() ||
    "Hacer mi pedido";

  const heroUrl =
    designHeroImageUrl?.value.trim() || "";

  designPreview.style.backgroundImage =
    heroUrl
      ? `linear-gradient(155deg,${primary}e6,${secondary}e6),url("${heroUrl}")`
      : `linear-gradient(155deg,${primary},${secondary})`;
}

async function uploadBrandAsset(file, kind) {
  if (!file) {
    return null;
  }

  const ext =
    String(file.name || "")
      .split(".")
      .pop()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "") ||
    "jpg";

  const objectPath =
    `${selectedBusiness.id}/branding/${kind}-${Date.now()}.${ext}`;

  const uploadUrl =
    `${SUPABASE_URL}/storage/v1/object/product-images/${objectPath}`;

  const response = await fetch(
    uploadUrl,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization:
          `Bearer ${SUPABASE_KEY}`,
        "Content-Type":
          file.type || "image/jpeg",
        "x-upsert": "false"
      },
      body:file
    }
  );

  const responseText =
    await response.text();

  if (!response.ok) {
    throw new Error(
      `No se pudo subir la imagen (${response.status}): ${responseText || response.statusText}`
    );
  }

  return (
    `${SUPABASE_URL}/storage/v1/object/public/product-images/${objectPath}`
  );
}

async function saveBusinessBrandingRPC(payload) {
  const responseText =
    await requestText(
      `${SUPABASE_REST}/rpc/set_business_branding`,
      {
        method:"POST",
        headers:supabaseHeaders({
          Prefer:"return=representation"
        }),
        body:JSON.stringify({
          p_business_id:
            Number(selectedBusiness.id),
          p_logo_url:
            payload.logo_url || null,
          p_primary_color:
            payload.primary_color,
          p_secondary_color:
            payload.secondary_color,
          p_accent_color:
            payload.accent_color,
          p_hero_title:
            payload.hero_title || null,
          p_hero_description:
            payload.hero_description || null,
          p_hero_image_url:
            payload.hero_image_url || null,
          p_welcome_button_text:
            payload.welcome_button_text || null
        })
      }
    );

  const data =
    responseText.trim()
      ? JSON.parse(responseText)
      : null;

  return Array.isArray(data)
    ? data[0] || null
    : data;
}

async function saveStoreDesign() {
  if (!selectedBusiness) {
    return;
  }

  saveStoreDesignButton.disabled = true;
  saveStoreDesignButton.textContent =
    "Guardando...";

  storeDesignMessage.textContent = "";

  try {
    let logoUrl =
      designLogoUrl.value.trim();

    let heroImageUrl =
      designHeroImageUrl.value.trim();

    if (designLogoFile.files?.[0]) {
      logoUrl =
        await uploadBrandAsset(
          designLogoFile.files[0],
          "logo"
        );
    }

    if (designHeroImageFile.files?.[0]) {
      heroImageUrl =
        await uploadBrandAsset(
          designHeroImageFile.files[0],
          "hero"
        );
    }

    const payload = {
      logo_url:logoUrl,
      primary_color:
        designPrimaryColor.value,
      secondary_color:
        designSecondaryColor.value,
      accent_color:
        designAccentColor.value,
      hero_title:
        designHeroTitle.value.trim(),
      hero_description:
        designHeroDescription.value.trim(),
      hero_image_url:heroImageUrl,
      welcome_button_text:
        designButtonText.value.trim()
    };

    const saved =
      await saveBusinessBrandingRPC(
        payload
      );

    if (!saved?.id) {
      throw new Error(
        "Supabase no devolvió el diseño guardado."
      );
    }

    Object.assign(
      selectedBusiness,
      saved
    );

    designLogoUrl.value =
      saved.logo_url || "";

    designHeroImageUrl.value =
      saved.hero_image_url || "";

    designLogoFile.value = "";
    designHeroImageFile.value = "";

    updateStoreDesignPreview();
    renderMerchantPanelLogo();

    storeDesignMessage.textContent =
      "Diseño guardado. La tienda ya puede mostrar los cambios.";

    showToast(
      "Diseño de la tienda actualizado.",
      "success"
    );
  } catch (error) {
    console.error(
      "Error guardando diseño:",
      error
    );

    storeDesignMessage.textContent =
      `No se pudo guardar: ${error.message || "error desconocido"}`;

    showToast(
      "No se pudo guardar el diseño.",
      "error"
    );
  } finally {
    saveStoreDesignButton.disabled = false;
    saveStoreDesignButton.textContent =
      "Guardar diseño";
  }
}

function restoreStoreDesignDefaults() {
  designPrimaryColor.value = "#0B43A0";
  designSecondaryColor.value = "#0E5BD8";
  designAccentColor.value = "#F4C565";
  designHeroTitle.value =
    selectedBusiness?.name || "Mamma Mia";
  designHeroDescription.value =
    "Pizzas y empanadas preparadas para disfrutar. Elegí lo que más te guste y armá tu pedido.";
  designButtonText.value =
    "Hacer mi pedido";
  designHeroImageUrl.value = "";
  designHeroImageFile.value = "";
  updateStoreDesignPreview();
}

[
  designLogoUrl,
  designPrimaryColor,
  designSecondaryColor,
  designAccentColor,
  designHeroTitle,
  designHeroDescription,
  designButtonText,
  designHeroImageUrl
].filter(Boolean).forEach(
  (field) => {
    field.addEventListener(
      "input",
      updateStoreDesignPreview
    );
  }
);

designLogoFile?.addEventListener(
  "change",
  () => {
    const file =
      designLogoFile.files?.[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      const url =
        String(reader.result || "");

      designLogoPreview.innerHTML =
        `<img src="${url}" alt="Logo">`;

      designPreviewLogo.innerHTML =
        `<img src="${url}" alt="Logo">`;
    };

    reader.readAsDataURL(file);
  }
);

storeDesignForm?.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();
    await saveStoreDesign();
  }
);

restoreStoreDesignButton?.addEventListener(
  "click",
  restoreStoreDesignDefaults
);


function paymentDefaults() {
  return {
    bank:"Banco / Institución",
    holder:"Nombre del titular",
    account:"0000000000",
    currency:"Pesos uruguayos",
    instructions:
      "Realizá la transferencia por el total del pedido. Conservá el comprobante."
  };
}

function fillPaymentSettingsForm() {
  if (!selectedBusiness) {
    return;
  }

  const defaults =
    paymentDefaults();

  paymentBankName.value =
    selectedBusiness.payment_bank_name ||
    defaults.bank;

  paymentAccountHolder.value =
    selectedBusiness.payment_account_holder ||
    defaults.holder;

  paymentAccountNumber.value =
    selectedBusiness.payment_account_number ||
    defaults.account;

  paymentCurrency.value =
    selectedBusiness.payment_currency ||
    defaults.currency;

  paymentInstructions.value =
    selectedBusiness.payment_instructions ||
    defaults.instructions;

  paymentSettingsMessage.textContent = "";
}

async function savePaymentSettingsRPC(payload) {
  const responseText =
    await requestText(
      `${SUPABASE_REST}/rpc/set_business_payment_settings`,
      {
        method:"POST",
        headers:supabaseHeaders({
          Prefer:"return=representation"
        }),
        body:JSON.stringify({
          p_business_id:
            Number(selectedBusiness.id),
          p_bank_name:
            payload.bank,
          p_account_holder:
            payload.holder,
          p_account_number:
            payload.account,
          p_currency:
            payload.currency,
          p_instructions:
            payload.instructions
        })
      }
    );

  const data =
    responseText.trim()
      ? JSON.parse(responseText)
      : null;

  return Array.isArray(data)
    ? data[0] || null
    : data;
}

async function savePaymentSettings() {
  if (!selectedBusiness) {
    return;
  }

  const payload = {
    bank:
      paymentBankName.value.trim(),
    holder:
      paymentAccountHolder.value.trim(),
    account:
      paymentAccountNumber.value.trim(),
    currency:
      paymentCurrency.value.trim(),
    instructions:
      paymentInstructions.value.trim()
  };

  if (
    !payload.bank ||
    !payload.holder ||
    !payload.account
  ) {
    paymentSettingsMessage.textContent =
      "Completá banco, titular y número de cuenta.";
    return;
  }

  savePaymentSettingsButton.disabled = true;
  savePaymentSettingsButton.textContent =
    "Guardando...";

  paymentSettingsMessage.textContent = "";

  try {
    const saved =
      await savePaymentSettingsRPC(
        payload
      );

    if (!saved?.id) {
      throw new Error(
        "Supabase no devolvió los datos guardados."
      );
    }

    Object.assign(
      selectedBusiness,
      saved
    );

    fillPaymentSettingsForm();

    paymentSettingsMessage.textContent =
      "Datos guardados. Ya están disponibles para los clientes.";

    showToast(
      "Datos de cobro actualizados.",
      "success"
    );
  } catch (error) {
    console.error(
      "Error guardando datos de cobro:",
      error
    );

    paymentSettingsMessage.textContent =
      `No se pudo guardar: ${error.message || "error desconocido"}`;

    showToast(
      "No se pudieron guardar los datos.",
      "error"
    );
  } finally {
    savePaymentSettingsButton.disabled = false;
    savePaymentSettingsButton.textContent =
      "Guardar datos de cobro";
  }
}

paymentSettingsForm?.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();
    await savePaymentSettings();
  }
);


function customerNoticeDefaults() {
  return {
    approvedEnabled:true,
    readyEnabled:true,
    deliveryEnabled:true,
    approved:
      "Hola {cliente}, tu pedido fue confirmado por {comercio}. Total: {total}.",
    ready:
      "Hola {cliente}, tu pedido ya está listo para retirar en {comercio}. ¡Te esperamos!",
    delivery:
      "Hola {cliente}, tu pedido de {comercio} ya está en camino hacia {direccion}."
  };
}

function fillCustomerNoticesForm() {
  if (!selectedBusiness) {
    return;
  }

  const defaults =
    customerNoticeDefaults();

  noticeApprovedEnabled.checked =
    selectedBusiness.notice_approved_enabled !== false;

  noticeReadyEnabled.checked =
    selectedBusiness.notice_ready_enabled !== false;

  noticeDeliveryEnabled.checked =
    selectedBusiness.notice_delivery_enabled !== false;

  noticeApprovedMessage.value =
    selectedBusiness.notice_approved_message ||
    defaults.approved;

  noticeReadyMessage.value =
    selectedBusiness.notice_ready_message ||
    defaults.ready;

  noticeDeliveryMessage.value =
    selectedBusiness.notice_delivery_message ||
    defaults.delivery;

  customerNoticesMessage.textContent = "";

  updateCustomerNoticesOrdersState();
}

function updateCustomerNoticesOrdersState() {
  if (!customerNoticesOrdersState || !selectedBusiness) {
    return;
  }

  const enabled = [
    selectedBusiness.notice_approved_enabled !== false,
    selectedBusiness.notice_ready_enabled !== false,
    selectedBusiness.notice_delivery_enabled !== false
  ].filter(Boolean).length;

  customerNoticesOrdersState.textContent =
    enabled === 0
      ? "Avisos desactivados."
      : enabled === 3
        ? "3 avisos disponibles. Vos elegís cuándo enviarlos."
        : `${enabled} aviso${enabled === 1 ? "" : "s"} disponible${enabled === 1 ? "" : "s"}. Vos elegís cuándo enviarlo${enabled === 1 ? "" : "s"}.`;
}

async function saveCustomerNoticesRPC(payload) {
  const responseText =
    await requestText(
      `${SUPABASE_REST}/rpc/set_business_customer_notices`,
      {
        method:"POST",
        headers:supabaseHeaders({
          Prefer:"return=representation"
        }),
        body:JSON.stringify({
          p_business_id:
            Number(selectedBusiness.id),
          p_approved_enabled:
            payload.approvedEnabled,
          p_approved_message:
            payload.approved,
          p_ready_enabled:
            payload.readyEnabled,
          p_ready_message:
            payload.ready,
          p_delivery_enabled:
            payload.deliveryEnabled,
          p_delivery_message:
            payload.delivery
        })
      }
    );

  const data =
    responseText.trim()
      ? JSON.parse(responseText)
      : null;

  return Array.isArray(data)
    ? data[0] || null
    : data;
}

async function saveCustomerNotices() {
  if (!selectedBusiness) {
    return;
  }

  const payload = {
    approvedEnabled:
      noticeApprovedEnabled.checked,
    approved:
      noticeApprovedMessage.value.trim(),
    readyEnabled:
      noticeReadyEnabled.checked,
    ready:
      noticeReadyMessage.value.trim(),
    deliveryEnabled:
      noticeDeliveryEnabled.checked,
    delivery:
      noticeDeliveryMessage.value.trim()
  };

  if (
    (payload.approvedEnabled && !payload.approved) ||
    (payload.readyEnabled && !payload.ready) ||
    (payload.deliveryEnabled && !payload.delivery)
  ) {
    customerNoticesMessage.textContent =
      "Todo aviso activado debe tener un mensaje.";
    return;
  }

  saveCustomerNoticesButton.disabled = true;
  saveCustomerNoticesButton.textContent =
    "Guardando...";

  customerNoticesMessage.textContent = "";

  try {
    const saved =
      await saveCustomerNoticesRPC(
        payload
      );

    if (!saved?.id) {
      throw new Error(
        "Supabase no devolvió la configuración guardada."
      );
    }

    Object.assign(
      selectedBusiness,
      saved
    );

    fillCustomerNoticesForm();

    customerNoticesMessage.textContent =
      "Avisos guardados correctamente.";

    showToast(
      "Avisos al cliente actualizados.",
      "success"
    );

    renderOrders();
  } catch (error) {
    console.error(
      "Error guardando avisos:",
      error
    );

    customerNoticesMessage.textContent =
      `No se pudo guardar: ${error.message || "error desconocido"}`;

    showToast(
      "No se pudieron guardar los avisos.",
      "error"
    );
  } finally {
    saveCustomerNoticesButton.disabled = false;
    saveCustomerNoticesButton.textContent =
      "Guardar avisos";
  }
}

customerNoticesForm?.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();
    await saveCustomerNotices();
  }
);


function promoDefaults() {
  return {
    badge:"PROMO DEL DÍA",
    title:"¡No te la pierdas!",
    text:"10% de descuento en pizzas de 1/2 metro."
  };
}

async function loadPromoBuilderOptions() {
  if (!selectedBusiness?.id) {
    promoTargetId.innerHTML =
      '<option value="">No hay comercio seleccionado</option>';

    promoRewardProductId.innerHTML =
      '<option value="">No hay comercio seleccionado</option>';

    return;
  }

  const businessId =
    encodeURIComponent(
      selectedBusiness.id
    );

  try {
    /*
      V70:
      Consultamos directamente los registros del comercio,
      igual que hace el resto del panel. No cargamos toda la
      tabla y luego filtramos en el navegador.
    */
    const [
      categoriesText,
      productsText
    ] = await Promise.all([
      requestText(
        `${SUPABASE_REST}/categories?business_id=eq.${businessId}&active=eq.true&select=id,name&order=name.asc`,
        {
          method:"GET",
          headers:supabaseHeaders()
        }
      ),
      requestText(
        `${SUPABASE_REST}/products?business_id=eq.${businessId}&active=eq.true&select=id,category_id,name,available&order=name.asc`,
        {
          method:"GET",
          headers:supabaseHeaders()
        }
      )
    ]);

    const cats =
      categoriesText.trim()
        ? JSON.parse(categoriesText)
        : [];

    const prods =
      productsText.trim()
        ? JSON.parse(productsText)
        : [];

    const safeCats =
      Array.isArray(cats)
        ? cats
        : [];

    const safeProds =
      Array.isArray(prods)
        ? prods
        : [];

    promoTargetId.dataset.categories =
      JSON.stringify(
        safeCats.map(
          (item) => ({
            id:item.id,
            name:item.name
          })
        )
      );

    promoTargetId.dataset.products =
      JSON.stringify(
        safeProds.map(
          (item) => ({
            id:item.id,
            name:item.name
          })
        )
      );

    promoRewardProductId.innerHTML =
      safeProds.length
        ? safeProds
            .map(
              (item) => `
                <option value="${escapeHTML(item.id)}">
                  ${escapeHTML(item.name)}
                </option>
              `
            )
            .join("")
        : '<option value="">No hay productos cargados</option>';

    refreshPromoTargetOptions();

    if (
      selectedBusiness.promo_target_id
    ) {
      promoTargetId.value =
        String(
          selectedBusiness.promo_target_id
        );
    }

    if (
      selectedBusiness.promo_reward_product_id
    ) {
      promoRewardProductId.value =
        String(
          selectedBusiness.promo_reward_product_id
        );
    }

    if (
      !safeCats.length &&
      !safeProds.length
    ) {
      dailyPromoMessage.textContent =
        "No se encontraron categorías ni productos para este comercio.";
    }
  } catch (error) {
    console.error(
      "Error cargando categorías/productos para promociones:",
      error
    );

    promoTargetId.innerHTML =
      '<option value="">No se pudieron cargar las opciones</option>';

    promoRewardProductId.innerHTML =
      '<option value="">No se pudieron cargar los productos</option>';

    dailyPromoMessage.textContent =
      `No se pudieron cargar categorías y productos: ${error.message || "error desconocido"}`;
  }
}

function refreshPromoTargetOptions() {
  let items=[];
  try {
    items=JSON.parse(
      promoTargetType.value === "product"
        ? promoTargetId.dataset.products || "[]"
        : promoTargetId.dataset.categories || "[]"
    );
  } catch(e) {}

  promoTargetId.innerHTML =
    items.length
      ? items.map(x=>`<option value="${escapeHTML(x.id)}">${escapeHTML(x.name)}</option>`).join("")
      : '<option value="">Sin opciones</option>';
}

function updatePromoRuleFields() {
  const type=dailyPromoRuleType.value;
  promoAutomaticFields.hidden =
    type === "announcement";
  promoPercentFields.hidden =
    type !== "percent";
  promoGiftFields.hidden =
    type !== "gift";
}

function updateDailyPromoUI() {
  if (!dailyPromoActive) return;

  const defaults=promoDefaults();
  const active=Boolean(dailyPromoActive.checked);

  dailyPromoActiveText.textContent =
    active ? "Activada" : "Desactivada";
  dailyPromoStatusBadge.textContent =
    active ? "Promo activa" : "Promo desactivada";
  dailyPromoStatusBadge.classList.toggle("closed",!active);
  dailyPromoPreview.classList.toggle("inactive",!active);

  dailyPromoPreviewBadge.textContent =
    dailyPromoBadge.value.trim() || defaults.badge;
  dailyPromoPreviewTitle.textContent =
    dailyPromoTitle.value.trim() || defaults.title;

  let text=dailyPromoText.value.trim() || defaults.text;
  if (dailyPromoRuleType.value === "percent") {
    text += ` · ${Number(promoDiscountPercent.value||0)}% automático`;
  }
  if (dailyPromoRuleType.value === "gift") {
    const gift=promoRewardProductId.selectedOptions?.[0]?.textContent?.trim() || "regalo";
    text += ` · Cada ${Number(promoTriggerQty.value||1)} = ${Number(promoRewardQty.value||1)} ${gift} GRATIS`;
  }
  dailyPromoPreviewText.textContent=text;
  updatePromoRuleFields();
}

async function fillDailyPromoForm() {
  if (!selectedBusiness) return;

  const defaults=promoDefaults();
  dailyPromoActive.checked=selectedBusiness.promo_active === true;
  dailyPromoBadge.value=selectedBusiness.promo_badge || defaults.badge;
  dailyPromoTitle.value=selectedBusiness.promo_title || defaults.title;
  dailyPromoText.value=selectedBusiness.promo_text || defaults.text;
  dailyPromoRuleType.value=selectedBusiness.promo_rule_type || "announcement";
  promoTargetType.value=selectedBusiness.promo_target_type || "category";
  promoDiscountPercent.value=Number(selectedBusiness.promo_discount_percent || 15);
  promoTriggerQty.value=Number(selectedBusiness.promo_trigger_qty || 2);
  promoRewardQty.value=Number(selectedBusiness.promo_reward_qty || 1);
  promoRepeat.checked=selectedBusiness.promo_repeat !== false;
  dailyPromoMessage.textContent="";

  await loadPromoBuilderOptions();
  refreshPromoTargetOptions();

  if (selectedBusiness.promo_target_id) {
    promoTargetId.value=String(selectedBusiness.promo_target_id);
  }
  if (selectedBusiness.promo_reward_product_id) {
    promoRewardProductId.value=String(selectedBusiness.promo_reward_product_id);
  }

  updateDailyPromoUI();
}

async function saveDailyPromoRPC(payload) {
  const responseText=await requestText(
    `${SUPABASE_REST}/rpc/set_business_daily_promo`,
    {
      method:"POST",
      headers:supabaseHeaders({Prefer:"return=representation"}),
      body:JSON.stringify({
        p_business_id:Number(selectedBusiness.id),
        p_active:Boolean(payload.active),
        p_badge:payload.badge || null,
        p_title:payload.title || null,
        p_text:payload.text || null,
        p_rule_type:payload.ruleType,
        p_target_type:payload.targetType,
        p_target_id:payload.targetId,
        p_discount_percent:payload.discountPercent,
        p_trigger_qty:payload.triggerQty,
        p_reward_product_id:payload.rewardProductId,
        p_reward_qty:payload.rewardQty,
        p_repeat:payload.repeat
      })
    }
  );

  const data=responseText.trim()?JSON.parse(responseText):null;
  return Array.isArray(data)?data[0]||null:data;
}

async function saveDailyPromo() {
  if (!selectedBusiness) return;

  const ruleType=dailyPromoRuleType.value;
  const payload={
    active:dailyPromoActive.checked,
    badge:dailyPromoBadge.value.trim(),
    title:dailyPromoTitle.value.trim(),
    text:dailyPromoText.value.trim(),
    ruleType,
    targetType:promoTargetType.value,
    targetId:promoTargetId.value?Number(promoTargetId.value):null,
    discountPercent:ruleType==="percent"?Number(promoDiscountPercent.value):null,
    triggerQty:ruleType==="gift"?Math.max(1,Number(promoTriggerQty.value||1)):null,
    rewardProductId:ruleType==="gift"&&promoRewardProductId.value?Number(promoRewardProductId.value):null,
    rewardQty:ruleType==="gift"?Math.max(1,Number(promoRewardQty.value||1)):null,
    repeat:Boolean(promoRepeat.checked)
  };

  if (payload.active && (!payload.title || !payload.text)) {
    dailyPromoMessage.textContent="Para activar la promo, completá el título y la promoción.";
    return;
  }
  if (payload.active && ruleType!=="announcement" && !payload.targetId) {
    dailyPromoMessage.textContent="Elegí la categoría o producto que activa la promoción.";
    return;
  }
  if (payload.active && ruleType==="percent" && (payload.discountPercent<1 || payload.discountPercent>100)) {
    dailyPromoMessage.textContent="El descuento debe estar entre 1% y 100%.";
    return;
  }
  if (payload.active && ruleType==="gift" && !payload.rewardProductId) {
    dailyPromoMessage.textContent="Elegí el producto de regalo.";
    return;
  }

  saveDailyPromoButton.disabled=true;
  disableDailyPromoButton.disabled=true;
  saveDailyPromoButton.textContent="Guardando...";
  dailyPromoMessage.textContent="";

  try {
    const saved=await saveDailyPromoRPC(payload);
    if (!saved?.id) throw new Error("Supabase no devolvió la promoción guardada.");
    Object.assign(selectedBusiness,saved);
    await fillDailyPromoForm();
    dailyPromoMessage.textContent=saved.promo_active
      ? "Promoción activa y aplicada automáticamente."
      : "Promo guardada pero desactivada.";
    showToast(saved.promo_active?"Promoción activada.":"Promo guardada.","success");
  } catch(error) {
    console.error("Error guardando promo:",error);
    dailyPromoMessage.textContent=`No se pudo guardar: ${error.message||"error desconocido"}`;
    showToast("No se pudo guardar la promo.","error");
  } finally {
    saveDailyPromoButton.disabled=false;
    disableDailyPromoButton.disabled=false;
    saveDailyPromoButton.textContent="Guardar promo";
  }
}

[
  dailyPromoBadge,dailyPromoTitle,dailyPromoText,dailyPromoRuleType,
  promoDiscountPercent,promoTriggerQty,promoRewardQty,promoRewardProductId
].filter(Boolean).forEach(field=>{
  field.addEventListener("input",updateDailyPromoUI);
  field.addEventListener("change",updateDailyPromoUI);
});

promoTargetType?.addEventListener("change",()=>{
  refreshPromoTargetOptions();
  updateDailyPromoUI();
});

dailyPromoActive?.addEventListener("change",updateDailyPromoUI);

dailyPromoForm?.addEventListener("submit",async(event)=>{
  event.preventDefault();
  await saveDailyPromo();
});

disableDailyPromoButton?.addEventListener("click",async()=>{
  dailyPromoActive.checked=false;
  updateDailyPromoUI();
  await saveDailyPromo();
});

async function uploadProductImage(blob) {
  if (!blob) {
    throw new Error(
      "Storage: no hay una imagen preparada para subir."
    );
  }

  const safeBusinessId =
    String(selectedBusiness.id);

  const fileName =
    `${Date.now()}-${Math.random().toString(36).slice(2,10)}.jpg`;

  const objectPath =
    `${safeBusinessId}/${fileName}`;

  const uploadUrl =
    `${SUPABASE_URL}/storage/v1/object/product-images/${objectPath}`;

  const response = await fetch(
    uploadUrl,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization:
          `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "image/jpeg",
        "x-upsert": "false"
      },
      body: blob
    }
  );

  const responseText =
    await response.text();

  if (!response.ok) {
    throw new Error(
      `Storage ${response.status}: ${responseText || response.statusText}`
    );
  }

  const publicUrl =
    `${SUPABASE_URL}/storage/v1/object/public/product-images/${objectPath}`;

  if (!publicUrl.startsWith("http")) {
    throw new Error(
      "Storage: no se pudo generar la URL publica."
    );
  }

  return publicUrl;
}

async function getProductById(productId) {
  const responseText =
    await requestText(
      `${SUPABASE_REST}/products?id=eq.${encodeURIComponent(productId)}&select=id,image_url,name`,
      {
        method: "GET",
        headers: supabaseHeaders()
      }
    );

  if (!responseText.trim()) {
    return null;
  }

  const rows = JSON.parse(responseText);

  return Array.isArray(rows)
    ? rows[0] || null
    : rows;
}

async function updateProductAndVerify(
  productId,
  payload
) {
  await requestText(
    `${SUPABASE_REST}/products?id=eq.${encodeURIComponent(productId)}`,
    {
      method: "PATCH",
      headers: supabaseHeaders({
        Prefer: "return=minimal"
      }),
      body: JSON.stringify(payload)
    }
  );

  const updated =
    await getProductById(productId);

  if (!updated?.id) {
    throw new Error(
      "Producto: no se pudo volver a leer el producto despues de guardarlo."
    );
  }

  const expectedImage =
    payload.image_url || null;

  const savedImage =
    updated.image_url || null;

  if (expectedImage !== savedImage) {
    throw new Error(
      "Producto: Supabase no guardo la URL de la imagen en image_url."
    );
  }

  return updated;
}

async function insertProductAndVerify(payload) {
  const responseText =
    await requestText(
      `${SUPABASE_REST}/products?select=id`,
      {
        method: "POST",
        headers: supabaseHeaders({
          Prefer: "return=representation"
        }),
        body: JSON.stringify(payload)
      }
    );

  let inserted = null;

  if (responseText.trim()) {
    const rows = JSON.parse(responseText);
    inserted =
      Array.isArray(rows)
        ? rows[0] || null
        : rows;
  }

  if (!inserted?.id) {
    throw new Error(
      "Producto: no se pudo obtener el ID del producto creado."
    );
  }

  const saved =
    await getProductById(inserted.id);

  const expectedImage =
    payload.image_url || null;

  const savedImage =
    saved?.image_url || null;

  if (expectedImage !== savedImage) {
    throw new Error(
      "Producto: Supabase no guardo la URL de la imagen en image_url."
    );
  }

  return saved;
}

async function getSelectedBusinessCategories() {
  const categories = await getTableData(
    "categories",
    "id,name,business_id,active"
  );

  return categories.filter(
    (category) =>
      String(category.business_id) ===
      String(selectedBusiness.id) &&
      category.active !== false
  );
}

async function openProductModal(product = null) {
  if (!selectedBusiness) {
    showToast(
      "Primero seleccion\u00e1 un comercio.",
      "error"
    );
    return;
  }

  editingProductId =
    product?.id ?? null;

  existingProductImageUrl =
    product?.image_url || "";

  removeExistingProductImage = false;

  productForm.reset();
  productFormMessage.textContent = "";
  croppedProductImageBlob = null;

  if (croppedProductImageUrl) {
    URL.revokeObjectURL(croppedProductImageUrl);
  }

  croppedProductImageUrl = "";

  productModalTitle.textContent =
    editingProductId
      ? "Editar producto"
      : "Crear producto";

  saveProductButton.textContent =
    editingProductId
      ? "Guardar cambios"
      : "Guardar producto";

  selectProductImageButton.textContent =
    existingProductImageUrl
      ? "Cambiar imagen"
      : "Seleccionar imagen";

  removeProductImageButton.hidden =
    !existingProductImageUrl;

  if (existingProductImageUrl) {
    productImagePreview.innerHTML = `
      <img
        src="${escapeHTML(existingProductImageUrl)}"
        alt="Imagen actual del producto"
      >
    `;
  } else {
    productImagePreview.innerHTML =
      "<span>Sin imagen</span>";
  }

  try {
    const categories =
      await getSelectedBusinessCategories();

    if (!categories.length) {
      showToast(
        "Primero cre\u00e1 una categor\u00eda para este comercio.",
        "error"
      );
      return;
    }

    productCategory.innerHTML = categories
      .map(
        (category) => `
          <option value="${escapeHTML(category.id)}">
            ${escapeHTML(category.name)}
          </option>
        `
      )
      .join("");

    if (product) {
      productName.value =
        product.name || "";

      productCategory.value =
        String(product.category_id || "");

      productPrice.value =
        Number(product.price || 0);

      productOldPrice.value =
        product.old_price ?? "";

      productSortOrder.value =
        Number(product.sort_order || 0);

      productFeatured.checked =
        product.featured === true;

      productDescription.value =
        product.description || "";

      productActive.checked =
        product.active !== false;
    } else {
      productSortOrder.value = "0";
      productActive.checked = true;
      productFeatured.checked = false;
    }

    productModal.classList.add("open");
    productModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    setTimeout(() => productName.focus(), 50);
  } catch (error) {
    console.error(
      "Error cargando categorias para producto:",
      error
    );

    showToast(
      "No se pudieron cargar las categor\u00edas.",
      "error"
    );
  }
}

function closeProductModal() {
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  editingProductId = null;
  existingProductImageUrl = "";
  removeExistingProductImage = false;
  croppedProductImageBlob = null;

  if (croppedProductImageUrl) {
    URL.revokeObjectURL(croppedProductImageUrl);
  }

  croppedProductImageUrl = "";
}

function renderCropCanvas() {
  if (!cropImage) {
    return;
  }

  const canvasSize = imageCropCanvas.width;
  const scale = cropBaseScale * cropZoom;
  const drawWidth = cropImage.naturalWidth * scale;
  const drawHeight = cropImage.naturalHeight * scale;

  const minX = canvasSize - drawWidth;
  const minY = canvasSize - drawHeight;

  cropOffsetX = Math.min(0, Math.max(minX, cropOffsetX));
  cropOffsetY = Math.min(0, Math.max(minY, cropOffsetY));

  imageCropContext.clearRect(
    0,
    0,
    canvasSize,
    canvasSize
  );

  imageCropContext.drawImage(
    cropImage,
    cropOffsetX,
    cropOffsetY,
    drawWidth,
    drawHeight
  );
}

function openImageCropEditor(file) {
  const image = new Image();
  const objectUrl = URL.createObjectURL(file);

  image.onload = () => {
    URL.revokeObjectURL(objectUrl);

    cropImage = image;
    cropZoom = 1;
    imageZoomRange.value = "1";

    const canvasSize = imageCropCanvas.width;
    cropBaseScale = Math.max(
      canvasSize / image.naturalWidth,
      canvasSize / image.naturalHeight
    );

    const drawWidth =
      image.naturalWidth * cropBaseScale;
    const drawHeight =
      image.naturalHeight * cropBaseScale;

    cropOffsetX =
      (canvasSize - drawWidth) / 2;
    cropOffsetY =
      (canvasSize - drawHeight) / 2;

    renderCropCanvas();

    imageCropModal.classList.add("open");
    imageCropModal.setAttribute(
      "aria-hidden",
      "false"
    );
    document.body.classList.add("modal-open");
  };

  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);

    showToast(
      "No se pudo abrir esa imagen.",
      "error"
    );
  };

  image.src = objectUrl;
}

function closeImageCropEditor() {
  imageCropModal.classList.remove("open");
  imageCropModal.setAttribute(
    "aria-hidden",
    "true"
  );
  document.body.classList.remove("modal-open");
  cropDragging = false;
  imageCropCanvas.classList.remove("dragging");
}

function canvasPointFromEvent(event) {
  const rect =
    imageCropCanvas.getBoundingClientRect();

  return {
    x:
      (event.clientX - rect.left) *
      (imageCropCanvas.width / rect.width),
    y:
      (event.clientY - rect.top) *
      (imageCropCanvas.height / rect.height)
  };
}

function openBusinessModal(business = null) {
  businessForm.reset();
  editingBusinessId = business?.id ?? null;

  businessModalTitle.textContent = business
    ? "Editar comercio"
    : "Crear comercio";

  saveBusinessButton.textContent = business
    ? "Guardar cambios"
    : "Guardar comercio";

  businessName.value = business?.name || "";
  businessSlug.value = business?.slug || "";
  businessPhone.value = business?.phone || "";
  businessAddress.value = business?.address || "";
  businessLogoUrl.value = business?.logo_url || "";
  businessPrimaryColor.value =
    business?.primary_color || "#6d28d9";
  businessSecondaryColor.value =
    business?.secondary_color || "#f5c518";
  businessActive.checked =
    business ? Boolean(business.active) : true;

  businessSlug.dataset.manual =
    business?.slug ? "true" : "";

  businessFormMessage.textContent = "";
  businessFormMessage.classList.remove("success");

  businessModal.classList.add("open");
  businessModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  setTimeout(() => businessName.focus(), 50);
}

function closeBusinessModal() {
  businessModal.classList.remove("open");
  businessModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  editingBusinessId = null;
}

newBusinessButton.addEventListener("click", () => {
  openBusinessModal();
});

closeBusinessModalButton.addEventListener(
  "click",
  closeBusinessModal
);

cancelBusinessButton.addEventListener(
  "click",
  closeBusinessModal
);

document
  .querySelector("[data-close-business-modal]")
  ?.addEventListener("click", closeBusinessModal);

businessName.addEventListener("input", () => {
  if (!businessSlug.dataset.manual) {
    businessSlug.value = normalizeSlug(
      businessName.value
    );
  }
});

businessSlug.addEventListener("input", () => {
  businessSlug.dataset.manual =
    businessSlug.value.trim() ? "true" : "";

  businessSlug.value = normalizeSlug(
    businessSlug.value
  );
});

function openBusinessDetailModal(business) {
  selectedBusiness = business;

  businessDetailTitle.textContent =
    business.name || "Comercio";

  businessDetailContent.innerHTML = `
    <div class="detail-item">
      <strong>Enlace</strong>
      <span>${escapeHTML(business.slug || "-")}</span>
    </div>

    <div class="detail-item">
      <strong>WhatsApp</strong>
      <span>${escapeHTML(business.phone || "-")}</span>
    </div>

    <div class="detail-item">
      <strong>Direcci\u00f3n</strong>
      <span>${escapeHTML(business.address || "-")}</span>
    </div>

    <div class="detail-item">
      <strong>Estado</strong>
      <span>${business.active ? "Activo" : "Inactivo"}</span>
    </div>
  `;

  businessDetailModal.classList.add("open");
  businessDetailModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeBusinessDetailModal() {
  businessDetailModal.classList.remove("open");
  businessDetailModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

closeBusinessDetailButton.addEventListener(
  "click",
  closeBusinessDetailModal
);

document
  .querySelector("[data-close-business-detail]")
  ?.addEventListener("click", closeBusinessDetailModal);

businessCategoriesButton.addEventListener(
  "click",
  async () => {
    if (!selectedBusiness) {
      showToast(
        "Primero seleccion\u00e1 un comercio.",
        "error"
      );
      return;
    }

    closeBusinessDetailModal();
    openSection("categories");
    await loadCategories();
  }
);

businessProductsButton.addEventListener(
  "click",
  async () => {
    if (!selectedBusiness) {
      showToast(
        "Primero seleccion\u00e1 un comercio.",
        "error"
      );
      return;
    }

    closeBusinessDetailModal();
    openSection("products");
    await loadProducts();
  }
);

editBusinessButton.addEventListener(
  "click",
  () => {
    const business = selectedBusiness;

    closeBusinessDetailModal();

    if (business) {
      openBusinessModal(business);
    }
  }
);

businessStoreButton.addEventListener(
  "click",
  () => {
    if (!selectedBusiness) {
      return;
    }

    const url =
      `index.html?business=${encodeURIComponent(
        selectedBusiness.slug || ""
      )}`;

    window.open(url, "_blank");
  }
);

function openCategoryModal() {
  if (!selectedBusiness) {
    showToast(
      "Primero seleccion\u00e1 un comercio.",
      "error"
    );
    return;
  }

  categoryForm.reset();
  categoryActive.checked = true;
  categoryFormMessage.textContent = "";

  categoryModal.classList.add("open");
  categoryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  setTimeout(() => categoryName.focus(), 50);
}

function closeCategoryModal() {
  categoryModal.classList.remove("open");
  categoryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

closeCategoryModalButton.addEventListener(
  "click",
  closeCategoryModal
);

cancelCategoryButton.addEventListener(
  "click",
  closeCategoryModal
);

document
  .querySelector("[data-close-category-modal]")
  ?.addEventListener("click", closeCategoryModal);


selectProductImageButton.addEventListener(
  "click",
  () => {
    productImageInput.click();
  }
);

removeProductImageButton.addEventListener(
  "click",
  () => {
    croppedProductImageBlob = null;

    if (croppedProductImageUrl) {
      URL.revokeObjectURL(
        croppedProductImageUrl
      );
    }

    croppedProductImageUrl = "";
    existingProductImageUrl = "";
    removeExistingProductImage = true;

    productImagePreview.innerHTML =
      "<span>Sin imagen</span>";

    selectProductImageButton.textContent =
      "Seleccionar imagen";

    removeProductImageButton.hidden = true;
  }
);

productImageInput.addEventListener(
  "change",
  () => {
    const file =
      productImageInput.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      showToast(
        "Seleccion\u00e1 un archivo de imagen.",
        "error"
      );
      return;
    }

    openImageCropEditor(file);
    productImageInput.value = "";
  }
);

imageZoomRange.addEventListener(
  "input",
  () => {
    if (!cropImage) {
      return;
    }

    const oldScale =
      cropBaseScale * cropZoom;
    const centerX =
      imageCropCanvas.width / 2;
    const centerY =
      imageCropCanvas.height / 2;

    const imagePointX =
      (centerX - cropOffsetX) / oldScale;
    const imagePointY =
      (centerY - cropOffsetY) / oldScale;

    cropZoom =
      Number(imageZoomRange.value);

    const newScale =
      cropBaseScale * cropZoom;

    cropOffsetX =
      centerX - imagePointX * newScale;
    cropOffsetY =
      centerY - imagePointY * newScale;

    renderCropCanvas();
  }
);

imageCropCanvas.addEventListener(
  "pointerdown",
  (event) => {
    if (!cropImage) {
      return;
    }

    const point =
      canvasPointFromEvent(event);

    cropDragging = true;
    cropPointerX = point.x;
    cropPointerY = point.y;

    imageCropCanvas.setPointerCapture(
      event.pointerId
    );
    imageCropCanvas.classList.add(
      "dragging"
    );
  }
);

imageCropCanvas.addEventListener(
  "pointermove",
  (event) => {
    if (!cropDragging) {
      return;
    }

    const point =
      canvasPointFromEvent(event);

    cropOffsetX +=
      point.x - cropPointerX;
    cropOffsetY +=
      point.y - cropPointerY;

    cropPointerX = point.x;
    cropPointerY = point.y;

    renderCropCanvas();
  }
);

function stopCropDragging(event) {
  cropDragging = false;
  imageCropCanvas.classList.remove(
    "dragging"
  );

  if (
    event?.pointerId !== undefined &&
    imageCropCanvas.hasPointerCapture(
      event.pointerId
    )
  ) {
    imageCropCanvas.releasePointerCapture(
      event.pointerId
    );
  }
}

imageCropCanvas.addEventListener(
  "pointerup",
  stopCropDragging
);

imageCropCanvas.addEventListener(
  "pointercancel",
  stopCropDragging
);

cancelImageCropButton.addEventListener(
  "click",
  closeImageCropEditor
);

confirmImageCropButton.addEventListener(
  "click",
  () => {
    imageCropCanvas.toBlob(
      (blob) => {
        if (!blob) {
          showToast(
            "No se pudo preparar la imagen.",
            "error"
          );
          return;
        }

        croppedProductImageBlob = blob;

        if (croppedProductImageUrl) {
          URL.revokeObjectURL(
            croppedProductImageUrl
          );
        }

        croppedProductImageUrl =
          URL.createObjectURL(blob);

        productImagePreview.innerHTML = `
          <img
            src="${croppedProductImageUrl}"
            alt="Vista previa del producto"
          >
        `;

        removeExistingProductImage = false;
        removeProductImageButton.hidden = false;
        selectProductImageButton.textContent =
          "Cambiar imagen";

        closeImageCropEditor();
      },
      "image/jpeg",
      0.88
    );
  }
);

closeProductModalButton.addEventListener(
  "click",
  closeProductModal
);

cancelProductButton.addEventListener(
  "click",
  closeProductModal
);

document
  .querySelector("[data-close-product-modal]")
  ?.addEventListener(
    "click",
    closeProductModal
  );


function closeModifiersModal() {
  modifiersModal.classList.remove("open");
  modifiersModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  selectedProduct = null;
}

async function openModifiersModal(product) {
  selectedProduct = product;
  modifiersModalTitle.textContent =
    product.name || "Producto";
  modifiersModalSubtitle.textContent =
    "Configur\u00e1 sabores, tama\u00f1os, extras y otras opciones.";

  modifiersModal.classList.add("open");
  modifiersModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  await loadModifierGroups();
}

function closeModifierGroupModal() {
  modifierGroupModal.classList.remove("open");
  modifierGroupModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  editingModifierGroupId = null;
}

function openModifierGroupModal(group = null) {
  modifierGroupForm.reset();
  editingModifierGroupId = group?.id ?? null;

  modifierGroupModalTitle.textContent =
    group ? "Editar grupo" : "Crear grupo";

  saveModifierGroupButton.textContent =
    group ? "Guardar cambios" : "Guardar grupo";

  modifierGroupName.value = group?.name || "";
  modifierGroupType.value =
    group?.selection_type || "multiple";
  modifierGroupMax.value =
    group?.max_select ?? "";
  modifierGroupSortOrder.value =
    group?.sort_order ?? 0;
  modifierGroupRequired.checked =
    Boolean(group?.required);
  modifierGroupActive.checked =
    group ? Boolean(group.active) : true;
  modifierGroupFormMessage.textContent = "";

  modifierGroupModal.classList.add("open");
  modifierGroupModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  setTimeout(() => modifierGroupName.focus(), 50);
}

function closeModifierOptionModal() {
  modifierOptionModal.classList.remove("open");
  modifierOptionModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  editingModifierOptionId = null;
}


function isSizeModifierGroup(group) {
  const name =
    String(group?.name || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();

  return (
    name.includes("tamano") ||
    name.includes("tamanos") ||
    name.includes("size")
  );
}

async function openModifierOptionModal(group, option = null) {
  selectedModifierGroup = group;
  modifierOptionForm.reset();
  editingModifierOptionId = option?.id ?? null;

  modifierOptionModalTitle.textContent =
    option ? "Editar opci\u00f3n" : "Crear opci\u00f3n";

  modifierOptionGroupName.textContent =
    group.name || "";

  const sizeGroup =
    isSizeModifierGroup(group);

  if (modifierOptionPriceLabel) {
    modifierOptionPriceLabel.textContent =
      sizeGroup
        ? "Precio final del tama\u00f1o"
        : "Precio adicional";
  }

  if (modifierOptionPrice) {
    modifierOptionPrice.min =
      sizeGroup
        ? String(Number(selectedProduct?.price || 0))
        : "0";
  }

  saveModifierOptionButton.textContent =
    option ? "Guardar cambios" : "Guardar opci\u00f3n";

  modifierOptionName.value = option?.name || "";
  modifierOptionPrice.value =
    option?.price_delta ?? (
      sizeGroup
        ? Number(selectedProduct?.price || 0)
        : 0
    );
  modifierOptionSortOrder.value =
    option?.sort_order ?? 0;

  const possibleParents = currentModifierOptions.filter(
    (item) =>
      String(item.group_id) !== String(group.id) &&
      String(item.id) !== String(option?.id ?? "")
  );

  modifierOptionParent.innerHTML =
    '<option value="">Siempre visible</option>' +
    possibleParents.map((item) => {
      const parentGroup = currentModifierGroups.find(
        (groupItem) =>
          String(groupItem.id) === String(item.group_id)
      );

      const label =
        `${parentGroup?.name || "Grupo"}: ${item.name}`;

      return `
        <option value="${escapeHTML(item.id)}">
          ${escapeHTML(label)}
        </option>
      `;
    }).join("");

  modifierOptionParent.value =
    option?.depends_on_option_id
      ? String(option.depends_on_option_id)
      : "";
  modifierOptionActive.checked =
    option ? Boolean(option.active) : true;
  modifierOptionFormMessage.textContent = "";

  modifierOptionModal.classList.add("open");
  modifierOptionModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  setTimeout(() => modifierOptionName.focus(), 50);
}

async function loadModifierGroups() {
  if (!selectedProduct) {
    return;
  }

  modifierGroupsList.innerHTML =
    '<div class="loading">Cargando opciones...</div>';

  try {
    const [groups, options] = await Promise.all([
      getTableData(
        "product_option_groups",
        "id,product_id,name,selection_type,required,max_select,sort_order,active"
      ),
      getTableData(
        "product_options",
        "id,group_id,name,price_delta,sort_order,active,depends_on_option_id"
      )
    ]);

    currentModifierGroups = groups.filter(
      (group) =>
        String(group.product_id) ===
        String(selectedProduct.id)
    );

    const currentGroupIds = new Set(
      currentModifierGroups.map((group) => String(group.id))
    );

    currentModifierOptions = options.filter(
      (option) =>
        currentGroupIds.has(String(option.group_id))
    );

    const productGroups = currentModifierGroups
      .sort(
        (a, b) =>
          Number(a.sort_order || 0) -
          Number(b.sort_order || 0)
      );

    if (!productGroups.length) {
      modifierGroupsList.innerHTML = `
        <div class="modifier-empty">
          Este producto todav\u00eda no tiene grupos de opciones.
        </div>
      `;
      return;
    }

    modifierGroupsList.innerHTML =
      productGroups.map((group) => {
        const groupOptions = options
          .filter(
            (option) =>
              String(option.group_id) ===
              String(group.id)
          )
          .sort(
            (a, b) =>
              Number(a.sort_order || 0) -
              Number(b.sort_order || 0)
          );

        const typeText =
          group.selection_type === "single"
            ? "Una sola opci\u00f3n"
            : "Varias opciones";

        const maxText =
          group.max_select
            ? ` \u00b7 M\u00e1ximo ${group.max_select}`
            : "";

        return `
          <article
            class="modifier-group-card"
            data-group-id="${escapeHTML(group.id)}"
          >
            <div class="modifier-group-header">

              <div>
                <h3>${escapeHTML(group.name)}</h3>

                <div class="modifier-group-meta">
                  ${typeText}
                  ${group.required ? " \u00b7 Obligatorio" : ""}
                  ${maxText}
                  ${group.active ? "" : " \u00b7 Inactivo"}
                </div>
              </div>

              <div class="modifier-actions">
                <button
                  type="button"
                  class="secondary-button compact-button add-option-button"
                  data-group-id="${escapeHTML(group.id)}"
                >
                  + Agregar opci\u00f3n
                </button>

                <button
                  type="button"
                  class="secondary-button compact-button edit-group-button"
                  data-group-id="${escapeHTML(group.id)}"
                >
                  Editar
                </button>

                <button
                  type="button"
                  class="secondary-button compact-button danger-button delete-group-button"
                  data-group-id="${escapeHTML(group.id)}"
                >
                  Eliminar
                </button>
              </div>

            </div>

            <div class="modifier-options-list">
              ${
                groupOptions.length
                  ? groupOptions.map((option) => `
                      <div class="modifier-option-row">

                        <div class="modifier-option-info">
                          <strong>${escapeHTML(option.name)}</strong>
                          <small>
                            +$${Number(option.price_delta || 0)}
                            ${option.active ? "" : " \u00b7 Inactiva"}
                          </small>

                          ${
                            option.depends_on_option_id
                              ? `
                                <span class="dependency-label">
                                  Visible seg\u00fan otra opci\u00f3n
                                </span>
                              `
                              : ""
                          }
                        </div>

                        <div class="modifier-actions">
                          <button
                            type="button"
                            class="secondary-button compact-button edit-option-button"
                            data-group-id="${escapeHTML(group.id)}"
                            data-option-id="${escapeHTML(option.id)}"
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            class="secondary-button compact-button danger-button delete-option-button"
                            data-option-id="${escapeHTML(option.id)}"
                          >
                            Eliminar
                          </button>
                        </div>

                      </div>
                    `).join("")
                  : `
                    <div class="modifier-empty">
                      No hay opciones en este grupo.
                    </div>
                  `
              }
            </div>
          </article>
        `;
      }).join("");

    modifierGroupsList
      .querySelectorAll(".add-option-button")
      .forEach((button) => {
        button.addEventListener("click", async () => {
          const group = productGroups.find(
            (item) =>
              String(item.id) ===
              String(button.dataset.groupId)
          );

          if (group) {
            await openModifierOptionModal(group);
          }
        });
      });

    modifierGroupsList
      .querySelectorAll(".edit-group-button")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const group = productGroups.find(
            (item) =>
              String(item.id) ===
              String(button.dataset.groupId)
          );

          if (group) {
            openModifierGroupModal(group);
          }
        });
      });

    modifierGroupsList
      .querySelectorAll(".edit-option-button")
      .forEach((button) => {
        button.addEventListener("click", async () => {
          const group = productGroups.find(
            (item) =>
              String(item.id) ===
              String(button.dataset.groupId)
          );

          const option = options.find(
            (item) =>
              String(item.id) ===
              String(button.dataset.optionId)
          );

          if (group && option) {
            await openModifierOptionModal(group, option);
          }
        });
      });

    modifierGroupsList
      .querySelectorAll(".delete-group-button")
      .forEach((button) => {
        button.addEventListener("click", async () => {
          const confirmed = window.confirm(
            "Se eliminar\u00e1 el grupo y todas sus opciones. \u00bfContinuar?"
          );

          if (!confirmed) {
            return;
          }

          try {
            await deleteTableRow(
              "product_option_groups",
              button.dataset.groupId
            );

            showToast(
              "Grupo eliminado correctamente.",
              "success"
            );

            await loadModifierGroups();
          } catch (error) {
            console.error("Error eliminando grupo:", error);
            showToast(
              "No se pudo eliminar el grupo.",
              "error"
            );
          }
        });
      });

    modifierGroupsList
      .querySelectorAll(".delete-option-button")
      .forEach((button) => {
        button.addEventListener("click", async () => {
          const confirmed = window.confirm(
            "\u00bfEliminar esta opci\u00f3n?"
          );

          if (!confirmed) {
            return;
          }

          try {
            await deleteTableRow(
              "product_options",
              button.dataset.optionId
            );

            showToast(
              "Opci\u00f3n eliminada correctamente.",
              "success"
            );

            await loadModifierGroups();
          } catch (error) {
            console.error("Error eliminando opcion:", error);
            showToast(
              "No se pudo eliminar la opci\u00f3n.",
              "error"
            );
          }
        });
      });

  } catch (error) {
    console.error("Error cargando modificadores:", error);

    modifierGroupsList.innerHTML = `
      <div class="error">
        No se pudieron cargar las opciones y extras.
        Verific\u00e1 que las tablas del archivo SQL est\u00e9n creadas.
      </div>
    `;
  }
}

closeModifiersModalButton.addEventListener(
  "click",
  closeModifiersModal
);

document
  .querySelector("[data-close-modifiers-modal]")
  ?.addEventListener("click", closeModifiersModal);

newModifierGroupButton.addEventListener(
  "click",
  () => openModifierGroupModal()
);

closeModifierGroupModalButton.addEventListener(
  "click",
  closeModifierGroupModal
);

cancelModifierGroupButton.addEventListener(
  "click",
  closeModifierGroupModal
);

document
  .querySelector("[data-close-modifier-group-modal]")
  ?.addEventListener("click", closeModifierGroupModal);

closeModifierOptionModalButton.addEventListener(
  "click",
  closeModifierOptionModal
);

cancelModifierOptionButton.addEventListener(
  "click",
  closeModifierOptionModal
);

document
  .querySelector("[data-close-modifier-option-modal]")
  ?.addEventListener("click", closeModifierOptionModal);

modifierGroupForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const name = modifierGroupName.value.trim();

    if (!name) {
      modifierGroupFormMessage.textContent =
        "Escrib\u00ed el nombre del grupo.";
      return;
    }

    const maxValue =
      modifierGroupMax.value
        ? Number(modifierGroupMax.value)
        : null;

    const payload = {
      product_id: selectedProduct.id,
      name,
      selection_type: modifierGroupType.value,
      required: modifierGroupRequired.checked,
      max_select: maxValue,
      sort_order:
        Number(modifierGroupSortOrder.value || 0),
      active: modifierGroupActive.checked
    };

    saveModifierGroupButton.disabled = true;
    saveModifierGroupButton.textContent = "Guardando...";
    modifierGroupFormMessage.textContent = "";

    try {
      if (editingModifierGroupId) {
        await updateTableRow(
          "product_option_groups",
          editingModifierGroupId,
          payload
        );
      } else {
        await insertTableRow(
          "product_option_groups",
          payload
        );
      }

      showToast(
        editingModifierGroupId
          ? "Grupo actualizado correctamente."
          : "Grupo creado correctamente.",
        "success"
      );

      closeModifierGroupModal();
      await loadModifierGroups();
    } catch (error) {
      console.error("Error guardando grupo:", error);
      modifierGroupFormMessage.textContent =
        "No se pudo guardar el grupo.";
    } finally {
      saveModifierGroupButton.disabled = false;
      saveModifierGroupButton.textContent =
        editingModifierGroupId
          ? "Guardar cambios"
          : "Guardar grupo";
    }
  }
);

modifierOptionForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const name = modifierOptionName.value.trim();
    const price = Number(modifierOptionPrice.value || 0);

    if (!name) {
      modifierOptionFormMessage.textContent =
        "Escrib\u00ed el nombre de la opci\u00f3n.";
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      modifierOptionFormMessage.textContent =
        "Escrib\u00ed un precio v\u00e1lido.";
      return;
    }

    const sizeGroup =
      isSizeModifierGroup(
        selectedModifierGroup
      );

    const basePrice =
      Number(selectedProduct?.price || 0);

    if (
      sizeGroup &&
      price < basePrice
    ) {
      modifierOptionFormMessage.textContent =
        `El precio final del tama\u00f1o no puede ser menor al precio base (${basePrice}).`;
      return;
    }

    const payload = {
      group_id: selectedModifierGroup.id,
      name,
      price_delta: price,
      depends_on_option_id:
        modifierOptionParent.value
          ? Number(modifierOptionParent.value)
          : null,
      sort_order:
        Number(modifierOptionSortOrder.value || 0),
      active: modifierOptionActive.checked
    };

    saveModifierOptionButton.disabled = true;
    saveModifierOptionButton.textContent = "Guardando...";
    modifierOptionFormMessage.textContent = "";

    try {
      if (editingModifierOptionId) {
        await updateTableRow(
          "product_options",
          editingModifierOptionId,
          payload
        );
      } else {
        await insertTableRow(
          "product_options",
          payload
        );
      }

      showToast(
        editingModifierOptionId
          ? "Opci\u00f3n actualizada correctamente."
          : "Opci\u00f3n creada correctamente.",
        "success"
      );

      closeModifierOptionModal();
      await loadModifierGroups();
    } catch (error) {
      console.error("Error guardando opcion:", error);
      modifierOptionFormMessage.textContent =
        "No se pudo guardar la opci\u00f3n.";
    } finally {
      saveModifierOptionButton.disabled = false;
      saveModifierOptionButton.textContent =
        editingModifierOptionId
          ? "Guardar cambios"
          : "Guardar opci\u00f3n";
    }
  }
);



function currentMerchantBusinessId() {
  return (
    selectedBusiness?.id ??
    MERCHANT_BUSINESS_ID
  );
}

function orderMoney(value) {
  return `$${Number(value || 0).toLocaleString("es-UY")}`;
}

function orderStatusLabel(status) {
  const labels = {
    received: "NUEVO",
    approved: "ACEPTADO",
    preparing: "EN PREPARACION",
    ready: "LISTO",
    on_the_way: "EN CAMINO",
    delivered: "ENTREGADO",
    cancelled: "CANCELADO"
  };
  return labels[status] || String(status || "").toUpperCase();
}

function orderDeliveryLabel(type) {
  return type === "pickup"
    ? "RETIRO EN EL LOCAL"
    : "DELIVERY";
}

function formatOrderDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(
    "es-UY",
    { day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit" }
  ).format(date);
}

function isToday(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function getBusinessNameById(id) {
  return (
    businessesCache.find(
      (business) =>
        String(business.id) === String(id)
    )?.name ||
    `Comercio #${id}`
  );
}

function getOrderItems(orderId) {
  return orderItemsCache.filter(
    (item) =>
      String(item.order_id) === String(orderId)
  );
}

function getOrderItemOptions(itemId) {
  return orderItemOptionsCache.filter(
    (option) =>
      String(option.order_item_id) === String(itemId)
  );
}

function customerNoticeEnabledFor(order, nextStatus) {
  if (!selectedBusiness) {
    return false;
  }

  if (nextStatus === "approved") {
    return selectedBusiness.notice_approved_enabled !== false;
  }

  if (
    nextStatus === "ready" &&
    order.delivery_type === "pickup"
  ) {
    return selectedBusiness.notice_ready_enabled !== false;
  }

  if (
    nextStatus === "on_the_way" &&
    order.delivery_type !== "pickup"
  ) {
    return selectedBusiness.notice_delivery_enabled !== false;
  }

  return false;
}

function compactActionLabel(order, status, label) {
  if (status === "approved") {
    return "Aceptar";
  }

  if (status === "preparing") {
    return "Preparar";
  }

  if (status === "ready") {
    return "Listo";
  }

  if (status === "on_the_way") {
    return "En camino";
  }

  if (status === "delivered") {
    return "Entregado";
  }

  return label;
}

function noticeStatusAvailableForOrder(order) {
  if (!order || !selectedBusiness) {
    return "";
  }

  if (
    order.status === "approved" &&
    selectedBusiness.notice_approved_enabled !== false
  ) {
    return "approved";
  }

  if (
    order.status === "ready" &&
    order.delivery_type === "pickup" &&
    selectedBusiness.notice_ready_enabled !== false
  ) {
    return "ready";
  }

  if (
    order.status === "on_the_way" &&
    order.delivery_type !== "pickup" &&
    selectedBusiness.notice_delivery_enabled !== false
  ) {
    return "on_the_way";
  }

  return "";
}

function noticeButtonLabel(order) {
  const status =
    noticeStatusAvailableForOrder(order);

  if (status === "approved") {
    return "Avisar: aceptado";
  }

  if (status === "ready") {
    return "Avisar: listo";
  }

  if (status === "on_the_way") {
    return "Avisar: en camino";
  }

  return "";
}

function orderNextActions(order) {
  if (order.status === "received") {
    return [
      ["approved", "Aceptar", "primary"],
      ["cancelled", "Cancelar", "danger"]
    ];
  }

  if (order.status === "approved") {
    return [
      ["preparing", "Preparar", "primary"]
    ];
  }

  if (order.status === "preparing") {
    return [
      ["ready", "Listo", "primary"]
    ];
  }

  if (order.status === "ready") {
    return [
      [
        order.delivery_type === "pickup"
          ? "delivered"
          : "on_the_way",
        order.delivery_type === "pickup"
          ? "Entregado"
          : "En camino",
        "primary"
      ]
    ];
  }

  if (order.status === "on_the_way") {
    return [
      ["delivered", "Entregado", "primary"]
    ];
  }

  return [];
}

function renderOrderItems(order) {
  const items = getOrderItems(order.id);

  if (!items.length) {
    return '<div class="order-empty-items">Sin detalle de productos.</div>';
  }

  return items.map((item) => {
    const options = getOrderItemOptions(item.id);

    return `
      <div class="order-product-line">
        <div class="order-product-title">
          <strong>
            ${escapeHTML(item.quantity || 1)} x
            ${escapeHTML(item.product_name || "Producto")}
          </strong>
          <span>${orderMoney(item.total)}</span>
        </div>

        ${
          options.length
            ? `
              <div class="order-options-list">
                ${options.map((option) => `
                  <span>
                    ${escapeHTML(option.group_name || "Opcion")}:
                    <strong>${escapeHTML(option.option_name || "")}</strong>
                    ${
                      Number(option.price_delta || 0) > 0
                        ? ` (+${orderMoney(option.price_delta)})`
                        : ""
                    }
                  </span>
                `).join("")}
              </div>
            `
            : ""
        }
      </div>
    `;
  }).join("");
}

function renderOrderCard(order) {
  const actions = orderNextActions(order);

  const deliveryBlock =
    order.delivery_type === "pickup"
      ? `
        <span class="order-delivery-mode pickup">
          RETIRO EN EL LOCAL
        </span>
      `
      : `
        <span class="order-delivery-mode delivery">
          DELIVERY
        </span>
        <span>
          <strong>Direccion:</strong>
          ${escapeHTML(order.delivery_address || "Sin direccion")}
        </span>
        ${
          order.delivery_reference
            ? `
              <span>
                <strong>Referencia:</strong>
                ${escapeHTML(order.delivery_reference)}
              </span>
            `
            : ""
        }
      `;

  const paymentBlock =
    order.delivery_type === "pickup"
      ? ""
      : `
        <div class="order-payment">
          <strong>Pago:</strong>
          <span>
            ${
              order.payment_method === "cash"
                ? "Efectivo"
                : order.payment_method === "transfer"
                  ? "Transferencia"
                  : "Sin especificar"
            }
          </span>
          ${
            order.payment_method === "cash" && order.cash_amount
              ? `<span>Paga con ${orderMoney(order.cash_amount)}</span>`
              : ""
          }
        </div>
      `;

  return `
    <article class="order-card status-${escapeHTML(order.status || "received")}">
      <div class="order-card-top">
        <div>
          <div class="order-number-line">
            <strong>Pedido #${escapeHTML(order.id)}</strong>
            <span>${escapeHTML(formatOrderDate(order.created_at))}</span>
          </div>
          <div class="order-business-name">
            ${escapeHTML(getBusinessNameById(order.business_id))}
          </div>
        </div>

        <span class="order-status-badge status-${escapeHTML(order.status || "received")}">
          ${escapeHTML(orderStatusLabel(order.status))}
        </span>
      </div>

      <div class="order-customer-grid">
        <div>
          <small>CLIENTE</small>
          <strong>${escapeHTML(order.customer_name || "Sin nombre")}</strong>
          <span>${escapeHTML(order.customer_phone || "")}</span>
        </div>

        <div class="order-delivery-box">
          ${deliveryBlock}
        </div>
      </div>

      <div class="order-products-box">
        <div class="order-section-label">PEDIDO</div>
        ${renderOrderItems(order)}
      </div>

      ${
        order.notes
          ? `
            <div class="order-notes-box">
              <strong>OBSERVACIONES</strong>
              <span>${escapeHTML(order.notes)}</span>
            </div>
          `
          : ""
      }

      <div class="order-total-row">
        <span>TOTAL</span>
        <strong>${orderMoney(order.total)}</strong>
      </div>

      ${paymentBlock}

      <div class="order-actions">
        ${actions.map(([status, label, kind]) => `
          <button
            type="button"
            class="order-action-button ${kind}"
            data-order-action
            data-order-id="${escapeHTML(order.id)}"
            data-next-status="${escapeHTML(status)}"
          >
            ${escapeHTML(compactActionLabel(order,status,label))}
          </button>
        `).join("")}

        ${
          noticeStatusAvailableForOrder(order)
            ? `
              <button
                type="button"
                class="order-action-button secondary"
                data-send-customer-notice
                data-order-id="${escapeHTML(order.id)}"
              >
                ${escapeHTML(noticeButtonLabel(order))}
              </button>
            `
            : ""
        }

        <button
          type="button"
          class="order-action-button remove"
          data-remove-order
          data-order-id="${escapeHTML(order.id)}"
        >
          Quitar pedido
        </button>
      </div>
    </article>
  `;
}

function updateOrdersCounters() {
  const merchantBusinessId =
    currentMerchantBusinessId();

  const merchantOrders =
    ordersCache.filter(
      (order) =>
        String(order.business_id) ===
        String(merchantBusinessId)
    );

  const today = merchantOrders.filter(
    (order) => isToday(order.created_at)
  );

  const active = merchantOrders.filter(
    (order) =>
      !["delivered", "cancelled"].includes(order.status)
  );

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  setText(
    "ordersNewCount",
    merchantOrders.filter((order) => order.status === "received").length
  );

  setText(
    "ordersPreparingCount",
    merchantOrders.filter(
      (order) =>
        order.status === "approved" ||
        order.status === "preparing"
    ).length
  );

  setText(
    "ordersReadyCount",
    merchantOrders.filter(
      (order) =>
        order.status === "ready" ||
        order.status === "on_the_way"
    ).length
  );

  setText(
    "ordersDeliveredCount",
    today.filter((order) => order.status === "delivered").length
  );

  setText("ordersTodayCount", today.length);
  setText("pendingOrdersCount", active.length);

  const salesToday =
    today
      .filter(
        (order) =>
          order.status !== "cancelled"
      )
      .reduce(
        (sum, order) =>
          sum + Number(order.total || 0),
        0
      );

  setText(
    "salesTodayTotal",
    orderMoney(salesToday)
  );
}

function populateOrdersBusinessFilter() {
  if (!ordersBusinessFilter) return;

  const current = ordersBusinessFilter.value || "all";

  ordersBusinessFilter.innerHTML = `
    <option value="all">Todos los comercios</option>
    ${businessesCache.map((business) => `
      <option value="${escapeHTML(business.id)}">
        ${escapeHTML(business.name)}
      </option>
    `).join("")}
  `;

  if (
    [...ordersBusinessFilter.options]
      .some((option) => option.value === current)
  ) {
    ordersBusinessFilter.value = current;
  }
}

function filteredOrders() {
  const business = ordersBusinessFilter?.value || "all";
  const status = ordersStatusFilter?.value || "active";

  return ordersCache.filter((order) => {
    const businessOk =
      business === "all" ||
      String(order.business_id) === String(business);

    let statusOk = true;

    if (status === "active") {
      statusOk =
        !["delivered", "cancelled"].includes(order.status);
    } else if (status !== "all") {
      statusOk = order.status === status;
    }

    return businessOk && statusOk;
  });
}

function renderOrders() {
  if (!ordersList) return;

  const orders = filteredOrders();

  ordersList.innerHTML =
    orders.length
      ? orders.map(renderOrderCard).join("")
      : '<div class="panel empty-state">No hay pedidos para estos filtros.</div>';
}

function renderDashboardOrders() {
  if (!dashboardOrdersList) return;

  const merchantBusinessId =
    currentMerchantBusinessId();

  const latest =
    ordersCache
      .filter(
        (order) =>
          String(order.business_id) ===
          String(merchantBusinessId)
      )
      .slice(0, 5);

  dashboardOrdersList.innerHTML =
    latest.length
      ? latest.map((order) => `
          <div class="dashboard-order-row">
            <div>
              <strong>
                #${escapeHTML(order.id)}
                - ${escapeHTML(order.customer_name || "Cliente")}
              </strong>
              <small>
                ${escapeHTML(getBusinessNameById(order.business_id))}
                \u00b7
                ${escapeHTML(orderDeliveryLabel(order.delivery_type))}
              </small>
            </div>

            <div class="dashboard-order-right">
              <span class="order-status-badge status-${escapeHTML(order.status)}">
                ${escapeHTML(orderStatusLabel(order.status))}
              </span>
              <strong>${orderMoney(order.total)}</strong>
            </div>
          </div>
        `).join("")
      : '<div class="empty-state">Todavia no hay pedidos.</div>';
}

function playNewOrderSound() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.frequency.value = 880;

    gain.gain.setValueAtTime(
      0.001,
      context.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.12,
      context.currentTime + 0.02
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      context.currentTime + 0.30
    );

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.32);
  } catch (error) {
    console.warn("Sonido no disponible:", error);
  }
}

function detectNewOrders() {
  const currentIds = new Set(
    ordersCache.map((order) => String(order.id))
  );

  if (ordersFirstLoad) {
    knownOrderIds = currentIds;
    ordersFirstLoad = false;
    return;
  }

  const newOrders = ordersCache.filter(
    (order) =>
      !knownOrderIds.has(String(order.id))
  );

  if (newOrders.length) {
    playNewOrderSound();

    showToast(
      newOrders.length === 1
        ? "Ingreso un nuevo pedido."
        : `Ingresaron ${newOrders.length} pedidos nuevos.`,
      "success"
    );
  }

  knownOrderIds = currentIds;
}

async function loadOrders() {
  if (ordersLoading) return;

  ordersLoading = true;

  try {
    const [orders, items, options] = await Promise.all([
      getTableData(
        "orders",
        "id,business_id,customer_name,customer_phone,delivery_type,delivery_address,delivery_reference,payment_method,cash_amount,notes,status,total,source,archived,created_at"
      ),
      getTableData(
        "order_items",
        "id,order_id,product_id,product_name,quantity,unit_price,total"
      ),
      getTableData(
        "order_item_options",
        "id,order_item_id,group_name,option_name,price_delta"
      )
    ]);

    ordersCache =
      orders
        .filter(
          (order) =>
            order.archived !== true
        )
        .sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        );

    orderItemsCache = items;
    orderItemOptionsCache = options;

    detectNewOrders();
    populateOrdersBusinessFilter();
    updateOrdersCounters();
    renderOrders();
    renderDashboardOrders();

    if (ordersLastUpdate) {
      ordersLastUpdate.textContent =
        `Ultima actualizacion: ${
          new Intl.DateTimeFormat(
            "es-UY",
            { hour:"2-digit", minute:"2-digit", second:"2-digit" }
          ).format(new Date())
        }`;
    }
  } catch (error) {
    console.error("Error cargando pedidos:", error);

    if (ordersList) {
      ordersList.innerHTML =
        '<div class="panel error">No se pudieron cargar los pedidos. Revisa las tablas orders, order_items y order_item_options.</div>';
    }
  } finally {
    ordersLoading = false;
  }
}


function normalizeCustomerWhatsAppPhone(phone) {
  let digits =
    String(phone || "")
      .replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (
    digits.length === 9 &&
    digits.startsWith("09")
  ) {
    digits =
      `598${digits.slice(1)}`;
  }

  if (
    digits.length === 8 &&
    digits.startsWith("9")
  ) {
    digits =
      `598${digits}`;
  }

  return digits;
}

function applyNoticeTemplate(template, order) {
  const businessName =
    getBusinessNameById(
      order.business_id
    );

  return String(template || "")
    .replaceAll(
      "{cliente}",
      String(order.customer_name || "")
    )
    .replaceAll(
      "{comercio}",
      String(businessName || "")
    )
    .replaceAll(
      "{total}",
      orderMoney(order.total)
    )
    .replaceAll(
      "{direccion}",
      String(order.delivery_address || "")
    )
    .trim();
}

function customerWhatsAppNotification(order, nextStatus) {
  const defaults =
    customerNoticeDefaults();

  if (
    nextStatus === "approved"
  ) {
    if (
      selectedBusiness?.notice_approved_enabled === false
    ) {
      return "";
    }

    return applyNoticeTemplate(
      selectedBusiness?.notice_approved_message ||
      defaults.approved,
      order
    );
  }

  if (
    nextStatus === "ready" &&
    order.delivery_type === "pickup"
  ) {
    if (
      selectedBusiness?.notice_ready_enabled === false
    ) {
      return "";
    }

    return applyNoticeTemplate(
      selectedBusiness?.notice_ready_message ||
      defaults.ready,
      order
    );
  }

  if (
    nextStatus === "on_the_way" &&
    order.delivery_type !== "pickup"
  ) {
    if (
      selectedBusiness?.notice_delivery_enabled === false
    ) {
      return "";
    }

    return applyNoticeTemplate(
      selectedBusiness?.notice_delivery_message ||
      defaults.delivery,
      order
    );
  }

  return "";
}

function getCustomerWhatsAppUrl(order, nextStatus) {
  const phone =
    normalizeCustomerWhatsAppPhone(
      order.customer_phone
    );

  const message =
    customerWhatsAppNotification(
      order,
      nextStatus
    );

  if (!phone || !message) {
    return "";
  }

  return (
    `https://wa.me/${phone}` +
    `?text=${encodeURIComponent(message)}`
  );
}

function openCustomerWhatsApp(url, reservedWindow = null) {
  if (!url) {
    if (reservedWindow && !reservedWindow.closed) {
      reservedWindow.close();
    }
    return;
  }

  try {
    if (reservedWindow && !reservedWindow.closed) {
      reservedWindow.location.href = url;
      return;
    }
  } catch (error) {
    console.warn(
      "No se pudo reutilizar la ventana de WhatsApp:",
      error
    );
  }

  const opened =
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  if (!opened) {
    window.location.href = url;
  }
}


async function archiveSingleOrder(orderId) {
  const order =
    ordersCache.find(
      (item) =>
        String(item.id) ===
        String(orderId)
    );

  if (!order) {
    return;
  }

  const confirmed =
    window.confirm(
      `Quitar el pedido #${order.id} del panel?\n\n` +
      "Dejara de aparecer en Pedidos y en el resumen del turno."
    );

  if (!confirmed) {
    return;
  }

  try {
    await updateTableRow(
      "orders",
      order.id,
      { archived: true }
    );

    showToast(
      `Pedido #${order.id} quitado del turno.`,
      "success"
    );

    await loadOrders();
  } catch (error) {
    console.error(
      "Error quitando pedido:",
      error
    );

    showToast(
      "No se pudo quitar el pedido.",
      "error"
    );
  }
}

async function clearMerchantShiftOrders() {
  if (clearShiftOrdersButton) {
    clearShiftOrdersButton.disabled = true;
    clearShiftOrdersButton.textContent =
      "Buscando pedidos...";
  }

  try {
    /*
      IMPORTANTE:
      No usamos ordersCache para decidir qu\u00e9 borrar.
      Hacemos una lectura NUEVA de Supabase al tocar el bot\u00f3n.
      As\u00ed evitamos cualquier desincronizaci\u00f3n del panel.
    */
    const freshOrders =
      await getTableData(
        "orders",
        "id,business_id,status,archived,created_at"
      );

    const merchantBusinessId =
      currentMerchantBusinessId();

    let ordersToClear =
      freshOrders.filter(
        (order) =>
          order.archived !== true &&
          String(order.business_id) ===
          String(merchantBusinessId)
      );

    /*
      Respaldo adicional:
      Si por una migraci\u00f3n vieja hay pedidos visibles cuyo business_id
      no coincide, tomamos exactamente los IDs que el panel est\u00e1 mostrando.
    */
    if (!ordersToClear.length) {
      const visibleOrderIds =
        [
          ...document.querySelectorAll(
            "#ordersList [data-remove-order]"
          )
        ]
          .map(
            (button) =>
              String(button.dataset.orderId || "")
          )
          .filter(Boolean);

      ordersToClear =
        freshOrders.filter(
          (order) =>
            order.archived !== true &&
            visibleOrderIds.includes(
              String(order.id)
            )
        );
    }

    /*
      Tercer respaldo:
      Si el DOM todav\u00eda no se actualiz\u00f3, usamos los pedidos
      no archivados que ya tiene el panel en memoria.
    */
    if (!ordersToClear.length) {
      const cachedIds =
        ordersCache
          .filter(
            (order) =>
              order.archived !== true
          )
          .map(
            (order) =>
              String(order.id)
          );

      ordersToClear =
        freshOrders.filter(
          (order) =>
            order.archived !== true &&
            cachedIds.includes(
              String(order.id)
            )
        );
    }

    if (!ordersToClear.length) {
      showToast(
        "No hay pedidos para limpiar.",
        "success"
      );
      return;
    }

    const confirmed =
      window.confirm(
        `Vas a limpiar ${ordersToClear.length} pedido${ordersToClear.length === 1 ? "" : "s"} del turno.\n\n` +
        "Se quitaran del panel los pedidos activos, entregados y cancelados.\n" +
        "El proximo turno comenzara desde cero.\n\n" +
        "Queres continuar?"
      );

    if (!confirmed) {
      return;
    }

    if (clearShiftOrdersButton) {
      clearShiftOrdersButton.textContent =
        "Limpiando...";
    }

    for (const order of ordersToClear) {
      await updateTableRow(
        "orders",
        order.id,
        { archived: true }
      );
    }

    /*
      Refrescamos desde Supabase, no solo la vista.
    */
    await loadOrders();

    showToast(
      `Turno limpiado: ${ordersToClear.length} pedido${ordersToClear.length === 1 ? "" : "s"} quitado${ordersToClear.length === 1 ? "" : "s"}.`,
      "success"
    );
  } catch (error) {
    console.error(
      "Error limpiando turno:",
      error
    );

    showToast(
      "No se pudo limpiar el turno. Revisa la consola para ver el error.",
      "error"
    );
  } finally {
    if (clearShiftOrdersButton) {
      clearShiftOrdersButton.disabled = false;
      clearShiftOrdersButton.textContent =
        "Limpiar turno";
    }
  }
}

async function updateOrderStatus(orderId, status) {
  const order =
    ordersCache.find(
      (item) =>
        String(item.id) ===
        String(orderId)
    );

  if (!order) {
    showToast(
      "No se encontro el pedido.",
      "error"
    );
    return;
  }

  try {
    await updateTableRow(
      "orders",
      orderId,
      { status }
    );

    showToast(
      `Pedido #${orderId}: ${orderStatusLabel(status)}.`,
      "success"
    );

    /*
      V80:
      Cambiar el estado NO abre WhatsApp automáticamente.
      Si ese estado tiene un aviso habilitado, después aparece
      un botón separado "Avisar..." y el comercio decide si lo usa.
    */
    await loadOrders();
  } catch (error) {
    console.error(
      "Error actualizando pedido:",
      error
    );

    showToast(
      "No se pudo cambiar el estado del pedido.",
      "error"
    );
  }
}

function sendCustomerNoticeForOrder(orderId) {
  const order =
    ordersCache.find(
      (item) =>
        String(item.id) ===
        String(orderId)
    );

  if (!order) {
    showToast(
      "No se encontro el pedido.",
      "error"
    );
    return;
  }

  const noticeStatus =
    noticeStatusAvailableForOrder(order);

  if (!noticeStatus) {
    showToast(
      "No hay un aviso activo para este estado.",
      "error"
    );
    return;
  }

  const url =
    getCustomerWhatsAppUrl(
      order,
      noticeStatus
    );

  if (!url) {
    showToast(
      "No se pudo preparar el aviso. Revisá el teléfono del cliente y el mensaje configurado.",
      "error"
    );
    return;
  }

  openCustomerWhatsApp(url);
}


ordersBusinessFilter?.addEventListener(
  "change",
  renderOrders
);

ordersStatusFilter?.addEventListener(
  "change",
  renderOrders
);

refreshOrdersButton?.addEventListener(
  "click",
  loadOrders
);

clearShiftOrdersButton?.addEventListener(
  "click",
  clearMerchantShiftOrders
);

ordersList?.addEventListener(
  "click",
  (event) => {
    const removeButton =
      event.target.closest(
        "[data-remove-order]"
      );

    if (removeButton) {
      archiveSingleOrder(
        removeButton.dataset.orderId
      );
      return;
    }

    const noticeButton =
      event.target.closest(
        "[data-send-customer-notice]"
      );

    if (noticeButton) {
      sendCustomerNoticeForOrder(
        noticeButton.dataset.orderId
      );
      return;
    }

    const button =
      event.target.closest(
        "[data-order-action]"
      );

    if (!button) {
      return;
    }

    button.disabled = true;

    updateOrderStatus(
      button.dataset.orderId,
      button.dataset.nextStatus
    );
  }
);

dashboardGoOrdersButton?.addEventListener(
  "click",
  async () => {
    openSection("orders");
    await loadOrders();
  }
);

function startOrdersPolling() {
  if (ordersPollTimer) return;

  ordersPollTimer = setInterval(
    () => loadOrders(),
    10000
  );
}


function merchantStatusLabel(status) {
  const labels = {
    open: "ABIERTO - TOMANDO PEDIDOS",
    closed: "PEDIDOS CERRADOS",
    sold_out: "STOCK AGOTADO POR HOY"
  };

  return labels[status] || "ABIERTO - TOMANDO PEDIDOS";
}

function syncMerchantStatusUI() {
  if (!selectedBusiness) {
    return;
  }

  const status =
    selectedBusiness.ordering_status || "open";

  const label =
    merchantStatusLabel(status);

  if (merchantStoreStatusBadge) {
    merchantStoreStatusBadge.textContent = label;
    merchantStoreStatusBadge.className =
      `status-badge merchant-status-${status}`;
  }

  if (merchantStatusLarge) {
    merchantStatusLarge.textContent = label;
  }

  if (merchantQuickStatusText) {
    merchantQuickStatusText.textContent =
      status === "open"
        ? "El local esta tomando pedidos normalmente."
        : status === "closed"
          ? "Los pedidos estan cerrados hasta que vuelvas a abrirlos."
          : "El stock general esta agotado y la web no permite nuevos pedidos.";
  }

  if (merchantSoldOutMessage) {
    merchantSoldOutMessage.value =
      selectedBusiness.sold_out_message ||
      "POR HOY AGOTAMOS NUESTRO STOCK. MUCHAS GRACIAS A TODOS. NOS REENCONTRAMOS MANANA.";
  }
}

async function setMerchantOrderingStatus(status) {
  if (!selectedBusiness) {
    showToast(
      "No se encontro el comercio.",
      "error"
    );
    return;
  }

  const message =
    status === "sold_out" &&
    merchantSoldOutMessage
      ? merchantSoldOutMessage.value.trim()
      : selectedBusiness.sold_out_message || null;

  const buttons = [
    merchantOpenButton,
    merchantCloseButton,
    merchantSoldOutButton,
    merchantStatusOpen,
    merchantStatusClosed,
    merchantStatusSoldOut
  ].filter(Boolean);

  buttons.forEach(
    (button) => {
      button.disabled = true;
    }
  );

  try {
    await setBusinessOrderingStatusRPC(
      selectedBusiness.id,
      status,
      message
    );

    /*
      Lectura inmediata de Supabase.
      No damos por hecho que se guardo:
      verificamos el valor real de la base.
    */
    const verified =
      await readBusinessOrderingStatus(
        selectedBusiness.id
      );

    if (!verified) {
      throw new Error(
        "Supabase no devolvio el comercio al verificar el estado."
      );
    }

    if (
      String(
        verified.ordering_status || ""
      ) !== String(status)
    ) {
      throw new Error(
        `Supabase no guardo el estado solicitado. Estado real: ${verified.ordering_status || "sin valor"}`
      );
    }

    selectedBusiness.ordering_status =
      verified.ordering_status;

    selectedBusiness.sold_out_message =
      verified.sold_out_message ??
      message;

    syncMerchantStatusUI();

    showToast(
      status === "open"
        ? "Pedidos abiertos correctamente."
        : status === "closed"
          ? "Pedidos cerrados correctamente."
          : "Stock agotado activado correctamente.",
      "success"
    );
  } catch (error) {
    console.error(
      "Error actualizando estado real del local:",
      error
    );

    showToast(
      `No se pudo guardar el estado en Supabase: ${error.message || "error desconocido"}`,
      "error"
    );
  } finally {
    buttons.forEach(
      (button) => {
        button.disabled = false;
      }
    );
  }
}

async function saveMerchantSoldOutMessage() {
  if (
    !selectedBusiness ||
    !merchantSoldOutMessage
  ) {
    return;
  }

  try {
    const message =
      merchantSoldOutMessage.value.trim();

    const currentStatus =
      selectedBusiness.ordering_status ||
      "open";

    await setBusinessOrderingStatusRPC(
      selectedBusiness.id,
      currentStatus,
      message
    );

    const verified =
      await readBusinessOrderingStatus(
        selectedBusiness.id
      );

    if (!verified) {
      throw new Error(
        "No se pudo verificar el mensaje."
      );
    }

    selectedBusiness.sold_out_message =
      verified.sold_out_message || "";

    showToast(
      "Mensaje guardado correctamente.",
      "success"
    );
  } catch (error) {
    console.error(
      "Error guardando mensaje:",
      error
    );

    showToast(
      `No se pudo guardar el mensaje: ${error.message || "error desconocido"}`,
      "error"
    );
  }
}

[
  [merchantOpenButton, "open"],
  [merchantCloseButton, "closed"],
  [merchantSoldOutButton, "sold_out"],
  [merchantStatusOpen, "open"],
  [merchantStatusClosed, "closed"],
  [merchantStatusSoldOut, "sold_out"]
].forEach(([button, status]) => {
  button?.addEventListener(
    "click",
    () => setMerchantOrderingStatus(status)
  );
});

merchantSaveMessage?.addEventListener(
  "click",
  saveMerchantSoldOutMessage
);

async function loadDashboard() {
  try {
    const [
      businesses,
      categories,
      products,
      users
    ] = await Promise.all([
      getTableData("businesses", "id"),
      getTableData("categories", "id"),
      getTableData("products", "id"),
      getTableData("users", "id")
    ]);

    document.getElementById("businessesCount").textContent =
      businesses.length;

    document.getElementById("categoriesCount").textContent =
      categories.length;

    document.getElementById("productsCount").textContent =
      products.length;

    document.getElementById("usersCount").textContent =
      users.length;
  } catch (error) {
    console.error("Error cargando dashboard:", error);
  }
}

async function loadBusinesses() {
  const container =
    document.getElementById("businessesList");

  try {
    /*
      V72:
      Cargamos businesses con select=*.
      Así, si Supabase todavía no tiene alguna columna opcional nueva
      (branding/promos), el panel NO pierde la conexión completa.
    */
    const businesses =
      await getTableData(
        "businesses",
        "*"
      );

    if (businesses.length) {
      businessesCache = businesses;
    }

    if (!businesses.length) {
      container.className = "panel empty-state";
      container.textContent =
        "Todav\u00eda no hay comercios registrados.";
      return;
    }

    container.className = "panel";

    container.innerHTML = businesses.map((business) => `
      <div class="list-item">

        <div>
          <strong>
            ${escapeHTML(business.name || "Sin nombre")}
          </strong>

          <small>
            ${escapeHTML(business.slug || "Sin enlace")}
            ${
              business.phone
                ? ` \u00b7 ${escapeHTML(business.phone)}`
                : ""
            }
          </small>
        </div>

        <div class="business-actions" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">

          <span class="status-pill ${business.active ? "" : "inactive"}">
            ${business.active ? "Activo" : "Inactivo"}
          </span>

          <button
            type="button"
            class="secondary-button business-manage-button"
            data-business-id="${escapeHTML(business.id)}"
          >
            Administrar
          </button>

        </div>

      </div>
    `).join("");
  } catch (error) {
    console.error("Error cargando comercios:", error);

    container.className = "panel error";
    container.textContent =
      "No se pudieron cargar los comercios.";
  }
}

document
  .getElementById("businessesList")
  ?.addEventListener("click", (event) => {
    const button = event.target.closest(
      ".business-manage-button"
    );

    if (!button) {
      return;
    }

    const business = businessesCache.find(
      (item) =>
        String(item.id) ===
        String(button.dataset.businessId)
    );

    if (business) {
      openBusinessDetailModal(business);
    }
  });

async function loadCategories() {
  const container =
    document.getElementById("categoriesList");

  const subtitle =
    document.getElementById("categoriesSubtitle");

  if (!selectedBusiness) {
    subtitle.textContent =
      "Seleccion\u00e1 un comercio para administrar sus categor\u00edas.";

    container.className = "panel empty-state";
    container.textContent =
      "Entr\u00e1 en Comercios, toc\u00e1 Administrar y luego Categor\u00edas.";

    return;
  }

  subtitle.textContent =
    `Categor\u00edas de ${selectedBusiness.name}.`;

  try {
    const categories = await getTableData(
      "categories",
      "id,name,business_id,active"
    );

    const filtered = categories.filter(
      (category) =>
        String(category.business_id) ===
        String(selectedBusiness.id)
    );

    const header = `
      <div class="section-toolbar">

        <div>
          <strong>
            ${escapeHTML(selectedBusiness.name)}
          </strong>

          <small>
            Categor\u00edas de este comercio
          </small>
        </div>

        <button
          type="button"
          class="primary-button"
          id="newCategoryButton"
        >
          + Nueva categor\u00eda
        </button>

      </div>
    `;

    container.className = "panel";

    if (!filtered.length) {
      container.innerHTML =
        header +
        `<div class="empty-state">
          Todav\u00eda no hay categor\u00edas para este comercio.
        </div>`;
    } else {
      container.innerHTML =
        header +
        filtered.map((category) => `
          <div class="list-item">

            <div>
              <strong>
                ${escapeHTML(category.name || "Sin nombre")}
              </strong>
            </div>

            <span class="status-pill ${category.active ? "" : "inactive"}">
              ${category.active ? "Activa" : "Inactiva"}
            </span>

          </div>
        `).join("");
    }

    document
      .getElementById("newCategoryButton")
      ?.addEventListener("click", openCategoryModal);
  } catch (error) {
    console.error("Error cargando categorias:", error);

    container.className = "panel error";
    container.textContent =
      "No se pudieron cargar las categor\u00edas.";
  }
}

async function loadProducts() {
  const container =
    document.getElementById("productsList");

  const subtitle =
    document.getElementById("productsSubtitle");

  if (!selectedBusiness) {
    subtitle.textContent =
      "No se encontro el comercio.";

    container.className = "panel empty-state";
    container.textContent =
      "No hay un comercio seleccionado.";
    return;
  }

  subtitle.textContent =
    `Productos de ${selectedBusiness.name}.`;

  try {
    const [products, categories] =
      await Promise.all([
        getTableData(
          "products",
          "id,business_id,category_id,name,description,price,image_url,featured,active,available,sort_order,old_price"
        ),
        getTableData(
          "categories",
          "id,name,business_id,active"
        )
      ]);

    const merchantCategories =
      categories
        .filter(
          (category) =>
            String(category.business_id) ===
            String(selectedBusiness.id)
        )
        .sort(
          (a, b) =>
            String(a.name || "")
              .localeCompare(
                String(b.name || ""),
                "es"
              )
        );

    const categoryMap = new Map(
      merchantCategories.map(
        (category) => [
          String(category.id),
          category.name
        ]
      )
    );

    const filtered = products
      .filter(
        (product) =>
          String(product.business_id) ===
          String(selectedBusiness.id)
      )
      .sort(
        (a, b) =>
          Number(a.sort_order || 0) -
          Number(b.sort_order || 0)
      );

    const header = `
      <div class="section-toolbar products-main-toolbar">
        <div>
          <strong>
            ${escapeHTML(selectedBusiness.name)}
          </strong>
          <small>
            ${filtered.length} producto${filtered.length === 1 ? "" : "s"}
          </small>
        </div>

        <button
          type="button"
          class="primary-button"
          id="newProductButton"
        >
          + Nuevo producto
        </button>
      </div>
    `;

    container.className = "panel products-panel";

    if (!filtered.length) {
      container.innerHTML =
        header +
        `<div class="empty-state">
          Todav\u00eda no hay productos para este comercio.
        </div>`;
    } else {
      const categoryGroups = [];

      merchantCategories.forEach((category) => {
        const categoryProducts =
          filtered.filter(
            (product) =>
              String(product.category_id) ===
              String(category.id)
          );

        if (categoryProducts.length) {
          categoryGroups.push({
            id: category.id,
            name: category.name,
            products: categoryProducts
          });
        }
      });

      const uncategorized =
        filtered.filter(
          (product) =>
            !categoryMap.has(
              String(product.category_id)
            )
        );

      if (uncategorized.length) {
        categoryGroups.push({
          id: "uncategorized",
          name: "SIN CATEGORIA",
          products: uncategorized
        });
      }

      const productCard = (product) => `
        <div class="merchant-product-card">

          <div class="merchant-product-main">
            <div class="product-thumb">
              ${
                product.image_url
                  ? `
                    <img
                      src="${escapeHTML(product.image_url)}"
                      alt="${escapeHTML(product.name || "Producto")}"
                    >
                  `
                  : `
                    <div class="product-thumb-placeholder">
                      Sin imagen
                    </div>
                  `
              }
            </div>

            <div class="merchant-product-copy">
              <strong class="merchant-product-name">
                ${escapeHTML(product.name || "Sin nombre")}
              </strong>

              <small class="merchant-product-category">
                ${escapeHTML(
                  categoryMap.get(
                    String(product.category_id)
                  ) || "Sin categor\u00eda"
                )}
              </small>

              <div class="merchant-product-price-row">
                <span class="merchant-product-price-label">
                  Precio base
                </span>

                <strong class="product-price">
                  $${Number(product.price || 0)}
                </strong>

                ${
                  product.old_price
                    ? `
                      <span class="product-old-price">
                        $${Number(product.old_price)}
                      </span>
                    `
                    : ""
                }
              </div>

              <div class="merchant-product-badges">
                <span class="status-pill ${product.active ? "" : "inactive"}">
                  ${product.active ? "Activo" : "Inactivo"}
                </span>

                ${
                  product.available === false
                    ? `
                      <span class="merchant-stock-badge sold-out">
                        Agotado
                      </span>
                    `
                    : `
                      <span class="merchant-stock-badge available">
                        Con stock
                      </span>
                    `
                }

                ${
                  product.featured
                    ? `
                      <span class="product-badge">
                        Destacado
                      </span>
                    `
                    : ""
                }
              </div>
            </div>
          </div>

          <div class="product-management-actions merchant-product-actions">
            <button
              type="button"
              class="compact-button product-stock-button ${product.available === false ? "stock-off" : "stock-on"}"
              data-product-id="${escapeHTML(product.id)}"
              data-next-available="${product.available === false ? "true" : "false"}"
            >
              ${product.available === false ? "Reactivar stock" : "Agotar producto"}
            </button>

            <button
              type="button"
              class="secondary-button compact-button edit-product-button"
              data-product-id="${escapeHTML(product.id)}"
            >
              Editar
            </button>

            <button
              type="button"
              class="secondary-button compact-button modifiers-button"
              data-product-id="${escapeHTML(product.id)}"
            >
              Opciones y extras
            </button>

            <button
              type="button"
              class="compact-button delete-product-button"
              data-product-id="${escapeHTML(product.id)}"
            >
              Eliminar
            </button>
          </div>

        </div>
      `;

      container.innerHTML =
        header +
        categoryGroups.map((group) => `
          <section
            class="merchant-product-category-group"
            data-category-id="${escapeHTML(group.id)}"
          >
            <div class="merchant-category-heading">
              <div>
                <span class="merchant-category-kicker">
                  CATEGORIA
                </span>
                <h3>
                  ${escapeHTML(group.name)}
                </h3>
              </div>

              <span class="merchant-category-count">
                ${group.products.length}
                producto${group.products.length === 1 ? "" : "s"}
              </span>
            </div>

            <div class="merchant-category-products">
              ${group.products.map(productCard).join("")}
            </div>
          </section>
        `).join("");
    }

    document
      .getElementById("newProductButton")
      ?.addEventListener(
        "click",
        () => openProductModal()
      );

    container
      .querySelectorAll(".product-stock-button")
      .forEach((button) => {
        button.addEventListener("click", async () => {
          const productId = button.dataset.productId;
          const nextAvailable =
            button.dataset.nextAvailable === "true";

          button.disabled = true;
          button.textContent = "Actualizando...";

          try {
            await updateTableRow(
              "products",
              productId,
              { available: nextAvailable }
            );

            showToast(
              nextAvailable
                ? "Producto nuevamente disponible."
                : "Producto marcado como agotado.",
              "success"
            );

            await loadProducts();
          } catch (error) {
            console.error(
              "Error actualizando stock:",
              error
            );

            showToast(
              "No se pudo actualizar el stock.",
              "error"
            );

            button.disabled = false;
          }
        });
      });

    container
      .querySelectorAll(".edit-product-button")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const product = filtered.find(
            (item) =>
              String(item.id) ===
              String(button.dataset.productId)
          );

          if (product) {
            openProductModal(product);
          }
        });
      });

    container
      .querySelectorAll(".modifiers-button")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const product = filtered.find(
            (item) =>
              String(item.id) ===
              String(button.dataset.productId)
          );

          if (product) {
            openModifiersModal(product);
          }
        });
      });

    container
      .querySelectorAll(".delete-product-button")
      .forEach((button) => {
        button.addEventListener("click", async () => {
          const product =
            filtered.find(
              (item) =>
                String(item.id) ===
                String(button.dataset.productId)
            );

          if (!product) {
            return;
          }

          const confirmed =
            window.confirm(
              `Vas a eliminar "${product.name}".\n\n` +
              "Esta accion es definitiva. Si solo se termino el stock, usa Agotar producto.\n\n" +
              "Queres eliminarlo?"
            );

          if (!confirmed) {
            return;
          }

          button.disabled = true;
          button.textContent = "Eliminando...";

          try {
            const allGroups =
              await getTableData(
                "product_option_groups",
                "id,product_id"
              );

            const groupIds =
              allGroups
                .filter(
                  (group) =>
                    String(group.product_id) ===
                    String(product.id)
                )
                .map(
                  (group) =>
                    String(group.id)
                );

            if (groupIds.length) {
              const allOptions =
                await getTableData(
                  "product_options",
                  "id,group_id"
                );

              const optionIds =
                allOptions
                  .filter(
                    (option) =>
                      groupIds.includes(
                        String(option.group_id)
                      )
                  )
                  .map(
                    (option) =>
                      option.id
                  );

              for (const optionId of optionIds) {
                await deleteTableRow(
                  "product_options",
                  optionId
                );
              }

              for (const groupId of groupIds) {
                await deleteTableRow(
                  "product_option_groups",
                  groupId
                );
              }
            }

            await deleteTableRow(
              "products",
              product.id
            );

            showToast(
              "Producto eliminado correctamente.",
              "success"
            );

            await Promise.all([
              loadDashboard(),
              loadProducts()
            ]);
          } catch (error) {
            console.error(
              "Error eliminando producto:",
              error
            );

            showToast(
              "No se pudo eliminar el producto.",
              "error"
            );

            button.disabled = false;
            button.textContent = "Eliminar";
          }
        });
      });
  } catch (error) {
    console.error(
      "Error cargando productos:",
      error
    );

    container.className = "panel error";
    container.textContent =
      "No se pudieron cargar los productos.";
  }
}

async function loadUsers() {
  const container =
    document.getElementById("usersList");

  try {
    const users = await getTableData(
      "users",
      "id,email,full_name,role,active"
    );

    if (!users.length) {
      container.className = "panel empty-state";
      container.textContent =
        "Todav\u00eda no hay usuarios registrados.";
      return;
    }

    container.className = "panel";

    container.innerHTML = users.map((user) => `
      <div class="list-item">

        <div>
          <strong>
            ${escapeHTML(
              user.full_name ||
              user.email ||
              "Sin nombre"
            )}
          </strong>

          <small>
            ${escapeHTML(user.role || "Sin rol")}
          </small>
        </div>

        <span class="status-pill ${user.active ? "" : "inactive"}">
          ${user.active ? "Activo" : "Inactivo"}
        </span>

      </div>
    `).join("");
  } catch (error) {
    console.error("Error cargando usuarios:", error);

    container.className = "panel error";
    container.textContent =
      "No se pudieron cargar los usuarios.";
  }
}

businessForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const name = businessName.value.trim();
    const slug = normalizeSlug(
      businessSlug.value || name
    );

    if (!name) {
      businessFormMessage.textContent =
        "Escrib\u00ed el nombre del comercio.";
      return;
    }

    if (!slug) {
      businessFormMessage.textContent =
        "Escrib\u00ed un enlace v\u00e1lido.";
      return;
    }

    saveBusinessButton.disabled = true;
    saveBusinessButton.textContent = "Guardando...";
    businessFormMessage.textContent = "";

    const payload = {
      name,
      slug,
      phone: businessPhone.value.trim() || null,
      address: businessAddress.value.trim() || null,
      logo_url: businessLogoUrl.value.trim() || null,
      primary_color: businessPrimaryColor.value,
      secondary_color: businessSecondaryColor.value,
      active: businessActive.checked
    };

    try {
      if (editingBusinessId) {
        await updateTableRow(
          "businesses",
          editingBusinessId,
          payload
        );
      } else {
        await insertTableRow(
          "businesses",
          payload
        );
      }

      showToast(
        editingBusinessId
          ? "Comercio actualizado correctamente."
          : "Comercio creado correctamente.",
        "success"
      );

      closeBusinessModal();

      await Promise.all([
        loadDashboard(),
        loadBusinesses()
      ]);

      openSection("businesses");
    } catch (error) {
      console.error("Error guardando comercio:", error);

      businessFormMessage.textContent =
        "No se pudo guardar el comercio.";
    } finally {
      saveBusinessButton.disabled = false;
      saveBusinessButton.textContent =
        editingBusinessId
          ? "Guardar cambios"
          : "Guardar comercio";
    }
  }
);


productForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const name = productName.value.trim();
    const categoryId = productCategory.value;
    const price = Number(productPrice.value);

    if (!name) {
      productFormMessage.textContent =
        "Escrib\u00ed el nombre del producto.";
      return;
    }

    if (!categoryId) {
      productFormMessage.textContent =
        "Eleg\u00ed una categor\u00eda.";
      return;
    }

    if (
      !Number.isFinite(price) ||
      price < 0
    ) {
      productFormMessage.textContent =
        "Escrib\u00ed un precio v\u00e1lido.";
      return;
    }

    const selectedCategoryName =
      productCategory
        .options[
          productCategory.selectedIndex
        ]?.textContent
        ?.trim()
        ?.toUpperCase() || "";

    if (
      selectedCategoryName.includes("PIZZA") &&
      price <= 0
    ) {
      productFormMessage.textContent =
        "En pizzas, el precio base debe ser mayor a $0. Coloc\u00e1 el precio de la muzzarella y despu\u00e9s sum\u00e1 los gustos desde Opciones y extras.";
      return;
    }

    saveProductButton.disabled = true;
    saveProductButton.textContent =
      "Guardando...";
    productFormMessage.textContent = "";

    try {
      let imageUrl =
        removeExistingProductImage
          ? null
          : existingProductImageUrl || null;

      if (croppedProductImageBlob) {
        saveProductButton.textContent =
          "Subiendo imagen...";

        imageUrl =
          await uploadProductImage(
            croppedProductImageBlob
          );

        saveProductButton.textContent =
          editingProductId
            ? "Guardando cambios..."
            : "Guardando producto...";
      }

      const payload = {
        business_id: selectedBusiness.id,
        category_id: Number(categoryId),
        name,
        description:
          productDescription.value.trim() ||
          null,
        price,
        image_url: imageUrl,
        featured:
          productFeatured.checked,
        active:
          productActive.checked,
        sort_order:
          Number(productSortOrder.value || 0),
        old_price:
          productOldPrice.value
            ? Number(productOldPrice.value)
            : null
      };

      if (
        croppedProductImageBlob &&
        !imageUrl
      ) {
        throw new Error(
          "Imagen: no se genero una URL para guardar."
        );
      }

      if (editingProductId) {
        await updateProductAndVerify(
          editingProductId,
          payload
        );
      } else {
        await insertProductAndVerify(
          payload
        );
      }

      showToast(
        editingProductId
          ? "Producto actualizado correctamente."
          : "Producto creado correctamente.",
        "success"
      );

      closeProductModal();

      await Promise.all([
        loadDashboard(),
        loadProducts()
      ]);
    } catch (error) {
      console.error(
        "Error guardando producto:",
        error
      );

      const message =
        String(error.message);

      if (
        message.includes("Storage") ||
        message.includes("storage")
      ) {
        productFormMessage.textContent =
          "La foto no pudo subirse a Supabase Storage. Ejecuta el archivo SQL de la v29 una sola vez y volve a probar.";
      } else if (
        message.includes("imagen") ||
        message.includes("Imagen") ||
        message.includes("Producto:")
      ) {
        productFormMessage.textContent =
          message;
      } else {
        productFormMessage.textContent =
          editingProductId
            ? "No se pudo actualizar el producto."
            : "No se pudo crear el producto.";
      }
    } finally {
      saveProductButton.disabled = false;

      saveProductButton.textContent =
        editingProductId
          ? "Guardar cambios"
          : "Guardar producto";
    }
  }
);

categoryForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const name = categoryName.value.trim();

    if (!name) {
      categoryFormMessage.textContent =
        "Escrib\u00ed el nombre de la categor\u00eda.";
      return;
    }

    saveCategoryButton.disabled = true;
    saveCategoryButton.textContent = "Guardando...";
    categoryFormMessage.textContent = "";

    try {
      await insertTableRow(
        "categories",
        {
          business_id: selectedBusiness.id,
          name,
          active: categoryActive.checked
        }
      );

      showToast(
        "Categor\u00eda creada correctamente.",
        "success"
      );

      closeCategoryModal();

      await Promise.all([
        loadDashboard(),
        loadCategories()
      ]);
    } catch (error) {
      console.error("Error creando categoria:", error);

      categoryFormMessage.textContent =
        "No se pudo crear la categor\u00eda.";
    } finally {
      saveCategoryButton.disabled = false;
      saveCategoryButton.textContent =
        "Guardar categor\u00eda";
    }
  }
);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (modifierOptionModal.classList.contains("open")) {
    closeModifierOptionModal();
    return;
  }

  if (modifierGroupModal.classList.contains("open")) {
    closeModifierGroupModal();
    return;
  }

  if (modifiersModal.classList.contains("open")) {
    closeModifiersModal();
    return;
  }

  if (imageCropModal.classList.contains("open")) {
    closeImageCropEditor();
    return;
  }

  if (productModal.classList.contains("open")) {
    closeProductModal();
    return;
  }

  if (categoryModal.classList.contains("open")) {
    closeCategoryModal();
    return;
  }

  if (businessModal.classList.contains("open")) {
    closeBusinessModal();
    return;
  }

  if (businessDetailModal.classList.contains("open")) {
    closeBusinessDetailModal();
  }
});

async function resolveMerchantBusiness() {
  const fromCache =
    businessesCache.find(
      (business) =>
        String(business.id) ===
        String(MERCHANT_BUSINESS_ID)
    ) ||
    businessesCache[0] ||
    null;

  if (fromCache) {
    return fromCache;
  }

  /*
    En algunos celulares, al recargar, la consulta general de comercios
    puede tardar unas décimas más que el resto del panel. V70 mostraba
    un error aunque segundos después todo quedara funcionando.

    Antes de mostrar un error, V71 consulta directamente Mamma Mia.
  */
  for (
    let attempt = 0;
    attempt < 3;
    attempt += 1
  ) {
    try {
      const responseText =
        await requestText(
          `${SUPABASE_REST}/businesses?id=eq.${encodeURIComponent(MERCHANT_BUSINESS_ID)}&select=*`,
          {
            method:"GET",
            headers:supabaseHeaders()
          }
        );

      const rows =
        responseText.trim()
          ? JSON.parse(responseText)
          : [];

      const merchant =
        Array.isArray(rows)
          ? rows[0] || null
          : null;

      if (merchant) {
        const exists =
          businessesCache.some(
            (item) =>
              String(item.id) ===
              String(merchant.id)
          );

        if (!exists) {
          businessesCache.push(
            merchant
          );
        }

        return merchant;
      }
    } catch (error) {
      console.warn(
        `Reintento ${attempt + 1} cargando comercio:`,
        error
      );
    }

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          350 * (attempt + 1)
        )
    );
  }

  return null;
}

async function initAdmin() {
  /*
    Primero cargamos la lista de comercios.
    El resto del panel depende de selectedBusiness.
  */
  await loadBusinesses();

  selectedBusiness =
    await resolveMerchantBusiness();

  if (!selectedBusiness) {
    console.error(
      "No se pudo cargar el comercio Mamma Mia."
    );

    showToast(
      "No se pudo conectar con el comercio. Recargá la página.",
      "error"
    );

    return;
  }

  /*
    Apenas tenemos el comercio real, sincronizamos todos los textos
    que en HTML arrancan como "Cargando estado...".
  */
  syncMerchantStatusUI();
  renderMerchantPanelLogo();
  fillStoreDesignForm();
  fillPaymentSettingsForm();
  fillCustomerNoticesForm();

  /*
    El dashboard y usuarios ya pueden cargar en paralelo sin bloquear
    la conexión principal del comercio.
  */
  await Promise.all([
    loadDashboard(),
    loadUsers()
  ]);

  /*
    Las secciones comerciales se cargan recién después de tener
    selectedBusiness confirmado.
  */
  await loadCategories();
  await loadProducts();
  await fillDailyPromoForm();
  await loadOrders();

  /*
    Volvemos a sincronizar por seguridad después de todas las lecturas.
  */
  syncMerchantStatusUI();

  if (ordersBusinessFilter) {
    ordersBusinessFilter.value =
      String(selectedBusiness.id);

    renderOrders();
  }

  startOrdersPolling();
}

initAdmin();
