/**
 * server.js — Portfolio Contact Email Server
 * Stack: Express + Resend API
 * Recipient: kossayboubaker45@gmail.com
 */

'use strict';

require('dotenv').config();
const express    = require('express');
const { Resend } = require('resend');
const rateLimit  = require('express-rate-limit');
const path       = require('path');

const app  = express();
const PORT = process.env.PORT || 3001;

// ─── Resend client ───────────────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// CORS
app.use((req, res, next) => {
    const origin = process.env.ALLOWED_ORIGIN || '*';
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// Serve portfolio static files
app.use(express.static(path.join(__dirname)));

// ─── Rate limit: 5 submissions / IP / 15 min ────────────────────────────────
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Trop de messages envoyés. Réessayez dans 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// ─── Duplicate submission guard (in-memory, 5 min TTL) ──────────────────────
const recentHashes = new Set();

// ─── Helpers ─────────────────────────────────────────────────────────────────
const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
const sanitize = (s, max = 500) =>
    String(s || '').trim().replace(/<[^>]*>/g, '').substring(0, max);

// ─── Professional HTML email template ────────────────────────────────────────
function buildEmailHtml({ name, email, company, subject, message }) {
    const now = new Date().toLocaleString('fr-TN', {
        timeZone: 'Africa/Tunis',
        dateStyle: 'full',
        timeStyle: 'short',
    });
    return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0d1117;padding:24px}
.w{max-width:620px;margin:0 auto}
.h{background:linear-gradient(135deg,#4f46e5,#0ea5e9);padding:36px 40px;border-radius:12px 12px 0 0}
.h-badge{display:inline-block;background:rgba(255,255,255,.15);color:#fff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:12px;letter-spacing:.8px}
.h h1{color:#fff;font-size:22px;font-weight:800;margin-bottom:4px}
.h p{color:rgba(255,255,255,.75);font-size:13px}
.b{background:#161b22;padding:32px 40px;border-radius:0 0 12px 12px}
.row{display:flex;gap:16px;margin-bottom:16px}
.f{flex:1;background:#0d1117;border-radius:8px;padding:14px 16px;border:1px solid #30363d}
.lbl{font-size:10px;font-weight:700;color:#8b949e;text-transform:uppercase;letter-spacing:.8px;margin-bottom:6px}
.val{font-size:15px;color:#e6edf3;word-break:break-all}
.val a{color:#38bdf8;text-decoration:none}
.msg{background:#0d1117;border-radius:8px;padding:20px;border:1px solid #30363d;margin-top:4px}
.msg-text{font-size:15px;color:#e6edf3;line-height:1.75;white-space:pre-wrap}
.footer{margin-top:28px;text-align:center;font-size:12px;color:#484f58;line-height:1.9}
.footer a{color:#38bdf8}
.divider{height:1px;background:#30363d;margin:24px 0}
</style></head>
<body><div class="w">
<div class="h">
  <div class="h-badge">📬 NOUVEAU MESSAGE PORTFOLIO</div>
  <h1>Message de ${name}</h1>
  <p>${now} — via le formulaire de contact</p>
</div>
<div class="b">
  <div class="row">
    <div class="f"><div class="lbl">👤 Nom complet</div><div class="val">${name}</div></div>
    <div class="f"><div class="lbl">📧 Email</div><div class="val"><a href="mailto:${email}">${email}</a></div></div>
  </div>
  <div class="row">
    <div class="f"><div class="lbl">🏢 Entreprise</div><div class="val">${company || '<span style="color:#484f58;font-style:italic">Non renseignée</span>'}</div></div>
    <div class="f"><div class="lbl">📌 Objet</div><div class="val">${subject}</div></div>
  </div>
  <div class="divider"></div>
  <div class="lbl" style="margin-bottom:12px">💬 Message complet</div>
  <div class="msg"><p class="msg-text">${message.replace(/\n/g, '<br>')}</p></div>
  <div class="footer">
    <p>Répondre directement à <a href="mailto:${email}">${email}</a></p>
    <p>Reçu via <strong style="color:#a5b4fc">kossay-portfolio.dev</strong> — Kossay Boubaker</p>
  </div>
</div>
</div></body></html>`;
}

// ─── POST /api/contact ────────────────────────────────────────────────────────
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        // Honeypot anti-spam (hidden field "website" must be empty)
        if (req.body.website) {
            return res.status(200).json({ success: true }); // silent bot trap
        }

        // Sanitize inputs
        const name    = sanitize(req.body.name, 100);
        const email   = sanitize(req.body.email, 100);
        const company = sanitize(req.body.company, 100);
        const subject = sanitize(req.body.subject, 200);
        const message = sanitize(req.body.message, 2000);

        // Server-side validation
        const errors = [];
        if (!name || name.length < 2)        errors.push('Nom invalide (min 2 caractères).');
        if (!isValidEmail(email))             errors.push('Adresse email invalide.');
        if (!subject || subject.length < 3)   errors.push('Objet trop court (min 3 caractères).');
        if (!message || message.length < 10)  errors.push('Message trop court (min 10 caractères).');

        if (errors.length) {
            return res.status(400).json({ error: errors.join(' ') });
        }

        // Duplicate guard
        const hash = `${email}|${subject}|${message}`.toLowerCase();
        if (recentHashes.has(hash)) {
            return res.status(429).json({ error: 'Message identique déjà envoyé récemment.' });
        }
        recentHashes.add(hash);
        setTimeout(() => recentHashes.delete(hash), 5 * 60 * 1000);

        // Send via Resend
        const { data, error: sendError } = await resend.emails.send({
            from:    process.env.EMAIL_FROM    || 'onboarding@resend.dev',
            to:      [process.env.CONTACT_EMAIL || 'kossayboubaker45@gmail.com'],
            replyTo: email,
            subject: `[Portfolio Contact] - ${subject}`,
            html:    buildEmailHtml({ name, email, company, subject, message }),
        });

        if (sendError) {
            console.error('[Contact] Resend error:', JSON.stringify(sendError));
            return res.status(502).json({
                error: "Échec d'envoi email. Contactez directement kossayboubaker45@gmail.com.",
            });
        }

        console.log(`[Contact] ✓ Email envoyé — id:${data?.id} — de:${email} — sujet:"${subject}"`);
        return res.status(200).json({ success: true });

    } catch (err) {
        console.error('[Contact] Erreur inattendue:', err.message);
        return res.status(500).json({ error: 'Erreur serveur. Réessayez ou contactez directement kossayboubaker45@gmail.com.' });
    }
});

// ─── Fallback: serve index.html for all GET routes ────────────────────────────
app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 Portfolio Contact Server: http://localhost:${PORT}`);
    console.log(`   CONTACT_EMAIL : ${process.env.CONTACT_EMAIL}`);
    console.log(`   EMAIL_FROM    : ${process.env.EMAIL_FROM}`);
    console.log(`   RESEND_KEY    : ${process.env.RESEND_API_KEY ? '✓ configuré' : '⚠ MANQUANT'}\n`);
});
