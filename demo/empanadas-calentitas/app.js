const categories=[
{name:'Empanadas',img:'empanadas-real.png'},{name:'Bocatas',img:'bocata-real.png'},
{name:'Hamburguesas',img:'hamburguesas.jpg'},{name:'Ensaladas',img:'ensaladas.jpg'},
{name:'Postres',img:'postres.jpg'},{name:'Promos',img:'promos.jpg'}];

const products=[
{id:1,c:'Empanadas',n:'Carne',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:2,c:'Empanadas',n:'Carne dulce',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:3,c:'Empanadas',n:'Carne picante',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:4,c:'Empanadas',n:'Carne cheddar',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:5,c:'Empanadas',n:'Carne y aceitunas',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:6,c:'Empanadas',n:'Pollo',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:7,c:'Empanadas',n:'Desmenuzado',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:8,c:'Empanadas',n:'Panceta',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:9,c:'Empanadas',n:'Bondiola',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:10,c:'Empanadas',n:'Empapancho',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:11,c:'Empanadas',n:'Fugazzeta',d:'Muzzarella y cebollas.',p:80,img:'empanadas-real.png'},
{id:12,c:'Empanadas',n:'Aceitunas y queso',d:'Aros de aceitunas y quesos.',p:80,img:'empanadas-real.png'},
{id:13,c:'Empanadas',n:'Jamón y queso',d:'Jamón en cubos y quesos.',p:80,img:'empanadas-real.png'},
{id:14,c:'Empanadas',n:'Capresse',d:'Quesos, tomate y albahaca.',p:80,img:'empanadas-real.png'},
{id:15,c:'Empanadas',n:'Napolitana',d:'Quesos, jamón, tomate y orégano.',p:80,img:'empanadas-real.png'},
{id:16,c:'Empanadas',n:'Panceta y queso',d:'Cubos de panceta y quesos.',p:80,img:'empanadas-real.png'},
{id:17,c:'Empanadas',n:'Puerro y queso',d:'Puerro, zanahorias y quesos.',p:80,img:'empanadas-real.png'},
{id:18,c:'Empanadas',n:'Humita',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:19,c:'Empanadas',n:'Primavera',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:20,c:'Empanadas',n:'Espinaca',d:'Variedad de empanada.',p:80,img:'empanadas-real.png'},
{id:21,c:'Empanadas',n:'Manzana',d:'Empanada dulce.',p:80,img:'empanadas-real.png'},
{id:22,c:'Empanadas',n:'Chocolate',d:'Empanada dulce.',p:80,img:'empanadas-real.png'},
{id:23,c:'Empanadas',n:'Membrillo',d:'Empanada dulce.',p:80,img:'empanadas-real.png'},
{id:24,c:'Bocatas',n:'Bocata de jamón y queso',d:'Queso muzzarella y jamón · pan artesanal de aprox. 15 cm.',p:280,img:'bocata-real.png'},
{id:25,c:'Bocatas',n:'Bocata de lomito y cheddar',d:'Queso muzzarella, lomito y cheddar · pan artesanal.',p:280,img:'bocata-real.png'},
{id:26,c:'Bocatas',n:'Bocata de rúcula y cebolla',d:'Muzzarella, lomito, tomate, cebolla y rúcula · pan artesanal.',p:280,img:'bocata-real.png'},
{id:27,c:'Hamburguesas',n:'Hamburguesa completa',d:'Producto demo pendiente de datos reales.',p:280,img:'hamburguesas.jpg'},
{id:28,c:'Ensaladas',n:'Ensalada fresca',d:'Producto demo pendiente de datos reales.',p:220,img:'ensaladas.jpg'},
{id:29,c:'Postres',n:'Postre',d:'Producto demo pendiente de datos reales.',p:150,img:'postres.jpg'},
{id:30,c:'Promos',n:'Promo Calentitas',d:'Promoción demo pendiente de datos reales.',p:480,img:'promos.jpg'}];

let cat=null,mode='Delivery';const cart=new Map(),$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],money=n=>'$ '+n.toLocaleString('es-UY');
function renderCats(){$('#categories').innerHTML=categories.map(c=>`<button class="cat ${cat===c.name?'active':''}" data-cat="${c.name}"><img src="assets/${c.img}" alt=""><span>${c.name.toUpperCase()}</span></button>`).join('');$$('.cat').forEach(b=>b.onclick=()=>{cat=b.dataset.cat;renderCats();renderProducts();$('#catalogSection').scrollIntoView({behavior:'smooth'})})}
function visible(){return cat?products.filter(p=>p.c===cat):products.filter(p=>p.c==='Empanadas').slice(0,4)}
function renderProducts(){let list=visible();$('#catalogTitle').innerHTML=(cat?cat:'Destacados')+' <span>✦</span>';$('#products').innerHTML=list.map(p=>`<article class="product"><div class="prod-img"><img src="assets/${p.img}" alt="${p.n}"></div><div class="prod-body"><h3>${p.n}</h3><p>${p.d}</p><div class="price">${money(p.p)}</div><div class="qty"><button data-m="${p.id}">−</button><span>${cart.get(p.id)||0}</span><button data-p="${p.id}">+</button></div></div></article>`).join('');$$('[data-p]').forEach(b=>b.onclick=()=>chg(+b.dataset.p,1));$$('[data-m]').forEach(b=>b.onclick=()=>chg(+b.dataset.m,-1))}
function chg(id,d){let q=Math.max(0,(cart.get(id)||0)+d);q?cart.set(id,q):cart.delete(id);renderProducts();update()}
function totals(){let n=0,t=0;cart.forEach((q,id)=>{let p=products.find(x=>x.id===id);n+=q;t+=q*p.p});return[n,t]}
function update(){let[n,t]=totals();$('#cartBadge').textContent=n;$('#navBadge').textContent=n;$('#floatingCount').textContent=n;$('#floatingTotal').textContent=money(t);$('#floatingCart').classList.toggle('show',n>0)}
function open(id){$(id).classList.add('open');document.body.style.overflow='hidden'}function close(){$$('.modal').forEach(m=>m.classList.remove('open'));document.body.style.overflow=''}
function renderCart(){let h='';cart.forEach((q,id)=>{let p=products.find(x=>x.id===id);h+=`<div class="cart-row"><div><b>${p.n}</b><p>${p.d}</p><strong>${money(p.p*q)}</strong></div><div class="controls"><button data-cm="${id}">−</button><b>${q}</b><button data-cp="${id}">+</button></div></div>`});$('#cartItems').innerHTML=h||'<p>Tu pedido está vacío.</p>';$('#cartTotal').textContent=money(totals()[1]);$$('[data-cp]').forEach(b=>b.onclick=()=>{chg(+b.dataset.cp,1);renderCart()});$$('[data-cm]').forEach(b=>b.onclick=()=>{chg(+b.dataset.cm,-1);renderCart()})}
function openCart(){renderCart();open('#cartModal')}
$('#cartTop').onclick=openCart;$('#navCart').onclick=openCart;$('#floatingCart').onclick=openCart;$('#navHome').onclick=()=>scrollTo({top:0,behavior:'smooth'});$('#navCategories').onclick=$('#backCategories').onclick=()=>$('#categoriesSection').scrollIntoView({behavior:'smooth'});
$$('.close').forEach(b=>b.onclick=close);$$('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)close()});
$('#checkout').onclick=()=>{if(!cart.size)return;close();open('#checkoutModal')};$$('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;$$('[data-mode]').forEach(x=>x.classList.toggle('active',x.dataset.mode===mode));$('#addressField').style.display=mode==='Delivery'?'block':'none'});
$('#finish').onclick=()=>{if(!$('#name').value.trim())return alert('Escribí un nombre.');close();open('#successModal')};$('#restart').onclick=()=>{cart.clear();cat=null;update();renderCats();renderProducts();close();scrollTo({top:0,behavior:'smooth'})};renderCats();renderProducts();update();