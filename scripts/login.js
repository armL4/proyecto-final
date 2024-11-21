// login.js

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Obtener el usuario registrado del localStorage
    const registeredUser = JSON.parse(localStorage.getItem('user'));

    // Validar el login
    if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
        localStorage.setItem('isLoggedIn', true);
        window.location.href = 'index.html'; // Redirecciona a la página principal
        alert('sesion iniciada')
    } else {
        alert('Email o contraseña incorrectos');
    }
}
