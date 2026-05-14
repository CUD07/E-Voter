/* js/admin-dashboard.js */

document.addEventListener('DOMContentLoaded', () => {
  const role = sessionStorage.getItem('activeRole');

  // Enforce admin-only access
  if (role !== 'admin') {
    alert('This dashboard is only available for system administrators.');
    window.location.href = 'landing-page.html'; // Or index.html
    return;
  }

  // Handled by links, but we can do visual active state if needed
  const navLinks = document.querySelectorAll('.ad-nav-link');
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

  const menuItems = document.querySelectorAll('.ad-menu-item');
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
        return;
      }
      e.preventDefault();
      menuItems.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
