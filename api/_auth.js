import { timingSafeEqual } from "node:crypto";

// Controleert het wachtwoord (header x-has-key) tegen de omgevingsvariabele HAS_PASSWORD.
export async function allowed(req) {
  const want = process.env.HAS_PASSWORD || "";
  const got = String(req.headers["x-has-key"] || "");
  const a = Buffer.from(got);
  const b = Buffer.from(want);
  const ok = want.length > 0 && a.length === b.length && timingSafeEqual(a, b);
  if (!ok) await new Promise((r) => setTimeout(r, 600)); // remt het raden van wachtwoorden
  return ok;
}

export const PATHNAME = process.env.HAS_BLOB_PATH || "has-telefoon.json";
