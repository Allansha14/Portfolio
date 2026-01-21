// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// ===== PORTFOLIO FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Get filter value
            const filterValue = button.getAttribute('data-filter');

            // Filter portfolio cards
            portfolioCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const formModal = document.getElementById('formModal');
const modalClose = document.getElementById('modalClose');
const modalStay = document.getElementById('modalStay');
const modalHome = document.getElementById('modalHome');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Sending...';
        submitBtn.disabled = true;

        // Prepare form data and send to FormSubmit AJAX endpoint
        try {
            const formData = new FormData(contactForm);
            const response = await fetch('https://formsubmit.co/ajax/allanebiebi21@gmail.com', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();

            // Show modal with success message
            if (formModal) {
                formModal.setAttribute('aria-hidden', 'false');
            }

            // reset form
            contactForm.reset();
            showFormMessage('Thank you! Your message was sent.', 'success');

            // Auto-redirect after 5 seconds to home if user does not interact
            const autoRedirect = setTimeout(() => {
                window.location.href = 'index.html';
            }, 5000);

            // modal actions
            if (modalClose) modalClose.addEventListener('click', () => {
                if (formModal) formModal.setAttribute('aria-hidden', 'true');
            });

            if (modalStay) modalStay.addEventListener('click', () => {
                if (formModal) formModal.setAttribute('aria-hidden', 'true');
                clearTimeout(autoRedirect);
            });

            if (modalHome) modalHome.addEventListener('click', () => {
                // user clicked go home, clear any pending redirect and go now
                clearTimeout(autoRedirect);
                window.location.href = 'index.html';
            });

        } catch (error) {
            showFormMessage('There was an error sending your message. Please try again later.', 'error');
            console.error('Form submit error:', error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function showFormMessage(message, type) {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// ===== ACTIVE NAV LINK =====
window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.feature-card, .portfolio-card, .skill-card, .education-card, .certification-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #2563eb;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 24px;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
        scrollToTopBtn.style.alignItems = 'center';
        scrollToTopBtn.style.justifyContent = 'center';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect on scroll to top button
scrollToTopBtn.addEventListener('mouseover', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
    scrollToTopBtn.style.background = '#1e40af';
});

scrollToTopBtn.addEventListener('mouseout', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
    scrollToTopBtn.style.background = '#2563eb';
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Animate stat counters
window.addEventListener('load', () => {
    const statItems = document.querySelectorAll('.stat-item h3');
    let hasAnimated = false;

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                statItems.forEach(item => {
                    const text = item.textContent.replace(/[^0-9]/g, '');
                    if (text) {
                        animateCounter(item, parseInt(text));
                    }
                });
                hasAnimated = true;
                statObserver.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statObserver.observe(statsSection);
    }
});

// ===== TYPING ANIMATION =====
function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Apply typing animation to hero text
window.addEventListener('load', () => {
    const heroP = document.querySelector('.hero p');
    if (heroP) {
        const originalText = heroP.textContent;
        typeText(heroP, originalText, 30);
    }
});

// ===== DYNAMIC BACKGROUND COLOR =====
function adjustNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) {
            navbar.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
}

adjustNavbarOnScroll();

// ===== IMAGE LAZY LOADING =====
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===== CONSOLE LOG =====
console.log('%cData Analysis Portfolio', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cWelcome! Let\'s work together to transform your data into insights.', 'color: #64748b; font-size: 14px;');
console.log('%cContact: your.email@example.com', 'color: #10b981; font-size: 12px;');
