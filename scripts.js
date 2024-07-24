let cart = [];
let cartCount = 0;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cart-link').innerText = `Cart (${cartCount})`;
});

function openMenu(name, location, timings, distance) {
  document.getElementById('restaurant-name').innerText = name;
  document.getElementById('restaurant-address').innerText = location;
  document.getElementById('restaurant-timings').innerText = timings;
  document.getElementById('restaurant-distance').innerText = distance;
  document.getElementById('main-content').style.display = 'none';
  document.getElementById('restaurant-menu').style.display = 'block';
}

function goBack() {
  document.getElementById('restaurant-menu').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
}

function addToCart(item, price, actionId, restaurant, location) {
  const actionElement = document.getElementById(actionId);
  actionElement.innerHTML = `
    <div class="increment-decrement">
      <button onclick="decrementItem('${item}', ${price}, '${actionId}')">-</button>
      <span id="quantity-${item}">1</span>
      <button onclick="incrementItem('${item}', ${price}, '${actionId}')">+</button>
    </div>
  `;
  cart.push({ item, price, quantity: 1, restaurant, location });
  cartCount++;
  updateCart();
}

function incrementItem(item, price, actionId) {
  const cartItem = cart.find(cartItem => cartItem.item === item);
  cartItem.quantity++;
  document.getElementById(`quantity-${item}`).innerText = cartItem.quantity;
  updateCart();
}

function decrementItem(item, price, actionId) {
  const cartItem = cart.find(cartItem => cartItem.item === item);
  if (cartItem.quantity > 1) {
    cartItem.quantity--;
    document.getElementById(`quantity-${item}`).innerText = cartItem.quantity;
  } else {
    cart = cart.filter(cartItem => cartItem.item !== item);
    document.getElementById(actionId).innerHTML = `<button class="add-to-cart" onclick="addToCart('${item}', ${price}, '${actionId}')">ADD</button>`;
  }
  updateCart();
}

function updateCart() {
  cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cart-link').innerText = `Cart (${cartCount})`;
}

function openCartPopup() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="https://via.placeholder.com/100x100" alt="Menu Item Image">
        <p>${item.item} - $${item.price} x ${item.quantity}</p>
        <p>Restaurant: ${item.restaurant}</p>
        <p>Location: ${item.location}</p>
      </div>
    `;
  });
  document.getElementById('cart-popup').style.display = 'block';
}

function closeCartPopup() {
  document.getElementById('cart-popup').style.display = 'none';
}

function initiateCheckout() {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'checkout.html';
}

document.getElementById('cart-link').addEventListener('click', (e) => {
  e.preventDefault();
  openCartPopup();
});
