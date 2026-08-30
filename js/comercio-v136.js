/* DENEXA V136
   Panel del comercio: el usuario autenticado administra únicamente
   su comercio asignado. El selector global de comercios pertenece
   al panel maestro y no debe mostrarse aquí.
*/
(function () {
  "use strict";

  function removeBusinessChooser() {
    const select = document.getElementById("ordersBusinessFilter");
    if (!select) return;

    /* comercio.js ya fija el comercio autorizado al terminar initAdmin().
       Solo quitamos de la interfaz el selector global. */
    select.disabled = true;
    select.setAttribute("aria-hidden", "true");
    select.style.setProperty("display", "none", "important");

    const label = select.closest("label");
    if (label) {
      label.style.setProperty("display", "none", "important");
      label.setAttribute("aria-hidden", "true");
    }
  }

  function startFix() {
    removeBusinessChooser();

    /* comercio.js actualiza Pedidos cada 10 s.
       Si cualquier render futuro modifica el toolbar, lo volvemos a limpiar. */
    const toolbar = document.querySelector(".orders-toolbar");
    if (toolbar && "MutationObserver" in window) {
      const observer = new MutationObserver(removeBusinessChooser);
      observer.observe(toolbar, {
        childList: true,
        subtree: true,
        attributes: true
      });
    }

    /* Respaldo para móviles/caché/render tardío. */
    let checks = 0;
    const timer = setInterval(() => {
      removeBusinessChooser();
      checks += 1;
      if (checks >= 20) clearInterval(timer);
    }, 500);
  }

  if (document.readyState === "complete") {
    startFix();
  } else {
    window.addEventListener("load", startFix, { once: true });
  }
})();
