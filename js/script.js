// Mobile Navigation Toggle with 3D Effect
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

// 3D Tilt Effect for Navigation Items
navLinksItems.forEach((item, index) => {
    item.style.transition = `transform 0.3s ease ${index * 0.1}s, opacity 0.3s ease ${index * 0.1}s`;
    
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px) rotateY(20deg)';
        item.style.opacity = '0.9';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0) rotateY(0)';
        item.style.opacity = '1';
    });
});

// Toggle mobile menu with 3D effect
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        navLinksItems.forEach((item, index) => {
            item.style.transform = `translateX(-20px)`;
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, 50 * index);
        });
    }
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Enhanced Smooth Scrolling with 3D Parallax Effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
            
            // Smooth scroll with easing
            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.offsetTop - 80;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                
                // Easing function (easeInOutCubic)
                const easeInOutCubic = t => t < 0.5 
                    ? 4 * t * t * t 
                    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                
                window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            
            window.requestAnimationFrame(step);
        }
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero) {
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;
        hero.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
    });
    
    // Reset transform when mouse leaves
    hero.addEventListener('mouseleave', () => {
        hero.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.padding = '15px 0';
    } else {
        navbar.style.background = 'rgba(18, 18, 18, 0.9)';
        navbar.style.padding = '20px 0';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Enhanced Animation on Scroll with 3D Effects
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll, .content-item, .about-text, .floating-shapes .shape');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            if (!element.classList.contains('animated')) {
                element.classList.add('animated');
                
                // Add staggered animations for content items
                if (element.classList.contains('content-item')) {
                    element.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
                }
            }
        }
    });
};

// Intersection Observer for smooth animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-on-scroll, .content-item, .about-text').forEach(el => {
    observer.observe(el);
    
    // Initial state for content items
    if (el.classList.contains('content-item')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) rotateX(20deg) rotateY(20deg)';
    }
});

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Add floating animation to shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const duration = 15 + Math.random() * 10;
        const delay = Math.random() * 5;
        shape.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
});

// Mouse move parallax effect for floating shapes
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.querySelectorAll('.shape').forEach(shape => {
        const speed = shape.dataset.speed || 30;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        
        shape.style.transform = `translate(calc(-50% + ${xMove}px), calc(-50% + ${yMove}px))`;
    });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('footer p');
if (yearElement) {
    yearElement.textContent = `© ${currentYear} LosSonic Studios. All rights reserved.`;
}

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
