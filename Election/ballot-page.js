/* ballot-page.js */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure only voters can access
  const role = sessionStorage.getItem('activeRole');
  if (role !== 'voter') {
    // For demo purposes, we will not block them completely, but normally we would redirect
    // window.location.href = 'index.html';
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
        // Find if this card is in the President or Vice President section
        const section = card.closest('.bp-section');
        const cardsInSection = section.querySelectorAll('.bp-card');
        const isPurpleTheme = section.querySelector('.bp-section-icon').classList.contains('purple');
        
        // Deselect all others in the section
        cardsInSection.forEach(c => {
          c.classList.remove('selected', 'selected-purple');
          const checkIcon = c.querySelector('.bp-card-check');
          if (checkIcon) checkIcon.textContent = 'radio_button_unchecked';
          
          const btn = c.querySelector('.bp-btn-vote');
          if (btn) btn.textContent = 'Vote';
        });

        // Select the clicked one
        if (isPurpleTheme) {
          card.classList.add('selected-purple');
        } else {
          card.classList.add('selected');
        }

        const currentCheck = card.querySelector('.bp-card-check');
        if (currentCheck) currentCheck.textContent = 'check_circle';
        
        voteBtn.textContent = 'Selected';
        
        // Show success toast (reusing logic if toast existed on this page)
        updateCount();
      });
    }
  });

  function updateCount() {
    const countElement = document.querySelector('.bp-selection-count');
    if (countElement) {
      const selected = document.querySelectorAll('.bp-card.selected, .bp-card.selected-purple').length;
      countElement.innerHTML = `<div class="bp-count-dot"></div>${selected} of 6 Positions Selected`;
    }
  }

  // Initial count update
  updateCount();
});
