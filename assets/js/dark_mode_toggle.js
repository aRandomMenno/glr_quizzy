
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode !== null) {
        setDarkMode(isDarkMode);
    }
    
    darkModeToggle.addEventListener('click', function() {
        const currentIsDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        setDarkMode(!currentIsDarkMode);
        

        localStorage.setItem('darkMode', !currentIsDarkMode);
    });
    
    function setDarkMode(isDark) {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            darkModeToggle.classList.add('active');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            darkModeToggle.classList.remove('active');
        }
    }
});