document.addEventListener('DOMContentLoaded', () => {
    // Subtle fade-in animation for main cards
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply initial styles and observe
    const cards = document.querySelectorAll('.stat-card, .candidate-card, .vp-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate bars in the Global Momentum chart
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        const targetHeight = bar.style.height;
        bar.style.height = '0%';
        bar.style.transition = `height 1s ease-out ${0.5 + (index * 0.1)}s, transform 0.2s`;

        // Trigger reflow
        bar.offsetHeight;

        // Set target height after a tiny delay
        setTimeout(() => {
            bar.style.height = targetHeight;
        }, 100);
    });
});
