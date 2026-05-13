document.addEventListener('DOMContentLoaded', () => {
    // Add subtle fade-in animation to cards
    const cards = document.querySelectorAll('.card, .stat-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });

    // Add subtle progress bar animation
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        bar.style.transition = 'width 1s cubic-bezier(0.22, 1, 0.36, 1)';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 500);
    });
});
