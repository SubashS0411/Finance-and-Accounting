document.addEventListener('DOMContentLoaded', () => {
    // Select all toggle buttons (desktop and mobile)
    const rtlToggleBtns = document.querySelectorAll('#rtl-toggle, #mobile-rtl-toggle');
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Load saved preference
    const savedDir = localStorage.getItem('site-direction');
    if (savedDir) {
        htmlElement.setAttribute('dir', savedDir);
        updateDashboardSidebar(savedDir);
    }

    function updateDashboardSidebar(direction) {
        const dashboardSidebar = document.getElementById('dashboard-sidebar');
        if (dashboardSidebar && window.innerWidth < 768) {
            // Reset sidebar position when switching direction in mobile view
            dashboardSidebar.classList.remove('translate-x-0', '-translate-x-full', 'translate-x-full');
            if (direction === 'rtl') {
                dashboardSidebar.classList.add('translate-x-full');
            } else {
                dashboardSidebar.classList.add('-translate-x-full');
            }
            // Also hide overlay if visible
            const overlay = document.getElementById('dashboard-overlay');
            if (overlay) {
                overlay.classList.remove('is-active');
                overlay.classList.add('hidden');
            }
        }
    }

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Start Animation
            bodyElement.classList.add('page-turning');

            setTimeout(() => {
                // Toggle Direction
                const currentDir = htmlElement.getAttribute('dir');
                const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
                htmlElement.setAttribute('dir', newDir);
                
                // Save preference
                localStorage.setItem('site-direction', newDir);

                // Update dashboard sidebar if present
                updateDashboardSidebar(newDir);

                // Let other scripts (e.g., dashboard menu) react
                window.dispatchEvent(new Event('directionchange'));

                // End Animation
                bodyElement.classList.remove('page-turning');
            }, 500); // Match CSS transition duration
        });
    });
});
