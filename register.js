document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registration-form');
    const messageContainer = document.getElementById('message-container');

    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('https://back-end-web-development-task4-part1-api.onrender.com/register', {
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

            registerForm.style.display = 'none';
            displayMessage('success', data.message);
            messageContainer.insertAdjacentHTML('afterend', '<button onclick="window.location.href = \'index.html\';" class="go-to-home-btn">Go to Home</button>');
        } catch (error) {
            displayMessage('danger', error.message);
        }
    });

    function displayMessage(type, message) {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        messageContainer.innerHTML = `<div class="alert ${alertClass}" role="alert">${message}</div>`;
    }
});
