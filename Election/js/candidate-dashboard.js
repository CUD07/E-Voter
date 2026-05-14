/* js/candidate-dashboard.js */

document.addEventListener('DOMContentLoaded', () => {
  const role = sessionStorage.getItem('activeRole');

  // Enforce candidate-only access
  if (role !== 'candidate') {
    alert('This dashboard is only available for registered candidates.');
    window.location.href = 'landing-page.html'; // Or index.html
    return;
  }

  // Handle Profile link (already here, but just in case)
  const profileLink = document.getElementById('nav-profile');
  if (profileLink) {
    profileLink.addEventListener('click', (e) => {
      e.preventDefault();
      // Already on profile
    });
  }

  // Handled by links, but we can do visual active state if needed
  const navLinks = document.querySelectorAll('.cd-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
        return;
      }
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
