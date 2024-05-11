document.addEventListener('DOMContentLoaded', function() {
    const jwtToken = sessionStorage.getItem('jwtToken');
    const userDetailsForm = document.getElementById('user-details-form');
    const messageContainer = document.getElementById('message-container');

    if (!jwtToken) {
        // Redirect user to home page if not logged in
        alert('Please log in to view this page.');
        window.location.href = 'index.html';
        return;
    } else {
    }

    userDetailsForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(userDetailsForm);
        const phone = formData.get('phone');
        const address = formData.get('address');
        const email = formData.get('email');

        try {
            const response = await fetch('https://back-end-web-development-task4-part1-api.onrender.com/protected', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': jwtToken
                },
                body: JSON.stringify({ phone, address, email })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.errors[0].msg);
            }

            displayMessage('success', data.message);
            userDetailsForm.reset();
        } catch (error) {
            displayMessage('danger', error.message);
        }
    });

    function displayMessage(type, message) {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        messageContainer.innerHTML = `<div class="alert ${alertClass}" role="alert">${message}</div>`;
    }

});
