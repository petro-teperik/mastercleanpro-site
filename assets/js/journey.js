/* Startseite als Weg des Kunden: Szenen, die mit dem Scrollen laufen. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => 1 - Math.pow(1 - t, 3);

  /* Fortschritt einer Szene: 0 beim Einrasten, 1 beim Loslassen */
  const prog = el => {
    const r = el.getBoundingClientRect(), h = el.offsetHeight - innerHeight;
    return h > 0 ? clamp(-r.top / h) : (r.top < innerHeight * .5 ? 1 : 0);
  };
  const near = el => { const r = el.getBoundingClientRect(); return r.bottom > -innerHeight && r.top < innerHeight * 2; };

  /* 3 Chat: laeuft einmal von selbst ab, sobald das Handy zu sehen ist (ca. 4 s) */
  const chat = $('[data-scene=chat]');
  const msgs = chat ? $$('.m', chat) : [], typing = chat && $('.typing', chat), chatSt = $('#chatSt');
  const showAll = () => { msgs.forEach(m => m.classList.add('on')); if (typing) typing.classList.remove('on'); if (chatSt) chatSt.textContent = 'online'; };
  if (msgs.length) {
    msgs[0].classList.add('on');
    if (reduce || !('IntersectionObserver' in window)) showAll();
    else {
      const play = () => {
        let t = 300;
        msgs.slice(1).forEach(m => {
          if (m.classList.contains('in')) {
            setTimeout(() => { const last = msgs.filter(x => x.classList.contains('on')).pop(); last.after(typing); typing.classList.add('on'); chatSt.textContent = 'schreibt …'; }, t);
            t += 700;
          }
          setTimeout(() => { typing.classList.remove('on'); chatSt.textContent = 'online'; m.classList.add('on'); }, t);
          t += 650;
        });
      };
      const cio = new IntersectionObserver(es => { if (es[0].isIntersecting) { cio.disconnect(); play(); } }, { threshold: .45 });
      cio.observe($('.phone', chat));
    }
  }

  /* 5 Tür */
  const door = $('[data-scene=door]');
  const runDoor = p => {
    door.style.setProperty('--o', ease(clamp((p - .1) / .5)).toFixed(4));
    door.style.setProperty('--t', ease(clamp((p - .45) / .3)).toFixed(4));
  };

  /* 6 Reinigung */
  const clean = $('[data-scene=clean]');
  const phases = clean ? $$('.ph3 li', clean) : [];
  const runClean = p => {
    clean.style.setProperty('--p', p.toFixed(4));
    const n = Math.min(phases.length - 1, Math.floor(p * phases.length * 1.05));
    phases.forEach((li, i) => li.classList.toggle('on', i <= n));
  };

  /* 7 Vorher/Nachher: Regler wandert mit, bis man selbst zieht */
  const ba = $('[data-scene=ba]'), baMain = $('#baMain');
  if (baMain) {
    const inp = $('input', baMain);
    ['pointerdown', 'touchstart', 'keydown'].forEach(ev => inp.addEventListener(ev, () => baMain.dataset.user = '1', { passive: true }));
  }
  const runBa = p => {
    if (!baMain || baMain.dataset.user) return;
    const x = 100 - ease(clamp((p - .05) / .7)) * 55;
    baMain.style.setProperty('--x', x.toFixed(2) + '%');
    $('input', baMain).value = x;
  };

  /* Wegmarke */
  const rail = $('#rail'), railN = $('#railN'), railT = $('#railT');
  const stepsEl = $$('[data-step]');
  let lastStep = 0;
  const runRail = () => {
    if (!rail) return;
    const mid = innerHeight * .5;
    let cur = stepsEl[0];
    stepsEl.forEach(s => { if (s.getBoundingClientRect().top <= mid) cur = s; });
    const n = +cur.dataset.step;
    const ctaTop = $('#kontakt').getBoundingClientRect().top;
    rail.classList.toggle('on', scrollY > innerHeight * .5 && ctaTop > innerHeight * .4);
    if (n !== lastStep) { lastStep = n; railN.textContent = n + '/8'; railT.textContent = cur.dataset.name; rail.style.setProperty('--rp', n / 8); }
  };

  /* 1 Glanzstreifen über dem Foto: kurz sieht man das saubere Sofa */
  const wipe = $('#wipe');
  const T = 7000;
  const runWipe = t => {
    if (!wipe) return;
    const k = (t % T) / T;
    const w = k < .62 ? -30 + ease(k / .62) * 160 : 130;
    wipe.style.setProperty('--w', w.toFixed(2) + '%');
  };

  const frame = t => {
    if (door && near(door)) runDoor(prog(door));
    if (clean && near(clean)) runClean(prog(clean));
    if (ba && near(ba)) runBa(prog(ba));
    if (wipe && scrollY < innerHeight) runWipe(t);
    runRail();
    requestAnimationFrame(frame);
  };
  if (reduce) {
    door && runDoor(1); clean && runClean(1);
    if (baMain) { baMain.style.setProperty('--x', '50%'); $('input', baMain).value = 50; }
    addEventListener('scroll', runRail, { passive: true }); runRail();
  } else requestAnimationFrame(frame);

  /* 4 Kalender: die nächsten sieben Tage, 1 bis 3 Tage hervorgehoben, sonntags geschlossen */
  const cal = $('#cal');
  if (cal) {
    const WD = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const d0 = new Date();
    let html = '';
    for (let i = 0; i < 7; i++) {
      const d = new Date(d0.getFullYear(), d0.getMonth(), d0.getDate() + i);
      const sun = d.getDay() === 0;
      const cls = sun ? 'off' : (i >= 1 && i <= 3 ? 'hl' : '');
      html += `<div class="${cls}"><small>${i === 0 ? 'Heute' : WD[d.getDay()]}</small><b>${d.getDate()}</b></div>`;
    }
    cal.innerHTML = html;
  }

  /* Videos in den neuen Szenen: nur laufen lassen, wenn sichtbar (site.js lädt sie) */
})();
