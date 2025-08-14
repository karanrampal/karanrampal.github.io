// Portfolio Website JavaScript Enhancements

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // 1. SMOOTH SCROLLING NAVIGATION
    // ================================
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Add active class to clicked nav item
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ================================
    // 2. SCROLL SPY FOR NAVIGATION
    // ================================
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavItem() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavItem);

    // ================================
    // Performance optimization for scroll events
    // ================================
    const throttledUpdateNav = throttle(updateActiveNavItem, 50);
    window.addEventListener('scroll', throttledUpdateNav);

    // ================================
    // 3. ANIMATED SKILL BARS
    // ================================
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const targetWidth = bar.style.width;
            if (!targetWidth) return; // Skip if no width set
            
            bar.style.width = '0%';
            bar.style.transition = 'width 2s ease-in-out';
            
            // Trigger animation when skill section comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, Math.random() * 500); // Random delay for staggered effect
                    }
                });
            }, { threshold: 0.3 });
            
            const container = bar.closest('.skill-item') || bar.closest('.skill-category') || bar.closest('li');
            if (container) {
                observer.observe(container);
            }
        });
    }
    
    animateSkillBars();

    // ================================
    // 4. TYPING ANIMATION FOR HERO
    // ================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Apply typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 50);
        }, 1000);
    }

    // ================================
    // 5. SCROLL REVEAL ANIMATIONS
    // ================================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.experience-item, .publications-item, .patents-item, .education-item, .skill-category');
        
        reveals.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        });
    }
    
    revealOnScroll();

    // ================================
    // 6. DYNAMIC HEADER BACKGROUND
    // ================================
    const header = document.querySelector('header');
    
    function updateHeaderBackground() {
        const scrolled = window.scrollY;
        
        // Ensure minimum opacity for header background
        const opacity = Math.max(0.95, Math.min(scrolled / 100, 0.98));
        
        header.style.background = `rgba(255, 255, 255, ${opacity})`;
        
        if (scrolled > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderBackground);

    // ================================
    // Performance optimization for header scroll
    // ================================
    const throttledHeaderUpdate = throttle(updateHeaderBackground, 16); // 60fps
    window.addEventListener('scroll', throttledHeaderUpdate);

    // ================================
    // 7. CONTACT FORM SIMULATION
    // ================================
    function addContactFormInteraction() {
        const contactLinks = document.querySelectorAll('#contact a');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Add a small animation when clicking social links
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
    
    addContactFormInteraction();

    // ================================
    // 8. FLOATING PARTICLES BACKGROUND
    // ================================
    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 20 + 20) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    createFloatingParticles();

    // ================================
    // 9. THEME TOGGLE (Light/Dark Mode)
    // ================================
    function addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        
        document.body.appendChild(themeToggle);
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // Save preference
            localStorage.setItem('darkMode', isDark);
        });
        
        // Load saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    addThemeToggle();

    // ================================
    // 10. SCROLL PROGRESS INDICATOR
    // ================================
    function addScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        function updateScrollProgress() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = scrolled + '%';
        }
        
        window.addEventListener('scroll', updateScrollProgress);
        
        // Performance optimization
        const throttledScrollProgress = throttle(updateScrollProgress, 16);
        window.addEventListener('scroll', throttledScrollProgress);
    }
    
    addScrollProgress();

    // ================================
    // 11. LAZY LOADING FOR IMAGES
    // ================================
    function addLazyLoading() {
        const images = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
    
    addLazyLoading();

    // ================================
    // 12. EASTER EGG - KONAMI CODE
    // ================================
    function addEasterEgg() {
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
        let konamiIndex = 0;
        
        document.addEventListener('keydown', function(e) {
            if (e.keyCode === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    // Activate easter egg - rainbow background!
                    document.body.style.animation = 'rainbow 2s infinite';
                    setTimeout(() => {
                        document.body.style.animation = '';
                    }, 10000);
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }
    
    addEasterEgg();

    // ================================
    // 13. MOBILE MENU TOGGLE
    // ================================
    function addMobileMenu() {
        const nav = document.querySelector('nav ul');
        if (!nav) return; // Safety check
        
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        
        const header = document.querySelector('header .container');
        if (!header) return; // Safety check
        
        header.appendChild(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-active');
            this.innerHTML = nav.classList.contains('mobile-active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking nav links
        if (navLinks.length > 0) {
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('mobile-active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    }
    
    addMobileMenu();

    // Initialize everything
    console.log('🚀 Portfolio website enhanced with JavaScript!');
    console.log('💡 Try the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A');
    
    // Verify critical elements exist
    console.log('✅ Navigation links found:', navLinks.length);
    console.log('✅ Sections found:', sections.length);
    console.log('✅ Skill bars found:', document.querySelectorAll('.skill-progress').length);
    console.log('✅ Hero subtitle found:', !!document.querySelector('.hero-subtitle'));
    
    // Test function to verify all features
    window.portfolioTest = function() {
        const tests = {
            'Navigation Links': navLinks.length > 0,
            'Sections': sections.length > 0,
            'Skill Bars': document.querySelectorAll('.skill-progress').length > 0,
            'Hero Subtitle': !!document.querySelector('.hero-subtitle'),
            'Header': !!document.querySelector('header'),
            'Theme Toggle': !!document.querySelector('.theme-toggle'),
            'Scroll Progress': !!document.querySelector('.scroll-progress'),
            'Mobile Menu': !!document.querySelector('.mobile-menu-toggle')
        };
        
        console.table(tests);
        return tests;
    };
    
    // Auto-run test after a delay
    setTimeout(() => {
        console.log('🧪 Running automatic feature test...');
        window.portfolioTest();
    }, 2000);
});

// ================================
// UTILITY FUNCTIONS
// ================================

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}
