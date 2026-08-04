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
const categorySortOrder = document.getElementById("categorySortOrder");
const categoryActive = document.getElementById("categoryActive");
const categoryFormMessage = document.getElementById("categoryFormMessage");
const saveCategoryButton = document.getElementById("saveCategoryButton");
const closeCategoryModalButton = document.getElementById("closeCategoryModalButton");
const cancelCategoryButton = document.getElementById("cancelCategoryButton");

const toast = document.getElementById("toast");

let businessesCache = [];
let selectedBusiness = null;
let editingBusinessId = null;

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
      <strong>Dirección</strong>
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
    closeBusinessDetailModal();
    openSection("categories");
    await loadCategories();
  }
);

businessProductsButton.addEventListener(
  "click",
  async () => {
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
      "Primero seleccioná un comercio.",
      "error"
    );
    return;
  }

  categoryForm.reset();
  categorySortOrder.value = "0";
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
        "Todavía no hay comercios registrados.";
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
                ? ` · ${escapeHTML(business.phone)}`
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
      "Seleccioná un comercio para administrar sus categorías.";

    container.className = "panel empty-state";
    container.textContent =
      "Entrá en Comercios, tocá Administrar y luego Categorías.";

    return;
  }

  subtitle.textContent =
    `Categorías de ${selectedBusiness.name}.`;

  try {
    const categories = await getTableData(
      "categories",
      "id,name,business_id,sort_order,active"
    );

    const filtered = categories
      .filter(
        (category) =>
          String(category.business_id) ===
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
            Categorías de este comercio
          </small>
        </div>

        <button
          type="button"
          class="primary-button"
          id="newCategoryButton"
        >
          + Nueva categoría
        </button>

      </div>
    `;

    container.className = "panel";

    if (!filtered.length) {
      container.innerHTML =
        header +
        `<div class="empty-state">
          Todavía no hay categorías para este comercio.
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

              <small>
                Orden: ${Number(category.sort_order || 0)}
              </small>
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
    console.error("Error cargando categorías:", error);

    container.className = "panel error";
    container.textContent =
      "No se pudieron cargar las categorías.";
  }
}

async function loadProducts() {
  const container =
    document.getElementById("productsList");

  const subtitle =
    document.getElementById("productsSubtitle");

  if (!selectedBusiness) {
    subtitle.textContent =
      "Seleccioná un comercio para administrar sus productos.";

    container.className = "panel empty-state";
    container.textContent =
      "Entrá en Comercios, tocá Administrar y luego Productos.";

    return;
  }

  subtitle.textContent =
    `Productos de ${selectedBusiness.name}.`;

  try {
    const products = await getTableData(
      "products",
      "id,name,price,business_id,active"
    );

    const filtered = products.filter(
      (product) =>
        String(product.business_id) ===
        String(selectedBusiness.id)
    );

    container.className = "panel";

    if (!filtered.length) {
      container.textContent =
        "Todavía no hay productos para este comercio.";
      return;
    }

    container.innerHTML = filtered.map((product) => `
      <div class="list-item">

        <div>
          <strong>
            ${escapeHTML(product.name || "Sin nombre")}
          </strong>

          <small>
            $${Number(product.price || 0)}
          </small>
        </div>

        <span class="status-pill ${product.active ? "" : "inactive"}">
          ${product.active ? "Activo" : "Inactivo"}
        </span>

      </div>
    `).join("");
  } catch (error) {
    console.error("Error cargando productos:", error);

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
        "Todavía no hay usuarios registrados.";
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
        "Escribí el nombre del comercio.";
      return;
    }

    if (!slug) {
      businessFormMessage.textContent =
        "Escribí un enlace válido.";
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

categoryForm.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();

    const name = categoryName.value.trim();

    if (!name) {
      categoryFormMessage.textContent =
        "Escribí el nombre de la categoría.";
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
          sort_order: Number(categorySortOrder.value || 0),
          active: categoryActive.checked
        }
      );

      showToast(
        "Categoría creada correctamente.",
        "success"
      );

      closeCategoryModal();

      await Promise.all([
        loadDashboard(),
        loadCategories()
      ]);
    } catch (error) {
      console.error("Error creando categoría:", error);

      categoryFormMessage.textContent =
        "No se pudo crear la categoría.";
    } finally {
      saveCategoryButton.disabled = false;
      saveCategoryButton.textContent =
        "Guardar categoría";
    }
  }
);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
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
