document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    const cards = track.querySelectorAll('.portfolio-3d-card');
    const dotsContainer = document.getElementById('portfolioDots');
    const pauseBtn = document.getElementById('portfolioPauseBtn');
    
    const detailTag = document.getElementById('detailTag');
    const detailTitle = document.getElementById('detailTitle');
    const detailProblem = document.getElementById('detailProblem');
    const detailSolution = document.getElementById('detailSolution');
    const detailTime = document.getElementById('detailTime');
    const detailSiteBtn = document.getElementById('detailSiteBtn'); // Botón "Cotizar proyecto similar"
    const detailVisitBtn = document.getElementById('detailVisitBtn'); // Nuevo botón "Ir al sitio"

    // Definición centralizada de las URLs y nombres de los proyectos (ordenados del 1 al 6)
    const projectLinks = [
        { url: "https://www.defensorianinez.cl/", name: "Defensoría de la Niñez" },
        { url: "https://cnc.cl/", name: "Cámara Nacional de Comercio" },
        { url: "https://www.agrosuper.cl/clientes/newsletter/", name: "Newsletter Agrosuper" },
        { url: "https://promobility.cl/", name: "Promobility & UCCO" },
        { url: "https://consultorescyc.cl/", name: "CyC Consultores" },
        { url: "https://huelen.cl/", name: "Colegio Huelen" }
    ];

    let currentIndex = 0;
    let isPaused = false;
    let autoPlayInterval;

    // Crear puntos de paginación
    cards.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `dot-indicator ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Ir al proyecto ${idx + 1}`);
        dot.addEventListener('click', () => {
            goToSlide(idx);
            resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot-indicator');

    function updateDetails(card, index) {
        detailTag.textContent = card.getAttribute('data-tag');
        detailTitle.textContent = card.getAttribute('data-title');
        detailProblem.textContent = card.getAttribute('data-problem');
        detailSolution.textContent = card.getAttribute('data-solution');
        detailTime.textContent = card.getAttribute('data-time');
        
        // Actualizar botón de cotización (mantiene su comportamiento original hacia #contacto)
        if (detailSiteBtn) {
            detailSiteBtn.setAttribute('href', card.getAttribute('data-url') || '#contacto');
        }

        // Actualizar dinámicamente el nuevo botón "Ir al sitio" según el índice actual
        if (detailVisitBtn && projectLinks[index]) {
            detailVisitBtn.setAttribute('href', projectLinks[index].url);
            detailVisitBtn.setAttribute('aria-label', `Visitar sitio web de ${projectLinks[index].name}`);
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        const offset = -index * 100;
        track.style.transform = `translateX(${offset}%)`;

        cards.forEach((c, idx) => {
            if (idx === index) {
                c.classList.add('active');
                updateDetails(c, idx);
            } else {
                c.classList.remove('active');
            }
        });

        dots.forEach((d, idx) => {
            d.classList.toggle('active', idx === index);
        });
    }

    function nextSlide() {
        if (!isPaused) {
            let nextIndex = (currentIndex + 1) % cards.length;
            goToSlide(nextIndex);
        }
    }

    // Inicializar primer proyecto
    updateDetails(cards[0], 0);

    // Autoplay con temporizador
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4500);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        if (!isPaused) startAutoPlay();
    }

    startAutoPlay();

    // Control de Pausa / Reproducción
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            const pauseText = pauseBtn.querySelector('.pause-text');
            const pauseIcon = pauseBtn.querySelector('.pause-icon');
            
            if (isPaused) {
                if (pauseText) pauseText.textContent = 'Reanudar';
                if (pauseIcon) pauseIcon.textContent = '▶️';
                clearInterval(autoPlayInterval);
            } else {
                if (pauseText) pauseText.textContent = 'Pausar';
                if (pauseIcon) pauseIcon.textContent = '⏸️';
                startAutoPlay();
            }
        });
    }

    // Soporte gestual táctil para móviles (Swipe)
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
        let touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
            goToSlide((currentIndex + 1) % cards.length);
            resetAutoPlay();
        } else if (touchEndX - touchStartX > 50) {
            goToSlide((currentIndex - 1 + cards.length) % cards.length);
            resetAutoPlay();
        }
    }, { passive: true });
});