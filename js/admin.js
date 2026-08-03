const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".page-section");

const businessModal = document.getElementById("businessModal");
const businessForm = document.getElementById("businessForm");
const businessName = document.getElementById("businessName");
const businessSlug = document.getElementById("businessSlug");
const businessFormMessage = document.getElementById("businessFormMessage");
const saveBusinessButton = document.getElementById("saveBusinessButton");
const toast = document.getElementById("toast");

function openSection(sectionId) {
  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.section === sectionId);
  });

  sections.forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });
}

navItems.forEach((button) => {
  button.addEventListener("click", () => openSection(button.dataset.section));
});

document.querySelector(".go-businesses")?.addEventListener("click", () => {
  openSection("businesses");
});

function openBusinessModal() {
  businessForm.reset();
  document.getElementById("businessPrimaryColor").value = "#7c3aed";
  document.getElementById("businessSecondaryColor").value = "#f5c518";
  document.getElementById("businessActive").checked = true;
  businessFormMessage.textContent = "";
  businessModal.classList.add("open");
  businessModal.setAttribute("aria-hidden", "false");
  setTimeout(() => businessName.focus(), 50);
}

function closeBusinessModal() {
  businessModal.classList.remove("open");
  businessModal.setAttribute("aria-hidden", "true");
}

document.getElementById("newBusinessButton")?.addEventListener("click", openBusinessModal);

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeBusinessModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && businessModal.classList.contains("open")) {
    closeBusinessModal();
  }
});

businessName.addEventListener("input", () => {
  if (!businessSlug.dataset.edited) {
    businessSlug.value = makeSlug(businessName.value);
  }
});

businessSlug.addEventListener("input", () => {
  businessSlug.dataset.edited = businessSlug.value ? "true" : "";
  businessSlug.value = makeSlug(businessSlug.value);
});

function makeSlug(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getTableData(tableName, select = "*") {
  const response = await fetch(
    `${SUPABASE_REST}/${tableName}?select=${encodeURIComponent(select)}`,
    {
      method: "GET",
      headers: supabaseHeaders()
    }
  );

  if (!response.ok) {
    throw new Error(`${tableName}: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function createBusiness(payload) {
  const response = await fetch(`${SUPABASE_REST}/businesses`, {
    method: "POST",
    headers: supabaseHeaders("return=representation"),
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${await response.text()}`);
  }

  return response.json();
}

businessForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    name: businessName.value.trim(),
    slug: makeSlug(businessSlug.value),
    phone: document.getElementById("businessPhone").value.trim() || null,
    logo_url: document.getElementById("businessLogoUrl").value.trim() || null,
    primary_color: document.getElementById("businessPrimaryColor").value,
    secondary_color: document.getElementById("businessSecondaryColor").value,
    address: document.getElementById("businessAddress").value.trim() || null,
    active: document.getElementById("businessActive").checked
  };

  if (!payload.name || !payload.slug) {
    businessFormMessage.textContent = "Completá el nombre y el enlace corto.";
    return;
  }

  saveBusinessButton.disabled = true;
  saveBusinessButton.textContent = "Guardando...";
  businessFormMessage.textContent = "";

  try {
    await createBusiness(payload);
    closeBusinessModal();
    showToast("Comercio creado correctamente");
    await Promise.all([loadDashboard(), loadBusinesses()]);
    openSection("businesses");
  } catch (error) {
    console.error(error);
    businessFormMessage.textContent =
      "No se pudo crear el comercio. Revisá las políticas RLS de la tabla businesses.";
  } finally {
    saveBusinessButton.disabled = false;
    saveBusinessButton.textContent = "Guardar comercio";
  }
});

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function loadDashboard() {
  try {
    const [businesses, categories, products, users] = await Promise.all([
      getTableData("businesses", "id"),
      getTableData("categories", "id"),
      getTableData("products", "id"),
      getTableData("users", "id")
    ]);

    document.getElementById("businessesCount").textContent = businesses.length;
    document.getElementById("categoriesCount").textContent = categories.length;
    document.getElementById("productsCount").textContent = products.length;
    document.getElementById("usersCount").textContent = users.length;
  } catch (error) {
    console.error("Error cargando dashboard:", error);
  }
}

async function renderList(tableName, containerId, select, renderItem, emptyText) {
  const container = document.getElementById(containerId);

  try {
    const rows = await getTableData(tableName, select);

    if (!rows.length) {
      container.className = "panel empty-state";
      container.textContent = emptyText;
      return;
    }

    container.className = "panel";
    container.innerHTML = rows.map(renderItem).join("");
  } catch (error) {
    console.error(error);
    container.className = "panel error";
    container.textContent = "No se pudieron cargar los datos.";
  }
}

async function loadBusinesses() {
  await renderList(
    "businesses",
    "businessesList",
    "id,name,slug,active",
    (business) => `
      <div class="list-item">
        <div>
          <strong>${escapeHTML(business.name || "Sin nombre")}</strong>
          <small>${escapeHTML(business.slug || "Sin enlace")}</small>
        </div>
        <span>${business.active ? "Activo" : "Inactivo"}</span>
      </div>
    `,
    "Todavía no hay comercios registrados."
  );
}

async function loadCategories() {
  await renderList(
    "categories",
    "categoriesList",
    "id,name,business_id,active",
    (category) => `
      <div class="list-item">
        <div>
          <strong>${escapeHTML(category.name || "Sin nombre")}</strong>
          <small>Comercio ID: ${escapeHTML(category.business_id || "-")}</small>
        </div>
        <span>${category.active ? "Activa" : "Inactiva"}</span>
      </div>
    `,
    "Todavía no hay categorías registradas."
  );
}

async function loadProducts() {
  await renderList(
    "products",
    "productsList",
    "id,name,price,business_id,active",
    (product) => `
      <div class="list-item">
        <div>
          <strong>${escapeHTML(product.name || "Sin nombre")}</strong>
          <small>Comercio ID: ${escapeHTML(product.business_id || "-")} · $${Number(product.price || 0)}</small>
        </div>
        <span>${product.active ? "Activo" : "Inactivo"}</span>
      </div>
    `,
    "Todavía no hay productos registrados."
  );
}

async function loadUsers() {
  await renderList(
    "users",
    "usersList",
    "id,email,full_name,role,active",
    (user) => `
      <div class="list-item">
        <div>
          <strong>${escapeHTML(user.full_name || user.email || "Sin nombre")}</strong>
          <small>${escapeHTML(user.role || "Sin rol")}</small>
        </div>
        <span>${user.active ? "Activo" : "Inactivo"}</span>
      </div>
    `,
    "Todavía no hay usuarios registrados."
  );
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

async function initAdmin() {
  await Promise.all([
    loadDashboard(),
    loadBusinesses(),
    loadCategories(),
    loadProducts(),
    loadUsers()
  ]);
}

initAdmin();
