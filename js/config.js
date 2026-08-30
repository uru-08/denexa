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

/* DENEXA: capas del panel del comercio. */
if (/\/comercio\.html$/i.test(window.location.pathname)) {
  const denexaPanelStyle = document.createElement("link");
  denexaPanelStyle.rel = "stylesheet";
  denexaPanelStyle.href = "css/comercio-v134.css?v=134";
  document.head.appendChild(denexaPanelStyle);

  const denexaPanelFixes = document.createElement("script");
  denexaPanelFixes.src = "js/comercio-v134.js?v=134";
  denexaPanelFixes.defer = true;
  document.head.appendChild(denexaPanelFixes);

  const denexaPanelStyleV135 = document.createElement("link");
  denexaPanelStyleV135.rel = "stylesheet";
  denexaPanelStyleV135.href = "css/comercio-v135.css?v=135";
  document.head.appendChild(denexaPanelStyleV135);

  const denexaPanelFixesV135 = document.createElement("script");
  denexaPanelFixesV135.src = "js/comercio-v135.js?v=135";
  denexaPanelFixesV135.defer = true;
  document.head.appendChild(denexaPanelFixesV135);

  /* V136: quitar definitivamente el selector global en Pedidos. */
  const denexaPanelFixesV136 = document.createElement("script");
  denexaPanelFixesV136.src = "js/comercio-v136.js?v=136";
  denexaPanelFixesV136.defer = true;
  document.head.appendChild(denexaPanelFixesV136);
}
