document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full', '-translate-x-full');
            mobileMenu.classList.add('translate-x-0');
        });

        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', () => {
                const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
                mobileMenu.classList.remove('translate-x-0');
                mobileMenu.classList.add(isRtl ? '-translate-x-full' : 'translate-x-full');
            });
        }
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
                    amount.textContent = (basePrice * 3).toLocaleString();
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
});
