/**
 * NEODATA - LÓGICA PRINCIPAL DEL SITIO (script.js)
 * Manejo de menú móvil, temas (Light/Dark), escalado de fuente, FAQ y validaciones.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================================== */
    /* 1. MENÚ NAVEGACIÓN MÓVIL                                                  */
    /* ========================================================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        // Función auxiliar para alternar el menú
        const toggleMenu = (forceClose = false) => {
            const isActive = forceClose ? false : !navMenu.classList.contains('active');
            
            mobileToggle.classList.toggle('active', isActive);
            navMenu.classList.toggle('active', isActive);
            mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            
            // Usamos la clase CSS 'menu-open' definida en responsive.css para bloquear el scroll
            document.body.classList.toggle('menu-open', isActive);
        };

        // Apertura / Cierre mediante botón Hamburguesa
        mobileToggle.addEventListener('click', () => toggleMenu());

        // Cierre automático al pulsar enlaces del menú o botones CTA dentro del menú
        navMenu.querySelectorAll('.nav-link, .mobile-thumb-cta, .desktop-cta').forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });
    }

    /* ========================================================================== */
    /* 2. SISTEMA DE MODO CLARO / OSCURO (THEME SWITCHER)                       */
    /* ========================================================================== */
    const htmlRoot = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');

    // Recuperar o definir tema predeterminado
    const savedTheme = localStorage.getItem('neodata_theme') || 'dark';
    htmlRoot.setAttribute('data-theme', savedTheme);

    const switchTheme = () => {
        const currentTheme = htmlRoot.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlRoot.setAttribute('data-theme', newTheme);
        localStorage.setItem('neodata_theme', newTheme);
    };

    if (themeToggle) themeToggle.addEventListener('click', switchTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', switchTheme);

    /* ========================================================================== */
    /* 3. TAMAÑO DE FUENTE DINÁMICO (SMALL / NORMAL / LARGE)                      */
    /* ========================================================================== */
    const fontSizeToggleBtn = document.getElementById('fontSizeToggle');
    const fontSizeToggleMobileBtn = document.getElementById('fontSizeToggleMobile');
    const fontSizes = ['small', 'normal', 'large'];

    // Recuperar o definir tamaño de fuente inicial
    const savedFontSize = localStorage.getItem('neodata_fontsize') || 'small';
    htmlRoot.setAttribute('data-font-size', savedFontSize);

    const cycleFontSize = () => {
        const currentSize = htmlRoot.getAttribute('data-font-size') || 'small';
        const nextIndex = (fontSizes.indexOf(currentSize) + 1) % fontSizes.length;
        const newSize = fontSizes[nextIndex];

        htmlRoot.setAttribute('data-font-size', newSize);
        localStorage.setItem('neodata_fontsize', newSize);
    };

    if (fontSizeToggleBtn) fontSizeToggleBtn.addEventListener('click', cycleFontSize);
    if (fontSizeToggleMobileBtn) fontSizeToggleMobileBtn.addEventListener('click', cycleFontSize);

    /* ========================================================================== */
    /* 4. PREGUNTAS FRECUENTES (FAQ TABS Y ACORDEÓN POR DELEGACIÓN)              */
    /* ========================================================================== */
    const faqTabs = document.querySelectorAll('.faq-tab');
    const faqTabContents = document.querySelectorAll('.faq-tab-content');

    // Cambios de Pestaña (Tabs)
    faqTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            faqTabs.forEach(t => t.classList.toggle('active', t === tab));
            faqTabContents.forEach(content => {
                content.classList.toggle('active', content.id === targetId);
            });
        });
    });

    // Delegación de eventos única para el Acordeón (Eficiencia de Memoria)
    document.addEventListener('click', (e) => {
        const questionBtn = e.target.closest('.faq-question');
        if (!questionBtn) return;

        const currentItem = questionBtn.closest('.faq-item');
        const accordion = currentItem.closest('.faq-accordion');
        const isAlreadyActive = currentItem.classList.contains('active');

        // Cierra los demás items dentro del mismo acordeón
        accordion.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Alterna el item seleccionado
        if (!isAlreadyActive) {
            currentItem.classList.add('active');
        }
    });

    /* ========================================================================== */
    /* 5. VALIDACIÓN DEL FORMULARIO DE CONTACTO                                   */
    /* ========================================================================== */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const formFields = ['nombre', 'empresa', 'correo', 'telefono', 'servicio', 'mensaje'];

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            formFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field) return;

                const group = field.closest('.form-group');
                const val = field.value.trim();

                // Validación general de campos requeridos
                let fieldValid = Boolean(val);

                // Validación específica para Email
                if (fieldId === 'correo' && fieldValid) {
                    fieldValid = emailRegex.test(val);
                }

                if (group) {
                    group.classList.toggle('error', !fieldValid);
                }

                if (!fieldValid) isValid = false;
            });

            // Si pasa todas las validaciones
            if (isValid) {
                const successMsg = document.getElementById('formSuccess');
                if (successMsg) {
                    successMsg.style.display = 'block';
                    contactForm.reset();
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 6000);
                }
            }
        });
    }
});

/* ========================================================================== */
/* 6. MAPPING Y ACTUALIZACIÓN GLOBAL DE ENLACES DE PORTAFOLIO                 */
/* ========================================================================== */
const projectLinks = [
    { url: "https://www.defensorianinez.cl/", name: "Defensoría de la Niñez" },
    { url: "https://cnc.cl/", name: "Cámara Nacional de Comercio" },
    { url: "https://www.agrosuper.cl/clientes/newsletter/", name: "Newsletter Agrosuper" },
    { url: "https://promobility.cl/", name: "Promobility & UCCO" },
    { url: "https://consultorescyc.cl/", name: "CyC Consultores" },
    { url: "https://huelen.cl/", name: "Colegio Huelen" }
];

/**
 * Función expuesta globalmente para ser invocada desde portfolio.js al cambiar de tarjeta.
 * @param {number} index - Índice del proyecto activo en el carrusel
 */
window.updateProjectVisitLink = (index) => {
    const visitBtn = document.getElementById('detailVisitBtn');
    if (visitBtn && projectLinks[index]) {
        visitBtn.href = projectLinks[index].url;
        visitBtn.setAttribute('aria-label', `Visitar sitio web de ${projectLinks[index].name}`);
    }
};