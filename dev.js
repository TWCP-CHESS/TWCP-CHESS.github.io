document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'twcpTournaments2026';
    const AUTH_KEY = 'twcpDevUnlocked2026';
    const DEV_PASSWORD = 'StupidNathaniel123';

    const loginForm = document.getElementById('login-form');
    const loginPanel = document.getElementById('login-panel');
    const managerPanel = document.getElementById('manager-panel');
    const loginMessage = document.getElementById('login-message');
    const logoutButton = document.getElementById('logout-button');

    const eventForm = document.getElementById('event-form');
    const listContainer = document.getElementById('dev-event-list');
    const footerYear = document.getElementById('year');

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    function readEvents() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }

    function writeEvents(events) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }

    function setAuthState(isAuthed) {
        if (isAuthed) {
            localStorage.setItem(AUTH_KEY, '1');
            loginPanel.classList.add('hidden');
            managerPanel.classList.remove('hidden');
            renderEvents();
        } else {
            localStorage.removeItem(AUTH_KEY);
            loginPanel.classList.remove('hidden');
            managerPanel.classList.add('hidden');
        }
    }

    function renderEvents() {
        const events = readEvents().sort((a, b) => new Date(a.date) - new Date(b.date));

        if (!events.length) {
            listContainer.innerHTML = '<div class="card"><p>No tournaments saved yet.</p></div>';
            return;
        }

        listContainer.innerHTML = events.map(event => {
            const eventDate = event.date ? new Date(event.date).toLocaleDateString() : 'TBA';
            return `
                <article class="event-card">
                    <span class="pill">${event.type}</span>
                    <h3>${event.name}</h3>
                    <p><strong>Date:</strong> ${eventDate}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p>${event.notes || 'No notes.'}</p>
                    <button class="button button-danger" data-delete-id="${event.id}" type="button">Delete</button>
                </article>
            `;
        }).join('');
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = document.getElementById('dev-password').value;

        if (input === DEV_PASSWORD) {
            loginMessage.textContent = 'Access granted.';
            setAuthState(true);
            loginForm.reset();
        } else {
            loginMessage.textContent = 'Wrong password.';
        }
    });

    logoutButton.addEventListener('click', () => {
        setAuthState(false);
    });

    eventForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const next = {
            id: `${Date.now()}`,
            name: document.getElementById('event-name').value.trim(),
            date: document.getElementById('event-date').value,
            location: document.getElementById('event-location').value.trim(),
            type: document.getElementById('event-type').value,
            notes: document.getElementById('event-notes').value.trim()
        };

        const events = readEvents();
        events.push(next);
        writeEvents(events);
        eventForm.reset();
        renderEvents();
    });

    listContainer.addEventListener('click', (event) => {
        const id = event.target.getAttribute('data-delete-id');
        if (!id) return;

        const events = readEvents().filter(item => item.id !== id);
        writeEvents(events);
        renderEvents();
    });

    setAuthState(localStorage.getItem(AUTH_KEY) === '1');
});
