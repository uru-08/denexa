/* Solo presentación Kechu: no modifica catálogo, carrito ni envío. */
(function () {
  if (document.documentElement.dataset.storeTheme !== "carro-kechu-carmelo") return;
  var selector = ".product-card, .category-section, .category-tab, #dailyPromoBanner, .kechu184-hero, .denexa-powered-footer";
  var seen = new WeakSet();
  var observer = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target.classList.toggle("kechu-perf-paused", !entry.isIntersecting);
    });
  }, { rootMargin: "100px" }) : null;
  function watch(node) {
    if (!observer || !node || node.nodeType !== 1) return;
    var nodes = [];
    if (node.matches(selector)) nodes.push(node);
    node.querySelectorAll(selector).forEach(function (item) { nodes.push(item); });
    nodes.forEach(function (item) {
      if (seen.has(item)) return;
      seen.add(item);
      observer.observe(item);
    });
  }
  watch(document.body);
  var catalog = document.getElementById("catalogContent");
  if (catalog) new MutationObserver(function (records) {
    records.forEach(function (record) {
      record.removedNodes.forEach(function (node) {
        if (!observer || node.nodeType !== 1) return;
        if (node.matches(selector)) observer.unobserve(node);
        node.querySelectorAll(selector).forEach(function (item) { observer.unobserve(item); });
      });
      record.addedNodes.forEach(watch);
    });
  }).observe(catalog, { childList: true, subtree: true });
  function visibility() { document.body.classList.toggle("kechu-page-hidden", document.hidden); }
  document.addEventListener("visibilitychange", visibility);
  visibility();
})();
