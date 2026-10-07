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
    const track = document.getElementById('reflectionsTrack');
    const dots = document.querySelectorAll('.reflections-dot');
    const prevBtn = document.getElementById('reflectionsPrev');
    const nextBtn = document.getElementById('reflectionsNext');
    let currentPage = 0;
    const totalPages = 2; // 6 cards, 3 visible at a time

    function goToPage(pageIndex) {
        if (!track) return;
        currentPage = Math.max(0, Math.min(pageIndex, totalPages - 1));
        const offset = currentPage * 100; // shifts by one full visible set (3 cards) per page
        track.style.transform = `translateX(-${offset}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('reflections-dot--active', i === currentPage);
        });
    }

    if (track) {
        dots.forEach((dot) => {
            dot.addEventListener('click', () => goToPage(parseInt(dot.dataset.page)));
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
        }
    }

    // FAQ Accordion Toggle
    document.querySelectorAll('.faq-item__question').forEach((button) => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            const answer = button.nextElementSibling;
            button.setAttribute('aria-expanded', String(!expanded));
            answer.style.maxHeight = expanded ? '0' : answer.scrollHeight + 'px';
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
});
