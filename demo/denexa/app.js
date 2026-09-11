const categories=[
{name:'Hamburguesas',img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=90'},
{name:'Pizzas',img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=90'},
{name:'Empanadas',img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=90'},
{name:'Milanesas',img:'https://images.unsplash.com/photo-1562967916-eb82221dfb36?auto=format&fit=crop&w=700&q=90'},
{name:'Chivitos',img:'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=90'},
{name:'Picadas',img:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=90'},
{name:'Ensaladas',img:'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=90'},
{name:'Bebidas',img:'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=700&q=90'},
{name:'Postres',img:'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=90'},
{name:'Cafetería',img:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=90'},
{name:'Extras',img:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=90'},
{name:'Promo del día',img:'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=90'}
];

const products=[
{id:1,c:'Hamburguesas',n:'Hamburguesa completa',d:'Carne, cheddar, bacon, lechuga y tomate.',p:390,img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=90'},
{id:2,c:'Hamburguesas',n:'Hamburguesa doble',d:'Doble carne, doble cheddar y salsa especial.',p:460,img:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=90'},
{id:3,c:'Pizzas',n:'Pizza muzzarella',d:'Salsa de tomate, muzzarella y orégano.',p:420,img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=90'},
{id:4,c:'Pizzas',n:'Pizza especial',d:'Muzzarella, jamón, morrón y aceitunas.',p:520,img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=90'},
{id:5,c:'Empanadas',n:'Empanadas x6',d:'Seis empanadas surtidas a elección.',p:360,img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=90'},
{id:6,c:'Milanesas',n:'Milanesa con papas',d:'Milanesa crocante acompañada con papas fritas.',p:470,img:'https://images.unsplash.com/photo-1562967916-eb82221dfb36?auto=format&fit=crop&w=800&q=90'},
{id:7,c:'Chivitos',n:'Chivito completo',d:'Carne, jamón, queso, huevo y vegetales.',p:520,img:'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=90'},
{id:8,c:'Picadas',n:'Picada para dos',d:'Fiambres, quesos y acompañamientos.',p:650,img:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=90'},
{id:9,c:'Ensaladas',n:'Ensalada fresca',d:'Mix de hojas, tomate y vegetales.',p:300,img:'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=90'},
{id:10,c:'Bebidas',n:'Refresco 600 ml',d:'Bebida fría a elección.',p:120,img:'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=800&q=90'},
{id:11,c:'Postres',n:'Brownie con helado',d:'Brownie tibio con helado y salsa de chocolate.',p:250,img:'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=90'},
{id:12,c:'Cafetería',n:'Café especial',d:'Café cremoso recién preparado.',p:160,img:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=90'},
{id:13,c:'Extras',n:'Papas fritas',d:'Porción de papas crocantes.',p:180,img:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=90'},
{id:14,c:'Promo del día',n:'Promo DENEXA',d:'2 hamburguesas + papas + bebida.',p:790,img:'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=90'}
];

let cat=null, mode='Delivery';
const cart=new Map(),$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const money=n=>'$ '+n.toLocaleString('es-UY');

function renderCats(){
  $('#categories').innerHTML=categories.map(c=>`<button class="cat ${cat===c.name?'active':''}" data-cat="${c.name}"><img src="${c.img}" alt=""><span>${c.name.toUpperCase()}</span></button>`).join('');
  $$('.cat').forEach(b=>b.onclick=()=>{
    cat=b.dataset.cat;
    renderCats();
    renderProducts();
    $('#catalogSection').scrollIntoView({behavior:'smooth'});
  });
}

function visible(){return cat?products.filter(p=>p.c===cat):products.slice(0,4)}

function renderProducts(){
  let list=visible();
  $('#catalogTitle').innerHTML=(cat?cat:'Destacados')+' <span>✦</span>';
  $('#products').innerHTML=list.map(p=>`<article class="product"><div class="prod-img"><img src="${p.img}" alt="${p.n}"></div><div class="prod-body"><h3>${p.n}</h3><p>${p.d}</p><div class="price">${money(p.p)}</div><div class="qty"><button data-m="${p.id}">−</button><span>${cart.get(p.id)||0}</span><button data-p="${p.id}">+</button></div></div></article>`).join('');
  $$('[data-p]').forEach(b=>b.onclick=()=>chg(+b.dataset.p,1));
  $$('[data-m]').forEach(b=>b.onclick=()=>chg(+b.dataset.m,-1));
}

function chg(id,d){
  let q=Math.max(0,(cart.get(id)||0)+d);
  q?cart.set(id,q):cart.delete(id);
  renderProducts();
  update();
}

function totals(){
  let n=0,t=0;
  cart.forEach((q,id)=>{
    let p=products.find(x=>x.id===id);
    n+=q;t+=q*p.p
  });
  return[n,t]
}

function update(){
  let[n,t]=totals();
  if($('#navBadge')) $('#navBadge').textContent=n;
  if($('#floatingCount')) $('#floatingCount').textContent=n;
  if($('#floatingTotal')) $('#floatingTotal').textContent=money(t);
  if($('#floatingCart')) $('#floatingCart').classList.toggle('show',n>0)
}

function open(id){$(id).classList.add('open');document.body.style.overflow='hidden'}
function close(){$$('.modal').forEach(m=>m.classList.remove('open'));document.body.style.overflow=''}

function renderCart(){
  let h='';
  cart.forEach((q,id)=>{
    let p=products.find(x=>x.id===id);
    h+=`<div class="cart-row"><div><b>${p.n}</b><p>${p.d}</p><strong>${money(p.p*q)}</strong></div><div class="controls"><button data-cm="${id}">−</button><b>${q}</b><button data-cp="${id}">+</button></div></div>`
  });
  $('#cartItems').innerHTML=h||'<p>Tu pedido está vacío.</p>';
  $('#cartTotal').textContent=money(totals()[1]);
  $$('[data-cp]').forEach(b=>b.onclick=()=>{chg(+b.dataset.cp,1);renderCart()});
  $$('[data-cm]').forEach(b=>b.onclick=()=>{chg(+b.dataset.cm,-1);renderCart()});
}

function openCart(){renderCart();open('#cartModal')}

$('#navCart').onclick=openCart;
$('#floatingCart').onclick=openCart;
$('#navHome').onclick=()=>scrollTo({top:0,behavior:'smooth'});
$('#navCategories').onclick=$('#backCategories').onclick=()=>$('#categoriesSection').scrollIntoView({behavior:'smooth'});

$('#promoButton').onclick=()=>{
  cat='Promo del día';
  renderCats();
  renderProducts();
  $('#catalogSection').scrollIntoView({behavior:'smooth'})
};

$$('.close').forEach(b=>b.onclick=close);
$$('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)close()});

$$('[data-mode]').forEach(b=>b.onclick=()=>{
  mode=b.dataset.mode;
  $$('[data-mode]').forEach(x=>x.classList.toggle('active',x.dataset.mode===mode))
});

$('#checkout').onclick=()=>{
  if(!cart.size)return;
  close();
  open('#checkoutModal')
};

$$('[data-checkout-mode]').forEach(b=>b.onclick=()=>{
  mode=b.dataset.checkoutMode;
  $$('[data-checkout-mode]').forEach(x=>x.classList.toggle('active',x.dataset.checkoutMode===mode));
  $('#addressField').style.display=mode==='Delivery'?'block':'none'
});

$('#finish').onclick=()=>{
  if(!$('#name').value.trim())return alert('Escribí un nombre.');
  close();open('#successModal')
};

$('#restart').onclick=()=>{
  cart.clear();cat=null;mode='Delivery';
  update();renderCats();renderProducts();close();
  scrollTo({top:0,behavior:'smooth'})
};

renderCats();
renderProducts();
update();
