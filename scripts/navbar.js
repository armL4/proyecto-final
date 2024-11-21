const pages = [
    { title: 'Home', url: 'index.html' },
    { title: 'Categoría 1', url: 'categoria1.html' },
    { title: 'Categoría 2', url: 'categoria2.html' },
    { title: 'Categoría 3', url: 'categoria3.html' },
    { title: 'Cerrar Sesión', action: 'handleLogout()' }
];

function renderNavbar() {
    const navbar = document.createElement('nav');
    pages.forEach(page => {
        const link = document.createElement('a');
        if (page.url) {
            link.href = page.url;
        } else if (page.action) {
            link.setAttribute('onclick', page.action);
            link.style.cursor = 'pointer';
        }
        link.textContent = page.title;
        navbar.appendChild(link);
    });
    document.body.insertBefore(navbar, document.body.firstChild);
}

document.addEventListener('DOMContentLoaded', renderNavbar);

function handleLogout() {
    // Lógica para cerrar sesión (esto es una simulación)
    window.location.href = 'logout.html'; // Redirecciona a la página de logout
}

