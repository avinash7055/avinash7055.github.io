// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav links on scroll and header scroll effect
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Add scrolled class to header
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// EmailJS initialization
(function() {
    // Initialize EmailJS with your public key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('YOUR_PUBLIC_KEY');
})();

// Form submission with EmailJS
const contactForm = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());

        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formValues)
            .then(function() {
                // Show success message
                formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                formStatus.className = 'form-status success';

                // Reset form
                contactForm.reset();
            })
            .catch(function(error) {
                // Show error message
                console.error('Email sending failed:', error);
                formStatus.textContent = 'Oops! Something went wrong. Please try again later.';
                formStatus.className = 'form-status error';
            })
            .finally(function() {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                // Hide status message after 5 seconds
                setTimeout(function() {
                    formStatus.className = 'form-status';
                }, 5000);
            });
    });
}

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const htmlElement = document.documentElement;

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial theme
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    if (htmlElement.getAttribute('data-theme') === 'dark') {
        htmlElement.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add animation on scroll
window.addEventListener('DOMContentLoaded', () => {
    // Animate sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Animate timeline items
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
    });

    // Animate skill categories
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill progress bars
                setTimeout(() => {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const width = bar.parentElement.parentElement.querySelector('span').textContent;
                        const percentage = width.includes('%')
                            ? width
                            : bar.style.width;
                        bar.style.width = percentage;
                    });
                }, 300);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });

    // Animate project cards
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(card => {
        projectObserver.observe(card);
    });

    // Animate contact sections
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.contact-info, .contact-form').forEach(element => {
        contactObserver.observe(element);
    });

    // Animate certificate cards
    const certificateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.certificate-card').forEach(card => {
        certificateObserver.observe(card);
    });

    // Certificate Modal
    const modal = document.getElementById('certificate-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const downloadBtn = document.getElementById('download-btn');

    let currentZoom = 1;
    let isFullscreen = false;

    // Open modal when clicking on certificate
    document.querySelectorAll('.certificate-card').forEach(card => {
        card.addEventListener('click', function() {
            const certPath = 'cert/' + this.getAttribute('data-cert');
            const certTitle = this.querySelector('h3').textContent;
            const certIssuer = this.querySelector('h4').textContent;

            modal.style.display = 'block';
            modalImg.src = certPath;
            modalCaption.textContent = certTitle + ' - ' + certIssuer;
            
            // Reset zoom and fullscreen state
            currentZoom = 1;
            isFullscreen = false;
            modalImg.style.transform = 'scale(1)';
            modalImg.style.maxWidth = '95%';
            modalImg.style.maxHeight = '90vh';
            
            // Update button states
            updateButtonStates();

            // Disable scrolling on body when modal is open
            document.body.style.overflow = 'hidden';
        });
    });

    // Zoom functionality
    zoomInBtn.addEventListener('click', function() {
        if (currentZoom < 3) {
            currentZoom += 0.25;
            modalImg.style.transform = `scale(${currentZoom})`;
            updateButtonStates();
        }
    });

    zoomOutBtn.addEventListener('click', function() {
        if (currentZoom > 0.5) {
            currentZoom -= 0.25;
            modalImg.style.transform = `scale(${currentZoom})`;
            updateButtonStates();
        }
    });

    // Fullscreen functionality
    fullscreenBtn.addEventListener('click', function() {
        if (!isFullscreen) {
            modalImg.style.maxWidth = '100%';
            modalImg.style.maxHeight = '100vh';
            modalImg.style.objectFit = 'contain';
            isFullscreen = true;
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> Exit Fullscreen';
        } else {
            modalImg.style.maxWidth = '95%';
            modalImg.style.maxHeight = '90vh';
            isFullscreen = false;
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
        }
    });

    // Download functionality
    downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = modalImg.src;
        link.download = modalCaption.textContent.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Update button states
    function updateButtonStates() {
        zoomInBtn.disabled = currentZoom >= 3;
        zoomOutBtn.disabled = currentZoom <= 0.5;
    }

    // Close modal when clicking on X
    modalClose.addEventListener('click', function() {
        closeModal();
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
        // Re-enable scrolling
        document.body.style.overflow = 'auto';
        // Reset zoom and fullscreen
        currentZoom = 1;
        isFullscreen = false;
        modalImg.style.transform = 'scale(1)';
        modalImg.style.maxWidth = '95%';
        modalImg.style.maxHeight = '90vh';
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
    }
});
