const initApp = () => {
  const toast = document.getElementById('toast');
  const navBtns = document.querySelectorAll('.nav-btn');

  // ==========================================================================
  // Interactive Feedback & Navigation
  // ==========================================================================
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // House / Edition section entrance animation
  const navHouseBtn = document.getElementById('navHouseBtn');
  const houseSection = document.getElementById('houseSection');

  if (houseSection) {
    houseSection.classList.add('is-visible');

    const houseObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          houseSection.classList.add('is-visible');
          if (navHouseBtn) navHouseBtn.classList.add('active');
        } else {
          if (navHouseBtn) navHouseBtn.classList.remove('active');
        }
      });
    }, { threshold: 0.1 });

    houseObserver.observe(houseSection);
  }

  if (navHouseBtn && houseSection) {
    navHouseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      houseSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // Render 500 silhouettes for 'Against the Current' illustration
  // 499 figures face one direction (Midnight Navy)
  // Exactly 1 solitary figure faces opposite direction (Muted Amber-Bronze)
  // ==========================================================================
  const figuresGrid = document.getElementById('figuresGrid');
  if (figuresGrid && figuresGrid.children.length === 0) {
    const totalFigures = 500;
    // Solitary figure placed in the aesthetic lower-right golden quadrant (Row 13, Col 15 in 25x20)
    const solitaryIndex = 314;

    // Geometric walking silhouette path (viewBox 0 0 24 24)
    const silhouettePath = 'M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7';

    let gridHtml = '';
    for (let i = 0; i < totalFigures; i++) {
      if (i === solitaryIndex) {
        gridHtml += `<svg class="crowd-figure solitary-figure" viewBox="0 0 24 24" aria-label="Solitary figure facing against the current" role="graphics-symbol"><path d="${silhouettePath}"/></svg>`;
      } else {
        gridHtml += `<svg class="crowd-figure" viewBox="0 0 24 24" aria-hidden="true"><path d="${silhouettePath}"/></svg>`;
      }
    }
    figuresGrid.innerHTML = gridHtml;

    // Interactive feedback when clicking the solitary figure
    const solitaryFigure = figuresGrid.querySelector('.solitary-figure');
    if (solitaryFigure) {
      solitaryFigure.addEventListener('click', () => {
        showToast('ONE CHOOSES ANOTHER · MAIN CHARACTER');
      });
    }
  }

  // If page loads with #houseSection in URL, scroll smoothly to it and trigger visibility
  if (window.location.hash === '#houseSection' && houseSection) {
    houseSection.classList.add('is-visible');
    setTimeout(() => {
      houseSection.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }

  // Back to top button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
