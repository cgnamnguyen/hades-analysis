/* HADES II ARCHIVES — lean client script (adapted from Hades 1 app.js).
   Sidebar toggle + search + category filter + scrollspy + progress bar + lightbox. */

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  if (sb) sb.classList.toggle('collapsed');
}

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initScrollspy();
  initReadingProgressBar();
  initLightboxClicks();
});

function initReadingProgressBar() {
  const bar = document.getElementById('readingProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  }, { passive: true });
}

function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', (e) => handleSearch(e.target.value.trim().toLowerCase()));
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      input.focus();
    }
  });
}

function handleSearch(term) {
  const navItems = document.querySelectorAll('.sidebar-nav-list .nav-item');
  navItems.forEach((item) => {
    const text = item.textContent.toLowerCase();
    item.style.display = (!term || text.includes(term)) ? '' : 'none';
  });
  const cards = document.querySelectorAll('.hades-chapter-card');
  cards.forEach((card) => {
    card.style.display = (!term || card.innerText.toLowerCase().includes(term)) ? '' : 'none';
  });
}

function filterByCategory(cat, btn) {
  document.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.sidebar-nav-list .nav-item').forEach((item) => {
    item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
  });
}

function initScrollspy() {
  const links = Array.from(document.querySelectorAll('.sidebar-nav-list .nav-link'));
  if (!links.length) return;
  // Highlight the link matching the current page (non-index pages).
  const here = location.pathname.split('/').pop() || 'index.html';
  links.forEach((a) => {
    const href = a.getAttribute('href') || '';
    const page = href.split('#')[0].split('/').pop();
    if (page && page === here && !href.includes('#')) a.classList.add('active');
  });
  // On the index, highlight the chapter in view.
  const cards = Array.from(document.querySelectorAll('.hades-chapter-card'));
  if (!cards.length) return;
  const onScroll = () => {
    let current = null;
    for (const card of cards) {
      if (card.getBoundingClientRect().top <= 140) current = card;
    }
    if (!current) return;
    const id = current.querySelector('.anchor')?.id || current.id;
    links.forEach((a) => {
      const href = a.getAttribute('href') || '';
      a.classList.toggle('active', href === '#' + id || href.endsWith('#' + id));
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

function copyChapterLink(num) {
  const url = location.origin + location.pathname + '#chapter-' + num;
  copyText(url, 'Đã sao chép liên kết chuyên đề');
}

function copyPageLink() {
  copyText(location.href, 'Đã sao chép liên kết trang');
}

function copyText(text, msg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => alert(msg)).catch(() => prompt('Sao chép liên kết:', text));
  } else {
    prompt('Sao chép liên kết:', text);
  }
}

/* Lightbox — delegated: any content image opens it. */
let lightboxScale = 1;
function initLightboxClicks() {
  document.addEventListener('click', (e) => {
    const img = e.target.closest('.chapter-body img, .icon-card img, .portrait-card img, .game-shot img, .system-diagram, .diagram-preview img, .map-scroll img, .hero-banner-img');
    if (!img || e.target.closest('a')) return;
    openLightbox(img.currentSrc || img.src, img.alt || '');
  });
}
function openLightbox(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!modal || !img) return;
  lightboxScale = 1;
  img.style.transform = 'scale(1)';
  img.src = src;
  img.alt = caption || '';
  if (cap) cap.textContent = caption || '';
  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  modal.classList.remove('is-active');
  document.body.style.overflow = '';
}
function zoomLightbox(delta) {
  const img = document.getElementById('lightboxImg');
  if (!img) return;
  lightboxScale = Math.min(3, Math.max(0.4, lightboxScale + delta));
  img.style.transform = 'scale(' + lightboxScale + ')';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
