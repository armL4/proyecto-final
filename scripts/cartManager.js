// Función para añadir un producto al carrito en localStorage
    function addToCart(product) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const existingProduct = carrito.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += product.quantity || 1;
        } else {
            product.quantity = product.quantity || 1;  // Asigna una cantidad inicial si no existe
            carrito.push(product);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Función para mostrar los productos en el carrito en la página del carrito de compras
    function displayCart() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const cartContainer = document.getElementById("cart-container");

        if (carrito.length === 0) {
            cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
            return;
        }

        cartContainer.innerHTML = "";  // Limpiar el contenido

        carrito.forEach((producto, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.titulo}">
                <h3>${producto.titulo}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>$${producto.precio.toFixed(2)}</strong></p>
                <p>Cantidad: ${producto.quantity}</p>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(index) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        displayCart();
    }
