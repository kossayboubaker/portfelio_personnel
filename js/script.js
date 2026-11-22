/**
 * Main Application Logic & UI Interactions
 * Portfolio Kossay Boubaker
 * Orchestration des données, interactions 3D, filtres, modal, vidéos démo et chatbot intelligent.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialisation des composants UI
    initNavigation();
    initScrollProgress();
    initCustomCursor();
    initTheme();
    initRoleTyping();
    initStatsCounter();

    // 2. Rendu dynamique des données extraites du CV
    if (typeof PORTFOLIO_DATA !== 'undefined') {
        renderSkills(PORTFOLIO_DATA.skills);
        renderExperiences(PORTFOLIO_DATA.experiences);
        renderProjects(PORTFOLIO_DATA.projects);
        renderEducation(PORTFOLIO_DATA.education);
        renderCertifications(PORTFOLIO_DATA.certifications);
    }

    // 3. Modules interactifs
    initProjectModal();
    initContactForm();
    initChatbot();
    initBackToTop();
});

/* ==========================================================================
   1. NAVIGATION & SCROLL
   ========================================================================== */

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = navToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });
}

/* ==========================================================================
   2. CURSEUR 3D INTERACTIF
   ========================================================================== */

function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const follower = document.getElementById('cursorFollower');
    if (!cursor || !follower) return;

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function renderFollower() {
        posX += (mouseX - posX) * 0.15;
        posY += (mouseY - posY) * 0.15;
        follower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        requestAnimationFrame(renderFollower);
    }
    renderFollower();

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card-3d, .skill-pill, .floating-badge');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => follower.classList.remove('cursor-hover'));
    });
}

/* ==========================================================================
   3. GESTION DU THÈME (DARK / LIGHT)
   ========================================================================== */

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('kb-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('kb-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

/* ==========================================================================
   4. TYPAGE DU TITRE HERO & STATS
   ========================================================================== */

function initRoleTyping() {
    const typingEl = document.getElementById('roleTyping');
    if (!typingEl) return;

    const roles = (PORTFOLIO_DATA && PORTFOLIO_DATA.personal && PORTFOLIO_DATA.personal.roles) || [
        "Ingénieur Génie Logiciel",
        "Solutions Innovantes & IA",
        "Développeur Full-Stack",
        "Développeur Mobile",
        "Architecture Web & Mobile",
        "Architecture IA"
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 90;

    function type() {
        const currentRole = roles[roleIdx];
        if (isDeleting) {
            typingEl.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            speed = 40;
        } else {
            typingEl.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            speed = 90;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            isDeleting = true;
            speed = 2200;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

function initStatsCounter() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                metricNumbers.forEach(num => {
                    const target = parseInt(num.getAttribute('data-target'), 10);
                    let current = 0;
                    const step = Math.max(1, Math.floor(target / 25));
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            num.textContent = target;
                            clearInterval(timer);
                        } else {
                            num.textContent = current;
                        }
                    }, 50);
                });
            }
        });
    }, { threshold: 0.3 });

    const heroMetrics = document.querySelector('.hero-metrics');
    if (heroMetrics) observer.observe(heroMetrics);
}

/* ==========================================================================
   5. RENDU DYNAMIQUE DES DONNÉES DU CV
   ========================================================================== */

// 5.1 COMPÉTENCES
function renderSkills(skillsList) {
    const container = document.getElementById('skillsGridContainer');
    const tabs = document.querySelectorAll('.skill-tab-btn');
    if (!container || !skillsList) return;

    function buildCategoryHTML(cat) {
        const badgesHTML = cat.items.map(item => `
            <div class="skill-pill">
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
            </div>
        `).join('');

        return `
            <div class="skill-cat-card" data-category="${getCategoryGroup(cat.category)}">
                <div class="cat-header">
                    <div class="cat-icon-box">
                        <i class="${cat.icon}"></i>
                    </div>
                    <div>
                        <h3 class="cat-title">${cat.category}</h3>
                    </div>
                </div>
                <p class="cat-desc">${cat.description}</p>
                <div class="skill-badges-container">
                    ${badgesHTML}
                </div>
            </div>
        `;
    }

    function getCategoryGroup(catName) {
        const lower = catName.toLowerCase();
        if (lower.includes('ai') || lower.includes('learning') || lower.includes('nlp')) return 'ai';
        if (lower.includes('back-end') || lower.includes('api')) return 'backend';
        if (lower.includes('front-end')) return 'frontend';
        if (lower.includes('data') || lower.includes('bases')) return 'data';
        return 'qa';
    }

    container.innerHTML = skillsList.map(cat => buildCategoryHTML(cat)).join('');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const selectedCat = tab.getAttribute('data-cat');
            const cards = container.querySelectorAll('.skill-cat-card');

            cards.forEach(card => {
                const group = card.getAttribute('data-category');
                if (selectedCat === 'all' || group === selectedCat) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 5.2 EXPÉRIENCES
function renderExperiences(experiences) {
    const container = document.getElementById('experienceTimeline');
    if (!container || !experiences) return;

    container.innerHTML = experiences.map((exp) => `
        <div class="timeline-entry">
            <div class="timeline-node-pin"></div>
            <div class="timeline-entry-card">
                <div class="entry-header">
                    <h3 class="entry-role">${exp.role}</h3>
                    <div class="entry-badges">
                        <span class="entry-period-badge">${exp.period}</span>
                        <span class="entry-type-badge">${exp.badge}</span>
                    </div>
                </div>
                <div class="entry-company-row">
                    <span><i class="fas fa-building"></i> ${exp.company}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${exp.location}</span>
                </div>
                <p class="entry-desc">${exp.description}</p>
                <ul class="entry-bullets">
                    ${exp.achievements.map(a => `<li>${a}</li>`).join('')}
                </ul>
                <div class="entry-tech-tags">
                    ${exp.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// 5.3 PROJETS MAJEURS & DÉMOS VIDÉOS
function renderProjects(projects) {
    const container = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-pill-btn');
    if (!container || !projects) return;

    const iconMap = {
        'ai-brain': 'fas fa-brain orb-cyan',
        'fleet-telematics': 'fas fa-truck-moving orb-indigo',
        'learning-sphere': 'fas fa-graduation-cap orb-purple',
        'career-portal': 'fas fa-briefcase orb-cyan',
        'cinema-stream': 'fas fa-film orb-indigo',
        'ecommerce-cart': 'fas fa-shopping-cart orb-purple',
        'job-track': 'fas fa-tasks orb-cyan',
        'energy-dashboard': 'fas fa-bolt orb-cyan',
        'fitness-mobile': 'fas fa-heartbeat orb-purple',
        'coffee-cup': 'fas fa-coffee orb-indigo'
    };

    function buildProjectCard(p) {
        const visual = iconMap[p.abstractVisual] || 'fas fa-code orb-cyan';
        const [iconClass, orbClass] = visual.split(' ');

        const demoVideoBtn = p.demoVideo ? `
            <a href="${p.demoVideo}" target="_blank" rel="noopener noreferrer" class="card-demo-btn" onclick="event.stopPropagation();" title="Visionner la démo vidéo sur Google Drive">
                <i class="fas fa-play-circle"></i>
                <span>Démo Vidéo</span>
            </a>
        ` : '';

        return `
            <div class="project-card-3d" data-id="${p.id}" data-category="${p.category}">
                <div class="card-header-art">
                    <div class="art-glow-orb ${orbClass}"></div>
                    <i class="${iconClass} art-domain-icon"></i>
                    <span class="card-badge-top">${p.badge}</span>
                    <span class="card-year-top">${p.year}</span>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${p.title}</h3>
                    <p class="card-summary">${p.summary}</p>
                    <div class="card-tech-list">
                        ${p.technologies.slice(0, 5).map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        ${p.technologies.length > 5 ? `<span class="tech-tag">+${p.technologies.length - 5}</span>` : ''}
                    </div>
                    <div class="card-footer">
                        <button class="btn-inspect" data-id="${p.id}">
                            <span>Détails & Architecture</span>
                            <i class="fas fa-arrow-right"></i>
                        </button>
                        <div class="card-footer-actions">
                            ${demoVideoBtn}
                            <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="card-gh-link" title="Code source GitHub" onclick="event.stopPropagation();">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = projects.map(p => buildProjectCard(p)).join('');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const cards = container.querySelectorAll('.project-card-3d');

            cards.forEach(card => {
                const cat = card.getAttribute('data-category') || '';
                const catList = cat.split(/\s+/);
                if (filter === 'all' || catList.includes(filter)) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    container.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card-3d');
        if (card) {
            const id = card.getAttribute('data-id');
            openProjectModal(id);
        }
    });
}

// 5.4 FORMATION ACADÉMIQUE
function renderEducation(educationList) {
    const container = document.getElementById('educationGrid');
    if (!container || !educationList) return;

    container.innerHTML = educationList.map(edu => `
        <div class="education-card">
            <span class="edu-period-badge">${edu.period}</span>
            <h3 class="edu-degree">${edu.degree}</h3>
            <div class="edu-institution">
                <i class="fas fa-university"></i>
                <span>${edu.institution} • ${edu.location}</span>
            </div>
            <p class="edu-desc">${edu.description}</p>
        </div>
    `).join('');
}

// 5.5 CERTIFICATIONS
function renderCertifications(certs) {
    const container = document.getElementById('certificationsGrid');
    if (!container || !certs) return;

    container.innerHTML = certs.map(c => `
        <div class="cert-card-v2">
            <div class="cert-icon-frame" style="color: ${c.color}">
                <i class="${c.icon}"></i>
            </div>
            <div class="cert-info">
                <h3>${c.title}</h3>
                <span class="cert-issuer">${c.organization} • Année ${c.year}</span>
                <p class="cert-desc">${c.description}</p>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   6. MODAL D'INSPECTION DÉTAILLÉE DE PROJET
   ========================================================================== */

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    if (!modal) return;

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            modal.classList.remove('open');
        }
    });
}

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modalBody');
    if (!modal || !body || !PORTFOLIO_DATA) return;

    const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
    if (!project) return;

    const videoDemoAction = project.demoVideo ? `
        <a href="${project.demoVideo}" target="_blank" rel="noopener noreferrer" class="btn btn-demo-video">
            <i class="fas fa-play-circle"></i>
            <span>Regarder la Démo Vidéo (Drive)</span>
        </a>
    ` : '';

    body.innerHTML = `
        <div class="modal-badge-row">
            <span class="entry-period-badge">${project.year}</span>
            <span class="entry-type-badge">${project.badge}</span>
        </div>
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-description">${project.description}</p>
        
        <h4 class="modal-subtitle">Fonctionnalités & Réalisations Clés</h4>
        <ul class="modal-features-list">
            ${project.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <h4 class="modal-subtitle">Technologies & Outils Mobilisés</h4>
        <div class="modal-tech-stack">
            ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div class="modal-actions">
            ${videoDemoAction}
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fab fa-github"></i>
                <span>Explorer sur GitHub</span>
            </a>
            <a href="#contact" class="btn btn-outline" onclick="document.getElementById('projectModal').classList.remove('open');">
                <i class="fas fa-paper-plane"></i>
                <span>Échanger à propos de ce projet</span>
            </a>
        </div>
    `;

    modal.classList.add('open');
}

/* ==========================================================================
/* ==========================================================================
   7. FORMULAIRE DE CONTACT — REAL API (Resend SMTP)
   ========================================================================== */

function initContactForm() {
    const form      = document.getElementById('contactForm');
    const feedback  = document.getElementById('contactFormFeedback');
    const submitBtn = document.getElementById('contactSubmitBtn');
    const submitIcon = document.getElementById('submitIcon');
    const submitText = document.getElementById('submitText');
    const msgArea   = document.getElementById('contactMessage');
    const charCount = document.getElementById('charCount');
    if (!form) return;

    // ── Character counter
    if (msgArea && charCount) {
        msgArea.addEventListener('input', () => {
            const len = msgArea.value.length;
            charCount.textContent = `${len} / 2000`;
            charCount.style.color = len > 1800 ? '#f87171' : '';
        });
    }

    // ── Inline field validation helpers
    const setErr = (id, msg) => {
        const el = document.getElementById(id);
        if (el) { el.textContent = msg; el.style.display = msg ? 'block' : 'none'; }
    };
    const clearErrs = () => ['errName','errEmail','errSubject','errMessage'].forEach(id => setErr(id, ''));

    const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

    // ── Set button state
    function setLoading(loading) {
        submitBtn.disabled = loading;
        if (loading) {
            submitIcon.className = 'fas fa-spinner fa-spin';
            submitText.textContent = 'Envoi en cours...';
        } else {
            submitIcon.className = 'fas fa-paper-plane';
            submitText.textContent = 'Envoyer le message';
        }
    }

    // ── Show feedback banner
    function showFeedback(type, html) {
        feedback.className = `form-feedback-message ${type}`;
        feedback.innerHTML = html;
        feedback.style.display = 'block';
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        if (type === 'success') {
            setTimeout(() => { feedback.style.display = 'none'; }, 10000);
        }
    }

    // ── Submit handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrs();

        const name    = (document.getElementById('contactName')?.value    || '').trim();
        const email   = (document.getElementById('contactEmail')?.value   || '').trim();
        const company = (document.getElementById('contactCompany')?.value || '').trim();
        const subject = (document.getElementById('contactSubject')?.value || '').trim();
        const message = (document.getElementById('contactMessage')?.value || '').trim();
        const honeypot = (document.getElementById('contactHoneypot')?.value || '');

        // Bot check
        if (honeypot) return;

        // Client-side validation
        let valid = true;
        if (!name || name.length < 2)        { setErr('errName',    'Nom requis (min 2 caractères).'); valid = false; }
        if (!isValidEmail(email))             { setErr('errEmail',   'Email invalide.'); valid = false; }
        if (!subject || subject.length < 3)   { setErr('errSubject', 'Objet requis (min 3 caractères).'); valid = false; }
        if (!message || message.length < 10)  { setErr('errMessage', 'Message requis (min 10 caractères).'); valid = false; }
        if (!valid) return;

        setLoading(true);
        feedback.style.display = 'none';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, company, subject, message, website: honeypot }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                form.reset();
                if (charCount) charCount.textContent = '0 / 2000';
                showFeedback('success',
                    `<i class="fas fa-check-circle"></i> <strong>Message envoyé avec succès !</strong><br>
                    Merci <strong>${name}</strong>, votre message a bien été reçu. Kossay vous répondra rapidement à <strong>${email}</strong>.`
                );
            } else {
                showFeedback('error',
                    `<i class="fas fa-exclamation-triangle"></i> ${data.error || "Erreur d'envoi. Réessayez ou contactez directement kossayboubaker45@gmail.com."}`
                );
            }
        } catch (err) {
            showFeedback('error',
                `<i class="fas fa-exclamation-triangle"></i> Serveur inaccessible. Contactez directement <strong>kossayboubaker45@gmail.com</strong>.`
            );
        } finally {
            setLoading(false);
        }
    });
}

/* ==========================================================================
   8. CHATBOT ASSISTANT IA (KB CAREER ASSISTANT)
   ========================================================================== */

function initChatbot() {
    const widget = document.getElementById('chatbotWidget');
    const toggle = document.getElementById('chatbotToggle');
    const windowEl = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotClose');
    const messages = document.getElementById('chatbotMessages');
    const input = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('chatbotSend');
    const chips = document.querySelectorAll('.chip');
    if (!widget || !toggle || !windowEl) return;

    toggle.addEventListener('click', () => {
        windowEl.classList.toggle('open');
        if (windowEl.classList.contains('open') && input) {
            input.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        windowEl.classList.remove('open');
    });

    function getNowTime() {
        const d = new Date();
        return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }

    function appendMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'bot-msg'}`;

        const iconDiv = document.createElement('div');
        iconDiv.className = 'msg-icon';
        iconDiv.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'msg-bubble';

        let formatted = text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        bubbleDiv.innerHTML = `<p>${formatted}</p><span class="msg-time">${getNowTime()}</span>`;

        msgDiv.appendChild(iconDiv);
        msgDiv.appendChild(bubbleDiv);
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function generateResponse(query) {
        const q = query.toLowerCase();

        if (q.includes('demo') || q.includes('video') || q.includes('drive')) {
            return `Voici les liens directs vers les **démonstrations vidéos Google Drive** des projets de Kossay :\n\n🎥 [Démo Suivi des Stages](https://drive.google.com/file/d/1yndEoHpZTIXockUzCHtkug4VmZYvPS4U/view?usp=drive_link)\n🎥 [Démo PFE Flotte IA](https://drive.google.com/file/d/1Kpozr78TSgLW6fjFweRbseOnKFKFVEQS/view?usp=drive_link)\n🎥 [Démo Horizon Charge (Énergie)](https://drive.google.com/file/d/1XnaOJ1Q9t1RSdeSpW6kdUrKA2J4REpLP/view?usp=drive_link)`;
        }

        if (q.includes('linkedin') || q.includes('reseau') || q.includes('facebook') || q.includes('instagram')) {
            return `Voici les réseaux officiels de Kossay :\n\n💼 **LinkedIn** : [Profil LinkedIn](https://www.linkedin.com/in/kossay-boubaker-3ab197223/)\n📘 **Facebook** : [Profil Facebook](https://www.facebook.com/kossay.madride/?locale=fr_FR)\n📸 **Instagram** : [@kossay.bkr](https://www.instagram.com/kossay.bkr)\n🐙 **GitHub** : [github.com/kossayboubaker](https://github.com/kossayboubaker)`;
        }

        if (q.includes('flotte') || q.includes('pfe') || q.includes('exypnotech')) {
            return `Pour son **PFE 2026 chez Exypnotech**, Kossay a conçu un système intelligent de gestion de flotte et d'optimisation routière :\n\n• **Machine Learning** : analyse de comportements des chauffeurs, détection de fatigue, contrôle des pauses obligatoires et score prédictif.\n• **IA Générative** : Chatbot RAG sémantique avec LLM et détection de contenu toxique pour valider les réclamations.\n• **Stack** : Spring Boot, Angular, MySQL, Keycloak, Leaflet, OSRM, JUnit, Mockito et JMeter.\n\n🎥 Une [démo vidéo Google Drive est disponible ici](https://drive.google.com/file/d/1Kpozr78TSgLW6fjFweRbseOnKFKFVEQS/view?usp=drive_link) !`;
        }

        if (q.includes('competence') || q.includes('skill') || q.includes('techno') || q.includes('rag') || q.includes('machine learning')) {
            return `Voici les domaines d'expertise clés de Kossay :\n\n🤖 **IA & NLP** : LLM, RAG, Embeddings, Recherche sémantique, Vector DB, Gemini API, Scikit-learn, Random Forest.\n⚙️ **Back-End** : Spring Boot, Node.js, Express.js, .NET, REST API, Keycloak.\n💻 **Front-End** : Angular, React.js, TypeScript, Tailwind CSS, Material UI.\n🗄️ **Bases** : PostgreSQL, MySQL, MongoDB, SQL Server, SQLite.\n🧪 **Tests & DevOps** : JUnit, Mockito, Jest, JaCoCo, Postman, JMeter, Docker, Git.`;
        }

        if (q.includes('projet') || q.includes('mobile') || q.includes('flutter') || q.includes('fitness') || q.includes('calorie') || q.includes('groq') || q.includes('charge') || q.includes('energie') || q.includes('portfolio')) {
            return `Parmi les projets majeurs de Kossay :\n\n1. **AI Resume-to-Portfolio & Career Intelligence (2026)** : Extraction de CV, portfolio 5 langues, assistant RAG et dashboard n8n.\n2. **Système Intelligent de Gestion de Flotte (2026 - PFE)** : ML & RAG pour flottes poids lourds.\n3. **Sport Energy – Mobile & IA Coach (2024)** : Flutter, Dart, Groq API LLM (Calculateur Calories & Ask Me Coach), SQLite.\n4. **Horizon Charge – Consultation Énergétique (2025)** : Vite, TypeScript, React, shadcn-ui, Tailwind CSS.\n5. **Plateforme de Postulation & Suivi de Stages (2023 - ITQAN)** : Node.js, Express.js, Tailwind CSS.\n6. **StudySphere (2025)** : Plateforme IA d'apprentissage.\n\nVisionnez les démos vidéos Google Drive directement depuis les cartes de projets !`;
        }

        if (q.includes('contact') || q.includes('email') || q.includes('telephone') || q.includes('joindre')) {
            return `Vous pouvez contacter directement Kossay :\n\n📧 **Email** : kossayboubaker45@gmail.com\n📱 **Téléphone** : +216 50 393 158\n📍 **Localisation** : Tunis, Tunisie\n💼 **LinkedIn** : https://www.linkedin.com/in/kossay-boubaker-3ab197223/\n🐙 **GitHub** : github.com/kossayboubaker`;
        }

        if (q.includes('formation') || q.includes('etude') || q.includes('esprit')) {
            return `Parcours académique de Kossay :\n\n🎓 **2023 - 2026** : **Diplôme d'Ingénieur en Génie Logiciel** à **ESPRIT (Tunis)**. PFE réalisé chez Exypnotech.\n🎓 **2020 - 2023** : Licence en Développement Web & Multimédia à l'**ISET Tozeur**.\n🎓 **2020** : Baccalauréat Scientifique (Section Expérimentale).`;
        }

        if (q.includes('certif') || q.includes('aws')) {
            return `Kossay possède deux certifications officielles obtenues en 2025 :\n\n☁️ **AWS Certified Cloud Practitioner** (Amazon Web Services)\n🔗 **Blockchain Fundamentals** (Coursera)`;
        }

        if (q.includes('cv') || q.includes('telecharger')) {
            return `Vous pouvez télécharger le CV officiel de Kossay directement depuis le bouton du menu ou en cliquant sur le lien dans la section Contact !`;
        }

        return `Je suis l'assistant de Kossay Boubaker. Je peux vous renseigner sur ses **démonstrations vidéos Google Drive**, son **PFE 2026**, ses compétences en **IA & Full-Stack**, ses **réseaux sociaux (LinkedIn, Facebook, Instagram)** ou ses **coordonnées de contact** !`;
    }

    function handleSend() {
        const text = input.value.trim();
        if (!text) return;

        appendMessage(text, true);
        input.value = '';

        setTimeout(() => {
            const answer = generateResponse(text);
            appendMessage(answer, false);
        }, 500);
    }

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            input.value = query;
            handleSend();
        });
    });
}

/* ==========================================================================
   9. BOUTON RETOUR EN HAUT
   ========================================================================== */

function initBackToTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 450) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
