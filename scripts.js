document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'twcpTournaments2026';

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
    const nextEventInline = document.querySelector('.next-event-inline');
    if (nextEvent || nextEventInline) {
        const now = new Date();
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const upcoming = saved
            .filter(event => event.date)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .find(event => new Date(event.date) >= now);

        if (upcoming) {
            const eventDate = new Date(upcoming.date);
            const daysLeft = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));
            if (nextEvent) {
                nextEvent.textContent = `${daysLeft} days until ${upcoming.name}`;
            }
            if (nextEventInline) {
                nextEventInline.textContent = `${upcoming.name} (${eventDate.toLocaleDateString()})`;
            }
        } else {
            const nextSession = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
            const daysLeft = Math.ceil((nextSession - now) / (1000 * 60 * 60 * 24));
            if (nextEvent) {
                nextEvent.textContent = `${daysLeft} days until the next club meetup`;
            }
            if (nextEventInline) {
                nextEventInline.textContent = 'No tournaments posted yet';
            }
        }
    }

    const revealItems = document.querySelectorAll('.panel, .hero, .status-strip');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.15 });
    revealItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${Math.min(index * 55, 260)}ms`;
        observer.observe(item);
    });
});
