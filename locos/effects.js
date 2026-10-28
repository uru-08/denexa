// Pausa los efectos fuera de pantalla y al ocultar la pestaña.
'use strict';
for(const hero of document.querySelectorAll('.home-hero,.welcome-screen')){
 const embers=document.createElement('div');embers.className='fx-embers';embers.setAttribute('aria-hidden','true');
 [12,31,58,77,91].forEach((x,i)=>{const ember=document.createElement('i');ember.style.setProperty('--x',x+'%');ember.style.setProperty('--delay',(-i*1.8)+'s');embers.append(ember)});hero.prepend(embers);
}
const effectTargets=document.querySelectorAll('.home-hero,.welcome-screen,.welcome-enter,.explore-button,.daily-cta,.category-card,.daily-banner,.denexa-wordmark');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{for(const entry of entries)entry.target.classList.toggle('fx-live',entry.isIntersecting)},{threshold:.08});effectTargets.forEach(el=>observer.observe(el))}else{effectTargets.forEach(el=>el.classList.add('fx-live'))}
function pauseEffects(){document.body.classList.toggle('fx-paused',document.hidden)}
document.addEventListener('visibilitychange',pauseEffects);pauseEffects();
