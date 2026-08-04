const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".page-section");

const businessModal = document.getElementById("businessModal");
const businessForm = document.getElementById("businessForm");
const businessName = document.getElementById("businessName");
const businessSlug = document.getElementById("businessSlug");
const businessPhone = document.getElementById("businessPhone");
const businessAddress = document.getElementById("businessAddress");
const businessLogoUrl = document.getElementById("businessLogoUrl");
const businessPrimaryColor = document.getElementById(
  "businessPrimaryColor"
);
const businessSecondaryColor = document.getElementById(
  "businessSecondaryColor"
);
const businessActive = document.getElementById("businessActive");
const businessFormMessage = document.getElementById(
  "businessFormMessage"
);
const saveBusinessButton = document.getElementById(
  "saveBusinessButton"
);
const newBusinessButton = document.getElementById(
  "newBusinessButton"
);
const closeBusinessModalButton = document.getElementById(
  "closeBusinessModal"
);
const cancelBusinessButton = document.getElementById(
  "cancelBusinessButton"
);
const toast = document.getElementById("toast");

let businessesCache = [];
let selectedBusiness = null;


/* ==================================================
   NAVEGACIÓN
================================================== */

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


/* ==================================================
   SLUG
================================================== */

function normalizeSlug(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


/* ==================================================
   MODAL COMERCIO
================================================== */

function openBusinessModal() {
  if (!businessForm || !businessModal) {
    return;
  }

  businessForm.reset();

  if (businessPrimaryColor) {
    businessPrimaryColor.value = "#7c3aed";
  }

  if (businessSecondaryColor) {
    businessSecondaryColor.value = "#f5c518";
  }

  if (businessActive) {
    businessActive.checked = true;
  }

  if (businessSlug) {
    businessSlug.dataset.manual = "";
  }

  if (businessFormMessage) {
    businessFormMessage.textContent = "";
    businessFormMessage.classList.remove("success");
  }

  businessModal.classList.add("open");
  businessModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  setTimeout(() => {
    businessName?.focus();
  }, 50);
}


function closeBusinessModal() {
  if (!businessModal) {
    return;
  }

  businessModal.classList.remove("open");
  businessModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");

  if (businessFormMessage) {
    businessFormMessage.textContent = "";
    businessFormMessage.classList.remove("success");
  }
}


newBusinessButton?.addEventListener(
  "click",
  openBusinessModal
);


closeBusinessModalButton?.addEventListener(
  "click",
  closeBusinessModal
);


cancelBusinessButton?.addEventListener(
  "click",
  closeBusinessModal
);


document
  .querySelector("[data-close-modal]")
  ?.addEventListener(
    "click",
    closeBusinessModal
  );


document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    businessModal?.classList.contains("open")
  ) {
    closeBusinessModal();
  }
});


businessName?.addEventListener("input", () => {
  if (!businessSlug?.dataset.manual) {
    businessSlug.value = normalizeSlug(
      businessName.value
    );
  }
});


businessSlug?.addEventListener("input", () => {
  businessSlug.dataset.manual =
    businessSlug.value.trim()
      ? "true"
      : "";

  businessSlug.value = normalizeSlug(
    businessSlug.value
  );
});


/* ==================================================
   PETICIONES A SUPABASE
================================================== */

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

  const responseText =
    await response.text();

  if (!response.ok) {
    throw new Error(
      `${tableName}: ${response.status} ${responseText}`
    );
  }

  if (!responseText.trim()) {
    return [];
  }

  try {
    const data =
      JSON.parse(responseText);

    return Array.isArray(data)
      ? data
      : [];

  } catch (error) {
    throw new Error(
      `${tableName}: Supabase devolvió una respuesta inválida.`
    );
  }
}


async function insertTableRow(
  tableName,
  payload
) {
  const response = await fetch(
    `${SUPABASE_REST}/${tableName}`,
    {
      method: "POST",

      headers: supabaseHeaders({
        Prefer: "return=minimal"
      }),

      body: JSON.stringify(payload)
    }
  );

  const responseText =
    await response.text();

  if (!response.ok) {
    throw new Error(
      `${tableName}: ${response.status} ${responseText}`
    );
  }

  return true;
}


/* ==================================================
   SEGURIDAD HTML
================================================== */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* ==================================================
   MENSAJES
================================================== */

function showToast(
  message,
  type = "success"
) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.className =
    `toast show ${type}`;

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(() => {
      toast.className = "toast";
    }, 3200);
}


/* ==================================================
   DASHBOARD
================================================== */

async function loadDashboard() {
  try {
    const [
      businesses,
      categories,
      products,
      users
    ] = await Promise.all([
      getTableData(
        "businesses",
        "id"
      ),

      getTableData(
        "categories",
        "id"
      ),

      getTableData(
        "products",
        "id"
      ),

      getTableData(
        "users",
        "id"
      )
    ]);

    const businessesCount =
      document.getElementById(
        "businessesCount"
      );

    const categoriesCount =
      document.getElementById(
        "categoriesCount"
      );

    const productsCount =
      document.getElementById(
        "productsCount"
      );

    const usersCount =
      document.getElementById(
        "usersCount"
      );

    if (businessesCount) {
      businessesCount.textContent =
        businesses.length;
    }

    if (categoriesCount) {
      categoriesCount.textContent =
        categories.length;
    }

    if (productsCount) {
      productsCount.textContent =
        products.length;
    }

    if (usersCount) {
      usersCount.textContent =
        users.length;
    }

  } catch (error) {
    console.error(
      "Error cargando dashboard:",
      error
    );
  }
}


/* ==================================================
   LISTAS GENERALES
================================================== */

async function renderList(
  tableName,
  containerId,
  select,
  renderItem,
  emptyText
) {
  const container =
    document.getElementById(
      containerId
    );

  if (!container) {
    return;
  }

  try {
    const rows =
      await getTableData(
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
      rows
        .map(renderItem)
        .join("");

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


/* ==================================================
   COMERCIOS
================================================== */

async function loadBusinesses() {
  const container = document.getElementById("businessesList");

  if (!container) {
    return;
  }

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

        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">

          <span>
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
    console.error("Error cargando businesses:", error);

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
        String(item.id) === String(button.dataset.businessId)
    );

    if (business) {
      openBusinessDetailModal(business);
    }
  });

function createBusinessDetailModal() {
  if (document.getElementById("businessDetailModal")) {
    return;
  }

  const modal = document.createElement("div");

  modal.id = "businessDetailModal";
  modal.className = "modal";
  modal.setAttribute("aria-hidden", "true");

  modal.innerHTML = `
    <div
      class="modal-backdrop"
      data-close-business-detail
    ></div>

    <div
      class="modal-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="businessDetailTitle"
    >

      <div class="modal-header">

        <div>
          <p class="eyebrow">COMERCIO</p>
          <h2 id="businessDetailTitle">
            Detalle del comercio
          </h2>
        </div>

        <button
          type="button"
          class="close-button"
          id="closeBusinessDetailButton"
          aria-label="Cerrar"
        >
          &times;
        </button>

      </div>

      <div
        id="businessDetailContent"
        style="display:grid;gap:14px;"
      ></div>

      <div
        class="modal-actions"
        style="flex-wrap:wrap;"
      >

        <button
          type="button"
          class="secondary-button"
          id="businessCategoriesButton"
        >
          Categorías
        </button>

        <button
          type="button"
          class="secondary-button"
          id="businessProductsButton"
        >
          Productos
        </button>

        <button
          type="button"
          class="primary-button"
          id="businessStoreButton"
        >
          Ver catálogo
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(modal);

  modal
    .querySelector("[data-close-business-detail]")
    ?.addEventListener(
      "click",
      closeBusinessDetailModal
    );

  modal
    .querySelector("#closeBusinessDetailButton")
    ?.addEventListener(
      "click",
      closeBusinessDetailModal
    );
}

function openBusinessDetailModal(business) {
  createBusinessDetailModal();
  createCategoryModal();

  const modal =
    document.getElementById("businessDetailModal");

  const title =
    document.getElementById("businessDetailTitle");

  const content =
    document.getElementById("businessDetailContent");

  title.textContent = business.name || "Comercio";

  content.innerHTML = `
    <div>
      <strong>Enlace</strong>
      <div>${escapeHTML(business.slug || "-")}</div>
    </div>

    <div>
      <strong>WhatsApp</strong>
      <div>${escapeHTML(business.phone || "-")}</div>
    </div>

    <div>
      <strong>Dirección</strong>
      <div>${escapeHTML(business.address || "-")}</div>
    </div>

    <div>
      <strong>Estado</strong>
      <div>${business.active ? "Activo" : "Inactivo"}</div>
    </div>
  `;

  document.getElementById(
    "businessCategoriesButton"
  ).onclick = async () => {
    selectedBusiness = business;

    closeBusinessDetailModal();
    openSection("categories");

    await loadCategories();
  };

  document.getElementById(
    "businessProductsButton"
  ).onclick = () => {
    closeBusinessDetailModal();
    openSection("products");
  };

  document.getElementById(
    "businessStoreButton"
  ).onclick = () => {
    const url =
      `index.html?business=${encodeURIComponent(
        business.slug || ""
      )}`;

    window.open(url, "_blank");
  };

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeBusinessDetailModal() {
  const modal =
    document.getElementById("businessDetailModal");

  if (!modal) {
    return;
  }

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

/* ==================================================
   CATEGORÍAS
================================================== */

function createCategoryModal() {
  if (document.getElementById("categoryModal")) {
    return;
  }

  const modal = document.createElement("div");

  modal.id = "categoryModal";
  modal.className = "modal";
  modal.setAttribute("aria-hidden", "true");

  modal.innerHTML = `
    <div
      class="modal-backdrop"
      data-close-category-modal
    ></div>

    <div
      class="modal-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="categoryModalTitle"
    >

      <div class="modal-header">

        <div>
          <p class="eyebrow">NUEVA CATEGORÍA</p>
          <h2 id="categoryModalTitle">
            Crear categoría
          </h2>
        </div>

        <button
          type="button"
          class="close-button"
          id="closeCategoryModalButton"
          aria-label="Cerrar"
        >
          &times;
        </button>

      </div>

      <form id="categoryForm">

        <div class="form-grid">

          <label class="full-width">
            Nombre de la categoría

            <input
              id="categoryName"
              type="text"
              required
            >
          </label>

          <label>
            Orden

            <input
              id="categorySortOrder"
              type="number"
              min="0"
              value="0"
            >
          </label>

          <label class="checkbox-label">
            <input
              id="categoryActive"
              type="checkbox"
              checked
            >

            Categoría activa
          </label>

        </div>

        <p
          id="categoryFormMessage"
          class="form-message"
        ></p>

        <div class="modal-actions">

          <button
            type="button"
            class="secondary-button"
            id="cancelCategoryButton"
          >
            Cancelar
          </button>

          <button
            type="submit"
            class="primary-button"
            id="saveCategoryButton"
          >
            Guardar categoría
          </button>

        </div>

      </form>

    </div>
  `;

  document.body.appendChild(modal);

  modal
    .querySelector("[data-close-category-modal]")
    ?.addEventListener("click", closeCategoryModal);

  modal
    .querySelector("#closeCategoryModalButton")
    ?.addEventListener("click", closeCategoryModal);

  modal
    .querySelector("#cancelCategoryButton")
    ?.addEventListener("click", closeCategoryModal);

  modal
    .querySelector("#categoryForm")
    ?.addEventListener("submit", saveCategory);
}

function openCategoryModal() {
  if (!selectedBusiness) {
    showToast(
      "Primero seleccioná un comercio.",
      "error"
    );
    return;
  }

  createCategoryModal();

  const modal =
    document.getElementById("categoryModal");

  const form =
    document.getElementById("categoryForm");

  const message =
    document.getElementById("categoryFormMessage");

  form.reset();

  document.getElementById(
    "categorySortOrder"
  ).value = "0";

  document.getElementById(
    "categoryActive"
  ).checked = true;

  message.textContent = "";

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  setTimeout(() => {
    document.getElementById(
      "categoryName"
    )?.focus();
  }, 50);
}

function closeCategoryModal() {
  const modal =
    document.getElementById("categoryModal");

  if (!modal) {
    return;
  }

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

async function saveCategory(event) {
  event.preventDefault();

  const name =
    document.getElementById(
      "categoryName"
    ).value.trim();

  const sortOrder =
    Number(
      document.getElementById(
        "categorySortOrder"
      ).value || 0
    );

  const active =
    document.getElementById(
      "categoryActive"
    ).checked;

  const message =
    document.getElementById(
      "categoryFormMessage"
    );

  const saveButton =
    document.getElementById(
      "saveCategoryButton"
    );

  if (!name) {
    message.textContent =
      "Escribí el nombre de la categoría.";
    return;
  }

  saveButton.disabled = true;
  saveButton.textContent = "Guardando...";
  message.textContent = "";

  try {
    await insertTableRow(
      "categories",
      {
        business_id: selectedBusiness.id,
        name,
        sort_order: sortOrder,
        active
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
    console.error(
      "Error creando categoría:",
      error
    );

    message.textContent =
      "No se pudo crear la categoría.";
  } finally {
    saveButton.disabled = false;
    saveButton.textContent =
      "Guardar categoría";
  }
}

async function loadCategories() {
  const container =
    document.getElementById("categoriesList");

  if (!container) {
    return;
  }

  if (!selectedBusiness) {
    container.className =
      "panel empty-state";

    container.innerHTML = `
      Seleccioná un comercio desde la sección
      <strong>Comercios</strong> para administrar sus categorías.
    `;

    return;
  }

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
      <div
        style="
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:16px;
          flex-wrap:wrap;
          margin-bottom:18px;
        "
      >
        <div>
          <strong>
            ${escapeHTML(selectedBusiness.name)}
          </strong>

          <small style="display:block;margin-top:4px;">
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

    if (!filtered.length) {
      container.className = "panel";
      container.innerHTML =
        header +
        `<div class="empty-state">
          Todavía no hay categorías para este comercio.
        </div>`;
    } else {
      container.className = "panel";

      container.innerHTML =
        header +
        filtered.map((category) => `
          <div class="list-item">

            <div>
              <strong>
                ${escapeHTML(
                  category.name || "Sin nombre"
                )}
              </strong>

              <small>
                Orden:
                ${Number(category.sort_order || 0)}
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
        `).join("");
    }

    document
      .getElementById("newCategoryButton")
      ?.addEventListener(
        "click",
        openCategoryModal
      );

  } catch (error) {
    console.error(
      "Error cargando categorías:",
      error
    );

    container.className = "panel error";
    container.textContent =
      "No se pudieron cargar las categorías.";
  }
}

/* ==================================================
   PRODUCTOS
================================================== */

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
              product.name ||
              "Sin nombre"
            )}
          </strong>

          <small>

            Comercio ID:

            ${escapeHTML(
              product.business_id ||
              "-"
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


/* ==================================================
   USUARIOS
================================================== */

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
              user.role ||
              "Sin rol"
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


/* ==================================================
   GUARDAR COMERCIO
================================================== */

businessForm?.addEventListener(
  "submit",

  async (event) => {
    event.preventDefault();

    const name =
      businessName?.value.trim() ||
      "";

    const slug =
      normalizeSlug(
        businessSlug?.value ||
        name
      );

    if (!name) {
      businessFormMessage.textContent =
        "Escribí el nombre del comercio.";

      businessName?.focus();

      return;
    }

    if (!slug) {
      businessFormMessage.textContent =
        "Escribí un enlace válido.";

      businessSlug?.focus();

      return;
    }

    businessSlug.value = slug;

    saveBusinessButton.disabled =
      true;

    saveBusinessButton.textContent =
      "Guardando...";

    businessFormMessage.textContent =
      "";

    businessFormMessage.classList.remove(
      "success"
    );

    const payload = {
      name,

      slug,

      phone:
        businessPhone?.value.trim() ||
        null,

      address:
        businessAddress?.value.trim() ||
        null,

      logo_url:
        businessLogoUrl?.value.trim() ||
        null,

      primary_color:
        businessPrimaryColor?.value ||
        "#7c3aed",

      secondary_color:
        businessSecondaryColor?.value ||
        "#f5c518",

      active:
        Boolean(
          businessActive?.checked
        )
    };

    try {
      await insertTableRow(
        "businesses",
        payload
      );

      businessFormMessage.textContent =
        "Comercio creado correctamente.";

      businessFormMessage.classList.add(
        "success"
      );

      showToast(
        "Comercio creado correctamente.",
        "success"
      );

      await Promise.all([
        loadDashboard(),
        loadBusinesses()
      ]);

      setTimeout(() => {
        closeBusinessModal();
        openSection("businesses");
      }, 500);

    } catch (error) {
      console.error(
        "Error creando comercio:",
        error
      );

      const errorText =
        String(error.message);

      let message =
        "No se pudo crear el comercio.";

      if (
        errorText.includes(
          "duplicate"
        ) ||
        errorText.includes(
          "23505"
        )
      ) {
        message =
          "Ese enlace ya está siendo utilizado.";

      } else if (
        errorText.includes(
          "row-level security"
        ) ||
        errorText.includes(
          "42501"
        )
      ) {
        message =
          "Supabase bloqueó el guardado por una política RLS.";

      } else if (
        errorText.includes(
          "column"
        ) ||
        errorText.includes(
          "schema cache"
        )
      ) {
        message =
          "Hay una columna faltante o con otro nombre en la tabla businesses.";
      }

      businessFormMessage.textContent =
        message;

      showToast(
        message,
        "error"
      );

    } finally {
      saveBusinessButton.disabled =
        false;

      saveBusinessButton.textContent =
        "Guardar comercio";
    }
  }
);


/* ==================================================
   INICIO
================================================== */

async function initAdmin() {
  createBusinessDetailModal();
  createCategoryModal();

  await Promise.all([
    loadDashboard(),
    loadBusinesses(),
    loadCategories(),
    loadProducts(),
    loadUsers()
  ]);
}


initAdmin();
