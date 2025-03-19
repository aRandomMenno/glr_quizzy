
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.querySelector('.dark_mode_toggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode !== null) {
        setDarkMode(isDarkMode);
    }
    
    darkModeToggle.addEventListener('click', function() {
        const currentIsDarkMode = document.documentElement.getAttribute('data_theme') === 'dark';
        setDarkMode(!currentIsDarkMode);
        

        localStorage.setItem('darkMode', !currentIsDarkMode);
    });
    
    function setDarkMode(isDark) {
        if (isDark) {
            document.documentElement.setAttribute('data_theme', 'dark');
            darkModeToggle.classList.add('active');
        } else {
            document.documentElement.setAttribute('data_theme', 'light');
            darkModeToggle.classList.remove('active');
        }
    }
});