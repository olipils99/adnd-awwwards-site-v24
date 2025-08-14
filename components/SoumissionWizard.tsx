"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "../lib/data";

type Mode = "email" | "meeting";

type FormData = {
  mode: Mode | null;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  services: string[];
  budget: string;
  message: string;
  visitType: "domicile" | "visio" | null;
  dateISO: string | null;
  time: string | null;
};

const initial: FormData = {
  mode: null, name: "", email: "", phone: "", address: "", city: "",
  services: [], budget: "", message: "",
  visitType: null, dateISO: null, time: null
};

function Stepper({step, total}:{step:number; total:number}){
  const dots = Array.from({length: total});
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      {dots.map((_,i)=>{
        const active = i<=step;
        const wide = i===step;
        return <div key={i} className={`h-1.5 rounded-full ${active ? "bg-brand-600" : "bg-black/10"}`} style={{width: wide ? 36 : 18}}/>;
      })}
    </div>
  );
}

function toGoogleDates(start: Date, end: Date){
  const pad=(n:number)=> String(n).padStart(2,"0");
  const z = (d: Date)=> `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  return `${z(start)}/${z(end)}`;
}

function icsForMeeting(d: FormData){
  if(!d.dateISO || !d.time) return "";
  const start = new Date(`${d.dateISO}T${d.time}:00`);
  const end = new Date(start.getTime() + 60*60*1000);
  function fmt(dt: Date){
    const pad=(n:number)=> String(n).padStart(2,"0");
    const YYYY = dt.getUTCFullYear();
    const MM = pad(dt.getUTCMonth()+1);
    const DD = pad(dt.getUTCDate());
    const HH = pad(dt.getUTCHours());
    const mm = pad(dt.getUTCMinutes());
    const ss = pad(dt.getUTCSeconds());
    return `${YYYY}${MM}${DD}T${HH}${mm}${ss}Z`;
  }
  const summary = `ADND — Rencontre ${d.visitType==="domicile"?"à domicile":"visio"}`;
  const desc = `Nom: ${d.name}\nEmail: ${d.email}\nTéléphone: ${d.phone}\nAdresse: ${d.address}, ${d.city}\nServices: ${d.services.join(", ")}\nMessage: ${d.message}`;
  const loc = d.visitType==="domicile" ? `${d.address}, ${d.city}` : "Google Meet (lien envoyé après confirmation)";
  const uid = `adnd-${Date.now()}@example.com`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ADND Paysage//Soumission//FR",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${loc}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
}

function downloadICS(filename:string, content:string){
  const blob = new Blob([content], {type: "text/calendar"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(()=> URL.revokeObjectURL(url), 1000);
}

function Mailto({data}:{data: FormData}){
  const subject = encodeURIComponent(`Soumission — ${data.name || "Client ADND"}`);
  const body = encodeURIComponent(`Nom: ${data.name}
Courriel: ${data.email}
Téléphone: ${data.phone}
Adresse: ${data.address}, ${data.city}
Services: ${data.services.join(", ") || "—"}
Budget: ${data.budget || "—"}

Message:
${data.message || "—"}`);
  return <a className="px-5 py-3 rounded-full bg-brand-600 text-white font-medium disabled:opacity-50" disabled={sending} href={`mailto:info@adnd.example?subject=${subject}&body=${body}`}>Envoyer le courriel</a>
}

function MailtoMeeting({data}:{data:FormData}){
  const subject = encodeURIComponent(`Rendez-vous — ${data.name || "Client ADND"}`);
  const when = data.dateISO && data.time ? `${data.dateISO} ${data.time}` : "à planifier";
  const body = encodeURIComponent(`Type: ${data.visitType==="domicile"?"Visite à domicile":"Visio"}
Date/heure: ${when}
Nom: ${data.name}
Courriel: ${data.email}
Téléphone: ${data.phone}
Adresse: ${data.address}, ${data.city}
Services: ${data.services.join(", ") || "—"}

Message:
${data.message || "—"}`);
  return <a className="px-5 py-3 rounded-full bg-brand-600 text-white font-medium disabled:opacity-50" disabled={sending} href={`mailto:info@adnd.example?subject=${subject}&body=${body}`}>Confirmer par email</a>
}

function DayPicker({value, onChange}:{value: string|null; onChange:(v:string)=>void}){
  const days = useMemo(()=>{
    const out: string[] = [];
    const now = new Date();
    for(let i=0;i<21;i++){
      const d = new Date(now.getTime() + i*24*60*60*1000);
      out.push(d.toISOString().slice(0,10));
    }
    return out;
  },[]);
  return (
    <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
      {days.map(d=>{
        const dt = new Date(d+"T00:00:00");
        const label = dt.toLocaleDateString("fr-CA", { weekday:"short", day:"2-digit", month:"short" });
        const selected = value===d;
        return (
          <button
            key={d}
            onClick={()=>onChange(d)}
            className={`px-3 py-2 rounded-xl border text-sm ${selected? "bg-brand-600 text-white border-brand-600" : "bg-white hover:bg-black/5 border-black/10"}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function TimePicker({value, onChange}:{value: string|null; onChange:(v:string)=>void}){
  const slots = ["09:00","10:00","11:00","13:00","14:00","15:00","16:00"];
  return (
    <div className="flex flex-wrap gap-2">
      {slots.map(t=>{
        const selected = value===t;
        return (
          <button
            key={t}
            onClick={()=>onChange(t)}
            className={`px-3 py-2 rounded-xl border text-sm ${selected? "bg-brand-600 text-white border-brand-600" : "bg-white hover:bg-black/5 border-black/10"}`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

export default function SoumissionWizard(){
  const [sending, setSending] = useState(false);
  const [sentId, setSentId] = useState<string | null>(null);
  const [data, setData] = useState<FormData>(initial);
  const [step, setStep] = useState(0);
  const total = data.mode ? 4 : 1;

  const next = ()=> setStep(s=> Math.min(total-1, s+1));
  const prev = ()=> setStep(s=> Math.max(0, s-1));

  const canContinueEmail = !!(data.name && data.email);
  const canContinueMeeting = !!(data.visitType && data.name && data.email && data.dateISO && data.time);

  async function sendFromSite(mode: "email" | "meeting"){
    try{
      setSending(true);
      setSentId(null);
      let ics: string | null = null;
      if(mode === "meeting"){
        ics = icsForMeeting(data);
      }
      const r = await fetch("/api/soumission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, data: { ...data, ics } })
      });
      const j = await r.json();
      if(r.ok){ setSentId(j.id || null); next(); }
      else { alert(j.error || "Erreur d’envoi"); }
    }catch(e:any){ alert(e?.message || "Erreur d’envoi"); }
    finally{ setSending(false); }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">Demander une soumission</h1>
            <Stepper step={step} total={total} />
          </div>

          <div className="card p-6 md:p-8">
            <AnimatePresence mode="wait">
              {!data.mode && step===0 && (
                <motion.div key="mode" initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}}>
                  <p className="text-gray-700">Choisissez comment procéder :</p>
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <button onClick={()=>{ setData(d=>({...d, mode:"email"})); next(); }} className="p-6 rounded-2xl border border-black/10 hover:bg-black/5 text-left flex gap-3 items-start">
                      <img src="/icons/mail.svg" alt="" width="24" height="24" className="mt-1"/>
                      <div>
                        <div className="font-semibold">Soumission par courriel</div>
                        <div className="text-gray-600 text-sm">Nous recevons vos infos et vous répondons rapidement.</div>
                      </div>
                    </button>
                    <button onClick={()=>{ setData(d=>({...d, mode:"meeting"})); next(); }} className="p-6 rounded-2xl border border-black/10 hover:bg-black/5 text-left flex gap-3 items-start">
                      <img src="/icons/calendar.svg" alt="" width="24" height="24" className="mt-1"/>
                      <div>
                        <div className="font-semibold">Planifier une rencontre</div>
                        <div className="text-gray-600 text-sm">Choisissez une date/heure pour une visite ou un appel.</div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {data.mode==="email" && step===1 && (
                <motion.div key="email-form" initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input className="px-4 py-3 rounded-xl border border-black/10" placeholder="Nom complet *" value={data.name} onChange={e=>setData({...data, name:e.target.value})}/>
                    <input className="px-4 py-3 rounded-xl border border-black/10" placeholder="Courriel *" type="email" value={data.email} onChange={e=>setData({...data, email:e.target.value})}/>
                    <input className="px-4 py-3 rounded-xl border border-black/10" placeholder="Téléphone" value={data.phone} onChange={e=>setData({...data, phone:e.target.value})}/>
                    <input className="px-4 py-3 rounded-xl border border-black/10" placeholder="Adresse" value={data.address} onChange={e=>setData({...data, address:e.target.value})}/>
                    <input className="px-4 py-3 rounded-xl border border-black/10" placeholder="Ville" value={data.city} onChange={e=>setData({...data, city:e.target.value})}/>
                    <select className="px-4 py-3 rounded-xl border border-black/10" value={data.budget} onChange={e=>setData({...data, budget:e.target.value})}>
                      <option value="">Budget estimé</option>
                      <option>- 3 000 $</option>
                      <option>3 000 – 10 000 $</option>
                      <option>10 000 – 25 000 $</option>
                      <option>25 000 $ +</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Services désirés</div>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map(s => {
                        const checked = data.services.includes(s.title);
                        return (
                          <label key={s.slug} className={`px-3 py-2 rounded-full border ${checked ? "bg-brand-100 border-brand-300 text-brand-900" : "bg-white border-black/10"}`}>
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={checked}
                              onChange={(e)=>{
                                const on = e.target.checked;
                                setData(d=>({...d, services: on ? [...d.services, s.title] : d.services.filter(x=>x!==s.title)}))
                              }}
                            />
                            {s.title}
                          </label>
                        );
                      })}
                    </div>
                    <textarea className="mt-4 w-full px-4 py-3 rounded-xl border border-black/10" rows={4} placeholder="Décrivez votre projet (dimensions, inspirations, échéancier…)" value={data.message} onChange={e=>setData({...data, message:e.target.value})}/>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button onClick={prev} className="px-4 py-2 rounded-full border border-black/10 hover:bg-black/5">Retour</button>
                    <button onClick={next} disabled={!canContinueEmail} className="px-5 py-3 rounded-full bg-brand-600 text-white font-medium disabled:opacity-50">Continuer</button>
                  </div>
                </motion.div>
              )}

              {data.mode==="email" && step===2 && (
                <motion.div key="email-review" initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}}>
                  <h3 className="font-semibold">Vérification</h3>
                  <div className="mt-3 text-sm text-gray-700 whitespace-pre-line bg-black/5 rounded-xl p-4">
{`Nom: ${data.name}
Courriel: ${data.email}
Téléphone: ${data.phone}
Adresse: ${data.address}, ${data.city}
Services: ${data.services.join(", ") || "—"}
Budget: ${data.budget || "—"}

Message:
${data.message || "—"}`}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={()=>{
                        const subject = encodeURIComponent(`Soumission — ${data.name || "Client ADND"}`);
                        const body = encodeURIComponent(`Nom: ${data.name}
Courriel: ${data.email}
Téléphone: ${data.phone}
Adresse: ${data.address}, ${data.city}
Services: ${data.services.join(", ") || "—"}
Budget: ${data.budget || "—"}

Message:
${data.message || "—"}`);
                        window.location.href = `mailto:info@adnd.example?subject=${subject}&body=${body}`;
                        next();
                      }}
                      className="px-5 py-3 rounded-full bg-brand-600 text-white font-medium disabled:opacity-50" disabled={sending}
                    >Ouvrir mon courriel</button>
                    <button
                      onClick={()=>{
                        const t = `Soumission ADND\n\nNom: ${data.name}\nCourriel: ${data.email}\nTéléphone: ${data.phone}\nAdresse: ${data.address}, ${data.city}\nServices: ${data.services.join(", ")}\nBudget: ${data.budget}\n\n${data.message}`;
                        navigator.clipboard.writeText(t);
                      }}
                      className="px-5 py-3 rounded-full border border-black/10 hover:bg-black/5"
                    >
                      Copier le message
                    </button>
                    <button onClick={prev} className="px-4 py-2 rounded-full border border-black/10 hover:bg-black/5">Modifier</button>
                  </div>
                </motion.div>
              )}

              {data.mode==="meeting" && step===1 && (
                <motion.div key="meet-type" initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}}>
                  <p className="text-gray-700">Quel type de rencontre?</p>
                  <div className="mt-4 flex gap-3">
                    <button onClick={()=>setData({...data, visitType:"domicile"})} className={`px-4 py-3 rounded-xl border ${data.visitType==="domicile"?"bg-brand-600 text-white border-brand-600":"bg-white hover:bg-black/5 border-black/10"}`}>Visite à domicile</button>
                    <button onClick={()=>setData({...data, visitType:"visio"})} className={`px-4 py-3 rounded-xl border ${data.visitType==="visio"?"bg-brand-600 text-white border-brand-600":"bg-white hover:bg-black/5 border-black/10"}`}>Appel vidéo</button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <input className="px-4 py-3 rounded-xl border border-black/10" placeholder="Nom complet *" value={data.name} onChange={e=>setData({...data, name:e.target.value})}/>
                    <input className="px-4 py-3 rounded-xl border border-black/10" placeholder="Courriel *" type="email" value={data.email} onChange={e=>setData({...data, email:e.target.value})}/>
                    <input className="px-4 py-3 rounded-xl border border-black/10" placeholder="Téléphone" value={data.phone} onChange={e=>setData({...data, phone:e.target.value})}/>
                    <input className="px-4 py-3 rounded-xl border border-black/10" placeholder="Adresse" value={data.address} onChange={e=>setData({...data, address:e.target.value})}/>
                    <input className="px-4 py-3 rounded-xl border border-black/10" placeholder="Ville" value={data.city} onChange={e=>setData({...data, city:e.target.value})}/>
                    <div className="px-4 py-3 rounded-xl border border-black/10 text-gray-600">Choisissez une date et une heure ci-dessous.</div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <DayPicker value={data.dateISO} onChange={(v)=>setData({...data, dateISO:v})}/>
                    <TimePicker value={data.time} onChange={(v)=>setData({...data, time:v})}/>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button onClick={prev} className="px-4 py-2 rounded-full border border-black/10 hover:bg-black/5">Retour</button>
                    <button onClick={next} disabled={!canContinueMeeting} className="px-5 py-3 rounded-full bg-brand-600 text-white font-medium disabled:opacity-50">Continuer</button>
                  </div>
                </motion.div>
              )}

              {data.mode==="meeting" && step===2 && (
                <motion.div key="meet-review" initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}}>
                  <h3 className="font-semibold">Vérification</h3>
                  <div className="mt-3 text-sm text-gray-700 whitespace-pre-line bg-black/5 rounded-xl p-4">
{`Type: ${data.visitType==="domicile"?"Visite à domicile":"Visio"}
Date: ${data.dateISO || "—"} à ${data.time || "—"}
Nom: ${data.name}
Courriel: ${data.email}
Téléphone: ${data.phone}
Adresse: ${data.address}, ${data.city}

Services: ${data.services.join(", ") || "—"}
Message: ${data.message || "—"}`}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button onClick={()=> downloadICS("adnd-rendezvous.ics", icsForMeeting(data))} className="px-5 py-3 rounded-full border border-black/10 hover:bg-black/5">Ajouter au calendrier (.ics)</button>
                    <a
                      className="px-5 py-3 rounded-full border border-black/10 hover:bg-black/5"
                      href={(function(){
                        if(!data.dateISO||!data.time) return "#";
                        const s=new Date(`${data.dateISO}T${data.time}:00`);
                        const e=new Date(s.getTime()+60*60*1000);
                        const dates=toGoogleDates(s,e);
                        const text=encodeURIComponent(`ADND — Rencontre ${data.visitType==="domicile"?"à domicile":"visio"}`);
                        const details=encodeURIComponent(`Nom: ${data.name}\nEmail: ${data.email}\nTéléphone: ${data.phone}\nAdresse: ${data.address}, ${data.city}\nServices: ${data.services.join(", ")}\nMessage: ${data.message}`);
                        const loc=encodeURIComponent(data.visitType==="domicile"? `${data.address}, ${data.city}` : "Google Meet (lien envoyé après confirmation)");
                        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${loc}`;
                      })()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ajouter dans Google Calendar
                    </a>
                    <button
                      onClick={()=>{
                        const subject = encodeURIComponent(`Rendez-vous — ${data.name || "Client ADND"}`);
                        const when = data.dateISO && data.time ? `${data.dateISO} ${data.time}` : "à planifier";
                        const body = encodeURIComponent(`Type: ${data.visitType==="domicile"?"Visite à domicile":"Visio"}
Date/heure: ${when}
Nom: ${data.name}
Courriel: ${data.email}
Téléphone: ${data.phone}
Adresse: ${data.address}, ${data.city}
Services: ${data.services.join(", ") || "—"}

Message:
${data.message || "—"}`);
                        window.location.href = `mailto:info@adnd.example?subject=${subject}&body=${body}`;
                        next();
                      }}
                      className="px-5 py-3 rounded-full bg-brand-600 text-white font-medium disabled:opacity-50" disabled={sending}
                    >Confirmer par email</button>
                    <button onClick={prev} className="px-4 py-2 rounded-full border border-black/10 hover:bg-black/5">Modifier</button>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button onClick={next} className="px-5 py-3 rounded-full bg-brand-600 text-white font-medium disabled:opacity-50" disabled={sending}>Terminer</button>
                  </div>
                </motion.div>
              )}


              {data.mode==="email" && step===3 && (
                <motion.div key="email-done" initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}}>
                  <div className="text-center">
                    <h3 className="mt-2 text-lg font-semibold">Merci! Votre message a été envoyé. (Si vous avez cliqué “Ouvrir mon courriel”, vérifiez votre app. Si vous avez cliqué “Envoyer depuis le site”, la demande a été transmise.)</h3>
                    <p className="text-gray-700 mt-2">Nous vous répondrons rapidement. Vous pouvez aussi planifier une rencontre si vous préférez.</p>
                    <div className="mt-6 flex justify-center gap-3">
                      <a href="/soumission" className="px-5 py-3 rounded-full border border-black/10 hover:bg-black/5">Refaire une demande</a>
                      <a href="/" className="px-5 py-3 rounded-full bg-brand-600 text-white">Retour à l’accueil</a>
                    </div>
                  </div>
                </motion.div>
              )}

              {data.mode==="meeting" && step===3 && (
                <motion.div key="meet-done" initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}}>
                  <div className="text-center">
                    <h3 className="mt-2 text-lg font-semibold">C’est envoyé!</h3>
                    <p className="text-gray-700 mt-2">Nous confirmons votre rendez-vous par courriel rapidement.{sentId ? ` (ref: ${sentId})` : ""}</p>
                    <div className="mt-6">
                      <a href="/" className="px-5 py-3 rounded-full border border-black/10 hover:bg-black/5">Retour à l’accueil</a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <aside className="hidden md:block">
          <div className="sticky top-24">
            <div className="rounded-2xl overflow-hidden border border-black/10">
              <img src="/images/proj-4.svg" alt="ADND chantier" className="w-full h-auto"/>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <img src="/images/proj-1.svg" alt="" className="rounded-xl border border-black/10"/>
              <img src="/images/proj-2.svg" alt="" className="rounded-xl border border-black/10"/>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
