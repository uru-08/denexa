'use strict';
/* Carta conservada de Carrito Sauce. Precios sin confirmar; simulación sin cobros. */
const ITEMS = [
  [
    "mila-sauce",
    "MILANESAS",
    "MILA SAUCE",
    "La especialidad de Carrito Sauce. Ingredientes y disponibilidad a confirmar.",
    null,
    "mila-sauce-cutout.webp"
  ],
  [
    "mila-en-dos",
    "MILANESAS",
    "MILA EN 2",
    "Milanesa en dos panes para compartir. Opciones a confirmar.",
    null,
    "mila-en-dos-cutout.webp"
  ],
  [
    "chivito",
    "CHIVITOS",
    "CHIVITO AL PAN",
    "El clásico chivito al pan de Carrito Sauce. Opciones a confirmar.",
    null,
    "chivito-cutout.webp"
  ],
  [
    "chivito-plato",
    "CHIVITOS",
    "CHIVITO AL PLATO PARA 2",
    "Chivito al plato para compartir entre dos. Opciones a confirmar.",
    null,
    "chivito-plato-cutout.webp"
  ],
  [
    "bauru",
    "BAURÚ",
    "BAURÚ",
    "Un clásico de la carta de Carrito Sauce. Opciones a confirmar.",
    null,
    "bauru-cutout.webp"
  ],
  [
    "pizza-bauru",
    "PIZZA BAURÚ",
    "PIZZA BAURÚ",
    "Una de las especialidades de su carta. Opciones a confirmar.",
    null,
    "pizza-bauru-cutout.webp"
  ],
  [
    "hamburguesa",
    "HAMBURGUESAS",
    "HAMBURGUESA",
    "La hamburguesa del carrito. Opciones a confirmar.",
    null,
    "hamburguesa-cutout.webp"
  ],
  [
    "papas",
    "PAPAS Y PANCHOS",
    "PAPAS CON CHEDDAR Y PANCETA",
    "Papas con cheddar y panceta de su carta.",
    null,
    "papas-cutout.webp"
  ],
  [
    "panchos",
    "PAPAS Y PANCHOS",
    "PANCHOS",
    "Los panchos de Carrito Sauce. Presentación y opciones a confirmar.",
    null,
    "panchos-cutout.webp"
  ]
];
const CATEGORIES = [
  {
    "name": "MILANESAS",
    "copy": "Mila Sauce y Mila en 2",
    "image": "mila-en-dos-cutout.webp",
    "icon": "sandwich"
  },
  {
    "name": "CHIVITOS",
    "copy": "Al pan o al plato",
    "image": "chivito-cutout.webp",
    "icon": "sandwich"
  },
  {
    "name": "BAURÚ",
    "copy": "Un clásico con nombre propio",
    "image": "bauru-cutout.webp",
    "icon": "crown"
  },
  {
    "name": "PIZZA BAURÚ",
    "copy": "Una especialidad del carrito",
    "image": "pizza-bauru-cutout.webp",
    "icon": "offer"
  },
  {
    "name": "HAMBURGUESAS",
    "copy": "Siempre es una buena idea",
    "image": "hamburguesa-cutout.webp",
    "icon": "burger"
  },
  {
    "name": "PAPAS Y PANCHOS",
    "copy": "Los infaltables del antojo",
    "image": "panchos-cutout.webp",
    "icon": "fries"
  }
];
const $ = s => document.querySelector(s);
const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const esc = v => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => Number.isFinite(n)?'$'+n.toLocaleString('es-UY'):'A confirmar';
const orderTotal=rows=>rows.some(x=>!Number.isFinite(x[4]))?null:rows.reduce((n,x)=>n+x[4]*cart[x[0]],0);
const lineTotal=x=>Number.isFinite(x[4])?x[4]*cart[x[0]]:null;
const clean = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const STORE = 'denexa-sauce-demo-v1';
let saved={};try{saved=JSON.parse(localStorage.getItem(STORE)||'{}')}catch{}
let cart={};for(const [id,n] of Object.entries(saved.cart||{})){if(ITEMS.some(x=>x[0]===id)&&Number.isInteger(n)&&n>0)cart[id]=Math.min(n,99)}
let favorites=new Set((Array.isArray(saved.favorites)?saved.favorites:[]).filter(id=>ITEMS.some(x=>x[0]===id)));
let openCategory='',favoritesOnly=false,query='',toastTimer,previousFocus;
const persist=()=>{try{localStorage.setItem(STORE,JSON.stringify({cart,favorites:[...favorites]}))}catch{}};
const motion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2300)}
function productMarkup(x){const favorite=favorites.has(x[0]);return `<article class="product" data-product="${esc(x[0])}"><button class="favorite" data-fav="${esc(x[0])}" aria-label="${favorite?'Quitar de':'Guardar en'} favoritos: ${esc(x[2])}" aria-pressed="${favorite}">${icon('heart')}</button><div class="product-photo ${x[5].includes('cutout')?'cutout':''}"><img src="assets/${esc(x[5])}" alt="${esc(x[2])}" width="300" height="300" loading="lazy" decoding="async"></div><div class="product-info"><h3>${esc(x[2])}</h3><p>${esc(x[3])}</p><div class="bottom"><strong class="price">${money(x[4])}</strong><button class="add" data-add="${esc(x[0])}" aria-label="Agregar ${esc(x[2])}">${icon('plus')} AGREGAR</button></div></div></article>`}
function render(){
 const q=clean(query.trim());let count=0;
 $('#cats').classList.toggle('is-filtered',Boolean(q||favoritesOnly));
 $('#cats').innerHTML=CATEGORIES.map((c,i)=>{
  const arr=ITEMS.filter(x=>x[1]===c.name&&(!favoritesOnly||favorites.has(x[0]))&&(!q||clean(x[2]+' '+x[3]).includes(q)));
  if(!arr.length)return '';count+=arr.length;
  const open=!!q||favoritesOnly||openCategory===c.name;
  return `<section class="category-panel" data-category="${c.name}"><button class="category-trigger" id="category-${i}" data-toggle="${c.name}" aria-expanded="${open}" aria-controls="products-${i}"><svg class="cat-icon" aria-hidden="true"><use href="#i-${c.icon}"/></svg><span class="category-name"><strong>${c.name}</strong><small>${c.copy}</small></span><img class="cat-photo" src="assets/${c.image}" alt="" width="250" height="200" loading="lazy"><svg class="category-arrow" aria-hidden="true"><use href="#i-down"/></svg></button><div class="category-products" id="products-${i}" ${open?'':'hidden'}>${open?`<header class="category-open-title"><div><h3>${c.name}</h3><small>${arr.length} ${arr.length===1?'producto':'productos'}</small></div><button data-toggle="${c.name}" aria-label="Cerrar ${c.name}">${icon('close')}</button></header>`+arr.map(productMarkup).join(''):''}</div></section>`;
 }).join('')||`<p class="empty-result">${favoritesOnly?'Todavía no guardaste favoritos.<br>Tocá el corazón de un producto para encontrarlo acá.':'No encontramos esa búsqueda.<br>Probá con otra palabra.'}</p>`;
 $('#filter-notice').hidden=!(favoritesOnly||q);
 $('#filter-notice').textContent=favoritesOnly?`${count} favorito${count===1?'':'s'} guardado${count===1?'':'s'}`:`${count} resultado${count===1?'':'s'} para “${query.trim()}”`;
 $('#filterfavs').setAttribute('aria-pressed',String(favoritesOnly));
}
function navState(id){document.querySelectorAll('.bottom-nav button').forEach(b=>{b.classList.toggle('active',b.id===id);if(b.id===id)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')})}
function goMenu(category=''){favoritesOnly=false;query='';$('#search').value='';openCategory=category;render();navState(category==='BAURÚ'?'navpromo':'navmenu');requestAnimationFrame(()=>{const el=category?document.querySelector(`[data-category="${category}"] .category-products`):$('#categorias');el?.scrollIntoView({behavior:motion(),block:'start'})})}
function showFavorites(){favoritesOnly=true;query='';$('#search').value='';render();navState('navfavs');$('#categorias').scrollIntoView({behavior:motion(),block:'start'})}
function drawCart(){
 const rows=ITEMS.filter(x=>cart[x[0]]),total=orderTotal(rows),count=Object.values(cart).reduce((a,b)=>a+b,0);
 document.querySelectorAll('[data-count]').forEach(e=>e.textContent=count);
 $('#topcart').setAttribute('aria-label',`Abrir mi pedido, ${count} producto${count===1?'':'s'}`);
 $('#cartrows').innerHTML=rows.length?rows.map(x=>`<div class="cartrow"><img src="assets/${esc(x[5])}" alt="" width="55" height="55"><div><b>${esc(x[2])}</b><small>${money(lineTotal(x))}</small></div><div class="qty"><button data-qty="${x[0]}" data-step="-1" aria-label="Quitar una unidad de ${esc(x[2])}">${icon('minus')}</button><span>${cart[x[0]]}</span><button data-qty="${x[0]}" data-step="1" aria-label="Agregar una unidad de ${esc(x[2])}">${icon('plus')}</button></div></div>`).join(''):'<div class="empty-result">Tu pedido está vacío.<br>Elegí algo rico del menú.</div>';
 $('#total').textContent=money(total);$('#checkout').hidden=!rows.length;$('#receipt').hidden=true;
}
function showCart(){previousFocus=document.activeElement;drawCart();$('#overlay').hidden=false;$('#drawer').hidden=false;$('#site').inert=true;document.body.style.overflow='hidden';$('#close').focus()}
function hideCart(){if($('#drawer').hidden)return;$('#drawer').hidden=true;$('#overlay').hidden=true;$('#site').inert=false;document.body.style.overflow='';if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true})}
function showWelcome(){hideCart();$('#welcome').hidden=false;$('#site').inert=true;$('#site').setAttribute('aria-hidden','true');document.body.style.overflow='hidden';$('#enter').focus({preventScroll:true})}
function enterMenu(){$('#welcome').hidden=true;$('#site').inert=false;$('#site').removeAttribute('aria-hidden');document.body.style.overflow='';window.scrollTo({top:0,behavior:'instant'});$('#topmenu').focus({preventScroll:true});navState('navhome')}
function syncCheckoutChoices(){document.querySelectorAll('[data-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.value===$('#'+button.dataset.choice).value)))}
function deliveryChanged(){const delivery=$('#delivery').value==='envio';$('#addresswrap').hidden=!delivery;$('#address').required=delivery;if(!delivery&&$('#payment').value==='POS a domicilio'){$('#payment').value='Efectivo';paymentChanged()}syncCheckoutChoices()}
function paymentChanged(){const value=$('#payment').value;if(value==='POS a domicilio'){$('#delivery').value='envio';deliveryChanged();$('#payment-note').textContent='Se solicita llevar el POS para pagar al recibir. Disponibilidad a confirmar por el comercio.'}else if(value==='Transferencia'){$('#payment-note').textContent='La transferencia se coordina con el comercio. Esta demostración no realiza cobros.'}$('#payment-note').hidden=value==='Efectivo';syncCheckoutChoices()}
function simulate(event){event.preventDefault();const rows=ITEMS.filter(x=>cart[x[0]]);if(!rows.length)return;const total=orderTotal(rows);const data={name:$('#customer').value.trim(),delivery:$('#delivery').value,address:$('#address').value.trim(),payment:$('#payment').value,notes:$('#notes').value.trim()};if(!data.name){$('#customer').setCustomValidity('Ingresá tu nombre.');$('#customer').reportValidity();return}$('#receipt').hidden=false;$('#receipt').innerHTML=`<h3>✓ Simulación completada</h3><p>Así quedaría tu pedido. No se envió al comercio.</p><ul>${rows.map(x=>`<li>${cart[x[0]]} × ${esc(x[2])} · ${money(lineTotal(x))}</li>`).join('')}</ul><strong>Total: ${money(total)}</strong><p>${esc(data.name)}<br>${data.delivery==='envio'?'Envío: '+esc(data.address):'Retiro en local'}<br>Pago: ${esc(data.payment)}${data.payment==='POS a domicilio'?'<br>Solicitar POS al entregar: SÍ':''}${data.notes?'<br>Notas: '+esc(data.notes):''}</p><button type="button" id="keep-editing">SEGUIR EDITANDO</button>`;$('#receipt').scrollIntoView({behavior:motion(),block:'start'});$('#keep-editing').onclick=()=>{$('#receipt').hidden=true;$('#customer').focus()}}
$('#cats').addEventListener('click',e=>{
 const trigger=e.target.closest('[data-toggle]');if(trigger){
  const name=trigger.dataset.toggle,closing=Boolean(trigger.closest('.category-open-title'))||(openCategory===name&&!favoritesOnly&&!query);
  openCategory=closing?'':name;favoritesOnly=false;query='';$('#search').value='';render();
  const tile=document.querySelector(`.category-trigger[data-toggle="${name}"]`);
  tile?.focus({preventScroll:true});
  requestAnimationFrame(()=>{
   const destination=closing?tile:document.querySelector(`[data-category="${name}"] .category-products`);
   destination?.scrollIntoView({behavior:motion(),block:closing?'center':'start'});
  });navState('navmenu');return;
 }
 const add=e.target.closest('[data-add]');if(add){const id=add.dataset.add,item=ITEMS.find(x=>x[0]===id);if(!item)return;if((cart[id]||0)>=99){toast('Ya agregaste 99 unidades.');return}cart[id]=(cart[id]||0)+1;persist();drawCart();add.classList.add('added');add.innerHTML='✓ AGREGADO';toast(`${item[2]} agregada al pedido`);setTimeout(()=>{if(add.isConnected){add.classList.remove('added');add.innerHTML=icon('plus')+' AGREGAR'}},950);return}
 const fav=e.target.closest('[data-fav]');if(fav){const id=fav.dataset.fav;favorites.has(id)?favorites.delete(id):favorites.add(id);persist();if(favoritesOnly)render();else{fav.setAttribute('aria-pressed',String(favorites.has(id)));const item=ITEMS.find(x=>x[0]===id);fav.setAttribute('aria-label',`${favorites.has(id)?'Quitar de':'Guardar en'} favoritos: ${item[2]}`)}toast(favorites.has(id)?'Guardado en favoritos':'Quitado de favoritos')}
});
$('#cartrows').addEventListener('click',e=>{const b=e.target.closest('[data-qty]');if(!b)return;const id=b.dataset.qty;cart[id]=Math.max(0,Math.min(99,(cart[id]||0)+Number(b.dataset.step)));if(!cart[id])delete cart[id];persist();drawCart()});
$('#search').addEventListener('input',e=>{query=e.target.value;favoritesOnly=false;render();navState('navmenu')});$('#filterfavs').onclick=()=>{favoritesOnly?goMenu():showFavorites()};
$('#enter').onclick=enterMenu;$('#welcome-again').onclick=showWelcome;$('#topmenu').onclick=$('#navmenu').onclick=()=>goMenu();$('#navhome').onclick=()=>{favoritesOnly=false;query='';$('#search').value='';render();navState('navhome');$('#inicio').scrollIntoView({behavior:motion(),block:'start'})};$('#promoBtn').onclick=$('#navpromo').onclick=()=>goMenu('BAURÚ');$('#navfavs').onclick=showFavorites;$('#topcart').onclick=$('#navcart').onclick=showCart;$('#close').onclick=$('#overlay').onclick=hideCart;
$('#checkout').addEventListener('click',event=>{const button=event.target.closest('[data-choice]');if(!button)return;$('#'+button.dataset.choice).value=button.dataset.value;button.dataset.choice==='delivery'?deliveryChanged():paymentChanged();$('#receipt').hidden=true});$('#checkout').onsubmit=simulate;$('#customer').oninput=()=>$('#customer').setCustomValidity('');
document.addEventListener('keydown',e=>{if($('#drawer').hidden)return;if(e.key==='Escape'){hideCart();return}if(e.key==='Tab'){const all=[...$('#drawer').querySelectorAll('button,input,select,textarea,a')].filter(el=>!el.disabled&&el.getClientRects().length);const first=all[0],last=all.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
function effects(){document.querySelectorAll('[data-effects]').forEach(container=>{
 const tones=['#b7dc76','#75bb62','#3f9b62','#d2e99d','#579a49'];
 container.innerHTML=Array.from({length:18},(_,n)=>`<span class="willow-leaf" style="--x:${n*6-2}%;--size:${10+n%4*3}px;--leaf:${tones[n%tones.length]};--time:${14+n%6*1.8}s;--flutter:${2.8+n%4*.5}s;--delay:-${n*2.3}s;--rest:${8+n%5*18}%"><svg viewBox="0 0 24 90"><path d="M12 1C3 17-3 52 11 88C25 60 29 25 12 1Z"/><path class="leaf-vein" d="M12 7Q9 45 11 85M11 31l-6-9M11 48l8-13M11 61l-6-11"/></svg></span>`).join('');
 });const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('is-lit',e.isIntersecting)),{threshold:.05});document.querySelectorAll('.scene').forEach(e=>observer.observe(e));document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('page-idle',document.hidden))}
render();drawCart();effects();document.body.style.overflow='hidden';

