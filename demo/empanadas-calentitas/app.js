const categories=[
{name:'Empanadas',img:'cat-empanadas.jpg'},
{name:'Bocatas',img:'cat-bocatas.jpg'},
{name:'Hamburguesas',img:'cat-hamburguesas.jpg'},
{name:'Ensaladas',img:'cat-ensaladas.jpg'},
{name:'Postres',img:'cat-postres.jpg'},
{name:'Promos',img:'cat-promos.jpg'}];

const products=[
{id:1,c:'Empanadas',n:'Carne clásica',d:'Carne, cebolla, morrón y especias.',p:85,img:'prod-carne.jpg'},
{id:2,c:'Empanadas',n:'Jamón y queso',d:'Jamón cocido y muzzarella.',p:85,img:'prod-jamon.jpg'},
{id:3,c:'Empanadas',n:'Pollo',d:'Pollo, cebolla y especias.',p:85,img:'prod-pollo.jpg'},
{id:4,c:'Empanadas',n:'Capresse',d:'Muzzarella, tomate y albahaca.',p:85,img:'prod-capresse.jpg'},
{id:5,c:'Bocatas',n:'Bocata clásica',d:'Pan artesanal, fiambre, queso y vegetales.',p:280,img:'cat-bocatas.jpg'},
{id:6,c:'Hamburguesas',n:'Hamburguesa completa',d:'Carne, queso, vegetales y salsa.',p:280,img:'cat-hamburguesas.jpg'},
{id:7,c:'Ensaladas',n:'Ensalada fresca',d:'Mix de hojas, tomate y vegetales.',p:220,img:'cat-ensaladas.jpg'},
{id:8,c:'Postres',n:'Torta de chocolate',d:'Porción de postre.',p:150,img:'cat-postres.jpg'},
{id:9,c:'Promos',n:'Promo Calentitas',d:'Oferta especial de demostración.',p:480,img:'cat-promos.jpg'}];

let cat=null, mode='Delivery';
const cart=new Map(),$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const money=n=>'$ '+n.toLocaleString('es-UY');
function renderCats(){ $('#categories').innerHTML=categories.map(c=>`<button class="cat ${cat===c.name?'active':''}" data-cat="${c.name}"><img src="assets/${c.img}" alt=""><span>${c.name.toUpperCase()}</span></button>`).join('');$$('.cat').forEach(b=>b.onclick=()=>{cat=b.dataset.cat;renderCats();renderProducts();$('#catalogSection').scrollIntoView({behavior:'smooth'})})}
function visible(){return cat?products.filter(p=>p.c===cat):products.slice(0,4)}
function renderProducts(){let list=visible();$('#catalogTitle').innerHTML=(cat?cat:'Destacados')+' <span>✦</span>';$('#products').innerHTML=list.map(p=>`<article class="product"><div class="prod-img"><img src="assets/${p.img}" alt="${p.n}"></div><div class="prod-body"><h3>${p.n}</h3><p>${p.d}</p><div class="price">${money(p.p)}</div><div class="qty"><button data-m="${p.id}">−</button><span>${cart.get(p.id)||0}</span><button data-p="${p.id}">+</button></div></div></article>`).join('');$$('[data-p]').forEach(b=>b.onclick=()=>chg(+b.dataset.p,1));$$('[data-m]').forEach(b=>b.onclick=()=>chg(+b.dataset.m,-1))}
function chg(id,d){let q=Math.max(0,(cart.get(id)||0)+d);q?cart.set(id,q):cart.delete(id);renderProducts();update()}
function totals(){let n=0,t=0;cart.forEach((q,id)=>{let p=products.find(x=>x.id===id);n+=q;t+=q*p.p});return[n,t]}
function update(){let[n,t]=totals(); if($('#cartBadge')) $('#cartBadge').textContent=n; if($('#navBadge')) $('#navBadge').textContent=n; if($('#floatingCount')) $('#floatingCount').textContent=n; if($('#floatingTotal')) $('#floatingTotal').textContent=money(t); if($('#floatingCart')) $('#floatingCart').classList.toggle('show',n>0)}
function open(id){$(id).classList.add('open');document.body.style.overflow='hidden'}function close(){$$('.modal').forEach(m=>m.classList.remove('open'));document.body.style.overflow=''}
function renderCart(){let h='';cart.forEach((q,id)=>{let p=products.find(x=>x.id===id);h+=`<div class="cart-row"><div><b>${p.n}</b><p>${p.d}</p><strong>${money(p.p*q)}</strong></div><div class="controls"><button data-cm="${id}">−</button><b>${q}</b><button data-cp="${id}">+</button></div></div>`});$('#cartItems').innerHTML=h||'<p>Tu pedido está vacío.</p>';$('#cartTotal').textContent=money(totals()[1]);$$('[data-cp]').forEach(b=>b.onclick=()=>{chg(+b.dataset.cp,1);renderCart()});$$('[data-cm]').forEach(b=>b.onclick=()=>{chg(+b.dataset.cm,-1);renderCart()})}
function openCart(){renderCart();open('#cartModal')}
if($('#cartTop')) $('#cartTop').onclick=openCart; if($('#navCart')) $('#navCart').onclick=openCart; if($('#floatingCart')) $('#floatingCart').onclick=openCart;$('#navHome').onclick=()=>scrollTo({top:0,behavior:'smooth'});$('#navCategories').onclick=$('#backCategories').onclick=()=>$('#categoriesSection').scrollIntoView({behavior:'smooth'});
$$('.close').forEach(b=>b.onclick=close);$$('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)close()});
$('#checkout').onclick=()=>{if(!cart.size)return;close();open('#checkoutModal')};$$('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;$$('[data-mode]').forEach(x=>x.classList.toggle('active',x.dataset.mode===mode));$('#addressField').style.display=mode==='Delivery'?'block':'none'});
$('#finish').onclick=()=>{if(!$('#name').value.trim())return alert('Escribí un nombre.');close();open('#successModal')};$('#restart').onclick=()=>{cart.clear();cat=null;update();renderCats();renderProducts();close();scrollTo({top:0,behavior:'smooth'})};
renderCats();renderProducts();update();