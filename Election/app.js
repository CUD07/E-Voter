/* ════════════════════════════════════════
   EduVote – Application Logic (app.js)
   ════════════════════════════════════════ */

// ──────────────────────────────────────────
// TAB SWITCHING
// ──────────────────────────────────────────
function switchTab(tab) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  document.getElementById('tab-' + tab).classList.add('active');
  document.querySelector('[data-tab="' + tab + '"]').classList.add('active');
}

// ──────────────────────────────────────────
// PASSWORD VISIBILITY TOGGLE
// ──────────────────────────────────────────
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon  = btn.querySelector('.material-icons');
  if (input.type === 'password') {
    input.type = 'text';
    icon.textContent = 'visibility_off';
  } else {
    input.type = 'password';
    icon.textContent = 'visibility';
  }
}

// ──────────────────────────────────────────
// VOTER PORTAL: LOGIN ↔ REGISTER TOGGLE
// ──────────────────────────────────────────
function switchVoterView(view) {
  const loginForm    = document.getElementById('voter-login-form');
  const registerForm = document.getElementById('voter-register-form');
  const loginBtn     = document.getElementById('voter-login-btn');
  const registerBtn  = document.getElementById('voter-register-btn');

  if (view === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginBtn.classList.add('active');
    registerBtn.classList.remove('active');
  } else {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    loginBtn.classList.remove('active');
    registerBtn.classList.add('active');
  }
}

// ──────────────────────────────────────────
// CANDIDATE PORTAL: LOGIN ↔ REGISTER TOGGLE
// ──────────────────────────────────────────
function switchCandidateView(view) {
  const loginForm    = document.getElementById('candidate-login-form');
  const registerForm = document.getElementById('candidate-register-form');
  const loginBtn     = document.getElementById('cand-login-btn');
  const registerBtn  = document.getElementById('cand-register-btn');

  if (view === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginBtn.classList.add('active');
    registerBtn.classList.remove('active');
  } else {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    loginBtn.classList.remove('active');
    registerBtn.classList.add('active');
  }
}

// ──────────────────────────────────────────
// VOTER LOGIN
// Demo: any matric number + any password
// ──────────────────────────────────────────
function handleVoterLogin(e) {
  e.preventDefault();
  const matric = document.getElementById('voter-matric').value.trim();
  const pass   = document.getElementById('voter-pass').value;
  const err    = document.getElementById('voter-error');

  if (!matric || !pass) {
    err.classList.remove('hidden');
    return;
  }
  err.classList.add('hidden');
  setLoading(e.submitter, true, 'Signing in…');

  setTimeout(() => {
    // Look up registered voter data
    const voters = JSON.parse(localStorage.getItem('registeredVoters') || '[]');
    const found  = voters.find(v => v.matric === matric);

    // Save session (use stored name if available, else use matric as name)
    const session = {
      name:      found ? found.name   : matric,
      matric:    matric,
      year:      found ? found.year   : '',
      email:     found ? found.email  : '',
      voteCount: 12,
      loginTime: Date.now()
    };
    sessionStorage.setItem('voterSession', JSON.stringify(session));

    showToast('Login successful! Redirecting…');
    e.target.reset();
    setTimeout(() => { window.location.href = 'voter-dashboard.html'; }, 600);
  }, 1200);
}

// ──────────────────────────────────────────
// VOTER REGISTER
// ──────────────────────────────────────────
function handleVoterRegister(e) {
  e.preventDefault();
  const name   = document.getElementById('voter-reg-name').value.trim();
  const matric = document.getElementById('voter-reg-matric').value.trim();
  const year   = document.getElementById('voter-reg-year').value;
  const email  = document.getElementById('voter-reg-email').value.trim();
  const pass   = document.getElementById('voter-reg-pass').value;
  const err    = document.getElementById('voter-reg-error');

  if (!name || !matric || !year || !email || !pass || !email.includes('@')) {
    err.classList.remove('hidden');
    return;
  }
  err.classList.add('hidden');
  setLoading(e.submitter, true, 'Creating account…');

  setTimeout(() => {
    // Persist voter to localStorage for later logins
    const voters = JSON.parse(localStorage.getItem('registeredVoters') || '[]');
    // Avoid duplicate matric registrations
    const exists = voters.find(v => v.matric === matric);
    if (!exists) {
      voters.push({ name, matric, year, email, pass });
      localStorage.setItem('registeredVoters', JSON.stringify(voters));
    }

    // Create session and redirect straight to dashboard
    const session = {
      name:      name,
      matric:    matric,
      year:      year,
      email:     email,
      voteCount: 0,
      loginTime: Date.now()
    };
    sessionStorage.setItem('voterSession', JSON.stringify(session));

    showToast('Account created! Redirecting to your profile…');
    e.target.reset();
    setTimeout(() => { window.location.href = 'voter-dashboard.html'; }, 800);
  }, 1500);
}

// ──────────────────────────────────────────
// CANDIDATE LOGIN
// Demo: any matric number + any password
// ──────────────────────────────────────────
function handleCandidateLogin(e) {
  e.preventDefault();
  const matric = document.getElementById('cand-matric').value.trim();
  const pass   = document.getElementById('cand-pass').value;
  const err    = document.getElementById('cand-error');

  if (!matric || !pass) {
    err.classList.remove('hidden');
    return;
  }
  err.classList.add('hidden');
  setLoading(e.submitter, true, 'Authenticating…');

  setTimeout(() => {
    setLoading(e.submitter, false, 'Access Dashboard');
    showToast('Login successful! Dashboard coming soon.');
    e.target.reset();
  }, 1200);
}

// ──────────────────────────────────────────
// CANDIDATE REGISTER
// ──────────────────────────────────────────
function handleCandidateRegister(e) {
  e.preventDefault();
  const name    = document.getElementById('cand-reg-name').value.trim();
  const matric  = document.getElementById('cand-reg-matric').value.trim();
  const year    = document.getElementById('cand-reg-year').value;
  const dob     = document.getElementById('cand-reg-dob').value;
  const contact = document.getElementById('cand-reg-contact').value.trim();
  const pass    = document.getElementById('cand-reg-pass').value;
  const err     = document.getElementById('cand-reg-error');

  if (!name || !matric || !year || !dob || !contact || !pass) {
    err.classList.remove('hidden');
    return;
  }
  err.classList.add('hidden');
  setLoading(e.submitter, true, 'Submitting…');

  setTimeout(() => {
    setLoading(e.submitter, false, 'Submit Application');
    showToast('Application submitted! The Election Committee will review it within 24 hours.');
    e.target.reset();
    switchCandidateView('login');
  }, 1500);
}

// ──────────────────────────────────────────
// ADMIN PORTAL: LOGIN ↔ REGISTER TOGGLE
// ──────────────────────────────────────────
function switchAdminView(view) {
  const loginForm    = document.getElementById('admin-login-form');
  const registerForm = document.getElementById('admin-register-form');
  const loginBtn     = document.getElementById('admin-login-btn');
  const registerBtn  = document.getElementById('admin-register-btn');

  if (view === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginBtn.classList.add('active');
    registerBtn.classList.remove('active');
  } else {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    loginBtn.classList.remove('active');
    registerBtn.classList.add('active');
  }
}

// ──────────────────────────────────────────
// ADMIN LOGIN
// Demo credentials: admin@university.edu / admin123
// ──────────────────────────────────────────
function handleAdminLogin(e) {
  e.preventDefault();
  const email = document.getElementById('admin-email').value.trim();
  const pass  = document.getElementById('admin-pass').value;
  const err   = document.getElementById('admin-error');

  if (!email || !pass || !email.includes('@')) {
    err.classList.remove('hidden');
    return;
  }
  err.classList.add('hidden');
  setLoading(e.submitter, true, 'Authenticating…');

  setTimeout(() => {
    setLoading(e.submitter, false, 'Authenticate');
    showToast('Authentication successful! Dashboard coming soon.');
    e.target.reset();
  }, 1400);
}

// ──────────────────────────────────────────
// ADMIN REGISTER
// ──────────────────────────────────────────
function handleAdminRegister(e) {
  e.preventDefault();
  const name  = document.getElementById('admin-reg-name').value.trim();
  const email = document.getElementById('admin-reg-email').value.trim();
  const role  = document.getElementById('admin-reg-role').value;
  const empId = document.getElementById('admin-reg-empid').value.trim();
  const err   = document.getElementById('admin-reg-error');

  if (!name || !email || !role || !empId || !email.includes('@')) {
    err.classList.remove('hidden');
    return;
  }
  err.classList.add('hidden');
  setLoading(e.submitter, true, 'Submitting…');

  setTimeout(() => {
    setLoading(e.submitter, false, 'Submit Registration');
    showToast('Registration submitted! Pending approval by the institution.');
    e.target.reset();
    switchAdminView('login');
  }, 1500);
}

// ──────────────────────────────────────────
// BUTTON LOADING STATE
// ──────────────────────────────────────────
function setLoading(btn, loading, label) {
  if (!btn) return;
  btn.disabled = loading;
  if (loading) {
    btn.dataset.original = btn.innerHTML;
    btn.innerHTML = `<span class="material-icons spin">sync</span> ${label}`;
    btn.style.opacity = '.8';
  } else {
    btn.innerHTML = btn.dataset.original || label;
    btn.style.opacity = '';
    btn.disabled = false;
  }
}

// Spinning animation for loading icon
const style = document.createElement('style');
style.textContent = `
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin .7s linear infinite; display: inline-flex; }
`;
document.head.appendChild(style);

// ──────────────────────────────────────────
// TOAST NOTIFICATION
// ──────────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  toastMsg.textContent = msg;
  toast.classList.remove('hidden');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 3500);
}
