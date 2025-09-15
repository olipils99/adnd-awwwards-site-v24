import "server-only";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Resend } from "resend";

function need(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const address = String(form.get("address") || "");
    const city = String(form.get("city") || "");
    const services = JSON.parse(
      String(form.get("services") || "[]"),
    ) as string[];
    const message = String(form.get("message") || "");
    const photos = form.getAll("photos") as File[];

    const text = `Soumission ADND

Nom: ${name}
Courriel: ${email}
Téléphone: ${phone}
Adresse: ${address}, ${city}
Services: ${services.join(", ") || "—"}

Message:
${message || "—"}`;

    // ---- ENVOI VIA RESEND ----
    const resend = new Resend(need("RESEND_API_KEY"));

    // ⚠️ Garde ce "from" le temps du test. (le display name peut être refusé)
    const from = process.env.MAIL_FROM?.trim() || "onboarding@resend.dev";
    const to = "operations@adndgroupesaisonnier.com";

    const attachments =
      photos.length > 0
        ? await Promise.all(
            photos.map(async (f) => ({
              filename: f.name || "photo.jpg",
              // Certaines versions de Node/Resend préfèrent Uint8Array
              content: Buffer.from(new Uint8Array(await f.arrayBuffer())),
            })),
          )
        : [];

    const payload = {
      from, // ex: 'onboarding@resend.dev'
      to, // string ou string[]
      subject: `Soumission — ${name || "Client ADND"}`,
      text,
      attachments, // []
      reply_to: email || undefined,
    } as const;

    const { data, error } = await resend.emails.send(payload);

    if (error) {
      // Log détaillé pour voir la vraie cause
      console.error(
        "[soumission] resend.error =",
        JSON.stringify(error, null, 2),
      );
      // remonte un message lisible côté client
      throw new Error(error?.message || JSON.stringify(error) || "ResendError");
    }

    console.log("[soumission] sent", {
      to,
      id: data?.id,
      attachments: attachments.length,
    });

    return NextResponse.json({
      ok: true,
      id: data?.id,
      attachments: attachments.length,
    });
  } catch (e: any) {
    const msg = e?.message || e?.toString?.() || "Unknown server error";
    console.error("[soumission] error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
