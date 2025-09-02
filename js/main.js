// DOM Elements
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const reportDownloadButtons = document.querySelectorAll('.report-download');

// Mobile Menu Toggle
function initMobileMenu() {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Check if it's an internal link (starts with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow based on scroll position
        if (scrollTop > 50) {
            header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(255, 40, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Active Navigation Link
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Report Download Functionality
function initReportDownloads() {
    reportDownloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const reportYear = button.getAttribute('data-report');
            downloadReport(reportYear, button);
        });
    });
}

function downloadReport(year, buttonElement) {
    // Show loading state
    const originalContent = buttonElement.innerHTML;
    const originalClasses = buttonElement.className;
    
    buttonElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scaricando...';
    buttonElement.disabled = true;
    
    // Direct download without simulation
    setTimeout(() => {
        const reportFiles = {
            '2024': 'reports/Ferrari_Sustainability_Report_2024.pdf',
            '2023': 'reports/Ferrari_Sustainability_Report_2023.pdf',
            '2022': 'reports/Ferrari_Sustainability_Report_2022.pdf',
            '2021': 'reports/Ferrari_Sustainability_Report_2021.pdf',
            '2020': 'reports/Ferrari_Sustainability_Report_2020.pdf'
        };
        
        const fileName = reportFiles[year];
        
        if (fileName) {
            // Create direct download link
            const link = document.createElement('a');
            link.href = fileName;
            link.download = `Ferrari_Sustainability_Report_${year}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Success state with simple animation
            buttonElement.innerHTML = '<i class="fas fa-check-circle"></i> Scaricato!';
            buttonElement.className = originalClasses + ' success';
            
            // Add a subtle pulse effect
            buttonElement.style.animation = 'pulse 0.6s ease-in-out';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                buttonElement.innerHTML = originalContent;
                buttonElement.className = originalClasses;
                buttonElement.style.animation = '';
                buttonElement.disabled = false;
            }, 3000);
        } else {
            // Error state
            buttonElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Errore';
            buttonElement.className = originalClasses + ' error';
            
            setTimeout(() => {
                buttonElement.innerHTML = originalContent;
                buttonElement.className = originalClasses;
                buttonElement.disabled = false;
            }, 3000);
        }
    }, 800);
}

// Scroll to Top Functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopButton.className = 'scroll-to-top';
    scrollTopButton.setAttribute('aria-label', 'Torna in cima');
    
    // Add styles
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--ferrari-red);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        z-index: 1000;
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        box-shadow: 0 4px 20px rgba(255, 40, 0, 0.3);
    `;
    
    // Add to document
    document.body.appendChild(scrollTopButton);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.style.opacity = '1';
            scrollTopButton.style.visibility = 'visible';
            scrollTopButton.style.transform = 'translateY(0)';
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.visibility = 'hidden';
            scrollTopButton.style.transform = 'translateY(20px)';
        }
    });
    
    // Scroll to top functionality
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollTopButton.addEventListener('mouseenter', () => {
        scrollTopButton.style.backgroundColor = 'var(--ferrari-dark-red)';
        scrollTopButton.style.transform = 'translateY(-2px)';
    });
    
    scrollTopButton.addEventListener('mouseleave', () => {
        scrollTopButton.style.backgroundColor = 'var(--ferrari-red)';
        scrollTopButton.style.transform = 'translateY(0)';
    });
}

// Animation on Scroll (AOS)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate (excluding header logo and hero image which should be immediately visible)
    const elementsToAnimate = document.querySelectorAll(
        '.sustainability-card, .report-card'
    );
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Animate hero content with delay but keep hero image visible
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Animate after a short delay
        setTimeout(() => {
            heroContent.classList.add('animate-in');
        }, 300);
    }
}

// Add CSS for animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Skip lazy loading for header logo and hero image - they should be immediately visible
                if (img.closest('.nav-logo') || img.closest('.hero-image')) {
                    imageObserver.unobserve(img);
                    return;
                }
                
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        // Don't observe header logo and hero image
        if (!img.closest('.nav-logo') && !img.closest('.hero-image')) {
            imageObserver.observe(img);
        }
    });
}

// Initialize all functionality
function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
}

function initializeApp() {
    try {
        addAnimationStyles();
        initMobileMenu();
        initSmoothScrolling();
        initHeaderScrollEffect();
        initActiveNavigation();
        initReportDownloads();
        initScrollToTop();
        initScrollAnimations();
        initLazyLoading();
        
        console.log('Ferrari Sustainability Portal initialized successfully!');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Start the application
init();
