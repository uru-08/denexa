'use strict';
const CATALOG = [
 {id:'promo',category:'Promos',name:'2 hamburguesas completas + fritas',description:'Dos hamburguesas completas con papas fritas. Un plan para compartir.',price:400,image:'promo-burgers.jpg',source:'https://www.instagram.com/carrito_lamaula/p/DeSvZ9oDDiQ/'},
 {id:'gramajo',category:'Especialidades',name:'Gramajo',description:'El clásico de La Maula que nunca falla.',price:480,image:'gramajo.jpg',position:'50% 68%',source:'https://www.instagram.com/carrito_lamaula/p/De5bWYjstlJ/'},
 {id:'chivitos',category:'Especialidades',name:'Chivito',description:'El chivito de la casa. Consultá las opciones disponibles.',price:null,image:'chivitos.jpg',source:'https://www.instagram.com/carrito_lamaula/p/DdxZSE_ML-I/'},
 {id:'mila-cheddar',category:'Milanesas',name:'Milanesa con cheddar y huevo',description:'Milanesa con cheddar, huevo y papas fritas.',price:null,image:'milanesa-cheddar.jpg',source:'https://www.instagram.com/carrito_lamaula/p/DdxZK4xscS6/'},
 {id:'napolitana',category:'Milanesas',name:'Milanesa napolitana',description:'Milanesa con salsa, jamón y queso, acompañada de papas.',price:null,image:'napolitana.jpg',source:'https://www.instagram.com/carrito_lamaula/p/DdxZD4rMpBi/'},
 {id:'napolitana-pan',category:'Milanesas',name:'Napolitana con pan',description:'Milanesa napolitana al pan, con papas fritas.',price:null,image:'napolitana-pan.jpg',source:'https://www.instagram.com/carrito_lamaula/p/DdxZHB_sm-u/'},
 {id:'frutas',category:'Algo dulce',name:'Ensalada de frutas',description:'Una opción fresca para terminar con algo dulce.',price:100,image:'frutas.jpg',source:'https://www.instagram.com/carrito_lamaula/p/DeNjiTLjMq2/'}
];
const CATEGORIES = [{name:'Promos',image:'promo-burgers.jpg',detail:'Un plan para compartir'},{name:'Milanesas',image:'napolitana.jpg',detail:'Clásicas y al pan'},{name:'Especialidades',image:'chivitos.jpg',detail:'Los antojos de la casa'},{name:'Algo dulce',image:'frutas.jpg',detail:'El toque final'}];
const $ = s=>document.querySelector(s), $$ = s=>[...document.querySelectorAll(s)];
const byId = id=>CATALOG.find(p=>p.id===id);
const money = n=>'$'+n.toLocaleString('es-UY');
const safe = s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = name=>`<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const storageKey='denexa-la-maula-demo-v1';
let cart=[], favorites=new Set(),filter='Todas',onlyFavorites=false,selectedProduct=null,selectedQuantity=1;
let receipt='', previousFocus=null;
try {
 const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');
 if(Array.isArray(saved.cart))cart=saved.cart.filter(l=>byId(l.id)&&Number.isInteger(l.quantity)&&l.quantity>0&&l.quantity<=99).map(l=>({id:l.id,quantity:l.quantity,note:typeof l.note==='string'?l.note.slice(0,300):''}));
 if(Array.isArray(saved.favorites))favorites=new Set(saved.favorites.filter(id=>byId(id)));
} catch { /* A fresh cart remains usable when browser storage is unavailable. */ }
function save(){try{localStorage.setItem(storageKey,JSON.stringify({cart,favorites:[...favorites]}));}catch{}}
function totals(){return cart.reduce((s,l)=>{const p=byId(l.id);s.count+=l.quantity;if(p.price===null)s.pending+=l.quantity;else s.total+=p.price*l.quantity;return s;},{count:0,total:0,pending:0});}
function priceText(p){return p.price===null?'A confirmar':money(p.price);}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),2300);}
function openDialog(id){previousFocus=document.activeElement;const active=$('dialog[open]');if(active)active.close();$(id).showModal();document.body.classList.add('modal-open');}
function closeDialog(dialog){dialog.close();document.body.classList.remove('modal-open');if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});}
$$('dialog').forEach(dialog=>{
 dialog.addEventListener('close',()=>{if(!$('dialog[open]'))document.body.classList.remove('modal-open');});
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(dialog);}});
});
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>closeDialog(b.closest('dialog'))));
function enterStore(){$('#welcome').hidden=true;$('#store').hidden=false;document.body.classList.remove('welcoming');window.scrollTo({top:0,behavior:'instant'});$('#brand-home').focus({preventScroll:true});}
$('#enter').addEventListener('click',enterStore);
$('#brand-home').addEventListener('click',()=>{$('#store').hidden=true;$('#welcome').hidden=false;document.body.classList.add('welcoming');$('#enter').focus({preventScroll:true});});
$('#nav-home').addEventListener('click',()=>{filter='Todas';onlyFavorites=false;$('#search').value='';renderCatalog();window.scrollTo({top:0,behavior:'smooth'});});
function renderCategoryTiles(){
 $('#category-grid').innerHTML=CATEGORIES.map(c=>`<button type="button" class="cat-tile ${filter===c.name?'active':''}" data-category="${safe(c.name)}"><img src="assets/${c.image}" alt="" loading="lazy"><span>${safe(c.name)}</span><b aria-hidden="true">↗</b></button>`).join('');
}
function renderCatalog(){
 const query=$('#search').value.trim().toLocaleLowerCase('es');
 $('#clear-search').hidden=!query;
 $('#favorites-filter').setAttribute('aria-pressed',String(onlyFavorites));
 $('#filter-chips').innerHTML=['Todas',...CATEGORIES.map(c=>c.name)].map(c=>`<button type="button" class="chip ${filter===c?'active':''}" data-filter="${safe(c)}" aria-pressed="${filter===c}">${safe(c)}</button>`).join('');
 const matches=CATALOG.filter(p=>(filter==='Todas'||p.category===filter)&&(!onlyFavorites||favorites.has(p.id))&&(`${p.name} ${p.description}`.toLocaleLowerCase('es').includes(query)));
 $('#catalog').innerHTML=CATEGORIES.map(c=>{
  const products=matches.filter(p=>p.category===c.name);if(!products.length)return '';
  const expanded=filter!=='Todas'||query||onlyFavorites;
  return `<details class="category" data-section="${safe(c.name)}" ${expanded?'open':''}><summary><img src="assets/${c.image}" alt="" loading="lazy"><span class="category-title"><strong>${safe(c.name)}</strong><small>${products.length} ${products.length===1?'opción':'opciones'} · ${c.detail}</small></span><span class="category-toggle" aria-hidden="true">+</span></summary><div class="product-grid">${products.map(productMarkup).join('')}</div></details>`;
 }).join('');
 $('#no-results').hidden=matches.length>0;
 $('#no-results').textContent=onlyFavorites?'Todavía no hay favoritos que coincidan. Tocá el corazón de un producto para guardarlo.':'No encontramos ese antojo. Probá con otra búsqueda.';
 renderCategoryTiles();
}
function productMarkup(p){return `<article class="product"><button class="product-photo" type="button" data-product="${p.id}" aria-label="Ver ${safe(p.name)}"><img src="assets/${p.image}" alt="${safe(p.name)}, foto original de La Maula" style="object-position:${p.position||'50% 50%'}" loading="lazy"></button><button type="button" class="fav ${favorites.has(p.id)?'active':''}" data-favorite="${p.id}" aria-pressed="${favorites.has(p.id)}" aria-label="${favorites.has(p.id)?'Quitar de':'Agregar a'} favoritos: ${safe(p.name)}">${icon('heart')}</button><div class="product-body"><h3>${safe(p.name)}</h3><p>${safe(p.description)}</p><div class="product-controls"><strong class="product-price ${p.price===null?'pending-price':''}">${priceText(p)}</strong><button class="add-product" type="button" data-product="${p.id}" aria-label="Agregar ${safe(p.name)}">+</button></div></div></article>`;}
document.addEventListener('click',event=>{
 const b=event.target.closest('button');if(!b)return;
 if(b.dataset.product){showProduct(b.dataset.product);return;}
 if(b.dataset.favorite){const id=b.dataset.favorite;favorites.has(id)?favorites.delete(id):favorites.add(id);save();const details=[...$$('.category[open]')].map(d=>d.dataset.section);renderCatalog();details.forEach(name=>$$('.category').find(d=>d.dataset.section===name)?.setAttribute('open',''));const replacement=$(`[data-favorite="${id}"]`);replacement?.focus({preventScroll:true});return;}
 if(b.dataset.category){filter=b.dataset.category;onlyFavorites=false;$('#search').value='';renderCatalog();$('#catalogo').scrollIntoView({behavior:'smooth',block:'start'});return;}
 if(b.dataset.filter){filter=b.dataset.filter;renderCatalog();}
});
$('#search').addEventListener('input',renderCatalog);
$('#clear-search').addEventListener('click',()=>{$('#search').value='';renderCatalog();$('#search').focus();});
$('#favorites-filter').addEventListener('click',()=>{onlyFavorites=!onlyFavorites;renderCatalog();});
$('#nav-favorites').addEventListener('click',()=>{onlyFavorites=true;filter='Todas';$('#search').value='';renderCatalog();$('#catalogo').scrollIntoView({behavior:'smooth'});});
function showProduct(id){
 const p=byId(id);if(!p)return;selectedProduct=p;selectedQuantity=1;
 $('#product-detail').innerHTML=`<img class="detail-photo" src="assets/${p.image}" alt="${safe(p.name)}, foto original del comercio" style="object-position:${p.position||'50% 50%'}"><div class="detail-body"><p class="eyebrow">${safe(p.category.toUpperCase())} · LA MAULA</p><h2 id="product-title">${safe(p.name)}</h2><p>${safe(p.description)}</p><strong class="product-price ${p.price===null?'pending-price':''}">${priceText(p)}</strong>${p.price===null?'<p class="pending">Su precio está pendiente de confirmar y no se incluye en el subtotal.</p>':'<p class="small-note">Precio de una publicación del comercio · a confirmar</p>'}<label class="field">¿Alguna aclaración?<textarea id="product-note" maxlength="300" rows="2" placeholder="Ej.: sin cebolla. Opciones sujetas a confirmación."></textarea></label><div class="detail-actions"><div class="qty"><button id="detail-minus" type="button" aria-label="Quitar una unidad" disabled>−</button><output id="detail-quantity" aria-live="polite">1</output><button id="detail-plus" type="button" aria-label="Agregar una unidad">+</button></div><button class="primary" id="add-detail" type="button">Agregar ${p.price===null?'al pedido':money(p.price)}</button></div></div>`;
 $('#detail-minus').onclick=()=>updateDetail(-1);$('#detail-plus').onclick=()=>updateDetail(1);$('#add-detail').onclick=addSelected;openDialog('#product-dialog');
}
function updateDetail(amount){selectedQuantity=Math.max(1,Math.min(99,selectedQuantity+amount));$('#detail-quantity').value=selectedQuantity;$('#detail-minus').disabled=selectedQuantity<=1;$('#detail-plus').disabled=selectedQuantity>=99;$('#add-detail').textContent='Agregar '+(selectedProduct.price===null?'al pedido':money(selectedProduct.price*selectedQuantity));}
function addSelected(){
 const note=$('#product-note').value.trim();const line=cart.find(l=>l.id===selectedProduct.id&&l.note===note);
 if(line){if(line.quantity+selectedQuantity>99){toast('Máximo 99 unidades por producto.');return;}line.quantity+=selectedQuantity;}else cart.push({id:selectedProduct.id,quantity:selectedQuantity,note});
 save();updateCart();closeDialog($('#product-dialog'));toast(selectedProduct.name+' agregado al pedido');
}
function updateCart(){const t=totals();$$('[data-count]').forEach(el=>el.textContent=t.count);$('#floating-cart').hidden=!t.count;$('#floating-total').textContent=(t.total?money(t.total):'A confirmar')+(t.pending&&t.total?' + a confirmar':'');}
function renderCart(){
 const t=totals();$('#cart-items').innerHTML=cart.length?cart.map((line,index)=>{
 const p=byId(line.id);return `<article class="cart-row"><img src="assets/${p.image}" alt="" style="object-position:${p.position||'50% 50%'}"><div class="row-info"><h3>${safe(p.name)}</h3>${line.note?`<small>${safe(line.note)}</small>`:''}<strong>${p.price===null?'A confirmar':money(p.price*line.quantity)}</strong><br><button class="remove-line" type="button" data-remove="${index}">Eliminar ${safe(p.name)}</button></div><div class="qty"><button type="button" data-qty="${index}" data-change="-1" aria-label="Quitar una unidad de ${safe(p.name)}">−</button><span>${line.quantity}</span><button type="button" data-qty="${index}" data-change="1" aria-label="Agregar una unidad de ${safe(p.name)}" ${line.quantity>=99?'disabled':''}>+</button></div></article>`;
 }).join(''):'<div class="empty">Todavía no hay antojos en tu pedido.<br>Explorá el menú y elegí el primero.<br><button id="browse-products" class="text-btn">Volver a la carta →</button></div>';
 $('#cart-footer').hidden=!cart.length;
 $('#cart-total').textContent=t.total?money(t.total):(t.pending?'A confirmar':money(0));$('#total-label').textContent=t.pending?'Subtotal con precio publicado':'Total de referencia';
 $('#pending-prices').hidden=!t.pending;$('#pending-prices').textContent=`Hay ${t.pending} ${t.pending===1?'unidad con precio pendiente':'unidades con precio pendiente'}. ${t.total?'El subtotal no las incluye.':'El total se confirma con el comercio.'}`;
}
function openCart(){renderCart();openDialog('#cart-dialog');}
$$('[data-cart]').forEach(b=>b.addEventListener('click',openCart));$('#floating-cart').addEventListener('click',openCart);
$('#cart-items').addEventListener('click',event=>{
 const b=event.target.closest('button');if(!b)return;
 if(b.id==='browse-products'){closeDialog($('#cart-dialog'));$('#catalogo').scrollIntoView({behavior:'smooth'});return;}
 if(b.dataset.remove!==undefined)cart.splice(Number(b.dataset.remove),1);
 else if(b.dataset.qty!==undefined){const i=Number(b.dataset.qty);cart[i].quantity+=Number(b.dataset.change);if(cart[i].quantity<=0)cart.splice(i,1);}else return;
 save();updateCart();renderCart();
});
$('#empty-cart').addEventListener('click',()=>openDialog('#confirm-dialog'));
$('#confirm-dialog').querySelector('[data-close]').addEventListener('click',openCart);
$('#confirm-empty').addEventListener('click',()=>{cart=[];save();updateCart();openCart();toast('Pedido vaciado');});
function checkout(){if(!cart.length)return;const t=totals();$('#checkout-summary').innerHTML=`${t.count} ${t.count===1?'producto':'productos'} <strong>${t.total?money(t.total):'A confirmar'}${t.pending&&t.total?' + a confirmar':''}</strong>${t.pending?'<p style="margin-top:10px">Hay productos cuyo precio queda pendiente de confirmar.</p>':''}`;openDialog('#checkout-dialog');}
$('#checkout').addEventListener('click',checkout);$('#back-cart').addEventListener('click',openCart);
function syncCheckoutOptions(changed){
 if(changed?.name==='payment'&&changed.value==='POS a domicilio')$('#mode-delivery').checked=true;
 if(changed?.name==='mode'&&changed.value==='Retiro'&&$('#payment-pos').checked){$('#payment-cash').checked=true;toast('POS a domicilio requiere delivery. Elegí el pago para retirar.');}
 const delivery=$('input[name="mode"]:checked').value==='Delivery';
 $('#delivery-fields').hidden=!delivery;$('#customer-address').required=delivery;
 $('#transfer-info').hidden=$('input[name="payment"]:checked').value!=='Transferencia';
 $('#pos-info').hidden=!$('#payment-pos').checked;
}
$('#checkout-form').addEventListener('change',event=>syncCheckoutOptions(event.target));
$('#checkout-form').addEventListener('submit',event=>{
 event.preventDefault();if(!cart.length)return openCart();const form=event.currentTarget;if(!form.reportValidity())return;
 const data=new FormData(form);const t=totals();
 let lines=['PEDIDO DE PRUEBA · LA MAULA','Simulación DENEXA · No enviado al comercio','',...cart.map(l=>{const p=byId(l.id);return `${l.quantity} × ${p.name} — ${p.price===null?'Precio a confirmar':money(l.quantity*p.price)}${l.note?'\n  Aclaración: '+l.note:''}`;}),'',`${t.pending?'Subtotal con precio publicado':'Total de referencia'}: ${t.total?money(t.total):'A confirmar'}`];
 if(t.pending)lines.push('Hay productos con precio pendiente. El subtotal no los incluye.');
 lines.push('',`Nombre: ${String(data.get('customerName')).trim()}`,`Teléfono: ${String(data.get('phone')).trim()}`,`Modalidad: ${data.get('mode')}`);
 if(data.get('mode')==='Delivery'){lines.push(`Dirección: ${String(data.get('address')).trim()}`);if(data.get('directions'))lines.push(`Indicaciones: ${String(data.get('directions')).trim()}`);lines.push('Zona y costo de entrega a confirmar.');}else lines.push('Retiro: Defensa 219, entre Varela y Carmen, Carmelo.');
 lines.push(`Pago: ${data.get('payment')==='POS a domicilio'?'Tarjeta con POS a domicilio':data.get('payment')} (simulado)`);if(data.get('payment')==='POS a domicilio')lines.push('Solicitar POS a domicilio: SÍ. Llevar el terminal para cobrar al recibir.');if($('#order-notes').value.trim())lines.push('Observaciones: '+$('#order-notes').value.trim());
 lines.push('','Precios y disponibilidad sujetos a confirmación.','Esta demo no realiza cobros ni envía pedidos.');receipt=lines.join('\n');$('#receipt').textContent=receipt;$('#copy-order').textContent='Copiar resumen';openDialog('#success-dialog');
});
$('#copy-order').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(receipt);$('#copy-order').textContent='¡Resumen copiado!';toast('Resumen de prueba copiado');}catch{const range=document.createRange();range.selectNodeContents($('#receipt'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);toast('Seleccioná y copiá el resumen.');}});
$('#print-order').addEventListener('click',()=>window.print());
$('#new-order').addEventListener('click',()=>{cart=[];save();updateCart();$('#checkout-form').reset();$('#delivery-fields').hidden=true;$('#customer-address').required=false;$('#transfer-info').hidden=true;$('#pos-info').hidden=true;$('#order-notes').value='';receipt='';$('#receipt').textContent='';closeDialog($('#success-dialog'));filter='Todas';onlyFavorites=false;$('#search').value='';renderCatalog();$('#categorias').scrollIntoView({behavior:'smooth'});});
renderCategoryTiles();renderCatalog();updateCart();
