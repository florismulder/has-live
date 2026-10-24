import { put } from "@vercel/blob";
import { allowed, PATHNAME } from "./_auth.js";

export const config = { api: { bodyParser: { sizeLimit: "4mb" } } };

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Gebruik POST." });
  if (!(await allowed(req))) return res.status(401).json({ error: "Wachtwoord klopt niet." });
  try {
    const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    const data = JSON.parse(body);
    if (!data || data.app !== "HAS" || !Array.isArray(data.matches)) return res.status(400).json({ error: "Dit is geen HAS-telefoonbestand." });
    await put(PATHNAME, body, { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json", cacheControlMaxAge: 60 });
    return res.status(200).json({ ok: true, wedstrijden: data.matches.length, bytes: body.length });
  } catch (e) {
    return res.status(500).json({ error: "Opslaan lukt niet: " + (e && e.message ? e.message : e) });
  }
}
