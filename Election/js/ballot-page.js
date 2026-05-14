/* ballot-page.js */

document.addEventListener('DOMContentLoaded', () => {
  const role = sessionStorage.getItem('activeRole');
  
  // Handle Profile link restrict to voter or candidate
  const profileLink = document.getElementById('nav-profile');
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
    });
  }

  // Handle Ballot link
  // Accessible to all users, but only voters can cast votes.
  if (role !== 'voter') {
    // Disable all voting buttons
    document.querySelectorAll('.bp-btn-vote').forEach(btn => {
      btn.disabled = true;
      btn.style.cursor = 'not-allowed';
      btn.style.opacity = '0.6';
      btn.title = 'Only students with the Voter role can cast votes.';
    });

    // Disable footer actions
    const submitBtn = document.querySelector('.bp-btn-submit');
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.cursor = 'not-allowed';
      submitBtn.style.opacity = '0.6';
      submitBtn.innerHTML = 'Voters Only <span class="material-icons" style="font-size: 1.1rem;">block</span>';
    }

    // Optional: Show a subtle notice in the header
    const header = document.querySelector('.bp-header');
    if (header) {
      const notice = document.createElement('div');
      notice.style.padding = '0.75rem 1rem';
      notice.style.backgroundColor = '#fff7ed';
      notice.style.border = '1px solid #ffedd5';
      notice.style.borderRadius = '8px';
      notice.style.color = '#9a3412';
      notice.style.fontSize = '0.85rem';
      notice.style.marginTop = '1rem';
      notice.style.display = 'flex';
      notice.style.alignItems = 'center';
      notice.style.gap = '0.5rem';
      notice.innerHTML = '<span class="material-icons" style="font-size: 1.2rem;">info</span> You are viewed this page as a ' + (role || 'guest') + '. Only registered voters can cast ballots.';
      header.appendChild(notice);
    }
  }

  // Handle position navigation active states
  const posItems = document.querySelectorAll('.bp-pos-item');
  posItems.forEach(item => {
    item.addEventListener('click', () => {
      posItems.forEach(p => p.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Handle voting selection
  const candidateCards = document.querySelectorAll('.bp-card');
  
  candidateCards.forEach(card => {
    const voteBtn = card.querySelector('.bp-btn-vote');
    if (voteBtn) {
      voteBtn.addEventListener('click', () => {
        if (role !== 'voter') {
          showToast('Access Denied: Only registered voters can cast votes.');
          return;
        }
        const section = card.closest('.bp-section');
        const cardsInSection = section.querySelectorAll('.bp-card');
        const iconClasses = section.querySelector('.bp-section-icon').classList;
        
        let themeClass = 'selected';
        if (iconClasses.contains('purple')) themeClass = 'selected-purple';
        else if (iconClasses.contains('green')) themeClass = 'selected-green';
        else if (iconClasses.contains('yellow')) themeClass = 'selected-yellow';
        
        // Deselect all others in the section
        cardsInSection.forEach(c => {
          c.classList.remove('selected', 'selected-purple', 'selected-green', 'selected-yellow');
          const checkIcon = c.querySelector('.bp-card-check');
          if (checkIcon) checkIcon.textContent = 'radio_button_unchecked';
          
          const btn = c.querySelector('.bp-btn-vote');
          if (btn) btn.textContent = 'Vote';
        });

        // Select the clicked one
        card.classList.add(themeClass);

        const currentCheck = card.querySelector('.bp-card-check');
        if (currentCheck) currentCheck.textContent = 'check_circle';
        
        voteBtn.textContent = 'Selected';
        
        updateCount();
      });
    }
  });

  function updateCount() {
    const countElement = document.querySelector('.bp-selection-count');
    if (countElement) {
      const selected = document.querySelectorAll('.bp-card.selected, .bp-card.selected-purple, .bp-card.selected-green, .bp-card.selected-yellow').length;
      countElement.innerHTML = `<div class="bp-count-dot"></div>${selected} of 6 Positions Selected`;
    }
  }

  // Initial count update
  updateCount();

  // Toast Functionality
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast || !toastMsg) return;
    
    toastMsg.textContent = msg;
    toast.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 3500);
  }
});
