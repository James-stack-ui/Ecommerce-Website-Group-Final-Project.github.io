// Sample product data
const products = [
    {
      "id": 1,
      "name": "Nike Air Max",
      "category": "Deal",
      "old_price": 120.0,
      "new_price": 100.0,
      "image": "images/Nike Air Max.png"
    },
    {
      "id": 2,
      "name": "Adidas Ultraboost",
      "category": "Shoes",
      "old_price": 180.0,
      "new_price": 150.0,
      "image": "images/Adidas Ultraboost.png"
    },
    {
      "id": 3,
      "name": "Puma RS-X",
      "category": "Shoes",
      "old_price": 110.0,
      "new_price": 90.0,
      "image": "images/Puma RS-X.png"
    },
    {
      "id": 4,
      "name": "Reebok Classic",
      "category": "Shoes",
      "old_price": 100.0,
      "new_price": 80.0,
      "image": "images/Reebok Classic.png"
    },
    
    {
      "id": 7,
      "name": "Levi's Denim Jacket (Male)",
      "category": "Deal",
      "old_price": 80.0,
      "new_price": 70.0,
      "image": "images/Levi_Denim_Jacket_(Male).png"
    },
    {
      "id": 8,
      "name": "Ralph Lauren Polo (Male)",
      "category": "Deal",
      "old_price": 70.0,
      "new_price": 60.0,
      "image": "images/Ralph Lauren Polo (Male).png"
    },
 
    {
      "id": 10,
      "name": "Gucci Dress (Female)",
      "category": "Clothes",
      "old_price": 300.0,
      "new_price": 250.0,
      "image": "images/Gucci Dress (Female).png"
    },
    {
      "id": 11,
      "name": "Chanel Blouse (Female)",
      "category": "Clothes",
      "old_price": 200.0,
      "new_price": 180.0,
      "image": "images/Chanel Blouse (Female).png"
    },
    {
      "id": 12,
      "name": "Zara Skirt (Female)",
      "category": "Clothes",
      "old_price": 80.0,
      "new_price": 65.0,
      "image": "images/Zara Skirt (Female).png"
    }
  ]
  ;
  
  let cart = [];
  
  // Load cart from localStorage
  function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cart = JSON.parse(storedCart);
    } else {
      cart = [];
    }
  }
  
  // Save cart to localStorage
  function saveCartToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // Add product to cart
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const cartItem = cart.find((item) => item.id === productId);
  
    if (cartItem) {
      cartItem.quantity += 1; // Increment quantity
    } else {
      cart.push({ ...product, quantity: 1 }); // Add new product to cart
    }
  
    saveCartToLocalStorage(); // Save updated cart to localStorage
    alert(`${product.name} added to cart!`);
  }
  
  // Remove a specific product from the cart
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId); // Remove product by ID
    saveCartToLocalStorage(); // Save updated cart
    updateCartUI(); // Update cart UI
  }
  
  // Clear all items from the cart
  function clearCart() {
    cart = []; // Empty the cart
    saveCartToLocalStorage(); // Save updated cart
    updateCartUI(); // Update cart UI
  }
  
  // Render products for a specific category
  function renderProductRow(category, rowId) {
    const rowContainer = document.getElementById(rowId);
    if (!rowContainer) return; // Exit if the row ID is invalid
  
    rowContainer.innerHTML = ""; // Clear the row's content
  
    const categoryProducts = products.filter((product) => product.category === category);
  
    categoryProducts.forEach((product) => {
      rowContainer.innerHTML += `
        <div class="product-deal-card col-lg-3 col-md-4 col-sm-5 col-12 p-0">
          <div class="row pc-top-row px-4">
            <div class="col-6 py-4 pe-0 d-flex flex-column justify-content-center">
              <h2 class="mb-0">${product.name}</h2>
              <p class="mb-0">Popular items</p>
            </div>
            <div class="col-6 px-0 pt-3 d-flex flex-column justify-content-center">
              <img src="${product.image}" alt="${product.name}" class="img-fluid rounded" />
            </div>
          </div>
          <div class="pc-bottom-row row justify-content-center">
            <div class="col-8 col-md-8">
              <div class="d-flex align-items-center justify-content-center">
                <span class="old-price me-2">$${product.old_price}</span>
                <span class="new-price">$${product.new_price}</span>
              </div>
              <div class="mt-2 product-cart-btn">
                <button class="w-100 py-2 px-1 add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  
    // Attach event listeners for "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = parseInt(event.target.getAttribute("data-id"));
        addToCart(productId);
      });
    });
  }
  
  // Update the cart display UI (on cart page)
  function updateCartUI() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartButton = document.getElementById("clear-cart");
  
    if (!cartContainer || !cartTotal) return; // Exit if not on the cart page
  
    cartContainer.innerHTML = ""; // Clear previous cart items
    let total = 0;
  
    cart.forEach((item) => {
      total += item.new_price * item.quantity;
  
      cartContainer.innerHTML += `
        <div class="cart-item product-deal-card col-lg-3 col-md-4 col-sm-5 col-12 p-0">
          <div class="row pc-top-row px-4">
            <div class="col-6 py-4 pe-0 d-flex flex-column justify-content-center">
              <h2 class="mb-0">${item.name}</h2>
              <p class="mb-0">Popular items</p>
            </div>
            <div class="col-6 px-0 pt-3 d-flex flex-column justify-content-center">
              <img src="${item.image}" alt="${item.name}" class="img-fluid rounded" />
            </div>
          </div>
          <div class="pc-bottom-row row">
            <div class="col-8 col-md-8">
              <div class="mt-2 product-cart-btn">
                <button class="w-100 py-2 px-1">Total: $${(item.new_price * item.quantity).toFixed(2)}</button>
              </div>
            </div>
            <div class="col-4 col-md-4 d-flex justify-content-center gap-1 align-items-center pb-2">
              <p>Qty: x${item.quantity}</p>
            </div>
            <div class="col-12 text-center mt-2">
              <button class="btn btn-danger btn-sm remove-item-btn" data-id="${item.id}">Remove</button>
            </div>
          </div>
        </div>
      `;
    });
  
    cartTotal.textContent = total.toFixed(2); // Update total price
  
    // Attach event listeners for "Remove" buttons
    document.querySelectorAll(".remove-item-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = parseInt(event.target.getAttribute("data-id"));
        removeFromCart(productId);
      });
    });
  
    // Attach event listener for "Clear Cart" button
    if (clearCartButton) {
      clearCartButton.addEventListener("click", clearCart);
    }
  }
  
  // Initialize the relevant page functionality
  document.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();
  
    // Detect if on products page
      if (document.getElementById("product-list")) {
        renderProductRow("Deal", "deal-row");

      renderProductRow("Shoes", "shoes-row");
      renderProductRow("Clothes", "clothes-row");
    }
  
    // Detect if on cart page
    if (document.getElementById("cart-items")) {
      updateCartUI();
    }
  });
  