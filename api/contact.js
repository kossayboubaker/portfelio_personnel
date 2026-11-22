/**
 * /api/contact.js
 * Vercel Node.js Serverless Function — Gmail SMTP via Nodemailer
 *
 * Environment variables required (set in Vercel Dashboard):
 *   SMTP_USER      — Gmail address used to send (kossayboubaker45@gmail.com)
 *   SMTP_PASSWORD  — Gmail App Password (16 chars, NO spaces)
 *   CONTACT_EMAIL  — Recipient address (kossayboubaker45@gmail.com)
 *
 * NOT for Edge Runtime. Node.js runtime only.
 */

'use strict';

const nodemailer = require('nodemailer');

// ─── Rate limiting (per-instance in-memory; good enough for serverless cold starts)
// For production at scale use Upstash Redis; this covers typical portfolio traffic.
const ipTimestamps = new Map(); // ip -> [timestamps]
const RATE_LIMIT_MAX = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip) {
    const now = Date.now();
    const times = (ipTimestamps.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
    if (times.length >= RATE_LIMIT_MAX) return true;
    times.push(now);
    ipTimestamps.set(ip, times);
    return false;
}

// ─── Duplicate guard (email+subject hash, 5 min TTL)
const recentHashes = new Map(); // hash -> expiry timestamp

function isDuplicate(hash) {
    const now = Date.now();
    if (recentHashes.has(hash) && recentHashes.get(hash) > now) return true;
    recentHashes.set(hash, now + 5 * 60 * 1000);
    return false;
}

// ─── Helpers
const sanitize = (val, max = 500) =>
    String(val || '').trim().replace(/<[^>]*>/g, '').substring(0, max);

const isValidEmail = (e) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(e || ''));

// ─── Professional HTML email template
function buildHtml({ name, email, company, subject, message }) {
    const now = new Date().toLocaleString('fr-FR', {
        timeZone: 'Africa/Tunis',
        dateStyle: 'full',
        timeStyle: 'short',
    });
    const msgHtml = message.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
    return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0d1117}
.w{max-width:620px;margin:0 auto;background:#0d1117}
.hd{background:linear-gradient(135deg,#4f46e5 0%,#0ea5e9 100%);padding:36px 40px;border-radius:12px 12px 0 0}
.badge{display:inline-block;background:rgba(255,255,255,.18);color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:20px;margin-bottom:14px;letter-spacing:1px}
.hd h1{color:#fff;font-size:22px;font-weight:800;margin-bottom:5px}
.hd p{color:rgba(255,255,255,.75);font-size:13px}
.bd{background:#161b22;padding:32px 40px;border-radius:0 0 12px 12px}
.row{display:flex;gap:16px;margin-bottom:16px}
.f{flex:1;background:#0d1117;border-radius:8px;padding:14px 16px;border:1px solid #30363d;min-width:0}
.lbl{font-size:10px;font-weight:700;color:#8b949e;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px}
.val{font-size:15px;color:#e6edf3;word-break:break-all}
.val a{color:#38bdf8;text-decoration:none}
.div{height:1px;background:#30363d;margin:20px 0}
.msg-box{background:#0d1117;border-radius:8px;padding:20px;border:1px solid #30363d}
.msg-text{font-size:15px;color:#e6edf3;line-height:1.75}
.foot{margin-top:28px;text-align:center;font-size:12px;color:#484f58;line-height:2}
.foot a{color:#38bdf8}
</style></head>
<body><div class="w">
<div class="hd">
  <div class="badge">📬 NOUVEAU MESSAGE PORTFOLIO</div>
  <h1>Message de ${name}</h1>
  <p>${now} — via le formulaire de contact</p>
</div>
<div class="bd">
  <div class="row">
    <div class="f"><div class="lbl">👤 Nom complet</div><div class="val">${name}</div></div>
    <div class="f"><div class="lbl">📧 Email</div><div class="val"><a href="mailto:${email}">${email}</a></div></div>
  </div>
  <div class="row">
    <div class="f"><div class="lbl">🏢 Entreprise</div><div class="val">${company || '<span style="color:#484f58;font-style:italic">Non renseignée</span>'}</div></div>
    <div class="f"><div class="lbl">📌 Objet</div><div class="val">${subject}</div></div>
  </div>
  <div class="div"></div>
  <div class="lbl" style="margin-bottom:12px">💬 Message</div>
  <div class="msg-box"><p class="msg-text">${msgHtml}</p></div>
  <div class="foot">
    <p>Répondre directement à <a href="mailto:${email}">${email}</a></p>
    <p>Reçu via <strong style="color:#a5b4fc">Portfolio — Kossay Boubaker</strong></p>
  </div>
</div>
</div></body></html>`;
}

// ─── Main handler
module.exports = async function handler(req, res) {
    // Only POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    // CORS headers (adjust origin in production)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // ── Rate limiting
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
    if (isRateLimited(ip)) {
        return res.status(429).json({ error: 'Trop de messages envoyés. Réessayez dans 15 minutes.' });
    }

    // ── Honeypot
    if (req.body?.website) {
        return res.status(200).json({ success: true }); // silent bot trap
    }

    // ── Sanitize
    const name    = sanitize(req.body?.name, 100);
    const email   = sanitize(req.body?.email, 100);
    const company = sanitize(req.body?.company, 100);
    const subject = sanitize(req.body?.subject, 200);
    const message = sanitize(req.body?.message, 2000);

    // ── Server-side validation
    const errors = [];
    if (!name || name.length < 2)        errors.push('Nom invalide (min 2 caractères).');
    if (!isValidEmail(email))            errors.push('Adresse email invalide.');
    if (!subject || subject.length < 3)  errors.push('Objet trop court (min 3 caractères).');
    if (!message || message.length < 10) errors.push('Message trop court (min 10 caractères).');
    if (message.length > 2000)           errors.push('Message trop long (max 2000 caractères).');

    if (errors.length) {
        return res.status(400).json({ error: errors.join(' ') });
    }

    // ── Duplicate guard
    const hash = `${email}|${subject}|${message.substring(0,50)}`.toLowerCase();
    if (isDuplicate(hash)) {
        return res.status(429).json({ error: 'Message identique déjà envoyé récemment.' });
    }

    // ── Credentials (server-side only, never exposed to client)
    const smtpUser     = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const contactEmail = process.env.CONTACT_EMAIL || 'kossayboubaker45@gmail.com';

    if (!smtpUser || !smtpPassword) {
        console.error('[Contact] SMTP credentials missing in environment variables.');
        return res.status(503).json({ error: 'Service email non configuré. Contactez directement kossayboubaker45@gmail.com.' });
    }

    // ── Nodemailer transporter — Gmail SSL/TLS port 465
    const transporter = nodemailer.createTransport({
        host:   'smtp.gmail.com',
        port:   465,
        secure: true,          // SSL/TLS
        auth: {
            user: smtpUser,
            pass: smtpPassword,
        },
        tls: {
            rejectUnauthorized: true,
        },
    });

    // ── Send email (fully awaited before response)
    try {
        const info = await transporter.sendMail({
            from:    `"Portfolio Kossay" <${smtpUser}>`,
            to:      contactEmail,
            replyTo: email,
            subject: `[Portfolio Contact] - ${subject}`,
            html:    buildHtml({ name, email, company, subject, message }),
            text:    `Nom: ${name}\nEmail: ${email}\nEntreprise: ${company || 'N/A'}\nObjet: ${subject}\n\nMessage:\n${message}`,
        });

        console.log(`[Contact] ✓ Email envoyé — messageId:${info.messageId} — de:${email}`);
        return res.status(200).json({ success: true });

    } catch (err) {
        // Log error without exposing password
        const safeErr = err.message?.replace(smtpPassword, '***') || 'Unknown error';
        console.error('[Contact] SMTP error:', safeErr);

        if (err.code === 'EAUTH') {
            return res.status(502).json({ error: 'Échec d\'authentification SMTP. Vérifiez la configuration.' });
        }
        return res.status(502).json({ error: 'Échec d\'envoi email. Contactez directement kossayboubaker45@gmail.com.' });
    }
};

