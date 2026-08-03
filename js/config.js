const SUPABASE_URL = "https://farpkwpxnnfloesivkxv.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_xDGhJja9MTcw8pOcypDITg_bRIbMg5E";

const SUPABASE_REST = `${SUPABASE_URL}/rest/v1`;

function supabaseHeaders() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json"
  };
}
