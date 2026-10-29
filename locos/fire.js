'use strict';
const products = [
  ['Al pan con fritas',350],['Al pan completa',280],['Al pan con fritas, cheddar y panceta',400],
  ['En dos panes clásica',370],['En dos panes completa',400],['En dos panes clásica con fritas',400],
  ['En dos panes completa con fritas',450],['En dos panes con fritas, cheddar y panceta',650],
  ['Al plato',180],['Al plato con fritas',300],['Al plato con puré',300],['Al plato con mixta',300],
  ['Al plato con rusa',300],['Napolitana con fritas',320],['Napolitana con fritas y huevo',350],
  ['Napolitana para dos',600],['A caballo con fritas',320],['A caballo con fritas, cheddar y panceta',350],
  ['A caballo con fritas, cheddar y panceta para dos',600],['A la riojana con fritas',350],['Fugazzeta con fritas',350],
  ['Clásica',150],['Completa',170],['Doble carne',220],['Doble con fritas',320]
].map(([name,price],id)=>({id,name,price,category:id<21?'milanesas':'hamburguesas'}));
const categories=[
{key:'milanesas',name:'MILANESAS',image:'milanesa-3d-v3.webp',description:'Milanesas al pan, al plato y para compartir.'},
{key:'hamburguesas',name:'HAMBURGUESAS',image:'hamburguesa-3d-v3.webp',description:'Clásica, completa o doble. Elegí tu favorita.'},
{key:'papas',name:'PAPAS FRITAS',image:'papas-fritas-3d-v3.webp',description:'Consultá las porciones, precios y disponibilidad.'},
{key:'chivitos',name:'CHIVITOS',image:'chivito-v6.webp',description:'Consultá las opciones, ingredientes y precios disponibles.'},
{key:'bebidas',name:'BEBIDAS',image:'bebidas-v6.webp',description:'Consultá las bebidas, tamaños y precios disponibles.'},
{key:'postres',name:'POSTRES',image:'postres-v6.webp',description:'Consultá los postres y precios de hoy.'},
{key:'porciones',name:'PORCIONES',image:'porciones-v6.webp',description:'Consultá las porciones y precios disponibles.'}
];
const $=id=>document.getElementById(id);
const money=n=>'$'+new Intl.NumberFormat('es-UY').format(n);
const normalize=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const cart=new Map();let currentCategory=null,visibleLimit=6,toastTimer;
function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2000)}
function totals(){return [...cart].reduce((sum,[id,qty])=>({count:sum.count+qty,total:sum.total+products[id].price*qty}),{count:0,total:0})}
function categoryLink(key){location.hash='categoria/'+key}
function renderCategories(){
 const grid=$('carta'),drawer=$('drawer-categories');grid.replaceChildren();drawer.replaceChildren();
 categories.forEach((c,index)=>{
  const button=document.createElement('button');button.type='button';button.className='category-card';button.setAttribute('aria-label','Abrir sección '+c.name);button.dataset.category=c.key;
  const image=document.createElement('img');image.src='assets/'+c.image;image.alt='';image.width=320;image.height=240;image.decoding='async';
  const label=document.createElement('strong');label.textContent=c.name;
  const copy=document.createElement('span');copy.className='category-card-copy';
  const subtitle=document.createElement('span');subtitle.className='category-card-subtitle';subtitle.textContent=c.key==='hamburguesas'?'Elegí la tuya':c.key==='milanesas'?'Elegí la que más te gusta':'Tocá para ver las opciones';
  const detail=document.createElement('span');detail.className='category-card-detail';const count=products.filter(p=>p.category===c.key).length;detail.textContent=count?count+' productos':'Consultá las opciones';copy.append(label,subtitle,detail);
  const arrow=document.createElement('span');arrow.className='category-arrow';arrow.textContent='+';arrow.setAttribute('aria-hidden','true');
  button.append(image,copy,arrow);button.addEventListener('click',()=>categoryLink(c.key));grid.append(button);
  const item=document.createElement('button');item.className='drawer-link';item.textContent=c.name+' ›';item.type='button';item.addEventListener('click',()=>{$('nav-dialog').close();categoryLink(c.key)});drawer.append(item);
 });
}
function route(){
 const hash=location.hash.slice(1),key=hash.startsWith('categoria/')?hash.slice(10):null;
 const category=categories.find(c=>c.key===key);
 if(!hash||hash==='bienvenida'){openWelcome();return;}
 $('welcome-screen').hidden=true;$('menu-app').hidden=false;document.body.classList.remove('welcome-active');
 $('nav-dialog').close();
 if(!category){
  currentCategory=null;$('home-view').hidden=false;$('category-view').hidden=true;document.title='Locos por la Comida · Menú';
  requestAnimationFrame(()=>{if(hash==='carta'||hash==='menu-del-dia')$(hash).scrollIntoView({block:'start',behavior:'instant'});else window.scrollTo({top:0,behavior:'instant'})});return;
 }
 currentCategory=category;visibleLimit=6;$('search').value='';$('search-box').hidden=true;$('toggle-search').setAttribute('aria-expanded','false');
 $('home-view').hidden=true;$('category-view').hidden=false;$('category-title').textContent=category.name;$('category-hero-food').src='assets/'+category.image;
 $('category-note').textContent=category.key==='milanesas'||category.key==='hamburguesas'?'Precios de referencia · UYU · Ingredientes a confirmar':'Opciones y precios pendientes de completar';
 document.title=category.name+' · Locos por la Comida';renderProducts();window.scrollTo({top:0,behavior:'instant'});
}
function productDescription(p){
 if(p.category==='hamburguesas')return 'Hamburguesa. Ingredientes a confirmar.';
 if(p.name.includes('para dos'))return 'Para compartir entre dos. Ingredientes a confirmar.';
 return 'Milanesa. Ingredientes a confirmar.';
}
function renderProducts(){
 if(!currentCategory)return;
 const list=$('product-list');list.replaceChildren();
 const all=products.filter(p=>p.category===currentCategory.key);
 $('toggle-search').hidden=all.length===0;
 if(!all.length){
  const article=document.createElement('article');article.className='consult-card';
  const image=document.createElement('img');image.src='assets/'+currentCategory.image;image.alt=currentCategory.name+', imagen ilustrativa';image.width=320;image.height=240;
  const title=document.createElement('h3');title.textContent=currentCategory.name;
  const copy=document.createElement('p');copy.textContent=currentCategory.description;
  const link=document.createElement('a');link.className='gold-button';link.href='https://wa.me/59891328673?text='+encodeURIComponent('Hola, quisiera consultar las opciones y precios de '+currentCategory.name.toLowerCase()+'.');link.target='_blank';link.rel='noopener';link.textContent='CONSULTAR OPCIONES ›';article.append(image,title,copy,link);list.append(article);$('more-products').hidden=true;return;
 }
 const term=normalize($('search').value.trim()),filtered=all.filter(p=>normalize(p.name).includes(term)),shown=term?filtered:filtered.slice(0,visibleLimit);
 $('more-products').hidden=shown.length>=filtered.length;$('more-products').textContent='VER MÁS OPCIONES ('+(filtered.length-shown.length)+') ↓';
 if(!shown.length){const message=document.createElement('p');message.className='empty';message.textContent='No encontramos esa opción. Probá con otro nombre.';list.append(message)}
 shown.forEach(p=>{
  const row=document.createElement('article');row.className='product-row';
  const image=document.createElement('img');image.className='product-image';image.src='assets/'+currentCategory.image;image.alt='';image.loading='lazy';image.decoding='async';image.width=200;image.height=200;
  const copy=document.createElement('div');copy.className='product-copy';const name=document.createElement('h3');name.textContent=p.name.toUpperCase();const description=document.createElement('p');description.textContent=productDescription(p);copy.append(name,description);
  const action=document.createElement('div');action.className='product-action';const price=document.createElement('strong');price.textContent=money(p.price);const add=document.createElement('button');add.type='button';add.className='add-button';add.textContent='+';add.setAttribute('aria-label','Agregar '+p.name+' al pedido de prueba');add.addEventListener('click',()=>{cart.set(p.id,(cart.get(p.id)||0)+1);renderCart();toast('Agregado al pedido de prueba')});action.append(price,add);row.append(image,copy,action);list.append(row);
 });
}
function renderCart(){
 const t=totals();$('cart-button').hidden=t.count===0;$('cart-count').textContent=t.count;$('cart-total').textContent=money(t.total);$('dialog-total').textContent=money(t.total);$('header-count').textContent=t.count;$('header-count').hidden=t.count===0;
 const list=$('cart-lines');list.replaceChildren();
 if(!t.count){const empty=document.createElement('p');empty.className='empty';empty.textContent='Tu pedido de prueba está vacío.';list.append(empty)}
 for(const [id,qty] of cart){const p=products[id],row=document.createElement('article');row.className='cart-line';const copy=document.createElement('div'),name=document.createElement('h3'),price=document.createElement('p');name.textContent=(p.category==='milanesas'?'Milanesa · ':'Hamburguesa · ')+p.name;price.textContent=money(p.price)+' por unidad · '+money(p.price*qty);copy.append(name,price);const controls=document.createElement('div');controls.className='quantity-controls';const minus=document.createElement('button'),number=document.createElement('strong'),plus=document.createElement('button');minus.type=plus.type='button';minus.textContent='−';plus.textContent='+';number.textContent=qty;minus.setAttribute('aria-label','Quitar una unidad de '+p.name);plus.setAttribute('aria-label','Agregar una unidad de '+p.name);minus.addEventListener('click',()=>{qty===1?cart.delete(id):cart.set(id,qty-1);renderCart()});plus.addEventListener('click',()=>{cart.set(id,qty+1);renderCart()});const remove=document.createElement('button');remove.type='button';remove.className='remove-item';remove.textContent='Eliminar';remove.setAttribute('aria-label','Eliminar '+(p.category==='milanesas'?'milanesa ':'hamburguesa ')+p.name+' del pedido');remove.addEventListener('click',()=>{cart.delete(id);renderCart();toast('Producto eliminado del pedido')});controls.append(minus,number,plus);const actions=document.createElement('div');actions.className='cart-line-actions';actions.append(remove,controls);row.append(copy,actions);list.append(row)}
 $('copy-order').disabled=t.count===0;
 $('clear-order').hidden=t.count===0;
 syncPayment();
}
for(const id of ['cart-button','hero-order','category-cart','drawer-cart'])$(id).addEventListener('click',()=>{$('nav-dialog').close();$('cart-dialog').showModal()});
$('nav-dialog').querySelector('a[href="#menu-del-dia"]').addEventListener('click',()=>$('nav-dialog').close());
$('clear-order').addEventListener('click',()=>{cart.clear();$('payment-demo').reset();renderCart();toast('Pedido vaciado')});
$('close-cart').addEventListener('click',()=>$('cart-dialog').close());$('open-menu').addEventListener('click',()=>$('nav-dialog').showModal());$('close-menu').addEventListener('click',()=>$('nav-dialog').close());
for(const id of ['back-home','bottom-back'])$(id).addEventListener('click',()=>{location.hash='carta'});
$('toggle-search').addEventListener('click',()=>{const open=$('search-box').hidden;$('search-box').hidden=!open;$('toggle-search').setAttribute('aria-expanded',String(open));if(open)$('search').focus()});
$('search').addEventListener('input',renderProducts);$('more-products').addEventListener('click',()=>{visibleLimit+=6;renderProducts()});
$('copy-order').addEventListener('click',async()=>{const text='PEDIDO DE PRUEBA — LOCOS POR LA COMIDA\nPRECIOS E INGREDIENTES A CONFIRMAR\n\n'+[...cart].map(([id,qty])=>qty+' × '+(products[id].category==='milanesas'?'Milanesa ':'Hamburguesa ')+products[id].name+' — '+money(products[id].price*qty)).join('\n')+'\n\nTotal de referencia: '+money(totals().total)+' UYU'+paymentSummary()+'\nEsta es una prueba; no es un pedido confirmado ni un pago real.';try{await navigator.clipboard.writeText(text);toast('Pedido de prueba copiado')}catch{toast('No se pudo copiar. Probá desde el navegador.')}});

function selectedPayment(){return document.querySelector('input[name="payment-method"]:checked')?.value||'';}
function syncPayment(){
 const t=totals(),method=selectedPayment(),cash=Number($('cash-amount').value);
 $('payment-options').disabled=t.count===0;$('simulate-payment').disabled=t.count===0;
 $('cash-fields').hidden=method!=='cash';$('transfer-demo-note').hidden=method!=='transfer';
 $('cash-amount').required=method==='cash'&&t.count>0;$('cash-amount').disabled=method!=='cash';$('cash-amount').min=String(t.total);
 $('cash-change').textContent=$('cash-amount').value!==''&&Number.isFinite(cash)&&cash>=t.total?'Tu vuelto de prueba: '+money(Math.round((cash-t.total)*100)/100):'Ingresá un importe igual o mayor al total ('+money(t.total)+').';
 $('payment-result').hidden=true;$('payment-error').hidden=true;$('simulate-payment').textContent='SIMULAR PAGO';
}
function paymentSummary(){
 const method=selectedPayment();
 if(!method)return '';
 if(method==='transfer')return '\nForma de pago de prueba: transferencia (sin envío de dinero).';
 const cash=Number($('cash-amount').value),total=totals().total;
 return '\nForma de pago de prueba: efectivo'+($('cash-amount').value!==''&&Number.isFinite(cash)&&cash>=total?' · Paga con '+money(cash)+' · Vuelto '+money(Math.round((cash-total)*100)/100):' · Importe pendiente de completar')+'.';
}
$('payment-demo').addEventListener('input',syncPayment);
$('payment-demo').addEventListener('change',syncPayment);
$('payment-demo').addEventListener('submit',event=>{
 event.preventDefault();const t=totals(),method=selectedPayment(),cash=Number($('cash-amount').value);
 if(!t.count||!method||(method==='cash'&&($('cash-amount').value===''||!Number.isFinite(cash)||cash<t.total))){$('payment-error').textContent='Revisá la forma de pago y el importe antes de simular.';$('payment-error').hidden=false;return;}
 $('payment-error').hidden=true;
 $('payment-result-detail').textContent='Total de referencia: '+money(t.total)+' UYU. '+(method==='cash'?'Efectivo: pagás con '+money(cash)+'. Vuelto: '+money(Math.round((cash-t.total)*100)/100)+'.':'Transferencia simulada por '+money(t.total)+'.');
 $('payment-result').hidden=false;$('simulate-payment').textContent='VOLVER A SIMULAR';
 $('payment-result').scrollIntoView({block:'nearest',behavior:'smooth'});
});

window.addEventListener('hashchange',route);renderCategories();renderCart();route();

// La bienvenida aparece al entrar al sitio, sin interrumpir enlaces a categorías.
function openWelcome(){
 $('nav-dialog').close();$('cart-dialog').close();
 $('welcome-screen').hidden=false;$('menu-app').hidden=true;
 document.body.classList.add('welcome-active');
 document.title='Bienvenidos · Locos por la Comida';
 window.scrollTo({top:0,behavior:'instant'});
 requestAnimationFrame(()=>$('enter-menu').focus({preventScroll:true}));
}
function enterMenu(){
 $('welcome-screen').hidden=true;$('menu-app').hidden=false;
 document.body.classList.remove('welcome-active');
 history.replaceState(null,'',location.pathname+location.search+'#inicio');
 route();
 requestAnimationFrame(()=>$('open-menu').focus({preventScroll:true}));
}
$('enter-menu').addEventListener('click',enterMenu);
$('show-welcome').addEventListener('click',()=>{location.hash='bienvenida'});
