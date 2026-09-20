import { createClient } from "npm:@supabase/supabase-js@2.95.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const ALLOWED_ORIGINS = new Set([
  "http://127.0.0.1:4173",
  "http://localhost:4173",
  "https://uru-08.github.io",
]);

function corsHeaders(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin)
      ? origin
      : "https://uru-08.github.io",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin",
  };
}

function json(req: Request, status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(req),
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(req) });
  }

  if (req.method !== "GET") {
    return json(req, 405, { error: "Método no permitido." });
  }

  const authorization = req.headers.get("authorization") ?? "";
  const accessToken = authorization.startsWith("Bearer ")
    ? authorization.slice(7).trim()
    : "";

  if (!accessToken) {
    return json(req, 401, { error: "Sesión requerida." });
  }

  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const {
    data: { user: requester },
    error: authError,
  } = await userClient.auth.getUser(accessToken);

  if (authError || !requester) {
    return json(req, 401, { error: "Sesión inválida o vencida." });
  }

  if (requester.app_metadata?.denexa_role !== "super_admin") {
    return json(req, 403, { error: "Acceso exclusivo para superadministración." });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: authData, error: usersError } =
    await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });

  if (usersError) {
    console.error("No se pudieron listar usuarios de Auth:", usersError.message);
    return json(req, 500, { error: "No se pudieron cargar los usuarios." });
  }

  const [{ data: merchantLinks, error: merchantError }, { data: legacyLinks, error: legacyError }] =
    await Promise.all([
      admin
        .from("merchant_users")
        .select("user_id, business_id, role, active, businesses(id,name,slug,active)"),
      admin
        .from("business_users")
        .select("user_id, business_id, active, businesses(id,name,slug,active)"),
    ]);

  if (merchantError || legacyError) {
    console.error(
      "No se pudieron cargar las vinculaciones:",
      merchantError?.message ?? legacyError?.message,
    );
    return json(req, 500, { error: "No se pudieron cargar las vinculaciones." });
  }

  const linksByUser = new Map<string, Array<Record<string, unknown>>>();
  for (const link of [...(merchantLinks ?? []), ...(legacyLinks ?? [])]) {
    const current = linksByUser.get(link.user_id) ?? [];
    current.push(link);
    linksByUser.set(link.user_id, current);
  }

  const users = authData.users.map((user) => {
    const links = linksByUser.get(user.id) ?? [];
    const businesses = links
      .map((link) => link.businesses)
      .flat()
      .filter(Boolean);
    const merchantRole = links.find((link) => typeof link.role === "string")?.role;
    const role = user.app_metadata?.denexa_role ?? merchantRole ?? "Sin rol";
    const activeLinks = links.length === 0 || links.some((link) => link.active !== false);
    const active = !user.banned_until && !user.deleted_at && activeLinks;

    return {
      id: user.id,
      email: user.email ?? "",
      full_name:
        user.user_metadata?.full_name ??
        user.user_metadata?.name ??
        user.email ??
        "Sin nombre",
      role,
      active,
      businesses,
    };
  });

  return json(req, 200, { users });
});
