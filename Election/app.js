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
// Demo: any student ID + email with @ + any password
// ──────────────────────────────────────────
function handleVoterLogin(e) {
  e.preventDefault();
  const id    = document.getElementById('voter-id').value.trim();
  const email = document.getElementById('voter-email').value.trim();
  const pass  = document.getElementById('voter-pass').value;
  const err   = document.getElementById('voter-error');

  if (!id || !email || !pass || !email.includes('@')) {
    err.classList.remove('hidden');
    return;
  }
  err.classList.add('hidden');
  setLoading(e.submitter, true, 'Signing in…');

  setTimeout(() => {
    setLoading(e.submitter, false, 'Sign In &amp; Vote');
    showToast('Login successful! Dashboard coming soon.');
    e.target.reset();
  }, 1200);
}

// ──────────────────────────────────────────
// CANDIDATE LOGIN
// Demo: any valid email + any password
// ──────────────────────────────────────────
function handleCandidateLogin(e) {
  e.preventDefault();
  const email = document.getElementById('cand-email').value.trim();
  const pass  = document.getElementById('cand-pass').value;
  const err   = document.getElementById('cand-error');

  if (!email || !pass || !email.includes('@')) {
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
  const name     = document.getElementById('cand-reg-name').value.trim();
  const id       = document.getElementById('cand-reg-id').value.trim();
  const email    = document.getElementById('cand-reg-email').value.trim();
  const position = document.getElementById('cand-position').value;
  const pass     = document.getElementById('cand-reg-pass').value;
  const err      = document.getElementById('cand-reg-error');

  if (!name || !id || !email || !position || !pass) {
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
// ADMIN LOGIN
// Demo credentials: admin@university.edu / admin123
// ──────────────────────────────────────────
function handleAdminLogin(e) {
  e.preventDefault();
  const email = document.getElementById('admin-email').value.trim();
  const key   = document.getElementById('admin-key').value;
  const err   = document.getElementById('admin-error');

  if (email !== 'admin@university.edu' || key !== 'admin123') {
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
