console.log("Proyecto X - Super Panel iniciado");

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".page-section");

navItems.forEach((button) => {
  button.addEventListener("click", () => {
    const sectionId = button.dataset.section;

    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    sections.forEach((section) => {
      section.classList.remove("active");
    });

    button.classList.add("active");

    document
      .getElementById(sectionId)
      .classList.add("active");
  });
});

async function getTableData(tableName, select = "*") {
  const response = await fetch(
    `${SUPABASE_REST}/${tableName}?select=${select}`,
    {
      method: "GET",
      headers: supabaseHeaders()
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `${tableName}: Error ${response.status} - ${errorText}`
    );
  }

  return response.json();
}

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
    console.error("Error cargando el dashboard:", error);
  }
}

async function loadBusinesses() {
  const container = document.getElementById("businessesList");

  try {
    const businesses = await getTableData(
      "businesses",
      "id,name,slug,phone,address,active"
    );

    if (!businesses.length) {
      container.innerHTML =
        "Todavía no hay comercios registrados.";
      return;
    }

    container.innerHTML = businesses.map((business) => `
      <div class="list-item">
        <div>
          <strong>${escapeHTML(business.name || "Sin nombre")}</strong>
          <small>
            ${escapeHTML(business.slug || "Sin enlace")}
          </small>
        </div>

        <span>
          ${business.active ? "Activo" : "Inactivo"}
        </span>
      </div>
    `).join("");

  } catch (error) {
    console.error(error);
    container.textContent = "No se pudieron cargar los comercios.";
  }
}

async function loadCategories() {
  const container = document.getElementById("categoriesList");

  try {
    const categories = await getTableData(
      "categories",
      "id,name,business_id,active"
    );

    if (!categories.length) {
      container.innerHTML =
        "Todavía no hay categorías registradas.";
      return;
    }

    container.innerHTML = categories.map((category) => `
      <div class="list-item">
        <div>
          <strong>${escapeHTML(category.name || "Sin nombre")}</strong>
          <small>Comercio ID: ${category.business_id || "-"}</small>
        </div>

        <span>
          ${category.active ? "Activa" : "Inactiva"}
        </span>
      </div>
    `).join("");

  } catch (error) {
    console.error(error);
    container.textContent = "No se pudieron cargar las categorías.";
  }
}

async function loadProducts() {
  const container = document.getElementById("productsList");

  try {
    const products = await getTableData(
      "products",
      "id,name,price,business_id,active"
    );

    if (!products.length) {
      container.innerHTML =
        "Todavía no hay productos registrados.";
      return;
    }

    container.innerHTML = products.map((product) => `
      <div class="list-item">
        <div>
          <strong>${escapeHTML(product.name || "Sin nombre")}</strong>
          <small>
            Comercio ID: ${product.business_id || "-"}
            · $${Number(product.price || 0)}
          </small>
        </div>

        <span>
          ${product.active ? "Activo" : "Inactivo"}
        </span>
      </div>
    `).join("");

  } catch (error) {
    console.error(error);
    container.textContent = "No se pudieron cargar los productos.";
  }
}

async function loadUsers() {
  const container = document.getElementById("usersList");

  try {
    const users = await getTableData(
      "users",
      "id,email,full_name,role,active"
    );

    if (!users.length) {
      container.innerHTML =
        "Todavía no hay usuarios registrados.";
      return;
    }

    container.innerHTML = users.map((user) => `
      <div class="list-item">
        <div>
          <strong>
            ${escapeHTML(user.full_name || user.email || "Sin nombre")}
          </strong>

          <small>
            ${escapeHTML(user.role || "Sin rol")}
          </small>
        </div>

        <span>
          ${user.active ? "Activo" : "Inactivo"}
        </span>
      </div>
    `).join("");

  } catch (error) {
    console.error(error);
    container.textContent = "No se pudieron cargar los usuarios.";
  }
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
