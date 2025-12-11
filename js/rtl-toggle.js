document.addEventListener('DOMContentLoaded', () => {
    // Select all toggle buttons (desktop and mobile)
    const rtlToggleBtns = document.querySelectorAll('#rtl-toggle, #mobile-rtl-toggle');
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Load saved preference
    const savedDir = localStorage.getItem('site-direction');
    if (savedDir) {
        htmlElement.setAttribute('dir', savedDir);
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

                // End Animation
                bodyElement.classList.remove('page-turning');
            }, 500); // Match CSS transition duration
        });
    });
});
