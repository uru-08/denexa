const state = {
  cart: [],
  selectedMode: "",
  currentCategory: ""
};

const categoryGrid = document.getElementById("categoryGrid");
const productsGrid = document.getElementById("productsGrid");
const categoryOverlay = document.getElementById("categoryOverlay");
const categoryTitle = document.getElementById("categoryTitle");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const toastEl = document.getElementById("toast");

function renderCategories(){
  categoryGrid.innerHTML = "";

  DENEXA_DATA.categories.forEach(category=>{
    const button = document.createElement("button");
    button.className = `category-card${category.promo ? " promo" : ""}`;

    button.innerHTML = `
      <img src="${category.image}" alt="${category.name}" loading="lazy">
      <div class="category-footer">
        <span class="category-name">${category.name.toUpperCase()}</span>
        <span class="category-arrow">›</span>
      </div>
    `;

    button.addEventListener("click",()=>openCategory(category.name));
    categoryGrid.appendChild(button);
  });
}

function openCategory(categoryName){
  state.currentCategory = categoryName;
  categoryTitle.textContent = categoryName;
  productsGrid.innerHTML = "";

  const products = DENEXA_DATA.products.filter(
    product => product.category === categoryName
  );

  if(products.length === 0){
    productsGrid.innerHTML = `<p style="grid-column:1/-1;color:#647c91">Todavía no hay productos cargados en esta categoría.</p>`;
  }

  products.forEach(product=>{
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

    card.querySelector(".add-button").addEventListener("click",()=>{
      addToCart(product);
    });

    productsGrid.appendChild(card);
  });

  categoryOverlay.classList.add("open");
}

function addToCart(product){
  state.cart.push(product);
  updateCart();
  showToast(`${product.name} agregado`);
}

function updateCart(){
  cartCount.textContent = state.cart.length;
  cartItems.innerHTML = "";

  if(state.cart.length === 0){
    cartItems.innerHTML = `<p style="color:#647c91;font-size:12px">Tu carrito está vacío.</p>`;
  }

  state.cart.forEach(product=>{
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `<span>${product.name}</span><strong>$${product.price}</strong>`;
    cartItems.appendChild(row);
  });

  const total = state.cart.reduce((sum,product)=>sum+product.price,0);
  cartTotal.textContent = `$${total}`;
}

function showToast(message){
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(window.denexaToast);
  window.denexaToast = setTimeout(()=>toastEl.classList.remove("show"),1600);
}

function openCart(){
  updateCart();
  cartOverlay.classList.add("open");
}

function closeCart(){
  cartOverlay.classList.remove("open");
}

document.querySelectorAll("[data-mode]").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll("[data-mode]").forEach(item=>item.classList.remove("selected"));
    button.classList.add("selected");
    state.selectedMode = button.dataset.mode;
    showToast(`Modalidad: ${state.selectedMode}`);
  });
});

document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("navCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
document.getElementById("keepShopping").addEventListener("click",closeCart);

document.getElementById("closeCategory").addEventListener("click",()=>{
  categoryOverlay.classList.remove("open");
});

categoryOverlay.addEventListener("click",event=>{
  if(event.target === categoryOverlay){
    categoryOverlay.classList.remove("open");
  }
});

cartOverlay.addEventListener("click",event=>{
  if(event.target === cartOverlay){
    closeCart();
  }
});

document.getElementById("goHome").addEventListener("click",()=>{
  window.scrollTo({top:0,behavior:"smooth"});
});

document.getElementById("goMenu").addEventListener("click",()=>{
  document.getElementById("menuSection").scrollIntoView({behavior:"smooth"});
});

document.getElementById("goPromo").addEventListener("click",()=>{
  openCategory("Promo del día");
});

document.getElementById("checkoutButton").addEventListener("click",()=>{
  if(state.cart.length === 0){
    showToast("Tu carrito está vacío");
    return;
  }

  if(!state.selectedMode){
    closeCart();
    showToast("Elegí Delivery o Retiro en local");
    return;
  }

  closeCart();
  showToast("Siguiente paso: datos del cliente");
});

renderCategories();
updateCart();
