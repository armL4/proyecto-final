let productosData = [];

async function fetchProducts() {
    const response = await fetch('productos.json');
    const data = await response.json();
    productosData = data.categorias.reduce((acc, categoria) => acc.concat(categoria.productos), []);
    renderProducts(data.categorias);
}

function renderProducts(categorias) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    categorias.forEach(categoria => {
        const categorySection = document.createElement('section');
        categorySection.innerHTML = `<h2>${categoria.nombre}</h2>`;
        
        categoria.productos.slice(0, 3).forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <h3>${producto.titulo}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>$${producto.precio.toFixed(2)}</strong></p>
                <button onclick="addToCartFromIndex(${producto.id})">Añadir al carrito</button>
            `;
            categorySection.appendChild(card);
        });

        container.appendChild(categorySection);
    });
}

function addToCartFromIndex(id) {
    const product = productosData.find(p => p.id === id);
    if (!product) {
        console.error('Producto no encontrado');
        return;
    }

    addToCart({
        id: product.id,
        titulo: product.titulo,
        descripcion: product.descripcion,
        precio: product.precio,
        imagen: product.imagen,
        quantity: 1
    });  // Llama a la función en cartManager.js
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginLink = document.getElementById('loginLink');
    const userImageLink = document.getElementById('userImageLink');
    const welcomeMessage = document.getElementById('welcomeMessage');

    if (isLoggedIn) {
        const userName = localStorage.getItem('userName'); // Obtener el nombre del usuario
        loginLink.style.display = 'none';
        userImageLink.style.display = 'block';
        welcomeMessage.textContent = `Bienvenido de nuevo, ${userName}!`;
    } else {
        loginLink.style.display = 'block';
        userImageLink.style.display = 'none';
        welcomeMessage.textContent = 'Bienvenido!';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    checkLoginStatus();
});


