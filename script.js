// Mobile menu toggle
const menuBtn = document.getElementById('menu');
const nav = document.querySelector('.navi');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    if (themeIcon) {
        themeIcon.classList.replace('bx-moon', 'bx-sun');
    }
}

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.navi a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (menuBtn) {
            menuBtn.classList.remove('active');
        }
    });
});

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark-theme');
        localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');

        if (themeIcon) {
            themeIcon.classList.toggle('bx-moon', !isDark);
            themeIcon.classList.toggle('bx-sun', isDark);
        }
    });
}

// Add active class to current navigation link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

const revealItems = document.querySelectorAll('.home-content, .about-content, .about-img, .exp-box, .project-box, .skills-box, .edu-box, .certificates, .contact-box, .cta-content');
revealItems.forEach(item => item.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
});

revealItems.forEach(item => revealObserver.observe(item));

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
