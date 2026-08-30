/* DENEXA V134 - limpieza de textos del panel.
   Solo modifica textos estáticos. No toca eventos ni lógica de comercio.js. */
(function () {
  if (!/\/comercio\.html$/i.test(location.pathname)) return;

  function setText(selector, text) {
    var el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function cleanPanelCopy() {
    setText(".merchant-login-brand strong", "DENEXA 🇺🇾");
    setText(".merchant-login-brand span", "Plataforma de pedidos online");

    setText("#merchantLogoutButton", "Cerrar sesión");
    setText("#merchantMobileLogoutButton", "↻ Cerrar sesión");

    setText("#customerNoticesOrdersState", "Configurables desde “Avisos al cliente”.");

    var cleanup = document.querySelector(".orders-cleanup-hint span");
    if (cleanup) {
      cleanup.textContent =
        "Quita del panel los pedidos del turno actual, activos y finalizados, para comenzar el próximo turno desde cero.";
    }

    var catSub = document.querySelector("#categoriesSubtitle");
    if (catSub && /Seleccion/i.test(catSub.textContent)) {
      catSub.textContent = "Administrá las categorías de tu menú.";
    }

    var prodSub = document.querySelector("#productsSubtitle");
    if (prodSub && /Seleccion/i.test(prodSub.textContent)) {
      prodSub.textContent = "Administrá los productos de tu menú.";
    }

    var restore = document.querySelector("#restoreStoreDesignButton");
    if (restore) restore.textContent = "Restaurar estilo del comercio";

    var bank = document.querySelector("#paymentBankName");
    if (bank) bank.placeholder = "Ejemplo: Banco / institución";

    var instr = document.querySelector("#paymentInstructions");
    if (instr) {
      instr.placeholder =
        "Ejemplo: Realizá la transferencia por el total del pedido. Conservá el comprobante.";
    }

    var settingsSubtitle = document.querySelector("#settings .subtitle");
    if (settingsSubtitle && /Proyecto X/i.test(settingsSubtitle.textContent)) {
      settingsSubtitle.textContent = "Configuración general de DENEXA.";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cleanPanelCopy, { once:true });
  } else {
    cleanPanelCopy();
  }
})();
