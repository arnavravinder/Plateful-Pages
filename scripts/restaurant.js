function nextStep(step) {
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
  }
  
  function prevStep(step) {
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
  }
  
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
  
  function completeOnboarding() {
    const name = document.getElementById('restaurant-name').value;
    const address = document.getElementById('restaurant-address').value;
    const phone = document.getElementById('restaurant-phone').value;
    const googleProfile = document.getElementById('google-profile').value;
    const banner = document.getElementById('restaurant-banner').files[0];
    const rating = document.querySelector('.star.selected:last-of-type').getAttribute('data-value');
  
    console.log({
      name,
      address,
      phone,
      googleProfile,
      banner,
      rating
    });
  
    document.getElementById('onboarding-box').style.display = 'none';
    document.getElementById('management-box').style.display = 'block';
  }
  
  function addItem() {
    const itemName = document.getElementById('item-name').value;
    const itemPrice = document.getElementById('item-price').value;
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
    if (itemName && itemPrice) {
      menuItem.querySelector('h4').textContent = itemName;
      menuItem.querySelector('p').textContent = `Price: $${itemPrice}`;
    }
  }
  
  function markOrderFulfilled(button) {
    const orderItem = button.closest('.order-item');
    const checkbox = orderItem.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      orderItem.style.textDecoration = 'line-through';
    } else {
      orderItem.style.textDecoration = 'none';
    }
  }
  