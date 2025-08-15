document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        document.getElementById('message').innerText = data.message;

        if (res.ok) {
            window.location.href = '/success.html'; // redirect on success
        }
    } catch (err) {
        document.getElementById('message').innerText = 'Error logging in';
    }
});