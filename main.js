/* ==============================
   main.js — BLOOM NOTE
============================== */

// 새로고침 시 맨 위로
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);


/* ==============================
   1. 네비게이션 — 스크롤 시 스타일 변경
============================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ==============================
   2. 햄버거 메뉴
============================== */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu   = document.getElementById('mobileMenu');
const mobileClose  = document.getElementById('mobileClose');

hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  hamburgerBtn.classList.add('open');
  document.body.style.overflow = 'hidden';
});

mobileClose.addEventListener('click', () => {
  closeMobile();
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburgerBtn.classList.remove('open');
  document.body.style.overflow = '';
}

mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    closeMobile();
  }
});


/* ==============================
   3. 히어로 텍스트 인터랙션
   한 줄씩 순차 등장
============================== */
const heroLines = document.querySelectorAll('.hero-line');

window.addEventListener('load', () => {
  heroLines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add('show');
    }, 180 + index * 180);
  });
});


/* ==============================
   4. 스크롤 리빌 애니메이션
============================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.13,
  }
);

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


/* ==============================
   5. 상품 탭 필터
============================== */
const tabBtns      = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {

    tabBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach((card) => {
      const match = filter === 'all' || card.dataset.cat === filter;

      if (match) {
        card.style.display   = 'block';
        card.style.opacity   = '0';
        card.style.transform = 'translateY(20px)';

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0)';
          });
        });

      } else {
        card.style.transition = 'opacity 0.25s ease';
        card.style.opacity    = '0';

        setTimeout(() => {
          card.style.display = 'none';
        }, 250);
      }
    });
  });
});


/* ==============================
   6. 스무스 스크롤
============================== */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();

    const navHeight = navbar.offsetHeight;
    const targetTop = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
  });
});


/* ==============================
   7. 인스타그램 호버 애니메이션
============================== */
const instaItems = document.querySelectorAll('.insta-item');

instaItems.forEach((item) => {
  const heart = item.querySelector('.insta-hover');

  item.addEventListener('mouseenter', () => {
    heart.style.transform  = 'scale(1.15)';
    heart.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });

  item.addEventListener('mouseleave', () => {
    heart.style.transform = 'scale(1)';
  });
});


/* ==============================
   8. 네비 활성 링크 하이라이트
============================== */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach((a) => {
          a.classList.remove('nav-active');
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('nav-active');
          }
        });
      }
    });
  },
  { threshold: 0.45 }
);

sections.forEach((sec) => sectionObserver.observe(sec));

const navActiveStyle = document.createElement('style');
navActiveStyle.textContent = `
  .nav-links a.nav-active {
    color: var(--sage-dark) !important;
  }
`;
document.head.appendChild(navActiveStyle);


/* ==============================
   9. 상품 카드 틸트 효과
============================== */
const tiltCards = document.querySelectorAll('.product-card');

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect    = card.getBoundingClientRect();
    const x       = e.clientX - rect.left;
    const y       = e.clientY - rect.top;
    const centerX = rect.width  / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) *  4;

    card.style.transform  = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform  = 'translateY(0)';
    card.style.transition = 'transform 0.4s ease';
  });
});


/* ==============================
   10. 페이지 로드 — 첫 화면 리빌
============================== */
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add('visible');
    }
  });
});
