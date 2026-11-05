const categories = [
  { name: "Hamburguesas", image: "assets/bizzarra.jpg", detail: "Smash, clásicas y de la casa" },
  { name: "Milanesas", image: "assets/napolitana.jpg", detail: "Elegí carne o pollo" },
  { name: "Extras", image: "assets/planb.jpg", detail: "Chivito, cajas y más" },
  { name: "Papas", image: "assets/papas.jpg", detail: "Para acompañar o compartir" }
];
const products = new Map();
const quantities = new Map();
const cart = document.querySelector("#cart");
const items = document.querySelector("#items");
const sample = document.querySelector("#sample");
const simulate = document.querySelector("#simulate");
const notes = document.querySelector("#notes");
const formatMoney = value => "$" + value.toLocaleString("es-UY");

function make(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function sumTotal() {
  return [...quantities.values()].reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
}

function renderCart() {
  const count = [...quantities.values()].reduce((sum, line) => sum + line.quantity, 0);
  document.querySelector("#count").textContent = count;
  document.querySelector("#dock-total").textContent = formatMoney(sumTotal());
  document.querySelector("#total").textContent = formatMoney(sumTotal());
  items.replaceChildren();
  sample.hidden = true;
  simulate.disabled = quantities.size === 0;
  if (!quantities.size) {
    items.textContent = "Agregá un producto de la carta para empezar.";
    return;
  }
  for (const [key, line] of quantities) {
    const row = make("div", "line");
    const info = make("div", "line-info");
    info.append(make("strong", "", line.name));
    if (line.variant) info.append(make("small", "", line.variant));
    if (line.extra) info.append(make("small", "", "Cheddar y panceta +$70"));
    info.append(make("span", "line-price", formatMoney(line.unitPrice * line.quantity)));
    const controls = make("div", "quantity");
    for (const amount of [-1, 1]) {
      if (amount === 1) controls.append(String(line.quantity));
      const button = make("button", "", amount === 1 ? "+" : "−");
      button.type = "button";
      button.setAttribute("aria-label", (amount === 1 ? "Agregar " : "Quitar ") + line.name);
      button.addEventListener("click", () => {
        line.quantity += amount;
        if (line.quantity === 0) quantities.delete(key);
        renderCart();
        const replacement = [...items.querySelectorAll("button")].find(candidate =>
          candidate.getAttribute("aria-label") === button.getAttribute("aria-label"));
        (replacement || cart.querySelector(".close")).focus();
      });
      controls.append(button);
    }
    row.append(info, controls);
    items.append(row);
  }
}

function createProduct(product) {
  const article = make("article", product.image ? "menu-product with-photo" : "menu-product");
  const body = make("div", "product-body");
  if (product.image) {
    const image = make("img", "product-photo");
    image.src = product.image;
    image.alt = product.name + ", foto original de Baajoneras";
    image.loading = "lazy";
    article.append(image);
  }
  const heading = make("div", "product-heading");
  heading.append(make("h3", "", product.name), make("strong", "price", formatMoney(product.price)));
  body.append(heading);
  if (product.description) body.append(make("p", "ingredients", product.description));
  let variantSelect;
  let extraInput;
  if (product.variants) {
    const label = make("label", "product-option", "Elegí tu milanesa");
    variantSelect = make("select", "");
    for (const variant of product.variants) {
      const option = make("option", "", variant);
      option.value = variant;
      variantSelect.append(option);
    }
    label.append(variantSelect);
    body.append(label);
  }
  if (product.addon) {
    const label = make("label", "extra-option");
    extraInput = make("input", "");
    extraInput.type = "checkbox";
    label.append(extraInput, "Cheddar y panceta +$70");
    body.append(label);
  }
  const add = make("button", "add", "Agregar al pedido");
  add.type = "button";
  add.setAttribute("aria-label", "Agregar " + product.name);
  add.append(make("b", "", "+"));
  add.addEventListener("click", () => {
    const variant = variantSelect?.value || "";
    const extra = extraInput?.checked || false;
    const key = [product.id, variant, extra].join("|");
    const line = quantities.get(key) || {
      name: product.name, variant, extra,
      unitPrice: product.price + (extra ? 70 : 0), quantity: 0
    };
    line.quantity += 1;
    quantities.set(key, line);
    renderCart();
    document.querySelector("#notice").textContent = product.name + " agregado al pedido.";
    add.firstChild.textContent = "Agregado";
    clearTimeout(add.feedbackTimer);
    add.feedbackTimer = setTimeout(() => { add.firstChild.textContent = "Agregar al pedido"; }, 1200);
  });
  body.append(add);
  article.append(body);
  return article;
}

async function loadCatalog() {
  const container = document.querySelector("#categories");
  try {
    const response = await fetch("catalog.json?v=7");
    if (!response.ok) throw new Error("No se pudo cargar la carta.");
    const catalog = await response.json();
    catalog.forEach(product => products.set(product.id, product));
    container.replaceChildren();
    for (const category of categories) {
      const entries = catalog.filter(product => product.category === category.name);
      const details = make("details", "category");
      const summary = make("summary", "");
      const badge = make("img", "category-photo");
      badge.src = category.image;
      badge.alt = "";
      badge.width = 84;
      badge.height = 84;
      badge.loading = "lazy";
      const copy = make("span", "category-copy");
      copy.append(make("strong", "", category.name), make("small", "", entries.length + " productos · " + category.detail));
      const indicator = make("span", "category-indicator");
      indicator.setAttribute("aria-hidden", "true");
      summary.append(badge, copy, indicator);
      const content = make("div", "category-products");
      entries.forEach(product => content.append(createProduct(product)));
      details.append(summary, content);
      summary.addEventListener("click", event => {
        event.preventDefault();
        const shouldOpen = !details.open;
        container.querySelectorAll("details").forEach(other => {
          other.open = false;
        });
        details.open = shouldOpen;
        if (shouldOpen) {
          requestAnimationFrame(() => {
            summary.scrollIntoView({ block: "start", behavior: "instant" });
          });
        }
      });
      container.append(details);
    }
  } catch {
    container.textContent = "No pudimos cargar la carta. Volvé a abrir el menú para intentar de nuevo.";
  }
}

document.querySelector("#open-cart").addEventListener("click", () => {
  renderCart();
  cart.showModal();
});
simulate.addEventListener("click", () => {
  const lines = [...quantities.values()].map(line => {
    let detail = line.quantity + " × " + line.name;
    if (line.variant) detail += " (" + line.variant + ")";
    if (line.extra) detail += " + cheddar y panceta";
    return detail + " — " + formatMoney(line.quantity * line.unitPrice);
  });
  let message = "SIMULACIÓN · BAAJONERAS\n\n¡Hola! Quisiera pedir para retirar:\n" + lines.join("\n");
  message += "\n\nTotal de referencia: " + formatMoney(sumTotal());
  if (notes.value.trim()) message += "\nAclaraciones: " + notes.value.trim();
  sample.textContent = message + "\n\nPrecios y disponibilidad a confirmar con el comercio.";
  sample.hidden = false;
});
notes.addEventListener("input", () => { sample.hidden = true; });
const welcomeView = document.querySelector("#welcomeView");
const menuView = document.querySelector("#menuView");
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
document.querySelector("#enterMenu").addEventListener("click", event => {
  event.preventDefault();
  welcomeView.hidden = true;
  menuView.hidden = false;
  document.body.classList.remove("welcome-active");
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.querySelector(".menu-title").setAttribute("tabindex", "-1");
    document.querySelector(".menu-title").focus({ preventScroll: true });
  });
});

renderCart();
loadCatalog();
