document.addEventListener('DOMContentLoaded', function () {
    loadProducts();
});

function loadProducts() {
    const productsContainer = document.getElementById('products');
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <h3>${product.name}</h3>
                    <img src="${product.image}">
                    <p>${product.description}</p>
                    <i>Price: $${product.price.toFixed(2)}</i>
                    <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                `;
                productsContainer.appendChild(productCard);
            });
        });
}

function addToCart(productName, productPrice) {
    const cartItems = document.getElementById('cart-items');
    const cartItem = document.createElement('li');
    cartItem.textContent = `${productName} - $${productPrice.toFixed(2)}`;
    cartItems.appendChild(cartItem);
}

function showCart() {
    document.getElementById('cart').style.display = 'flex';
}

function hideCart() {
    document.getElementById('cart').style.display = 'none';
}

function checkout() {
    const cartItems = document.getElementById('cart-items').getElementsByTagName('li');
    
    const selectedProducts = [];
    let totalBill = 0;

    for (let i = 0; i < cartItems.length; i++) {
        const itemText = cartItems[i].textContent;
        const regexResult = itemText.match(/(.+) - \$([\d.]+)/);

        if (regexResult) {
            const productName = regexResult[1];
            const productPrice = parseFloat(regexResult[2]);
            totalBill += productPrice;

            selectedProducts.push({
                name: productName,
                price: productPrice.toFixed(2),
            });
        }
    }

    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    localStorage.setItem('totalBill', totalBill.toFixed(2));

    window.location.href = 'checkout.html';
}
