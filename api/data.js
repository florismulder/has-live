import { list } from "@vercel/blob";
import { allowed, PATHNAME } from "./_auth.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!(await allowed(req))) return res.status(401).json({ error: "Wachtwoord klopt niet." });
  try {
    const { blobs } = await list({ prefix: PATHNAME });
    const hit = blobs.find((b) => b.pathname === PATHNAME);
    if (!hit) return res.status(404).json({ error: "Nog geen bestand geupload. Klik in HAS op Zet op telefoon." });
    const r = await fetch(hit.url, { cache: "no-store" });
    if (!r.ok) return res.status(502).json({ error: "Bestand ophalen lukt niet." });
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(200).send(await r.text());
  } catch (e) {
    return res.status(500).json({ error: "Opslag niet bereikbaar: " + (e && e.message ? e.message : e) });
  }
}
