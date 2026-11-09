/* Mr Manaf Khatib: Breast Reduction landing page. No dependencies. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- content data ---------- */
  // Verified Google reviews (text as written by patients; dates intentionally omitted).
  var REVIEWS = [
    { name: 'Nicole W.', meta: 'Bilateral breast reduction', text: ['I recently underwent a bilateral breast reduction with Dr. Manaf Khatib and I can honestly say it has completely changed my life. I’d looked into having this procedure done for years and had done extensive research on different surgeons and I was so impressed with Dr. Khatibs results I went ahead and booked my consultation.', 'From this initial consultation and throughout the whole process, Dr. Khatib and his team made sure I was very well informed and honest with what results were realistic for me. I felt very supported, listened to and completely at ease to go ahead with the procedure.'] },
    { name: 'Paulina', meta: 'Google review', text: ['Having done extensive research into surgeons, it was important to me to find someone with both experience and an empathetic approach. I chose to have my procedure with Dr. Khatib because from the first consultation I felt informed and listened to.', 'The surgery and recovery were very quick, and the results have given me a newfound confidence. Those who have seen the before and after have commented what a masterful, artistic and skilful touch Dr. Khatib has. I only wish I had done it sooner!'] },
    { name: 'Margaret', meta: 'Google review', text: ['I had the pleasure of having Manaf Khatib as my surgeon. He did an amazing job, the results are perfect and every step of the process was well explained and put me at ease. I would highly recommend going to Manaf :)'] },
    { name: 'Sam S.', meta: 'Breast surgery', text: ['This is exactly why I chose Dr Manaf Khatib for my breast surgery. During my consultation, he took the time to talk me through the different options and recommend the approach that would deliver the best possible result for me. I wanted a natural look, and some of my initial ideas based on consultations I’d had with other cosmetic surgeons turned out not to be the best solution for achieving the result I wanted.', 'Even in the early days following my breast surgery, I could already see that the results were going to be fantastic. In complete honesty, I never imagined the outcome would be quite this spot on it’s actually even better than I had imagined.'] },
    { name: 'Mihaela C.', meta: 'Google review', text: ['I am truly very satisfied with the result of the surgery. The Dr. Manaf Khatib proved to be extremely professional, precise, and always available. He made me feel comfortable from the very beginning, and the final result is natural and beautiful, exactly as I wanted. The admission process was also quick and smooth, which made the whole experience even easier.', 'I sincerely recommend Dt. Manaf Khatib to anyone looking for a skilled and trustworthy doctor. Thank you from the bottom of my heart!'] }
  ];

  // Cases and technique labels from mkplasticsurgeon.co.uk/gallery/breast-reduction/
  var BA = [
    { id: 'c7', title: 'Bilateral breast reduction', text: 'Front view. A significant reduction, with a rounder, lifted shape that sits in proportion with her frame.', tag: 'Front view' },
    { id: 'c1', title: 'Breast reduction with auto-augmentation', text: 'Front view. Her own tissue was repositioned to restore fullness at the top of the breast, without implants.', tag: 'Front view' },
    { id: 'c4', title: 'Bilateral breast reduction', text: 'Front view. A large reduction, with the nipples moved up to a natural height.', tag: 'Front view' },
    { id: 'c3', title: 'Breast reduction with liposuction', text: 'Front view. Liposuction refined the outer chest for a smoother, slimmer outline.', tag: 'Front view' },
    { id: 'c5', title: 'Breast reduction', text: 'Front view. Smaller, lighter breasts with a neater, lifted shape.', tag: 'Front view' },
    { id: 'c6', title: 'Breast reduction', text: 'Front view. A balanced reduction and lift.', tag: 'Front view' },
    { id: 'c8', title: 'Breast reduction', text: 'Front view. Lighter and lifted, in proportion with her frame.', tag: 'Front view' }
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
      return '<div class="ba__slide' + (pair.length === 1 ? ' is-single' : '') + '" role="group" aria-roledescription="slide" aria-label="' + (si + 1) + ' of ' + slides.length + '"' + (si ? ' aria-hidden="true"' : '') + '>' +
        pair.map(function (p) {
          return '<figure class="ba__fig">' + compareHTML(p.id, p.title) + '<figcaption><b>' + esc(p.title) + '</b><span>' + esc(p.text) + '</span></figcaption></figure>';
        }).join('') + '</div>';
    }).join('');
    $$('[data-compare]', track).forEach(initCompare);
    var cur = 0, total = slides.length, slideEls = $$('.ba__slide', track);
    $('[data-ba-total]').textContent = total;
    var dotsWrap = $('[data-ba-dots]');
    dotsWrap.innerHTML = slides.map(function (s, i) { return '<button type="button" class="dot" role="tab" aria-label="' + (s.length > 1 ? 'Cases ' + (i * 2 + 1) + ' and ' + (i * 2 + 2) : 'Case ' + (i * 2 + 1)) + '"></button>'; }).join('');
    var baDots = $$('.dot', dotsWrap);
    baDots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
    var go = function (n) {
      cur = (n + total) % total;
      track.style.transform = 'translateX(' + (-100 * cur) + '%)';
      $('[data-ba-cur]').textContent = cur + 1;
      baDots.forEach(function (d, k) { d.classList.toggle('is-on', k === cur); d.setAttribute('aria-selected', k === cur); });
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
        '<div class="rcard__text">' + r.text.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
        '<button type="button" class="rcard__more" hidden' + (dup ? ' tabindex="-1"' : '') + '>Read more</button>' +
        '<p class="rcard__who">' + esc(r.name) + '<span>' + esc(r.meta) + '</span></p></article>';
    };
    tTrack.innerHTML = REVIEWS.map(function (r) { return card(r, false); }).join('') + (reduce ? '' : REVIEWS.map(function (r) { return card(r, true); }).join(''));
    tTrack.style.setProperty('--dur', (REVIEWS.length * 9) + 's');
    var checkClamp = function () {
      $$('.rcard', tTrack).forEach(function (c) {
        var t = $('.rcard__text', c), b = $('.rcard__more', c);
        if (c.classList.contains('is-open')) return;
        var clamped = t.scrollHeight > t.clientHeight + 2;
        b.hidden = !clamped; c.classList.toggle('is-clamped', clamped);
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

  /* ---------- video testimonial ---------- */
  var video = $('[data-video]'), play = $('[data-play]');
  if (video && play) {
    var phone = video.closest('.phone');
    play.addEventListener('click', function () {
      video.controls = true;
      var pr = video.play(); if (pr && pr.catch) pr.catch(function () {});
    });
    video.addEventListener('play', function () { phone.classList.add('is-playing'); });
    video.addEventListener('pause', function () { if (video.ended || video.currentTime === 0) phone.classList.remove('is-playing'); });
    video.addEventListener('ended', function () { phone.classList.remove('is-playing'); video.controls = false; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { en.forEach(function (e) { if (!e.isIntersecting && !video.paused) video.pause(); }); }, { threshold: 0.1 }).observe(video);
    }
  }

  var yr = $('[data-year]'); if (yr) yr.textContent = new Date().getFullYear();
  onScroll();
})();
