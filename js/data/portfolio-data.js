/**
 * Portfolio Data Source - Kossay Boubaker
 * Données extraites intégralement du CV officiel (cv_kossay_boubaker.pdf)
 * Liens vidéos démonstratifs Google Drive & Réseaux sociaux officiels
 */

const PORTFOLIO_DATA = {
    personal: {
        name: "Kossay Boubaker",
        title: "Ingénieur en Génie Logiciel | Full-Stack & Solutions IA",
        shortBio: "Ingénieur en informatique spécialisé en Génie Logiciel, passionné par la conception et le développement de solutions Full Stack, l'architecture logicielle et l'intégration de technologies d'Intelligence Artificielle.",
        location: "Tunis, Tunisie",
        phone: "+216 50 393 158",
        email: "kossayboubaker45@gmail.com",
        github: "https://github.com/kossayboubaker",
        githubDisplay: "github.com/kossayboubaker",
        linkedin: "https://www.linkedin.com/in/kossay-boubaker-3ab197223/",
        linkedinDisplay: "linkedin.com/in/kossay-boubaker",
        facebook: "https://www.facebook.com/kossay.madride/?locale=fr_FR",
        instagram: "https://www.instagram.com/kossay.bkr?fbclid=IwY2xjawVvwtdleHRuA2FlbQIxMABwZG9mBWJyaWQRMVJZbmZEdUlzcTgxMTFSeDZzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEfR-y-YBjEqGh6CC4Hx6OwyD5ZugLBNOU32-PhKyM6DnWvwoTuDMzLjwCaGfM_aem_zRK4x4IadZeqnncLV1wSJg",
        cvPdf: "assets/docs/cv_kossay_boubaker.pdf",
        profileImg: "assets/images/profil_framed.png",
        statusBadge: "Disponible pour de nouvelles opportunités",
        roles: [
            "Ingénieur Génie Logiciel",
            "Solutions Innovantes & IA",
            "Développeur Full-Stack",
            "Développeur Mobile",
            "Architecture Web & Mobile",
            "Architecture IA"
        ],
        demoVideos: [
            {
                title: "Démo : Plateforme de Postulation & Suivi de Stages",
                url: "https://drive.google.com/file/d/1yndEoHpZTIXockUzCHtkug4VmZYvPS4U/view?usp=drive_link",
                project: "Plateforme de Postulation & Suivi de Stages (Stage ITQAN)"
            },
            {
                title: "Démo : Système Intelligent de Gestion de Flotte (PFE)",
                url: "https://drive.google.com/file/d/1Kpozr78TSgLW6fjFweRbseOnKFKFVEQS/view?usp=drive_link",
                project: "Système Intelligent de Gestion de Flotte (PFE Exypnotech 2026)"
            },
            {
                title: "Démo : Horizon Charge – Plateforme de Consultation Énergétique",
                url: "https://drive.google.com/file/d/1XnaOJ1Q9t1RSdeSpW6kdUrKA2J4REpLP/view?usp=drive_link",
                project: "Horizon Charge – Consultation Énergétique & Bornes (Projet Personnel)"
            }
        ]
    },

    stats: [
        { label: "Diplôme & Cycle", value: "ESPRIT 2026", subtext: "Ingénieur Diplômé" },
        { label: "Stages & Expériences", value: "6", suffix: "+", subtext: "Parcours Professionnel" },
        { label: "Projets d'Envergure", value: "10", suffix: "+", subtext: "IA, Mobile & Full-Stack" },
        { label: "Certifications", value: "2", subtext: "AWS & Blockchain" }
    ],

    about: {
        headline: "Ingénieur en informatique & Creative Developer axé sur l'impact technologique",
        paragraph1: "Diplômé Ingénieur en Génie Logiciel à l'ESPRIT (Tunis) et titulaire d'une Licence en Développement Web & Multimédia (ISET Tozeur), je conçois et déploie des applications web complexes, des architectures modulaires et des systèmes intelligents augmentés par l'IA.",
        paragraph2: "Mon expertise couvre le cycle complet de développement logiciel : du design UX/Front-End moderne (React, Angular, TypeScript) aux architectures Back-End robustes (Spring Boot, Node.js, .NET), en passant par l'intégration d'algorithmes de Machine Learning, pipelines RAG (Retrieval-Augmented Generation) et automatisation de workflows intelligents.",
        values: [
            { icon: "fas fa-brain", title: "Intégration IA & ML", desc: "Pipelines RAG, LLM sémantique, Computer Vision et modèles prédictifs." },
            { icon: "fas fa-cubes", title: "Architecture Robuste", desc: "APIs REST modulaires, microservices, sécurité Keycloak/JWT et tests automatisés." },
            { icon: "fas fa-bolt", title: "Performance & UX", desc: "Expériences interactives 3D, interfaces réactives et optimisation de temps de rendu." }
        ]
    },

    skills: [
        {
            category: "Generative AI & NLP",
            icon: "fas fa-brain",
            description: "Technologies d'IA générative et traitement automatique du langage naturel",
            items: [
                { name: "LLM", icon: "fas fa-microchip" },
                { name: "RAG (Retrieval-Augmented)", icon: "fas fa-project-diagram" },
                { name: "NLP", icon: "fas fa-language" },
                { name: "Embeddings", icon: "fas fa-vector-square" },
                { name: "Chunking", icon: "fas fa-cut" },
                { name: "Recherche Sémantique", icon: "fas fa-search" },
                { name: "Prompt Engineering", icon: "fas fa-terminal" },
                { name: "Vector Database", icon: "fas fa-database" },
                { name: "Gemini API", icon: "fab fa-google" },
                { name: "Groq API", icon: "fas fa-bolt" }
            ]
        },
        {
            category: "Machine Learning",
            icon: "fas fa-robot",
            description: "Modélisation prédictive, classification et entraînement",
            items: [
                { name: "Scikit-learn", icon: "fas fa-chart-line" },
                { name: "Random Forest", icon: "fas fa-tree" },
                { name: "Régression", icon: "fas fa-chart-pie" },
                { name: "Train / Test Split", icon: "fas fa-sliders-h" },
                { name: "Scoring Prédictif", icon: "fas fa-tachometer-alt" }
            ]
        },
        {
            category: "Data & Analytics",
            icon: "fas fa-database",
            description: "Traitement, transformation et analyse de données massives",
            items: [
                { name: "Python", icon: "fab fa-python" },
                { name: "pandas", icon: "fas fa-table" },
                { name: "NumPy", icon: "fas fa-calculator" },
                { name: "SQL", icon: "fas fa-database" },
                { name: "Data Cleaning", icon: "fas fa-broom" },
                { name: "Data Transformation", icon: "fas fa-exchange-alt" }
            ]
        },
        {
            category: "Back-End & API",
            icon: "fas fa-server",
            description: "Architectures serveurs, microservices et APIs REST",
            items: [
                { name: "Spring Boot", icon: "fas fa-leaf" },
                { name: "Node.js", icon: "fab fa-node-js" },
                { name: "Express.js", icon: "fas fa-server" },
                { name: ".NET", icon: "fab fa-microsoft" },
                { name: "Symfony", icon: "fab fa-symfony" },
                { name: "REST API", icon: "fas fa-plug" },
                { name: "Keycloak (Auth/IAM)", icon: "fas fa-shield-alt" }
            ]
        },
        {
            category: "Front-End",
            icon: "fas fa-laptop-code",
            description: "Interfaces web réactives, riches et orientées expérience utilisateur",
            items: [
                { name: "Angular", icon: "fab fa-angular" },
                { name: "React.js", icon: "fab fa-react" },
                { name: "TypeScript", icon: "fab fa-js" },
                { name: "HTML5 / CSS3", icon: "fab fa-html5" },
                { name: "Tailwind CSS", icon: "fas fa-wind" },
                { name: "Material UI", icon: "fas fa-palette" },
                { name: "Bootstrap", icon: "fab fa-bootstrap" },
                { name: "Flutter", icon: "fas fa-mobile-alt" },
                { name: "Dart", icon: "fas fa-code" }
            ]
        },
        {
            category: "Bases de Données",
            icon: "fas fa-hdd",
            description: "SGBD relationnels, NoSQL et vectoriels",
            items: [
                { name: "PostgreSQL", icon: "fas fa-database" },
                { name: "MySQL", icon: "fas fa-database" },
                { name: "MongoDB", icon: "fas fa-leaf" },
                { name: "SQL Server", icon: "fas fa-server" },
                { name: "SQLite", icon: "fas fa-mobile-alt" },
                { name: "Vector Database", icon: "fas fa-project-diagram" }
            ]
        },
        {
            category: "AI Agents & Visual Analytics",
            icon: "fas fa-chart-bar",
            description: "Automatisation de workflows et visualisation décisionnelle",
            items: [
                { name: "n8n Automation", icon: "fas fa-cogs" },
                { name: "Power BI", icon: "fas fa-chart-area" },
                { name: "Interactive Dashboards", icon: "fas fa-tachometer-alt" },
                { name: "KPI & Visual Analytics", icon: "fas fa-eye" }
            ]
        },
        {
            category: "Tests & Qualité",
            icon: "fas fa-check-double",
            description: "Validation continue, tests unitaires, intégration et charge",
            items: [
                { name: "JUnit", icon: "fas fa-vial" },
                { name: "Mockito", icon: "fas fa-vials" },
                { name: "Jest", icon: "fas fa-flask" },
                { name: "JaCoCo (Couverture)", icon: "fas fa-tasks" },
                { name: "Postman", icon: "fas fa-paper-plane" },
                { name: "JMeter (Performance)", icon: "fas fa-tachometer-alt" }
            ]
        },
        {
            category: "DevOps, Cartographie & Outils",
            icon: "fas fa-tools",
            description: "Conteneurisation, contrôle de version et cartographie",
            items: [
                { name: "Git & GitHub", icon: "fab fa-github" },
                { name: "Docker", icon: "fab fa-docker" },
                { name: "OSRM (Routing)", icon: "fas fa-route" },
                { name: "Leaflet (Carto)", icon: "fas fa-map-marked-alt" },
                { name: "VS Code", icon: "fas fa-code" },
                { name: "IntelliJ IDEA", icon: "fas fa-laptop-code" },
                { name: "Streamlit", icon: "fas fa-chart-line" }
            ]
        },
        {
            category: "Méthodologies",
            icon: "fas fa-users-cog",
            description: "Pratiques agiles et conception logicielle",
            items: [
                { name: "Agile Scrum", icon: "fas fa-sync" },
                { name: "UML", icon: "fas fa-project-diagram" }
            ]
        }
    ],

    experiences: [
        {
            period: "2026",
            badge: "PFE – Projet de Fin d’Études",
            role: "PFE – Système intelligent de gestion de flotte et d’optimisation routière",
            company: "Exypnotech Engineering Services",
            location: "Tunis, Tunisie",
            description: "Conception et développement d’une solution intelligente combinant Machine Learning, IA générative et optimisation des tournées pour améliorer la gestion d’une flotte de poids lourds.",
            achievements: [
                "Développement de fonctionnalités de Machine Learning pour l’analyse des comportements des chauffeurs, détection de fatigue, contrôle des pauses obligatoires et calcul d’un score de performance recommandant le meilleur chauffeur.",
                "Développement d’un chatbot RAG intégrant chunking, embeddings vectoriels, recherche sémantique et LLM.",
                "Système intelligent de validation des réclamations basé sur l’analyse sémantique et la détection de contenu toxique.",
                "Mise en place de tests unitaires et d’intégration avec JUnit, Mockito, Spring Boot Test et Jest avec mesure JaCoCo.",
                "Tests d’API et de performance avec Postman et Apache JMeter."
            ],
            technologies: ["Spring Boot", "Angular", "Machine Learning", "RAG / LLM", "MySQL", "Keycloak", "OSRM", "Leaflet", "JUnit", "Mockito", "Jest", "JaCoCo", "JMeter"]
        },
        {
            period: "Juil. – Sept. 2025",
            badge: "Stage 4ème Année",
            role: "Développeur Front-End",
            company: "Exypnotech Engineering Services",
            location: "Tunis, Tunisie",
            description: "Conception et développement d’interfaces web responsives orientées UX pour les solutions de l'entreprise.",
            achievements: [
                "Développement d'interfaces modulaires et haute fidélité avec React.js, Tailwind CSS et Material UI.",
                "Collaboration active au sein d’une équipe Front-End en environnement Agile Scrum.",
                "Optimisation de l'accessibilité, des temps de chargement et de la fluidité des interactions."
            ],
            technologies: ["React.js", "Tailwind CSS", "Material UI", "JavaScript / ES6", "Agile Scrum"]
        },
        {
            period: "Juin – Août 2024",
            badge: "Stage d’Initiation",
            role: "Développeur Web – Gestion de Produit",
            company: "ADDINN Tunisie",
            location: "Tunis, Tunisie",
            description: "Développement d’une application web complète et responsive pour la gestion de catalogue produits.",
            achievements: [
                "Conception d'une interface utilisateur réactive avec Angular.",
                "Développement des services Back-End avec le framework .NET.",
                "Intégration et modélisation de base de données relationnelle avec PostgreSQL."
            ],
            technologies: ["Angular", ".NET", "PostgreSQL", "REST API", "Git"]
        },
        {
            period: "Fév. – Juin 2023",
            badge: "Stage de Fin d’Études (Licence)",
            role: "Développeur Full-Stack – Gestion des Stages",
            company: "ITQAN",
            location: "Tozeur, Tunisie",
            description: "Conception et développement d’une plateforme collaborative de postulation et de suivi des offres de stage.",
            achievements: [
                "Architecture Back-End basée sur Node.js et Express.js pour la gestion des candidats, recruteurs et conventions.",
                "Interface responsive moderne construite avec Tailwind CSS.",
                "Suivi d'état en temps réel des candidatures et gestion des droits d'accès."
            ],
            technologies: ["Node.js", "Express.js", "Tailwind CSS", "REST API", "JavaScript"]
        },
        {
            period: "Juin – Août 2022",
            badge: "Stage de Perfectionnement",
            role: "Développeur Back-End – TecnoVerse E-Commerce",
            company: "ADDINN Tunisie",
            location: "Tunis, Tunisie",
            description: "Développement du Back-End de la plateforme e-commerce TecnoVerse spécialisée dans la vente d'équipements technologiques.",
            achievements: [
                "Architecture des routes et contrôleurs avec Node.js et Express.js.",
                "Implémentation complète de la gestion des produits, utilisateurs, paniers et cycle de commandes.",
                "Modélisation et requêtage de base de données documentaire NoSQL avec MongoDB."
            ],
            technologies: ["Node.js", "Express.js", "MongoDB", "NoSQL", "REST API"]
        },
        {
            period: "Juin – Juil. 2021",
            badge: "Stage d’Initiation",
            role: "Développeur Web – Site Vitrine Coffee Shop",
            company: "ITQAN",
            location: "Tozeur, Tunisie",
            description: "Conception et développement d'un site web dynamique pour un coffee shop.",
            achievements: [
                "Création de templates HTML dynamiques rendus côté serveur avec Handlebars.",
                "Mise en place de l'API serveur Node.js et liaison avec la base de données MongoDB.",
                "Design responsive pour affichage optimal sur mobile et desktop."
            ],
            technologies: ["Node.js", "Handlebars", "MongoDB", "CSS3", "JavaScript"]
        }
    ],

    education: [
        {
            period: "2023 – 2026",
            degree: "Diplôme d’Ingénieur en Génie Logiciel",
            institution: "ESPRIT – École Supérieure Privée d'Ingénierie et de Technologies",
            location: "Tunis, Tunisie",
            description: "Diplôme d'ingénieur obtenu en 2026 en Génie Logiciel avancé, couvrant l'architecture logicielle, les systèmes distribués, le cloud, la sécurité et l'intégration de solutions d'intelligence artificielle. PFE réalisé chez Exypnotech."
        },
        {
            period: "2020 – 2023",
            degree: "Licence en Développement Web et Multimédia",
            institution: "ISET Tozeur",
            location: "Tozeur, Tunisie",
            description: "Formation approfondie en technologies web modernes, programmation orientée objet, bases de données, réseaux et infographie multimédia."
        },
        {
            period: "2020",
            degree: "Baccalauréat Scientifique (Section Expérimentale)",
            institution: "Lycée Abou Kassem Chebbi",
            location: "Tozeur, Tunisie",
            description: "Formation scientifique axée sur les mathématiques, les sciences physiques et la méthode d'analyse logique."
        }
    ],

    certifications: [
        {
            title: "AWS Certified Cloud Practitioner",
            organization: "Amazon Web Services (AWS)",
            year: "2025",
            icon: "fab fa-aws",
            color: "#FF9900",
            description: "Certification validant la compréhension globale du Cloud AWS, la sécurité, l'architecture réseau, la tarification et les services fondamentaux."
        },
        {
            title: "Blockchain Fundamentals",
            organization: "Coursera",
            year: "2025",
            icon: "fas fa-cubes",
            color: "#0056D2",
            description: "Maîtrise des protocoles décentralisés, cryptographie asymétrique, consensus distribué et smart contracts."
        }
    ],

    projects: [
        {
            id: "ai-resume-platform",
            title: "AI Resume-to-Portfolio & Career Intelligence",
            year: "2026",
            category: "ai",
            badge: "Projet Phare IA 2026",
            abstractVisual: "ai-brain",
            summary: "Plateforme intelligente transformant automatiquement un CV PDF en profil professionnel et portfolio web multilingue avec assistant RAG et Career Dashboard.",
            description: "Conception et développement d’une plateforme intelligente transformant automatiquement un CV PDF en profil professionnel et portfolio web multilingue. Mise en place d’un pipeline d’analyse pour extraire et structurer les informations du CV et générer dynamiquement un portfolio en 5 langues. Développement en parallèle d’un assistant conversationnel multilingue basé sur RAG pour interroger les expériences, projets et compétences du profil, ainsi que d’un Career Intelligence Dashboard intégrant Skill Scoring, Skill Gap Analysis et recommandations personnalisées. Enfin, automatisation des workflows avec n8n et intégration d’une base de connaissances vectorielle pour fournir des réponses contextualisées et adaptées au profil.",
            features: [
                "Pipeline d'extraction & structuration automatique de CV PDF",
                "Génération dynamique de portfolio multilingue (5 langues)",
                "Assistant conversationnel RAG multilingue avec Vector Database",
                "Career Intelligence Dashboard avec Skill Scoring & Gap Analysis",
                "Automatisation complète de workflows avec n8n"
            ],
            technologies: ["Python", "LLM", "RAG", "NLP", "n8n", "Angular", "REST API", "Vector Database", "SQLite"],
            github: "https://github.com/kossayboubaker"
        },
        {
            id: "smart-fleet-management",
            title: "Système Intelligent de Gestion de Flotte (PFE)",
            year: "2026",
            category: "ai",
            badge: "PFE Exypnotech 2026",
            abstractVisual: "fleet-telematics",
            demoVideo: "https://drive.google.com/file/d/1Kpozr78TSgLW6fjFweRbseOnKFKFVEQS/view?usp=drive_link",
            demoLabel: "Démo Vidéo Drive (PFE Flotte IA)",
            summary: "Solution intelligente combinant Machine Learning, IA générative et optimisation des tournées pour la gestion de flottes de poids lourds.",
            description: "Système de supervision et d'optimisation de flotte poids lourds alliant télématique, Machine Learning et IA générative. Intègre un modèle de détection de fatigue et d'analyse des comportements des chauffeurs, un moteur de scoring chauffeurs selon l'historique de missions et retards, un chatbot RAG avec recherche sémantique, un système de détection de contenu toxique et validation de réclamations, ainsi qu'une cartographie dynamique interactive.",
            features: [
                "Détection de fatigue et contrôle des pauses obligatoires",
                "Calcul de score de performance & recommandation de chauffeurs",
                "Chatbot RAG sémantique pour l'assistance opérationnelle",
                "Modération intelligente & validation NLP des réclamations",
                "Optimisation d'itinéraires via OSRM et Leaflet",
                "Couverture de tests JaCoCo avec JUnit, Mockito, Jest et JMeter"
            ],
            technologies: ["Spring Boot", "Angular", "Machine Learning", "RAG", "MySQL", "Keycloak", "OSRM", "Leaflet", "JUnit", "JMeter"],
            github: "https://github.com/kossayboubaker"
        },
        {
            id: "studysphere",
            title: "StudySphere – Plateforme Intelligente d’Apprentissage",
            year: "2025",
            category: "ai",
            badge: "IA Générative",
            abstractVisual: "learning-sphere",
            summary: "Plateforme éducative intelligente orchestrant de multiples modèles d'IA pour accompagner les étudiants et personnaliser leur parcours.",
            description: "Conception d’une plateforme intelligente dédiée à l’accompagnement des étudiants et à l’optimisation de leur apprentissage. Intégration de plusieurs assistants IA pour la prise de notes, la résolution d’exercices, la recherche académique, l’apprentissage des langues et la génération de quiz, ainsi que le développement et l’intégration d’APIs d’intelligence artificielle pour le résumé, la compréhension de documents, la génération de contenu et la personnalisation des supports pédagogiques.",
            features: [
                "Assistants IA dédiés : prise de notes, quiz, résolution d'exercices",
                "Compréhension et résumé automatique de documents académiques",
                "Apprentissage des langues assisté par IA vocale et textuelle",
                "Multi-modèles IA : OpenAI, Google Gemini, Qwen, AssemblyAI"
            ],
            technologies: ["IA Générative", "OpenAI", "Gemini API", "Qwen", "AssemblyAI", "REST API", "TypeScript"],
            github: "https://github.com/kossayboubaker"
        },
        {
            id: "stage-platform-2025",
            title: "Plateforme Intelligente de Gestion de Stages",
            year: "2025",
            category: "fullstack",
            badge: "Projet Académique ESPRIT",
            abstractVisual: "career-portal",
            summary: "Application collaborative moderne de recherche, de suivi de candidatures et de conventions de stages.",
            description: "Développement collaboratif d’une plateforme complète de recherche et de suivi de stages pour étudiants, universités et entreprises partenaires. Gestion des workflows de validation de convention, évaluation des stagiaires et tableau de bord de pilotage.",
            features: [
                "Publication et matching d'offres de stages",
                "Suivi temps réel du statut de candidature",
                "Gestion collaborative des conventions et évaluations",
                "Architecture sécurisée par tokens JWT"
            ],
            technologies: ["Spring Boot", "Angular", "PostgreSQL", "REST API", "TypeScript"],
            github: "https://github.com/kossayboubaker"
        },
        {
            id: "cinema-platform",
            title: "Plateforme de Cinéma en Ligne",
            year: "2024",
            category: "web",
            badge: "Projet Académique",
            abstractVisual: "cinema-stream",
            summary: "Plateforme web de gestion cinématographique avec programmation, réservation interactive de sièges et projections.",
            description: "Conception d’une plateforme web pour la gestion de films, programmation de salles, réservations et projections cinématographiques avec interface responsive et gestion sécurisée des transactions.",
            features: [
                "Catalogue de films avec bandes-annonces et synopsis",
                "Sélection et réservation de sièges de salle en temps réel",
                "Module d'administration des projections et programmations"
            ],
            technologies: ["Symfony", "Bootstrap", "MySQL", "PHP", "JavaScript"],
            github: "https://github.com/kossayboubaker"
        },
        {
            id: "tecnoverse-ecommerce",
            title: "TecnoVerse – Plateforme E-Commerce",
            year: "2022",
            category: "fullstack",
            badge: "ADDINN Tunisie",
            abstractVisual: "ecommerce-cart",
            summary: "Plateforme e-commerce performante pour la vente d'accessoires et composants technologiques avec gestion complète de cycle de vente.",
            description: "Développement complet du Back-End d’une plateforme e-commerce moderne avec Node.js, Express.js et MongoDB. Implémentation du panier, gestion des catalogues produits, authentification utilisateurs et suivi des commandes.",
            features: [
                "Gestion des catalogues produits & variantes",
                "Panier d'achats persistant et tunnel de commande",
                "Gestion des stocks et suivi des expéditions",
                "Base documentaire MongoDB hautement disponible"
            ],
            technologies: ["Node.js", "Express.js", "MongoDB", "NoSQL", "REST API"],
            github: "https://github.com/kossayboubaker"
        },
        {
            id: "job-tracker-itqan",
            title: "Plateforme de Postulation & Suivi de Stages",
            year: "2023",
            category: "fullstack",
            badge: "Stage ITQAN",
            abstractVisual: "job-track",
            demoVideo: "https://drive.google.com/file/d/1yndEoHpZTIXockUzCHtkug4VmZYvPS4U/view?usp=drive_link",
            demoLabel: "Démo Vidéo Drive (Gestion des Stages)",
            summary: "Plateforme de postulation et de suivi des offres de stage avec architecture REST Node.js et interface Tailwind CSS.",
            description: "Conception et développement d’une plateforme fluide de postulation et de suivi des offres de stage. Permet aux étudiants de soumettre leurs candidatures et aux administrateurs de traiter les dossiers avec rapidité.",
            features: [
                "Espace candidat avec dépôt de candidatures",
                "Tableau de bord de suivi d'avancement des dossiers",
                "Design ergonomique responsive en Tailwind CSS"
            ],
            technologies: ["Node.js", "Express.js", "Tailwind CSS", "JavaScript"],
            github: "https://github.com/kossayboubaker"
        },
        {
            id: "horizon-charge-sphere-portal",
            title: "Horizon Charge – Plateforme de Consultation Énergétique",
            year: "2025",
            category: "web",
            badge: "Projet Personnel",
            abstractVisual: "energy-dashboard",
            demoVideo: "https://drive.google.com/file/d/1XnaOJ1Q9t1RSdeSpW6kdUrKA2J4REpLP/view?usp=drive_link",
            demoLabel: "Démo Vidéo Drive (Audit & Bornes de Recharge)",
            summary: "Portail interactif de consultation énergétique et de supervision intelligente de bornes de recharge avec tableaux de bord analytiques temps réel.",
            description: "Conception et développement d'un portail web moderne dédié à la consultation énergétique, au monitoring de flux de consommation et à la supervision de bornes de recharge intelligente. Développé avec React, Vite, TypeScript et la bibliothèque de composants shadcn/ui pour une expérience utilisateur ultra réactive.",
            features: [
                "Tableau de bord interactif de consultation et monitoring énergétique",
                "Supervision en temps réel des sessions et des bornes de recharge",
                "Indicateurs analytiques de consommation et métriques d'efficacité",
                "Interface moderne et accessible conçue avec shadcn-ui et Tailwind CSS"
            ],
            technologies: ["Vite", "TypeScript", "React", "shadcn-ui", "Tailwind CSS"],
            github: "https://github.com/kossayboubaker/horizop-charge-sphere-portal"
        },
        {
            id: "sport-energy-mobile",
            title: "Sport Energy – Mobile Fitness & AI Nutrition Coach",
            year: "2024",
            category: "mobile ai",
            badge: "Mobile & IA (Flutter)",
            abstractVisual: "fitness-mobile",
            summary: "Application mobile pour athlètes dotée d'un double assistant IA (Calculateur de Calories & Coach Gym via Groq API LLM), calculateur d'IMC et persistance SQLite.",
            description: "Conception et développement d'une application mobile cross-platform avec Flutter et Dart dédiée aux athlètes ('Sport Energy'). Intègre un système d'IA complet alimenté par l'API Groq (LLM) : un Calculateur de Calories intelligent analysant 40+ plats avec répartition nutritionnelle complète, et un assistant conversationnel 'Ask Me' prodiguant des conseils fitness personnalisés (Musculation, Cardio, Récupération). Comprend également un calculateur d'IMC (Body Mass Index) et une gestion robuste des données locales avec SQLite (auto-migration V3 → V4).",
            features: [
                "🍽️ Calorie Calculator IA : analyse nutritionnelle et calcul calorique automatique de 40+ plats via Groq API (LLM)",
                "❓ Ask Me Coach IA : assistant virtuel d'entraînement et de questions musculation/santé avec suggestion chips",
                "⚖️ Calculateur IMC (BMI) : suivi précis de l'indice de masse corporelle pour athlètes",
                "💾 Persistance locale SQLite : gestion de profil et auto-migration transparente de schéma de base de données (V3 → V4)",
                "🎨 UI/UX Material Design 3 : interface fluide, responsive et optimisée (<500ms de chargement, sécurisée par HTTPS/Bearer auth)"
            ],
            technologies: ["Flutter", "Dart", "Groq API", "LLM", "SQLite", "Material Design 3", "REST API", "Mobile AI", "Python"],
            github: "https://github.com/kossayboubaker/mobile_application"
        },
        {
            id: "coffee-shop-showcase",
            title: "Coffee Shop Vitrine Dynamique",
            year: "2021",
            category: "web",
            badge: "Stage ITQAN",
            abstractVisual: "coffee-cup",
            summary: "Site vitrine dynamique avec rendu serveur Handlebars, gestion des cartes menus et intégration MongoDB.",
            description: "Création de pages dynamiques avec Handlebars et intégration serveur Node.js avec MongoDB pour un coffee shop de renom.",
            features: [
                "Génération dynamique des menus et spécialités",
                "Persistance des avis clients et informations sous MongoDB",
                "Expérience mobile-first fluide"
            ],
            technologies: ["Handlebars", "Node.js", "MongoDB", "CSS3", "JavaScript"],
            github: "https://github.com/kossayboubaker"
        }
    ]
};

// Export pour utilisation globale ou modulaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PORTFOLIO_DATA;
}
