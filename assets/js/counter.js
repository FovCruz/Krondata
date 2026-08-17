document.addEventListener('DOMContentLoaded', () => {
    // Contadores circulares métricas
    const metricsSection = document.getElementById('metricas-premium');
    if (!metricsSection) return;

    const cards = metricsSection.querySelectorAll('[data-metric-card]');
    let metricsAnimated = false;

    const runMetrics = () => {
        if (metricsAnimated) return;
        metricsAnimated = true;

        cards.forEach((card) => {
            const numSpan = card.querySelector('.metric-number');
            if (!numSpan) return;

            const isText = numSpan.getAttribute('data-is-text');
            if (isText === 'true') {
                numSpan.innerText = numSpan.getAttribute('data-text-val');
                return;
            }

            const target = parseInt(numSpan.getAttribute('data-target-num'), 10);
            const prefix = numSpan.getAttribute('data-prefix') || '';
            const suffix = numSpan.getAttribute('data-suffix') || '';
            
            let current = 0;
            const duration = 2000;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                
                current = Math.floor(easeProgress * target);
                numSpan.innerText = `${prefix}${current}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    numSpan.innerText = `${prefix}${target}${suffix}`;
                }
            };
            requestAnimationFrame(updateCount);
        });

        // Animación Estabilidad Operativa (0 a 99.99%)
        const stabilityCounter = document.getElementById('stabilityCounter');
        if (stabilityCounter) {
            const targetVal = parseFloat(stabilityCounter.getAttribute('data-target'));
            let startTime = performance.now();
            const duration = 2200;

            const updateStability = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const currentVal = (easeProgress * targetVal).toFixed(2);
                
                stabilityCounter.innerText = `${currentVal}%`;

                if (progress < 1) {
                    requestAnimationFrame(updateStability);
                } else {
                    stabilityCounter.innerText = `${targetVal}%`;
                }
            };
            requestAnimationFrame(updateStability);
        }
    };

    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runMetrics();
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    metricsObserver.observe(metricsSection);
});