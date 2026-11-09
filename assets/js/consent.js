/* Einwilligung für Google Analytics 4 (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO).
   Ohne „Akzeptieren“ wird von Google nichts geladen. Die Wahl liegt nur im localStorage dieses Browsers. */
(function () {
  var GA = 'G-2MW80FTKFS', KEY = 'mcp-consent', loaded = false;
  function get() { try { return localStorage.getItem(KEY); } catch (_) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (_) {} }

  function load() {
    if (loaded) return; loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA, { allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: 5184000 });
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
    document.head.appendChild(s);
  }
  function lead(method) { if (loaded && window.gtag) gtag('event', 'generate_lead', { method: method }); }

  /* Anfragen zählen: WhatsApp, Anruf, E-Mail, Rückruf-Formular */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
    var h = a.getAttribute('href');
    if (h.indexOf('https://wa.me/') === 0) lead('whatsapp');
    else if (h.indexOf('tel:') === 0) lead('phone');
    else if (h.indexOf('mailto:') === 0) lead('email');
  }, true);
  window.addEventListener('mcp:lead', function (e) { lead((e.detail && e.detail.method) || 'form'); });

  var box;
  function hide() { if (box) { box.remove(); box = null; } }
  function show() {
    if (box) return;
    box = document.createElement('div');
    box.className = 'consent'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Datenschutz-Einstellungen');
    box.innerHTML = '<p>Darf ich mit Google Analytics zählen, wie viele Besucher die Seite nutzen und wie viele davon anfragen? ' +
      'Das hilft, die Seite zu verbessern. Ohne Ihre Zustimmung wird nichts geladen. ' +
      '<a href="datenschutz.html#analytics">Mehr in der Datenschutzerklärung</a></p>' +
      '<div class="cbtn"><button type="button" data-c="denied">Ablehnen</button><button type="button" data-c="granted">Akzeptieren</button></div>';
    box.addEventListener('click', function (e) {
      var v = e.target.getAttribute && e.target.getAttribute('data-c'); if (!v) return;
      var was = get(); set(v); hide();
      if (v === 'granted') load();
      else if (was === 'granted') location.reload(); /* Widerruf: Seite ohne Analytics neu laden, Cookies löscht clean() */
    });
    document.body.appendChild(box);
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-consent-open]'); if (!t) return;
    e.preventDefault(); show();
  });

  /* Ohne Einwilligung keine Analytics-Cookies (auch nach Widerruf) */
  function clean() {
    document.cookie.split(';').forEach(function (k) {
      var n = k.split('=')[0].trim(); if (n.indexOf('_ga') !== 0) return;
      var h = location.hostname, ds = ['', h, '.' + h, '.' + h.replace(/^www\./, '')];
      ds.forEach(function (d) { document.cookie = n + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : ''); });
    });
  }

  var c = get();
  if (c !== 'granted') clean();
  if (c === 'granted') load();
  else if (c !== 'denied') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', show); else show();
  }
})();
