// ============================================================
//  IO design — main.js  v2
//  + navbar scroll / hamburger drawer
//  + iOS background flicker fix (handled in CSS, JS補助)
// ============================================================

gsap.registerPlugin(ScrollTrigger);

// ============================================================
//  Stable viewport height — mobile address bar jump fix
// ============================================================

let viewportWidth = window.innerWidth;

function setStableViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--stable-vh', `${vh}px`);
}

function isTouchViewport() {
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

// ============================================================
//  NAVBAR — スクロールで半透明化 & ハンバーガー
// ============================================================

function initNav() {
  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const drawer     = document.getElementById('drawer');
  const drawerLinks = drawer.querySelectorAll('.drawer__link');

  // ── スクロールで .is-scrolled ────────────────────────────
  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初期実行

  // ── ドロワー開閉 ─────────────────────────────────────────
  let isOpen = false;

  function openDrawer() {
    isOpen = true;
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    // body スクロール封じ（iOSでは position:fixed が必要）
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    isOpen = false;
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    isOpen ? closeDrawer() : openDrawer();
  });

  // ドロワーリンク → 閉じてからスクロール
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Escape キー
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeDrawer();
  });

  // ドロワー背景クリックで閉じる
  drawer.querySelector('.drawer__bg').addEventListener('click', closeDrawer);
}

// ============================================================
//  HERO — タイトルきらめき
// ============================================================

function initHeroGlimmer() {
  const titleEl = document.querySelector('.hero__title-en');
  if (!titleEl) return;

  gsap.to(titleEl, {
    textShadow: `
      0 0 80px rgba(200, 169, 110, 0.5),
      0 0 160px rgba(200, 169, 110, 0.2),
      0 0 2px rgba(255, 255, 255, 0.4)
    `,
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}

// ============================================================
//  HERO scroll bar アニメーション
// ============================================================

function initScrollBar() {
  const bar = document.querySelector('.hero__scroll-bar');
  if (!bar) return;

  gsap.fromTo(bar,
    { scaleY: 0, transformOrigin: 'top center', opacity: 0.8 },
    { scaleY: 1, opacity: 0, duration: 1.6, ease: 'power2.in', repeat: -1, delay: 0.5 }
  );
}

// ============================================================
//  Fade-up on scroll
// ============================================================

function initFadeUps() {
  const targets = document.querySelectorAll('.js-fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseFloat(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('is-visible'), delay);
      observer.unobserve(el);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  targets.forEach(el => observer.observe(el));
}

// ============================================================
//  GSAP パララックス (hero)
// ============================================================

function initParallax() {
  gsap.to('.hero__inner', {
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// ============================================================
//  オーナメントライン描画
// ============================================================

function initOrnamentDraw() {
  document.querySelectorAll('.section__ornament').forEach(el => {
    gsap.fromTo(el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.out',
        transformOrigin: 'center center',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}

// ============================================================
//  WORKS カード ホバー
// ============================================================

function initWorksCards() {
  document.querySelectorAll('.works__card').forEach(card => {
    card.addEventListener('mouseenter', () => gsap.to(card, { y: -4, duration: 0.4, ease: 'power2.out' }));
    card.addEventListener('mouseleave', () => gsap.to(card, { y: 0,  duration: 0.5, ease: 'power2.inOut' }));
  });
}

// ============================================================
//  PLAN カード 呼吸エフェクト
// ============================================================

function initPlanPulse() {
  document.querySelectorAll('.plan__card').forEach((card, i) => {
    gsap.to(card, {
      boxShadow: '0 0 40px rgba(200,169,110,0.12), 0 0 80px rgba(200,169,110,0.04)',
      duration: 2.5,
      delay: i * 0.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    card.addEventListener('mouseenter', () =>
      gsap.to(card, { y: -6, duration: 0.5, ease: 'power2.out' })
    );
    card.addEventListener('mouseleave', () =>
      gsap.to(card, { y: 0,  duration: 0.5, ease: 'power2.inOut' })
    );
  });
}

// ============================================================
//  VOICE quote mark フロート
// ============================================================

function initVoiceFloat() {
  document.querySelectorAll('.voice__quote-mark').forEach((q, i) => {
    gsap.to(q, {
      y: -6,
      duration: 3,
      delay: i * 0.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });
}

// ============================================================
//  ボタン リップル
// ============================================================

function initButtonRipple() {
  document.querySelectorAll('.btn--primary').forEach(btn => {
    btn.addEventListener('click', e => {
      const ripple = document.createElement('span');
      const rect   = btn.getBoundingClientRect();

      Object.assign(ripple.style, {
        position: 'absolute',
        width: '6px', height: '6px',
        borderRadius: '50%',
        background: 'rgba(200,169,110,0.6)',
        pointerEvents: 'none',
        transform: 'translate(-50%,-50%) scale(0)',
        left: (e.clientX - rect.left) + 'px',
        top:  (e.clientY - rect.top)  + 'px',
      });

      btn.appendChild(ripple);
      gsap.to(ripple, {
        scale: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => ripple.remove(),
      });
    });
  });
}

// ============================================================
//  初期化
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
  setStableViewportHeight();

  setTimeout(() => {
    initNav();
    initFadeUps();
    initHeroGlimmer();
    initScrollBar();
    initParallax();
    initOrnamentDraw();
    initWorksCards();
    initPlanPulse();
    initVoiceFloat();
    initButtonRipple();
  }, 50);
});

window.addEventListener('resize', () => {
  const nextWidth = window.innerWidth;

  // スマホのaddress bar出入りは高さだけが変わるので、背景とScrollTriggerを再計算しない。
  if (isTouchViewport() && nextWidth === viewportWidth) return;

  viewportWidth = nextWidth;
  setStableViewportHeight();
  ScrollTrigger.refresh();
});

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    viewportWidth = window.innerWidth;
    setStableViewportHeight();
    ScrollTrigger.refresh();
  }, 300);
});
