/* Private billing control. Service activation is always a separate manual action. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s),esc=escapeHTML;
 let merchants=[],accounts=[],payments=[],loading=false,focusReturn=null;
 const dayMs=86400000;
 const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Montevideo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const day=n=>new Date(n+'T12:00:00Z');
 const addDays=(date,n)=>new Date(day(date).getTime()+n*dayMs).toISOString().slice(0,10);
 function daysLeft(end){return end?Math.round((day(end)-day(today()))/dayMs)+1:null;}
 function dateText(value){return value?new Intl.DateTimeFormat('es-UY',{dateStyle:'medium',timeZone:'UTC'}).format(day(value)):'Sin registrar';}
 function money(value,currency){return value===null||value===undefined?'Sin definir':new Intl.NumberFormat('es-UY',{style:'currency',currency}).format(Number(value));}
 const account=id=>accounts.find(a=>String(a.business_id)===String(id))||{business_id:id,mode:'unconfigured',currency:'UYU',plan_name:''};
 function status(b,a){
   if(b.active===false)return {key:'suspended',label:'Suspendido',end:null};
   if(a.mode==='trial'){const n=daysLeft(a.trial_ends_on);return {key:n>0?'trial':'expired',label:n>0?'En prueba':'Prueba vencida',end:a.trial_ends_on,days:n};}
   if(a.mode==='paid'){const n=daysLeft(a.paid_through);return {key:n>0?'paid':'expired',label:n>0?'Al día':'Pago vencido',end:a.paid_through,days:n};}
   return {key:'unconfigured',label:'Sin configurar',end:null};
 }
 async function api(path,options={}){
   const headers=await window.denexaAdminAccess.headers();
   const r=await fetch(`${SUPABASE_REST}/${path}`,{...options,headers:{...headers,Prefer:'return=representation',...options.headers}});
   const text=await r.text();let data;try{data=text?JSON.parse(text):null;}catch(_){throw new Error('El servidor devolvió una respuesta inesperada.');}
   if(!r.ok)throw new Error(data?.message||'No se pudo guardar. Revisá tu conexión y volvé a intentar.');return data;
 }
 async function load(){
   if(loading)return;loading=true;$('#subscriptionsMessage').textContent='Actualizando…';
   try{
     const rows=await Promise.all([api('businesses?select=id,name,slug,active,created_at&order=name'),api('business_subscriptions?select=*&order=business_id'),api('subscription_payments?select=*&order=paid_on.desc,recorded_at.desc&limit=1000')]);
     [merchants,accounts,payments]=rows;render();$('#subscriptionsMessage').textContent='';
   }catch(e){$('#subscriptionsMessage').textContent=e.message;$('#subscriptionsMessage').classList.add('sub-error');$('#subscriptionAlerts').textContent='No se pudo cargar el control de suscripciones. Entrá en Suscripciones para reintentar.';}
   finally{loading=false;}
 }
 function render(){
   $('#subscriptionsMessage').classList.remove('sub-error');
   const states=merchants.map(b=>({b,a:account(b.id),s:status(b,account(b.id))}));
   const statItems=[['En prueba',states.filter(x=>x.s.key==='trial').length],['Al día',states.filter(x=>x.s.key==='paid').length],['Por vencer (7 días)',states.filter(x=>['paid','trial'].includes(x.s.key)&&x.s.days<=7).length],['Vencidos',states.filter(x=>x.s.key==='expired').length]];
   const stats=statItems.map(([label,n])=>`<div class="sub-stat"><span>${label}</span><strong>${n}</strong></div>`).join('');
   $('#subscriptionStats').innerHTML=stats;$('#subscriptionDashboardStats').innerHTML=stats;
   const alerts=states.filter(x=>x.s.key==='expired'||(['trial','paid'].includes(x.s.key)&&x.s.days<=7)||x.s.key==='unconfigured');
   $('#subscriptionAlerts').innerHTML=alerts.length?alerts.map(x=>`<div class="sub-alert"><div><strong>${esc(x.b.name)}</strong><br><span>${esc(x.s.label)}${x.s.end?' · hasta '+dateText(x.s.end):' · completá sus fechas y plan'}</span></div><button data-sub-action="edit" data-id="${x.b.id}">Gestionar</button></div>`).join(''):'<p class="sub-empty">No hay vencimientos próximos ni datos pendientes.</p>';
   const query=$('#subscriptionSearch').value.toLocaleLowerCase('es'),filter=$('#subscriptionFilter').value;
   const filtered=states.filter(x=>(!query||(x.b.name+' '+x.b.slug).toLocaleLowerCase('es').includes(query))&&(!filter||x.s.key===filter));
   $('#subscriptionsList').innerHTML=filtered.length?filtered.map(({b,a,s})=>`<article class="sub-card"><h3>${esc(b.name)}</h3><span class="sub-pill ${s.key}">${s.label}</span><dl><dt>Alta</dt><dd>${dateText(a.joined_on||b.created_at?.slice(0,10))}</dd><dt>Plan</dt><dd>${esc(a.plan_name||'Sin definir')}</dd><dt>Cuota mensual</dt><dd>${money(a.monthly_amount,a.currency)}</dd><dt>Prueba</dt><dd>${a.trial_started_on?dateText(a.trial_started_on)+' → '+dateText(a.trial_ends_on):'Sin registrar'}</dd><dt>Pago vigente hasta</dt><dd>${dateText(a.paid_through)}</dd><dt>Días restantes</dt><dd>${s.days==null?'—':s.days>0?s.days+' (incluye hoy)':'Vencido'}</dd></dl><div class="sub-actions"><button data-sub-action="edit" data-id="${b.id}">Fechas y plan</button><button class="sub-pay" data-sub-action="pay" data-id="${b.id}">Registrar pago</button><button data-sub-action="history" data-id="${b.id}">Historial</button><button data-sub-action="toggle" data-id="${b.id}">${b.active===false?'Activar':'Suspender'}</button></div></article>`).join(''):'<p class="sub-empty">No hay comercios con este filtro.</p>';
 }
 const dialog=$('#subscriptionDialog');
 function show(title,body){focusReturn=document.activeElement;$('#subscriptionDialogTitle').textContent=title;$('#subscriptionDialogBody').innerHTML=body;dialog.showModal();}
 function close(){dialog.close();focusReturn?.focus();}
 $('#subscriptionDialogClose').onclick=close;
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}});
 function field(label,name,value,type='text',extra=''){return `<label>${label}<input name="${name}" type="${type}" value="${esc(value??'')}" ${extra}></label>`;}
 function currencies(value){return `<label>Moneda (código ISO)<input name="currency" value="${esc(value||'UYU')}" pattern="[A-Za-z]{3}" maxlength="3" required placeholder="UYU, USD, ARS…"></label>`;}
 function formFooter(){return '<p class="sub-message" id="subscriptionFormMessage" role="status"></p><div class="sub-form-actions"><button type="button" data-close-sub>Cancelar</button><button type="submit">Guardar</button></div>';}
 function config(b){
   const a=account(b.id);show('Fechas y plan · '+b.name,`<form id="subscriptionConfig"><p class="sub-note">Las fechas de vencimiento son inclusive. Guardar estos datos no activa ni suspende el comercio.</p><div class="sub-form-grid">${field('Fecha de alta','joined_on',a.joined_on||b.created_at?.slice(0,10),'date')}<label>Etapa<select name="mode"><option value="unconfigured">Sin configurar</option><option value="trial">Período de prueba</option><option value="paid">Suscripción paga</option></select></label>${field('Nombre del plan','plan_name',a.plan_name,'text','maxlength="100"')}${field('Cuota mensual acordada','monthly_amount',a.monthly_amount,'number','min="0" step="0.01"')}${currencies(a.currency)}${field('Pago vigente hasta','paid_through',a.paid_through,'date')}${field('Inicio de prueba','trial_started_on',a.trial_started_on,'date')}${field('Fin de prueba','trial_ends_on',a.trial_ends_on,'date')}<button class="sub-quick sub-full" type="button" id="trialSeven">Iniciar prueba de 7 días desde hoy</button><label class="sub-full">Notas internas<textarea name="notes" rows="3" maxlength="3000">${esc(a.notes||'')}</textarea></label></div>${formFooter()}</form>`);
   const f=$('#subscriptionConfig');f.elements.mode.value=a.mode;
   $('#trialSeven').onclick=()=>{f.elements.mode.value='trial';f.elements.trial_started_on.value=today();f.elements.trial_ends_on.value=addDays(today(),6);};
   f.querySelector('[data-close-sub]').onclick=close;
   f.onsubmit=async event=>{
     event.preventDefault();const d=Object.fromEntries(new FormData(f));
     const payload={business_id:b.id,joined_on:d.joined_on||null,mode:d.mode,plan_name:d.plan_name.trim(),monthly_amount:d.monthly_amount===''?null:Number(d.monthly_amount),currency:d.currency.toUpperCase(),trial_started_on:d.trial_started_on||null,trial_ends_on:d.trial_ends_on||null,paid_through:d.paid_through||null,notes:d.notes.trim(),updated_at:new Date().toISOString()};
     const m=$('#subscriptionFormMessage');
     if(Boolean(d.trial_started_on)!==Boolean(d.trial_ends_on)||(d.trial_started_on&&d.trial_ends_on<d.trial_started_on)){m.textContent='Completá ambas fechas de prueba y revisá su orden.';return;}
     if(d.mode==='trial'&&!d.trial_ends_on){m.textContent='Indicá el inicio y el fin de la prueba.';return;}
     if(d.mode==='paid'&&!d.paid_through){m.textContent='Indicá hasta qué fecha tiene pago el servicio.';return;}
     await saveForm(f,async()=>{const rows=await api('business_subscriptions?on_conflict=business_id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify(payload)});if(!rows?.length)throw new Error('No se pudo confirmar el guardado.');});
   };
 }
 async function saveForm(f,save){
   const button=f.querySelector('[type=submit]'),message=$('#subscriptionFormMessage');button.disabled=true;message.textContent='Guardando…';
   try{await save();close();showToast('Datos guardados correctamente.');await load();}
   catch(error){message.textContent=error.message;}
   finally{button.disabled=false;}
 }
 function payment(b){
   const a=account(b.id),from=a.paid_through&&a.paid_through>=today()?addDays(a.paid_through,1):today();
   // Calendar month coverage, clamped to the last day of the target month.
   const next=day(from),targetMonth=next.getUTCMonth()+1,last=new Date(Date.UTC(next.getUTCFullYear(),targetMonth+1,0)).getUTCDate();
   next.setUTCDate(1);next.setUTCMonth(targetMonth);next.setUTCDate(Math.min(Number(from.slice(8)),last));
   const to=addDays(next.toISOString().slice(0,10),-1),requestId=crypto.randomUUID();
   show('Registrar pago · '+b.name,`<form id="subscriptionPayment"><p class="sub-note">Registrá un pago ya recibido. El período abonado actualiza el vencimiento, pero no reactiva un comercio suspendido.</p><div class="sub-form-grid">${field('Fecha de pago','paid_on',today(),'date',`required max="${today()}"`)}${field('Importe recibido','amount',a.monthly_amount,'number','min="0.01" step="0.01" required')}${currencies(a.currency)}<label>Medio de pago<select name="method"><option>Transferencia</option><option>Efectivo</option><option>Otro</option></select></label>${field('Período desde','coverage_from',from,'date','required')}${field('Período hasta (inclusive)','coverage_to',to,'date','required')}${field('Referencia o comprobante','reference','','text','maxlength="200"')}<label class="sub-full">Notas<textarea name="notes" rows="2" maxlength="3000"></textarea></label></div>${formFooter()}</form>`);
   const f=$('#subscriptionPayment');f.querySelector('[data-close-sub]').onclick=close;
   f.onsubmit=async event=>{event.preventDefault();const d=Object.fromEntries(new FormData(f));if(d.coverage_to<d.coverage_from){$('#subscriptionFormMessage').textContent='El fin del período debe ser igual o posterior al inicio.';return;}
     await saveForm(f,()=>api('rpc/admin_record_subscription_payment',{method:'POST',body:JSON.stringify({p_request_id:requestId,p_business_id:b.id,p_paid_on:d.paid_on,p_amount:Number(d.amount),p_currency:d.currency.toUpperCase(),p_coverage_from:d.coverage_from,p_coverage_to:d.coverage_to,p_method:d.method,p_reference:d.reference.trim(),p_notes:d.notes.trim()})}));
   };
 }
 async function history(b){
   show('Pagos · '+b.name,'<p class="sub-note">Cargando historial…</p>');
   try{const rows=await api('subscription_payments?business_id=eq.'+encodeURIComponent(b.id)+'&select=*&order=paid_on.desc,recorded_at.desc&limit=1000');
     $('#subscriptionDialogBody').innerHTML='<p class="sub-note">Pagos registrados, del más reciente al más antiguo. Cada importe conserva su moneda.</p><div class="sub-history">'+(rows.length?rows.map(p=>`<article><strong>${money(p.amount,p.currency)}</strong><p>Pago: ${dateText(p.paid_on)} · ${esc(p.method)}</p><p>Período: ${dateText(p.coverage_from)} al ${dateText(p.coverage_to)}</p>${p.reference?`<p>Referencia: ${esc(p.reference)}</p>`:''}${p.notes?`<p>${esc(p.notes)}</p>`:''}</article>`).join(''):'<p class="sub-empty">Todavía no hay pagos registrados.</p>')+'</div>';
   }catch(e){$('#subscriptionDialogBody').textContent=e.message;}
 }
 document.addEventListener('click',async event=>{
   const button=event.target.closest('[data-sub-action]');if(!button)return;
   const b=merchants.find(x=>String(x.id)===String(button.dataset.id));if(!b)return;
   const action=button.dataset.subAction;
   if(action==='edit')config(b);if(action==='pay')payment(b);if(action==='history')history(b);
   if(action==='toggle'){
     const active=b.active===false;
     if(!confirm(`${active?'Activar':'Suspender'} el servicio de ${b.name}?${active?'':' El menú quedará desactivado. Los datos y pagos se conservan.'}`))return;
     button.disabled=true;
     try{const rows=await api('businesses?id=eq.'+encodeURIComponent(b.id),{method:'PATCH',body:JSON.stringify({active})});if(rows?.length!==1)throw new Error('No se pudo confirmar el cambio de estado.');await load();await loadBusinesses();await loadDashboard();showToast(active?'Comercio activado.':'Comercio suspendido.');}
     catch(e){showToast(e.message,'error');}finally{button.disabled=false;}
   }
 });
 $('#subscriptionSearch').oninput=render;$('#subscriptionFilter').onchange=render;$('#subscriptionRefresh').onclick=load;
 document.querySelector('[data-section="plans"]').addEventListener('click',load);
 document.querySelector('[data-section="dashboard"]').addEventListener('click',load);
 $('#businessSubscriptionButton').onclick=()=>{if(selectedBusiness){const b=merchants.find(b=>String(b.id)===String(selectedBusiness.id));if(b){closeBusinessDetailModal();config(b);}else load().then(()=>{const b=merchants.find(b=>String(b.id)===String(selectedBusiness.id));if(b){closeBusinessDetailModal();config(b);}});}};
 window.denexaSubscriptions={refresh:load};
 load();
})();
