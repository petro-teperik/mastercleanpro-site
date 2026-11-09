/* Master Clean Pro: Interaktion nach dem Terrena-System. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = () => innerWidth <= 760;
  const touchDev = matchMedia('(hover: none)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const WA = 'https://wa.me/491789233032?text=';

  /* Smooth Scroll */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  $$('a[href^="#"], a[href^="index.html#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href').split('#')[1];
    const el = id && document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    closeMenu();
    if (lenis) lenis.scrollTo(el, { offset: 0 }); else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* Menü */
  const burger = $('#burger'), mnav = $('#mnav');
  function closeMenu() { document.body.classList.remove('menu-open'); burger && burger.setAttribute('aria-expanded', 'false'); mnav && mnav.setAttribute('aria-hidden', 'true'); }
  burger && burger.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    mnav.setAttribute('aria-hidden', String(!open));
  });
  mnav && $$('a', mnav).forEach(a => a.addEventListener('click', closeMenu));
  addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* Split-Überschriften */
  $$('.split').forEach(el => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(' '); return; }
            const w = document.createElement('span'); w.className = 'w';
            const s = document.createElement('span'); s.textContent = part; s.style.transitionDelay = (i++ * 70) + 'ms';
            w.append(s); frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
  });

  /* Buchstaben-Wortmarke */
  $$('.word[data-word]').forEach(el => {
    [...el.dataset.word].forEach((c, i) => {
      const ch = document.createElement('span'); ch.className = 'ch';
      const s = document.createElement('span'); s.textContent = c === ' ' ? ' ' : c; s.style.transitionDelay = (i * 70) + 'ms';
      ch.append(s); el.append(ch);
    });
  });

  /* Zähler */
  const count = el => {
    const to = +el.dataset.count;
    if (reduce || to === 0) { el.textContent = to; return; }
    const t0 = performance.now();
    const step = t => { const p = Math.min(1, (t - t0) / 1800); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };

  /* Reveal */
  $$('.grid4, .gl, #faq, .cols, .pfoot').forEach(g => $$('.rv', g).forEach((el, i) => el.style.transitionDelay = (i * 0.09) + 's'));
  const show = el => {
    const d = +el.dataset.d || 0;
    setTimeout(() => { el.classList.add('in'); $$('[data-count]', el).forEach(count); }, d);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    if (e.target.id === 'ctaFrame') { $('#ctaPanel').classList.add('in'); $$('.split', e.target).forEach(show); return; }
    show(e.target);
  }), { threshold: .18, rootMargin: '0px 0px -6% 0px' });
  const hero = $('.hero');
  $$('.rv, .split, .stat, .ph, #fword, #ctaFrame').forEach(el => { if (!hero || !hero.contains(el)) io.observe(el); });
  if (hero) setTimeout(() => $$('.rv, .split, .word', hero).forEach(show), 250);

  /* Nav ausblenden beim Runterscrollen, Parallaxe, Wörter färben, Ablauf: ein rAF-Takt */
  const nav = $('#nav'), heroMedia = $('#heroMedia'), heroCopy = $('#heroCopy');
  const para = $('#para');
  let words = [];
  if (para) {
    para.innerHTML = para.textContent.trim().split(/\s+/).map(w => `<span class="pw">${w}</span>`).join(' ');
    words = $$('.pw', para);
  }
  const how = $('#ablauf'), steps = $$('#steps button'), bars = $$('#bars b');
  const stepImg = $('#stepImg'), stepTxt = $('#stepTxt');
  const STEPS = [
    ['assets/img/auto-vorher.webp', 'Mit dem Handy, in einer Minute', 'Fotografieren Sie das Möbelstück ohne Decken und Kissen und senden Sie es per WhatsApp. Gerne mit Ihrem Ort.'],
    ['assets/img/leder-vorher.webp', 'Ein Festpreis nach Ihren Fotos', 'Sie bekommen einen Preis für genau Ihr Möbelstück, Mehraufwand für starke Flecken schon eingerechnet. Vor Ort ändert er sich nicht.'],
    ['assets/img/hero-900.webp', 'Meist in 1 bis 3 Tagen', 'Sie wählen den Tag, ich komme zu Ihnen nach Hause oder zum Auto. Bitte persönliche Gegenstände vorher wegräumen.'],
    ['assets/img/auto-nachher.webp', 'Sprühextraktion vor Ort', 'Ich reinige mit dem Santoemma Sabrina SW15. Nach einigen Stunden ist das Polster trocken und kann wieder genutzt werden.']
  ];
  let cur = 0;
  const setStep = (n, user) => {
    if (n === cur && !user) return;
    cur = n;
    steps.forEach((b, i) => { b.classList.toggle('on', i === n); b.setAttribute('aria-selected', String(i === n)); });
    const [img, h, p] = STEPS[n];
    stepImg.src = img;
    stepTxt.innerHTML = `<h4>${h}</h4><p>${p}</p>`;
    stepTxt.classList.remove('swap'); void stepTxt.offsetWidth; stepTxt.classList.add('swap');
  };
  steps.forEach((b, i) => b.addEventListener('click', () => {
    setStep(i, true);
    fillBars(); autoSteps();
  }));
  let auto = null;
  const fillBars = () => bars.forEach((b, i) => { b.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)'; b.style.transform = `scaleX(${i <= cur ? 1 : 0})`; });
  const autoSteps = () => {
    clearInterval(auto); auto = null;
    if (steps.length && !reduce) auto = setInterval(() => { setStep((cur + 1) % 4); fillBars(); }, 4000);
  };
  if (steps.length) { fillBars(); autoSteps(); }

  const whyBg = $('#whyBg'), ctaBg = $('#ctaBg'), mbar = $('#mbar'), cta = $('#kontakt');
  let lastY = scrollY;
  const tick = () => {
    const y = scrollY, vh = innerHeight;
    if (nav) nav.classList.toggle('hide', y > vh * .6 && y > lastY + 2 && !document.body.classList.contains('menu-open'));
    if (y < lastY - 2 || y < vh * .6) nav && nav.classList.remove('hide');
    lastY = y;
    if (!reduce) {
      if (y < vh * 1.2 && heroMedia) {
        const p = y / vh;
        /* Handy/Touch: Video nicht mit dem Scrollen bewegen, iOS ruckelt sonst */
        if (!touchDev) heroMedia.style.transform = `translate3d(0,${p * 18}%,0) scale(${1 + p * .08})`;
        heroCopy.style.transform = `translateY(${p * -60}px)`; heroCopy.style.opacity = String(Math.max(0, 1 - p * 1.3));
      }
      [whyBg, ctaBg].forEach(bg => {
        if (!bg) return;
        const r = bg.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / vh;
        bg.style.transform = `translateY(${p * -8}%)`;
      });
    }
    if (words.length) {
      const r = para.getBoundingClientRect();
      const pr = Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .45)));
      const n = reduce ? words.length : Math.round(pr * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    }
    if (false) {
      const r = how.getBoundingClientRect();
      const hp = Math.min(.9999, Math.max(0, -r.top / (how.offsetHeight - vh)));
      setStep(Math.floor(hp * 4));
      bars.forEach((b, i) => b.style.transform = `scaleX(${Math.min(1, Math.max(0, hp * 4 - i))})`);
    }
    if (mbar && cta) {
      const r = cta.getBoundingClientRect();
      mbar.classList.toggle('away', r.top < vh * .5 && r.bottom > 0);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  /* Staub im Licht (Hero) */
  const cv = $('#dust');
  if (cv && !reduce) {
    const ctx = cv.getContext('2d');
    let W, H, P = [];
    const size = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, W * H / 14000));
      P = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: .6 + Math.random() * 1.8, vx: -.08 - Math.random() * .18, vy: (Math.random() - .5) * .08, a: .2 + Math.random() * .5, t: Math.random() * 6.28 }));
    };
    size(); addEventListener('resize', size);
    let on = true;
    new IntersectionObserver(e => on = e[0].isIntersecting).observe(cv);
    const draw = () => {
      if (on) {
        ctx.clearRect(0, 0, W, H);
        for (const p of P) {
          p.x += p.vx; p.y += p.vy + Math.sin(p.t += .01) * .05;
          if (p.x < -5) p.x = W + 5; if (p.y < -5) p.y = H + 5; if (p.y > H + 5) p.y = -5;
          const beam = Math.max(0, 1 - Math.abs((p.x / W) - (p.y / H) * .55 - .45) * 2.4);
          ctx.globalAlpha = p.a * (.25 + beam * .75);
          ctx.fillStyle = '#fff6df';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  /* Preis-Rechner */
  const ITEMS = {
    sofa: [['s2', 'sofa', '2-Sitzer Sofa', 'Zweisitzer', 89], ['s3', 'sofa', '3-Sitzer Sofa', 'Dreisitzer, Couch', 119], ['se', 'sofa', 'Ecksofa', 'Ecksofa oder Wohnlandschaft', 159]],
    sitz: [['se1', 'armchair', 'Sessel', 'Polstersessel', 39], ['st', 'armchair', 'Polsterstuhl', 'Esszimmerstuhl mit Polster', 25]],
    auto: [['as', 'car', 'Autositz', 'Ein Sitz', 35], ['ak', 'car', 'Auto komplett', 'Vordersitze und Rückbank', 89], ['ks', 'car', 'Kindersitz', 'Kindersitz oder Babyschale', 35]],
    leder: [['ld', 'droplet', 'Ledermöbel', 'Reinigen und pflegen. Preis nach Fotos', 0]]
  };
  const ICON = {}; $$('template[data-icon]').forEach(t => ICON[t.dataset.icon] = t.innerHTML);
  const qty = {}; const NAMES = {};
  Object.values(ITEMS).flat().forEach(([id, , name, , price]) => { qty[id] = 0; NAMES[id] = [name, price]; });
  const itemsEl = $('#items');
  const renderItems = cat => {
    itemsEl.innerHTML = ITEMS[cat].map(([id, ic, name, d, price]) => `
      <div class="item${qty[id] ? ' has' : ''}" data-id="${id}">
        <div class="t">${ICON[ic] || ''}${name}</div><div class="d">${d}</div>
        <div class="row"><div class="p">${price ? `<small>ab </small>${price} €` : '<small>Preis nach Fotos</small>'}</div>
        <div class="qty"><button type="button" aria-label="${name} weniger">${ICON.minus}</button><output aria-label="Anzahl ${name}">${qty[id]}</output><button type="button" aria-label="${name} mehr">${ICON.plus}</button></div></div>
      </div>`).join('');
  };
  if (itemsEl) {
    renderItems('sofa');
    $$('#tabs button').forEach(b => b.addEventListener('click', () => {
      $$('#tabs button').forEach(x => x.setAttribute('aria-selected', String(x === b)));
      renderItems(b.dataset.cat);
    }));
    itemsEl.addEventListener('click', e => {
      const btn = e.target.closest('.qty button'); if (!btn) return;
      const it = btn.closest('.item'); const id = it.dataset.id;
      const plus = btn === btn.parentElement.lastElementChild;
      qty[id] = Math.max(0, Math.min(20, qty[id] + (plus ? 1 : -1)));
      $('output', it).textContent = qty[id]; it.classList.toggle('has', qty[id] > 0);
      upd();
    });
    const toggleChips = (sel, multi) => $$(sel + ' button').forEach(b => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      if (!multi) $$(sel + ' button').forEach(x => x.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', String(on)); upd();
    }));
    toggleChips('#prob', true); toggleChips('#ort', false);
    const upd = () => {
      const sel = Object.entries(qty).filter(([, n]) => n > 0);
      const sum = sel.reduce((s, [id, n]) => s + NAMES[id][1] * n, 0);
      const leder = qty.ld > 0;
      $('#tot').textContent = sel.length ? `ab ${sum} €` + (leder ? ' +' : '') : '0 €';
      $('#list').textContent = sel.length ? sel.map(([id, n]) => `${n}× ${NAMES[id][0]}`).join(', ') + (leder ? ' (Leder nach Fotos)' : '') : 'Noch nichts ausgewählt';
      $('#goalBar').style.transform = `scaleX(${Math.min(1, sum / 79)})`;
      $('#goalTxt').textContent = sum >= 79 ? 'Mindestauftrag von 79 € erreicht' : (sel.length ? `Noch ${79 - sum} € bis zum Mindestauftrag von 79 €` : 'Mindestauftrag pro Termin: 79 €');
      const prob = $$('#prob [aria-pressed=true]').map(b => b.textContent);
      const ort = $$('#ort [aria-pressed=true]').map(b => b.textContent)[0];
      let t = 'Hallo Petro, ich möchte reinigen lassen: ' + (sel.length ? sel.map(([id, n]) => `${n}× ${NAMES[id][0]}`).join(', ') : '…') + '.';
      if (prob.length) t += ' Problem: ' + prob.join(', ') + '.';
      t += ' Ort: ' + (ort || '…') + '. Fotos schicke ich gleich.';
      $('#calcWa').href = WA + encodeURIComponent(t);
    };
    upd();
  }

  /* Videos: abspielen, wenn sichtbar (Safari/Handy pausieren Autoplay außerhalb des Bildes) */
  if (!reduce) {
    const vio = new IntersectionObserver(es => es.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) { v.muted = true; const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); } else v.pause();
    }), { threshold: .05 });
    $$('video.vid').forEach(v => vio.observe(v));
  }
  $$('video[data-src]').forEach(v => {
    v.src = (mobile() && v.dataset.srcM) ? v.dataset.srcM : v.dataset.src;
    v.preload = 'auto';
  });

  /* Vorher / Nachher */
  $$('.ba input').forEach(inp => inp.addEventListener('input', () => inp.parentElement.style.setProperty('--x', inp.value + '%')));

  /* FAQ */
  $$('#faq li').forEach(li => $('button', li).addEventListener('click', () => {
    const open = !li.classList.contains('open');
    $$('#faq li').forEach(x => { x.classList.remove('open'); $('button', x).setAttribute('aria-expanded', 'false'); });
    if (open) { li.classList.add('open'); $('button', li).setAttribute('aria-expanded', 'true'); }
  }));

  /* Rückruf-Formular: derselbe Lead-Server wie auf der bisherigen Seite */
  const form = $('#form');
  if (form && window.fetch) form.addEventListener('submit', async e => {
    e.preventDefault();
    const st = $('#formSt'); const btn = $('button[type=submit]', form);
    const say = (t, ok) => { st.hidden = false; st.className = 'st ' + (ok ? 'ok' : 'err'); st.textContent = t; };
    const name = form.elements.name.value.trim(), phone = form.elements.phone.value.trim();
    if (!name || phone.replace(/\D/g, '').length < 6) { say('Bitte Namen und eine Telefonnummer angeben.', false); (name ? form.elements.phone : form.elements.name).focus(); return; }
    btn.disabled = true;
    try {
      const r = await fetch('https://leads.mastercleanpro.de/webhooks/website', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message: 'Rückruf gewünscht (Website)', website: form.elements.website.value }) });
      if (r.status === 201 || r.status === 202) { form.reset(); window.dispatchEvent(new CustomEvent('mcp:lead', { detail: { method: 'form' } })); say('Danke, ich rufe Sie zurück. Schneller geht es per WhatsApp.', true); }
      else if (r.status === 422) say('Bitte prüfen Sie Namen und Telefonnummer.', false);
      else throw new Error(r.status);
    } catch (_) { say('Senden hat leider nicht geklappt. Bitte schreiben Sie per WhatsApp oder rufen Sie an: +49 178 9233032.', false); }
    finally { btn.disabled = false; }
  });
})();
