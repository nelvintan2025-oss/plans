// GET /api/responses?key=YOUR_ADMIN_KEY  -> every response, newest first, as JSON.
import { redis, json, isAdmin } from "./_store.js";

export async function GET(request) {
  if (!isAdmin(request)) return json({ error: "Wrong or missing key" }, 401);
  try {
    const list = await redis("LRANGE", "responses", "0", "-1");
    return json(list.map(s => JSON.parse(s)));
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}
