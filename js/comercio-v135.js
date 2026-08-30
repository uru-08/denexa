/* DENEXA V135 - correcciones visuales seguras */
(function(){
  function applyV135(){
    var businessFilter = document.getElementById("ordersBusinessFilter");
    if (businessFilter && businessFilter.closest("label")) {
      businessFilter.closest("label").style.display = "none";
    }

    var logout = document.getElementById("merchantLogoutButton");
    if (logout) logout.textContent = "Cerrar sesión";

    var mobileLogout = document.getElementById("merchantMobileLogoutButton");
    if (mobileLogout) mobileLogout.textContent = "Cerrar sesión";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyV135, {once:true});
  } else {
    applyV135();
  }
})();
