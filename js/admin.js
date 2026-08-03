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
  await renderList(
    "businesses",

    "businessesList",

    "id,name,slug,phone,address,active",

    (business) => `
      <div class="list-item">

        <div>

          <strong>
            ${escapeHTML(
              business.name ||
              "Sin nombre"
            )}
          </strong>

          <small>

            ${escapeHTML(
              business.slug ||
              "Sin enlace"
            )}

            ${
              business.phone
                ? ` · ${escapeHTML(
                    business.phone
                  )}`
                : ""
            }

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


/* ==================================================
   CATEGORÍAS
================================================== */

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
              category.name ||
              "Sin nombre"
            )}
          </strong>

          <small>

            Comercio ID:

            ${escapeHTML(
              category.business_id ||
              "-"
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
  await Promise.all([
    loadDashboard(),
    loadBusinesses(),
    loadCategories(),
    loadProducts(),
    loadUsers()
  ]);
}


initAdmin();
