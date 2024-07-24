document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
  
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="https://via.placeholder.com/100x100" alt="Menu Item Image">
        <p>${item.item} - $${item.price} x ${item.quantity}</p>
        <p>Restaurant: ${item.restaurant}</p>
        <p>Location: ${item.location}</p>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
  });
  
  function generateReceipt() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const receiptWindow = window.open('', '_blank');
    let receiptContent = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Jost', sans-serif;
          color: #333;
        }
        .receipt {
          max-width: 600px;
          margin: 0 auto;
          padding: 1rem;
          background: #fcf6ea;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .receipt h2 {
          text-align: center;
          color: #2d9ce1;
        }
        .receipt img {
          display: block;
          margin: 0 auto 1rem;
        }
        .receipt .cart-item {
          border-bottom: 1px solid #ccc;
          padding: 1rem 0;
        }
        .receipt .cart-item p {
          margin: 0.5rem 0;
        }
        .receipt .restaurant-details p {
          text-align: center;
          margin: 0.5rem 0;
        }
      </style>
      <div class="receipt">
        <h2>Receipt</h2>
        <img src="plateful_logo.png" alt="Plateful Logo" width="100">
        <div class="restaurant-details">
          <p>Restaurant Name: ${cart[0].restaurant}</p>
          <p>Address: ${cart[0].location}</p>
        </div>
    `;
  
    cart.forEach(item => {
      receiptContent += `
        <div class="cart-item">
          <p>Item: ${item.item} - $${item.price} x ${item.quantity}</p>
        </div>
      `;
    });
  
    receiptContent += `
      <div class="restaurant-details">
        <p>Thank you for your order!</p>
      </div>
      </div>
    `;
  
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
    receiptWindow.print();
  }
  