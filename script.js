// ================================================================================
// LANGUAGE TOGGLE — Bilingual ES/EN
// ================================================================================

const LANG_KEY = 'portfolio-lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'es';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);

    // Actualizar todos los elementos con data-es / data-en
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            // Si es un input/textarea, cambiar placeholder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Actualizar estado de los botones de idioma
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
    });
}

// Inicializar idioma al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);

    // Event listener para el toggle de idioma
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            // Si se clickea en una opción específica, usar ese idioma
            if (e.target.classList.contains('lang-option')) {
                const targetLang = e.target.dataset.lang;
                setLanguage(targetLang);
            } else {
                // Si se clickea en el botón general, alternar
                const newLang = currentLang === 'es' ? 'en' : 'es';
                setLanguage(newLang);
            }
        });
    }
});

// ================================================================================
// INTRO HERO & NAVBAR VISIBILITY
// ================================================================================

const navbar = document.querySelector('.navbar');
const introHero = document.querySelector('#intro-hero');
const viewWorkBtn = document.getElementById('view-work-btn');

// Mostrar navbar al hacer scroll o salir del intro-hero
function handleNavbarVisibility() {
    if (!introHero) return;

    const introHeight = introHero.offsetHeight;
    const scrolled = window.scrollY;

    if (scrolled > introHeight * 0.8) {
        navbar.classList.remove('navbar-hidden');
    } else {
        navbar.classList.add('navbar-hidden');
    }
}

// Botón "Ver mi trabajo" - scroll a la sección de proyectos
if (viewWorkBtn) {
    viewWorkBtn.addEventListener('click', () => {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            // Scroll con offset para centrar mejor
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = projectsSection.offsetTop - navbarHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        // Mostrar navbar inmediatamente
        setTimeout(() => {
            navbar.classList.remove('navbar-hidden');
        }, 300);
    });
}

// Detectar scroll para mostrar/ocultar navbar
if (introHero) {
    window.addEventListener('scroll', handleNavbarVisibility);
    // Verificar estado inicial
    handleNavbarVisibility();
}

// ================================================================================
// NAVBAR — Fixed navbar & Active section highlighting
// ================================================================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Highlight active section on scroll
function highlightActiveSection() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Si estamos cerca del final de la página, activar la última sección (contacto)
    if (scrollY + windowHeight >= documentHeight - 50) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
            const lastSectionId = lastSection.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${lastSectionId}`) {
                    link.classList.add('active');
                }
            });
            return;
        }
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll para links internos
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

window.addEventListener('scroll', highlightActiveSection);

// ================================================================================
// MOBILE MENU — Hamburger toggle
// ================================================================================

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');

        // Bloquear scroll del body cuando el menú está abierto
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ================================================================================
// INTERSECTION OBSERVER — Fade-in animations on scroll
// ================================================================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Opcional: dejar de observar después de la animación
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos los elementos con clase fade-in
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

// ================================================================================
// BACK BUTTON — Para páginas internas
// ================================================================================

const backButton = document.querySelector('.back-button');
if (backButton) {
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.back();
    });
}

// ================================================================================
// UTILITY FUNCTIONS
// ================================================================================

// Detectar si estamos en la página principal
function isHomePage() {
    const path = window.location.pathname;
    return path.endsWith('index.html') || path.endsWith('/') || !path.includes('/pages/') && !path.includes('/projects/');
}

// Log para debugging (remover en producción)
console.log('Portfolio initialized');
console.log('Current language:', currentLang);
console.log('Is home page:', isHomePage());

// ================================================================================
// INTERACTIVE PARTICLE CANVAS — Para intro-hero
// ================================================================================

const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 150 };

    // Ajustar canvas al tamaño de la ventana
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    // Detectar posición del mouse
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Clase Partícula
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() * 0.5) - 0.25;
            this.speedY = (Math.random() * 0.5) - 0.25;
            this.color = 'rgba(0, 217, 255, 0.8)';
        }

        update() {
            // Movimiento base
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebote en los bordes
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Interacción con el mouse
            if (mouse.x != null && mouse.y != null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - distance) / mouse.radius;
                    const moveX = Math.cos(angle) * force * 2;
                    const moveY = Math.sin(angle) * force * 2;

                    this.x += moveX;
                    this.y += moveY;
                }
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();

            // Glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(0, 217, 255, 0.5)';
        }
    }

    // Inicializar partículas
    function initParticles() {
        particlesArray = [];
        const numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000);
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Conectar partículas cercanas
    function connectParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i + 1; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = 1 - (distance / 120);
                    ctx.strokeStyle = `rgba(0, 217, 255, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animar
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    // Reinicializar solo si hay cambio significativo de tamaño (no por scroll en móvil)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;

            // Solo reinicializar si el ancho cambió (rotación o cambio de ventana real)
            // Ignorar cambios solo en altura (barra de direcciones en móvil)
            if (Math.abs(currentWidth - lastWidth) > 50) {
                resizeCanvas();
                initParticles();
                lastWidth = currentWidth;
                lastHeight = currentHeight;
            } else {
                // Solo ajustar el canvas sin reiniciar partículas
                resizeCanvas();
            }
        }, 150);
    });
}

// ================================================================================
// SKILLS CAROUSEL & MODAL — Carrusel automático + Modal al hacer click
// ================================================================================

const skillCards = document.querySelectorAll('.skill-card');
const skillsModal = document.getElementById('skills-modal');
const skillsModalOverlay = skillsModal?.querySelector('.skills-modal-overlay');
const skillsModalContent = skillsModal?.querySelector('.skills-modal-content');
const skillsModalClose = skillsModal?.querySelector('.skills-modal-close');
const skillsModalTitle = skillsModal?.querySelector('.skills-modal-title');
const skillsModalGrid = skillsModal?.querySelector('.skills-modal-grid');

// Array para guardar las instancias de carruseles
const carouselInstances = [];

skillCards.forEach((card, cardIndex) => {
    const carousel = card.querySelector('.skill-carousel');
    const items = carousel.querySelectorAll('.skill-item');

    const instance = {
        card: card,
        items: items,
        currentIndex: 0,
        intervalId: null,
        cardIndex: cardIndex
    };

    // TODAS las cards usan animación slide-horizontal
    const animationType = 'slide-horizontal';

    // Limpiar y configurar items
    items.forEach((item, index) => {
        item.classList.add(`anim-${animationType}`);
        item.classList.remove('active'); // Limpiar cualquier clase active previa
    });

    // Mostrar solo el primer item inicialmente
    if (items.length > 0) {
        items[0].classList.add('active');
    }

    // Función para cambiar al siguiente item
    function nextItem() {
        if (instance.items.length <= 1) return;

        instance.items[instance.currentIndex].classList.remove('active');
        instance.currentIndex = (instance.currentIndex + 1) % instance.items.length;
        instance.items[instance.currentIndex].classList.add('active');
    }

    // Iniciar carrusel automático con efecto "ola" (delay escalonado)
    function startCarousel() {
        if (instance.items.length <= 1) return;

        // Limpiar intervalo anterior si existe
        if (instance.intervalId) {
            clearInterval(instance.intervalId);
            instance.intervalId = null;
        }

        // Delay inicial para crear efecto ola
        const waveDelay = cardIndex * 500;

        setTimeout(() => {
            instance.intervalId = setInterval(nextItem, 2000); // Cambia cada 2 segundos
        }, waveDelay);
    }

    // Detener carrusel
    function stopCarousel() {
        if (instance.intervalId) {
            clearInterval(instance.intervalId);
            instance.intervalId = null;
        }
    }

    // Guardar funciones en la instancia
    instance.start = startCarousel;
    instance.stop = stopCarousel;

    // Mostrar modal con todas las skills
    function showSkillsModal() {
        const title = card.querySelector('.skill-card-title').textContent;
        skillsModalTitle.textContent = title;

        // Limpiar grid anterior
        skillsModalGrid.innerHTML = '';

        // Agregar todos los items al modal
        items.forEach(item => {
            const modalItem = document.createElement('div');
            modalItem.className = 'skills-modal-item';

            // Clonar el icono
            const icon = item.querySelector('i, svg').cloneNode(true);
            const text = document.createElement('span');
            text.textContent = item.querySelector('span').textContent;

            modalItem.appendChild(icon);
            modalItem.appendChild(text);
            skillsModalGrid.appendChild(modalItem);
        });

        // Mostrar modal
        skillsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Event listener - Click para abrir modal
    card.addEventListener('click', (e) => {
        e.preventDefault();
        // Detener TODOS los carruseles
        carouselInstances.forEach(inst => inst.stop());
        showSkillsModal();
    });

    // Guardar instancia
    carouselInstances.push(instance);

    // Iniciar el carrusel con efecto ola
    startCarousel();
});

// Función para reiniciar todos los carruseles
function restartAllCarousels() {
    carouselInstances.forEach(instance => {
        // Reiniciar al primer item
        instance.items.forEach(item => item.classList.remove('active'));
        instance.currentIndex = 0;
        instance.items[0].classList.add('active');

        // Reiniciar carrusel
        instance.start();
    });
}

// Event listeners para cerrar el modal
if (skillsModalClose) {
    skillsModalClose.addEventListener('click', () => {
        skillsModal.classList.remove('active');
        document.body.style.overflow = '';
        restartAllCarousels();
    });
}

if (skillsModalOverlay) {
    skillsModalOverlay.addEventListener('click', () => {
        skillsModal.classList.remove('active');
        document.body.style.overflow = '';
        restartAllCarousels();
    });
}

// ================================================================================
// BACKEND WARM-UP — Precarga de backends en Render para mejorar UX
// ================================================================================

// Detectar clicks en enlaces con atributo data-warmup-url
document.addEventListener('DOMContentLoaded', () => {
    const linksWithWarmup = document.querySelectorAll('[data-warmup-url]');

    linksWithWarmup.forEach(link => {
        link.addEventListener('click', (e) => {
            const warmupUrl = link.getAttribute('data-warmup-url');

            if (warmupUrl) {
                // Hacer fetch silencioso para despertar el backend de Render
                fetch(warmupUrl, {
                    method: 'HEAD',  // HEAD request para no cargar datos innecesarios
                    mode: 'no-cors'  // Evitar errores de CORS
                })
                .catch(err => {
                    // Ignorar errores silenciosamente - el objetivo es solo despertar el servidor
                    console.log('Backend warm-up iniciado para:', warmupUrl);
                });

                console.log('🚀 Backend precargándose:', warmupUrl);
            }
        });
    });
});

// ================================================================================
// 3D MODEL — Modelo 3D rotando en sección "Sobre mí"
// ================================================================================

const aboutCanvas = document.getElementById('about-3d-canvas');
if (aboutCanvas && typeof THREE !== 'undefined') {
    // Configuración de la escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: aboutCanvas,
        alpha: true,
        antialias: true
    });

    // Dimensiones iniciales
    const isMobile = window.innerWidth <= 768;
    const initialSize = isMobile ? 250 : 350;
    renderer.setSize(initialSize, initialSize);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Fondo completamente transparente
    camera.position.z = 5; // Alejar cámara para ver mejor

    // Variable para el modelo
    let model = null;

    // Luces (más intensas para ver el modelo)
    const pointLight1 = new THREE.PointLight(0xffffff, 2);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00d9ff, 1.5);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Función para crear modelo fallback (geometría simple)
    function createFallbackModel() {
        console.log('🔄 Creando modelo fallback (cohete estilizado)');

        const group = new THREE.Group();

        // Material del cuerpo (blanco brillante)
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: 0xeeeeee,
            metalness: 0.5,
            roughness: 0.3
        });

        // Material de detalles (rojo/cyan)
        const detailMaterial = new THREE.MeshStandardMaterial({
            color: 0xff3333,
            metalness: 0.6,
            roughness: 0.2
        });

        const finMaterial = new THREE.MeshStandardMaterial({
            color: 0x00d9ff,
            metalness: 0.8,
            roughness: 0.1
        });

        // Cuerpo principal
        const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 32);
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        group.add(body);

        // Banda roja decorativa
        const bandGeometry = new THREE.CylinderGeometry(0.31, 0.31, 0.3, 32);
        const band = new THREE.Mesh(bandGeometry, detailMaterial);
        band.position.y = 0.2;
        group.add(band);

        // Punta del cohete (roja)
        const coneGeometry = new THREE.ConeGeometry(0.3, 0.6, 32);
        const cone = new THREE.Mesh(coneGeometry, detailMaterial);
        cone.position.y = 1.05;
        group.add(cone);

        // Ventana
        const windowGeometry = new THREE.CircleGeometry(0.15, 32);
        const windowMaterial = new THREE.MeshStandardMaterial({
            color: 0x88ddff,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0x4499ff,
            emissiveIntensity: 0.3
        });
        const window = new THREE.Mesh(windowGeometry, windowMaterial);
        window.position.set(0, 0.5, 0.31);
        group.add(window);

        // Aletas (4 aletas cyan)
        const finGeometry = new THREE.BoxGeometry(0.08, 0.5, 0.35);
        for (let i = 0; i < 4; i++) {
            const fin = new THREE.Mesh(finGeometry, finMaterial);
            const angle = (i * 90) * (Math.PI / 180);
            fin.position.x = Math.cos(angle) * 0.32;
            fin.position.z = Math.sin(angle) * 0.32;
            fin.position.y = -0.5;
            fin.rotation.y = angle;
            group.add(fin);
        }

        // Motor (base oscura)
        const engineGeometry = new THREE.CylinderGeometry(0.25, 0.2, 0.2, 32);
        const engineMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.8,
            roughness: 0.2
        });
        const engine = new THREE.Mesh(engineGeometry, engineMaterial);
        engine.position.y = -0.85;
        group.add(engine);

        group.scale.set(0.8, 0.8, 0.8);

        return group;
    }

    // Cargar modelo GLB con fallback
    console.log('GLTFLoader disponible:', typeof THREE.GLTFLoader !== 'undefined');

    // Determinar la ruta correcta según el protocolo
    const isFileProtocol = window.location.protocol === 'file:';
    const rocketPath = 'assets/models/rocket.glb'; // Ruta relativa para que funcione en localhost y GitHub Pages

    if (typeof THREE.GLTFLoader !== 'undefined' && !isFileProtocol) {
        const loader = new THREE.GLTFLoader();

        console.log('Intentando cargar cohete desde:', rocketPath);

        loader.load(
            rocketPath,
            function (gltf) {
                model = gltf.scene;
                model.scale.set(1.4, 1.4, 1.4);
                model.position.set(0, 0, 0);

                // NO modificar materiales - usar colores/texturas originales del modelo

                scene.add(model);
                console.log('✅ Cohete GLB cargado con colores originales');
            },
            function (xhr) {
                if (xhr.lengthComputable) {
                    const percent = (xhr.loaded / xhr.total * 100).toFixed(2);
                    console.log('Cargando cohete: ' + percent + '%');
                }
            },
            function (error) {
                console.error('❌ Error cargando cohete GLB, usando fallback');
                model = createFallbackModel();
                scene.add(model);
            }
        );
    } else {
        // Usar fallback directamente si es file:// o no hay GLTFLoader
        console.log('⚠️ Usando modelo fallback (file:// o GLTFLoader no disponible)');
        model = createFallbackModel();
        scene.add(model);
    }

    // Controles interactivos (mouse/touch)
    let controls = null;
    if (typeof THREE.OrbitControls !== 'undefined') {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.rotateSpeed = 1.0;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 15.0; // Rotación muy rápida
    }

    // Animación
    function animate3D() {
        requestAnimationFrame(animate3D);

        // Actualizar controles
        if (controls) {
            controls.update();
        } else if (model) {
            // Fallback: rotación automática si no hay controles
            model.rotation.y += 0.05;
        }

        renderer.render(scene, camera);
    }

    animate3D();

    // Responsive
    function resize3D() {
        const container = aboutCanvas.parentElement;
        const isMobile = window.innerWidth <= 768;
        const maxSize = isMobile ? 250 : 350;
        const size = Math.min(container.offsetWidth, maxSize);
        renderer.setSize(size, size);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', resize3D);
    resize3D();
}
