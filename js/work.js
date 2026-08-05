// work.js — scroll pop + lightbox with real project previews

const projects = [
  {
    title: 'Nhal Atlas',
    tag: 'E-commerce · Dark gold theme',
    type: 'Honey cooperative',
    location: 'Azilal, Atlas Mountains',
    bgClass: 'honey-bg',
    previewUrl: '../assets/preview-honey.html',
    desc: 'Full e-commerce website with multilingual support (Arabic, French, English), animated hero video, WhatsApp ordering, and integrated logistics. The cooperative went from zero digital presence to receiving online orders across Morocco and Europe.',
    features: [
      { label: 'Type', value: 'E-commerce' },
      { label: 'Languages', value: 'Arabic · French · English' },
      { label: 'Delivery', value: 'Morocco + International' },
      { label: 'Ordering', value: 'Online + WhatsApp' },
    ],
    stats: [
      { n: '4', l: 'Products listed' },
      { n: '3', l: 'Languages' },
      { n: 'MA·EU', l: 'Markets' },
    ]
  },
  {
    title: 'Arkan',
    tag: 'Showcase · Premium light theme',
    type: 'Argan oil cooperative',
    location: 'Souss-Massa, Morocco',
    bgClass: 'argan-bg',
    previewUrl: '../assets/preview-argan.html',
    desc: 'Premium bilingual website for an argan oil cooperative targeting European and Gulf buyers. Features a full product collection, cooperative story, production process timeline, and WhatsApp cart — all in Arabic, French, and English.',
    features: [
      { label: 'Type', value: 'Showcase + e-commerce' },
      { label: 'Languages', value: 'Arabic · French · English' },
      { label: 'Target market', value: 'Europe · Gulf' },
      { label: 'Cart', value: 'WhatsApp checkout' },
    ],
    stats: [
      { n: '4', l: 'Products listed' },
      { n: '3', l: 'Languages' },
      { n: 'EU·GCC', l: 'Markets' },
    ]
  },
  {
    title: 'Kelaat Rose',
    tag: 'E-commerce · Gulf market',
    type: 'Rose water cooperative',
    location: "Kelaat M'Gouna, Draa",
    bgClass: 'rose-bg',
    previewUrl: null,
    desc: 'E-commerce platform built for Gulf market distribution. Arabic-first RTL design with international shipping setup and WhatsApp ordering in Arabic.',
    features: [
      { label: 'Type', value: 'E-commerce' },
      { label: 'Languages', value: 'Arabic · French' },
      { label: 'Target market', value: 'Gulf + Morocco' },
      { label: 'Layout', value: 'Arabic-first (RTL)' },
    ],
    stats: [
      { n: '5', l: 'Products listed' },
      { n: 'RTL', l: 'Arabic-first design' },
      { n: 'MA·GCC', l: 'Markets' },
    ]
  }
];

let currentProject = 0;

// --- SCROLL POP ---
const popCards = document.querySelectorAll('.pop-card');

const popObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('popped');
      popObs.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

popCards.forEach((c, i) => {
  popObs.observe(c);
  setTimeout(() => {
    if (!c.classList.contains('popped')) c.classList.add('popped');
  }, 300 + i * 140);
});

// --- LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const backdrop = document.getElementById('lbBackdrop');
const lbClose  = document.getElementById('lbClose');
const lbBody   = document.getElementById('lbBody');

function buildLightbox(idx) {
  const p = projects[idx];
  const hasPreview = !!p.previewUrl;

  lbBody.innerHTML = `
    <div class="lb-layout ${hasPreview ? 'has-preview' : 'no-preview'}">

      <div class="lb-info">
        <div class="lb-info-head">
          <span class="lb-project-tag">${p.tag}</span>
          <h2 class="lb-project-title">${p.title}</h2>
          <div class="lb-project-meta">
            <span class="lb-type">${p.type}</span>
            <span class="lb-location">${p.location}</span>
          </div>
        </div>

        <p class="lb-desc">${p.desc}</p>

        <div class="lb-features">
          ${p.features.map(f => `
            <div class="lb-feature">
              <div class="lbf-label">${f.label}</div>
              <div class="lbf-value">${f.value}</div>
            </div>
          `).join('')}
        </div>

        <div class="lb-stats">
          ${p.stats.map(s => `
            <div class="lb-stat">
              <div class="lbs-n">${s.n}</div>
              <div class="lbs-l">${s.l}</div>
            </div>
          `).join('')}
        </div>

        ${hasPreview ? `
          <a href="${p.previewUrl}" target="_blank" class="lb-visit-btn">
            Open live preview
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        ` : '<div class="lb-coming">Preview coming soon</div>'}
      </div>

      ${hasPreview ? `
        <div class="lb-preview-wrap">
          <div class="lb-browser-bar">
            <div class="lb-browser-dots">
              <span></span><span></span><span></span>
            </div>
            <div class="lb-browser-url">${p.title.toLowerCase().replace(' ','')} .ma</div>
          </div>
          <div class="lb-iframe-wrap">
            <iframe
              src="${p.previewUrl}"
              class="lb-iframe"
              title="${p.title} preview"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
            <div class="lb-iframe-overlay" onclick="this.style.display='none'">
              <div class="lb-iframe-hint">Click to interact</div>
            </div>
          </div>
        </div>
      ` : `
        <div class="lb-no-preview ${p.bgClass}">
          <div class="lb-no-preview-inner">
            <div class="lb-np-tag">${p.tag}</div>
            <div class="lb-np-title">${p.title}</div>
            <div class="lb-np-sub">Website in progress</div>
          </div>
        </div>
      `}

    </div>
  `;
}

function openLightbox(idx) {
  currentProject = idx;
  buildLightbox(idx);
  lightbox.classList.add('open');
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
  lbBody.innerHTML = '';
}

popCards.forEach((card, idx) => {
  card.addEventListener('click', () => openLightbox(idx));
});

lbClose.addEventListener('click', closeLightbox);
backdrop.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
});
