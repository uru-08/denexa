'use strict';
/* Catálogo de referencia de Craft Burger. Todos los pedidos son simulados. */
const ITEMS = [
  [
    "p2",
    "PROMOS",
    "2 COMBOS CHEESEBURGER",
    "Dos Cheeseburgers + fritas.",
    670,
    "cheese-cutout.webp"
  ],
  [
    "p4",
    "PROMOS",
    "4 COMBOS CHEESEBURGER",
    "Cuatro Cheeseburgers + fritas.",
    1300,
    "cheese-cutout.webp"
  ],
  [
    "pcombo",
    "PROMOS",
    "2 COMBOS A ELECCIÓN",
    "Dos burgers + fritas. Variedades a confirmar.",
    720,
    "yankee-cutout.webp"
  ],
  [
    "pfam",
    "PROMOS",
    "4 COMBOS FAMILIARES",
    "Cuatro burgers + fritas. Variedades a confirmar.",
    1400,
    "big-cutout.webp"
  ],
  [
    "ppollo",
    "PROMOS",
    "2 CHIVITOS POLLO",
    "Dos chivitos de pollo + fritas.",
    720,
    "chivito-cutout.webp"
  ],
  [
    "plomo",
    "PROMOS",
    "2 CHIVITOS LOMO",
    "Dos chivitos de lomo + fritas.",
    870,
    "chivito-cutout.webp"
  ],
  [
    "cheese",
    "BURGERS",
    "CHEESEBURGER",
    "Pan de papa, Angus 150 g, doble cheddar, mayonesa + fritas.",
    350,
    "cheese-cutout.webp"
  ],
  [
    "420",
    "BURGERS",
    "420",
    "Angus, cheddar, panceta, barbacoa, fritas adentro + fritas.",
    380,
    "420-cutout.webp"
  ],
  [
    "americana",
    "BURGERS",
    "AMERICANA",
    "Angus, cheddar, panceta, salsa barbacoa + fritas.",
    380,
    "americana-cutout.webp"
  ],
  [
    "big",
    "BURGERS",
    "BIG CRAFT",
    "Angus, cheddar, pepinillos, lechuga y salsa casera + fritas.",
    390,
    "big-cutout.webp"
  ],
  [
    "war",
    "BURGERS",
    "CHEESE WAR",
    "Angus, cheddar, muzarella, cebolla, mayonesa y ketchup + fritas.",
    380,
    "cheese-war-cutout.webp"
  ],
  [
    "craft",
    "BURGERS",
    "CRAFTNÍFICA",
    "Angus, cheddar, cebolla, lechuga, tomate y salsas + fritas.",
    380,
    "craftnifica-cutout.webp"
  ],
  [
    "doble",
    "BURGERS",
    "DOBLE CUARTO",
    "Angus, cheddar, cebolla, ketchup y mostaza + fritas.",
    380,
    "doble-cuarto-cutout.webp"
  ],
  [
    "italiana",
    "BURGERS",
    "ITALIANA",
    "Angus, muzarella, huevo, lechuga, tomate y mayonesa + fritas.",
    380,
    "italiana-cutout.webp"
  ],
  [
    "mexicana",
    "BURGERS",
    "MEXICANA",
    "Angus, cheddar, pepinillos, salsa picante opcional + fritas.",
    390,
    "mexicana-cutout.webp"
  ],
  [
    "oklahoma",
    "BURGERS",
    "OKLAHOMA",
    "Angus, cheddar, cebolla a la plancha y barbacoa.",
    380,
    "oklahoma-cutout.webp"
  ],
  [
    "uruguaya",
    "BURGERS",
    "URUGUAYA",
    "Angus, cheddar, cebolla, lechuga, tomate y salsas + fritas.",
    380,
    "uruguaya-cutout.webp"
  ],
  [
    "yankee",
    "BURGERS",
    "YANKEE",
    "Angus, cheddar, muzarella, panceta, huevo, barbacoa + fritas.",
    420,
    "yankee-cutout.webp"
  ],
  [
    "lentejas",
    "VEGETARIANAS",
    "LENTEJAS",
    "Hamburguesa de lentejas, cheddar, vegetales y fritas.",
    380,
    "veggie-cutout.webp"
  ],
  [
    "espinaca",
    "VEGETARIANAS",
    "ESPINACA Y ZANAHORIA",
    "Hamburguesa vegetal, cheddar, vegetales y fritas.",
    380,
    "espinaca-y-zanahoria-cutout.webp"
  ],
  [
    "remolacha",
    "VEGETARIANAS",
    "REMOLACHA",
    "Hamburguesa de remolacha, cheddar, vegetales y fritas.",
    380,
    "remolacha-cutout.webp"
  ],
  [
    "pollo",
    "CHIVITOS",
    "POLLO",
    "Pollo, cheddar, muzarella, panceta, huevo, vegetales + fritas.",
    380,
    "chivito-cutout.webp"
  ],
  [
    "lomo",
    "CHIVITOS",
    "LOMO",
    "Lomo, muzarella, jamón, panceta, huevo, vegetales + fritas.",
    460,
    "chivito-cutout.webp"
  ],
  [
    "fritas",
    "FRITAS",
    "PORCIÓN FRITAS",
    "Papas fritas clásicas.",
    220,
    "fries-cutout.webp"
  ],
  [
    "cheddarf",
    "FRITAS",
    "FRITAS CON CHEDDAR",
    "Papas fritas con cheddar.",
    260,
    "fries-cutout.webp"
  ],
  [
    "killer",
    "FRITAS",
    "PAPAS KILLER",
    "Cheddar y panceta.",
    300,
    "fries-cutout.webp"
  ],
  [
    "craftf",
    "FRITAS",
    "PAPAS CRAFT",
    "Carne, cheddar, panceta y cebolla.",
    360,
    "fries-cutout.webp"
  ]
];
const CATEGORIES = [
 {name:'PROMOS',copy:'Combos especiales',image:'cheese-cutout.webp',icon:'crown'},
 {name:'BURGERS',copy:'Nuestras clásicas y especiales',image:'yankee-cutout.webp',icon:'burger'},
 {name:'VEGETARIANAS',copy:'Sabor Craft sin carne',image:'veggie-cutout.webp',icon:'leaf'},
 {name:'CHIVITOS',copy:'El clásico uruguayo',image:'chivito-cutout.webp',icon:'sandwich'},
 {name:'FRITAS',copy:'El acompañamiento perfecto',image:'fries-cutout.webp',icon:'fries'}
];
const $ = s => document.querySelector(s);
const icon = name => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const esc = v => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = n => '$'+Number(n).toLocaleString('es-UY');
const clean = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const STORE = 'denexa-craft-demo-v30';
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
function goMenu(category=''){favoritesOnly=false;query='';$('#search').value='';openCategory=category;render();navState(category==='PROMOS'?'navpromo':'navmenu');requestAnimationFrame(()=>{const el=category?document.querySelector(`[data-category="${category}"] .category-products`):$('#categorias');el?.scrollIntoView({behavior:motion(),block:'start'})})}
function showFavorites(){favoritesOnly=true;query='';$('#search').value='';render();navState('navfavs');$('#categorias').scrollIntoView({behavior:motion(),block:'start'})}
function drawCart(){
 const rows=ITEMS.filter(x=>cart[x[0]]),total=rows.reduce((n,x)=>n+x[4]*cart[x[0]],0),count=Object.values(cart).reduce((a,b)=>a+b,0);
 document.querySelectorAll('[data-count]').forEach(e=>e.textContent=count);
 $('#topcart').setAttribute('aria-label',`Abrir mi pedido, ${count} producto${count===1?'':'s'}`);
 $('#cartrows').innerHTML=rows.length?rows.map(x=>`<div class="cartrow"><img src="assets/${esc(x[5])}" alt="" width="55" height="55"><div><b>${esc(x[2])}</b><small>${money(x[4]*cart[x[0]])}</small></div><div class="qty"><button data-qty="${x[0]}" data-step="-1" aria-label="Quitar una unidad de ${esc(x[2])}">${icon('minus')}</button><span>${cart[x[0]]}</span><button data-qty="${x[0]}" data-step="1" aria-label="Agregar una unidad de ${esc(x[2])}">${icon('plus')}</button></div></div>`).join(''):'<div class="empty-result">Tu pedido está vacío.<br>Elegí algo rico del menú.</div>';
 $('#total').textContent=money(total);$('#checkout').hidden=!rows.length;$('#receipt').hidden=true;
}
function showCart(){previousFocus=document.activeElement;drawCart();$('#overlay').hidden=false;$('#drawer').hidden=false;$('#site').inert=true;document.body.style.overflow='hidden';$('#close').focus()}
function hideCart(){if($('#drawer').hidden)return;$('#drawer').hidden=true;$('#overlay').hidden=true;$('#site').inert=false;document.body.style.overflow='';if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true})}
function showWelcome(){hideCart();$('#welcome').hidden=false;$('#site').inert=true;$('#site').setAttribute('aria-hidden','true');document.body.style.overflow='hidden';$('#enter').focus({preventScroll:true})}
function enterMenu(){$('#welcome').hidden=true;$('#site').inert=false;$('#site').removeAttribute('aria-hidden');document.body.style.overflow='';window.scrollTo({top:0,behavior:'instant'});$('#topmenu').focus({preventScroll:true});navState('navhome')}
function syncCheckoutChoices(){document.querySelectorAll('[data-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.value===$('#'+button.dataset.choice).value)))}
function deliveryChanged(){const delivery=$('#delivery').value==='envio';$('#addresswrap').hidden=!delivery;$('#address').required=delivery;if(!delivery&&$('#payment').value==='POS a domicilio'){$('#payment').value='Efectivo';paymentChanged()}syncCheckoutChoices()}
function paymentChanged(){const value=$('#payment').value;if(value==='POS a domicilio'){$('#delivery').value='envio';deliveryChanged();$('#payment-note').textContent='Se solicita llevar el POS para pagar al recibir. Disponibilidad a confirmar por el comercio.'}else if(value==='Transferencia'){$('#payment-note').textContent='La transferencia se coordina con el comercio. Esta demostración no realiza cobros.'}$('#payment-note').hidden=value==='Efectivo';syncCheckoutChoices()}
function simulate(event){event.preventDefault();const rows=ITEMS.filter(x=>cart[x[0]]);if(!rows.length)return;const total=rows.reduce((n,x)=>n+x[4]*cart[x[0]],0);const data={name:$('#customer').value.trim(),delivery:$('#delivery').value,address:$('#address').value.trim(),payment:$('#payment').value,notes:$('#notes').value.trim()};if(!data.name){$('#customer').setCustomValidity('Ingresá tu nombre.');$('#customer').reportValidity();return}$('#receipt').hidden=false;$('#receipt').innerHTML=`<h3>✓ Simulación completada</h3><p>Así quedaría tu pedido. No se envió al comercio.</p><ul>${rows.map(x=>`<li>${cart[x[0]]} × ${esc(x[2])} · ${money(x[4]*cart[x[0]])}</li>`).join('')}</ul><strong>Total: ${money(total)}</strong><p>${esc(data.name)}<br>${data.delivery==='envio'?'Envío: '+esc(data.address):'Retiro en local'}<br>Pago: ${esc(data.payment)}${data.payment==='POS a domicilio'?'<br>Solicitar POS al entregar: SÍ':''}${data.notes?'<br>Notas: '+esc(data.notes):''}</p><button type="button" id="keep-editing">SEGUIR EDITANDO</button>`;$('#receipt').scrollIntoView({behavior:motion(),block:'start'});$('#keep-editing').onclick=()=>{$('#receipt').hidden=true;$('#customer').focus()}}
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
$('#enter').onclick=enterMenu;$('#welcome-again').onclick=showWelcome;$('#topmenu').onclick=$('#navmenu').onclick=()=>goMenu();$('#navhome').onclick=()=>{favoritesOnly=false;query='';$('#search').value='';render();navState('navhome');$('#inicio').scrollIntoView({behavior:motion(),block:'start'})};$('#promoBtn').onclick=$('#navpromo').onclick=()=>goMenu('PROMOS');$('#navfavs').onclick=showFavorites;$('#topcart').onclick=$('#navcart').onclick=showCart;$('#close').onclick=$('#overlay').onclick=hideCart;
$('#checkout').addEventListener('click',event=>{const button=event.target.closest('[data-choice]');if(!button)return;$('#'+button.dataset.choice).value=button.dataset.value;button.dataset.choice==='delivery'?deliveryChanged():paymentChanged();$('#receipt').hidden=true});$('#checkout').onsubmit=simulate;$('#customer').oninput=()=>$('#customer').setCustomValidity('');
document.addEventListener('keydown',e=>{if($('#drawer').hidden)return;if(e.key==='Escape'){hideCart();return}if(e.key==='Tab'){const all=[...$('#drawer').querySelectorAll('button,input,select,textarea,a')].filter(el=>!el.disabled&&el.getClientRects().length);const first=all[0],last=all.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
function effects(){document.querySelectorAll('[data-effects]').forEach(container=>{
 container.innerHTML=[0,1,2,3].map((n)=>`<span class="smoke-wisp ${n%2?'right':'left'}" style="--time:${6+n}s;--delay:-${n*2}s;bottom:${8+n*4}%"><svg viewBox="0 0 130 400"><path d="M40 400C-15 330 120 310 55 230S120 130 40 10M80 410C140 315 0 300 65 210S0 90 85-10"/></svg></span>`).join('')+Array.from({length:10},(_,n)=>`<i class="flame-tongue" style="--x:${n*11-4}%;--w:${45+n%3*14}px;--h:${35+n%4*16}px;--time:${1.1+n%4*.3}s;--delay:-${n*.27}s"></i>`).join('')+Array.from({length:15},(_,n)=>`<i class="ember" style="--x:${n*7}%;--time:${3+n%5*.7}s;--delay:-${n*.8}s"></i>`).join('');
 });const observer=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('is-lit',e.isIntersecting)),{threshold:.05});document.querySelectorAll('.scene').forEach(e=>observer.observe(e));document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('page-idle',document.hidden))}
render();drawCart();effects();document.body.style.overflow='hidden';
