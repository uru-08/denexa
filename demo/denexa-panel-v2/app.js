const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const toast=msg=>{const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1500)};

const categories=[
{name:'Hamburguesas',img:'cat-hamburguesas.jpg'},
{name:'Pizzas',img:'cat-pizzas.jpg'},
{name:'Empanadas',img:'cat-empanadas.jpg'},
{name:'Milanesas',img:'cat-milanesas.jpg'},
{name:'Chivitos',img:'cat-chivitos.jpg'},
{name:'Ensaladas',img:'cat-ensaladas.jpg'},
{name:'Bebidas',img:'cat-bebidas.jpg'},
{name:'Postres',img:'cat-postres.jpg'}
];

const products=[
{name:'Hamburguesa completa',cat:'Hamburguesas',price:390,img:'cat-hamburguesas.jpg'},
{name:'Hamburguesa doble',cat:'Hamburguesas',price:460,img:'cat-hamburguesas.jpg'},
{name:'Pizza muzzarella',cat:'Pizzas',price:450,img:'cat-pizzas.jpg'},
{name:'Empanadas x6',cat:'Empanadas',price:360,img:'cat-empanadas.jpg'},
{name:'Milanesa completa',cat:'Milanesas',price:480,img:'cat-milanesas.jpg'},
{name:'Chivito completo',cat:'Chivitos',price:520,img:'cat-chivitos.jpg'},
{name:'Ensalada fresca',cat:'Ensaladas',price:280,img:'cat-ensaladas.jpg'},
{name:'Refresco 600 ml',cat:'Bebidas',price:120,img:'cat-bebidas.jpg'},
{name:'Postre del día',cat:'Postres',price:190,img:'cat-postres.jpg'}
];

function showView(name){
  $$('.view').forEach(v=>v.classList.remove('active'));
  $$('.nav').forEach(v=>v.classList.toggle('active',v.dataset.view===name));
  $('#view-'+name).classList.add('active');
  $('#sidebar').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}
$$('.nav').forEach(b=>b.onclick=()=>showView(b.dataset.view));
$$('[data-go]').forEach(b=>b.onclick=()=>showView(b.dataset.go));
$('#menuToggle').onclick=()=>$('#sidebar').classList.toggle('open');

const catFilter=$('#catFilter');
categories.forEach(c=>catFilter.insertAdjacentHTML('beforeend',`<option>${c.name}</option>`));

function renderProducts(){
  const q=$('#search').value.toLowerCase(), cat=catFilter.value;
  const list=products.filter(p=>(!cat||p.cat===cat)&&p.name.toLowerCase().includes(q));
  $('#products').innerHTML=list.map((p,i)=>`
    <article class="product">
      <img src="assets/${p.img}" alt="">
      <div class="body">
        <h3>${p.name}</h3>
        <p>${p.cat}</p>
        <div class="price">$ ${p.price}</div>
        <div class="row"><button data-edit="${i}">Editar</button><button data-hide="${i}">Ocultar</button></div>
      </div>
    </article>`).join('');
  $$('[data-edit]').forEach(b=>b.onclick=()=>toast('Edición simulada'));
  $$('[data-hide]').forEach(b=>b.onclick=()=>toast('Producto ocultado en el demo'));
}
$('#search').oninput=renderProducts; catFilter.onchange=renderProducts; renderProducts();

function renderCategories(){
  $('#categories').innerHTML=categories.map((c,i)=>`
    <article class="cat-row">
      <img src="assets/${c.img}" alt="">
      <div><b>${c.name}</b><small> Posición ${i+1}</small></div>
      <div><button data-up="${i}">↑</button> <button data-down="${i}">↓</button></div>
    </article>`).join('');
  $$('[data-up]').forEach(b=>b.onclick=()=>move(+b.dataset.up,-1));
  $$('[data-down]').forEach(b=>b.onclick=()=>move(+b.dataset.down,1));
}
function move(i,d){
  const j=i+d;if(j<0||j>=categories.length)return;
  [categories[i],categories[j]]=[categories[j],categories[i]];
  renderCategories(); toast('Orden actualizado en el demo');
}
renderCategories();

$('#newProduct').onclick=()=>toast('Nuevo producto: función demo');
$$('.gold').forEach(b=>{if(!b.id)b.onclick=()=>toast('Acción simulada en el demo')});
$$('.settings input,.settings select').forEach(el=>el.onchange=()=>toast('Cambio guardado en el demo'));
