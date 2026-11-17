# Date invite (Vercel)

A one-page invite: lunch or dinner, activities, then a day + time range picked around your busy times.
Her answers are saved to a small free Redis database and you read them as JSON.

## Files
- `index.html` – the whole site. Edit `CONFIG` at the top for your name / her name.
- `api/respond.js` – saves her answer (POST).
- `api/responses.js` – lists all answers as JSON (needs your key).
- `api/availability.js` – stores your busy times so you can change them without redeploying.

## Deploy (about 5 minutes)
1. Push this folder to a GitHub repo (or run `npx vercel` inside it).
2. On vercel.com: **Add New > Project**, import the repo. Framework preset: **Other**. Deploy.
3. In the project: **Storage > Create Database > Upstash for Redis** (free plan) and connect it to this project.
4. **Settings > Environment Variables**: add `ADMIN_KEY` = any secret word only you know.
5. **Deployments > ... > Redeploy** so the new settings take effect.

## Use it
- Set busy times: open `https://<your-site>.vercel.app/#admin`, type your ADMIN_KEY, tap Morning, Afternoon or Night on the days you are busy, then **Save busy times**.
- Send her the plain link: `https://<your-site>.vercel.app/` (no #admin).
- Check her answer: the same #admin page (**Load responses**) or the raw JSON at
  `https://<your-site>.vercel.app/api/responses?key=<ADMIN_KEY>`

## Adding more questions
In `index.html`, find `STEPS` and add an object where it says "add new steps here".
Each step has `render(el)`, `valid()` and `summary()`; the summary and saved JSON pick it up automatically.
