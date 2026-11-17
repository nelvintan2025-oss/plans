// GET  /api/availability             -> Nelvin's busy times (public, the invite reads this)
// POST /api/availability?key=SECRET  -> Nelvin saves busy times from the #admin page
import { redis, json, isAdmin } from "./_store.js";

export async function GET() {
  try {
    const v = await redis("GET", "unavailable");
    return json({ unavailable: v ? JSON.parse(v) : null });
  } catch (e) {
    return json({ unavailable: null, error: e.message }, 500);
  }
}

export async function POST(request) {
  if (!isAdmin(request)) return json({ ok: false, error: "Wrong or missing key" }, 401);
  try {
    const body = await request.json();
    await redis("SET", "unavailable", JSON.stringify(body.unavailable || {}));
    return json({ ok: true });
  } catch (e) {
    return json({ ok: false, error: e.message }, 500);
  }
}
