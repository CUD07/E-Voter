/* landing-page.js */

document.addEventListener('DOMContentLoaded', () => {
  const role = sessionStorage.getItem('activeRole');

  const voteLink = document.getElementById('nav-vote');
  const profileLink = document.getElementById('nav-profile');

  // Handle Vote link
  voteLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (role === 'voter') {
      window.location.href = 'ballot-page.html';
    } else {
      alert('Only registered voters can access the ballot page.');
    }
  });

  // Handle Profile link
  profileLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (role === 'voter') {
      window.location.href = 'voter-dashboard.html';
    } else {
      alert('Profile dashboard is only available for voters.');
    }
  });

  // Handle active class
  const navLinks = document.querySelectorAll('.lp-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.id === 'nav-vote' || this.id === 'nav-profile') {
        // Handled above
        return;
      }
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
