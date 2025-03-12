document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    const infoPanel = document.querySelector('.information');
    const closeButton = document.createElement('div');
    closeButton.className = 'close-info';
    closeButton.innerHTML = '✕';
    infoPanel.appendChild(closeButton);
    
    const infoButton = document.querySelector('.information_button');
    
    function showInfoPanel(e) {
        e.preventDefault();
        infoPanel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function hideInfoPanel() {
        infoPanel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    infoButton.addEventListener('click', showInfoPanel);
    closeButton.addEventListener('click', hideInfoPanel);
    overlay.addEventListener('click', hideInfoPanel);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideInfoPanel();
        }
    });
});