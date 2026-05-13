/* ════════════════════════════════════════
   EduVote – Voter Dashboard Logic
   voter-dashboard.js
   ════════════════════════════════════════ */

// ── AUTH GUARD ──────────────────────────────────────────────────
// If no voter session exists, kick back to the login page
(function authGuard() {
  const session = getVoterSession();
  if (!session) {
    window.location.replace('index.html');
  }
})();

// ── SESSION HELPERS ─────────────────────────────────────────────
function getVoterSession() {
  try {
    const raw = sessionStorage.getItem('voterSession') || localStorage.getItem('voterSession');
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function clearVoterSession() {
  sessionStorage.removeItem('voterSession');
  localStorage.removeItem('voterSession');
}

// ── POPULATE PROFILE FROM SESSION ───────────────────────────────
function populateProfile() {
  const session = getVoterSession();
  if (!session) return;

  // Name
  const nameEl = document.getElementById('profile-name');
  if (nameEl) nameEl.textContent = session.name || 'Unknown User';

  // Matric
  const matricEl = document.getElementById('profile-matric');
  if (matricEl) matricEl.textContent = session.matric || '—';

  // Faculty & Dept inferred from year (demo logic)
  const yearMap = {
    '1': { faculty: 'Faculty of Engineering', dept: 'Systems Engineering' },
    '2': { faculty: 'Faculty of Science',     dept: 'Computer Science' },
    '3': { faculty: 'Faculty of Arts',        dept: 'Mass Communication' },
    '4': { faculty: 'Faculty of Law',         dept: 'International Law' },
    '5': { faculty: 'Faculty of Medicine',    dept: 'Clinical Medicine' },
  };
  const info = yearMap[session.year] || { faculty: 'Faculty of Engineering', dept: 'Systems Engineering' };
  const facultyEl = document.getElementById('profile-faculty');
  const deptEl    = document.getElementById('profile-dept');
  if (facultyEl) facultyEl.textContent = info.faculty;
  if (deptEl)    deptEl.textContent    = info.dept;

  // Navbar avatar initials fallback
  const navAvatarIcon = document.getElementById('nav-avatar-icon');
  if (navAvatarIcon) navAvatarIcon.classList.remove('hidden');

  // Stat – use a stored count or default 12
  const total = session.voteCount || 12;
  const statEl = document.getElementById('stat-total');
  if (statEl) statEl.textContent = total;

  // QR matric label
  const qrLabel = document.getElementById('qr-matric-label');
  if (qrLabel) qrLabel.textContent = 'Matric: ' + (session.matric || '—');

  // View all link
  const viewAllLink = document.getElementById('view-all-records');
  if (viewAllLink) viewAllLink.textContent = `View All ${total} Records`;
}

// ── SETTINGS TAB SWITCHER ────────────────────────────────────────
function switchSettingsTab(tab) {
  const tabs = ['personal', 'history', 'security'];
  tabs.forEach(t => {
    const btn = document.getElementById('btn-' + t);
    if (btn) btn.classList.remove('active');
  });
  const active = document.getElementById('btn-' + tab);
  if (active) active.classList.add('active');

  // Show a toast for unbuilt tabs
  const labels = { personal: 'Personal Profile', history: 'Voting History', security: 'Security & Access' };
  showVdToast(`Viewing: ${labels[tab] || tab}`);
}

// ── SIGN OUT ─────────────────────────────────────────────────────
function handleSignOut() {
  clearVoterSession();
  // Slight delay for UX
  showVdToast('Signing out…');
  setTimeout(() => { window.location.replace('index.html'); }, 900);
}

// ── MODALS ───────────────────────────────────────────────────────
function showQRCode() {
  document.getElementById('qr-modal').classList.remove('hidden');
}
function showSupport() {
  document.getElementById('support-modal').classList.remove('hidden');
}
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// Close modal when clicking outside
document.querySelectorAll('.vd-modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) this.classList.add('hidden');
  });
});

// ── TOAST ────────────────────────────────────────────────────────
let vdToastTimer = null;
function showVdToast(msg) {
  const toast = document.getElementById('vd-toast');
  const msgEl = document.getElementById('vd-toast-msg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.remove('hidden');
  if (vdToastTimer) clearTimeout(vdToastTimer);
  vdToastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ── INIT ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', populateProfile);
