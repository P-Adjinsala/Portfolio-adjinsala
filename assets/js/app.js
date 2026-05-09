// ============================================================
// PORTFOLIO ADJINSALA — app.js
// Nav scroll · Mobile menu · Role rotator · Reveal · Bars
// ============================================================

// ── NAV SCROLL ────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── MOBILE BURGER ─────────────────────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
  });
});

// ── ROLE ROTATOR ──────────────────────────────────────────────
const roles = [
  'Civic Tech Contributor',
  'University Lecturer',
  'Data Scientist',
  'AI for Social Good',
  'Research Data Consultant',
  'AfricTivistes CitizenLab',
];

const roleEl = document.getElementById('hero-role');
let roleIdx  = 0;

function rotateRole() {
  if (!roleEl) return;
  roleEl.style.opacity   = '0';
  roleEl.style.transform = 'translateY(8px)';
  setTimeout(() => {
    roleIdx = (roleIdx + 1) % roles.length;
    roleEl.textContent     = roles[roleIdx];
    roleEl.style.opacity   = '1';
    roleEl.style.transform = 'translateY(0)';
  }, 300);
}

roleEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
setInterval(rotateRole, 2800);

// ── SCROLL REVEAL ─────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

function initReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}

// ── SKILL BARS ────────────────────────────────────────────────
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar-fill').forEach(fill => {
        const w = fill.getAttribute('data-w');
        setTimeout(() => { fill.style.width = w + '%'; }, 200);
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

function initBars() {
  document.querySelectorAll('.bars').forEach(el => barObs.observe(el));
}

// ── ACTIVE NAV LINK ON SCROLL ─────────────────────────────────
const sections  = ['hero', 'about', 'skills', 'projects', 'contact'];
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObs.observe(el);
});

// ── SMOOTH SCROLL ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});

// ── CONTACT FORM ──────────────────────────────────────────────
function handleForm(e) {
  e.preventDefault();
  const btn     = e.target.querySelector('.fsend');
  const success = document.getElementById('fsuccess');
  btn.disabled        = true;
  btn.textContent     = 'Sending…';
  setTimeout(() => {
    btn.style.display      = 'none';
    success.style.display  = 'block';
  }, 900);
}

// ── PROJECT CARD TILT (subtle) ────────────────────────────────
document.querySelectorAll('.pcard').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect  = card.getBoundingClientRect();
    const x     = (e.clientX - rect.left) / rect.width  - 0.5;
    const y     = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease, box-shadow 0.3s, border-color 0.3s';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease, box-shadow 0.3s, border-color 0.3s';
  });
});

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initBars();
});
