document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // SCROLL-TRIGGERED ANIMATIONS
    // ============================================
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollAnimateElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // Animation duration in ms
                const startTime = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (ease-out-cubic)
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(target * easeOut);
                    
                    counter.textContent = current.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ============================================
    // MOBILE MENU LOGIC
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle Curtain Drop (Height)
            if (mobileMenu.classList.contains('h-0')) {
                mobileMenu.classList.remove('h-0');
                mobileMenu.classList.add('h-screen');
                mobileMenu.classList.add('is-open');
                // Change icon to close
                mobileMenuBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
            } else {
                mobileMenu.classList.remove('h-screen');
                mobileMenu.classList.add('h-0');
                mobileMenu.classList.remove('is-open');
                // Change icon back to bars
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('h-screen');
                mobileMenu.classList.add('h-0');
                mobileMenu.classList.remove('is-open');
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
    const dashboardOverlay = document.getElementById('dashboard-overlay');

    function syncDashboardSidebarForViewport() {
        if (!dashboardSidebar) return;

        const isDesktop = window.innerWidth >= 768; // Tailwind md breakpoint
        const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

        // Always show sidebar on desktop
        if (isDesktop) {
            dashboardSidebar.classList.remove('-translate-x-full', 'translate-x-full');
            dashboardSidebar.classList.add('translate-x-0');
            if (dashboardOverlay) {
                dashboardOverlay.classList.remove('is-active');
                dashboardOverlay.classList.add('hidden');
            }
            return;
        }

        // On mobile, keep it closed by default (unless opened)
        if (!dashboardSidebar.classList.contains('translate-x-0')) {
            dashboardSidebar.classList.remove('-translate-x-full', 'translate-x-full');
            dashboardSidebar.classList.add(isRtl ? 'translate-x-full' : '-translate-x-full');
            if (dashboardOverlay) {
                dashboardOverlay.classList.remove('is-active');
                dashboardOverlay.classList.add('hidden');
            }
        }
    }

    function openDashboardMenu() {
        if (dashboardSidebar) {
            dashboardSidebar.classList.remove('-translate-x-full', 'translate-x-full');
            dashboardSidebar.classList.add('translate-x-0');
            if (dashboardOverlay) {
                dashboardOverlay.classList.remove('hidden');
                requestAnimationFrame(() => dashboardOverlay.classList.add('is-active'));
            }
        }
    }

    function closeDashboardMenu() {
        if (dashboardSidebar) {
            dashboardSidebar.classList.remove('translate-x-0');
            const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
            if (isRtl) {
                dashboardSidebar.classList.add('translate-x-full');
            } else {
                dashboardSidebar.classList.add('-translate-x-full');
            }
            if (dashboardOverlay) {
                dashboardOverlay.classList.remove('is-active');
                window.setTimeout(() => {
                    dashboardOverlay.classList.add('hidden');
                }, 230);
            }
        }
    }

    if (dashboardMenuBtn) {
        dashboardMenuBtn.addEventListener('click', openDashboardMenu);
    }

    if (closeDashboardBtn) {
        closeDashboardBtn.addEventListener('click', closeDashboardMenu);
    }

    if (dashboardOverlay) {
        dashboardOverlay.addEventListener('click', closeDashboardMenu);
    }

    // Keep sidebar state correct when switching RTL/LTR or resizing
    window.addEventListener('resize', syncDashboardSidebarForViewport);
    window.addEventListener('directionchange', () => {
        // Close on mobile, show on desktop
        if (window.innerWidth < 768) {
            closeDashboardMenu();
        }
        syncDashboardSidebarForViewport();
    });

    syncDashboardSidebarForViewport();

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
        });
    }

    // ============================================
    // PARALLAX EFFECT FOR HERO SECTIONS
    // ============================================
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            el.style.transform = `translateY(${rate}px)`;
        });
    });

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ============================================
    // TOOLTIP INITIALIZATION
    // ============================================
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(el => {
        el.classList.add('tooltip');
    });

    // ============================================
    // PROGRESS BAR ANIMATION
    // ============================================
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // ============================================
    // FORM VALIDATION ENHANCEMENT
    // ============================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.checkValidity()) {
                    input.classList.remove('border-red-500');
                    input.classList.add('border-green-500');
                } else if (input.value) {
                    input.classList.remove('border-green-500');
                    input.classList.add('border-red-500');
                }
            });

            input.addEventListener('input', () => {
                input.classList.remove('border-red-500', 'border-green-500');
            });
        });
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-oxford-blue text-white rounded-full shadow-lg hover:bg-blue-800 transition-all duration-300 z-50 opacity-0 invisible transform translate-y-4';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
            backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4');
            backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
