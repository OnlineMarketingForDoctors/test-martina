/* Mr Manaf Khatib: Breast Reduction landing page. No dependencies. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- content data ---------- */
  // PLACEHOLDER REVIEWS: replace each entry with a verified Google review (name + full text).
  var REVIEWS = [
    { name: '[Patient name]', meta: 'Breast reduction', text: '[Placeholder] A real Google review will go here. Paste the full text from the review screenshot, without the date.' },
    { name: '[Patient name]', meta: 'Breast reduction', text: '[Placeholder] Longer reviews are trimmed after five lines and open in full with Read more. This sample is deliberately long so the expand behaviour can be checked before the real copy goes in. It keeps going to show how a detailed patient story about consultation, surgery and recovery will sit inside the card once it is added.' },
    { name: '[Patient name]', meta: 'Breast reduction', text: '[Placeholder] Short review text.' },
    { name: '[Patient name]', meta: 'Breast reduction & lift', text: '[Placeholder] A real Google review will go here. Paste the full text from the review screenshot, without the date.' },
    { name: '[Patient name]', meta: 'Breast reduction', text: '[Placeholder] Another longer review to test the Read more link. Real reviews often describe the first consultation, how the surgeon explained the options, the day of surgery, the first weeks of recovery and how life feels months later, so the card needs to handle a few paragraphs gracefully.' },
    { name: '[Patient name]', meta: 'Breast reduction', text: '[Placeholder] A real Google review will go here.' },
    { name: '[Patient name]', meta: 'Reduction mammoplasty', text: '[Placeholder] A real Google review will go here. Paste the full text from the review screenshot, without the date.' }
  ];

  var BA = [
    { id: 'p1', title: 'Patient one', text: 'Breast reduction, front view. Lighter and lifted, in proportion with her frame.' },
    { id: 'p1s', title: 'Patient one', text: 'The same result in profile, with a higher, neater shape.' },
    { id: 'p2', title: 'Patient two', text: 'Bilateral breast reduction with the nipples repositioned to a natural height.' },
    { id: 'p3', title: 'Patient three', text: 'Breast reduction. Smaller breasts sitting higher on the chest.' },
    { id: 'p4', title: 'Patient four', text: 'Breast reduction. A balanced, natural reduction.' },
    { id: 'p5', title: 'Patient five', text: 'Breast reduction with liposuction to refine the sides of the chest.' }
  ];

  var GOOGLE_G = '<svg class="rcard__g" viewBox="0 0 48 48" width="24" height="24" aria-label="Google review" role="img"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- location variant (?loc=hertfordshire|london) ---------- */
  var loc = (new URLSearchParams(location.search).get('loc') || '').toLowerCase();
  var label = $('[data-loc-label]');
  if (label && /^(herts|hertfordshire)$/.test(loc)) label.textContent = 'Breast reduction surgery in Hertfordshire';
  if (label && loc === 'london') label.textContent = 'Breast reduction surgery in London';

  /* ---------- header, progress, sticky bars ---------- */
  var hdr = $('.hdr'), bar = $('.progress span'), mbar = $('.mbar'), totop = $('.totop'), hero = $('.hero');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = doc.scrollHeight - window.innerHeight;
    bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    hdr.classList.toggle('is-scrolled', y > 20);
    var past = hero ? y > hero.offsetTop + hero.offsetHeight - window.innerHeight * 0.35 : y > 600;
    mbar.classList.toggle('is-on', past);
    totop.classList.toggle('is-on', y > window.innerHeight * 1.2);
    parallax();
    timeline();
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);

  /* ---------- mobile nav ---------- */
  var burger = $('.hdr__burger'), mnav = $('#mnav');
  function closeNav() { burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu'); mnav.hidden = true; }
  burger.addEventListener('click', function () {
    var open = burger.getAttribute('aria-expanded') === 'true';
    if (open) { closeNav(); } else { burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', 'Close menu'); mnav.hidden = false; hdr.classList.add('is-scrolled'); }
  });
  $$('a', mnav).forEach(function (a) { a.addEventListener('click', closeNav); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mnav.hidden) { closeNav(); burger.focus(); } });

  /* ---------- active nav link ---------- */
  var navLinks = $$('.hdr__nav a');
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) { var t = $(a.getAttribute('href')); if (t) secObs.observe(t); });
  }

  /* ---------- reveals ---------- */
  var revealEls = $$('.reveal');
  if (!reduce && 'IntersectionObserver' in window) {
    var rObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); rObs.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el, i) {
      var sib = el.parentElement ? $$('.reveal', el.parentElement).indexOf(el) : 0;
      el.style.transitionDelay = Math.min(sib, 6) * 70 + 'ms';
      rObs.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- parallax ---------- */
  var pEls = reduce ? [] : $$('[data-parallax]');
  function parallax() {
    if (!pEls.length) return;
    var vh = window.innerHeight;
    pEls.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var prog = (r.top + r.height / 2 - vh / 2) / (vh + r.height);
      el.style.transform = 'translate3d(0,' + (prog * -60).toFixed(1) + 'px,0)';
    });
  }

  /* ---------- compare sliders ---------- */
  function initCompare(el) {
    var range = $('.compare__range', el);
    var set = function (v) { el.style.setProperty('--pos', v + '%'); };
    set(range.value);
    range.addEventListener('input', function () { set(range.value); });
  }
  function compareHTML(id, alt) {
    return '<div class="compare" data-compare>' +
      '<span class="compare__tag compare__tag--b">Before</span><span class="compare__tag compare__tag--a">After</span>' +
      '<img class="compare__a" src="assets/img/ba/' + id + '-after.webp" alt="After: ' + esc(alt) + '" width="400" height="620" loading="lazy">' +
      '<div class="compare__b"><img src="assets/img/ba/' + id + '-before.webp" alt="Before: ' + esc(alt) + '" width="400" height="620" loading="lazy"></div>' +
      '<span class="compare__line" aria-hidden="true"><span class="compare__knob"></span></span>' +
      '<input class="compare__range" type="range" min="0" max="100" value="50" aria-label="Drag to compare before and after, ' + esc(alt) + '">' +
      '</div>';
  }

  // hero mini compare
  var mini = $('.compare--mini');
  if (mini) {
    initCompare(mini);
    var miniA = $('.compare__a', mini), miniB = $('.compare__b img', mini), miniDots = $$('[data-mini]');
    var miniIdx = 0, miniTimer;
    var showMini = function (i) {
      miniIdx = i; var id = miniDots[i].getAttribute('data-mini');
      miniA.src = 'assets/img/ba/' + id + '-after.webp'; miniB.src = 'assets/img/ba/' + id + '-before.webp';
      miniDots.forEach(function (d, k) { d.classList.toggle('is-on', k === i); d.setAttribute('aria-pressed', k === i); });
    };
    miniDots.forEach(function (d, i) { d.addEventListener('click', function () { clearInterval(miniTimer); showMini(i); }); });
    if (!reduce) {
      // gentle sweep to hint interaction
      var sweep = 0, dir = 1, range = $('.compare__range', mini);
      var hint = setInterval(function () {
        sweep += dir * 2; if (sweep > 24) dir = -1;
        range.value = 50 + sweep; mini.style.setProperty('--pos', range.value + '%');
        if (sweep <= 0 && dir === -1) { clearInterval(hint); range.value = 50; mini.style.setProperty('--pos', '50%'); }
      }, 30);
      miniTimer = setInterval(function () { if (!mini.matches(':hover') && document.activeElement !== range) showMini((miniIdx + 1) % miniDots.length); }, 6000);
      mini.addEventListener('pointerdown', function () { clearInterval(miniTimer); clearInterval(hint); }, { once: true });
    }
  }

  // main B&A carousel: two patients per slide
  var track = $('[data-ba-track]');
  if (track) {
    var slides = [];
    for (var i = 0; i < BA.length; i += 2) slides.push(BA.slice(i, i + 2));
    track.innerHTML = slides.map(function (pair, si) {
      return '<div class="ba__slide" role="group" aria-roledescription="slide" aria-label="' + (si + 1) + ' of ' + slides.length + '"' + (si ? ' aria-hidden="true"' : '') + '>' +
        pair.map(function (p) {
          return '<figure class="ba__fig">' + compareHTML(p.id, p.text) + '<figcaption><b>' + esc(p.title) + '</b><span>' + esc(p.text) + '</span></figcaption></figure>';
        }).join('') + '</div>';
    }).join('');
    $$('[data-compare]', track).forEach(initCompare);
    var cur = 0, total = slides.length, slideEls = $$('.ba__slide', track);
    $('[data-ba-total]').textContent = total;
    var go = function (n) {
      cur = (n + total) % total;
      track.style.transform = 'translateX(' + (-100 * cur) + '%)';
      $('[data-ba-cur]').textContent = cur + 1;
      slideEls.forEach(function (s, k) {
        var on = k === cur; s.setAttribute('aria-hidden', on ? 'false' : 'true');
        $$('input', s).forEach(function (inp) { inp.tabIndex = on ? 0 : -1; });
      });
    };
    $('[data-ba-prev]').addEventListener('click', function () { go(cur - 1); });
    $('[data-ba-next]').addEventListener('click', function () { go(cur + 1); });
    go(0);
    // swipe (outside the compare handles)
    var sx = null;
    track.addEventListener('touchstart', function (e) { if (e.target.classList.contains('compare__range')) return; sx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1)); sx = null; });
  }

  /* ---------- reviews ticker ---------- */
  var ticker = $('[data-ticker]'), tTrack = $('[data-track]');
  if (tTrack) {
    var card = function (r, dup) {
      return '<article class="rcard"' + (dup ? ' aria-hidden="true"' : '') + '>' + GOOGLE_G +
        '<span class="stars" aria-label="5 out of 5 stars">★★★★★</span>' +
        '<p class="rcard__text">' + esc(r.text) + '</p>' +
        '<button type="button" class="rcard__more" hidden' + (dup ? ' tabindex="-1"' : '') + '>Read more</button>' +
        '<p class="rcard__who">' + esc(r.name) + '<span>' + esc(r.meta) + '</span></p></article>';
    };
    tTrack.innerHTML = REVIEWS.map(function (r) { return card(r, false); }).join('') + (reduce ? '' : REVIEWS.map(function (r) { return card(r, true); }).join(''));
    tTrack.style.setProperty('--dur', (REVIEWS.length * 9) + 's');
    var checkClamp = function () {
      $$('.rcard', tTrack).forEach(function (c) {
        var t = $('.rcard__text', c), b = $('.rcard__more', c);
        if (c.classList.contains('is-open')) return;
        b.hidden = !(t.scrollHeight > t.clientHeight + 2);
      });
    };
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(checkClamp);
    window.addEventListener('resize', checkClamp);
    tTrack.addEventListener('click', function (e) {
      var b = e.target.closest('.rcard__more'); if (!b) return;
      var c = b.closest('.rcard'), open = c.classList.toggle('is-open');
      b.textContent = open ? 'Read less' : 'Read more';
      ticker.classList.toggle('is-paused', !!$('.rcard.is-open', tTrack));
    });
  }

  /* ---------- candidate checklist ---------- */
  var check = $('[data-check]');
  if (check) {
    var boxes = $$('input', check), res = $('[data-check-result]'), msg = $('[data-check-msg]');
    var update = function () {
      var n = boxes.filter(function (b) { return b.checked; }).length;
      res.classList.toggle('is-match', n >= 2);
      msg.textContent = n === 0 ? 'Tick what applies to you.' :
        n === 1 ? 'One thing on your mind already. A consultation can tell you if surgery would help.' :
        'You ticked ' + n + ' of ' + boxes.length + '. Breast reduction may well help you.';
    };
    boxes.forEach(function (b) { b.addEventListener('change', update); });
  }

  /* ---------- tabs ---------- */
  $$('[data-tabs]').forEach(function (root) {
    var tabs = $$('[role="tab"]', root);
    var select = function (t, focus) {
      tabs.forEach(function (x) {
        var on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) t.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, j = null;
        if (k === 'ArrowRight' || k === 'ArrowDown') j = (i + 1) % tabs.length;
        if (k === 'ArrowLeft' || k === 'ArrowUp') j = (i - 1 + tabs.length) % tabs.length;
        if (k === 'Home') j = 0; if (k === 'End') j = tabs.length - 1;
        if (j !== null) { e.preventDefault(); select(tabs[j], true); }
      });
    });
  });

  /* ---------- timeline fill ---------- */
  var tl = $('[data-timeline]'), tlItems = tl ? $$('.tl__item', tl) : [];
  function timeline() {
    if (!tl) return;
    var r = tl.getBoundingClientRect(), vh = window.innerHeight, mark = vh * 0.6;
    var f = Math.max(0, Math.min(1, (mark - r.top) / r.height));
    tl.style.setProperty('--fill', f.toFixed(4));
    tlItems.forEach(function (it) { it.classList.toggle('is-on', it.getBoundingClientRect().top < mark); });
  }

  /* ---------- accordion (smooth) ---------- */
  $$('[data-acc] details').forEach(function (d) {
    var s = $('summary', d), body = $('.acc__body', d);
    s.addEventListener('click', function (e) {
      if (reduce) return;
      e.preventDefault();
      if (d.open) {
        body.style.height = body.scrollHeight + 'px';
        requestAnimationFrame(function () {
          body.style.transition = 'height .45s cubic-bezier(.22,.61,.36,1)'; body.style.height = '0px';
        });
        body.addEventListener('transitionend', function te() { d.open = false; body.style.cssText = ''; body.removeEventListener('transitionend', te); });
      } else {
        d.open = true; var h = body.scrollHeight; body.style.height = '0px';
        requestAnimationFrame(function () {
          body.style.transition = 'height .45s cubic-bezier(.22,.61,.36,1)'; body.style.height = h + 'px';
        });
        body.addEventListener('transitionend', function te() { body.style.cssText = ''; body.removeEventListener('transitionend', te); });
      }
    });
  });

  /* ---------- form ---------- */
  var form = $('[data-form]');
  if (form) {
    var ENDPOINT = 'https://formsubmit.co/ajax/info@manafkhatib.com';
    var sel = $('select', form);
    sel.addEventListener('change', function () { sel.classList.toggle('has-value', !!sel.value); });
    var msgs = {
      first_name: 'Please enter your first name.',
      last_name: 'Please enter your last name.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a phone number we can call you on.',
      heard_about_us: 'Please choose an option.'
    };
    var validate = function (f) {
      var wrap = f.closest('.field'), err = $('.field__err', wrap); if (!err) return true;
      var ok = f.checkValidity();
      if (f.name === 'phone' && f.value) ok = ok && f.value.replace(/\D/g, '').length >= 10;
      wrap.classList.toggle('is-invalid', !ok); wrap.classList.toggle('is-valid', ok && !!f.value);
      f.setAttribute('aria-invalid', ok ? 'false' : 'true');
      err.textContent = ok ? '' : msgs[f.name] || 'Please check this field.';
      if (err.id === '') { err.id = 'err-' + f.id; f.setAttribute('aria-describedby', err.id); }
      return ok;
    };
    var fields = $$('input[required], select[required]', form);
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value || f.closest('.field').classList.contains('is-invalid')) validate(f); });
      f.addEventListener('input', function () { if (f.closest('.field').classList.contains('is-invalid')) validate(f); });
      f.addEventListener('change', function () { validate(f); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = fields.filter(function (f) { return !validate(f); });
      if (bad.length) { bad[0].focus(); return; }
      if (form._honey && form._honey.value) return;
      var btn = $('button[type="submit"]', form), errBox = $('[data-form-error]');
      btn.setAttribute('aria-busy', 'true'); $('span', btn).textContent = 'Sending…'; errBox.hidden = true;
      var data = {};
      new FormData(form).forEach(function (v, k) { if (k !== '_honey') data[k] = v; });
      data._subject = 'New breast reduction enquiry: ' + data.first_name + ' ' + data.last_name;
      data._template = 'table';
      data._captcha = 'false';
      data.page = location.href;
      fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (j) {
          if (j && (j.success === false || j.success === 'false')) throw new Error('fail');
          var ok = $('[data-form-ok]');
          $('[data-ok-name]', ok).textContent = data.first_name;
          form.hidden = true; ok.hidden = false; ok.focus();
          if (window.dataLayer) window.dataLayer.push({ event: 'generate_lead', form: 'breast_reduction_consultation' });
        })
        .catch(function () { errBox.hidden = false; })
        .then(function () { btn.removeAttribute('aria-busy'); $('span', btn).textContent = 'Request my consultation'; });
    });
  }

  var yr = $('[data-year]'); if (yr) yr.textContent = new Date().getFullYear();
  onScroll();
})();
