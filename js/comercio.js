const navItems = document.querySelectorAll(".nav-item");
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

async function openModifierOptionModal(group, option = null) {
  selectedModifierGroup = group;
  modifierOptionForm.reset();
  editingModifierOptionId = option?.id ?? null;

  modifierOptionModalTitle.textContent =
    option ? "Editar opci\u00f3n" : "Crear opci\u00f3n";

  modifierOptionGroupName.textContent =
    group.name || "";

  saveModifierOptionButton.textContent =
    option ? "Guardar cambios" : "Guardar opci\u00f3n";

  modifierOptionName.value = option?.name || "";
  modifierOptionPrice.value =
    option?.price_delta ?? 0;
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

function orderNextActions(order) {
  if (order.status === "received") {
    return [
      ["approved", "Aceptar y avisar", "primary"],
      ["cancelled", "Cancelar", "danger"]
    ];
  }

  if (order.status === "approved") {
    return [
      ["preparing", "Iniciar preparacion", "primary"]
    ];
  }

  if (order.status === "preparing") {
    return [
      [
        "ready",
        order.delivery_type === "pickup"
          ? "Listo y avisar"
          : "Marcar como listo",
        "primary"
      ]
    ];
  }

  if (order.status === "ready") {
    return [
      [
        order.delivery_type === "pickup"
          ? "delivered"
          : "on_the_way",
        order.delivery_type === "pickup"
          ? "Pedido retirado"
          : "Enviar delivery y avisar",
        "primary"
      ]
    ];
  }

  if (order.status === "on_the_way") {
    return [
      ["delivered", "Marcar entregado", "primary"]
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

      ${
        actions.length
          ? `
            <div class="order-actions">
              ${actions.map(([status, label, kind]) => `
                <button
                  type="button"
                  class="order-action-button ${kind}"
                  data-order-action
                  data-order-id="${escapeHTML(order.id)}"
                  data-next-status="${escapeHTML(status)}"
                >
                  ${escapeHTML(label)}
                </button>
              `).join("")}
            </div>
          `
          : ""
      }
    </article>
  `;
}

function updateOrdersCounters() {
  const merchantOrders =
    ordersCache.filter(
      (order) =>
        String(order.business_id) ===
        String(MERCHANT_BUSINESS_ID)
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

  const latest = ordersCache.slice(0, 5);

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
        "id,business_id,customer_name,customer_phone,delivery_type,delivery_address,delivery_reference,payment_method,cash_amount,notes,status,total,source,created_at"
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

    ordersCache = orders.sort(
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

function customerWhatsAppNotification(order, nextStatus) {
  const businessName =
    getBusinessNameById(order.business_id);

  if (nextStatus === "approved") {
    return [
      `\u2705 *${businessName.toUpperCase()}*`,
      "",
      "*TU PEDIDO FUE CONFIRMADO*",
      "",
      `Hola ${order.customer_name || ""}, recibimos tu pedido y ya fue aceptado.`,
      "",
      `Total: *${orderMoney(order.total)}*`,
      "",
      "Te avisaremos cuando haya una novedad importante."
    ].join("\n");
  }

  if (
    nextStatus === "ready" &&
    order.delivery_type === "pickup"
  ) {
    return [
      `\ud83c\udf55 *${businessName.toUpperCase()}*`,
      "",
      "*TU PEDIDO ESTA LISTO*",
      "",
      `Hola ${order.customer_name || ""}, tu pedido ya esta listo para retirar.`,
      "",
      "\ud83c\udfea *RETIRO EN EL LOCAL*",
      "",
      "Te esperamos. Gracias por elegirnos."
    ].join("\n");
  }

  if (
    nextStatus === "on_the_way" &&
    order.delivery_type !== "pickup"
  ) {
    return [
      `\ud83d\udef5 *${businessName.toUpperCase()}*`,
      "",
      "*TU PEDIDO ESTA EN CAMINO*",
      "",
      `Hola ${order.customer_name || ""}, tu pedido salio para delivery.`,
      "",
      `Direccion: ${order.delivery_address || ""}`,
      "",
      "En breve lo vas a recibir. Gracias por elegirnos."
    ].join("\n");
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

  const whatsappUrl =
    getCustomerWhatsAppUrl(
      order,
      status
    );

  let reservedWhatsAppWindow = null;

  if (whatsappUrl) {
    try {
      reservedWhatsAppWindow =
        window.open(
          "about:blank",
          "_blank"
        );
    } catch (error) {
      reservedWhatsAppWindow = null;
    }
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

    if (whatsappUrl) {
      openCustomerWhatsApp(
        whatsappUrl,
        reservedWhatsAppWindow
      );
    }

    await loadOrders();
  } catch (error) {
    console.error(
      "Error actualizando pedido:",
      error
    );

    if (
      reservedWhatsAppWindow &&
      !reservedWhatsAppWindow.closed
    ) {
      reservedWhatsAppWindow.close();
    }

    showToast(
      "No se pudo cambiar el estado del pedido.",
      "error"
    );
  }
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

ordersList?.addEventListener(
  "click",
  (event) => {
    const button =
      event.target.closest("[data-order-action]");

    if (!button) return;

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
    return;
  }

  try {
    const payload = {
      ordering_status: status
    };

    if (
      status === "sold_out" &&
      merchantSoldOutMessage
    ) {
      payload.sold_out_message =
        merchantSoldOutMessage.value.trim();
    }

    await updateTableRow(
      "businesses",
      selectedBusiness.id,
      payload
    );

    selectedBusiness.ordering_status = status;

    if (payload.sold_out_message !== undefined) {
      selectedBusiness.sold_out_message =
        payload.sold_out_message;
    }

    syncMerchantStatusUI();

    showToast(
      status === "open"
        ? "Pedidos abiertos."
        : status === "closed"
          ? "Pedidos cerrados."
          : "Stock agotado activado.",
      "success"
    );
  } catch (error) {
    console.error("Error actualizando estado del local:", error);
    showToast(
      "No se pudo cambiar el estado del local.",
      "error"
    );
  }
}

async function saveMerchantSoldOutMessage() {
  if (!selectedBusiness || !merchantSoldOutMessage) {
    return;
  }

  try {
    const message =
      merchantSoldOutMessage.value.trim();

    await updateTableRow(
      "businesses",
      selectedBusiness.id,
      { sold_out_message: message }
    );

    selectedBusiness.sold_out_message = message;

    showToast(
      "Mensaje guardado.",
      "success"
    );
  } catch (error) {
    console.error("Error guardando mensaje:", error);
    showToast(
      "No se pudo guardar el mensaje.",
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
    const businesses = await getTableData(
      "businesses",
      "id,name,slug,phone,address,logo_url,primary_color,secondary_color,active,ordering_status,sold_out_message"
    );

    businessesCache = businesses;

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
      "Seleccion\u00e1 un comercio para administrar sus productos.";

    container.className = "panel empty-state";
    container.textContent =
      "Entr\u00e1 en Comercios, toc\u00e1 Administrar y luego Productos.";

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
          "id,name,business_id"
        )
      ]);

    const categoryMap = new Map(
      categories.map(
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
      <div class="section-toolbar">

        <div>
          <strong>
            ${escapeHTML(selectedBusiness.name)}
          </strong>

          <small>
            Productos de este comercio
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

    container.className = "panel";

    if (!filtered.length) {
      container.innerHTML =
        header +
        `<div class="empty-state">
          Todav\u00eda no hay productos para este comercio.
        </div>`;
    } else {
      container.innerHTML =
        header +
        filtered.map((product) => `
          <div class="list-item product-row">

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

            <div>
              <strong>
                ${escapeHTML(product.name || "Sin nombre")}
              </strong>

              <small>
                ${escapeHTML(
                  categoryMap.get(
                    String(product.category_id)
                  ) || "Sin categor\u00eda"
                )}
              </small>

              <small>
                <span class="product-price">
                  $${Number(product.price || 0)}
                </span>

                ${
                  product.old_price
                    ? `
                      <span class="product-old-price">
                        $${Number(product.old_price)}
                      </span>
                    `
                    : ""
                }
              </small>

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

            <div class="product-management-actions">
              <span class="status-pill ${product.active ? "" : "inactive"}">
                ${product.active ? "Activo" : "Inactivo"}
              </span>

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
                Editar producto
              </button>

              <button
                type="button"
                class="secondary-button compact-button modifiers-button"
                data-product-id="${escapeHTML(product.id)}"
              >
                Opciones y extras
              </button>
            </div>

          </div>
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
            console.error("Error actualizando stock:", error);
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

async function initAdmin() {
  await Promise.all([
    loadDashboard(),
    loadBusinesses(),
    loadUsers()
  ]);

  selectedBusiness =
    businessesCache.find(
      (business) =>
        String(business.id) ===
        String(MERCHANT_BUSINESS_ID)
    ) ||
    businessesCache[0] ||
    null;

  if (!selectedBusiness) {
    showToast(
      "No se encontro el comercio Mamma Mia.",
      "error"
    );
    return;
  }

  syncMerchantStatusUI();

  await loadCategories();
  await loadProducts();
  await loadOrders();

  if (ordersBusinessFilter) {
    ordersBusinessFilter.value =
      String(selectedBusiness.id);

    renderOrders();
  }

  startOrdersPolling();
}

initAdmin();
