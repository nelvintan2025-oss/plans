// Tiny Redis helper using the Upstash REST API (no npm packages needed).
// Vercel sets these env vars when you add "Upstash for Redis" from the Vercel Marketplace.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export async function redis(...cmd) {
  if (!URL_ || !TOKEN) throw new Error("Database not connected. Add Upstash for Redis in Vercel > Storage.");
  const r = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

// Nelvin's secret. Set ADMIN_KEY in Vercel > Settings > Environment Variables.
export function isAdmin(request) {
  const key = new URL(request.url).searchParams.get("key") || request.headers.get("x-admin-key");
  return !!process.env.ADMIN_KEY && key === process.env.ADMIN_KEY;
}
