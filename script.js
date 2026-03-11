// script.js
// Handles form validation, storage, and retrieval

function validateEmail(email) {
    // simple regex for basic validation
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(email);
}

function saveSubmission(data) {
    const existing = JSON.parse(localStorage.getItem('submissions') || '[]');
    existing.push(data);
    localStorage.setItem('submissions', JSON.stringify(existing));
}

function loadSubmissions() {
    return JSON.parse(localStorage.getItem('submissions') || '[]');
}

// wire up on contact page
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('All fields are required.');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        saveSubmission({ name, email, message, date: new Date().toISOString() });
        alert('Thank you! Your message has been saved.');
        form.reset();
    });
}

// wire up submissions page
const table = document.getElementById('submissionsTable');
if (table) {
    const submissions = loadSubmissions();
    const tbody = table.querySelector('tbody');
    submissions.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${entry.name}</td><td>${entry.email}</td><td>${entry.message}</td>`;
        tbody.appendChild(row);
    });
}
