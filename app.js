/* LOGISTIC SERVICES LLC — interactions */
(function () {
  'use strict';

  /* Mobile navigation */
  var toggle = document.querySelector('[data-nav-toggle]');
  var mobileNav = document.querySelector('[data-mobile-nav]');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.getAttribute('data-open') === 'true';
      mobileNav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.setAttribute('data-visible', 'true');
    });
  }

  /* Quote form — builds an email draft and shows inline confirmation */
  var form = document.querySelector('[data-quote-form]');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var lines = [
        'Name: ' + (data.get('name') || ''),
        'Company: ' + (data.get('company') || ''),
        'Phone: ' + (data.get('phone') || ''),
        'Email: ' + (data.get('email') || ''),
        'Service needed: ' + (data.get('service') || ''),
        '',
        (data.get('message') || '').replace(/\n/g, '\n')
      ];
      var mailto =
        'mailto:quotes@logisticservicesllc.com?subject=' +
        encodeURIComponent('Quote request — ' + (data.get('company') || 'New prospect')) +
        '&body=' +
        encodeURIComponent(lines.join('\n'));
      var status = form.querySelector('.form-status');
      var fallback = form.querySelector('.form-mailto');
      if (fallback) {
        fallback.setAttribute('href', mailto);
        fallback.style.display = 'inline-flex';
      }
      if (status) {
        status.setAttribute('data-visible', 'true');
      }
      form.querySelector('button[type="submit"]').textContent = 'Request sent';
    });
  }
})();
