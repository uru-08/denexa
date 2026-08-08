*{
  box-sizing:border-box;
}

:root{
  --primary:#0B43A0;
  --primary-2:#0E5BD8;
  --primary-dark:#052B6C;
  --primary-deep:#031B46;
  --accent:#F4C565;
  --bg:#F3F7FD;
  --surface:#FFFFFF;
  --surface-soft:#EEF5FF;
  --surface-blue:#E2EEFF;
  --text:#10213D;
  --muted:#66758E;
  --line:#D8E3F2;
  --success:#11845B;
  --danger:#B42318;
  --shadow:0 14px 38px rgba(5,43,108,.12);
  --shadow-strong:0 24px 70px rgba(3,27,70,.22);
}

html{
  scroll-behavior:smooth;
  background:var(--bg);
}

body{
  margin:0;
  min-height:100vh;
  background:
    radial-gradient(circle at 100% 0%,rgba(14,91,216,.08),transparent 26rem),
    var(--bg);
  color:var(--text);
  font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}

body.modal-open,
body.welcome-open{
  overflow:hidden;
}

button,
input,
select,
textarea{
  font:inherit;
}

button{
  -webkit-tap-highlight-color:transparent;
}

button,
.product-card,
.option-row,
.category-tab{
  touch-action:manipulation;
}

/* WELCOME */

.welcome-screen{
  position:fixed;
  inset:0;
  z-index:3000;
  display:grid;
  place-items:center;
  overflow:hidden;
  min-height:100dvh;
  padding:
    max(24px,env(safe-area-inset-top))
    22px
    max(24px,env(safe-area-inset-bottom));
  background:
    radial-gradient(circle at 50% 35%,rgba(44,119,255,.36),transparent 25rem),
    linear-gradient(155deg,#031A43 0%,#073B94 46%,#0E5BD8 100%);
  color:#fff;
  transition:
    opacity .55s ease,
    visibility .55s ease,
    transform .55s ease;
}

.welcome-screen.is-leaving{
  opacity:0;
  visibility:hidden;
  transform:scale(1.025);
}

.welcome-grid{
  position:absolute;
  inset:0;
  opacity:.14;
  background-image:
    linear-gradient(rgba(255,255,255,.11) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.11) 1px,transparent 1px);
  background-size:42px 42px;
  mask-image:linear-gradient(to bottom,transparent 0%,#000 18%,#000 76%,transparent 100%);
}

.welcome-glow{
  position:absolute;
  border-radius:50%;
  filter:blur(12px);
  pointer-events:none;
}

.welcome-glow-one{
  top:-110px;
  right:-100px;
  width:310px;
  height:310px;
  background:rgba(255,255,255,.12);
  animation:floatGlow 7s ease-in-out infinite alternate;
}

.welcome-glow-two{
  bottom:-120px;
  left:-90px;
  width:280px;
  height:280px;
  background:rgba(244,197,101,.13);
  animation:floatGlow 8s ease-in-out infinite alternate-reverse;
}

@keyframes floatGlow{
  from{transform:translate3d(-8px,-6px,0) scale(.96);}
  to{transform:translate3d(12px,10px,0) scale(1.05);}
}

.welcome-content{
  position:relative;
  z-index:2;
  width:min(520px,100%);
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
}

.welcome-status{
  display:inline-flex;
  align-items:center;
  gap:8px;
  margin-bottom:18px;
  padding:8px 12px;
  border:1px solid rgba(255,255,255,.26);
  border-radius:999px;
  background:rgba(255,255,255,.11);
  color:rgba(255,255,255,.92);
  font-size:.78rem;
  font-weight:800;
  backdrop-filter:blur(10px);
}

.status-dot{
  width:8px;
  height:8px;
  flex:0 0 8px;
  border-radius:50%;
  background:#51E3A4;
  box-shadow:0 0 0 4px rgba(81,227,164,.14);
}

.welcome-logo-wrap{
  position:relative;
  width:min(292px,73vw);
  aspect-ratio:1;
  display:grid;
  place-items:center;
  margin:0 auto 14px;
  animation:logoEntrance .8s cubic-bezier(.2,.8,.2,1) both;
}

.welcome-logo-ring{
  position:absolute;
  inset:7%;
  border:1px solid rgba(255,255,255,.22);
  border-radius:50%;
  box-shadow:
    0 0 0 16px rgba(255,255,255,.035),
    0 28px 60px rgba(0,0,0,.24);
}

.welcome-logo{
  position:relative;
  z-index:2;
  width:100%;
  height:100%;
  object-fit:contain;
  filter:drop-shadow(0 18px 26px rgba(0,0,0,.25));
}

@keyframes logoEntrance{
  from{
    opacity:0;
    transform:translateY(18px) scale(.92);
  }
  to{
    opacity:1;
    transform:none;
  }
}

.welcome-copy{
  animation:copyEntrance .75s .13s ease both;
}

@keyframes copyEntrance{
  from{opacity:0;transform:translateY(12px);}
  to{opacity:1;transform:none;}
}

.welcome-kicker{
  margin:0 0 6px;
  color:rgba(255,255,255,.72);
  font-size:.72rem;
  font-weight:900;
  letter-spacing:.17em;
}

.welcome-copy h1{
  margin:0;
  font-size:clamp(2.15rem,10vw,3.5rem);
  line-height:1;
  letter-spacing:-.045em;
}

.welcome-copy p:last-child{
  max-width:390px;
  margin:12px auto 0;
  color:rgba(255,255,255,.82);
  font-size:.96rem;
  line-height:1.5;
}

.welcome-button{
  width:min(330px,100%);
  min-height:56px;
  display:flex;
  justify-content:center;
  align-items:center;
  gap:12px;
  margin-top:24px;
  border:0;
  border-radius:18px;
  background:#fff;
  color:var(--primary-dark);
  font-weight:950;
  cursor:pointer;
  box-shadow:0 18px 45px rgba(0,0,0,.22);
  transition:transform .18s ease,box-shadow .18s ease;
  animation:copyEntrance .75s .23s ease both;
}

.welcome-button:active{
  transform:scale(.98);
}

.welcome-arrow{
  font-size:1.25rem;
}

.welcome-note{
  margin:12px 0 0;
  color:rgba(255,255,255,.65);
  font-size:.76rem;
  font-weight:700;
}

/* APP */

.app-shell{
  min-height:100vh;
  padding-bottom:104px;
}

.store-header{
  position:relative;
  overflow:hidden;
  padding:
    max(16px,env(safe-area-inset-top))
    18px
    26px;
  background:
    radial-gradient(circle at 95% 0%,rgba(255,255,255,.16),transparent 18rem),
    linear-gradient(135deg,var(--primary-dark),var(--primary-2));
  color:#fff;
}

.store-header::after{
  content:"";
  position:absolute;
  right:-88px;
  bottom:-120px;
  width:270px;
  height:270px;
  border:34px solid rgba(255,255,255,.055);
  border-radius:50%;
}

.store-header-inner{
  position:relative;
  z-index:2;
  width:min(1080px,100%);
  margin:0 auto;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:16px;
}

.store-brand{
  min-width:0;
  display:flex;
  align-items:center;
  gap:13px;
}

.store-logo{
  width:66px;
  height:66px;
  flex:0 0 66px;
  display:grid;
  place-items:center;
  border-radius:20px;
  background:rgba(255,255,255,.96);
  box-shadow:0 10px 28px rgba(0,0,0,.2);
  overflow:hidden;
}

.store-logo img{
  width:92%;
  height:92%;
  object-fit:contain;
}

.store-heading{
  min-width:0;
}

.store-kicker{
  margin:0 0 4px;
  color:rgba(255,255,255,.72);
  font-size:.68rem;
  font-weight:900;
  letter-spacing:.14em;
}

.store-heading h1{
  margin:0;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  font-size:clamp(1.55rem,6vw,2.45rem);
  line-height:1;
  letter-spacing:-.04em;
}

.store-subtitle{
  margin:6px 0 0;
  max-width:520px;
  overflow:hidden;
  color:rgba(255,255,255,.78);
  font-size:.8rem;
  line-height:1.35;
  text-overflow:ellipsis;
  white-space:nowrap;
}

.store-status{
  flex:0 0 auto;
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:9px 12px;
  border:1px solid rgba(255,255,255,.27);
  border-radius:999px;
  background:rgba(255,255,255,.12);
  color:#fff;
  font-size:.74rem;
  font-weight:850;
  backdrop-filter:blur(8px);
}

.store-status.closed .status-dot{
  background:#F97066;
  box-shadow:0 0 0 4px rgba(249,112,102,.14);
}

.main-content{
  width:min(1080px,100%);
  margin:-10px auto 0;
  padding:0 16px 38px;
  position:relative;
  z-index:4;
}

.store-info-card{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:10px;
  padding:14px;
  border:1px solid rgba(216,227,242,.9);
  border-radius:20px;
  background:rgba(255,255,255,.96);
  box-shadow:var(--shadow);
}

.info-item{
  min-width:0;
  display:flex;
  align-items:center;
  gap:10px;
  padding:10px 11px;
  border-radius:14px;
  background:var(--surface-soft);
}

.info-icon{
  width:34px;
  height:34px;
  flex:0 0 34px;
  display:grid;
  place-items:center;
  border-radius:11px;
  background:var(--primary);
  color:#fff;
  font-size:.8rem;
  font-weight:900;
}

.info-label{
  display:block;
  margin-bottom:2px;
  color:var(--muted);
  font-size:.65rem;
  font-weight:900;
  letter-spacing:.08em;
  text-transform:uppercase;
}

.info-item strong{
  display:block;
  min-width:0;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  font-size:.87rem;
}

.catalog-section{
  padding-top:26px;
}

.section-heading{
  margin-bottom:16px;
}

.eyebrow{
  margin:0 0 5px;
  color:var(--primary);
  font-size:.7rem;
  font-weight:950;
  letter-spacing:.15em;
}

.section-heading h2,
.modal-title-row h2{
  margin:0;
  color:var(--text);
  font-size:clamp(1.45rem,6vw,2rem);
  line-height:1.12;
  letter-spacing:-.035em;
}

.section-subtitle{
  margin:7px 0 0;
  color:var(--muted);
  font-size:.84rem;
  line-height:1.45;
}

.category-tabs{
  position:sticky;
  top:0;
  z-index:20;
  display:flex;
  gap:8px;
  overflow-x:auto;
  margin:0 -16px;
  padding:10px 16px 13px;
  background:linear-gradient(to bottom,var(--bg) 82%,rgba(243,247,253,0));
  scrollbar-width:none;
}

.category-tabs::-webkit-scrollbar{
  display:none;
}

.category-tab{
  flex:0 0 auto;
  min-height:42px;
  border:1px solid var(--line);
  border-radius:14px;
  padding:9px 14px;
  background:#fff;
  color:var(--primary-dark);
  font-size:.82rem;
  font-weight:900;
  cursor:pointer;
  white-space:nowrap;
  box-shadow:0 5px 15px rgba(5,43,108,.05);
  transition:.17s ease;
}

.category-tab.active{
  border-color:var(--primary);
  background:linear-gradient(135deg,var(--primary),var(--primary-2));
  color:#fff;
  box-shadow:0 9px 22px rgba(11,67,160,.22);
}

.catalog-content{
  display:grid;
  gap:25px;
  padding-top:4px;
}

.category-section{
  display:grid;
  gap:12px;
  scroll-margin-top:72px;
}

.category-section-title{
  display:flex;
  align-items:flex-end;
  justify-content:space-between;
  gap:12px;
  padding:0 2px;
}

.category-section-title h3{
  margin:0;
  color:var(--primary-dark);
  font-size:1.15rem;
  letter-spacing:-.02em;
}

.category-section-title span{
  flex:0 0 auto;
  color:var(--muted);
  font-size:.75rem;
  font-weight:800;
}

.products-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:14px;
}

.product-card{
  width:100%;
  min-width:0;
  display:grid;
  grid-template-columns:128px minmax(0,1fr);
  min-height:152px;
  padding:0;
  overflow:hidden;
  border:1px solid var(--line);
  border-radius:20px;
  background:#fff;
  color:inherit;
  text-align:left;
  cursor:pointer;
  box-shadow:0 8px 24px rgba(5,43,108,.08);
  transition:transform .18s ease,box-shadow .18s ease;
}

.product-card:hover{
  transform:translateY(-2px);
  box-shadow:var(--shadow);
}

.product-image{
  position:relative;
  min-width:0;
  min-height:152px;
  overflow:hidden;
  background:
    radial-gradient(circle at 30% 20%,rgba(255,255,255,.5),transparent 36%),
    linear-gradient(145deg,#D8E9FF,#BFD7FF);
}

.product-image img{
  width:100%;
  height:100%;
  min-height:152px;
  display:block;
  object-fit:cover;
}

.product-image-placeholder{
  width:100%;
  height:100%;
  min-height:152px;
  display:grid;
  place-items:center;
  padding:14px;
  color:var(--primary);
  text-align:center;
}

.product-placeholder-mark{
  width:54px;
  height:54px;
  display:grid;
  place-items:center;
  border:2px solid rgba(11,67,160,.22);
  border-radius:50%;
  background:rgba(255,255,255,.66);
  font-size:1.05rem;
  font-weight:950;
  box-shadow:0 7px 18px rgba(5,43,108,.08);
}

.featured-badge{
  position:absolute;
  top:9px;
  left:9px;
  max-width:calc(100% - 18px);
  overflow:hidden;
  padding:6px 8px;
  border-radius:999px;
  background:var(--accent);
  color:#573A00;
  font-size:.62rem;
  font-weight:950;
  text-overflow:ellipsis;
  white-space:nowrap;
  box-shadow:0 4px 12px rgba(0,0,0,.1);
}

.product-info{
  min-width:0;
  display:flex;
  flex-direction:column;
  padding:15px 14px;
}

.product-info h4{
  margin:0;
  overflow-wrap:anywhere;
  word-break:normal;
  color:var(--text);
  font-size:1.02rem;
  line-height:1.2;
}

.product-description{
  display:-webkit-box;
  margin:7px 0 10px;
  overflow:hidden;
  overflow-wrap:anywhere;
  color:var(--muted);
  font-size:.8rem;
  line-height:1.35;
  -webkit-line-clamp:2;
  -webkit-box-orient:vertical;
}

.product-price{
  margin-top:auto;
  color:var(--primary);
  font-size:.9rem;
  font-weight:950;
}

.product-price small{
  margin-left:4px;
  color:var(--muted);
  font-weight:700;
}

.loading-card,
.empty-card,
.error-card{
  padding:22px 18px;
  border:1px solid var(--line);
  border-radius:18px;
  background:#fff;
  color:var(--muted);
  text-align:center;
  font-size:.86rem;
  font-weight:750;
  box-shadow:0 7px 20px rgba(5,43,108,.05);
}

.error-card{
  color:var(--danger);
}

.floating-cart{
  position:fixed;
  left:50%;
  bottom:max(14px,env(safe-area-inset-bottom));
  z-index:500;
  width:min(540px,calc(100% - 24px));
  min-height:64px;
  transform:translateX(-50%);
  display:grid;
  grid-template-columns:auto 1fr auto;
  align-items:center;
  gap:11px;
  padding:10px 13px;
  border:1px solid rgba(255,255,255,.12);
  border-radius:18px;
  background:linear-gradient(135deg,var(--primary-dark),var(--primary));
  color:#fff;
  cursor:pointer;
  box-shadow:0 16px 42px rgba(3,27,70,.32);
}

.cart-icon{
  width:40px;
  height:40px;
  display:grid;
  place-items:center;
  border-radius:12px;
  background:rgba(255,255,255,.13);
  font-size:1.1rem;
}

.cart-copy{
  min-width:0;
  display:grid;
  gap:2px;
  text-align:left;
}

.cart-copy strong{
  font-size:.92rem;
}

.cart-copy small{
  color:rgba(255,255,255,.7);
  font-size:.7rem;
}

.cart-price{
  font-size:1.05rem;
}

/* MODALS */

.modal{
  position:fixed;
  inset:0;
  z-index:1000;
  display:none;
  align-items:flex-end;
  justify-content:center;
}

.modal.open{
  display:flex;
}

.modal-backdrop{
  position:absolute;
  inset:0;
  background:rgba(3,27,70,.7);
  backdrop-filter:blur(4px);
}

.modal-card{
  position:relative;
  z-index:2;
  width:min(680px,100%);
  max-height:92dvh;
  overflow:auto;
  border:1px solid rgba(216,227,242,.8);
  border-radius:24px 24px 0 0;
  background:#fff;
  box-shadow:0 -25px 70px rgba(3,27,70,.28);
}

.product-modal-card{
  padding-bottom:24px;
}

.modal-close{
  position:absolute;
  top:14px;
  right:14px;
  z-index:4;
  width:40px;
  height:40px;
  display:grid;
  place-items:center;
  border:1px solid var(--line);
  border-radius:12px;
  background:rgba(255,255,255,.95);
  color:var(--primary-dark);
  font-size:1.55rem;
  cursor:pointer;
  box-shadow:0 6px 16px rgba(5,43,108,.1);
}

.inline-close{
  position:static;
  box-shadow:none;
  background:var(--surface-soft);
}

.product-modal-image{
  width:100%;
  aspect-ratio:16/9;
  display:block;
  object-fit:cover;
  background:var(--surface-blue);
}

.product-modal-body{
  padding:20px;
}

.product-modal-body h2{
  margin:0;
  padding-right:46px;
  overflow-wrap:anywhere;
  color:var(--text);
  font-size:1.5rem;
  line-height:1.18;
}

.product-modal-description{
  margin:8px 0 0;
  color:var(--muted);
  font-size:.88rem;
  line-height:1.5;
}

.live-price{
  display:inline-flex;
  margin-top:13px;
  padding:8px 11px;
  border-radius:11px;
  background:var(--surface-soft);
  color:var(--primary);
  font-size:1.1rem;
  font-weight:950;
}

.option-groups{
  display:grid;
  gap:18px;
  margin-top:20px;
}

.option-group{
  padding-top:17px;
  border-top:1px solid var(--line);
}

.option-group.hidden{
  display:none;
}

.option-group-header{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:12px;
  margin-bottom:10px;
}

.option-group-header h3{
  margin:0;
  overflow-wrap:anywhere;
  font-size:.98rem;
}

.option-group-header span{
  flex:0 0 auto;
  padding:5px 8px;
  border-radius:999px;
  background:var(--surface-soft);
  color:var(--primary);
  font-size:.62rem;
  font-weight:900;
}

.option-list{
  display:grid;
  gap:8px;
}

.option-row{
  display:flex;
  align-items:center;
  gap:10px;
  padding:11px 12px;
  border:1px solid var(--line);
  border-radius:13px;
  background:#fff;
  cursor:pointer;
  transition:.15s ease;
}

.option-row:has(input:checked){
  border-color:var(--primary);
  background:var(--surface-soft);
  box-shadow:0 0 0 2px rgba(11,67,160,.06);
}

.option-row input{
  width:18px;
  height:18px;
  flex:0 0 18px;
  accent-color:var(--primary);
}

.option-copy{
  flex:1;
  min-width:0;
}

.option-copy strong{
  display:block;
  overflow-wrap:anywhere;
  font-size:.9rem;
}

.option-copy small{
  display:block;
  margin-top:2px;
  color:var(--muted);
  font-size:.74rem;
  font-weight:700;
}

.product-actions{
  position:sticky;
  bottom:0;
  display:grid;
  grid-template-columns:auto minmax(0,1fr);
  gap:9px;
  margin:20px -20px -24px;
  padding:13px 20px max(18px,env(safe-area-inset-bottom));
  border-top:1px solid var(--line);
  background:rgba(255,255,255,.97);
  backdrop-filter:blur(10px);
}

.quantity-control{
  display:grid;
  grid-template-columns:38px 38px 38px;
  align-items:center;
  overflow:hidden;
  border:1px solid var(--line);
  border-radius:13px;
  background:#fff;
}

.quantity-control button{
  height:44px;
  border:0;
  background:#fff;
  color:var(--primary);
  font-size:1.2rem;
  font-weight:900;
  cursor:pointer;
}

.quantity-control strong{
  text-align:center;
  font-size:.9rem;
}

.primary-action{
  min-height:46px;
  border:0;
  border-radius:13px;
  padding:12px 16px;
  background:linear-gradient(135deg,var(--primary),var(--primary-2));
  color:#fff;
  font-weight:900;
  cursor:pointer;
  box-shadow:0 9px 22px rgba(11,67,160,.22);
}

.primary-action:disabled{
  opacity:.58;
  cursor:wait;
}

.form-error{
  display:none;
  margin-top:12px;
  padding:10px 12px;
  border-radius:10px;
  background:#FEF3F2;
  color:var(--danger);
  font-size:.8rem;
  font-weight:750;
}

.form-error.show{
  display:block;
}

/* CART */

.cart-modal-card,
.checkout-modal-card{
  padding:22px 18px 24px;
}

.modal-title-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:16px;
  margin-bottom:16px;
}

.cart-items{
  display:grid;
  gap:10px;
}

.cart-item{
  padding:13px;
  border:1px solid var(--line);
  border-radius:14px;
  background:#fff;
}

.cart-item-top{
  display:flex;
  justify-content:space-between;
  gap:14px;
}

.cart-item h3{
  margin:0;
  overflow-wrap:anywhere;
  font-size:.94rem;
}

.cart-item-options{
  margin:6px 0 0;
  color:var(--muted);
  font-size:.78rem;
  line-height:1.45;
}

.cart-item-bottom{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:14px;
  margin-top:11px;
  font-size:.8rem;
}

.cart-remove{
  border:0;
  background:transparent;
  color:var(--danger);
  font-size:.78rem;
  font-weight:850;
  cursor:pointer;
}

.cart-summary{
  position:sticky;
  bottom:-24px;
  margin:17px -18px -24px;
  padding:15px 18px max(24px,env(safe-area-inset-bottom));
  border-top:1px solid var(--line);
  background:#fff;
}

.cart-summary > div{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:12px;
  font-size:1rem;
}

.cart-summary .primary-action{
  width:100%;
}

.cart-note{
  margin:9px 0 0;
  color:var(--muted);
  font-size:.72rem;
  line-height:1.4;
  text-align:center;
}

/* CHECKOUT */

.checkout-grid{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:13px;
}

.field{
  display:grid;
  gap:6px;
}

.field.full-width{
  grid-column:1 / -1;
}

.field span{
  color:var(--text);
  font-size:.82rem;
  font-weight:800;
}

.field input,
.field select,
.field textarea{
  width:100%;
  min-height:46px;
  padding:11px 12px;
  border:1px solid var(--line);
  border-radius:12px;
  background:#fff;
  color:var(--text);
  font:inherit;
}

.field textarea{
  min-height:90px;
  resize:vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus{
  outline:none;
  border-color:var(--primary);
  box-shadow:0 0 0 4px rgba(11,67,160,.1);
}

.checkout-summary-card{
  display:grid;
  gap:8px;
  margin-top:17px;
  padding:14px;
  border:1px solid var(--line);
  border-radius:14px;
  background:var(--surface-soft);
}

.checkout-summary-line{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:14px;
  color:var(--muted);
  font-size:.84rem;
  font-weight:700;
}

.checkout-summary-line.total-line{
  padding-top:8px;
  border-top:1px solid var(--line);
  color:var(--text);
  font-size:1rem;
}

.checkout-submit{
  width:100%;
  margin-top:15px;
}

/* SUCCESS */

.success-modal-card{
  width:min(460px,calc(100% - 28px));
  padding:30px 22px;
  border-radius:24px;
  text-align:center;
}

.success-icon{
  width:70px;
  height:70px;
  display:grid;
  place-items:center;
  margin:0 auto 17px;
  border-radius:50%;
  background:#E9F8F1;
  color:var(--success);
  font-size:1.75rem;
  font-weight:950;
}

.success-modal-card h2{
  margin:0;
  color:var(--text);
}

.success-copy{
  margin:10px auto 0;
  max-width:390px;
  color:var(--muted);
  font-size:.88rem;
  line-height:1.55;
}

.success-button{
  width:100%;
  margin-top:20px;
}

/* MISC */

.toast{
  position:fixed;
  left:50%;
  bottom:90px;
  z-index:3500;
  display:none;
  width:min(420px,calc(100% - 32px));
  transform:translateX(-50%);
  padding:12px 15px;
  border-radius:12px;
  background:var(--primary-deep);
  color:#fff;
  text-align:center;
  font-size:.82rem;
  font-weight:800;
  box-shadow:0 14px 35px rgba(3,27,70,.28);
}

.toast.show{
  display:block;
}

@media(max-width:720px){
  .store-header{
    padding-left:14px;
    padding-right:14px;
    padding-bottom:22px;
  }

  .store-header-inner{
    align-items:flex-start;
  }

  .store-logo{
    width:56px;
    height:56px;
    flex-basis:56px;
    border-radius:17px;
  }

  .store-subtitle{
    max-width:52vw;
  }

  .store-status{
    padding:7px 9px;
    font-size:.67rem;
  }

  .main-content{
    padding-left:12px;
    padding-right:12px;
  }

  .store-info-card{
    padding:10px;
  }

  .info-item{
    padding:9px;
  }

  .info-icon{
    display:none;
  }

  .products-grid{
    grid-template-columns:1fr;
  }

  .product-card{
    grid-template-columns:112px minmax(0,1fr);
    min-height:132px;
    border-radius:18px;
  }

  .product-image,
  .product-image img,
  .product-image-placeholder{
    min-height:132px;
  }

  .product-info{
    padding:13px 12px;
  }

  .product-info h4{
    font-size:.96rem;
  }

  .product-description{
    margin-top:6px;
    margin-bottom:8px;
    font-size:.77rem;
  }
}

@media(max-width:480px){
  .welcome-logo-wrap{
    width:min(250px,70vw);
  }

  .welcome-copy p:last-child{
    font-size:.9rem;
  }

  .store-heading h1{
    font-size:1.45rem;
  }

  .store-status{
    max-width:108px;
  }

  .store-status span:last-child{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .store-info-card{
    gap:7px;
  }

  .info-item strong{
    font-size:.78rem;
  }

  .section-heading h2{
    font-size:1.55rem;
  }

  .category-tabs{
    margin-left:-12px;
    margin-right:-12px;
    padding-left:12px;
    padding-right:12px;
  }

  .product-card{
    grid-template-columns:104px minmax(0,1fr);
  }

  .product-image,
  .product-image img,
  .product-image-placeholder{
    min-height:128px;
  }

  .featured-badge{
    font-size:.56rem;
  }

  .floating-cart{
    width:calc(100% - 18px);
    bottom:max(9px,env(safe-area-inset-bottom));
  }

  .checkout-grid{
    grid-template-columns:1fr;
  }

  .field.full-width{
    grid-column:auto;
  }
}

@media(min-width:721px){
  .modal{
    align-items:center;
    padding:24px;
  }

  .modal-card{
    border-radius:24px;
  }
}

@media(prefers-reduced-motion:reduce){
  *{
    scroll-behavior:auto !important;
    animation:none !important;
    transition:none !important;
  }
}


/* ==================================================
   ENTREGA / RETIRO V32
================================================== */

.delivery-choice-field{
  padding:13px;
  border:1px solid #c9dcf8;
  border-radius:14px;
  background:var(--surface-soft);
}

.delivery-choice-field > span{
  color:var(--primary-dark);
  font-size:.9rem;
}

.checkout-extra-fields{
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:13px;
}

.checkout-extra-fields.full-width{
  grid-column:1 / -1;
}

@media(max-width:650px){
  .checkout-extra-fields{
    grid-template-columns:1fr;
  }

  .checkout-extra-fields .full-width{
    grid-column:auto;
  }
}
