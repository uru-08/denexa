/* Administrator access: no credentials are embedded or persisted. */
(() => {
  'use strict';
  const KEY='denexa_super_admin_session_v1';
  let session=null, refreshPromise=null, started=false;
  const access=document.getElementById('adminAccess');
  const message=document.getElementById('adminAccessMessage');
  const form=document.getElementById('adminLoginForm');
  const originalHeaders=supabaseHeaders;
  supabaseHeaders=(extra={})=>({...originalHeaders(),Authorization:`Bearer ${session?.access_token||SUPABASE_KEY}`,...extra});
  function gate(text=''){
    document.documentElement.classList.add('admin-locked');
    document.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close());
    access.hidden=false; message.textContent=text;
  }
  async function auth(path,body,token){
    const r=await fetch(`${SUPABASE_URL}/auth/v1/${path}`,{method:body?'POST':'GET',headers:{apikey:SUPABASE_KEY,'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},...(body?{body:JSON.stringify(body)}:{})});
    const data=await r.json();
    if(!r.ok)throw new Error('No se pudo validar el acceso. Revisá tu correo y contraseña.');
    return data;
  }
  function save(value){session=value;sessionStorage.setItem(KEY,JSON.stringify(value));}
  async function refresh(){
    if(refreshPromise)return refreshPromise;
    refreshPromise=auth('token?grant_type=refresh_token',{refresh_token:session.refresh_token}).then(value=>{save(value);return value;}).finally(()=>{refreshPromise=null;});
    return refreshPromise;
  }
  async function valid(){
    if(!session?.access_token)throw new Error('Ingresá con tu cuenta de administrador.');
    if(!session.expires_at||session.expires_at*1000<Date.now()+90000)await refresh();
    const user=await auth('user',null,session.access_token);
    if(user.app_metadata?.denexa_role!=='super_admin')throw new Error('Esta cuenta no tiene acceso al superpanel.');
    return user;
  }
  function script(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('No se pudo cargar el panel. Recargá la página.'));document.body.append(s);});}
  async function enter(){
    const user=await valid();
    document.getElementById('adminSessionEmail').textContent=user.email||'Administrador';
    access.hidden=true;document.documentElement.classList.remove('admin-locked');
    if(!started){await script('js/admin.js?v=79');await script('js/admin-subscriptions.js?v=1');started=true;}
  }
  window.denexaAdminAccess={async headers(){await valid();return supabaseHeaders();}};
  form.addEventListener('submit',async event=>{
    event.preventDefault();const button=form.querySelector('button');button.disabled=true;message.textContent='Verificando acceso…';
    try{save(await auth('token?grant_type=password',{email:form.email.value.trim(),password:form.password.value}));form.password.value='';await enter();}
    catch(error){session=null;sessionStorage.removeItem(KEY);gate(error.message);}
    finally{button.disabled=false;}
  });
  document.getElementById('adminLogout').addEventListener('click',async()=>{
    const token=session?.access_token;session=null;sessionStorage.removeItem(KEY);
    if(token)fetch(`${SUPABASE_URL}/auth/v1/logout`,{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${token}`}}).catch(()=>{});
    location.reload();
  });
  setInterval(async()=>{
    if(!session)return;
    try{if(session.expires_at*1000<Date.now()+90000)await refresh();}
    catch(_){session=null;sessionStorage.removeItem(KEY);gate('Tu sesión venció. Volvé a ingresar.');}
  },30000);
  try{session=JSON.parse(sessionStorage.getItem(KEY)||'null');}catch(_){sessionStorage.removeItem(KEY);}
  if(session)enter().catch(error=>{session=null;sessionStorage.removeItem(KEY);gate(error.message);});else gate();
})();
