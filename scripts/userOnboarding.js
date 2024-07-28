document.addEventListener('DOMContentLoaded', () => {
    showStep(1);
  });
  
  let currentStep = 1;
  
  function showStep(step) {
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
      if (group.getAttribute('data-step') == step) {
        group.style.display = 'block';
        group.style.opacity = '1';
      } else {
        group.style.display = 'none';
        group.style.opacity = '0';
      }
    });
  }
  
  function nextStep() {
    const currentGroup = document.querySelector(`.input-group[data-step="${currentStep}"] input`);
    if (currentGroup && !currentGroup.value) {
      alert('Please fill out this field.');
      return;
    }
    currentStep++;
    if (currentStep > 5) {
      submitOnboarding();
    } else {
      showStep(currentStep);
    }
  }
  
  function submitOnboarding() {
    const userName = document.getElementById('user-name').value;
    const userEmail = document.getElementById('user-email').value;
    const userPhone = document.getElementById('user-phone').value;
    const userAddress = document.getElementById('user-address').value;
    const userProfilePicture = document.getElementById('user-profile-picture').files[0];
  
    if (!userName || !userEmail || !userPhone || !userAddress || !userProfilePicture) {
      alert('Please fill out all fields.');
      return;
    }
  
    document.querySelector('.container').classList.add('blur');
    document.getElementById('success-popup').style.display = 'flex';
  }
  
  function redirectToRestaurants() {
    window.location.href = 'restaurants.html';
  }
  