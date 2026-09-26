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
            console.log('Invite Us to Speak clicked');
        });
    }
});
