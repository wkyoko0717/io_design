// ============================================================
//  IO design — main.js
//  GSAP + ScrollTrigger animations
// ============================================================

gsap.registerPlugin(ScrollTrigger);

// ── Utility ──────────────────────────────────────────────────

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// ============================================================
//  HERO — タイトルのきらめきエフェクト
// ============================================================

function initHeroGlimmer() {
  const titleEl = document.querySelector('.hero__title-en');
  if (!titleEl) return;

  // シマーアニメーション（疑似要素をJSで制御しないので
  // GSAP timeline で text-shadow を変化させる）
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
//  HERO scroll indicator パルス
// ============================================================

function initScrollPulse() {
  const bar = document.querySelector('.hero__scroll-bar');
  if (!bar) return;

  gsap.fromTo(bar,
    { scaleY: 0, transformOrigin: 'top center', opacity: 0.8 },
    { scaleY: 1, opacity: 0, duration: 1.6, ease: 'power2.in', repeat: -1, delay: 0.5 }
  );
}

// ============================================================
//  Fade-up on scroll — IntersectionObserver ベース
// ============================================================

function initFadeUps() {
  const targets = document.querySelectorAll('.js-fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const delay = parseFloat(el.dataset.delay || 0);

      setTimeout(() => {
        el.classList.add('is-visible');
      }, delay);

      observer.unobserve(el);
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  targets.forEach(el => observer.observe(el));
}

// ============================================================
//  WORKS カード — ホバー時のゴールドパーティクル
// ============================================================

function initWorksCards() {
  const cards = document.querySelectorAll('.works__card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -4,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    });
  });
}

// ============================================================
//  FLOW ライン アニメーション
// ============================================================

function initFlowLine() {
  const line = document.querySelector('.flow__list::before');
  // CSSで描いた疑似要素はJSから直接触れないので、
  // GSAP ScrollTriggerでflow__listにclipPathを使う代替案

  const flowList = document.querySelector('.flow__list');
  if (!flowList) return;

  // flow__listにoverflowは不要、アイテムごとのフェードで対応済み
}

// ============================================================
//  PLAN カード — ゴールドオーラ呼吸
// ============================================================

function initPlanPulse() {
  const cards = document.querySelectorAll('.plan__card');

  cards.forEach((card, i) => {
    gsap.to(card, {
      boxShadow: `
        0 0 40px rgba(200, 169, 110, 0.12),
        0 0 80px rgba(200, 169, 110, 0.04),
        inset 0 0 30px rgba(200, 169, 110, 0.03)
      `,
      duration: 2.5,
      delay: i * 0.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        boxShadow: `
          0 0 60px rgba(200, 169, 110, 0.25),
          0 0 120px rgba(200, 169, 110, 0.1)
        `,
        y: -6,
        duration: 0.5,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    });
  });
}

// ============================================================
//  GSAP ScrollTrigger — セクション背景のパララックス
// ============================================================

function initParallax() {
  // ヒーローのタイトルが少しゆっくり動くパララックス
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
//  GSAP ScrollTrigger — セクション装飾ラインの描画
// ============================================================

function initOrnamentDraw() {
  const ornaments = document.querySelectorAll('.section__ornament');

  ornaments.forEach(el => {
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
        }
      }
    );
  });
}

// ============================================================
//  Q&A アコーディオン（オプション・現在は全展開表示）
// ============================================================

function initQAHover() {
  const items = document.querySelectorAll('.qa__item');

  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        paddingLeft: 8,
        duration: 0.3,
        ease: 'power2.out',
      });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        paddingLeft: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });
}

// ============================================================
//  VOICE quote mark フロート
// ============================================================

function initVoiceFloat() {
  const quotes = document.querySelectorAll('.voice__quote-mark');

  quotes.forEach((q, i) => {
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
//  ボタン — ゴールドリップル
// ============================================================

function initButtonRipple() {
  const btns = document.querySelectorAll('.btn--primary');

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(200, 169, 110, 0.6);
        pointer-events: none;
        transform: translate(-50%, -50%) scale(0);
      `;

      const rect = btn.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top  = (e.clientY - rect.top)  + 'px';

      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
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
  // 少し遅らせてGSAP等の準備を待つ
  setTimeout(() => {
    initFadeUps();
    initHeroGlimmer();
    initScrollPulse();
    initParallax();
    initOrnamentDraw();
    initWorksCards();
    initPlanPulse();
    initQAHover();
    initVoiceFloat();
    initButtonRipple();
  }, 50);
});

// ── Resize対応 ───────────────────────────────────────────────
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
