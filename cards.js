/* ══════════════════════════════════════════════
   cards.js  —  Skill card interactions
   • Scroll-reveal via IntersectionObserver
   • Animated progress bars & percentage counters
   • 3D tilt on hover
   • Category filter tabs
══════════════════════════════════════════════ */

(function () {

  /* ──────────────────────────────
     SCROLL-REVEAL OBSERVER
  ────────────────────────────── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('on');
      if (entry.target.classList.contains('card')) {
        animateCard(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.lbl, .ttl, .sub, .rule, .stats, .tabs, .card')
    .forEach(el => observer.observe(el));

  /* Stagger card entrance delays */
  document.querySelectorAll('.card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.045}s`;
  });


  /* ──────────────────────────────
     PROGRESS BAR + COUNTER ANIM
  ────────────────────────────── */
  function animateCard(card) {
    const fill   = card.querySelector('.fill');
    const pctEl  = card.querySelector('.pct');
    const target = Number(pctEl.dataset.target);

    /* Expand the bar */
    fill.style.width = fill.dataset.pct + '%';

    /* Count up the number */
    const startTime = performance.now();
    const duration  = 1200; // ms

    (function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      pctEl.textContent = Math.round(eased * target) + '%';
      if (progress < 1) requestAnimationFrame(tick);
    })(performance.now());
  }


  /* ──────────────────────────────
     3D TILT ON HOVER
  ────────────────────────────── */
  document.querySelectorAll('.card').forEach(card => {

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const rx   = (e.clientY - rect.top  - rect.height / 2) / rect.height;
      const ry   = (e.clientX - rect.left - rect.width  / 2) / rect.width;

      card.style.transform  = `translateY(0) rotateX(${rx * -11}deg) rotateY(${ry * 11}deg) scale(1.025)`;
      card.style.transition = 'transform .07s ease, opacity .5s, box-shadow .3s, border-color .3s';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform .55s ease, opacity .5s, box-shadow .3s, border-color .3s';
    });
  });


  /* ──────────────────────────────
     FILTER TABS
  ────────────────────────────── */
  const tabs  = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {

      /* Update active tab */
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      let visibleIndex = 0;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;

        /* Reset inline styles so CSS classes take over cleanly */
        card.style.cssText = '';
        card.classList.remove('on');

        if (!match) {
          card.classList.remove('show');
        } else {
          card.classList.add('show');

          /* Staggered re-entrance */
          const delay = visibleIndex * 55;
          visibleIndex++;

          setTimeout(() => {
            card.classList.add('on');
            animateCard(card);
          }, delay + 40);
        }
      });
    });
  });

})();
