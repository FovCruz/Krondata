document.addEventListener('DOMContentLoaded', () => {
    const timerSpan = document.getElementById('timerCountdown');
    if (!timerSpan) return;

    let totalSeconds = 14 * 3600 + 45 * 60; // 14 horas 45 mins

    const updateTimer = () => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        timerSpan.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (totalSeconds > 0) {
            totalSeconds--;
        }
    };

    setInterval(updateTimer, 1000);
    updateTimer();
});