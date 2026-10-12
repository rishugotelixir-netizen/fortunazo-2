// =========================================================
// Popular Games in Chile — Site Scripts
// =========================================================

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initActiveLink();
  initSmoothScroll();
  initCookieBanner();
});

/* ---------- Mobile navigation toggle ---------- */
function initMobileNav() {
  var toggle = document.querySelector('.nav__toggle');
  var list = document.querySelector('.nav__list');

  if (!toggle || !list) return;

  toggle.addEventListener('click', function () {
    var isOpen = list.classList.toggle('nav__list--open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when a link is clicked (mobile UX)
  list.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      list.classList.remove('nav__list--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Active link highlighting ---------- */
function initActiveLink() {
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.nav__link, .footer__link');

  links.forEach(function (link) {
    var linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('nav__link--active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ---------- Smooth scrolling for internal anchors ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href*="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var url = link.getAttribute('href');
      var hashIndex = url.indexOf('#');
      if (hashIndex === -1) return;

      var hash = url.substring(hashIndex + 1);
      var target = document.getElementById(hash);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
}

/* ---------- Cookie consent banner ---------- */
function initCookieBanner() {
  var banner = document.querySelector('.cookie');
  if (!banner) return;

  var accepted = getCookie('cg_cookie_consent');

  if (!accepted) {
    banner.hidden = false;
  }

  var acceptBtn = banner.querySelector('.cookie__accept');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      setCookie('cg_cookie_consent', 'accepted', 180);
      banner.hidden = true;
    });
  }
}

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/; SameSite=Lax';
}

function getCookie(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
