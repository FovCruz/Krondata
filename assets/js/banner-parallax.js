/* document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('banner-interactivo');
    const shapes = document.querySelectorAll('.geometric-shape');

    if (!banner || shapes.length === 0) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Capturar posición del mouse para combinar con el scroll
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) / 20;
        mouseY = (e.clientY - window.innerHeight / 2) / 20;
    });

    // Bucle de animación fluido con requestAnimationFrame
    const animateShapes = () => {
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;

        const rect = banner.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

        if (scrollProgress >= -0.2 && scrollProgress <= 1.2) {
            shapes.forEach((shape, index) => {
                // Multiplicador de velocidad amplificado para que el movimiento sea muy perceptible
                const speedFactor = (index + 1) * 75; 
                const yPos = (scrollProgress - 0.5) * speedFactor;
                const rotation = scrollProgress * 45 * (index % 2 === 0 ? 1 : -1);
                
                // Combinamos el desplazamiento del scroll con el movimiento sutil del mouse
                shape.style.transform = `translate3d(${currentX * (index + 1)}px, ${yPos + (currentY * (index + 1))}px, 0) rotate(${rotation}deg)`;
            });
        }

        requestAnimationFrame(animateShapes);
    };

    requestAnimationFrame(animateShapes);
}); */