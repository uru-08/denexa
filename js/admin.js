const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".page-section");

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
  button.addEventListener("click", () => {
    openSection(button.dataset.section);
  });
});

document
  .querySelector(".go-businesses")
  ?.addEventListener("click", () => {
    openSection("businesses");
  });

async function getTableData(
  tableName,
  select = "*"
) {
  const response = await fetch(
    `${SUPABASE_REST}/${tableName}?select=${encodeURIComponent(select)}`,
    {
      method: "GET",
      headers: supabaseHeaders()
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `${tableName}: ${response.status} ${errorText}`
    );
  }

  return response.json();
}

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

    document.getElementById(
      "businessesCount"
    ).textContent = businesses.length;

    document.getElementById(
      "categoriesCount"
    ).textContent = categories.length;

    document.getElementById(
      "productsCount"
    ).textContent = products.length;

    document.getElementById(
      "usersCount"
    ).textContent = users.length;

  } catch (error) {
    console.error(
      "Error cargando dashboard:",
      error
    );
  }
}

async function renderList(
  tableName,
  containerId,
  select,
  renderItem,
  emptyText
) {
  const container =
    document.getElementById(containerId);

  try {
    const rows = await getTableData(
      tableName,
      select
    );

    if (!rows.length) {
      container.className =
        "panel empty-state";

      container.textContent =
        emptyText;

      return;
    }

    container.className =
      "panel";

    container.innerHTML =
      rows.map(renderItem).join("");

  } catch (error) {
    console.error(
      `Error cargando ${tableName}:`,
      error
    );

    container.className =
      "panel error";

    container.textContent =
      "No se pudieron cargar los datos.";
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
          <strong>
            ${escapeHTML(
              business.name || "Sin nombre"
            )}
          </strong>

          <small>
            ${escapeHTML(
              business.slug || "Sin enlace"
            )}
          </small>
        </div>

        <span>
          ${
            business.active
              ? "Activo"
              : "Inactivo"
          }
        </span>

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
          <strong>
            ${escapeHTML(
              category.name || "Sin nombre"
            )}
          </strong>

          <small>
            Comercio ID:
            ${escapeHTML(
              category.business_id || "-"
            )}
          </small>
        </div>

        <span>
          ${
            category.active
              ? "Activa"
              : "Inactiva"
          }
        </span>

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
          <strong>
            ${escapeHTML(
              product.name || "Sin nombre"
            )}
          </strong>

          <small>
            Comercio ID:
            ${escapeHTML(
              product.business_id || "-"
            )}
            ·
            $${Number(
              product.price || 0
            )}
          </small>
        </div>

        <span>
          ${
            product.active
              ? "Activo"
              : "Inactivo"
          }
        </span>

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
          <strong>
            ${escapeHTML(
              user.full_name ||
              user.email ||
              "Sin nombre"
            )}
          </strong>

          <small>
            ${escapeHTML(
              user.role || "Sin rol"
            )}
          </small>
        </div>

        <span>
          ${
            user.active
              ? "Activo"
              : "Inactivo"
          }
        </span>

      </div>
    `,

    "Todavía no hay usuarios registrados."
  );
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
