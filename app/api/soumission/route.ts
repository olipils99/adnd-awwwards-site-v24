import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Mode = "email" | "meeting";

type Payload = {
  mode: Mode;
  data: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    services?: string[];
    budget?: string;
    message?: string;
    // meeting
    visitType?: "domicile" | "visio" | null;
    dateISO?: string | null;
    time?: string | null;
    ics?: string | null;
  };
};

function toText(p: Payload){
  const d = p.data;
  const lines = [
    `Mode: ${p.mode}`,
    `Nom: ${d.name}`,
    `Courriel: ${d.email}`,
    `Téléphone: ${d.phone || "—"}`,
    `Adresse: ${d.address || "—"}, ${d.city || ""}`,
    `Services: ${(d.services && d.services.length ? d.services.join(", ") : "—")}`,
    `Budget: ${d.budget || "—"}`,
  ];
  if (p.mode === "meeting"){
    lines.push(
      `Type: ${d.visitType==="domicile" ? "Visite à domicile" : "Visio"}`,
      `Date/Heure: ${d.dateISO || "—"} ${d.time || ""}`
    );
  }
  if (d.message) {
    lines.push("", "Message:", d.message);
  }
  return lines.join("\n");
}

export async function POST(req: Request){
  if (!process.env.RESEND_API_KEY || !process.env.MAIL_TO || !process.env.MAIL_FROM){
    return NextResponse.json({ ok: false, error: "Server email not configured. Set RESEND_API_KEY, MAIL_TO, MAIL_FROM." }, { status: 501 });
  }

  const payload = (await req.json()) as Payload;
  if (!payload?.data?.name || !payload?.data?.email || !payload?.mode){
    return NextResponse.json({ ok: false, error: "Missing fields." }, { status: 400 });
  }

  const subject = payload.mode === "meeting"
    ? `Rendez-vous — ${payload.data.name}`
    : `Soumission — ${payload.data.name}`;

  const bodyText = toText(payload);

  const attachments: Array<{ filename: string; content: string }> = [];
  if (payload.mode === "meeting" && payload.data.ics){
    // Base64 encode ICS content
    const b64 = Buffer.from(payload.data.ics, "utf8").toString("base64");
    attachments.push({ filename: "adnd-rendezvous.ics", content: b64 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM,
      to: [process.env.MAIL_TO],
      subject,
      text: bodyText,
      attachments: attachments.length ? attachments.map(a => ({ filename: a.filename, content: a.content })) : undefined
    })
  });

  if (!res.ok){
    const err = await res.text();
    return NextResponse.json({ ok: false, error: err || "Resend error" }, { status: 500 });
  }

  const json = await res.json();
  return NextResponse.json({ ok: true, id: json?.id || null });
}
