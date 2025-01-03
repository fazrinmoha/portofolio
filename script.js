// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navigation Menu Toggle
function toggleMenu() {
    const navbar = document.querySelector('.dropdown');
    navbar.style.transform = 
        navbar.style.transform === 'translateY(0px)' 
            ? 'translateY(-500px)' 
            : 'translateY(0px)';
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const dropdown = document.querySelector('.dropdown');
            if (dropdown.style.transform === 'translateY(0px)') {
                toggleMenu();
            }
        }
    });
});

// Typewriter Effect
class TypeWriter {
    constructor(textElement, words, wait = 3000) {
        this.textElement = textElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.textElement.innerHTML = this.txt;

        // Initial Type Speed
        let typeSpeed = 200;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.typewriter-text');
    const words = [
        'Web Developer',
        'UI/UX Designer',
        'Frontend Developer',
        'Creative Developer'
    ];
    new TypeWriter(txtElement, words);
}

// Skills Animation
const skillBars = document.querySelectorAll('.skill-per');

const animateSkills = () => {
    skillBars.forEach(skill => {
        const percentage = skill.classList.contains('html') ? '90%' :
                         skill.classList.contains('css') ? '80%' :
                         skill.classList.contains('javascript') ? '70%' :
                         skill.classList.contains('php') ? '60%' : '0%';
        
        skill.style.width = percentage;
        
        // Add tooltip
        const tooltip = skill.querySelector('.tooltip');
        if (tooltip) {
            tooltip.textContent = percentage;
        }
    });
};

// Trigger skill animation when scrolled into view
const skillsSection = document.querySelector('.skills');
const observerOptions = {
    threshold: 0.5
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic form validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                
                // Remove error class when user starts typing
                input.addEventListener('input', () => {
                    input.classList.remove('error');
                });
            }
        });
        
        if (isValid) {
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            alert('Message sent successfully!');
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Add active class to current nav link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-container .links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});