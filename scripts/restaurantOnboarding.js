function nextStep(step) {
  const currentStep = document.querySelector('.step.active');
  const nextStep = document.getElementById(`step-${step}`);
  if (validateStep(currentStep)) {
    currentStep.classList.remove('active');
    nextStep.classList.add('active');
    nextStep.classList.add('animate__animated', 'animate__fadeIn');
  } else {
    showErrorPopup();
  }
}

function prevStep(step) {
  const currentStep = document.querySelector('.step.active');
  const prevStep = document.getElementById(`step-${step}`);
  currentStep.classList.remove('active');
  prevStep.classList.add('active');
  prevStep.classList.add('animate__animated', 'animate__fadeIn');
}

function validateStep(step) {
  const inputs = step.querySelectorAll('input[required]');
  let isValid = true;
  inputs.forEach(input => {
    if (!input.value) {
      isValid = false;
    }
  });
  return isValid;
}

function showErrorPopup() {
  document.getElementById('error-message').style.display = 'block';
}

function closePopup() {
  document.getElementById('error-message').style.display = 'none';
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

  if (validateStep(document.querySelector('.step.active'))) {
    // Show success message
    document.getElementById('onboarding-box').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';

    // Simulate processing delay
    setTimeout(() => {
      document.getElementById('success-message').style.display = 'none';
      window.location.href = "restaurantDashboard.html";
    }, 2000);
  } else {
    showErrorPopup();
  }
}
