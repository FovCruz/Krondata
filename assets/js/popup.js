document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('unifiedPopupOverlay');
    const closeBtn = document.getElementById('popupClose');
    const container = document.getElementById('popupContentContainer');

    if (!overlay || !container) return;

    function openPopup(templateId) {
        const template = document.getElementById(templateId);
        if (!template) return;

        container.innerHTML = '';
        const clone = template.content.cloneNode(true);
        container.appendChild(clone);

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Event listener para botones de cierre interno en el template
        const actionClose = container.querySelector('.popup-action-close');
        if (actionClose) {
            actionClose.addEventListener('click', closePopup);
        }
    }

    function closePopup() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Disparadores de popup en planes
    document.querySelectorAll('.popup-trigger-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = btn.getAttribute('data-popup-target');
            openPopup(targetId);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePopup();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closePopup();
        }
    });
});