const categories=[
  {name:'Empanadas',img:'empanadas-caja.jpg'},
  {name:'Bocatas',img:'bocata-lomito.jpg'},
  {name:'Hamburguesas',img:'hamburguesa-papas.jpg'},
  {name:'Ensaladas',icon:'🥗'},
  {name:'Postres',icon:'🍰'},
  {name:'Promos',icon:'⭐'}
];

const products=[
  {id:1,c:'Empanadas',n:'Fugazzeta',d:'Muzzarella y cebollas',p:80,img:'empanadas-abiertas.jpg'},
  {id:2,c:'Empanadas',n:'Aceitunas y queso',d:'Aros de aceitunas y queso',p:80,img:'empanadas-caja.jpg'},
  {id:3,c:'Empanadas',n:'Jamón y queso',d:'Jamón en cubos y queso',p:80,img:'empanadas-caja.jpg'},
  {id:4,c:'Empanadas',n:'Capresse',d:'Quesos, tomate y albahaca',p:80,img:'empanadas-abiertas.jpg'},
  {id:5,c:'Empanadas',n:'Carne',d:'Empanada de carne',p:80,img:'empanadas-abiertas.jpg'},
  {id:6,c:'Empanadas',n:'Carne dulce',d:'Sabor tradicional',p:80,img:'empanadas-caja.jpg'},
  {id:7,c:'Empanadas',n:'Carne picante',d:'Con un toque picante',p:80,img:'empanadas-abiertas.jpg'},
  {id:8,c:'Empanadas',n:'Pollo',d:'Relleno de pollo',p:80,img:'empanadas-caja.jpg'},
  {id:9,c:'Empanadas',n:'Panceta',d:'Relleno de panceta',p:80,img:'empanadas-caja.jpg'},
  {id:10,c:'Empanadas',n:'Bondiola',d:'Relleno de bondiola',p:80,img:'empanadas-abiertas.jpg'},
  {id:11,c:'Empanadas',n:'Puerro y queso',d:'Puerro, zanahoria y quesos',p:80,img:'empanadas-caja.jpg'},
  {id:12,c:'Empanadas',n:'Humita',d:'Relleno de humita',p:80,img:'empanadas-caja.jpg'},
  {id:13,c:'Empanadas',n:'Primavera',d:'Sabor primavera',p:80,img:'empanadas-caja.jpg'},
  {id:14,c:'Empanadas',n:'Espinaca',d:'Relleno de espinaca',p:80,img:'empanadas-caja.jpg'},
  {id:15,c:'Empanadas',n:'Manzana',d:'Empanada dulce',p:80,img:'empanadas-caja.jpg'},
  {id:16,c:'Empanadas',n:'Chocolate',d:'Empanada dulce',p:80,img:'empanadas-caja.jpg'},
  {id:17,c:'Empanadas',n:'Membrillo',d:'Empanada dulce',p:80,img:'empanadas-caja.jpg'},

  {id:18,c:'Bocatas',n:'Bocata de jamón y queso',d:'Queso muzzarella y jamón · pan artesanal de aprox. 15 cm',p:280,img:'bocata-lomito.jpg'},
  {id:19,c:'Bocatas',n:'Bocata de lomito y cheddar',d:'Queso muzzarella, lomito y cheddar · pan artesanal',p:280,img:'bocata-lomito.jpg'},
  {id:20,c:'Bocatas',n:'Bocata de rúcula y cebolla',d:'Muzzarella, lomito, tomate, cebolla y rúcula · pan artesanal',p:280,img:'bocata-vegetales.jpg'},

  {id:21,c:'Hamburguesas',n:'Hamburguesa completa',d:'Producto real · nombre y precio a confirmar',p:280,img:'hamburguesa-papas.jpg'},
  {id:22,c:'Ensaladas',n:'Ensalada fresca',d:'Producto demostrativo · información a confirmar',p:220,icon:'🥗'},
  {id:23,c:'Postres',n:'Postre del día',d:'Producto demostrativo · información a confirmar',p:150,icon:'🍰'},
  {id:24,c:'Promos',n:'Promo Calentitas',d:'Combinación demostrativa para destacar ofertas del comercio',p:480,img:'empanadas-caja.jpg'}
];

const cart=new Map();
let currentCategory=null;
let fulfillment='Delivery';

const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const money=n=>'$ '+Number(n).toLocaleString('es-UY');

function renderCategories(){
  $('#categories').innerHTML=categories.map(c=>`
    <button class="category-card ${currentCategory===c.name?'active':''}" data-category="${c.name}">
      ${c.img?`<img src="assets/${c.img}" alt="">`:`<span class="icon">${c.icon}</span>`}
      <span>${c.name.toUpperCase()}</span>
    </button>`).join('');

  $$('.category-card').forEach(b=>b.onclick=()=>{
    currentCategory=b.dataset.category;
    renderCategories();
    renderProducts();
    $('#catalogSection').scrollIntoView({behavior:'smooth',block:'start'});
  });
}

function visibleProducts(){
  if(currentCategory) return products.filter(p=>p.c===currentCategory);
  return [1,3,2,4,18,21].map(id=>products.find(p=>p.id===id));
}

function renderProducts(){
  const list=visibleProducts();
  $('#catalogTitle').textContent=currentCategory?currentCategory+' ✦':'Favoritos de la casa ✦';
  $('#catalogEyebrow').textContent=currentCategory?'CATEGORÍA':'DESTACADOS';

  $('#products').innerHTML=list.map(p=>`
    <article class="product-card">
      <div class="product-photo">
        ${p.img?`<img src="assets/${p.img}" alt="${p.n}">`:`<div style="height:100%;display:grid;place-items:center;font-size:62px">${p.icon}</div>`}
      </div>
      <div class="product-category">${p.c.toUpperCase()}</div>
      <h4>${p.n}</h4>
      <p>${p.d}</p>
      <div class="product-price">${money(p.p)}</div>
      <div class="qty">
        <button data-minus="${p.id}">−</button>
        <span>${cart.get(p.id)||0}</span>
        <button data-plus="${p.id}">+</button>
      </div>
    </article>`).join('');

  $$('[data-plus]').forEach(b=>b.onclick=()=>changeQty(+b.dataset.plus,1));
  $$('[data-minus]').forEach(b=>b.onclick=()=>changeQty(+b.dataset.minus,-1));
}

function changeQty(id,delta){
  const next=Math.max(0,(cart.get(id)||0)+delta);
  next?cart.set(id,next):cart.delete(id);
  renderProducts();
  updateCartUI();
}

function totals(){
  let count=0,total=0;
  cart.forEach((qty,id)=>{
    const p=products.find(x=>x.id===id);
    count+=qty;
    total+=qty*p.p;
  });
  return {count,total};
}

function updateCartUI(){
  const {count,total}=totals();
  $('#cartBadge').textContent=count;
  $('#floatingCount').textContent=count;
  $('#floatingTotal').textContent=money(total);
  $('#floatingCart').classList.toggle('show',count>0);
}

function openModal(id){
  $(id).classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModals(){
  $$('.modal').forEach(m=>m.classList.remove('open'));
  document.body.style.overflow='';
}

function renderCart(){
  let html='';
  cart.forEach((qty,id)=>{
    const p=products.find(x=>x.id===id);
    html+=`
      <div class="cart-row">
        <div><b>${p.n}</b><p>${p.c} · ${p.d}</p><strong>${money(p.p*qty)}</strong></div>
        <div class="cart-controls">
          <button data-cart-minus="${id}">−</button>
          <b>${qty}</b>
          <button data-cart-plus="${id}">+</button>
        </div>
      </div>`;
  });
  $('#cartItems').innerHTML=html||'<p>Tu pedido está vacío.</p>';
  $('#cartTotal').textContent=money(totals().total);
  $$('[data-cart-plus]').forEach(b=>b.onclick=()=>{changeQty(+b.dataset.cartPlus,1);renderCart()});
  $$('[data-cart-minus]').forEach(b=>b.onclick=()=>{changeQty(+b.dataset.cartMinus,-1);renderCart()});
}

function openCart(){
  renderCart();
  openModal('#cartModal');
}

function setFulfillment(mode){
  fulfillment=mode;
  $$('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  $$('[data-checkout-mode]').forEach(b=>b.classList.toggle('active',b.dataset.checkoutMode===mode));
  $('#addressField').style.display=mode==='Delivery'?'block':'none';
}

$('#openCartTop').onclick=openCart;
$('#floatingCart').onclick=openCart;
$('#goCart').onclick=openCart;

$('#goHome').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
$('#goCategories').onclick=$('#backCategories').onclick=()=>$('#categoriesSection').scrollIntoView({behavior:'smooth'});

$$('[data-mode]').forEach(b=>b.onclick=()=>setFulfillment(b.dataset.mode));
$$('[data-checkout-mode]').forEach(b=>b.onclick=()=>setFulfillment(b.dataset.checkoutMode));

$$('.close').forEach(b=>b.onclick=closeModals);
$$('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)closeModals()});

$('#checkoutButton').onclick=()=>{
  if(!cart.size)return;
  closeModals();
  setFulfillment(fulfillment);
  openModal('#checkoutModal');
};

$('#finishDemo').onclick=()=>{
  if(!$('#customerName').value.trim()){
    alert('Escribí un nombre para completar la simulación.');
    return;
  }
  closeModals();
  openModal('#successModal');
};

$('#restartDemo').onclick=()=>{
  cart.clear();
  currentCategory=null;
  renderCategories();
  renderProducts();
  updateCartUI();
  closeModals();
  window.scrollTo({top:0,behavior:'smooth'});
};

renderCategories();
renderProducts();
updateCartUI();
setFulfillment('Delivery');
