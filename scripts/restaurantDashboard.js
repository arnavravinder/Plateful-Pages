document.addEventListener('DOMContentLoaded', () => {
  const isOpen = localStorage.getItem('isOpen') === 'true';
  updateOpenForWorkButton(isOpen);
});

function addItem() {
  const itemName = document.getElementById('item-name').value;
  const itemPrice = document.getElementById('item-price').value;
  const itemQty = document.getElementById('item-qty').value;
  const itemImage = document.getElementById('item-image').files[0];

  if (!itemName || !itemPrice || !itemQty || !itemImage) {
    alert('Please fill out all fields.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
      <img src="${e.target.result}" alt="Item Image">
      <h4>${itemName}</h4>
      <p>Price: $${itemPrice}</p>
      <p>Quantity: ${itemQty}</p>
      <button onclick="removeItem(this)">Remove</button>
      <button onclick="editItem(this)">Edit</button>
    `;
    document.getElementById('menu-items').appendChild(menuItem);
  }
  reader.readAsDataURL(itemImage);

  document.getElementById('item-name').value = '';
  document.getElementById('item-price').value = '';
  document.getElementById('item-qty').value = '';
  document.getElementById('item-image').value = '';
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

function toggleOpenForWork() {
  const isOpen = localStorage.getItem('isOpen') === 'true';
  localStorage.setItem('isOpen', !isOpen);
  updateOpenForWorkButton(!isOpen);
}

function updateOpenForWorkButton(isOpen) {
  const button = document.getElementById('open-for-work');
  if (isOpen) {
    button.textContent = 'Close Resteraunt';
    button.style.backgroundColor = '#f03562';
  } else {
    button.textContent = 'Open Resteraunt';
    button.style.backgroundColor = '#2d9ce1';
  }
}
