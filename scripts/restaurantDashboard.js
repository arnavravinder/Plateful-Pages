document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.star-rating').addEventListener('click', (e) => {
      if (e.target.classList.contains('star')) {
        const value = e.target.getAttribute('data-value');
        document.querySelectorAll('.star').forEach(star => {
          star.classList.toggle('selected', star.getAttribute('data-value') <= value);
        });
      }
    });
  });
  
  function addItem() {
    const itemName = document.getElementById('item-name').value;
    const itemPrice = document.getElementById('item-price').value;
    const itemQty = document.getElementById('item-qty').value;
    const itemImage = document.getElementById('item-image').files[0];
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const menuItem = document.createElement('div');
      menuItem.className = 'menu-item';
      menuItem.innerHTML = `
        <img src="${e.target.result}" alt="Item Image">
        <div>
          <h4>${itemName}</h4>
          <p>Price: $${itemPrice}</p>
          <p>Quantity: ${itemQty}</p>
          <button onclick="removeItem(this)">Remove</button>
          <button onclick="editItem(this)">Edit</button>
        </div>
      `;
      document.getElementById('menu-items').appendChild(menuItem);
    }
    reader.readAsDataURL(itemImage);
  }
  
  function removeItem(button) {
    const menuItem = button.closest('.menu-item');
    menuItem.remove();
  }
  
  function editItem(button) {
    const menuItem = button.closest('.menu-item');
    const itemName = prompt('Edit item name:', menuItem.querySelector('h4').textContent);
    const itemPrice = prompt('Edit item price:', menuItem.querySelector('p').textContent.split('$')[1]);
    const itemQty = prompt('Edit item quantity:', menuItem.querySelector('p:nth-of-type(2)').textContent.split(' ')[1]);
    if (itemName && itemPrice && itemQty) {
      menuItem.querySelector('h4').textContent = itemName;
      menuItem.querySelector('p').textContent = `Price: $${itemPrice}`;
      menuItem.querySelector('p:nth-of-type(2)').textContent = `Quantity: ${itemQty}`;
    }
  }
  
  function markOrderFulfilled(button) {
    const orderItem = button.closest('tr');
    const checkbox = orderItem.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      orderItem.style.textDecoration = 'line-through';
    } else {
      orderItem.style.textDecoration = 'none';
    }
  }
  