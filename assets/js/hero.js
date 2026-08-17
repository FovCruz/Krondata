document.addEventListener('mousemove', (e) => {
    const mockup = document.querySelector('.hero-mockup');
    if (!mockup) return;
    const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
    mockup.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});