const assert=require('node:assert/strict');
const fs=require('node:fs'); const vm=require('node:vm');
const elements=new Map();
function el(id){if(elements.has(id))return elements.get(id);const classes=new Set(); const node={id,value:'',textContent:'',hidden:false,disabled:false,style:{},dataset:{},listeners:{},validity:{valueMissing:false},classList:{add(...x){x.forEach(c=>classes.add(c))},remove(...x){x.forEach(c=>classes.delete(c))},contains(x){return classes.has(x)},toggle(x,v){if(v)classes.add(x);else classes.delete(x)}},addEventListener(n,f){this.listeners[n]=f},setAttribute(n,v){this[n]=v},querySelector(s){return el(id+s)},querySelectorAll(){return []},scrollIntoView(){this.scrolled=true},focus(){this.focused=true},reset(){}};elements.set(id,node);return node;}
const document={getElementById:el,querySelector:el,querySelectorAll:()=>[],body:el('body'),documentElement:el('html'),addEventListener(){},hidden:false};document.documentElement.dataset.storeTheme='carro-kechu-carmelo';
const ctx=vm.createContext({console:{log(){},error(){},warn(){}},document,URLSearchParams,AbortController,setTimeout,clearTimeout,localStorage:{setItem(){},getItem(){return null}},window:{location:{search:'?business=carro-kechu-carmelo',href:''},addEventListener(){},setInterval(){},setTimeout,clearTimeout,scrollTo(){}},appShell:el('appShell'),fulfillmentButtons:el('fulfillmentButtons'),supabaseHeaders:()=>({}),SUPABASE_REST:'https://example.invalid/rest/v1',fetch:()=>{throw Error('Unexpected network call')}});
let src=fs.readFileSync('js/app.js','utf8').replace('\nloadStore();','\n// disabled for isolated regression tests');vm.runInContext(src,ctx);
function run(s){return vm.runInContext(s,ctx)}
(async()=>{
run(`business={id:8,slug:'carro-kechu-carmelo',name:'Kechu',active:true,ordering_status:'open'};statusCheckedAt=Date.now();`);
assert.equal(await run('requireOrderingOpen()'),true,'local browsing does not require network');
run('business.active=false');assert.equal(await run('requireOrderingOpen()'),false,'inactive businesses cannot accept orders');run('business.active=true');
run(`refreshOrderingStatusFromSupabase=async()=>{statusRefreshFailed=true;return true}`);
await assert.rejects(run('requireOrderingOpen({fresh:true})'),/ORDER_STATUS_NETWORK/);
run(`cartGrandTotal=()=>760;deliveryType.value='pickup';paymentMethod.value='cash';cashAmount.value='100';syncPaymentFields();`);
assert.equal(el('cashAmountField').hidden,true);
assert.equal(el('cashAmount').required,false);
assert.equal(el('cashAmount').disabled,true);
assert.equal(el('cashAmount').value,'');
run(`business.slug='mamma-mia';deliveryType.value='delivery';cashAmount.value='1000';syncPaymentFields();`);
assert.equal(el('cashAmountField').hidden,false,'other stores keep their cash field');
assert.equal(el('cashAmount').value,'1000');
run(`business.slug='carro-kechu-carmelo';`);
el('cashAmount').validity.valueMissing=true;el('checkoutForm').querySelector=()=>el('cashAmount');el('checkoutForm').listeners.invalid({preventDefault(){},target:el('cashAmount')});assert.match(el('checkoutFormError').textContent,/Pago justo/);assert.equal(el('checkoutFormError').scrolled,true);
run(`customerName.value='PRUEBA';customerPhone.value='000000000';deliveryType.value='pickup';paymentMethod.value='cash';cashAmount.value='';cart=[{quantity:1,options:[]}];requireOrderingOpen=async(o)=>{if(!o.fresh)throw Error('Missing forced live check');return true};saveOrderToSupabase=async()=>({id:123});whatsappOrderUrl=()=> 'https://wa.me/000000?text=PRUEBA';configureFulfillmentOptions=()=>{};syncDeliveryFields=()=>{};syncPaymentFields=()=>{};`);
await el('checkoutForm').listeners.submit({preventDefault(){}});
assert.equal(el('orderWhatsappLink').href,'https://wa.me/000000?text=PRUEBA');assert.match(el('orderSuccessReference').textContent,/#123/);assert.equal(el('orderSuccessModal').classList.contains('open'),true);assert.equal(run('cart.length'),0);assert.equal(el('confirmOrderButton').disabled,false);
run(`cart=[{quantity:1,options:[]}];saveOrderToSupabase=async()=>{throw Error('Network')};`);await el('checkoutForm').listeners.submit({preventDefault(){}});assert.equal(run('cart.length'),1,'failed save keeps the cart');assert.match(el('checkoutFormError').textContent,/conexión/);assert.equal(el('confirmOrderButton').disabled,false);
console.log('PASS: local responsiveness, inactive store, live confirmation, visible validation, Kechu cash exemption, WhatsApp fallback, failed save cart preservation.');
})().catch(e=>{console.error(e);process.exitCode=1});
