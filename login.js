document.addEventListener('DOMContentLoaded', function() {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const loginForm = document.getElementById('login-form');
    const messageContainer = document.getElementById('message-container');
    const logoutButton = document.getElementById('logout-btn');

    if (jwtToken) {
        messageContainer.innerHTML = '<div class="alert-success" role="alert">You are already logged in.</div>';
        loginForm.style.display = 'none';
        logoutButton.style.display = 'block'; // Show logout button
    }

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('https://back-end-web-development-task4-part1-api.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.errors[0].msg);
            }

            sessionStorage.setItem('jwtToken', data.token);
            window.location.href = 'index.html';
        } catch (error) {
            displayMessage('danger', error.message);
        }
    });

    function displayMessage(type, message) {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        messageContainer.innerHTML = `<div class="alert ${alertClass}" role="alert">${message}</div>`;
    }

    logoutButton.addEventListener('click', function() {
        // Remove JWT token from sessionStorage
        sessionStorage.removeItem('jwtToken');
        // Redirect user to login page
        window.location.href = 'login.html';
    });
    
});
