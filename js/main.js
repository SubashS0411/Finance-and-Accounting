document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle Curtain Drop (Height)
            if (mobileMenu.classList.contains('h-0')) {
                mobileMenu.classList.remove('h-0');
                mobileMenu.classList.add('h-screen');
                // Change icon to close
                mobileMenuBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
            } else {
                mobileMenu.classList.remove('h-screen');
                mobileMenu.classList.add('h-0');
                // Change icon back to bars
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('h-screen');
                mobileMenu.classList.add('h-0');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            });
        });
    }

    // Tax Calculator (Index Page)
    const taxInput = document.getElementById('tax-income-input');
    const taxResult = document.getElementById('tax-savings-result');
    const taxBtn = document.getElementById('calculate-tax-btn');

    if (taxBtn && taxInput && taxResult) {
        taxBtn.addEventListener('click', () => {
            const income = parseFloat(taxInput.value);
            if (!isNaN(income)) {
                // Simple logic: Input * 0.30 = Estimated Tax (or Savings as per PRD)
                // PRD says "Estimate your Tax Savings" (Input Income -> Show potential savings)
                // PRD Logic spec: Input * 0.30 = Estimated Tax. 
                // I'll assume "Savings" might be a percentage of that, but let's stick to the logic spec: Input * 0.30
                const estimatedTax = income * 0.30;
                taxResult.textContent = `$${estimatedTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                taxResult.parentElement.classList.remove('hidden');
            }
        });
    }

    // Pricing Toggle (Pricing Page)
    const pricingToggle = document.getElementById('pricing-toggle');
    const priceAmounts = document.querySelectorAll('.price-amount');
    const pricePeriods = document.querySelectorAll('.price-period');

    if (pricingToggle) {
        pricingToggle.addEventListener('change', (e) => {
            const isQuarterly = e.target.checked; // Assuming checkbox: unchecked=Monthly, checked=Quarterly
            
            priceAmounts.forEach(amount => {
                const basePrice = parseFloat(amount.dataset.basePrice);
                if (isQuarterly) {
                    // Apply 10% discount for quarterly
                    const quarterlyPrice = (basePrice * 3) * 0.9;
                    amount.textContent = quarterlyPrice.toLocaleString(undefined, {maximumFractionDigits: 0});
                } else {
                    amount.textContent = basePrice.toLocaleString();
                }
            });

            pricePeriods.forEach(period => {
                period.textContent = isQuarterly ? '/quarter' : '/month';
            });
        });
    }

    // Dashboard Charts (Simple CSS Bar Chart Animation)
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const height = bar.dataset.height;
        if (height) {
            setTimeout(() => {
                bar.style.height = height;
            }, 500);
        }
    });

    // Dashboard Mobile Menu Logic
    const dashboardMenuBtn = document.getElementById('dashboard-mobile-menu-btn');
    const dashboardSidebar = document.getElementById('dashboard-sidebar');
    const closeDashboardBtn = document.getElementById('close-dashboard-menu');

    if (dashboardMenuBtn && dashboardSidebar) {
        dashboardMenuBtn.addEventListener('click', () => {
            dashboardSidebar.classList.remove('-translate-x-full', 'rtl:translate-x-full');
            dashboardSidebar.classList.add('translate-x-0');
        });

        if (closeDashboardBtn) {
            closeDashboardBtn.addEventListener('click', () => {
                const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
                dashboardSidebar.classList.remove('translate-x-0');
                if (isRtl) {
                    dashboardSidebar.classList.add('translate-x-full'); // In RTL, hidden is translate-x-full (right)
                } else {
                    dashboardSidebar.classList.add('-translate-x-full'); // In LTR, hidden is -translate-x-full (left)
                }
            });
        }
    }
});
