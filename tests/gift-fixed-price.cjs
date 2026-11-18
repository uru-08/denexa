const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('js/app.js', 'utf8');
const context = vm.createContext({assert, console});
vm.runInContext(`
let business={promo_active:true,promo_rule_type:'gift',promo_target_type:'category',promo_target_id:7,promo_fixed_price:350,promo_trigger_qty:1,promo_reward_qty:1,promo_repeat:true,promo_reward_product_id:40};
let products=[{id:11,category_id:7,price:320},{id:18,category_id:7,price:310},{id:21,category_id:7,price:290},{id:40,category_id:9,price:70}];
let cart=[]; function saveCart(){}
function currentProductIsPizza(){return false;}
${source.slice(source.indexOf('function activePromoRuleType'),source.indexOf('function normalizedCategoryName'))}
for (const product of products.slice(0,3)) assert.equal(promoBasePrice(product.price,product),350);
assert.equal(promoBasePrice(70,products[3]),70);
cart=products.slice(0,3).map(p=>({key:String(p.id),productId:p.id,quantity:1,unitPrice:p.price,total:p.price,options:[]}));
repriceFixedPromoCart(); repriceFixedPromoCart();
assert.equal(cart.reduce((s,i)=>s+i.total,0),1050);
assert.equal(cartGiftItems()[0].quantity,3);
assert.equal(cartGiftItems()[0].total,0);
cart[0].options=[{price:80,quantity:2}];
repriceFixedPromoCart(); assert.equal(cart[0].unitPrice,430);
cart[0].quantity=2; repriceFixedPromoCart();
assert.equal(cart[0].total,860); assert.equal(cartGiftItems()[0].quantity,4);
business.promo_fixed_price=370; repriceFixedPromoCart(); assert.equal(cart[0].unitPrice,450);
business.promo_fixed_price=null; repriceFixedPromoCart(); assert.equal(cart[0].unitPrice,400);
business.promo_fixed_price=350; repriceFixedPromoCart();
business.promo_active=false; repriceFixedPromoCart();
assert.equal(cart[0].unitPrice,400); assert.equal(cartGiftItems().length,0);
business.promo_active=true; business.promo_target_type='product';business.promo_target_id=21;
repriceFixedPromoCart();assert.equal(cart[0].unitPrice,400);assert.equal(cart[2].unitPrice,350);
business.promo_rule_type='percent';business.promo_discount_percent=10;
repriceFixedPromoCart();assert.equal(cart[2].unitPrice,261);
business.promo_rule_type='gift';business.promo_fixed_price=0;
assert.equal(promoBasePrice(290,products[2]),0);
const box={id:23,category_id:8,price:760};
products.push(box);
business={slug:'carro-kechu-carmelo',promo_active:true,promo_rule_type:'fixed_price',promo_target_type:'product',promo_target_id:'23',promo_fixed_price:740};
cart=[{productId:23,quantity:2,unitPrice:760,total:1520,options:[]}];
assert.equal(promoBasePrice(box.price,box),740);
assert.equal(promoBasePrice(70,products[3]),70);
repriceFixedPromoCart(); repriceFixedPromoCart();
assert.equal(cart[0].total,1480);
cart[0].options=[{price:50}]; repriceFixedPromoCart();
assert.equal(cart[0].unitPrice,790);
business.promo_active=false; repriceFixedPromoCart();
assert.equal(cart[0].unitPrice,810);
assert.equal(promoBasePrice(box.price,box),760);
`,context);
console.log('Passed: fixed prices, quantities, free gifts, extras, repeated refresh, price changes, deactivation, targeting, percentage compatibility, zero price.');
