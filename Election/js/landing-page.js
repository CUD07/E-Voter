/* landing-page.js */

document.addEventListener('DOMContentLoaded', () => {
  const role = sessionStorage.getItem('activeRole');

  const profileLink = document.getElementById('nav-profile');
  const ballotLink = document.getElementById('nav-ballot');

  // Handle Profile link
  if (profileLink) {
    profileLink.addEventListener('click', (e) => {
      if (role === 'admin') {
        e.preventDefault();
        window.location.href = 'admin-dashboard.html';
      } else if (role === 'candidate') {
        e.preventDefault();
        window.location.href = 'candidate-dashboard.html';
      } else if (role !== 'voter') {
        e.preventDefault();
        alert('Profile dashboard is not available for this role.');
      }
      // If role === 'voter', it navigates naturally to voter-dashboard.html via href
    });
  }

  // Handle Ballot link (accessible to all logged-in users)
  // No restriction needed.

  // Handle active class visually (though most will navigate away)
  const navLinks = document.querySelectorAll('.lp-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
        // Let it navigate normally if it passes the role checks
        return;
      }
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
