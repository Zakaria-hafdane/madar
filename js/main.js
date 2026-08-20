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
  mobileMenu.querySelectorAll('.mob-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.closest('.mob-dropdown').classList.toggle('open');
    });
  });
}

// Escape key closes menu
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// Hero "See our work" picker (home page only)
const workPicker = document.getElementById('workPicker');
const workPickerBtn = document.getElementById('workPickerBtn');
const workPickerMenu = workPicker ? workPicker.querySelector('.work-picker-menu') : null;
if (workPicker && workPickerBtn && workPickerMenu) {
  // Move the menu to <body>. It must stay position:fixed relative to the
  // *viewport*, but .hero-btns carries a scroll-reveal animation with a
  // CSS transform — and any transformed ancestor becomes the containing
  // block for fixed descendants, silently breaking the math below. Portaling
  // out avoids that (and also fully escapes .hero's overflow:hidden clip).
  document.body.appendChild(workPickerMenu);

  let hoverCloseTimer = null;
  const isOpen = () => workPickerMenu.classList.contains('open');

  function positionWorkPickerMenu() {
    const btnRect = workPickerBtn.getBoundingClientRect();
    const menuRect = workPickerMenu.getBoundingClientRect();
    const margin = 16;
    const gap = 16;
    let left = btnRect.left + btnRect.width / 2 - menuRect.width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - menuRect.width - margin));
    workPickerMenu.style.left = `${left}px`;
    workPickerMenu.style.top = `${btnRect.bottom + gap}px`;
    const arrowLeft = btnRect.left + btnRect.width / 2 - left;
    workPickerMenu.style.setProperty('--wp-arrow-left', `${arrowLeft}px`);
  }
  function openWorkPicker() {
    clearTimeout(hoverCloseTimer);
    positionWorkPickerMenu();
    workPicker.classList.add('open');
    workPickerMenu.classList.add('open');
    workPickerBtn.setAttribute('aria-expanded', 'true');
    // Self-correct one frame later in case the button was still mid-scroll
    // (e.g. just brought into view by a smooth-scroll) when first measured.
    requestAnimationFrame(positionWorkPickerMenu);
  }
  function closeWorkPicker() {
    workPicker.classList.remove('open');
    workPickerMenu.classList.remove('open');
    workPickerBtn.setAttribute('aria-expanded', 'false');
  }
  function scheduleClose() {
    hoverCloseTimer = setTimeout(closeWorkPicker, 200);
  }

  workPickerBtn.addEventListener('click', (e) => {
    // Always-open, not toggle: on a real mouse, the cursor hovers the
    // button (opening it via mouseenter) *before* the click fires, so a
    // toggle would immediately re-close what hover just opened.
    e.stopPropagation();
    openWorkPicker();
  });
  // Menu now lives outside .work-picker in the DOM, so both pieces need
  // their own hover tracking to keep it open while the cursor crosses
  // the gap between the button and the portaled menu.
  workPicker.addEventListener('mouseenter', openWorkPicker);
  workPicker.addEventListener('mouseleave', scheduleClose);
  workPickerMenu.addEventListener('mouseenter', () => clearTimeout(hoverCloseTimer));
  workPickerMenu.addEventListener('mouseleave', scheduleClose);
  document.addEventListener('click', (e) => {
    if (!workPicker.contains(e.target) && !workPickerMenu.contains(e.target)) closeWorkPicker();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeWorkPicker();
  });
  // Follow the button on scroll/resize rather than closing outright — a
  // fixed-position menu would otherwise visually detach from its trigger
  // the instant the page moves (and viewport resizes can themselves fire
  // an incidental scroll event, e.g. from reflow, so closing on scroll
  // could race with and undo the resize reposition).
  const reposition = () => { if (isOpen()) positionWorkPickerMenu(); };
  window.addEventListener('resize', reposition);
  window.addEventListener('scroll', reposition, { passive: true });
}

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

// Logo swap on language change — spins the mark, swaps AR/EN artwork mid-spin
function switchLogo(lang) {
  const img = document.getElementById('logoImg');
  if (!img) return;
  const file = lang === 'ar' ? 'logo-ar.png' : 'logo-en.png';
  img.classList.add('spinning');
  setTimeout(() => {
    img.src = img.src.replace(/logo-(ar|en)\.png$/, file);
  }, 300);
  setTimeout(() => {
    img.classList.remove('spinning');
  }, 600);
}
window.switchLogo = switchLogo;

document.querySelectorAll('.lb[data-lang]').forEach(btn => {
  btn.addEventListener('click', () => switchLogo(btn.dataset.lang));
});
