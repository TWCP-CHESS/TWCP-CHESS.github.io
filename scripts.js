document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('[data-target]');

    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));

        const updateCount = () => {
            current += step;
            if (current > target) current = target;
            counter.textContent = current;
            if (current < target) {
                requestAnimationFrame(updateCount);
            }
        };

        requestAnimationFrame(updateCount);
    });

    const footerYear = document.getElementById('year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    const nextEvent = document.querySelector('.next-event');
    if (nextEvent) {
        const now = new Date();
        const nextSession = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
        const daysLeft = Math.ceil((nextSession - now) / (1000 * 60 * 60 * 24));
        nextEvent.textContent = `${daysLeft} days until the next club meetup`;
    }
});
