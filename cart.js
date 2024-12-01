document.addEventListener('DOMContentLoaded', function() {
    let cart = []; // Array to hold items added to the cart
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const clearCartButton = document.getElementById('clearCart');
    const checkoutButton = document.getElementById('checkoutButton'); // New checkout button

    // Function to update the cart UI
    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Clear Cart
        let total = 0;

        // Loop through the cart items and display them
        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('list-group-item');
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price; // Add item price to total
        });

        // Update total price display
        totalPriceElement.textContent = total.toFixed(2);

        // Enable or disable "Clear Cart" button and "Checkout" button if there's no items in the cart 
        clearCartButton.disabled = cart.length === 0;
        checkoutButton.disabled = cart.length === 0;
    }

    // Event listener for all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name'); // Get product name
            const price = parseFloat(this.getAttribute('data-price')); // Get product price

            // Add item to cart
            cart.push({ name, price });

            // Update the cart display
            updateCart();
        });
    });

    // Event listener for "Remove" buttons inside the cart
    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index'); // Get index of item to remove
            cart.splice(index, 1); // Remove item from cart
            updateCart(); // Update the cart display
        }
    });

    // Event listener for "Clear Cart" button
    clearCartButton.addEventListener('click', function() {
        cart = []; // Clear the cart array
        updateCart(); // Update the cart display
    });

    // Event listener for "Checkout" button
    checkoutButton.addEventListener('click', function() {
        // Create a summary of the cart items
        let cartSummary = "Items in your cart:\n";
        let total = 0;
        cart.forEach(item => {
            cartSummary += `${item.name}: $${item.price}\n`;
            total += item.price;
        });
        cartSummary += `\nTotal: $${total.toFixed(2)}`;

        // Display a confirmation message with the cart summary
        const confirmCheckout = confirm(cartSummary + "\n\nWould you like to checkout?");

        if (confirmCheckout) {
            // If the user confirms, show a success message and clear the cart
            alert("Checkout successful! Your cart has been emptied.");
            cart = []; // Clear the cart array
            updateCart(); // Update the cart display to reflect the cleared cart
        } else {
            // If the user cancels, just show a message
            alert("Checkout canceled. Your cart is unchanged.");
        }
    });
});
