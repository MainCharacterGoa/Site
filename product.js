document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Gallery Thumbnail Switching
  // ==========================================================================
  const galleryMainImg = document.getElementById('galleryMainImg');
  const thumbBtns = document.querySelectorAll('.thumb-btn');

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const newSrc = btn.getAttribute('data-src');
      const newPos = btn.getAttribute('data-pos') || 'center center';

      if (galleryMainImg && newSrc) {
        galleryMainImg.style.opacity = '0';
        setTimeout(() => {
          galleryMainImg.src = newSrc;
          galleryMainImg.style.objectPosition = newPos;
          galleryMainImg.style.opacity = '1';
        }, 180);
      }
    });
  });

  // ==========================================================================
  // 2. Expandable Accordions (THE EDITION, THE BOTTLE, THE NOTES)
  // ==========================================================================
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other open items for clean accordion behavior
      accordionItems.forEach(i => {
        if (i !== item) {
          i.classList.remove('open');
          i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ==========================================================================
  // 3. Claim Bottle Reservation Modal
  // ==========================================================================
  const btnClaimBottle = document.getElementById('btnClaimBottle');
  const btnClaimSticky = document.getElementById('btnClaimSticky');
  const claimModal = document.getElementById('claimModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const allocationNumber = document.getElementById('allocationNumber');

  const openClaimModal = () => {
    if (!claimModal) return;
    if (allocationNumber) {
      const randomAlloc = String(Math.floor(10 + Math.random() * 490)).padStart(3, '0');
      allocationNumber.textContent = `MC-00-#${randomAlloc}`;
    }
    claimModal.classList.add('open');
    claimModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeClaimModal = () => {
    if (!claimModal) return;
    claimModal.classList.remove('open');
    claimModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (btnClaimBottle) btnClaimBottle.addEventListener('click', openClaimModal);
  if (btnClaimSticky) btnClaimSticky.addEventListener('click', openClaimModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeClaimModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeClaimModal);

  if (claimModal) {
    claimModal.addEventListener('click', (e) => {
      if (e.target === claimModal) closeClaimModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && claimModal && claimModal.classList.contains('open')) {
      closeClaimModal();
    }
  });

  // ==========================================================================
  // 4. Fullscreen Lightbox
  // ==========================================================================
  const mainImageCard = document.querySelector('.main-image-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  if (mainImageCard && lightboxModal && lightboxImg) {
    mainImageCard.addEventListener('click', () => {
      if (galleryMainImg) {
        lightboxImg.src = galleryMainImg.src;
        lightboxModal.classList.add('open');
        lightboxModal.setAttribute('aria-hidden', 'false');
      }
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('open');
      lightboxModal.setAttribute('aria-hidden', 'true');
    };

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // ==========================================================================
  // 5. Luxury Footer Handlers
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 6. Dynamic Sticky Claim Bar Visibility
  // Visible once user scrolls past the primary "CLAIM YOUR BOTTLE" button
  // ==========================================================================
  const stickyClaimBar = document.getElementById('stickyClaimBar');
  const mainClaimBtn = document.getElementById('btnClaimBottle');

  if (stickyClaimBar && mainClaimBtn) {
    const checkStickyVisibility = () => {
      const rect = mainClaimBtn.getBoundingClientRect();
      // When the bottom of the upper "CLAIM YOUR BOTTLE" button scrolls out of view above
      if (rect.bottom < 0) {
        stickyClaimBar.classList.add('visible');
      } else {
        stickyClaimBar.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', checkStickyVisibility, { passive: true });
    window.addEventListener('resize', checkStickyVisibility, { passive: true });

    // Run check immediately in case page loads scrolled down
    checkStickyVisibility();
  }
});
