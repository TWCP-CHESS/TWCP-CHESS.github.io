document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'twcpTournaments2026';
    const container = document.getElementById('tournament-list');
    const footerYear = document.getElementById('year');

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    const fallbackEvents = [
        {
            id: 'fallback-1',
            name: 'TWCP Spring Rapid Open',
            date: '2026-05-09',
            location: 'TWCP Main Campus',
            type: 'Rapid',
            notes: 'Rated sections for beginner and advanced players.'
        },
        {
            id: 'fallback-2',
            name: 'Summer Team Blitz',
            date: '2026-06-13',
            location: 'Student Commons',
            type: 'Blitz',
            notes: '4-player teams, rotating boards every round.'
        }
    ];

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const events = (stored.length ? stored : fallbackEvents)
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (!events.length) {
        container.innerHTML = '<div class="card"><p>No tournaments posted yet.</p></div>';
        return;
    }

    container.innerHTML = events.map((event) => {
        const dateText = event.date ? new Date(event.date).toLocaleDateString() : 'TBA';
        const safeType = event.type || 'Club';
        const safeLocation = event.location || 'TBA';
        const safeNotes = event.notes || 'No extra notes yet.';

        return `
            <article class="event-card reveal in-view">
                <span class="pill">${safeType}</span>
                <h3>${event.name}</h3>
                <p><strong>Date:</strong> ${dateText}</p>
                <p><strong>Location:</strong> ${safeLocation}</p>
                <p>${safeNotes}</p>
            </article>
        `;
    }).join('');
});
