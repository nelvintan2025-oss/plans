// POST /api/respond  -> she submits her picks. Saved with a timestamp.
import { redis, json } from "./_store.js";

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: "Bad JSON" }, 400); }
  const raw = JSON.stringify(body);
  if (raw.length > 5000) return json({ ok: false, error: "Too long" }, 413);
  const entry = { receivedAt: new Date().toISOString(), ...body };
  try {
    await redis("LPUSH", "responses", JSON.stringify(entry));
    return json({ ok: true });
  } catch (e) {
    return json({ ok: false, error: e.message }, 500);
  }
}
