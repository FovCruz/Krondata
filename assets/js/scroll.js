// assets/js/scroll.js (Refactorizado, optimizado y sin duplicaciones)
document.addEventListener("DOMContentLoaded", () => {
    // 1. Barra de Progreso Superior
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('scrollProgress');
        if (progressBar) progressBar.style.width = scrolled + '%';
    }, { passive: true });

    // 2. Intersection Observer para Scroll Reveal
    const revealItems = document.querySelectorAll('.reveal-item');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealItems.forEach(item => revealObserver.observe(item));

    // 3. Activación de la línea de proceso secuencial
    const workflowSection = document.getElementById('proceso');
    if (workflowSection) {
        const workflowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const wrapper = workflowSection.querySelector('.workflow-steps-wrapper');
                    if (wrapper) wrapper.classList.add('animated');
                    workflowObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });
        workflowObserver.observe(workflowSection);
    }

    // 4. GSAP ScrollTrigger para Pinned Hero, Parallax y Transición Fluida
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        const heroWrapper = document.querySelector("#heroPinnedWrapper");
        const heroSection = document.querySelector("#hero");
        const heroContent = document.querySelector(".hero-parallax-content");
        const heroVideoContainer = document.querySelector(".hero-video-container");

        if (heroWrapper && heroSection) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroWrapper,
                    start: "top top",
                    end: "+=100%", // Duración del pin equivalente al 100% del viewport
                    pin: true,
                    pinSpacing: false, // Evita espacios vacíos permitiendo el solapamiento exacto
                    scrub: 0.5,        // Sincronización fluida a 60 FPS
                    anticipatePin: 1
                }
            });

            // Reducción sutil de escala del Hero (de 1 a 0.98)
            tl.to(heroSection, {
                scale: 0.98,
                ease: "power1.out"
            }, 0);

            // Reducción gradual de opacidad y desplazamiento sutil del contenido
            tl.to(heroContent, {
                opacity: 0.2,
                y: -15,
                ease: "power1.out"
            }, 0);

            // Efecto Parallax sutil en el video de fondo
            tl.to(heroVideoContainer, {
                y: "15%",
                ease: "none"
            }, 0);
        }
    }
});