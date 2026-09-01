const C=[
  {name:'Empanadas',img:'empanadas-caja.jpg'},
  {name:'Bocatas',img:'bocata-lomito.jpg'},
  {name:'Hamburguesas',img:'hamburguesa-papas.jpg'},
  {name:'Ensaladas',icon:'🥗'},
  {name:'Postres',icon:'🍰'},
  {name:'Promos',icon:'⭐'}
];

const P=[
  {id:1,c:'Empanadas',n:'Fugazzeta',d:'Muzzarella y cebollas',p:80,a:'fugazzeta.jpg'},
  {id:2,c:'Empanadas',n:'Aceitunas y queso',d:'Aros de aceitunas y queso',p:80,a:'aceitunas.jpg'},
  {id:3,c:'Empanadas',n:'Jamón y queso',d:'Jamón en cubos y queso',p:80,a:'jamon.jpg'},
  {id:4,c:'Empanadas',n:'Capresse',d:'Quesos, tomate y albahaca',p:80,a:'capresse.jpg'},
  {id:5,c:'Empanadas',n:'Puerro y queso',d:'Puerro, zanahoria y quesos',p:80,a:'puerro.jpg'},
  {id:6,c:'Empanadas',n:'Humita',d:'Relleno de humita',p:80,a:'humita.jpg'},
  {id:7,c:'Empanadas',n:'Primavera',d:'Sabor primavera',p:80,a:'primavera.jpg'},
  {id:8,c:'Empanadas',n:'Espinaca',d:'Relleno de espinaca',p:80,a:'espinaca.jpg'},
  {id:9,c:'Empanadas',n:'Carne',d:'Empanada de carne',p:80,a:'carne.jpg'},
  {id:10,c:'Empanadas',n:'Carne dulce',d:'Sabor tradicional',p:80,a:'carne-dulce.jpg'},
  {id:11,c:'Empanadas',n:'Carne picante',d:'Con un toque picante',p:80,a:'carne-picante.jpg'},
  {id:12,c:'Empanadas',n:'Pollo',d:'Relleno de pollo',p:80,a:'pollo.jpg'},
  {id:13,c:'Empanadas',n:'Panceta',d:'Relleno de panceta',p:80,a:'panceta.jpg'},
  {id:14,c:'Empanadas',n:'Bondiola',d:'Relleno de bondiola',p:80,a:'bondiola.jpg'},
  {id:15,c:'Empanadas',n:'Manzana',d:'Empanada dulce',p:80,a:'manzana.jpg'},
  {id:16,c:'Empanadas',n:'Chocolate',d:'Empanada dulce',p:80,a:'chocolate.jpg'},
  {id:17,c:'Empanadas',n:'Membrillo',d:'Empanada dulce',p:80,a:'membrillo.jpg'},
  {id:18,c:'Bocatas',n:'Bocata de jamón y queso',d:'Queso muzzarella y jamón · pan artesanal de aprox. 15 cm',p:280,a:'bocata-lomito.jpg'},
  {id:19,c:'Bocatas',n:'Bocata de lomito y cheddar',d:'Queso muzzarella, lomito y cheddar · pan artesanal',p:280,a:'bocata-lomito.jpg'},
  {id:20,c:'Bocatas',n:'Bocata de rúcula y cebolla',d:'Muzzarella, lomito, tomate, cebolla y rúcula · pan artesanal',p:280,a:'bocata-vegetales.jpg'},
  {id:21,c:'Hamburguesas',n:'Hamburguesa completa',d:'Producto real · nombre y precio a confirmar',p:280,a:'hamburguesa-papas.jpg'},
  {id:22,c:'Ensaladas',n:'Ensalada fresca',d:'Producto demostrativo · información a confirmar',p:220,icon:'🥗'},
  {id:23,c:'Postres',n:'Postre del día',d:'Producto demostrativo · información a confirmar',p:150,icon:'🍰'},
  {id:24,c:'Promos',n:'Promo Calentitas',d:'Combinación demostrativa para destacar ofertas del comercio',p:480,a:'empanadas-caja.jpg'}
];

const cart=new Map();
let currentCategory=null;
let fulfillment='Delivery';
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const money=n=>'$ '+Number(n).toLocaleString('es-UY');

function renderCategories(){
  $('#categories').innerHTML=C.map(c=>`
    <button class="category-card ${currentCategory===c.name?'active':''}" data-cat="${c.name}">
      ${c.img?`<img src="assets/${c.img}" alt="">`:`<span class="icon">${c.icon}</span>`}
      <span>${c.name.toUpperCase()}</span>
    </button>`).join('');
  $$('.category-card').forEach(b=>b.onclick=()=>{
    currentCategory=b.dataset.cat;
    renderCategories(); renderProducts();
    $('#catalog').scrollIntoView({behavior:'smooth',block:'start'});
  });
}

function currentProducts(){
  if(currentCategory) return P.filter(p=>p.c===currentCategory);
  return [1,3,2,4,18,21].map(id=>P.find(p=>p.id===id));
}

function renderProducts(){
  const list=currentProducts();
  $('#catalogTitle').textContent=currentCategory?currentCategory+' ✦':'Para empezar ✦';
  $('#catalogEyebrow').textContent=currentCategory?'CATEGORÍA':'DESTACADOS';
  $('#products').innerHTML=list.map(p=>`
    <article class="product-card">
      <div class="product-photo">${p.a?`<img src="assets/${p.a}" alt="${p.n}">`:`<div style="font-size:62px;display:grid;place-items:center;height:100%">${p.icon}</div>`}</div>
      <div class="category">${p.c.toUpperCase()}</div>
      <h4>${p.n}</h4><p>${p.d}</p><div class="price">${money(p.p)}</div>
      <div class="qty"><button data-minus="${p.id}">−</button><span>${cart.get(p.id)||0}</span><button data-plus="${p.id}">+</button></div>
    </article>`).join('');
  $$('[data-plus]').forEach(b=>b.onclick=()=>change(+b.dataset.plus,1));
  $$('[data-minus]').forEach(b=>b.onclick=()=>change(+b.dataset.minus,-1));
}

function change(id,d){
  const q=Math.max(0,(cart.get(id)||0)+d);
  q?cart.set(id,q):cart.delete(id);
  renderProducts(); updateCart();
}
function totals(){let n=0,t=0;cart.forEach((q,id)=>{const p=P.find(x=>x.id===id);n+=q;t+=q*p.p});return[n,t]}
function updateCart(){const[n,t]=totals();$('#badge').textContent=n;$('#floatingCount').textContent=n;$('#floatingTotal').textContent=money(t);$('#floatingCart').classList.toggle('show',n>0)}
function open(id){$(id).classList.add('open');document.body.style.overflow='hidden'}
function close(){ $$('.modal').forEach(m=>m.classList.remove('open'));document.body.style.overflow='' }
function renderCart(){
  let h='';
  cart.forEach((q,id)=>{const p=P.find(x=>x.id===id);h+=`<div class="cart-row"><div><b>${p.n}</b><p>${p.c} · ${p.d}</p><strong>${money(p.p*q)}</strong></div><div class="controls"><button data-cm="${id}">−</button><b>${q}</b><button data-cp="${id}">+</button></div></div>`});
  $('#cartItems').innerHTML=h||'<p>Tu pedido está vacío.</p>';
  $('#cartTotal').textContent=money(totals()[1]);
  $$('[data-cp]').forEach(b=>b.onclick=()=>{change(+b.dataset.cp,1);renderCart()});
  $$('[data-cm]').forEach(b=>b.onclick=()=>{change(+b.dataset.cm,-1);renderCart()});
}
function openCart(){renderCart();open('#cartModal')}
function setMode(m){fulfillment=m;$$('[data-mode]').forEach(b=>b.classList.toggle('active',b.dataset.mode===m));$$('[data-check]').forEach(b=>b.classList.toggle('active',b.dataset.check===m));$('#addressField').style.display=m==='Delivery'?'block':'none'}

$('#openCart').onclick=openCart;$('#floatingCart').onclick=openCart;$('#navCart').onclick=openCart;
$('#navCategories').onclick=$('#backCategories').onclick=()=>$('#categorySection').scrollIntoView({behavior:'smooth'});
$$('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
$$('.close').forEach(b=>b.onclick=close);
$$('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)close()});
$('#checkout').onclick=()=>{if(!cart.size)return;close();setMode(fulfillment);open('#checkoutModal')};
$$('[data-check]').forEach(b=>b.onclick=()=>setMode(b.dataset.check));
$('#finish').onclick=()=>{if(!$('#name').value.trim())return alert('Escribí un nombre para completar la simulación.');close();open('#successModal')};
$('#restart').onclick=()=>{cart.clear();currentCategory=null;updateCart();renderCategories();renderProducts();close();window.scrollTo({top:0,behavior:'smooth'})};

renderCategories();renderProducts();updateCart();setMode('Delivery');
