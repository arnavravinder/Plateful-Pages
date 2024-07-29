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
    showErrorPopup();
    return;
  }
  currentStep++;
  if (currentStep > 5) {
    submitOnboarding();
  } else {
    showStep(currentStep);
  }
}

function showErrorPopup() {
  document.querySelector('.container').classList.add('blur');
  document.getElementById('error-popup').style.display = 'flex';
}

function closeErrorPopup() {
  document.querySelector('.container').classList.remove('blur');
  document.getElementById('error-popup').style.display = 'none';
}

async function submitOnboarding() {
  const restaurantName = document.getElementById('restaurant-name').value;
  const restaurantAddress = document.getElementById('restaurant-address').value;
  const restaurantPhone = document.getElementById('restaurant-phone').value;
  const googleProfile = document.getElementById('google-profile').value;
  const upiQr = document.getElementById('upi-qr').files[0];

  if (!restaurantName || !restaurantAddress || !restaurantPhone || !googleProfile || !upiQr) {
    showErrorPopup();
    return;
  }

  const rating = await getStarRating(googleProfile);

  if (rating === null) {
    alert('Could not retrieve the star rating. Please check the Google profile link.');
    return;
  }

  console.log('Star Rating:', rating);

  document.querySelector('.container').classList.add('blur');
  document.getElementById('success-popup').style.display = 'flex';
}

function redirectToDashboard() {
  window.location.href = 'restaurantDashboard.html';
}

async function getStarRating(googleProfileUrl) {
  const proxyUrl = 'https://api.allorigins.win/get?url=';
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(googleProfileUrl));
    const data = await response.json();
    const html = data.contents;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const ratingElement = doc.querySelector('[class*="gm2-display-2"]');
    return ratingElement ? ratingElement.textContent : null;
  } catch (error) {
    console.error('Error fetching star rating:', error);
    return null;
  }
}