let cat=null;
let mode='Delivery';
const cart=new Map();
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const money=n=>'$ '+n.toLocaleString('es-UY');

function renderCats(){
  $('#categories').innerHTML=DENEXA_DATA.categories.map(c=>`
    <button class="cat ${cat===c.name?'active':''}" data-cat="${c.name}">
      <img src="${c.img}" alt="${c.name}">
      <span>${c.name}</span>
    </button>
  `).join('');

  $$('.cat').forEach(b=>{
    b.onclick=()=>{
      cat=b.dataset.cat;
      renderCats();
      renderProducts();
      $('#catalogSection').scrollIntoView({behavior:'smooth'});
    };
  });
}

function visibleProducts(){
  return cat
    ? DENEXA_DATA.products.filter(p=>p.c===cat)
    : DENEXA_DATA.products.slice(0,4);
}

function renderProducts(){
  const list=visibleProducts();
  $('#catalogTitle').textContent=cat?cat:'Destacados';

  $('#products').innerHTML=list.map(p=>`
    <article class="product">
      <div class="prod-img"><img src="${p.img}" alt="${p.n}"></div>
      <div class="prod-body">
        <h3>${p.n}</h3>
        <p>${p.d}</p>
        <div class="price">${money(p.p)}</div>
        <div class="qty">
          <button data-m="${p.id}">-</button>
          <span>${cart.get(p.id)||0}</span>
          <button data-p="${p.id}">+</button>
        </div>
      </div>
    </article>
  `).join('');

  $$('[data-p]').forEach(b=>b.onclick=()=>changeQty(+b.dataset.p,1));
  $$('[data-m]').forEach(b=>b.onclick=()=>changeQty(+b.dataset.m,-1));
}

function changeQty(id,delta){
  const qty=Math.max(0,(cart.get(id)||0)+delta);
  qty?cart.set(id,qty):cart.delete(id);
  renderProducts();
  updateCartUi();
}

function totals(){
  let count=0,total=0;
  cart.forEach((qty,id)=>{
    const p=DENEXA_DATA.products.find(x=>x.id===id);
    count+=qty;
    total+=qty*p.p;
  });
  return [count,total];
}

function updateCartUi(){
  const [count,total]=totals();
  if($('#cartBadge')) $('#cartBadge').textContent=count;
  if($('#navBadge')) $('#navBadge').textContent=count;
  if($('#floatingCount')) $('#floatingCount').textContent=count;
  if($('#floatingTotal')) $('#floatingTotal').textContent=money(total);
  if($('#floatingCart')) $('#floatingCart').classList.toggle('show',count>0);
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
    const p=DENEXA_DATA.products.find(x=>x.id===id);
    html+=`
      <div class="cart-row">
        <div>
          <b>${p.n}</b>
          <p>${p.d}</p>
          <strong>${money(p.p*qty)}</strong>
        </div>
        <div class="controls">
          <button data-cm="${id}">-</button>
          <b>${qty}</b>
          <button data-cp="${id}">+</button>
        </div>
      </div>
    `;
  });

  $('#cartItems').innerHTML=html||'<p>Tu pedido esta vacio.</p>';
  $('#cartTotal').textContent=money(totals()[1]);

  $$('[data-cp]').forEach(b=>b.onclick=()=>{changeQty(+b.dataset.cp,1);renderCart();});
  $$('[data-cm]').forEach(b=>b.onclick=()=>{changeQty(+b.dataset.cm,-1);renderCart();});
}

function openCart(){
  renderCart();
  openModal('#cartModal');
}

if($('#cartTop')) $('#cartTop').onclick=openCart;
if($('#navCart')) $('#navCart').onclick=openCart;
if($('#floatingCart')) $('#floatingCart').onclick=openCart;

$('#navHome').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
$('#navCategories').onclick=()=>$('#categoriesSection').scrollIntoView({behavior:'smooth'});
$('#backCategories').onclick=()=>$('#categoriesSection').scrollIntoView({behavior:'smooth'});
$('#promoJump').onclick=()=>{
  cat='Promo del dia';
  renderCats();
  renderProducts();
  $('#catalogSection').scrollIntoView({behavior:'smooth'});
};

$$('.close').forEach(b=>b.onclick=closeModals);
$$('.modal').forEach(m=>m.onclick=e=>{if(e.target===m)closeModals();});

$$('[data-mode]').forEach(b=>{
  b.onclick=()=>{
    mode=b.dataset.mode;
    $$('[data-mode]').forEach(x=>x.classList.toggle('active',x.dataset.mode===mode));
  };
});

$('#checkout').onclick=()=>{
  if(!cart.size)return;
  closeModals();
  openModal('#checkoutModal');
};

$$('[data-checkout-mode]').forEach(b=>{
  b.onclick=()=>{
    mode=b.dataset.checkoutMode;
    $$('[data-checkout-mode]').forEach(x=>x.classList.toggle('active',x.dataset.checkoutMode===mode));
    $('#addressField').style.display=mode==='Delivery'?'block':'none';
  };
});

$('#finish').onclick=()=>{
  if(!$('#name').value.trim()){
    alert('Escribi un nombre.');
    return;
  }
  closeModals();
  openModal('#successModal');
};

$('#restart').onclick=()=>{
  cart.clear();
  cat=null;
  mode='Delivery';
  updateCartUi();
  renderCats();
  renderProducts();
  closeModals();
  window.scrollTo({top:0,behavior:'smooth'});
};

renderCats();
renderProducts();
updateCartUi();
