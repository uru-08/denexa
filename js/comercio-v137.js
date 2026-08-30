/* DENEXA V137
   Corrección segura: ocultar selector global de comercios
   SIN MutationObserver y SIN interferir con comercio.js.
*/
(function () {
  "use strict";

  function hideOrdersBusinessFilter() {
    var select = document.getElementById("ordersBusinessFilter");
    if (!select) return;

    var label = select.closest("label");

    select.style.display = "none";
    select.setAttribute("aria-hidden", "true");

    if (label) {
      label.style.display = "none";
      label.setAttribute("aria-hidden", "true");
    }
  }

  function applyFixSafely() {
    hideOrdersBusinessFilter();

    /* comercio.js actualiza Pedidos cada 10 s.
       Repetimos una limpieza liviana, sin observar atributos
       ni modificar lógica. */
    window.setInterval(hideOrdersBusinessFilter, 3000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyFixSafely, { once:true });
  } else {
    applyFixSafely();
  }
})();
