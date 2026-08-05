// Madar — main.js

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Active nav link based on current page
const currentPage = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href && !href.startsWith('#')) {
    if (currentPage.endsWith(href) || currentPage.includes(href.replace('../', ''))) {
      a.classList.add('active');
    }
  }
});

// Mobile menu + backdrop
const burger   = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const backdrop = document.getElementById('mobileBackdrop');

function openMenu() {
  burger.classList.add('open');
  mobileMenu.classList.add('open');
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  burger.classList.remove('open');
  mobileMenu.classList.remove('open');
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

if (burger) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
}
if (backdrop) backdrop.addEventListener('click', closeMenu);
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// Escape key closes menu
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal-up');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// Counter animation
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
const counterEls = document.querySelectorAll('.ncard-num[data-target]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target, parseInt(e.target.dataset.target));
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObs.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Duplicate marquee
document.querySelectorAll('.marquee-track').forEach(track => {
  track.innerHTML += track.innerHTML;
});
