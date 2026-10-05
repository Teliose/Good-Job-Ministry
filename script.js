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

    // Handle Speaking Invitations form submission
    const inviteForm = document.getElementById('inviteForm');
    if (inviteForm) {
        inviteForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('Invite form submitted:', Object.fromEntries(new FormData(inviteForm)));
            // Replace with actual submission logic once a backend/endpoint is connected
        });
    }

    // Handle Feedback form submission
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('Feedback submitted:', Object.fromEntries(new FormData(feedbackForm)));
            // Replace with actual submission logic once a backend/endpoint is connected
        });
    }

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

    // Handle FAQ form submission
    const faqForm = document.getElementById('faqForm');
    if (faqForm) {
        faqForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('FAQ submitted:', Object.fromEntries(new FormData(faqForm)));
            // Replace with actual submission logic once a backend/endpoint is connected
        });
    }
});
