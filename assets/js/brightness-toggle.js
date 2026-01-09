// Brightness toggle functionality
(function() {
  const brightnessToggle = document.getElementById('brightness-toggle');
  const STORAGE_KEY = 'brightness-mode';
  
  // Check for saved brightness preference
  const savedBrightness = localStorage.getItem(STORAGE_KEY);
  
  if (savedBrightness === 'low') {
    document.body.classList.add('low-brightness');
    brightnessToggle.checked = true;
  }
  
  brightnessToggle.addEventListener('change', function(event) {
    event.stopPropagation();
    if (this.checked) {
      document.body.classList.add('low-brightness');
      localStorage.setItem(STORAGE_KEY, 'low');
    } else {
      document.body.classList.remove('low-brightness');
      localStorage.setItem(STORAGE_KEY, 'normal');
    }
  });
  
  // Prevent label clicks from propagating
  const brightnessLabel = document.querySelector('.brightness-switch__label');
  if (brightnessLabel) {
    brightnessLabel.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  }
})();
