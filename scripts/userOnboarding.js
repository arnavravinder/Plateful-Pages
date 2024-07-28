document.addEventListener('DOMContentLoaded', () => {
    showStep(1);
  });
  
  let currentStep = 1;
  
  function showStep(step) {
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
      group.style.display = group.getAttribute('data-step') == step ? 'block' : 'none';
    });
  }
  
  function nextStep() {
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
  
    alert('Processing your information. Please wait...');
  
    setTimeout(() => {
      alert('Onboarding completed successfully!');
    }, 2000);
  
    document.getElementById('user-name').value = '';
    document.getElementById('user-email').value = '';
    document.getElementById('user-phone').value = '';
    document.getElementById('user-address').value = '';
    document.getElementById('user-profile-picture').value = '';
  }
  