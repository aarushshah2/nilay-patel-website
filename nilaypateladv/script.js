/* ==========================================
   ADVOCATE NILAY H. PATEL — WEBSITE SCRIPTS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Disclaimer popup ----
    const disclaimerOverlay = document.getElementById('disclaimerOverlay');
    const disclaimerAccept = document.getElementById('disclaimerAccept');
    const disclaimerReject = document.getElementById('disclaimerReject');

    // Lock body scroll while disclaimer is showing
    document.body.classList.add('disclaimer-active');

    disclaimerAccept.addEventListener('click', () => {
        disclaimerOverlay.classList.add('hidden');
        document.body.classList.remove('disclaimer-active');
        // Remove from DOM after fade-out animation
        setTimeout(() => {
            disclaimerOverlay.remove();
        }, 400);
    });

    disclaimerReject.addEventListener('click', () => {
        // Redirect user away from the website
        window.location.href = 'https://www.google.com';
    });

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background on scroll
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll-to-top button
        if (scrollY > 400) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveLink();
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Mobile hamburger menu ----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    function openMobileMenu() {
        hamburger.classList.add('active');
        navLinks.classList.add('open');
        navOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close menu when overlay is tapped
    navOverlay.addEventListener('click', closeMobileMenu);

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // ---- Practice area tabs ----
    const tabs = document.querySelectorAll('.practice-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) {
                    content.classList.add('active');
                }
            });
        });
    });

    // ---- Scroll reveal animations ----
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Active nav link highlight ----
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                const activeLink = navLinks.querySelector(`a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }

    // ---- Contact form handler ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Build mailto link
            const mailtoSubject = encodeURIComponent(subject || 'Legal Consultation Request');
            const mailtoBody = encodeURIComponent(
                `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\n${message}`
            );
            window.location.href = `mailto:nilaypateladvocate@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

            // Show confirmation
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.textContent;
            btn.textContent = '✓ Opening Email Client...';
            btn.style.background = '#2a7d5a';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // ---- Smooth scroll polyfill for nav links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ---- Counter animation ----
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const text = counter.textContent;
            const match = text.match(/(\d+)/);
            if (!match) return;

            const target = parseInt(match[1]);
            const suffix = text.replace(match[1], '');
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
            }, 40);
        });
    }

    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const heroSection = document.querySelector('.hero');
    if (heroSection) heroObserver.observe(heroSection);

});
