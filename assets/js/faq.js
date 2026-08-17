document.addEventListener('DOMContentLoaded', () => {
    // Delegación de eventos para acordeones de FAQ en todas las pestañas
    document.addEventListener('click', (e) => {
        if (e.target.closest('.faq-question')) {
            const questionBtn = e.target.closest('.faq-question');
            const item = questionBtn.closest('.faq-item');
            const accordion = item.closest('.faq-accordion');
            
            const isActive = item.classList.contains('active');
            accordion.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        }
    });
});