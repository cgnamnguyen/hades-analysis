/**
 * HADES ARCHIVES - INTERACTIVE CLIENT ENGINE
 * Handles Scrollspy, Interactive Lab, Lightbox, Carousels, Search, and Utilities.
 */

// State
let activeLabWidget = 'combat_loop_widget.html';
let lightboxZoomLevel = 1.0;

document.addEventListener('DOMContentLoaded', () => {
  initScrollspy();
  initReadingProgressBar();
  initSearch();
  initKeyboardShortcuts();
  initCarousels();
});

/* ==========================================================================
   Scrollspy & Reading Progress
   ========================================================================== */
function initScrollspy() {
  const chapters = document.querySelectorAll('.hades-chapter-card');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!chapters.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            // Scroll nav link into view inside sidebar if not fully visible
            link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  chapters.forEach(chap => observer.observe(chap));
}

function initReadingProgressBar() {
  const progressBar = document.getElementById('readingProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/* ==========================================================================
   Search & Filtering
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const sidebarSearch = document.getElementById('sidebarSearch');
  
  function handleSearch(term) {
    const query = term.toLowerCase().trim();
    const navItems = document.querySelectorAll('.sidebar-nav-list .nav-item');
    const chapterCards = document.querySelectorAll('.hades-chapter-card');

    navItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });

    if (query.length > 2) {
      chapterCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(query)) {
          card.style.opacity = '1';
          card.style.display = 'block';
        } else {
          card.style.opacity = '0.35';
        }
      });
    } else {
      chapterCards.forEach(card => {
        card.style.opacity = '1';
        card.style.display = 'block';
      });
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
      if (sidebarSearch) sidebarSearch.value = e.target.value;
    });
  }
  if (sidebarSearch) {
    sidebarSearch.addEventListener('input', (e) => {
      handleSearch(e.target.value);
      if (searchInput) searchInput.value = e.target.value;
    });
  }
}

function filterByCategory(cat, btn) {
  // Update active chip state
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const navItems = document.querySelectorAll('.sidebar-nav-list .nav-item');
  const chapterCards = document.querySelectorAll('.hades-chapter-card');

  navItems.forEach(item => {
    const itemCat = item.getAttribute('data-cat') || '';
    const hasLab = item.getAttribute('data-lab') === 'true';
    const hasDiag = item.getAttribute('data-diag') === 'true';

    if (cat === 'all') {
      item.style.display = 'block';
    } else if (cat === 'lab') {
      item.style.display = hasLab ? 'block' : 'none';
    } else if (cat === 'diag') {
      item.style.display = hasDiag ? 'block' : 'none';
    } else {
      item.style.display = itemCat.toLowerCase().includes(cat.toLowerCase()) ? 'block' : 'none';
    }
  });

  chapterCards.forEach(card => {
    const cardCat = card.getAttribute('data-category') || '';
    const hasLab = card.querySelector('.hades-widget-embed-card') !== null;
    const hasDiag = card.querySelector('.mermaid, .figure-img-wrap') !== null;

    if (cat === 'all') {
      card.style.display = 'block';
    } else if (cat === 'lab') {
      card.style.display = hasLab ? 'block' : 'none';
    } else if (cat === 'diag') {
      card.style.display = hasDiag ? 'block' : 'none';
    } else {
      card.style.display = cardCat.toLowerCase().includes(cat.toLowerCase()) ? 'block' : 'none';
    }
  });

  showToast(`Bộ lọc: ${cat.toUpperCase()}`);
}

/* ==========================================================================
   Interactive Carousels
   ========================================================================== */
function initCarousels() {
  // Add keyboard arrow listeners when hovering over a carousel
  document.querySelectorAll('.hades-carousel-card').forEach(carousel => {
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        moveCarouselSlide(carousel.id, -1);
      } else if (e.key === 'ArrowRight') {
        moveCarouselSlide(carousel.id, 1);
      }
    });
  });
}

function moveCarouselSlide(carouselId, step) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const currIdxSpan = carousel.querySelector('.curr-idx');
  
  let current = parseInt(carousel.getAttribute('data-current') || '0', 10);
  const total = slides.length;

  slides[current].classList.remove('active');
  if (dots[current]) dots[current].classList.remove('active');

  current = (current + step + total) % total;

  slides[current].classList.add('active');
  if (dots[current]) dots[current].classList.add('active');
  if (currIdxSpan) currIdxSpan.textContent = current + 1;

  carousel.setAttribute('data-current', current);
}

function goToSlide(carouselId, targetIndex) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const currIdxSpan = carousel.querySelector('.curr-idx');

  let current = parseInt(carousel.getAttribute('data-current') || '0', 10);
  if (targetIndex === current || targetIndex < 0 || targetIndex >= slides.length) return;

  slides[current].classList.remove('active');
  if (dots[current]) dots[current].classList.remove('active');

  slides[targetIndex].classList.add('active');
  if (dots[targetIndex]) dots[targetIndex].classList.add('active');
  if (currIdxSpan) currIdxSpan.textContent = targetIndex + 1;

  carousel.setAttribute('data-current', targetIndex);
}

/* ==========================================================================
   Code Copy Snippet
   ========================================================================== */
function copyCodeSnippet(button) {
  const wrapper = button.closest('.code-wrapper');
  if (!wrapper) return;

  const codeEl = wrapper.querySelector('pre code');
  if (!codeEl) return;

  const textToCopy = codeEl.innerText;
  navigator.clipboard.writeText(textToCopy).then(() => {
    const btnSpan = button.querySelector('span');
    const originalText = btnSpan ? btnSpan.textContent : 'Sao chép';
    button.innerHTML = '<i class="fas fa-check"></i> <span>Đã sao chép!</span>';
    button.style.borderColor = 'var(--gold-400)';
    button.style.color = 'var(--gold-300)';

    setTimeout(() => {
      button.innerHTML = `<i class="far fa-copy"></i> <span>${originalText}</span>`;
      button.style.borderColor = '';
      button.style.color = '';
    }, 2000);

    showToast('Đã sao chép đoạn mã vào clipboard!');
  }).catch(err => {
    console.error('Copy failed:', err);
  });
}

function copyChapterLink(chapterNum) {
  const url = `${window.location.origin}${window.location.pathname}#chapter-${chapterNum}`;
  navigator.clipboard.writeText(url).then(() => {
    showToast(`Đã sao chép liên kết Chuyên đề ${chapterNum}!`);
  });
}

/* ==========================================================================
   Widget Size Toggle & Auto-Resize
   ========================================================================== */
function resizeIframe(iframe) {
  try {
    if (iframe && iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.body) {
      const h = iframe.contentWindow.document.body.scrollHeight;
      if (h > 350) {
        iframe.style.height = (h + 30) + 'px';
        if (iframe.parentElement) {
          iframe.parentElement.style.height = (h + 30) + 'px';
        }
      }
    }
  } catch (e) {
    // Cross-origin fallback, keeps default CSS height
  }
}

function toggleWidgetSize(widgetId) {
  const card = document.getElementById(widgetId);
  if (!card) return;

  card.classList.toggle('is-expanded');
  const btn = card.querySelector('.widget-controls .widget-action-btn');
  if (card.classList.contains('is-expanded')) {
    if (btn) btn.innerHTML = '<i class="fas fa-compress-arrows-alt"></i> <span>Thu nhỏ</span>';
    document.body.style.overflow = 'hidden';
  } else {
    if (btn) btn.innerHTML = '<i class="fas fa-expand-arrows-alt"></i> <span>Mở rộng</span>';
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   Lightbox Full-screen Viewer
   ========================================================================== */
function openLightbox(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  
  if (!modal || !img) return;

  img.src = src;
  img.alt = caption || 'Hình ảnh Hades Analysis';
  if (cap) cap.textContent = caption || '';

  lightboxZoomLevel = 1.0;
  img.style.transform = `scale(${lightboxZoomLevel})`;

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
  lightboxZoomLevel = Math.max(0.5, Math.min(3.0, lightboxZoomLevel + delta));
  img.style.transform = `scale(${lightboxZoomLevel})`;
}

/* ==========================================================================
   Interactive Lab Hub Modal
   ========================================================================== */
const LAB_WIDGETS = [
  { id: 'combat_loop', file: 'combat_loop_widget.html', title: 'Một Nhịp Giao Tranh' },
  { id: 'combat_sequence', file: 'combat_sequence_widget.html', title: 'Chu Trình Lướt & Hủy Hoạt Ảnh' },
  { id: 'hidden_aspects', file: 'hidden_aspects_widget.html', title: '6 Vũ Khí Ẩn Thần Thoại' },
  { id: 'boon_selection', file: 'boon_selection_widget.html', title: 'Thuật Toán Bốc Thăm Boons' },
  { id: 'room_progression', file: 'room_progression_widget.html', title: 'Chu Trình Sinh Phòng' },
  { id: 'hades_boss', file: 'hades_boss_widget.html', title: 'Chiến Lược Boss Hades EM4' },
  { id: 'fishing', file: 'fishing_widget.html', title: 'Phản Xạ Câu Cá 0.34s' },
  { id: 'heat64', file: 'heat64_widget.html', title: 'Giải Mã Heat 64' },
];

function openLabModal(defaultKey) {
  const modal = document.getElementById('labModal');
  if (!modal) return;

  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';

  const keyToLoad = defaultKey || 'combat_loop';
  switchLabWidget(keyToLoad);
}

function closeLabModal() {
  const modal = document.getElementById('labModal');
  if (!modal) return;
  modal.classList.remove('is-active');
  document.body.style.overflow = '';
}

function switchLabWidget(key) {
  const item = LAB_WIDGETS.find(w => w.id === key);
  if (!item) return;

  const iframe = document.getElementById('labIframe');
  const title = document.getElementById('labCurrentTitle');
  const openTabBtn = document.getElementById('labOpenTabBtn');
  
  if (iframe) iframe.src = `./${item.file}`;
  if (title) title.textContent = item.title;
  if (openTabBtn) openTabBtn.href = `./${item.file}`;

  // Update active tab buttons
  document.querySelectorAll('.lab-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-key') === key) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/* ==========================================================================
   Mobile Sidebar Toggle
   ========================================================================== */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  sidebar.classList.toggle('is-open');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  sidebar.classList.remove('is-open');
}

/* ==========================================================================
   Keyboard Shortcuts
   ========================================================================== */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeLabModal();
      document.querySelectorAll('.hades-widget-embed-card.is-expanded').forEach(c => toggleWidgetSize(c.id));
    }
    // '/' or 'Ctrl+K' to focus search
    if ((e.key === '/' && document.activeElement.tagName !== 'INPUT') || (e.ctrlKey && e.key === 'k')) {
      e.preventDefault();
      const s = document.getElementById('searchInput') || document.getElementById('sidebarSearch');
      if (s) {
        s.focus();
        s.select();
      }
    }
  });
}

/* ==========================================================================
   Toast Notification
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color:var(--gold-400)"></i> <span>${message}</span>`;
  toast.classList.add('is-show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('is-show');
  }, 2600);
}
