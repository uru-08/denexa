const state = {
  cart: [],
  selectedMode: "",
  expandedProducts: false
};

const categoryGrid = document.getElementById("categoryGrid");
const productsGrid = document.getElementById("productsGrid");
const cartCount = document.getElementById("cartCount");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const toastEl = document.getElementById("toast");

function renderCategories() {
  categoryGrid.innerHTML = "";

  DENEXA_DATA.categories.forEach(category => {
    const button = document.createElement("button");
    button.className = `category-card${category.promo ? " promo" : ""}`;

    button.innerHTML = `
      <img src="${category.image}" alt="${category.name}" loading="lazy">
      <div class="category-footer">
        <span class="category-name">${category.name.toUpperCase()}</span>
        <span class="category-arrow">›</span>
      </div>
    `;

    button.addEventListener("click", () => {
      showToast(`Categoría: ${category.name}`);
    });

    categoryGrid.appendChild(button);
  });
}

function renderProducts() {
  productsGrid.innerHTML = "";

  const list = state.expandedProducts
    ? DENEXA_DATA.products
    : DENEXA_DATA.products.slice(0, 4);

  list.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <div class="product-info">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <div class="product-bottom">
          <span class="product-price">$${product.price}</span>
          <button class="add-button" aria-label="Agregar ${product.name}">+</button>
        </div>
      </div>
    `;

    card.querySelector(".add-button").addEventListener("click", () => {
      addToCart(product);
    });

    productsGrid.appendChild(card);
  });
}

function addToCart(product) {
  state.cart.push(product);
  updateCart();
  showToast(`${product.name} agregado`);
}

function updateCart() {
  cartCount.textContent = state.cart.length;
  cartItems.innerHTML = "";

  state.cart.forEach(product => {
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <span>${product.name}</span>
      <strong>$${product.price}</strong>
    `;
    cartItems.appendChild(row);
  });

  const total = state.cart.reduce((sum, product) => sum + product.price, 0);
  cartTotal.textContent = `$${total}`;
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");

  clearTimeout(window.denexaToastTimer);
  window.denexaToastTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 1600);
}

function openCart() {
  updateCart();
  cartOverlay.classList.add("open");
}

function closeCart() {
  cartOverlay.classList.remove("open");
}

document.querySelectorAll("[data-mode]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-mode]").forEach(item => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");
    state.selectedMode = button.dataset.mode;
    showToast(`Modalidad: ${state.selectedMode}`);
  });
});

document.getElementById("showAllProducts").addEventListener("click", () => {
  state.expandedProducts = true;
  renderProducts();
  document.getElementById("showAllProducts").textContent = "Todos visibles";
});

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("navCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);

document.getElementById("goProducts").addEventListener("click", () => {
  document.getElementById("productsSection").scrollIntoView();
});

document.getElementById("goPromo").addEventListener("click", () => {
  const promo = document.querySelector(".category-card.promo");
  if (promo) {
    promo.scrollIntoView({ block: "center" });
  }
});

document.getElementById("checkoutButton").addEventListener("click", () => {
  if (state.cart.length === 0) {
    showToast("Tu carrito está vacío");
    return;
  }

  if (!state.selectedMode) {
    closeCart();
    showToast("Elegí Delivery o Retiro en local");
    return;
  }

  closeCart();
  showToast("Siguiente paso: datos del cliente");
});

cartOverlay.addEventListener("click", event => {
  if (event.target === cartOverlay) {
    closeCart();
  }
});

renderCategories();
renderProducts();
updateCart();
