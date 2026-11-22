/**
 * 3D Scenes & Interactive Hologram Engine - Three.js
 * Portfolio Kossay Boubaker
 * Gère l'expérience 3D immersive :
 * 1. Scène d'arrière-plan avec géométries flottantes et particules galactiques (adaptatives Dark / Light mode)
 * 2. Médaillon 3D interactif du profil (support universel local file:// via base64, reflets PBR, gyroscopes)
 */

class Portfolio3DEngine {
    constructor() {
        this.bgCanvas = document.getElementById('bg3DCanvas');
        this.profileContainer = document.getElementById('heroProfile3DContainer');
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0, normalizedX: 0, normalizedY: 0 };
        this.scrollY = 0;
        this.clock = new THREE.Clock();
        this.isRunning = true;
        this.isLightMode = document.documentElement.getAttribute('data-theme') === 'light';

        this.init();
    }

    init() {
        this.setupEventListeners();
        if (this.bgCanvas && typeof THREE !== 'undefined') {
            this.initBackgroundScene();
        }
        if (this.profileContainer && typeof THREE !== 'undefined') {
            this.initProfile3D();
        }
        this.observeThemeChanges();
        this.animate();
    }

    setupEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.mouse.normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.normalizedY = -(e.clientY / window.innerHeight) * 2 + 1;
        }, { passive: true });

        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset || document.documentElement.scrollTop;
        }, { passive: true });

        window.addEventListener('resize', () => {
            this.onResize();
        });

        document.addEventListener('visibilitychange', () => {
            this.isRunning = !document.hidden;
        });
    }

    observeThemeChanges() {
        const observer = new MutationObserver(() => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            this.isLightMode = currentTheme === 'light';
            this.updateThemeVisuals();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    updateThemeVisuals() {
        if (this.isLightMode) {
            // Mode Clair : tons doux et contrastés
            if (this.icoMat) {
                this.icoMat.color.set(0x94a3b8);
                this.icoMat.opacity = 0.12;
            }
            if (this.knotMat) {
                this.knotMat.color.set(0x818cf8);
                this.knotMat.opacity = 0.14;
            }
            if (this.octMat) {
                this.octMat.color.set(0x64748b);
                this.octMat.opacity = 0.12;
            }
            if (this.bgParticlesMat) {
                this.bgParticlesMat.opacity = 0.28;
                this.bgParticlesMat.size = 0.6;
            }
            if (this.profileAmbientLight) {
                this.profileAmbientLight.intensity = 1.7;
            }
            if (this.cursorLight) {
                this.cursorLight.color.set(0x4f46e5);
                this.cursorLight.intensity = 2.4;
            }
        } else {
            // Mode Sombre : néons vibrants
            if (this.icoMat) {
                this.icoMat.color.set(0x6366f1);
                this.icoMat.opacity = 0.22;
            }
            if (this.knotMat) {
                this.knotMat.color.set(0x00f5d4);
                this.knotMat.opacity = 0.18;
            }
            if (this.octMat) {
                this.octMat.color.set(0x8b5cf6);
                this.octMat.opacity = 0.25;
            }
            if (this.bgParticlesMat) {
                this.bgParticlesMat.opacity = 0.65;
                this.bgParticlesMat.size = 0.8;
            }
            if (this.profileAmbientLight) {
                this.profileAmbientLight.intensity = 1.2;
            }
            if (this.cursorLight) {
                this.cursorLight.color.set(0x00f5d4);
                this.cursorLight.intensity = 3.2;
            }
        }
    }

    // ==========================================
    // 1. SCÈNE 3D D'ARRIÈRE-PLAN (BACKGROUND)
    // ==========================================
    initBackgroundScene() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.bgScene = new THREE.Scene();
        this.bgCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        this.bgCamera.position.z = 32;

        this.bgRenderer = new THREE.WebGLRenderer({
            canvas: this.bgCanvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.bgRenderer.setSize(width, height);
        this.bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Particules cosmiques d'arrière-plan
        const particleCount = window.innerWidth < 768 ? 350 : 750;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const color1 = new THREE.Color(0x6366f1);
        const color2 = new THREE.Color(0x00f5d4);
        const color3 = new THREE.Color(0x8b5cf6);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 85;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 85;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

            const mixedColor = i % 3 === 0 ? color1 : (i % 3 === 1 ? color2 : color3);
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Texture douce
        const canvasParticle = document.createElement('canvas');
        canvasParticle.width = 32;
        canvasParticle.height = 32;
        const ctxP = canvasParticle.getContext('2d');
        const grad = ctxP.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctxP.fillStyle = grad;
        ctxP.fillRect(0, 0, 32, 32);

        const particleTexture = new THREE.CanvasTexture(canvasParticle);

        this.bgParticlesMat = new THREE.PointsMaterial({
            size: this.isLightMode ? 0.6 : 0.8,
            map: particleTexture,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            opacity: this.isLightMode ? 0.28 : 0.65
        });

        this.bgParticles = new THREE.Points(geometry, this.bgParticlesMat);
        this.bgScene.add(this.bgParticles);

        // Objets géométriques flottants éloignés des zones textuelles centrales
        this.bgFloatingGroup = new THREE.Group();

        // 1. Icosaèdre (placé en haut à gauche, hors du texte)
        const icoGeo = new THREE.IcosahedronGeometry(3.2, 1);
        this.icoMat = new THREE.MeshStandardMaterial({
            color: this.isLightMode ? 0x94a3b8 : 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: this.isLightMode ? 0.12 : 0.22,
            roughness: 0.2,
            metalness: 0.8
        });
        this.icoMesh = new THREE.Mesh(icoGeo, this.icoMat);
        this.icoMesh.position.set(-26, 14, -14);
        this.bgFloatingGroup.add(this.icoMesh);

        // 2. Torus Knot (placé en bas à droite)
        const knotGeo = new THREE.TorusKnotGeometry(2.4, 0.5, 80, 16);
        this.knotMat = new THREE.MeshStandardMaterial({
            color: this.isLightMode ? 0x818cf8 : 0x00f5d4,
            wireframe: true,
            transparent: true,
            opacity: this.isLightMode ? 0.14 : 0.18,
            roughness: 0.3,
            metalness: 0.9
        });
        this.knotMesh = new THREE.Mesh(knotGeo, this.knotMat);
        this.knotMesh.position.set(26, -14, -16);
        this.bgFloatingGroup.add(this.knotMesh);

        // 3. Octaèdre (placé en haut à droite)
        const octGeo = new THREE.OctahedronGeometry(2.0, 0);
        this.octMat = new THREE.MeshStandardMaterial({
            color: this.isLightMode ? 0x64748b : 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: this.isLightMode ? 0.12 : 0.25,
            roughness: 0.1,
            metalness: 0.9
        });
        this.octMesh = new THREE.Mesh(octGeo, this.octMat);
        this.octMesh.position.set(22, 16, -12);
        this.bgFloatingGroup.add(this.octMesh);

        this.bgScene.add(this.bgFloatingGroup);

        // Éclairage de fond
        const bgAmbientLight = new THREE.AmbientLight(0xffffff, this.isLightMode ? 1.5 : 1.0);
        this.bgScene.add(bgAmbientLight);

        const bgPointLight1 = new THREE.PointLight(0x6366f1, 1.8, 80);
        bgPointLight1.position.set(-20, 20, 20);
        this.bgScene.add(bgPointLight1);
    }

    // ==========================================
    // 2. MÉDAILLON 3D PROFIL (HERO SECTION)
    // ==========================================
    initProfile3D() {
        const container = this.profileContainer;
        const width = container.clientWidth || 460;
        const height = container.clientHeight || 460;

        this.profileScene = new THREE.Scene();
        this.profileCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        this.profileCamera.position.set(0, 0, 7.8);

        this.profileRenderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.profileRenderer.setSize(width, height);
        this.profileRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.profileRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.profileRenderer.toneMappingExposure = 1.25;

        // Nettoyer et attacher
        container.innerHTML = '';
        container.appendChild(this.profileRenderer.domElement);

        // Groupe principal du médaillon 3D
        this.medallionGroup = new THREE.Group();
        this.medallionGroup.scale.set(0.01, 0.01, 0.01);
        this.profileScene.add(this.medallionGroup);

        // Source d'image immunisée contre CORS (Base64 prioritaire, puis chemin relatif)
        const imageSource = (typeof PROFILE_IMAGE_DATA !== 'undefined' && PROFILE_IMAGE_DATA)
            ? PROFILE_IMAGE_DATA
            : 'assets/images/profil_framed.png';

        const profileImg = new Image();
        profileImg.onload = () => {
            const texture = new THREE.Texture(profileImg);
            texture.needsUpdate = true;
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            this.buildMedallionMeshes(texture);
            this.revealProfileAnimation();
        };
        profileImg.onerror = () => {
            // Secours ultime
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load('assets/images/profil.png', (fallbackTex) => {
                fallbackTex.center.set(0.5, 0.5);
                this.buildMedallionMeshes(fallbackTex);
                this.revealProfileAnimation();
            });
        };
        profileImg.src = imageSource;

        // Éclairage 3D dynamique
        this.cursorLight = new THREE.PointLight(
            this.isLightMode ? 0x4f46e5 : 0x00f5d4,
            this.isLightMode ? 2.4 : 3.2,
            14
        );
        this.cursorLight.position.set(0, 0, 4);
        this.profileScene.add(this.cursorLight);

        this.profileAmbientLight = new THREE.AmbientLight(0xffffff, this.isLightMode ? 1.7 : 1.2);
        this.profileScene.add(this.profileAmbientLight);

        const rimLight = new THREE.DirectionalLight(0x818cf8, 2.5);
        rimLight.position.set(-5, 5, 2);
        this.profileScene.add(rimLight);

        const goldRimLight = new THREE.DirectionalLight(0x6366f1, 2.0);
        goldRimLight.position.set(5, -4, 1);
        this.profileScene.add(goldRimLight);

        this.setupMedallionInteractions(container);
    }

    buildMedallionMeshes(texture) {
        const radius = 2.15;
        const depth = 0.16;

        // 1. Face avant : Portrait de Kossay
        const frontGeometry = new THREE.CircleGeometry(radius, 64);
        const frontMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.22,
            metalness: 0.08,
            side: THREE.FrontSide
        });
        this.frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
        this.frontMesh.position.z = depth / 2 + 0.005;
        this.medallionGroup.add(this.frontMesh);

        // 2. Face arrière : Insigne KB
        const backCanvas = document.createElement('canvas');
        backCanvas.width = 512;
        backCanvas.height = 512;
        const bCtx = backCanvas.getContext('2d');
        bCtx.fillStyle = '#0a0d16';
        bCtx.fillRect(0, 0, 512, 512);

        bCtx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
        bCtx.lineWidth = 4;
        bCtx.beginPath();
        bCtx.arc(256, 256, 220, 0, Math.PI * 2);
        bCtx.stroke();

        bCtx.strokeStyle = 'rgba(0, 245, 212, 0.7)';
        bCtx.lineWidth = 2;
        bCtx.setLineDash([12, 10]);
        bCtx.beginPath();
        bCtx.arc(256, 256, 180, 0, Math.PI * 2);
        bCtx.stroke();
        bCtx.setLineDash([]);

        bCtx.fillStyle = '#ffffff';
        bCtx.font = 'bold 110px "Space Grotesk", sans-serif';
        bCtx.textAlign = 'center';
        bCtx.textBaseline = 'middle';
        bCtx.fillText('KB', 256, 240);

        bCtx.fillStyle = '#00f5d4';
        bCtx.font = '600 24px "Inter", sans-serif';
        bCtx.fillText('SOFTWARE ENGINEER', 256, 320);

        const backTexture = new THREE.CanvasTexture(backCanvas);
        const backGeometry = new THREE.CircleGeometry(radius, 64);
        const backMaterial = new THREE.MeshStandardMaterial({
            map: backTexture,
            roughness: 0.3,
            metalness: 0.85,
            side: THREE.BackSide
        });
        const backMesh = new THREE.Mesh(backGeometry, backMaterial);
        backMesh.position.z = -depth / 2 - 0.005;
        this.medallionGroup.add(backMesh);

        // 3. Tranche cylindrique métallique
        const rimGeometry = new THREE.CylinderGeometry(radius, radius, depth, 64, 1, true);
        const rimMaterial = new THREE.MeshStandardMaterial({
            color: 0x4f46e5,
            metalness: 0.95,
            roughness: 0.18,
            side: THREE.DoubleSide
        });
        const cylinderMesh = new THREE.Mesh(rimGeometry, rimMaterial);
        cylinderMesh.rotation.x = Math.PI / 2;
        this.medallionGroup.add(cylinderMesh);

        // 4. Cadre extérieur biseauté (Bezel)
        const outerBezelGeo = new THREE.TorusGeometry(radius + 0.04, 0.09, 24, 80);
        const outerBezelMat = new THREE.MeshStandardMaterial({
            color: 0x818cf8,
            metalness: 0.95,
            roughness: 0.15
        });
        const outerBezel = new THREE.Mesh(outerBezelGeo, outerBezelMat);
        this.medallionGroup.add(outerBezel);

        // 5. Anneau néon
        const neonRingGeo = new THREE.RingGeometry(radius + 0.12, radius + 0.15, 64);
        const neonRingMat = new THREE.MeshBasicMaterial({
            color: 0x00f5d4,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
        });
        this.neonRing = new THREE.Mesh(neonRingGeo, neonRingMat);
        this.medallionGroup.add(this.neonRing);

        // 6. Anneaux gyroscopiques
        const gyro1Geo = new THREE.TorusGeometry(radius + 0.42, 0.028, 16, 80);
        const gyro1Mat = new THREE.MeshStandardMaterial({
            color: 0x6366f1,
            metalness: 0.9,
            roughness: 0.2
        });
        this.gyro1 = new THREE.Mesh(gyro1Geo, gyro1Mat);
        this.gyro1.rotation.x = Math.PI / 3.8;
        this.gyro1.rotation.y = Math.PI / 6;
        this.medallionGroup.add(this.gyro1);

        const gyro2Geo = new THREE.TorusGeometry(radius + 0.68, 0.022, 16, 80);
        const gyro2Mat = new THREE.MeshStandardMaterial({
            color: 0x00f5d4,
            metalness: 0.85,
            roughness: 0.3
        });
        this.gyro2 = new THREE.Mesh(gyro2Geo, gyro2Mat);
        this.gyro2.rotation.x = -Math.PI / 4.2;
        this.gyro2.rotation.z = Math.PI / 5;
        this.medallionGroup.add(this.gyro2);

        // 7. Particules d'ambiance
        const haloParticleCount = 80;
        const haloGeo = new THREE.BufferGeometry();
        const haloPos = new Float32Array(haloParticleCount * 3);
        for (let i = 0; i < haloParticleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = radius + 0.2 + Math.random() * 1.0;
            haloPos[i * 3] = Math.cos(angle) * dist;
            haloPos[i * 3 + 1] = Math.sin(angle) * dist;
            haloPos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
        }
        haloGeo.setAttribute('position', new THREE.BufferAttribute(haloPos, 3));
        const haloMat = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x818cf8,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
        });
        this.haloParticles = new THREE.Points(haloGeo, haloMat);
        this.medallionGroup.add(this.haloParticles);
    }

    revealProfileAnimation() {
        if (typeof gsap !== 'undefined') {
            gsap.to(this.medallionGroup.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.6,
                ease: 'power3.out'
            });
            gsap.from(this.medallionGroup.rotation, {
                y: -Math.PI * 1.5,
                x: 0.2,
                duration: 1.8,
                ease: 'power2.out'
            });
        } else {
            this.medallionGroup.scale.set(1, 1, 1);
        }
    }

    setupMedallionInteractions(container) {
        this.isDragging = false;
        this.previousPointerPosition = { x: 0, y: 0 };
        this.targetRotation = { x: 0, y: 0 };

        const onPointerDown = (e) => {
            this.isDragging = true;
            this.previousPointerPosition = {
                x: e.clientX || (e.touches && e.touches[0].clientX),
                y: e.clientY || (e.touches && e.touches[0].clientY)
            };
        };

        const onPointerMove = (e) => {
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            if (this.isDragging) {
                const deltaX = clientX - this.previousPointerPosition.x;
                const deltaY = clientY - this.previousPointerPosition.y;

                this.targetRotation.y += deltaX * 0.009;
                this.targetRotation.x += deltaY * 0.009;
                this.targetRotation.x = Math.max(-0.6, Math.min(0.6, this.targetRotation.x));

                this.previousPointerPosition = { x: clientX, y: clientY };
            }
        };

        const onPointerUp = () => {
            this.isDragging = false;
        };

        container.addEventListener('mousedown', onPointerDown);
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);

        container.addEventListener('touchstart', onPointerDown, { passive: true });
        window.addEventListener('touchmove', onPointerMove, { passive: true });
        window.addEventListener('touchend', onPointerUp);

        container.addEventListener('dblclick', () => {
            this.targetRotation.x = 0;
            this.targetRotation.y = 0;
        });
    }

    onResize() {
        if (this.bgCamera && this.bgRenderer) {
            const w = window.innerWidth;
            const h = window.innerHeight;
            this.bgCamera.aspect = w / h;
            this.bgCamera.updateProjectionMatrix();
            this.bgRenderer.setSize(w, h);
            this.bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }

        if (this.profileContainer && this.profileCamera && this.profileRenderer) {
            const pw = this.profileContainer.clientWidth;
            const ph = this.profileContainer.clientHeight;
            this.profileCamera.aspect = pw / ph;
            this.profileCamera.updateProjectionMatrix();
            this.profileRenderer.setSize(pw, ph);
            this.profileRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (!this.isRunning) return;

        const elapsedTime = this.clock.getElapsedTime();

        // 1. Mise à jour de la scène de fond
        if (this.bgScene && this.bgRenderer) {
            if (!this.isReducedMotion) {
                this.bgParticles.rotation.y = elapsedTime * 0.025;
                this.bgParticles.rotation.x = elapsedTime * 0.012;

                if (this.icoMesh) {
                    this.icoMesh.rotation.x += 0.004;
                    this.icoMesh.rotation.y += 0.006;
                    this.icoMesh.position.y = 14 + Math.sin(elapsedTime * 0.8) * 1.2;
                }

                if (this.knotMesh) {
                    this.knotMesh.rotation.x += 0.005;
                    this.knotMesh.rotation.z += 0.004;
                    this.knotMesh.position.y = -14 + Math.cos(elapsedTime * 0.7) * 1.5;
                }

                if (this.octMesh) {
                    this.octMesh.rotation.y += 0.007;
                    this.octMesh.position.y = 16 + Math.sin(elapsedTime * 1.1) * 1.0;
                }

                const targetCamX = this.mouse.normalizedX * 2.0;
                const targetCamY = this.mouse.normalizedY * 1.8 - (this.scrollY * 0.01);
                this.bgCamera.position.x += (targetCamX - this.bgCamera.position.x) * 0.05;
                this.bgCamera.position.y += (targetCamY - this.bgCamera.position.y) * 0.05;
            }

            this.bgRenderer.render(this.bgScene, this.bgCamera);
        }

        // 2. Mise à jour du médaillon 3D
        if (this.profileScene && this.profileRenderer && this.medallionGroup) {
            if (!this.isReducedMotion) {
                const floatY = Math.sin(elapsedTime * 1.6) * 0.12;
                this.medallionGroup.position.y = floatY;

                if (this.gyro1) {
                    this.gyro1.rotation.z += 0.012;
                    this.gyro1.rotation.y += 0.008;
                }
                if (this.gyro2) {
                    this.gyro2.rotation.z -= 0.009;
                    this.gyro2.rotation.x -= 0.007;
                }
                if (this.neonRing) {
                    this.neonRing.rotation.z += 0.006;
                    this.neonRing.material.opacity = 0.55 + Math.sin(elapsedTime * 3) * 0.25;
                }
                if (this.haloParticles) {
                    this.haloParticles.rotation.z = -elapsedTime * 0.1;
                }

                if (!this.isDragging) {
                    const mouseTiltX = -this.mouse.normalizedY * 0.35;
                    const mouseTiltY = this.mouse.normalizedX * 0.45;

                    this.targetRotation.x = mouseTiltX;
                    this.targetRotation.y = mouseTiltY;
                }

                this.medallionGroup.rotation.x += (this.targetRotation.x - this.medallionGroup.rotation.x) * 0.08;
                this.medallionGroup.rotation.y += (this.targetRotation.y - this.medallionGroup.rotation.y) * 0.08;

                if (this.cursorLight) {
                    const lightX = this.mouse.normalizedX * 3.5;
                    const lightY = this.mouse.normalizedY * 3.5;
                    this.cursorLight.position.x += (lightX - this.cursorLight.position.x) * 0.1;
                    this.cursorLight.position.y += (lightY - this.cursorLight.position.y) * 0.1;
                }
            }

            this.profileRenderer.render(this.profileScene, this.profileCamera);
        }
    }
}

// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        window.portfolio3D = new Portfolio3DEngine();
    }
});
