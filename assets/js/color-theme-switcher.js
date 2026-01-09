// Color theme switcher functionality
(function() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    const colorThemeToggle = document.getElementById('color-theme-toggle');
    const STORAGE_KEY = 'color-theme';
    
    console.log('Color theme switcher initialized', colorThemeToggle);
    
    if (!colorThemeToggle) {
      console.error('Color theme toggle button not found!');
      return;
    }
    
    // Available color themes with their hex values
    const themes = {
      blue: '#23b0ff',
      orange: '#ff8c42',
      green: '#00d084',
      purple: '#a855f7',
      red: '#ff4757',
      cyan: '#00d9ff',
      yellow: '#ffd93d',
      pink: '#ff6b9d'
    };
    
    const themeOrder = ['blue', 'orange', 'green', 'purple', 'red', 'cyan', 'yellow', 'pink'];
    
    // Get saved theme or default to blue
    let currentThemeIndex = 0;
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    
    if (savedTheme && themeOrder.includes(savedTheme)) {
      currentThemeIndex = themeOrder.indexOf(savedTheme);
    }
    
    // Apply initial theme
    applyTheme(themeOrder[currentThemeIndex]);
    
    // Cycle through themes on click
    colorThemeToggle.addEventListener('click', function(event) {
      event.stopPropagation();
      event.preventDefault();
      
      // Move to next theme
      currentThemeIndex = (currentThemeIndex + 1) % themeOrder.length;
      const newTheme = themeOrder[currentThemeIndex];
      
      console.log('Switching to theme:', newTheme);
      applyTheme(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
    });
    
    function applyTheme(themeName) {
      const color = themes[themeName];
      console.log('Applying theme:', themeName, 'Color:', color);
      
      // Directly set the CSS custom property on the root element
      document.documentElement.style.setProperty('--accent', color);
      
      // Convert hex to RGB for rgba usage
      const rgb = hexToRgb(color);
      if (rgb) {
        document.documentElement.style.setProperty('--accent-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
      }
      
      // Also set on body for the attribute selector
      document.body.setAttribute('data-color-theme', themeName);
      
      // Update cursor color
      updateCursor(color);
      
      console.log('Applied --accent:', getComputedStyle(document.documentElement).getPropertyValue('--accent'));
    }
    
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    
    function updateCursor(color) {
      // For blue theme, use the specific blue cursor SVG
      const baseURL = document.querySelector('base')?.href || window.location.origin + '/';
      let cursorPath;
      
        // Other themes - create dynamic SVG with the theme color
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="${color}" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
        
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        cursorPath = URL.createObjectURL(blob);
      
      // Apply cursor to all elements
      document.documentElement.style.setProperty('cursor', `url('${cursorPath}') 4 4, auto`, 'important');
      document.body.style.setProperty('cursor', `url('${cursorPath}') 4 4, auto`, 'important');
    }
  }
})();
