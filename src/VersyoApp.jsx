import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════ */
const BG = "#03030c";
const GB = "linear-gradient(135deg,#9d5cf5,#f5385a,#ff6b35)";

const OB_STEPS = [
  { isSplash: true, cta: "Descubrir Versyo →" },
  { title: "En Versyo no buscas personas,", hl: "las encuentras.", body: "Apunta la cámara a quien tienes delante y descubre su identidad digital al instante, siempre bajo su consentimiento.", cta: "Siguiente" },
  { title: "Conectamos el mundo real", hl: "con el digital.", body: "Tecnología UWB + biometría + realidad aumentada fusiona la experiencia física y digital.", cta: "Siguiente" },
  { title: "Tú decides qué mostrar", hl: "y a quién.", body: "Activa tu Versyon Profesional, de Ocio, Ad-Hoc o hazte Invisible. Control total sobre tu identidad en cada momento.", cta: "Empezar" },
];

const CONVOS = [
  { id: 1, n: "Laura Gómez",  ini: "LG", col: "#e03c6e", pre: "Genial conocerte en el evento!", t: "2 min",  u: 2, on: true  },
  { id: 2, n: "Marc Puig",    ini: "MP", col: "#6366f1", pre: "¿Quedamos para el meetup?",      t: "18 min", u: 0, on: true  },
  { id: 3, n: "Alejandro B.", ini: "AB", col: "#1d4ed8", pre: "Hola! Vi tu perfil en Web3...",  t: "1h",     u: 1, on: false },
  { id: 4, n: "Sofía Ruiz",   ini: "SR", col: "#9333ea", pre: "Tu estado Ad-Hoc mola mucho!",   t: "3h",     u: 0, on: false },
];

const CHAT_MESSAGES = [
  { me: false, t: "Hola! Genial encontrarte aquí a través de Versyo.", time: "20:14" },
  { me: true,  t: "Igualmente! Es increíble esta tecnología.",         time: "20:15" },
  { me: false, t: "¿Estarás en el DeFi Summit la próxima semana?",    time: "20:16" },
  { me: true,  t: "Sí! Quedemos el martes a las 10am.",               time: "20:17" },
  { me: false, t: "Perfecto! Allí estaré 🙌",                          time: "20:18" },
];

const FAMOUS_DB = [
  { id: "cr", n: "Cristiano Ronaldo", h: "@cristiano",    col: "#1d4ed8", fw: "635M",  role: "Futbolista · Al Nassr",   nets: ["instagram","tiktok","twitter","facebook"], isFamous: true },
  { id: "r",  n: "Rosalía",           h: "@rosalia",      col: "#c026d3", fw: "14.2M", role: "Artista · Grammy",         nets: ["instagram","tiktok","twitter"],             isFamous: true },
  { id: "ai", n: "Aitana",            h: "@aitana",       col: "#e879f9", fw: "9.8M",  role: "Cantante · OT",            nets: ["instagram","tiktok","twitter"],             isFamous: true },
  { id: "ib", n: "Ibai Llanos",       h: "@ibai",         col: "#7c3aed", fw: "12.8M", role: "Streamer",                 nets: ["tiktok","twitter","facebook"],              isFamous: true },
  { id: "bm", n: "Bad Bunny",         h: "@badbunny",     col: "#16a34a", fw: "45.2M", role: "Artista · Reggaeton",      nets: ["instagram","tiktok","twitter"],             isFamous: true },
  { id: "zd", n: "Zendaya",           h: "@zendaya",      col: "#b45309", fw: "178M",  role: "Actriz · Cantante",        nets: ["instagram","twitter","tiktok"],             isFamous: true },
  { id: "mr", n: "Marc Roca",         h: "@marcroca",     col: "#6366f1", fw: "1.2M",  role: "Futbolista · Real Betis",  nets: ["instagram","twitter"],                     isFamous: true },
  { id: "am", n: "Alejandro Sanz",    h: "@alejandrosanz",col: "#0891b2", fw: "8.1M",  role: "Cantante",                 nets: ["instagram","twitter","facebook"],           isFamous: true },
];

const NET_INFO = {
  linkedin:  { bg: "#0a66c2",                                         label: "LinkedIn"  },
  instagram: { bg: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", label: "Instagram" },
  tiktok:    { bg: "#010101",                                          label: "TikTok"    },
  twitter:   { bg: "#111",                                             label: "X/Twitter" },
  facebook:  { bg: "#1877f2",                                          label: "Facebook"  },
  tinder:    { bg: "linear-gradient(135deg,#ff6b6b,#fd297b)",          label: "Tinder"    },
};

const NETS_PRO  = ["linkedin", "twitter"];
const NETS_OCIO = ["instagram", "tiktok", "facebook", "tinder"];

const FACE_IMG  = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80";
const CROWD_IMG = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200";

/* ═══════════════════════════════════════════
   VERSYO LOGO
═══════════════════════════════════════════ */
function VLogo({ size = 36, onClick }) {
  const id = `vl${size}${onClick ? "c" : ""}${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size * 1.08} viewBox="0 0 120 130" fill="none"
      onClick={onClick} style={onClick ? { cursor: "pointer", flexShrink: 0 } : { flexShrink: 0 }}>
      <defs>
        <linearGradient id={`${id}a`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1a52c7" /><stop offset="30%"  stopColor="#7b2fbe" />
          <stop offset="60%"  stopColor="#e0305a" /><stop offset="100%" stopColor="#f06a1e" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="100%" y1="0%" x2="10%" y2="100%">
          <stop offset="0%"   stopColor="#c030c8" /><stop offset="50%"  stopColor="#e8395a" />
          <stop offset="100%" stopColor="#f06a1e" />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#d03560" /><stop offset="100%" stopColor="#e8392a" />
        </linearGradient>
      </defs>
      <path d="M18 10 C6 10 4 26 12 34 L52 70 L52 50 L28 26 C22 20 22 10 30 10 Z" fill={`url(#${id}b)`} opacity="0.95" />
      <path d="M102 10 C114 10 116 26 108 34 L68 70 L68 50 L92 26 C98 20 98 10 90 10 Z" fill={`url(#${id}a)`} opacity="0.95" />
      <rect x="44" y="62" width="32" height="42" rx="16" fill={`url(#${id}c)`} />
      <ellipse cx="60" cy="70" rx="16" ry="12" fill={`url(#${id}c)`} opacity="0.65" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   NETWORK ICONS
═══════════════════════════════════════════ */
function NetSVG({ net, size = 18 }) {
  const paths = {
    linkedin:  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z",
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
    tiktok:    "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z",
    twitter:   "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    facebook:  "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    tinder:    "M8.106 16.015a5.442 5.442 0 0 1-1.531-5.316C7.504 6.688 12 4 12 4s-.082 3.147 2.275 5.283c.616.559 1.339 1.042 1.928 1.663.424.44.783.95 1.025 1.518a4.8 4.8 0 0 1 .345 2.042c0 2.66-2.155 4.817-4.815 4.817a4.793 4.793 0 0 1-4.652-3.308zm4.66 2.248a2.557 2.557 0 0 0 2.557-2.558c0-.844-.373-1.597-.963-2.11a4.128 4.128 0 0 1-1.2 2.497 4.128 4.128 0 0 1-2.564 1.116c.396.66 1.12 1.055 2.17 1.055z",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff">
      <path d={paths[net] || ""} />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   CLOSE BUTTON — X visible
═══════════════════════════════════════════ */
function CloseBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 28, height: 28, borderRadius: "50%",
      background: "rgba(255,255,255,0.14)",
      border: "1px solid rgba(255,255,255,0.25)",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", flexShrink: 0, color: "#fff",
      fontSize: 16, fontWeight: 700, lineHeight: 1, padding: 0,
    }}>✕</button>
  );
}

/* ═══════════════════════════════════════════
   FACE SCAN CANVAS (registro)
═══════════════════════════════════════════ */
function FaceScanCanvas({ scanning }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const angRef = useRef(0);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    c.width = 260; c.height = 260;
    const cx = 130, cy = 130, r = 108;
    const draw = () => {
      ctx.clearRect(0, 0, 260, 260);
      angRef.current += scanning ? 1.5 : 0.4;
      const a = angRef.current;
      ctx.save(); ctx.shadowColor = "rgba(157,92,245,0.6)"; ctx.shadowBlur = 18;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(157,92,245,0.35)"; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
      const grad = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
      grad.addColorStop(0, "rgba(0,220,200,0)"); grad.addColorStop(0.5, "rgba(0,220,200,0.9)"); grad.addColorStop(1, "rgba(157,92,245,0.9)");
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(a * Math.PI / 180);
      ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 1.6); ctx.strokeStyle = grad; ctx.lineWidth = 3; ctx.stroke();
      ctx.beginPath(); ctx.arc(r * Math.cos(Math.PI * 1.6), r * Math.sin(Math.PI * 1.6), 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,220,200,1)"; ctx.shadowColor = "rgba(0,220,200,0.9)"; ctx.shadowBlur = 10; ctx.fill(); ctx.restore();
      if (scanning) {
        const scanY = cy - r + (r * 2) * ((Math.sin(a * 0.025) + 1) / 2);
        ctx.save(); ctx.beginPath(); ctx.moveTo(cx - r, scanY); ctx.lineTo(cx + r, scanY);
        const lg = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
        lg.addColorStop(0, "transparent"); lg.addColorStop(0.5, "rgba(0,220,200,0.7)"); lg.addColorStop(1, "transparent");
        ctx.strokeStyle = lg; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scanning]);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

/* ═══════════════════════════════════════════
   SCAN FRAME (Buscar)
═══════════════════════════════════════════ */
function ScanFrame({ phase }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const angRef = useRef(0);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const W = 310, H = 420;
    c.width = W; c.height = H;
    const sq = 190, fx = (W - sq) / 2, fy = (H - sq) / 2 - 10, cLen = 28;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      if (phase !== "scanning" && phase !== "found") { rafRef.current = requestAnimationFrame(draw); return; }
      angRef.current += 0.8;
      const a = angRef.current, pulse = 0.5 + 0.5 * Math.sin(a * 0.04);
      [[fx, fy, 1, 1], [fx + sq, fy, -1, 1], [fx, fy + sq, 1, -1], [fx + sq, fy + sq, -1, -1]].forEach(([cx, cy, dx, dy]) => {
        ctx.save(); ctx.strokeStyle = `rgba(0,220,200,${0.7 + pulse * 0.3})`; ctx.lineWidth = 2.5; ctx.lineCap = "round";
        ctx.shadowColor = "rgba(0,220,200,0.9)"; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + dx * cLen, cy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + dy * cLen); ctx.stroke();
        ctx.restore();
      });
      ctx.save(); ctx.strokeStyle = `rgba(180,80,255,${0.3 + pulse * 0.2})`; ctx.lineWidth = 1;
      ctx.beginPath();
      try { ctx.roundRect(fx, fy, sq, sq, 14); } catch (e) { ctx.rect(fx, fy, sq, sq); }
      ctx.stroke(); ctx.restore();
      if (phase === "scanning") {
        const t = ((a * 0.012) % 1), scanY = fy + t * sq;
        if (scanY >= fy && scanY <= fy + sq) {
          ctx.save();
          const lg = ctx.createLinearGradient(fx, 0, fx + sq, 0);
          lg.addColorStop(0, "transparent"); lg.addColorStop(0.5, "rgba(0,220,200,0.65)"); lg.addColorStop(1, "transparent");
          ctx.strokeStyle = lg; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(fx, scanY); ctx.lineTo(fx + sq, scanY); ctx.stroke(); ctx.restore();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);
  return <canvas ref={canvasRef} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -54%)", pointerEvents: "none", zIndex: 5 }} />;
}

/* ═══════════════════════════════════════════
   PROFILE CARD — famosos (RRSS) vs usuarios (Conectar)
═══════════════════════════════════════════ */
function ProfileCard({ person, onClose }) {
  const [connState, setConnState] = useState("idle");
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 40); return () => clearTimeout(t); }, []);

  return (
    <div style={{ position: "absolute", bottom: 90, left: "50%", transform: `translateX(-50%) translateY(${visible ? 0 : 14}px) scale(${visible ? 1 : 0.96})`, opacity: visible ? 1 : 0, transition: "all 0.5s cubic-bezier(.34,1.4,.64,1)", width: 292, zIndex: 22 }}>
      <div style={{ background: "rgba(8,6,28,0.92)", border: "1px solid rgba(180,80,255,0.5)", borderRadius: 22, padding: "15px 16px 17px", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", boxShadow: "0 0 40px rgba(180,80,255,0.22)", position: "relative", overflow: "visible" }}>
        <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1.5, background: "linear-gradient(90deg,transparent,rgba(180,80,255,0.9),rgba(240,100,160,0.7),transparent)", borderRadius: "0 0 2px 2px" }} />
        {/* Cabecera */}
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 11 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            {person.img
              ? <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundImage: `url(${person.img})`, backgroundSize: "cover", backgroundPosition: "center top", border: "2.5px solid rgba(180,80,255,0.7)" }} />
              : <div style={{ width: 52, height: 52, borderRadius: "50%", background: person.col || "#9d5cf5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#fff", border: "2.5px solid rgba(180,80,255,0.7)" }}>{person.n[0]}</div>
            }
            <div style={{ position: "absolute", bottom: -2, right: -2, width: 18, height: 18, borderRadius: "50%", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#3b82f6" d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{person.n}</span>
              {person.isFamous && <div style={{ background: "rgba(245,197,24,0.15)", border: "1px solid rgba(245,197,24,0.4)", borderRadius: 10, padding: "2px 7px" }}><span style={{ fontSize: 9, fontWeight: 700, color: "#f5c518" }}>VERIFICADO</span></div>}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{person.role || ""}</div>
            {person.fw && <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{person.fw} seguidores</div>}
          </div>
          <CloseBtn onClick={onClose} />
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 12 }} />
        {/* Famoso: logos RRSS */}
        {person.isFamous && (
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 9 }}>Perfiles verificados · Toca para acceder</div>
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              {(person.nets || []).map(key => {
                const n = NET_INFO[key];
                const [tapped, setTapped] = useState(false);
                return (
                  <div key={key} onClick={() => setTapped(t => !t)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }}>
                    <div style={{ width: 46, height: 46, borderRadius: 13, background: n.bg, display: "flex", alignItems: "center", justifyContent: "center", border: tapped ? "2px solid rgba(52,211,153,0.7)" : "1px solid rgba(255,255,255,0.12)", boxShadow: tapped ? "0 0 12px rgba(52,211,153,0.3)" : "none", transition: "all 0.2s" }}>
                      <NetSVG net={key} size={23} />
                    </div>
                    <span style={{ fontSize: 8, color: tapped ? "#34d399" : "rgba(255,255,255,0.45)", transition: "color 0.2s" }}>{tapped ? "Abriendo..." : n.label}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 11, display: "flex", alignItems: "center", gap: 6, background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.18)", borderRadius: 10, padding: "7px 10px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: "rgba(52,211,153,0.85)" }}>Perfiles auténticos verificados por Versyo</span>
            </div>
          </div>
        )}
        {/* Usuario normal: conectar */}
        {!person.isFamous && (
          <div>
            {connState === "idle" && (
              <button onClick={() => setConnState("sent")} style={{ width: "100%", height: 44, borderRadius: 22, background: "linear-gradient(135deg,#d63af9,#f5385a,#ff6b35)", border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 18px rgba(214,58,249,0.4)" }}>Conectar</button>
            )}
            {connState === "sent" && (
              <div style={{ background: "rgba(157,92,245,0.1)", border: "1px solid rgba(157,92,245,0.35)", borderRadius: 14, padding: "13px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 7 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#9d5cf5,#f5385a)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Solicitud enviada</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 1 }}>Pendiente de aceptación</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, paddingLeft: 39 }}>
                  Cuando {person.n.split(" ")[0]} acepte podrás chatear en Versyo
                </div>
                <button onClick={() => setConnState("idle")} style={{ marginTop: 8, paddingLeft: 39, background: "none", border: "none", fontSize: 10, color: "rgba(255,255,255,0.28)", cursor: "pointer", textDecoration: "underline", display: "block" }}>Cancelar solicitud</button>
              </div>
            )}
          </div>
        )}
      </div>
      <div style={{ width: 1.5, height: 14, background: "linear-gradient(to bottom,rgba(180,80,255,0.5),transparent)", margin: "0 auto" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   STATUS BAR
═══════════════════════════════════════════ */
function StatusBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 22px 0", flexShrink: 0, zIndex: 10 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>9:41</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <svg width="16" height="11" viewBox="0 0 16 11">{[0, 4.5, 9, 13.5].map((x, i) => <rect key={i} x={x} y={11 - (i + 1) * 2.7} width={3} height={(i + 1) * 2.7} rx={1} fill="rgba(255,255,255,.85)" />)}</svg>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>5G</span>
        <div style={{ width: 22, height: 12, border: "1.5px solid rgba(255,255,255,0.5)", borderRadius: 3, position: "relative" }}>
          <div style={{ width: "55%", height: 6, background: "rgba(255,255,255,0.85)", position: "absolute", top: 1.5, left: 1.5, borderRadius: 1.5 }} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NAV BAR
═══════════════════════════════════════════ */
function NavBar({ tab, onTab, unread }) {
  const tabs = [
    { id: "finder",  label: "Buscar",   icon: (a) => <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={a ? "#fff" : "rgba(255,255,255,0.3)"} strokeWidth={a ? 2.3 : 1.5}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg> },
    { id: "chat",    label: "Mensajes", badge: unread, icon: (a) => <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={a ? "#fff" : "rgba(255,255,255,0.3)"} strokeWidth={a ? 2.3 : 1.5}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
    { id: "profile", label: "Perfil",   icon: (a) => <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={a ? "#fff" : "rgba(255,255,255,0.3)"} strokeWidth={a ? 2.3 : 1.5}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg> },
  ];
  return (
    <div style={{ flexShrink: 0, display: "flex", background: "rgba(3,3,12,0.98)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "10px 0 18px" }}>
      {tabs.map(t => {
        const active = tab === t.id;
        return (
          <button key={t.id} onClick={() => onTab(t.id)} style={{ flex: 1, border: "none", background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "2px 0", color: "#fff" }}>
            <div style={{ position: "relative" }}>
              {t.icon(active)}
              {(t.badge || 0) > 0 && <div style={{ position: "absolute", top: -3, right: -4, width: 16, height: 16, borderRadius: "50%", background: "#f5385a", fontSize: 9, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{t.badge}</div>}
            </div>
            <span style={{ fontSize: 9, color: active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)" }}>{t.label}</span>
            {active && <div style={{ width: 20, height: 2.5, borderRadius: 2, background: GB }} />}
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE HEADER
═══════════════════════════════════════════ */
function PageHeader({ title, onReset }) {
  return (
    <div style={{ padding: "6px 18px 10px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ fontSize: 19, fontWeight: 700, color: "#fff", letterSpacing: "-0.015em" }}>{title}</div>
      <VLogo size={26} onClick={onReset} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   ONBOARDING — paso 0 es splash fijo con botón
═══════════════════════════════════════════ */
function OnboardingScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const s = OB_STEPS[step];
  const next = () => step < OB_STEPS.length - 1 ? setStep(x => x + 1) : onDone();

  if (s.isSplash) return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "32px 26px 36px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(157,92,245,0.13),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ marginBottom: 22 }}><VLogo size={96} /></div>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 5, color: "#fff", marginBottom: 8 }}>VERSYO</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", marginBottom: 32 }}>The Visual Identity Protocol</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {["UWB", "Biometría", "AR", "GDPR"].map(tag => (
            <div key={tag} style={{ background: "rgba(157,92,245,0.12)", border: "1px solid rgba(157,92,245,0.3)", borderRadius: 20, padding: "5px 14px", fontSize: 11, color: "rgba(157,92,245,0.9)", fontWeight: 500 }}>{tag}</div>
          ))}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 7, marginBottom: 20 }}>
          {OB_STEPS.map((_, i) => <div key={i} style={{ height: 4, borderRadius: 2, width: i === step ? 24 : 7, background: i === step ? GB : "rgba(255,255,255,0.18)", transition: "width 0.3s" }} />)}
        </div>
        <button onClick={next} style={{ width: "100%", height: 54, borderRadius: 27, background: GB, border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 28px rgba(157,92,245,0.28)" }}>{s.cta}</button>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 26px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "14%", left: "50%", transform: "translateX(-50%)", width: 290, height: 290, borderRadius: "50%", background: "radial-gradient(circle,rgba(157,92,245,0.09),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 6, marginBottom: 4 }}>
        {step < OB_STEPS.length - 1 ? <button onClick={onDone} style={{ padding: "6px 14px", borderRadius: 20, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", fontSize: 12, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>Omitir</button> : <div style={{ height: 32 }} />}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ marginBottom: 26 }}><VLogo size={52} /></div>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 27, fontWeight: 700, lineHeight: 1.22, letterSpacing: "-0.02em", color: "#fff" }}>{s.title}</div>
          <div style={{ fontSize: 27, fontWeight: 700, lineHeight: 1.22, letterSpacing: "-0.02em", background: GB, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.hl}</div>
        </div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", textAlign: "center", lineHeight: 1.68, maxWidth: 268 }}>{s.body}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 7, marginBottom: 24 }}>
        {OB_STEPS.map((_, i) => <div key={i} style={{ height: 4, borderRadius: 2, width: i === step ? 24 : 7, background: i === step ? GB : "rgba(255,255,255,0.18)", transition: "width 0.3s" }} />)}
      </div>
      <button onClick={next} style={{ width: "100%", height: 52, borderRadius: 26, background: GB, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 28px rgba(157,92,245,0.28)" }}>{s.cta}</button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   AUTH GATE
═══════════════════════════════════════════ */
function AuthGateScreen({ onLogin, onRegister }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 26px 36px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(157,92,245,0.12),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(18px)", transition: "all 0.6s cubic-bezier(.34,1.4,.64,1)" }}>
        <div style={{ marginBottom: 14 }}><VLogo size={60} /></div>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 3, color: "#fff", marginBottom: 6 }}>VERSYO</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em", marginBottom: 40, textAlign: "center" }}>Tu identidad visual, siempre bajo tu control</div>
        <div style={{ display: "flex", marginBottom: 32, position: "relative" }}>
          {["#e03c6e", "#6366f1", "#1d4ed8", "#f06a1e", "#34d399"].map((col, i) => (
            <div key={i} style={{ width: 40, height: 40, borderRadius: "50%", background: col, border: "2.5px solid #03030c", marginLeft: i > 0 ? -10 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>{["L", "M", "A", "S", "R"][i]}</div>
          ))}
          <div style={{ position: "absolute", right: -52, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}>+12K usuarios</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>En Versyo no buscas personas,</span><br />
          <span style={{ fontSize: 20, fontWeight: 700, background: GB, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>las encuentras.</span>
        </div>
      </div>
      <div style={{ width: "100%", opacity: visible ? 1 : 0, transition: "all 0.6s ease 0.18s", display: "flex", flexDirection: "column", gap: 12 }}>
        <button onClick={onRegister} style={{ width: "100%", height: 54, borderRadius: 27, background: GB, border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: "0.02em", boxShadow: "0 8px 28px rgba(157,92,245,0.32)" }}>Regístrate</button>
        <button onClick={onLogin} style={{ width: "100%", height: 54, borderRadius: 27, background: "transparent", border: "1.5px solid rgba(255,255,255,0.22)", color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>Identifícate</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LOGIN
═══════════════════════════════════════════ */
function LoginScreen({ onBack, onDone }) {
  const [loading, setLoading] = useState(false);
  const handleLogin = () => { setLoading(true); setTimeout(() => { setLoading(false); onDone(); }, 1600); };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 32px", overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4, marginBottom: 32 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 14, cursor: "pointer", padding: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>Volver
        </button>
        <VLogo size={28} />
      </div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>Bienvenido de vuelta</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.48)" }}>Inicia sesión para continuar</div>
      </div>
      {[{ label: "Email", ph: "tu@email.com", type: "text" }, { label: "Contraseña", ph: "••••••••", type: "password" }].map(f => (
        <div key={f.label} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 7 }}>{f.label}</div>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "13px 15px" }}>
            <input placeholder={f.ph} type={f.type} style={{ width: "100%", background: "none", border: "none", outline: "none", fontSize: 14, color: "#fff", caretColor: "#9d5cf5" }} />
          </div>
        </div>
      ))}
      <div style={{ textAlign: "right", marginBottom: 28 }}><span style={{ fontSize: 12, color: "#9d5cf5", cursor: "pointer" }}>¿Olvidaste tu contraseña?</span></div>
      <button onClick={handleLogin} style={{ width: "100%", height: 54, borderRadius: 27, background: loading ? "rgba(255,255,255,0.08)" : GB, border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.3s" }}>
        {loading ? <><div style={{ width: 18, height: 18, borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.2)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite" }} />Verificando...</> : "Entrar"}
      </button>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   REGISTRO PASO 1 — Consentimiento
═══════════════════════════════════════════ */
function RegisterConsentScreen({ onBack, onAccept }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 32px", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(157,92,245,0.1),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4, marginBottom: 24 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 14, cursor: "pointer", padding: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>Volver
        </button>
        <VLogo size={28} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 28 }}>
        {[0, 1, 2].map(i => <div key={i} style={{ height: 3.5, borderRadius: 2, width: i === 0 ? 28 : 10, background: i === 0 ? GB : "rgba(255,255,255,0.15)" }} />)}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "all 0.55s cubic-bezier(.34,1.4,.64,1)" }}>
        <div style={{ marginBottom: 20 }}><VLogo size={58} /></div>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>Consentimiento</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>Biométrico</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "18px 16px", marginBottom: 20, width: "100%", boxSizing: "border-box" }}>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.72, margin: 0, textAlign: "center" }}>Al continuar, aceptas que VERSYO procese tus datos biométricos para reconocerte en tiempo real, de acuerdo con el RGPD y el AI Act UE. Puedes retirar tu consentimiento en Ajustes.</p>
        </div>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 9 }}>
          {[["🔒", "Datos cifrados end-to-end"], ["🧬", "Solo hashes vectoriales, nunca imágenes"], ["🇪🇺", "Cumplimiento GDPR + AI Act UE"]].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(157,92,245,0.07)", border: "1px solid rgba(157,92,245,0.15)", borderRadius: 12, padding: "9px 12px" }}>
              <span style={{ fontSize: 15 }}>{icon}</span><span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={onAccept} style={{ width: "100%", height: 54, borderRadius: 27, background: GB, border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 28px rgba(157,92,245,0.28)", marginTop: 16 }}>Acepto y continuar</button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   REGISTRO PASO 2 — Captura facial
═══════════════════════════════════════════ */
function RegisterFaceScreen({ onBack, onDone }) {
  const [scanState, setScanState] = useState("idle");
  const handleScan = () => { if (scanState !== "idle") return; setScanState("scanning"); setTimeout(() => setScanState("done"), 3200); };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 32px", overflow: "hidden", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4, marginBottom: 18 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 14, cursor: "pointer", padding: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>Volver
        </button>
        <VLogo size={28} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 20 }}>
        {[0, 1, 2].map(i => <div key={i} style={{ height: 3.5, borderRadius: 2, width: i === 1 ? 28 : 10, background: i <= 1 ? GB : "rgba(255,255,255,0.15)" }} />)}
      </div>
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Captura tu rostro</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 5, lineHeight: 1.6 }}>Sitúa tu cara dentro del marco. Gira ligeramente la cabeza.</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div onClick={handleScan} style={{ position: "relative", width: 220, height: 220, cursor: scanState === "idle" ? "pointer" : "default" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", background: "rgba(255,255,255,0.04)" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 100 100" width="160" height="160" style={{ opacity: 0.55 }}>
                <ellipse cx="50" cy="38" rx="22" ry="25" fill="rgba(200,200,220,0.6)" />
                <ellipse cx="50" cy="85" rx="34" ry="28" fill="rgba(180,185,210,0.5)" />
              </svg>
            </div>
            {scanState === "scanning" && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,220,200,0.08),transparent,rgba(157,92,245,0.08))" }} />}
            {scanState === "done" && (
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,220,200,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(0,220,200,0.9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(0,220,200,0.6)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
              </div>
            )}
          </div>
          <div style={{ position: "absolute", inset: -10 }}><FaceScanCanvas scanning={scanState === "scanning"} /></div>
        </div>
        {scanState === "idle" && <div style={{ marginTop: 14, textAlign: "center" }}><span style={{ fontSize: 12, color: "rgba(255,255,255,0.38)" }}>Toca el círculo para comenzar el escaneo</span></div>}
        {scanState === "scanning" && <div style={{ marginTop: 14, textAlign: "center" }}><span style={{ fontSize: 12, color: "rgba(0,220,200,0.8)" }}>Procesando datos biométricos...</span></div>}
        {scanState === "done" && <div style={{ marginTop: 14, textAlign: "center" }}><span style={{ fontSize: 12, color: "#34d399" }}>✓ Escaneo completado</span></div>}
      </div>
      <button onClick={scanState === "done" ? onDone : handleScan} style={{ width: "100%", height: 54, borderRadius: 27, background: scanState === "scanning" ? "rgba(255,255,255,0.07)" : GB, border: scanState === "scanning" ? "1px solid rgba(255,255,255,0.12)" : "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "all 0.3s" }}>
        {scanState === "done" ? "Continuar →" : scanState === "scanning" ? "Escaneando..." : "Empezar escaneo"}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   REGISTRO PASO 3 — Vincula redes
═══════════════════════════════════════════ */
function RegisterNetworksScreen({ onBack, onDone }) {
  const INIT = [
    { id: "tiktok", label: "TikTok", connected: false },
    { id: "linkedin", label: "LinkedIn", connected: true },
    { id: "instagram", label: "Instagram", connected: false },
    { id: "tinder", label: "Tinder", connected: false },
  ];
  const [nets, setNets] = useState(INIT);
  const toggle = (id) => setNets(prev => prev.map(n => n.id === id ? { ...n, connected: !n.connected } : n));
  const NET_COLORS = { tiktok: "#010101", linkedin: "#0a66c2", instagram: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", tinder: "linear-gradient(135deg,#ff6b6b,#fd297b)" };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 24px 32px", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4, marginBottom: 18 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.55)", fontSize: 14, cursor: "pointer", padding: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>Volver
        </button>
        <VLogo size={28} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 20 }}>
        {[0, 1, 2].map(i => <div key={i} style={{ height: 3.5, borderRadius: 2, width: i === 2 ? 28 : 10, background: GB }} />)}
      </div>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 6 }}>Vincula tus redes</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", lineHeight: 1.6 }}>Conecta tus perfiles para que te encuentren</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, overflow: "auto" }}>
        {nets.map(net => (
          <div key={net.id} style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.04)", border: `1px solid ${net.connected ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.1)"}`, borderRadius: 18, padding: "13px 16px", transition: "border-color 0.2s" }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, flexShrink: 0, background: NET_COLORS[net.id] || "#333", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
              <NetSVG net={net.id} size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{net.label}</div>
              <div style={{ fontSize: 11, color: net.connected ? "rgba(52,211,153,0.9)" : "rgba(255,255,255,0.38)" }}>{net.connected ? "✓ Conectada" : "No conectada"}</div>
            </div>
            <button onClick={() => toggle(net.id)} style={{ padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, background: net.connected ? "rgba(52,211,153,0.14)" : GB, color: net.connected ? "#34d399" : "#fff", flexShrink: 0, transition: "all 0.2s" }}>
              {net.connected ? "Conectado" : "Conectar"}
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <button onClick={onDone} style={{ width: "100%", height: 54, borderRadius: 27, background: GB, border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 28px rgba(157,92,245,0.28)" }}>Empezar a usar Versyo →</button>
        <button onClick={onDone} style={{ width: "100%", marginTop: 10, padding: "10px 0", background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 13, cursor: "pointer" }}>Omitir por ahora</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   EDIT PROFILE MODAL
═══════════════════════════════════════════ */
function EditProfileModal({ onClose }) {
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => { setSaved(false); onClose(); }, 1200); };
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.76)", zIndex: 60, display: "flex", alignItems: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", boxSizing: "border-box", background: "rgba(7,7,22,0.99)", borderRadius: "24px 24px 0 0", borderTop: "1px solid rgba(255,255,255,0.2)", padding: "22px 18px 32px", maxHeight: "85%", overflowY: "auto" }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)", margin: "0 auto 18px" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#fff" }}>Editar perfil</div>
          <CloseBtn onClick={onClose} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 24 }}>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: "linear-gradient(135deg,#9d5cf5,#f5385a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "#fff" }}>TU</div>
            <div style={{ position: "absolute", bottom: -4, right: -4, width: 26, height: 26, borderRadius: "50%", background: GB, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #07071a" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
            </div>
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: "rgba(157,92,245,0.8)", cursor: "pointer" }}>Cambiar foto de perfil</div>
        </div>
        {[["Nombre", "Tu nombre"], ["Bio", "Biometría verificada · GDPR"]].map(([label, ph]) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 7 }}>{label}</div>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "13px 15px" }}>
              <input placeholder={ph} style={{ width: "100%", background: "none", border: "none", outline: "none", fontSize: 14, color: "#fff", caretColor: "#9d5cf5" }} />
            </div>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 14, padding: "12px 14px", marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(52,211,153,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#34d399" }}>Biometría verificada</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)" }}>Hash vectorial · No se almacena imagen</div>
          </div>
        </div>
        <button onClick={save} style={{ width: "100%", height: 52, borderRadius: 26, background: saved ? "rgba(52,211,153,0.18)" : GB, border: saved ? "1px solid rgba(52,211,153,0.4)" : "none", color: saved ? "#34d399" : "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.3s" }}>
          {saved ? "✓ Guardado" : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   GOLD MODAL
═══════════════════════════════════════════ */
function GoldModal({ onClose }) {
  const GOLDG = "linear-gradient(135deg,#f5c518,#ffaa00,#ff6b35)";
  return (
    <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.76)", zIndex: 60, display: "flex", alignItems: "flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", boxSizing: "border-box", background: "rgba(7,7,22,0.99)", borderRadius: "24px 24px 0 0", borderTop: "1px solid rgba(245,197,24,0.35)", padding: "22px 18px 32px", maxHeight: "82%", overflowY: "auto" }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)", margin: "0 auto 18px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: GOLDG, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 20px rgba(245,197,24,0.35)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.3"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>Versyo Gold</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
          {["Reconocimientos ilimitados", "Perfiles eventuales ilimitados", "Gestión de perfiles ilimitados", "Acceso a funciones AR"].map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(245,197,24,0.12)", border: "1px solid rgba(245,197,24,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f5c518" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{f}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(245,197,24,0.07)", border: "1px solid rgba(245,197,24,0.2)", borderRadius: 16, padding: "16px 18px", marginBottom: 18, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
            <span style={{ fontSize: 34, fontWeight: 800, color: "#fff" }}>4,99€</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}> /mes</span>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", marginTop: 4 }}>Cancela cuando quieras · Sin permanencia</div>
        </div>
        <button style={{ width: "100%", height: 52, borderRadius: 26, background: GOLDG, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Activar Versyo Gold →</button>
        <button onClick={onClose} style={{ width: "100%", marginTop: 10, padding: 10, border: "none", background: "none", color: "rgba(255,255,255,0.3)", fontSize: 13, cursor: "pointer" }}>Ahora no</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BUSCAR SCREEN
   handleScan limpia todo (query, selectedPerson, fase)
   — funciona tanto desde lupa central como desde NavBar
═══════════════════════════════════════════ */
function BuscarScreen({ mode, onReset, onGoProfile }) {
  const [phase, setPhase] = useState("idle");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [query, setQuery] = useState("");
  const [qFocus, setQFocus] = useState(false);
  const scanRef = useRef(null);

  const results = query.length > 0
    ? FAMOUS_DB.filter(x => x.n.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : qFocus ? FAMOUS_DB.slice(0, 6) : [];

  // Limpia pantalla completa + lanza escaneo
  // Llamado tanto desde la lupa central como desde NavBar al retomar el tab
  const handleScan = () => {
    setQuery("");
    setSelectedPerson(null);
    setQFocus(false);
    if (mode === "invisible") {
      setPhase("invwarn");
      setTimeout(() => setPhase(p => p === "invwarn" ? "idle" : p), 4000);
      return;
    }
    if (phase === "found") { setPhase("idle"); return; }
    if (phase === "scanning") return;
    setPhase("scanning");
    clearTimeout(scanRef.current);
    scanRef.current = setTimeout(() => setPhase("found"), 2600);
  };

  const handleClose = () => { setPhase("idle"); setSelectedPerson(null); };
  useEffect(() => () => clearTimeout(scanRef.current), []);

  const lauraData = { n: "Laura Gómez", role: "CMO · Web3 & Fintech", img: FACE_IMG, fw: "82.4K", nets: ["linkedin", "instagram", "tiktok"], isFamous: false };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <PageHeader title="Buscar" onReset={onReset} />
      {/* Cámara */}
      <div onClick={() => { if (phase === "idle" && !selectedPerson && !qFocus) handleScan(); }} style={{ flex: 1, position: "relative", overflow: "hidden", cursor: (phase === "found" || phase === "invwarn" || selectedPerson || qFocus) ? "default" : "crosshair" }}>
        <img src={CROWD_IMG} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.32) blur(1px)" }} onError={e => e.target.style.display = "none"} />
        {(phase === "scanning" || phase === "found") && (
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-58%)", width: 190, height: 190, overflow: "hidden", zIndex: 3, borderRadius: 6 }}>
            <img src={FACE_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          </div>
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(3,3,12,0.55) 0%,rgba(3,3,12,0.05) 35%,rgba(3,3,12,0.05) 65%,rgba(3,3,12,0.75) 100%)", zIndex: 2 }} />
        {mode !== "invisible" && (
          <div style={{ position: "absolute", top: 10, right: 14, display: "flex", alignItems: "center", gap: 4, zIndex: 12 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 5px #34d399" }} />
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>UWB</span>
          </div>
        )}
        {/* Frase centrada verticalmente */}
        {(phase === "idle" || phase === "scanning") && !qFocus && !query && !selectedPerson && (
          <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", zIndex: 10, pointerEvents: "none" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)", textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>Enfoca a la persona</div>
            {phase === "scanning" && <div style={{ marginTop: 6, fontSize: 10, color: "rgba(255,255,255,0.6)" }}>Escaneando...</div>}
          </div>
        )}
        {/* Search bar */}
        <div style={{ position: "absolute", top: 10, left: 12, right: 12, zIndex: 25 }} onClick={e => e.stopPropagation()}>
          <div style={{ background: "rgba(4,4,20,0.9)", border: `1px solid ${qFocus ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.14)"}`, borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, backdropFilter: "blur(20px)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input value={query} onChange={e => { setQuery(e.target.value); setSelectedPerson(null); }} onFocus={() => setQFocus(true)} onBlur={() => setTimeout(() => setQFocus(false), 200)}
              placeholder="Buscar perfiles verificados..." style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 13, color: "#fff", caretColor: "#9d5cf5", minWidth: 0 }} />
            {query && <button onClick={() => { setQuery(""); setSelectedPerson(null); }} style={{ color: "rgba(255,255,255,0.4)", fontSize: 18, background: "none", border: "none", cursor: "pointer", padding: 0 }}>×</button>}
          </div>
          {results.length > 0 && !selectedPerson && (
            <div style={{ marginTop: 4, background: "rgba(4,4,22,0.98)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, overflow: "hidden", backdropFilter: "blur(20px)", maxHeight: 260, overflowY: "auto" }}>
              {!query && <div style={{ padding: "8px 14px 4px", fontSize: 10, fontWeight: 600, color: "rgba(157,92,245,0.8)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Perfiles destacados</div>}
              {results.map((r, i) => (
                <div key={r.id} onClick={() => { setQuery(r.n); setQFocus(false); setSelectedPerson(r); }}
                  style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 14px", cursor: "pointer", borderBottom: i < results.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: r.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{r.n[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{r.n}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24"><path fill="#3b82f6" d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{r.h} · {r.fw} seguidores</div>
                  </div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", flexShrink: 0, maxWidth: 80, textAlign: "right" }}>{r.role}</div>
                </div>
              ))}
              <div style={{ padding: "6px 14px 8px", background: "rgba(157,92,245,0.06)", borderTop: "1px solid rgba(157,92,245,0.12)" }}>
                <span style={{ fontSize: 9, color: "#9d5cf5" }}>✓ Solo perfiles verificados Versyo</span>
              </div>
            </div>
          )}
        </div>
        <ScanFrame phase={phase} />
        {phase === "found" && <ProfileCard person={lauraData} onClose={handleClose} />}
        {selectedPerson && <ProfileCard person={selectedPerson} onClose={() => setSelectedPerson(null)} />}
        {phase === "invwarn" && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "calc(100% - 32px)", zIndex: 20 }} onClick={e => e.stopPropagation()}>
            <div onClick={onGoProfile} style={{ background: "rgba(4,4,20,0.95)", border: "1px solid rgba(245,56,90,0.5)", borderRadius: 18, padding: "22px 18px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Modo Invisible activo</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.72)", lineHeight: 1.65, marginBottom: 14 }}>Cambia a un modo activo para poder realizar búsquedas.</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: GB, borderRadius: 20, padding: "8px 18px" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Ir a Mi Versyon →</span>
              </div>
            </div>
          </div>
        )}
        <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", zIndex: 9, whiteSpace: "nowrap", pointerEvents: "none" }}>
          <div style={{ background: "rgba(0,0,0,0.65)", borderRadius: 20, padding: "5px 14px" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.88)" }}>
              {phase === "idle" ? "Buscando perfiles cercanos" : phase === "scanning" ? "Identificando..." : phase === "found" ? "Perfil identificado" : ""}
            </span>
          </div>
        </div>
      </div>
      {/* Lupa central — también limpia y escanea */}
      <div style={{ background: "rgba(3,3,12,0.98)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "11px 20px 13px", display: "flex", justifyContent: "center", flexShrink: 0 }}>
        <button onClick={handleScan} style={{ width: 70, height: 70, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.9)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: phase === "scanning" ? "0 0 0 10px rgba(0,220,200,0.1)" : "none", transition: "box-shadow 0.4s" }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", background: phase === "scanning" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.94)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.25s" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={phase === "scanning" ? "rgba(15,15,35,0.5)" : "#0d0d1f"} strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </div>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MENSAJES SCREEN
═══════════════════════════════════════════ */
function MensajesScreen({ onReset }) {
  const [open, setOpen] = useState(null);
  const cv = CONVOS.find(c => c.id === open);
  const total = CONVOS.reduce((s, c) => s + c.u, 0);

  if (open !== null && cv) return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 12, flexShrink: 0, background: "rgba(3,3,12,0.95)" }}>
        <button onClick={() => setOpen(null)} style={{ color: "#3b82f6", fontSize: 15, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}>← Atrás</button>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: cv.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{cv.ini}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{cv.n}</div>
          <div style={{ fontSize: 11, color: cv.on ? "#34d399" : "rgba(255,255,255,0.35)" }}>{cv.on ? "En línea" : "Desconectado"}</div>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "14px 13px", display: "flex", flexDirection: "column", gap: 9 }}>
        <div style={{ textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Conectados a través de Versyo · Hoy</div>
        {CHAT_MESSAGES.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.me ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "74%", background: m.me ? GB : "rgba(255,255,255,0.09)", border: m.me ? "none" : "1px solid rgba(255,255,255,0.1)", borderRadius: m.me ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "10px 13px" }}>
              <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.5 }}>{m.t}</div>
              <div style={{ fontSize: 9, color: `rgba(255,255,255,${m.me ? 0.5 : 0.3})`, marginTop: 3, textAlign: "right" }}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "10px 13px", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: 8, flexShrink: 0, background: "rgba(3,3,12,0.95)" }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 22, padding: "10px 14px", fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Escribe un mensaje...</div>
        <button style={{ width: 40, height: 40, borderRadius: "50%", background: GB, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "4px 15px 14px" }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 11 }}>
        {CONVOS.length} conversaciones{total > 0 ? ` · ${total} sin leer` : ""}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, overflow: "hidden" }}>
        {CONVOS.map((c, i) => (
          <div key={c.id} onClick={() => setOpen(c.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", cursor: "pointer", borderBottom: i < CONVOS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", background: c.col, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#fff" }}>{c.ini}</div>
              <div style={{ position: "absolute", bottom: 1, right: 1, width: 12, height: 12, borderRadius: "50%", background: c.on ? "#34d399" : "rgba(255,255,255,0.18)", border: "2px solid #03030c" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: c.u ? 700 : 500, color: "#fff", marginBottom: 2 }}>{c.n}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.pre}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 5 }}>{c.t}</div>
              {c.u > 0 && <div style={{ width: 20, height: 20, borderRadius: "50%", background: GB, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>{c.u}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PERFIL / MI VERSYON
═══════════════════════════════════════════ */
function ProfileScreen({ mode, onModeChange, onReset }) {
  const [goldModal, setGoldModal] = useState(false);
  const [netModal, setNetModal] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [adhoc, setAdhoc] = useState({ photo: false, video: false, status: "De fiesta con amigos 🎉" });

  const MODES = [
    { id: "invisible", label: "Invisible",        desc: "No te ven · No puedes buscar",             col: "rgba(255,255,255,0.3)", bg: "rgba(255,255,255,0.04)" },
    { id: "pro",       label: "Profesional",       desc: "LinkedIn · Twitter",                        col: "#3b82f6",               bg: "rgba(59,130,246,0.11)"  },
    { id: "ocio",      label: "Ocio",              desc: "Instagram · TikTok · Facebook · Tinder",   col: "#f5385a",               bg: "rgba(245,56,90,0.11)"   },
    { id: "adhoc",     label: "Ad-Hoc (Personal)", desc: "Tu perfil propio Versyo · Sin redes ext.", col: "#34d399",               bg: "rgba(52,211,153,0.1)"   },
  ];
  const activeMode = MODES.find(m => m.id === mode);
  const shownNets = mode === "pro" ? NETS_PRO : mode === "ocio" ? NETS_OCIO : [];

  return (
    <div style={{ flex: 1, overflow: "auto", paddingBottom: 8, position: "relative" }}>

      {/* Gold banner */}
      <div onClick={() => setGoldModal(true)} style={{ margin: "2px 14px 14px", background: "linear-gradient(135deg,rgba(245,197,24,0.13),rgba(255,107,53,0.1))", border: "1px solid rgba(245,197,24,0.3)", borderRadius: 18, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
        <div style={{ width: 36, height: 36, borderRadius: 11, background: "linear-gradient(135deg,#f5c518,#ff6b35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", flex: 1 }}>Pásate a Versyo Gold</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(245,197,24,0.7)" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
      </div>

      {/* User card clicable → editar */}
      <div onClick={() => setEditModal(true)} style={{ margin: "0 14px 16px", background: "linear-gradient(135deg,rgba(157,92,245,0.16),rgba(245,56,90,0.1))", border: "1px solid rgba(157,92,245,0.24)", borderRadius: 20, padding: 16, cursor: "pointer", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 10, right: 12, display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "4px 9px" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Editar</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg,#9d5cf5,#f5385a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#fff", border: "2px solid rgba(157,92,245,0.4)" }}>TU</div>
            <div style={{ position: "absolute", bottom: -1, right: -1, width: 15, height: 15, borderRadius: "50%", background: "#34d399", border: "2.5px solid #03030c" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Tu perfil Versyo</span>
              <div style={{ background: GB, borderRadius: 20, padding: "2px 8px" }}><span style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>FREE</span></div>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginBottom: 6 }}>Biometría verificada · GDPR</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#34d399" }} />
              <span style={{ fontSize: 10, color: "#34d399", fontWeight: 500 }}>Modo: {activeMode?.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 modos */}
      <div style={{ padding: "0 14px", marginBottom: 18 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Mi Versyon — Modo activo</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginBottom: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 11, padding: "8px 12px", lineHeight: 1.6 }}>
          Solo <strong style={{ color: "#fff" }}>un modo activo</strong> a la vez.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {MODES.map(v => {
            const on = mode === v.id;
            return (
              <div key={v.id} onClick={() => onModeChange(v.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 13px", borderRadius: 15, background: on ? v.bg : "rgba(255,255,255,0.03)", border: `1.5px solid ${on ? v.col : "rgba(255,255,255,0.08)"}`, cursor: "pointer", transition: "all 0.2s" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: on ? "#fff" : "rgba(255,255,255,0.55)", marginBottom: 2 }}>{v.label}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", lineHeight: 1.4 }}>{v.desc}</div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${on ? v.col : "rgba(255,255,255,0.22)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {on && <div style={{ width: 10, height: 10, borderRadius: "50%", background: v.col }} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ad-Hoc */}
      {mode === "adhoc" && (
        <div style={{ padding: "0 14px", marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 9 }}>Perfil ad-hoc para este evento</div>
          <div style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.22)", borderRadius: 18, padding: 15, display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>Estado</div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 13px", fontSize: 13, color: "#fff" }}>{adhoc.status}</div>
              <div style={{ marginTop: 6, display: "flex", gap: 5, flexWrap: "wrap" }}>
                {["De fiesta 🎉", "Networking 💼", "En un festival 🎵", "Conociendo gente 👋"].map(s => (
                  <span key={s} onClick={() => setAdhoc(a => ({ ...a, status: s }))} style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", borderRadius: 20, padding: "3px 10px", fontSize: 10, color: "#34d399", cursor: "pointer" }}>{s}</span>
                ))}
              </div>
            </div>
            {[{ k: "photo", label: "Foto" }, { k: "video", label: "Video (30s)" }].map(({ k, label }) => (
              <div key={k}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</div>
                <div onClick={() => setAdhoc(a => ({ ...a, [k]: true }))} style={{ height: 64, background: "rgba(255,255,255,0.04)", border: "1.5px dashed rgba(52,211,153,0.35)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
                  <span style={{ fontSize: 12, color: "rgba(52,211,153,0.7)" }}>{adhoc[k] ? `${label} añadido ✓` : `Subir ${label.toLowerCase()}`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hub digital */}
      {shownNets.length > 0 && (
        <div style={{ padding: "0 14px", marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 9 }}>
            {mode === "pro" ? "Redes conectadas a tu perfil profesional" : "Redes conectadas a tu perfil de ocio"}
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: "15px 13px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "13px 6px", justifyItems: "center" }}>
              {shownNets.map(key => {
                const n = NET_INFO[key];
                return (
                  <div key={key} onClick={() => setNetModal(key)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer" }}>
                    <div style={{ width: 50, height: 50, borderRadius: 13, background: n.bg, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <NetSVG net={key} size={26} />
                    </div>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", textAlign: "center" }}>{n.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Reset */}
      <div style={{ padding: "0 14px", marginBottom: 6 }}>
        <button onClick={onReset} style={{ width: "100%", padding: 11, borderRadius: 13, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.4)", fontSize: 11, cursor: "pointer", letterSpacing: "0.04em" }}>
          ↺ Reiniciar Demo
        </button>
      </div>

      {goldModal && <GoldModal onClose={() => setGoldModal(false)} />}

      {netModal && (() => {
        const n = NET_INFO[netModal];
        return (
          <div onClick={() => setNetModal(null)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 60, display: "flex", alignItems: "flex-end" }}>
            <div onClick={e => e.stopPropagation()} style={{ width: "100%", boxSizing: "border-box", background: "rgba(7,7,22,0.99)", borderRadius: "24px 24px 0 0", borderTop: "1px solid rgba(255,255,255,0.2)", padding: "22px 18px 28px" }}>
              <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.2)", margin: "0 auto 18px" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: n.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <NetSVG net={netModal} size={26} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{n.label}</div>
                  <div style={{ fontSize: 11, color: "#9d5cf5" }}>Identidad verificada Versyo</div>
                </div>
              </div>
              <div style={{ background: "rgba(157,92,245,0.08)", border: "1px solid rgba(157,92,245,0.22)", borderRadius: 14, padding: "14px 15px", marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", lineHeight: 1.65 }}>
                  <strong style={{ color: "#fff" }}>Versyo está lanzando tu identidad verificada en {n.label}...</strong><br /><br />
                  Tu audiencia te encontrará aquí primero. Sin cuentas falsas. Sin fricción.
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 13px", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.22)", borderRadius: 12, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399", flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "#34d399" }}>Perfil verificado y activo en Versyo</span>
              </div>
              <button style={{ width: "100%", height: 48, borderRadius: 24, background: GB, border: "none", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Abrir {n.label} verificado →</button>
              <button onClick={() => setNetModal(null)} style={{ width: "100%", marginTop: 10, padding: 10, border: "none", background: "none", color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer" }}>Cerrar</button>
            </div>
          </div>
        );
      })()}

      {editModal && <EditProfileModal onClose={() => setEditModal(false)} />}
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════ */
export default function VersyoApp() {
  const [screen, setScreen] = useState("ob");
  const [tab, setTab] = useState("finder");
  const [mode, setMode] = useState("pro");

  const totalUnread = CONVOS.reduce((s, c) => s + c.u, 0);
  const reset = () => { setScreen("ob"); setTab("finder"); setMode("pro"); };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "18px 8px 22px", fontFamily: "-apple-system,'SF Pro Display',BlinkMacSystemFont,sans-serif", color: "#fff" }}>
      <div style={{ width: 364, height: 782, background: BG, borderRadius: 48, border: "8px solid #0c0c1e", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
        <StatusBar />
        {screen === "ob"          && <OnboardingScreen onDone={() => setScreen("auth")} />}
        {screen === "auth"        && <AuthGateScreen onLogin={() => setScreen("login")} onRegister={() => setScreen("reg_consent")} />}
        {screen === "login"       && <LoginScreen onBack={() => setScreen("auth")} onDone={() => { setScreen("app"); setTab("finder"); }} />}
        {screen === "reg_consent" && <RegisterConsentScreen onBack={() => setScreen("auth")} onAccept={() => setScreen("reg_face")} />}
        {screen === "reg_face"    && <RegisterFaceScreen onBack={() => setScreen("reg_consent")} onDone={() => setScreen("reg_nets")} />}
        {screen === "reg_nets"    && <RegisterNetworksScreen onBack={() => setScreen("reg_face")} onDone={() => { setScreen("app"); setTab("finder"); }} />}
        {screen === "app" && (
          <>
            {tab === "chat"    && <PageHeader title="Mensajes" onReset={reset} />}
            {tab === "profile" && <PageHeader title="Mi Versyon" onReset={reset} />}
            {tab === "finder"  && <BuscarScreen mode={mode} onReset={reset} onGoProfile={() => setTab("profile")} />}
            {tab === "chat"    && <MensajesScreen onReset={reset} />}
            {tab === "profile" && <ProfileScreen mode={mode} onModeChange={setMode} onReset={reset} />}
            <NavBar tab={tab} onTab={setTab} unread={totalUnread} />
          </>
        )}
      </div>
    </div>
  );
}
