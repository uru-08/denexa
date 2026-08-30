const SUPABASE_URL = "https://farpkwpxnnfloesivkxv.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_xDGhJja9MTcw8pOcypDITg_bRIbMg5E";

const SUPABASE_REST = `${SUPABASE_URL}/rest/v1`;

function supabaseHeaders(extraHeaders = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    ...extraHeaders
  };
}

/* DENEXA V134: carga segura y exclusiva para el panel del comercio. */
if (/\/comercio\.html$/i.test(window.location.pathname)) {
  const denexaPanelStyle = document.createElement("link");
  denexaPanelStyle.rel = "stylesheet";
  denexaPanelStyle.href = "css/comercio-v134.css?v=134";
  document.head.appendChild(denexaPanelStyle);

  const denexaPanelFixes = document.createElement("script");
  denexaPanelFixes.src = "js/comercio-v134.js?v=134";
  denexaPanelFixes.defer = true;
  document.head.appendChild(denexaPanelFixes);
}
