const categories=[
{name:'Hamburguesas',img:'cat-hamburguesas.jpg'},{name:'Pizzas',img:'cat-pizzas.jpg'},{name:'Empanadas',img:'cat-empanadas.jpg'},{name:'Milanesas',img:'cat-milanesas.jpg'},
{name:'Chivitos',img:'cat-chivitos.jpg'},{name:'Ensaladas',img:'cat-ensaladas.jpg'},{name:'Bebidas',img:'cat-bebidas.jpg'},{name:'Postres',img:'cat-postres.jpg'}];

const products=[
{id:1,c:'Hamburguesas',n:'Hamburguesa completa',d:'Carne, cheddar, vegetales y salsa.',p:390,img:'cat-hamburguesas.jpg',anim:'burger'},
{id:2,c:'Hamburguesas',n:'Hamburguesa doble',d:'Doble carne, doble cheddar.',p:460,img:'cat-hamburguesas.jpg'},
{id:3,c:'Pizzas',n:'Pizza muzzarella',d:'Salsa, muzzarella y orégano.',p:450,img:'cat-pizzas.jpg',anim:'pizza'},
{id:4,c:'Empanadas',n:'Empanadas x6',d:'Seis empanadas surtidas.',p:360,img:'cat-empanadas.jpg',anim:'empanadas'},
{id:5,c:'Milanesas',n:'Milanesa completa',d:'Milanesa con guarnición.',p:480,img:'cat-milanesas.jpg'},
{id:6,c:'Chivitos',n:'Chivito completo',d:'Carne, jamón, queso y vegetales.',p:520,img:'cat-chivitos.jpg'},
{id:7,c:'Ensaladas',n:'Ensalada fresca',d:'Mix de hojas y vegetales.',p:280,img:'cat-ensaladas.jpg'},
{id:8,c:'Bebidas',n:'Refresco 600 ml',d:'Bebida fría a elección.',p:120,img:'cat-bebidas.jpg',anim:'drink'},
{id:9,c:'Postres',n:'Postre del día',d:'Una opción dulce para terminar.',p:190,img:'cat-postres.jpg'}
];

let cat=null,mode='Delivery';
const cart=new Map(),$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const money=n=>'$ '+n.toLocaleString('es-UY');

function renderCats(){
  $('#categories').innerHTML=categories.map(c=>`
    <button class="cat ${cat===c.name?'active':''}" data-cat="${c.name}">
      <img src="assets/${c.img}" alt="${c.name}">
      <span>${c.name.toUpperCase()}</span>
    </button>`).join('');

  $$('.cat').forEach(b=>b.onclick=()=>{
    cat=b.dataset.cat;
    renderCats();
    renderProducts();
    $('#catalogSection').scrollIntoView({behavior:'smooth'});
  });
}

function visible(){
  return cat?products.filter(p=>p.c===cat):products.slice(0,4);
}

function animationVisual(p){
  if(!p.anim)return `<img src="assets/${p.img}" alt="${p.n}">`;

  const scenes={
    burger:`
      <div class="food-scene burger-scene" aria-hidden="true">
        <span class="food-shadow"></span>
        <span class="burger-piece bun-bottom"></span>
        <span class="burger-piece lettuce-bottom"></span>
        <span class="burger-piece patty"></span>
        <span class="burger-piece cheese"></span>
        <span class="burger-piece tomato"></span>
        <span class="burger-piece lettuce-top"></span>
        <span class="burger-piece bun-top"><i></i><i></i><i></i><i></i></span>
      </div>`,
    pizza:`
      <div class="food-scene pizza-scene" aria-hidden="true">
        <span class="food-shadow"></span>
        <span class="pizza-base"></span>
        <span class="pizza-sauce"></span>
        <span class="pizza-cheese"></span>
        <i class="pizza-topping t1"></i><i class="pizza-topping t2"></i>
        <i class="pizza-topping t3"></i><i class="pizza-topping t4"></i>
        <i class="pizza-topping t5"></i><i class="pizza-topping t6"></i>
      </div>`,
    empanadas:`
      <div class="food-scene empanada-scene" aria-hidden="true">
        <span class="food-shadow"></span>
        <span class="empanada e1"><i></i></span>
        <span class="empanada e2"><i></i></span>
        <span class="empanada e3"><i></i></span>
      </div>`,
    drink:`
      <div class="food-scene drink-scene" aria-hidden="true">
        <span class="food-shadow"></span>
        <span class="drink-cup"><i class="drink-fill"></i><i class="drink-shine"></i></span>
        <span class="drink-lid"></span><span class="drink-straw"></span>
        <i class="drink-bubble b1"></i><i class="drink-bubble b2"></i>
        <i class="drink-bubble b3"></i><i class="drink-bubble b4"></i>
      </div>`
  };

  return `
    <div class="product-media product-media--${p.anim}" role="img" aria-label="${p.n} animada">
      ${scenes[p.anim]}
    </div>`;
}

function renderProducts(){
  const list=visible();
  $('#catalogTitle').textContent=cat?cat.toUpperCase():'DESTACADOS';

  $('#products').innerHTML=list.map(p=>`
    <article class="product ${p.anim?'product--animated':''}">
      ${animationVisual(p)}
      <div class="prod-body">
        <h3>${p.n}</h3>
        <p>${p.d}</p>
        <div class="price">${money(p.p)}</div>
        <div class="qty">
          <button data-m="${p.id}">−</button>
          <span>${cart.get(p.id)||0}</span>
          <button data-p="${p.id}">+</button>
        </div>
      </div>
    </article>`).join('');

  $$('[data-p]').forEach(b=>b.onclick=()=>chg(+b.dataset.p,1));
  $$('[data-m]').forEach(b=>b.onclick=()=>chg(+b.dataset.m,-1));
}

function chg(id,d){
  const q=Math.max(0,(cart.get(id)||0)+d);
  q?cart.set(id,q):cart.delete(id);
  renderProducts();
  update();
}

function totals(){
  let n=0,t=0;
  cart.forEach((q,id)=>{
    const p=products.find(x=>x.id===id);
    n+=q;
    t+=q*p.p;
  });
  return[n,t];
}

function update(){
  const[n,t]=totals();
  $('#navBadge').textContent=n;
  $('#floatingCount').textContent=n;
  $('#floatingTotal').textContent=money(t);
  $('#floatingCart').classList.toggle('show',n>0);
}

function open(id){
  $(id).classList.add('open');
  document.body.style.overflow='hidden';
}

function close(){
  $$('.modal').forEach(m=>m.classList.remove('open'));
  document.body.style.overflow='';
}

function renderCart(){
  let h='';
  cart.forEach((q,id)=>{
    const p=products.find(x=>x.id===id);
    h+=`
      <div class="cart-row">
        <div><b>${p.n}</b><br><small>${money(p.p*q)}</small></div>
        <div class="controls">
          <button data-cm="${id}">−</button><b>${q}</b><button data-cp="${id}">+</button>
        </div>
      </div>`;
  });

  $('#cartItems').innerHTML=h||'<p>Tu pedido está vacío.</p>';
  $('#cartTotal').textContent=money(totals()[1]);

  $$('[data-cp]').forEach(b=>b.onclick=()=>{chg(+b.dataset.cp,1);renderCart();});
  $$('[data-cm]').forEach(b=>b.onclick=()=>{chg(+b.dataset.cm,-1);renderCart();});
}

function setMode(v){
  mode=v;
  $$('[data-mode]').forEach(x=>x.classList.toggle('active',x.dataset.mode===v));
  $$('[data-checkout-mode]').forEach(x=>x.classList.toggle('active',x.dataset.checkoutMode===v));
  $('#addressField').style.display=v==='Delivery'?'block':'none';
}

function openCart(){
  renderCart();
  open('#cartModal');
}

$('#navCart').onclick=$('#floatingCart').onclick=openCart;
$('#navHome').onclick=()=>scrollTo({top:0,behavior:'smooth'});
$('#navCategories').onclick=$('#backCategories').onclick=()=>$('#categoriesSection').scrollIntoView({behavior:'smooth'});
$$('.close').forEach(b=>b.onclick=close);
$$('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)close();});
$$('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
$$('[data-checkout-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.checkoutMode));

$('#promoCard').onclick=()=>$('#catalogSection').scrollIntoView({behavior:'smooth'});

$('#checkout').onclick=()=>{
  if(!cart.size)return;
  close();
  setMode(mode);
  open('#checkoutModal');
};

$('#finish').onclick=()=>{
  if(!$('#name').value.trim())return alert('Escribí un nombre.');
  close();
  open('#successModal');
};

$('#restart').onclick=()=>{
  cart.clear();
  cat=null;
  setMode('Delivery');
  update();
  renderCats();
  renderProducts();
  close();
  scrollTo({top:0,behavior:'smooth'});
};

renderCats();
renderProducts();
update();
setMode('Delivery');
