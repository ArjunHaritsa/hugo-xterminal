// Language showcase cycling animation
document.addEventListener('DOMContentLoaded', function() {
  const languageShowcase = document.querySelector('.language-showcase');
  
  if (!languageShowcase) return;
  
  const languageItems = languageShowcase.querySelectorAll('.language-item');
  if (languageItems.length === 0) return;
  
  let currentIndex = 0;
  
  function cycleLanguages() {
    // Remove active class from current
    languageItems[currentIndex].classList.remove('active');
    languageItems[currentIndex].classList.add('exit');
    
    // Move to next language
    currentIndex = (currentIndex + 1) % languageItems.length;
    
    // Add active class to next
    setTimeout(() => {
      languageItems.forEach(item => item.classList.remove('exit'));
      languageItems[currentIndex].classList.add('active');
    }, 500);
  }
  
  // Start cycling every 3 seconds
  setInterval(cycleLanguages, 3000);
});