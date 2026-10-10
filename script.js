// Good Job Ministry - Header Interactions
// Pure Vanilla JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaButton = document.getElementById('cta-button');

    // Handle nav link interactions without reloading page
    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            
            navLinks.forEach((item) => item.classList.remove('active'));
            link.classList.add('active');

            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Handle CTA button click
    if (ctaButton) {
        ctaButton.addEventListener('click', (event) => {
            event.preventDefault();
            const inviteSection = document.getElementById('invite');
            if (inviteSection) {
                inviteSection.scrollIntoView({ behavior: 'smooth' });
            }
            console.log('Invite Us to Speak clicked');
        });
    }

    // Form submission handlers - WhatsApp integration
    const inviteForm = document.getElementById('inviteForm');
    const feedbackForm = document.getElementById('feedbackForm');
    const faqForm = document.getElementById('faqForm');

    const WHATSAPP_NUMBER = '2348081832852';

    function sendToWhatsApp(formData, formLabel) {
        const lines = [`*New ${formLabel} Submission*`, ''];
        for (const [key, value] of formData.entries()) {
            if (value.trim()) lines.push(`*${key}:* ${value}`);
        }
        const message = encodeURIComponent(lines.join('\n'));
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    }

    // Invite form
    inviteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        sendToWhatsApp(new FormData(inviteForm), 'Speaking Invitation');
    });

    // Feedback form
    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        sendToWhatsApp(new FormData(feedbackForm), 'Feedback');
    });

    // FAQ form
    faqForm.addEventListener('submit', (event) => {
        event.preventDefault();
        sendToWhatsApp(new FormData(faqForm), 'Question');
    });

    // Reflections Carousel
    const reflectionsTrack = document.getElementById('reflectionsTrack');
    const reflectionCards = reflectionsTrack.querySelectorAll('.reflection-card');
    const reflectionsDots = document.getElementById('reflectionsDots');
    const reflectionsPrev = document.getElementById('reflectionsPrev');
    const reflectionsNext = document.getElementById('reflectionsNext');
    let reflectionsPage = 0;

    function reflectionsPerView() {
        return window.matchMedia('(max-width: 768px)').matches ? 1 : 3;
    }

    function reflectionsTotalPages() {
        return Math.ceil(reflectionCards.length / reflectionsPerView());
    }

    function renderReflectionsDots() {
        reflectionsDots.innerHTML = '';
        for (let i = 0; i < reflectionsTotalPages(); i++) {
            const dot = document.createElement('button');
            dot.className = 'reflections-dot';
            dot.setAttribute('aria-label', `Go to page ${i + 1}`);
            dot.addEventListener('click', () => goToReflectionsPage(i));
            reflectionsDots.appendChild(dot);
        }
    }

    function goToReflectionsPage(page) {
        reflectionsPage = Math.max(0, Math.min(page, reflectionsTotalPages() - 1));
        const targetCard = reflectionCards[reflectionsPage * reflectionsPerView()];
        reflectionsTrack.style.transform = `translateX(-${targetCard.offsetLeft}px)`;
        reflectionsDots.querySelectorAll('.reflections-dot').forEach((dot, i) => {
            dot.classList.toggle('reflections-dot--active', i === reflectionsPage);
        });
    }

    reflectionsPrev.addEventListener('click', () => goToReflectionsPage(reflectionsPage - 1));
    reflectionsNext.addEventListener('click', () => goToReflectionsPage(reflectionsPage + 1));

    let lastReflectionsPerView = reflectionsPerView();
    window.addEventListener('resize', () => {
        const current = reflectionsPerView();
        if (current !== lastReflectionsPerView) {
            lastReflectionsPerView = current;
            reflectionsPage = 0;
            renderReflectionsDots();
        }
        goToReflectionsPage(reflectionsPage);
    });

    renderReflectionsDots();
    goToReflectionsPage(0);

    // FAQ Accordion Toggle
    document.querySelectorAll('.faq-item__question').forEach((button) => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            const answer = button.nextElementSibling;
            button.setAttribute('aria-expanded', String(!expanded));
            answer.style.maxHeight = expanded ? '0' : answer.scrollHeight + 'px';
        });
    });

    window.addEventListener('resize', () => {
        document.querySelectorAll('.faq-item__question[aria-expanded="true"]').forEach((button) => {
            const answer = button.nextElementSibling;
            answer.style.maxHeight = answer.scrollHeight + 'px';
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    function openMobileMenu() {
        mobileMenu.classList.add('mobile-menu--open');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // prevents background scroll while menu is open
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('mobile-menu--open');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (mobileMenuToggle && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);

        document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta').forEach((link) => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Three Values Circle - Scroll-Linked Entrance Animation
    const valuesWrapper = document.querySelector('.values-circle__wrapper');
    if (valuesWrapper && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let ticking = false;
        const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

        function updateValuesProgress() {
            const rect = valuesWrapper.getBoundingClientRect();
            const vh = window.innerHeight;
            // 0 when the wrapper's top is at 90% of the viewport height, 1 when it is 50% of the viewport higher
            const raw = clamp((vh * 0.9 - rect.top) / (vh * 0.5), 0, 1);
            valuesWrapper.style.setProperty('--p', easeOutCubic(raw).toFixed(4));
            ticking = false;
        }
        function onScrollOrResize() {
            if (!ticking) { ticking = true; requestAnimationFrame(updateValuesProgress); }
        }
        window.addEventListener('scroll', onScrollOrResize, { passive: true });
        window.addEventListener('resize', onScrollOrResize);
        updateValuesProgress();
    }

    // Scroll Reveal System
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion && 'IntersectionObserver' in window) {
        // stagger: true means siblings in the same group reveal one after another (100ms apart)
        const revealGroups = [
            // Hero (plays on page load, since it is already in view)
            { sel: '.hero-heading' },
            { sel: '.hero-paragraph', delay: 120 },
            { sel: '.hero-buttons', delay: 240 },
            { sel: '.hero-image-col', delay: 200 },
            // Values (text side only. The circle has its own scroll animation, do NOT add it here)
            { sel: '.values-text-col > *', stagger: true },
            // About
            { sel: '.about-header__text' },
            { sel: '.about-header__paragraph', delay: 120 },
            { sel: '.about-image-frame' },
            { sel: '.about-caption', stagger: true },
            // Serve
            { sel: '.serve-header' },
            { sel: '.serve-card', stagger: true },
            // Faith in Action
            { sel: '.faith-text-col' },
            { sel: '.faith-image-col', delay: 120 },
            { sel: '.faith-card', stagger: true },
            // Reflections (animate the wrapper, NOT the individual cards, so the carousel is not affected)
            { sel: '.reflections-header' },
            { sel: '.reflections-track-wrapper' },
            { sel: '.reflections-controls' },
            // Invite, Feedback, FAQ
            { sel: '.invite-text-col' },
            { sel: '.invite-form', delay: 120 },
            { sel: '.feedback-text-col' },
            { sel: '.feedback-form', delay: 120 },
            { sel: '.faq-text-col' },
            { sel: '.faq-item', stagger: true },
            { sel: '.faq-form' }
        ];

        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.classList.add('is-visible');
                io.unobserve(el);
                // clean up once finished so it never interferes with hover or other transitions
                el.addEventListener('transitionend', (e) => {
                    if (e.propertyName !== 'opacity') return;
                    el.classList.remove('reveal', 'is-visible');
                    el.style.removeProperty('--reveal-delay');
                }, { once: true });
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

        revealGroups.forEach((group) => {
            document.querySelectorAll(group.sel).forEach((el, i) => {
                el.classList.add('reveal');
                const delay = group.stagger ? i * 100 : (group.delay || 0);
                el.style.setProperty('--reveal-delay', delay + 'ms');
                io.observe(el);
            });
        });
    }
});
