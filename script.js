/* ============================================
   RAMAJEE PRASAD - INTERACTIVE RESUME
   JavaScript Functionality
============================================= */

// ============================================
// DOM CONTENT LOADED EVENT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initCounterAnimation();
    initBackToTop();
    initSmoothScroll();
    initProfileImage();
});

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// TYPING EFFECT FOR HERO SECTION
// ============================================
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    const titles = [
        'AI Trainer',
        'Data Analytics Expert',
        'Power BI Specialist',
        'Excel Master',
        'Microsoft Copilot Certified',
        'Technology Educator'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            // Remove characters
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Add characters
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Check if word is complete
        if (!isDeleting && charIndex === currentTitle.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect
    setTimeout(typeEffect, 1000);
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animated class with delay for staggered effect
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    animatedElements.forEach((element, index) => {
        // Add staggered delay
        element.dataset.delay = index * 100;
        observer.observe(element);
    });
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.dataset.progress;
                
                // Animate the progress bar
                setTimeout(() => {
                    progressBar.style.width = `${progress}%`;
                }, 200);
                
                // Unobserve after animation
                observer.unobserve(progressBar);
            }
        });
    }, skillObserverOptions);

    // Observe all skill bars
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const counterObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, counterObserverOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Counter animation function
function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
        
        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top on click
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// PROFILE IMAGE PLACEHOLDER
// ============================================
function initProfileImage() {
    const profileImg = document.getElementById('profileImg');
    
    // Create a placeholder with initials if image fails to load
    profileImg.onerror = function() {
        // Create canvas placeholder
        const canvas = document.createElement('canvas');
        canvas.width = 280;
        canvas.height = 280;
        const ctx = canvas.getContext('2d');
        
        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, 280, 280);
        gradient.addColorStop(0, '#1e3a5f');
        gradient.addColorStop(1, '#3b82f6');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 280, 280);
        
        // Add initials
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 80px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('RP', 140, 140);
        
        // Set canvas as image source
        this.src = canvas.toDataURL();
    };
    
    // Trigger error to show placeholder since src is "#"
    if (profileImg.src.endsWith('#')) {
        profileImg.onerror();
    }
}

// ============================================
// INTERACTIVE HOVER EFFECTS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ============================================
// PARALLAX EFFECT FOR HERO PARTICLES
// ============================================
document.addEventListener('mousemove', function(e) {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ============================================
// CARD TILT EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.domain-card, .skill-card, .edu-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
console.log(`
%c╔══════════════════════════════════════════╗
║                                          ║
║      RAMAJEE PRASAD                      ║
║      AI & Data Analytics Trainer         ║
║                                          ║
║      Professional Resume                 ║
║                                          ║
╚══════════════════════════════════════════╝
`, 'color: #3b82f6; font-family: monospace; font-size: 12px;');

// ============================================
// PRELOADER (Optional Enhancement)
// ============================================
window.addEventListener('load', function() {
    // Add a subtle fade-in effect when page loads
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================
document.addEventListener('keydown', function(e) {
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});