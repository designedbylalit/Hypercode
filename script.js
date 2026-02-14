document.addEventListener('DOMContentLoaded', () => {

    // === "Living" Header Logic ===
    const header = document.querySelector('.main-header');
    if (header) {
        const scrollThreshold = 50;
        function handleHeaderScroll() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
        window.addEventListener('scroll', handleHeaderScroll);
        handleHeaderScroll();
    }
    
    // === [MASTERPIECE UPGRADE] The "Unveiling" Animation ===
    const contentToReveal = document.querySelectorAll('.content-hidden-initial');
    
    function smoothType(element, text, callback) {
        if (!element) return; let index = 0;
        function type() {
            if (index < text.length) {
                element.innerHTML = text.slice(0, index + 1) + '<span class="cursor"></span>';
                index++; const randomDelay = Math.random() * 80 + 40;
                setTimeout(type, randomDelay);
            } else { 
                element.innerHTML = text; 
                if (callback) callback();
            }
        }
        type();
    }
    
    function startHeroTyping() { 
        const heroHeadline = document.getElementById('hero-headline'); 
        smoothType(heroHeadline, "A New Era of Web Design"); 
    }

    contentToReveal.forEach(el => {
        el.classList.remove('content-hidden-initial');
        el.classList.add('content-visible');
    });

    startHeroTyping();

    // === [MOBILE MASTERPIECE] Performance-First Particle Engine ===
    const isMobile = window.innerWidth <= 768;

    const desktopParticlesConfig = {
        fullScreen: { enable: false },
        particles: {
            number: { value: 40, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 0.4, opacity_min: 0.1, sync: false } },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 },
            move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "connect" }, onclick: { enable: true, mode: "repulse" }, resize: true },
            modes: { connect: { distance: 80, line_linked: { opacity: 0.5 } }, repulse: { distance: 100, duration: 0.4 } }
        },
        retina_detect: true
    };

    const mobileParticlesConfig = {
        fullScreen: { enable: false },
        particles: {
            number: { value: 15, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true },
            size: { value: 2, random: true },
            line_linked: { enable: false },
            move: { enable: true, speed: 0.8, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
        },
        retina_detect: true
    };
    
    tsParticles.load("particles-js", isMobile ? mobileParticlesConfig : desktopParticlesConfig);

    const animatedElements = document.querySelectorAll('.animated-section, .stagger-container, .anim-child');
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (entry.target.classList.contains('stagger-container')) {
                    const children = entry.target.querySelectorAll('.anim-child');
                    children.forEach((child, idx) => { child.style.transitionDelay = `${idx * 150}ms`; });
                }
            } else {
                if (!entry.target.classList.contains('hero')) { entry.target.classList.remove('is-visible'); }
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => elementObserver.observe(el));
    const animatedHeadings = document.querySelectorAll('.animate-typing');
    const animatedHeadingsSet = new Set();
    const headingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedHeadingsSet.has(entry.target)) {
                const heading = entry.target;
                const text = heading.textContent;
                animatedHeadingsSet.add(heading);
                heading.textContent = '';
                smoothType(heading, text);
            }
        });
    }, { threshold: 0.8 });
    animatedHeadings.forEach(heading => headingObserver.observe(heading));
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const mainNavLinks = document.querySelectorAll('.main-nav .nav-links a');
    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('is-active');
            mainNav.classList.toggle('is-active');
        });
    }
    mainNavLinks.forEach(link => link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('is-active');
        mainNav.classList.remove('is-active');
    }));
    const interactiveCards = document.querySelectorAll('.process-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--glow-x', `${x}px`);
            card.style.setProperty('--glow-y', `${y}px`);
            card.style.setProperty('--glow-opacity', '1');
        });
        card.addEventListener('mouseleave', () => { card.style.setProperty('--glow-opacity', '0'); });
    });

    // === ACTIVE NAVIGATION ON SCROLL ===
    const sections = document.querySelectorAll('main > section[id]');
    const headerNavLinks = document.querySelectorAll('.main-nav .nav-links a');
    const observerOptions = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`.main-nav .nav-links a[href="#${id}"]`);
            if (entry.isIntersecting) {
                headerNavLinks.forEach(link => link.classList.remove('active-link'));
                if (correspondingLink) { correspondingLink.classList.add('active-link'); }
            }
        });
    }, observerOptions);
    sections.forEach(section => { sectionObserver.observe(section); });
// === [DEFINITIVE & COMPLETE] PROJECT MODAL LOGIC ===
const modalContainer = document.getElementById('modal-container');
const projectCards = document.querySelectorAll('.project-card');

const projectData = {
    neurobeads: { 
        title: "NEURO BEADS", 
        subtitle: "Educational Abacus Training Website", 
        imageUrl: "img/1.png", 
        link: "https://neurobeads.com",
        description: "<p>A live educational platform designed to build trust with its primary audience: parents and students. The architecture prioritizes clarity, simple navigation, and a professional, reassuring tone. The site effectively communicates the benefits of abacus training, making a traditional learning tool feel modern and accessible for a new generation.</p>" 
    },
    innocore: { 
        title: "InnoCore Labs", 
        subtitle: "Modern SaaS & Innovation Agency", 
        imageUrl: "img/2.png", 
        link: "https://www.innocorelabs.com/",
        description: "<p>A modern SaaS/innovation agency landing page. Focused on clean UI, bold headings, and product-first storytelling for tech teams. The design uses a sleek, dark aesthetic to convey technological sophistication, while clear calls-to-action guide users towards conversion.</p>" 
    },
    couplet: { 
        title: "Couplet Coffee", 
        subtitle: "Playful & High-Converting E-commerce", 
        imageUrl: "img/3.png", 
        link: "https://coupletcoffee.com/",
        description: "<p>This project demonstrates how a modern e-commerce brand can use playful interactions and a clean, product-focused design to create a delightful shopping experience. The focus was on vibrant branding and a frictionless user journey, designed to turn casual visitors into loyal customers.</p>" 
    }
};

function openModal(projectId) {
    const data = projectData[projectId];
    if (!data || !modalContainer) return;
    
    const visitSiteButton = `<a href="${data.link}" target="_blank" rel="noopener noreferrer" class="cta-button modal-cta">Visit Live Site</a>`;

    const modalHTML = `
        <div class="modal-content">
            <button class="modal-close-btn" aria-label="Close modal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            <h2 class="modal-title">${data.title}</h2>
            <p class="modal-subtitle">${data.subtitle}</p>
            <div class="modal-body">
                <img src="${data.imageUrl}" alt="${data.title}">
                ${data.description}
                ${visitSiteButton}
            </div>
        </div>`;
        
    modalContainer.innerHTML = modalHTML;
    modalContainer.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    modalContainer.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modalContainer.addEventListener('click', (e) => { if (e.target === modalContainer) closeModal(); });
}

function closeModal() {
    if (!modalContainer) return;
    modalContainer.classList.remove('is-visible');
    document.body.style.overflow = '';
    setTimeout(() => { modalContainer.innerHTML = ''; }, 400);
}

if (modalContainer && projectCards.length) {
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            openModal(projectId);
        });
    });
}
    // === [PERFORMANCE UPGRADE] Lazy-Loading the Masterpiece Engine ===
    const showcaseSection = document.getElementById('work');

    const showcaseObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initializeMasterpieceEngine();
                observer.unobserve(showcaseSection);
            }
        });
    }, { rootMargin: "200px" });

    if (showcaseSection) {
        showcaseObserver.observe(showcaseSection);
    }

    function initializeMasterpieceEngine() {
        const masterpieceSandboxStyle = document.getElementById('sandbox-style');
        const masterpieceCssEditor = document.getElementById('code-css');
        if (masterpieceCssEditor && masterpieceSandboxStyle) {
            const codeElement = masterpieceCssEditor.querySelector('code');
            const baseCodeTemplate = codeElement.textContent;
            const injectionHook = '/*--AI-HOOK--*/';
            const updateLiveStyles = () => { masterpieceSandboxStyle.textContent = codeElement.textContent; };
            updateLiveStyles();
            const editorObserver = new MutationObserver(updateLiveStyles);
            editorObserver.observe(codeElement, { childList: true, characterData: true, subtree: true });
            const aiButton = document.getElementById('ai-suggestion-btn');
            const aiPromptAction = document.getElementById('ai-prompt-action');
            const liveCard = document.getElementById('live-card');
            const visualView = document.getElementById('visual-view');
            let isTyping = false; let suggestionIndex = 0; let currentCleanup = null; let effectIsActive = false;
            liveCard.addEventListener('mouseenter', () => { if (!effectIsActive) { liveCard.classList.add('live-card--is-hovered'); } });
            liveCard.addEventListener('mouseleave', () => { if (!effectIsActive) { liveCard.classList.remove('live-card--is-hovered'); } });
            const holographicShineEffect = (card) => {
                card.classList.add('live-card--holographic', 'live-card--text-hidden');
                const onMouseMove = (e) => { const rect = card.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; card.style.setProperty('--glow-x', `${x}px`); card.style.setProperty('--glow-y', `${y}px`); card.style.setProperty('--glow-opacity', '1'); };
                const onMouseLeave = () => { card.style.setProperty('--glow-opacity', '0'); };
                card.addEventListener('mousemove', onMouseMove); card.addEventListener('mouseleave', onMouseLeave);
                return () => { card.removeEventListener('mousemove', onMouseMove); card.removeEventListener('mouseleave', onMouseLeave); card.classList.remove('live-card--holographic', 'live-card--text-hidden'); card.style.setProperty('--glow-opacity', '0'); };
            };
            const particleShatterEffect = (card) => {
                const content = card.querySelector('.live-card-content'); const headline = content.querySelector('#live-card-headline'); content.classList.add('content-is-hidden'); const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d', { willReadFrequently: true }); visualView.appendChild(canvas); canvas.className = 'particle-text-canvas'; let particles = []; let animationFrameId; let mouse = { x: undefined, y: undefined, radius: 80 };
                const mouseMoveHandler = (e) => { const rect = visualView.getBoundingClientRect(); mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top; };
                const mouseLeaveHandler = () => { mouse.x = undefined; mouse.y = undefined; };
                visualView.addEventListener('mousemove', mouseMoveHandler); visualView.addEventListener('mouseleave', mouseLeaveHandler);
                class Particle { constructor(x, y, color) { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.baseX = x; this.baseY = y; this.color = color; this.density = (Math.random() * 20) + 10; this.size = 2; this.vx = 0; this.vy = 0; } draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.closePath(); ctx.fill(); } update() { let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.sqrt(dx * dx + dy * dy); if (distance < mouse.radius && mouse.x !== undefined) { let forceDirectionX = dx / distance; let forceDirectionY = dy / distance; let force = (mouse.radius - distance) / mouse.radius; this.vx -= forceDirectionX * force * this.density; this.vy -= forceDirectionY * force * this.density; } this.vx += (this.baseX - this.x) * 0.05; this.vy += (this.baseY - this.y) * 0.05; this.vx *= 0.95; this.vy *= 0.95; this.x += this.vx; this.y += this.vy; } }
                function init() { canvas.width = visualView.clientWidth; canvas.height = visualView.clientHeight; particles = []; const style = getComputedStyle(headline); const text = headline.textContent; ctx.fillStyle = 'white'; ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, canvas.width / 2, canvas.height / 2); const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); ctx.clearRect(0, 0, canvas.width, canvas.height); for (let y = 0; y < imageData.height; y += 4) { for (let x = 0; x < imageData.width; x += 4) { if (imageData.data[(y * 4 * imageData.width) + (x * 4) + 3] > 128) { particles.push(new Particle(x, y, `hsl(${Math.random() * 360}, 100%, 75%)`)); } } } }
                function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.draw(); p.update(); }); animationFrameId = requestAnimationFrame(animate); }
                init(); animate();
                return () => { cancelAnimationFrame(animationFrameId); visualView.removeEventListener('mousemove', mouseMoveHandler); visualView.removeEventListener('mouseleave', mouseLeaveHandler); if (canvas.parentNode) { visualView.removeChild(canvas); } content.classList.remove('content-is-hidden'); };
            };
            const matrixGridEffect = (card) => { card.classList.add('live-card--text-hidden'); const canvas = document.createElement('canvas'); canvas.className = 'matrix-canvas'; card.prepend(canvas); const ctx = canvas.getContext('2d'); canvas.width = card.offsetWidth; canvas.height = card.offsetHeight; const alphabet = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; const fontSize = 16; const columns = canvas.width / fontSize; const rainDrops = Array.from({length: columns}).fill(1); let animationFrameId; let isAnimating = false; const draw = () => { if (!isAnimating) return; ctx.fillStyle = 'rgba(15, 15, 27, 0.1)'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#0F0'; ctx.font = fontSize + 'px monospace'; for (let i = 0; i < rainDrops.length; i++) { ctx.fillText(alphabet.charAt(Math.floor(Math.random() * alphabet.length)), i * fontSize, rainDrops[i] * fontSize); if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) { rainDrops[i] = 0; } rainDrops[i]++; } animationFrameId = requestAnimationFrame(draw); }; const startAnimation = () => { if (!isAnimating) { isAnimating = true; draw(); }}; const stopAnimation = () => { isAnimating = false; }; card.addEventListener('mouseenter', startAnimation); card.addEventListener('mouseleave', stopAnimation); return () => { stopAnimation(); cancelAnimationFrame(animationFrameId); card.removeEventListener('mouseenter', startAnimation); card.removeEventListener('mouseleave', stopAnimation); if(canvas.parentNode) { canvas.remove(); } card.classList.remove('live-card--text-hidden'); }; };
            const enterCyberspaceEffect = (card) => { card.classList.add('live-card--text-hidden'); const wrapper = document.createElement('div'); wrapper.className = 'cyberspace-wrapper'; const grid = document.createElement('div'); grid.className = 'cyberspace-grid'; wrapper.appendChild(grid); card.prepend(wrapper); const onMouseMove = (e) => { const rect = card.getBoundingClientRect(); const pX = (e.clientX - rect.left) / rect.width; const pY = (e.clientY - rect.top) / rect.height; grid.style.setProperty('--grid-pos-x', `${(pX - 0.5) * -1000}px`); grid.style.setProperty('--grid-pos-y', `${(pY - 0.5) * -1000}px`); grid.style.setProperty('--grid-rotate-x', `${70 + (pY * 20)}deg`); grid.style.setProperty('--grid-translate-y', `${(pY * 80) - 40}px`); }; const onMouseLeave = () => { grid.style.setProperty('--grid-pos-x', `0px`); grid.style.setProperty('--grid-pos-y', `0px`); grid.style.setProperty('--grid-rotate-x', `75deg`); } ; card.addEventListener('mousemove', onMouseMove); card.addEventListener('mouseleave', onMouseLeave); return () => { card.removeEventListener('mousemove', onMouseMove); card.removeEventListener('mouseleave', onMouseLeave); if(wrapper.parentNode) { wrapper.remove(); } card.classList.remove('live-card--text-hidden'); }; };
            const glyphStreamAnimator = (card) => { const headline = card.querySelector('#live-card-headline'); if (!headline) return () => {}; card.classList.add('live-card--glyph-active'); const originalText = headline.textContent; const glyphs = 'アァカサタナハマヤラワガザダバパイキシチニヒミリギジヂビピウクスツヌフムユルグズブプエケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン#$@&^*'; let characters = []; let animationFrameId; let mouse = { x: 0, y: 0 }; headline.innerHTML = originalText.split('').map(char => `<span class="glyph-char">${char}</span>`).join(''); headline.classList.add('glyph-active'); Array.from(headline.children).forEach((span, index) => { characters.push({ span: span, original: originalText[index], x: span.offsetLeft + span.offsetWidth / 2, y: span.offsetTop + span.offsetHeight / 2, cycle: Math.random() * 100 }); }); const mouseMoveHandler = (e) => { const rect = headline.getBoundingClientRect(); mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top; }; card.addEventListener('mousemove', mouseMoveHandler); const animate = () => { characters.forEach(char => { const dx = mouse.x - char.x; const dy = mouse.y - char.y; const distance = Math.sqrt(dx * dx + dy * dy); if (distance < 75) { char.span.textContent = char.original; char.span.classList.add('resolved'); } else { if (char.cycle++ % 4 === 0) { char.span.textContent = glyphs[Math.floor(Math.random() * glyphs.length)]; } char.span.classList.remove('resolved'); } }); animationFrameId = requestAnimationFrame(animate); }; animate(); return () => { cancelAnimationFrame(animationFrameId); card.removeEventListener('mousemove', mouseMoveHandler); headline.classList.remove('glyph-active'); headline.innerHTML = originalText; card.classList.remove('live-card--glyph-active'); }; };
            const aiMasterpieceSuggestions = [
                { prompt: '✨ Add "Holographic Shine"', code: `/* A holographic sheen now follows your\n   cursor, revealing a hidden glow. */\n  animation-play-state: paused;\n  border-color: rgba(255, 255, 255, 0.5);`, jsEffect: holographicShineEffect, needsInstruction: true },
                { prompt: '🚀 Navigate "Cyberspace"', code: `/* You now have direct control over this\n   infinite grid. Move your cursor to fly. */\n  animation-play-state: paused;\n  border-color: #00FFFF;\n  background: transparent;`, jsEffect: enterCyberspaceEffect, needsInstruction: true },
                { prompt: '💎 Create a "3D Tilt" Effect', code: `/* The card tilts in 3D to follow your mouse. */\n  animation-play-state: paused;\n  transition: transform 0.1s ease-out;\n  transform-style: preserve-3d;\n}`, jsEffect: (card) => { card.classList.add('live-card--text-hidden'); const maxRotate = 15; const onMouseMove = (e) => { const rect = card.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top; const pX = x / rect.width; const pY = y / rect.height; const rY = (pX - 0.5) * 2 * maxRotate; const rX = -(pY - 0.5) * 2 * maxRotate; card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1.05)`; }; const onMouseLeave = () => { card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`; } ; card.addEventListener('mousemove', onMouseMove); card.addEventListener('mouseleave', onMouseLeave); return () => { card.removeEventListener('mousemove', onMouseMove); card.removeEventListener('mouseleave', onMouseLeave); card.style.transform = ''; card.classList.remove('live-card--text-hidden'); }; }, needsInstruction: true },
                { prompt: '💥 Cause a "Pixel Explosion"', code: `/* This JS effect deconstructs the headline\n   into interactive particles. */\n  animation-play-state: paused;\n}\n/* This CSS is now handled by the JS effect */`, jsEffect: particleShatterEffect, needsInstruction: true },
                { prompt: 'decode("Glyph Stream");', code: `/* The text becomes an interactive glyph\n   field. Decode it with your cursor. */\n  animation-play-state: paused;\n  border-color: var(--gradient-end);`, jsEffect: glyphStreamAnimator, needsInstruction: true },
                { prompt: 'Activate "Matrix Grid"', code: `/* The background dissolves into digital rain.\n   The effect activates when you hover. */\n  background: transparent;\n  animation-play-state: paused;\n  border-color: #0F0;`, jsEffect: matrixGridEffect, needsInstruction: false }
            ];
            const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
            function showInstructionalFlash() { const existingFlash = visualView.querySelector('.instruction-flash'); if (existingFlash) { existingFlash.remove(); } const instruction = document.createElement('div'); instruction.className = 'instruction-flash'; instruction.innerHTML = `<p>${isTouchDevice ? "Now, touch and move on the card." : "Now, move your cursor over the card."}</p>`; visualView.appendChild(instruction); setTimeout(() => instruction.classList.add('active'), 10); const removeInstruction = () => { if (instruction.parentElement) { instruction.remove(); } }; visualView.addEventListener('mousemove', removeInstruction, { once: true }); visualView.addEventListener('touchstart', removeInstruction, { once: true }); }
            const typeText = (element, text, speed) => new Promise(resolve => { let i = 0; element.textContent = ''; const interval = setInterval(() => { if (i < text.length) { element.textContent += text.charAt(i++); } else { clearInterval(interval); resolve(); } }, speed); });
            async function injectCode() { if (isTyping) return; isTyping = true; effectIsActive = true; aiButton.disabled = true; aiButton.classList.add('is-thinking'); masterpieceCssEditor.classList.add('is-thinking'); aiPromptAction.textContent = "Augmenting..."; liveCard.classList.remove('live-card--is-hovered'); if (currentCleanup) { currentCleanup(); currentCleanup = null; } liveCard.style.cssText = ''; const suggestion = aiMasterpieceSuggestions[suggestionIndex]; const newFullCode = baseCodeTemplate.replace(injectionHook, suggestion.code); await typeText(codeElement, newFullCode, 10); if (suggestion.jsEffect) { currentCleanup = suggestion.jsEffect(liveCard); } if (suggestion.needsInstruction) { showInstructionalFlash(); } suggestionIndex = (suggestionIndex + 1) % aiMasterpieceSuggestions.length; aiPromptAction.textContent = aiMasterpieceSuggestions[suggestionIndex].prompt; masterpieceCssEditor.classList.remove('is-thinking'); aiButton.classList.remove('is-thinking'); aiButton.disabled = false; isTyping = false; }
            aiPromptAction.textContent = aiMasterpieceSuggestions[0].prompt;
            aiButton.addEventListener('click', injectCode);
        }
    }

   // === [FINAL & COMPLETE MASTERPIECE FORM LOGIC] ===
const formContainer = document.getElementById('conversational-form');
if(formContainer) {
    const progressBar = document.getElementById('form-progress-bar');
    let currentStep = 0;
    const userSelection = {};
    let stepHistory = [0]; 

    const formSteps = {
        initial: { question: "What masterpiece can we build for you?", type: 'initial-choice', choices: [ { id: 'build-website', label: 'Build My New Website' }, { id: 'boost-speed', label: 'Boost My Website Speed' }, { id: 'design-ui', label: 'Design My App / Website UI' }, { id: 'create-logo', label: 'Create My Logo' }, { id: 'create-banner', label: 'Design My Banner / Poster' }, { id: 'something-else', label: 'Something Else – Let’s Talk' } ] },
        'build-website': { question: "Choose the best path for your business:", type: 'package-selection', packages: [ { title: 'Starter Site', benefit: 'Get Online Fast and Look Professional.', features: ['1-Page Website', 'Mobile-Friendly Design', 'WhatsApp/Contact Form'], timeline: '3-5 Days', price: '₹8,500 – ₹12,500' }, { title: 'Growth-Ready Site', benefit: 'Tell Your Full Story and Impress Visitors.', features: ['Multi-Section Page', 'Basic Animations', 'SEO-Friendly Structure'], timeline: '7-10 Days', price: '₹16,000 – ₹24,000' }, { title: 'Business Website', popular: true, glow: 'hyper-glow-purple', benefit: 'Attract More Customers and Rank on Google.', features: ['3-5 Pages', 'Advanced SEO & Speed', 'Easy-Update Admin Panel'], timeline: '15-20 Days', price: '₹28,000 – ₹45,000' }, { title: 'Premium Website', glow: 'hyper-glow-blue', benefit: 'Become a Market Leader with a World-Class Experience.', features: ['5+ Pages', 'Elite UI/UX', 'CMS Integration'], timeline: '~1 Month', price: 'Starting at ₹50,000+' } ] },
        'boost-speed': { question: "Select a performance solution:", type: 'package-selection', packages: [ { title: 'Performance Audit', benefit: 'Discover Exactly Why Your Site is Slow.', features: ['Detailed Performance Report', 'Actionable Recommendations', 'Clear "Next Steps" Guide'], timeline: '3 Days', price: '₹1,500 – ₹2,500' }, { title: 'Audit & Implementation', benefit: "Stop Losing Visitors to a Slow Website.", features: ['Full Audit & Fixes', 'Image & Asset Optimization', 'Before & After Report'], timeline: '10 Days', price: 'Starting at 10,000 – ₹15,000', popular: true, glow: 'hyper-glow-purple' }, { title: 'Custom Solution', benefit: "Have a unique performance challenge? Let's talk.", features: ['Bespoke Optimization', 'Ongoing Support', 'Dedicated Consultation'], timeline: 'Project-Based', price: 'Based on Needs', custom: true } ] },
        'design-ui': { question: "Choose a design package:", type: 'package-selection', packages: [ { title: 'Hero Section Concept', benefit: 'Capture Attention with a Stunning First Impression.', features: ['1 Stunning Home Page Design', 'Mobile Responsive View', 'Figma Source File'], timeline: '3-5 Days', price: '₹4,500 – ₹7,500' }, { title: 'Multi-Screen App/Site UI', benefit: "Give Your Users an Experience They'll Love.", features: ['Up to 5 Core Screens', 'Interactive Prototype', 'Mobile & Desktop Views'], timeline: '15-20 Days', price: '₹25,000 – ₹45,000', popular: true, glow: 'hyper-glow-purple' }, { title: 'Complete UX/UI System', benefit: "A Deep Dive into User-Centric Design.", features: ['User Research', 'Wireframes', 'Full Design System'], timeline: '1+ Month', price: 'Starting at ₹70,000+', glow: 'hyper-glow-blue' } ] },
        'create-logo': { question: "Select your brand identity solution:", type: 'package-selection', packages: [ { title: 'Startup Logo Kit', benefit: 'Get a Unique, Memorable Logo for Your Brand.', features: ['2 Professional Concepts', 'High-Res Files (PNG/SVG/JPG)', 'Transparent Backgrounds'], timeline: '3-5 Days', price: '₹3,500 – ₹5,500' }, { title: 'Brand Identity Kit', benefit: "Build a Complete and Consistent Brand Image.", features: ['3 Premium Concepts', 'Full Brand Guide', 'Social Media Profile Pictures'], timeline: '7-10 Days', price: '₹12,000 – ₹18,000', popular: true, glow: 'hyper-glow-purple' }, { title: 'Custom Branding', benefit: "Need more than a logo? Let's craft your full story.", features: ['Full Brand Strategy', 'Custom Illustrations', 'Packaging Design'], timeline: 'Project-Based', price: 'Based on Scope', custom: true } ] },
        'create-banner': { question: "Choose a design package for your socials:", type: 'package-selection', packages: [ { title: 'Weekly Content Kit', benefit: 'Stop the Scroll with an Eye-Catching Design.', features: ['4 High-Impact Posts', '1 Reel / Motion Graphic', 'Caption & Hashtag Strategy'], timeline: '5-7 Days', price: '₹2,500 – ₹4,500' }, { title: 'Ad & Banner Campaign', benefit: "Your Social Media Content, Sorted for the Week.", features: ['5 Banners for Different Platforms', 'Multiple Size Formats', '3 Rounds of Revisions'], timeline: '4 Days', price: '₹2,500 – ₹6,000', popular: true, glow: 'hyper-glow-purple' }, { title: 'Custom Graphics', benefit: "Unique visuals tailored to your campaign.", features: ['Video Thumbnails', 'Ad Creatives', 'Animated Graphics'], timeline: 'Project-Based', price: 'Based on Needs', custom: true } ] },
        'something-else': { question: "Your vision is unique. Let's build it together.", type: 'open-ended' },
        'contact-details': { question: "Final step: Tell us how to reach you.", type: 'contact-details' },
        final: { type: 'final' }
    };

    const renderFormStep = (stepDefinition) => {
        if (!stepDefinition) return; 
        formContainer.innerHTML = '';
        const stepDiv = document.createElement('div');
        stepDiv.className = 'form-step';
        if (stepDefinition.type === 'package-selection') { stepDiv.classList.add('package-selection'); }
        let content = `<h3>${stepDefinition.question}</h3>`;

        if (stepDefinition.type === 'initial-choice') {
            content += `<div class="choice-grid">` + stepDefinition.choices.map(c => `<button class="choice-btn" data-value="${c.id}">${c.label}</button>`).join('') + `</div>`;
        } else if (stepDefinition.type === 'package-selection') {
            content += `<div class="choice-grid">` + stepDefinition.packages.map(p => `<div class="package-card ${p.glow || ''}">${p.popular ? '<div class="popular-badge">Most Popular</div>' : ''}<h4>${p.title}</h4><p class="benefit-statement">${p.benefit}</p><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul><p class="timeline"><strong>Timeline:</strong> ${p.timeline}</p><p class="price"><strong>Price:</strong> ${p.price}</p><button class="select-plan-btn" data-plan="${p.title}" data-price="${p.price}" data-custom="${p.custom || false}">Select This Plan</button></div>`).join('') + `</div>`;
            content += `<div class="form-step-footer"><button class="back-btn">&larr; Go Back</button></div>`;
        } else if (stepDefinition.type === 'contact-details') {
            content += `<form id="final-details-form" class="final-details-form"><div class="form-group"><label for="client-name">Your Name</label><input type="text" id="client-name" name="name" required></div><div class="form-group"><label for="client-email">Your Email</label><input type="email" id="client-email" name="email" required></div><div class="form-group"><label for="client-phone">Your Phone Number</label><input type="tel" id="client-phone" name="phone" required></div><button type="submit" class="cta-button">Submit Request</button></form><div class="form-step-footer"><button class="back-btn">&larr; Back to Packages</button></div>`;
        } else if (stepDefinition.type === 'final') {
             content = `<div class="form-final-message"><h3>Thank You!</h3><p>Your request has been sent. We will review the details and contact you within 24 hours.</p><p>For a faster response, or to discuss your project immediately, feel free to message us directly.</p><div class="social-redirect"><a href="https://ig.me/m/hypercode.studio" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg><span>Message on Instagram</span></a></div></div>`;
        } else if (stepDefinition.type === 'open-ended') {
             content += `<form id="final-details-form" class="text-form"><textarea name="customRequest" id="text-input" class="text-input" placeholder="Please describe your unique requirements..." rows="4" required></textarea><br/><button type="submit" class="cta-button" id="submit-text">Next</button></form><div class="form-step-footer"><button class="back-btn">&larr; Back</button></div>`;
        }
        
        stepDiv.innerHTML = content;
        formContainer.appendChild(stepDiv);
        setTimeout(() => stepDiv.classList.add('active'), 10);
        updateProgress();
        attachFormListeners();
    };

    const updateProgress = () => { if(progressBar) progressBar.style.width = `${(currentStep / 3) * 100}%`; };

    const goToStep = (stepIndex, data = {}) => {
        if (stepIndex > currentStep) { stepHistory.push(currentStep); }
        Object.assign(userSelection, data);
        currentStep = stepIndex;
        
        let stepDef;
        if (currentStep === 0) stepDef = formSteps.initial;
        else if (currentStep === 1) stepDef = formSteps[userSelection.service];
        else if (currentStep === 2) stepDef = formSteps['contact-details'];
        else stepDef = formSteps.final;

        renderFormStep(stepDef);
    };

    const goBack = () => {
        const previousStep = stepHistory.pop();
        if (previousStep !== undefined) { goToStep(previousStep); }
    };
    
    const attachFormListeners = () => {
        formContainer.querySelectorAll('.choice-btn').forEach(btn => btn.addEventListener('click', () => goToStep(1, { service: btn.dataset.value })));
        
        formContainer.querySelectorAll('.select-plan-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.custom === 'true') {
                    goToStep(1, { service: 'something-else', plan: 'Custom Project' });
                } else {
                    goToStep(2, { plan: btn.dataset.plan, price: btn.dataset.price });
                }
            });
        });

        formContainer.querySelectorAll('.back-btn').forEach(btn => btn.addEventListener('click', goBack));
        
        const finalForm = formContainer.querySelector('#final-details-form');
        if (finalForm) {
            const isCustomForm = finalForm.classList.contains('text-form');

            if (isCustomForm) {
                // Logic for the 'something-else' or 'Custom' path form
                finalForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const customRequestInput = finalForm.querySelector('textarea[name="customRequest"]');
                    if (customRequestInput.value) {
                        goToStep(2, { customRequest: customRequestInput.value });
                    }
                });
            } else {
                // Logic for the final contact details form
                finalForm.action = "https://formspree.io/f/mnnzlroz";
                finalForm.method = "POST";
                finalForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const submitButton = finalForm.querySelector('button[type="submit"]');
                    submitButton.textContent = "Submitting...";
                    submitButton.disabled = true;

                    const formData = new FormData(finalForm);
                    const clientDetails = Object.fromEntries(formData.entries());
                    Object.assign(userSelection, clientDetails);
                    
                    const dataToSend = {
                        name: userSelection.name,
                        email: userSelection.email,
                        phone: userSelection.phone,
                        _subject: `New HyperCode Inquiry: ${userSelection.plan || 'Custom Project'}`,
                        "Service Category": userSelection.service,
                        "Selected Plan": userSelection.plan || 'N/A',
                        "Price Range": userSelection.price || 'N/A',
                        "Custom Request": userSelection.customRequest || 'N/A'
                    };

                    fetch(finalForm.action, {
                        method: 'POST', body: JSON.stringify(dataToSend), headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
                    }).then(response => {
                        if (response.ok) { goToStep(3); } 
                        else {
                            alert('Oops! There was a problem submitting your form.');
                            submitButton.textContent = "Submit Request";
                            submitButton.disabled = false;
                        }
                    }).catch(error => {
                        alert('Oops! There was a network problem.');
                        submitButton.textContent = "Submit Request";
                        submitButton.disabled = false;
                    });
                });
            }
        }
    };

    renderFormStep(formSteps.initial);
}
    // === PERFORMANCE DASHBOARD LOGIC ===
    const fpsEl = document.getElementById('perf-fps');
    if (fpsEl) {
        let lastTime = performance.now(); let frameCount = 0;
        const updateFPS = (time) => { frameCount++; if (time - lastTime > 1000) { fpsEl.textContent = `FPS: ${Math.round((frameCount * 1000) / (time - lastTime))}`; frameCount = 0; lastTime = time; } requestAnimationFrame(updateFPS); };
        requestAnimationFrame(updateFPS);
    }
    const loadTimeEl = document.getElementById('perf-load');
    if(loadTimeEl) {
        window.addEventListener('load', () => {
            const navTiming = performance.getEntriesByType("navigation")[0];
            if (navTiming) { const loadTime = navTiming.domContentLoadedEventEnd; loadTimeEl.textContent = `Load: ${Math.round(loadTime)}ms`; }
        });
    }
});