// Portfolio Custom Scripts

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
mobileMenu.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { mobileMenu.classList.add('hidden'); }); });

// Animate on Scroll
const animatedCards = document.querySelectorAll('.animated-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const delay = Array.from(animatedCards).indexOf(entry.target) % 4 * 100;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
animatedCards.forEach(card => { observer.observe(card); });

// Theme toggle
const themeToggleButton = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('theme-icon-sun');
const moonIcon = document.getElementById('theme-icon-moon');
const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.remove('light-mode');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        document.body.classList.add('light-mode');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
    initParticles(theme);
};
let savedTheme = localStorage.getItem('theme') || 'dark';
themeToggleButton.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Typing animation
const typingText = document.getElementById('typing-text');
const roles = ["Full Stack Developer", "AI & ML Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    const typingSpeed = isDeleting ? 100 : 150;
    setTimeout(type, typingSpeed);
}

// Particles.js initialization
const initParticles = (theme) => {
    const particleColor = theme === 'dark' ? '#ffffff' : '#f00000';
    const lineColor = theme === 'dark' ? '#ffffff' : '#f00000';
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": particleColor },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": true },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": lineColor, "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
      },
      "interactivity": {
        "detect_on": "window",
        "events": { "onhover": { "enable": true, "mode": ["repulse", "bubble"] }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": {
          "repulse": { "distance": 150, "duration": 0.4 },
          "bubble": { "distance": 200, "size": 6, "duration": 2, "opacity": 0.8 },
          "push": { "particles_nb": 4 }
        }
      },
      "retina_detect": true
    });
};

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');
window.addEventListener('mousemove', e => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorCircle.style.left = e.clientX + 'px';
    cursorCircle.style.top = e.clientY + 'px';
});
const interactiveElements = document.querySelectorAll('a, button, .glass-effect');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorCircle.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursorCircle.classList.remove('grow'));
});

// 3D Tilt Effect
const tiltElements = document.querySelectorAll('.glass-effect');
tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        if(el.classList.contains('!transform-none')) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const { width, height } = rect;
        const rotateX = (y / height - 0.5) * -15;
        const rotateY = (x / width - 0.5) * 15;
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        el.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    });
    el.addEventListener('mouseleave', () => {
         if(el.classList.contains('!transform-none')) return;
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        el.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });
});

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    type();
    applyTheme(savedTheme);
});

// EmailJS Init
(function(){
    emailjs.init({
        publicKey: "HxVXMnOSIr5wt9h7Z",
    });
})();

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const serviceID = 'service_rz8fqfb';
        const templateID = 'template_infw6ni';
        const autoReplyTemplateID = 'template_96eu23u';
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;
        const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value,
        };
        emailjs.send(serviceID, templateID, formData)
            .then(() => {
                return emailjs.send(serviceID, autoReplyTemplateID, formData);
            })
            .then(() => {
                submitButton.innerHTML = 'Message Sent!';
                submitButton.classList.remove('btn-primary');
                submitButton.classList.add('bg-green-500');
                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('bg-green-500');
                    submitButton.classList.add('btn-primary');
                }, 5000);
                contactForm.reset();
            }, (err) => {
                alert(JSON.stringify(err));
                submitButton.innerHTML = 'Failed to Send';
                 setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                }, 5000);
            });
    });
});
