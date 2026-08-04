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
const productImagePreview = document.getElementById("productImagePreview");

const imageCropModal = document.getElementById("imageCropModal");
const imageCropCanvas = document.getElementById("imageCropCanvas");
const imageCropContext = imageCropCanvas.getContext("2d");
const imageZoomRange = document.getElementById("imageZoomRange");
const cancelImageCropButton = document.getElementById("cancelImageCropButton");
const confirmImageCropButton = document.getElementById("confirmImageCropButton");

const toast = document.getElementById("toast");

let businessesCache = [];
let selectedBusiness = null;
let editingBusinessId = null;
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


async function uploadProductImage(blob) {
  const safeBusinessId = String(selectedBusiness.id);
  const fileName =
    `${Date.now()}-${Math.random().toString(36).slice(2,10)}.jpg`;
  const objectPath =
    `${safeBusinessId}/${fileName}`;

  const response = await fetch(
    `${SUPABASE_URL}/storage/v1/object/product-images/${objectPath}`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "image/jpeg",
        "x-upsert": "false"
      },
      body: blob
    }
  );

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Storage ${response.status}: ${responseText}`
    );
  }

  return `${SUPABASE_URL}/storage/v1/object/public/product-images/${objectPath}`;
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

async function openProductModal() {
  if (!selectedBusiness) {
    showToast(
      "Primero seleccion\u00e1 un comercio.",
      "error"
    );
    return;
  }

  productForm.reset();
  productSortOrder.value = "0";
  productActive.checked = true;
  productFeatured.checked = false;
  productFormMessage.textContent = "";
  croppedProductImageBlob = null;

  if (croppedProductImageUrl) {
    URL.revokeObjectURL(croppedProductImageUrl);
  }

  croppedProductImageUrl = "";
  productImagePreview.innerHTML =
    "<span>Sin imagen</span>";

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
      "id,name,slug,phone,address,logo_url,primary_color,secondary_color,active"
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
          "id,business_id,category_id,name,description,price,image_url,featured,active,sort_order,old_price"
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

            <span class="status-pill ${product.active ? "" : "inactive"}">
              ${product.active ? "Activo" : "Inactivo"}
            </span>

          </div>
        `).join("");
    }

    document
      .getElementById("newProductButton")
      ?.addEventListener(
        "click",
        openProductModal
      );
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
      let imageUrl = null;

      if (croppedProductImageBlob) {
        saveProductButton.textContent =
          "Subiendo imagen...";

        imageUrl =
          await uploadProductImage(
            croppedProductImageBlob
          );

        saveProductButton.textContent =
          "Guardando producto...";
      }

      await insertTableRow(
        "products",
        {
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
        }
      );

      showToast(
        "Producto creado correctamente.",
        "success"
      );

      closeProductModal();

      await Promise.all([
        loadDashboard(),
        loadProducts()
      ]);
    } catch (error) {
      console.error(
        "Error creando producto:",
        error
      );

      const message =
        String(error.message);

      if (
        message.includes("Storage") ||
        message.includes("storage")
      ) {
        productFormMessage.textContent =
          "No se pudo subir la imagen. Revis\u00e1 las pol\u00edticas del bucket product-images.";
      } else {
        productFormMessage.textContent =
          "No se pudo crear el producto.";
      }
    } finally {
      saveProductButton.disabled = false;
      saveProductButton.textContent =
        "Guardar producto";
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

  await loadCategories();
  await loadProducts();
}

initAdmin();
