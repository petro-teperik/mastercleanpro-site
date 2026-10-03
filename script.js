const content = window.siteContent;

function getValue(path) {
  return path.split('.').reduce((obj, key) => obj && obj[key], content);
}

function setTextByDataContent() {
  document.querySelectorAll('[data-content]').forEach((el) => {
    const value = getValue(el.dataset.content);
    if (value) el.textContent = value;
  });
}

function setupLinks() {
  const phoneHref = `tel:${content.company.phoneHref}`;
  const whatsappHref = `https://wa.me/${content.company.phoneHref.replace('+', '')}?text=${encodeURIComponent(content.company.whatsappText)}`;
  const emailHref = `mailto:${content.company.email}`;
  const contactForm = document.querySelector('.contact-form');

  document.querySelectorAll('[data-phone-link]').forEach((el) => el.setAttribute('href', phoneHref));
  document.querySelectorAll('[data-whatsapp-link]').forEach((el) => el.setAttribute('href', whatsappHref));
  document.querySelectorAll('[data-email-link]').forEach((el) => el.setAttribute('href', emailHref));
  document.querySelectorAll('[data-phone-text]').forEach((el) => el.textContent = content.company.phoneDisplay);
  document.querySelectorAll('[data-email-text]').forEach((el) => el.textContent = content.company.email);
  if (contactForm) contactForm.setAttribute('action', emailHref);
}

function escapeAttribute(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function imageOrPlaceholder(item, className = 'card-image') {
  const title = item.title || 'Foto einfügen';

  if (!item.image) {
    return `<div class="${className} placeholder"><span>${title}</span></div>`;
  }

  return `
    <div class="${className}">
      <img
        src="${escapeAttribute(item.image)}"
        alt="${escapeAttribute(title)}"
        loading="lazy"
        onerror="this.parentElement.classList.add('placeholder'); this.parentElement.innerHTML = '<span>' + this.alt + '</span>';"
      >
    </div>
  `;
}

function setupHero() {
  const heroImage = document.querySelector('[data-hero-image]');

  if (heroImage && content.hero.image) {
    heroImage.setAttribute('src', content.hero.image);
  }
}

function renderTrust() {
  const target = document.getElementById('trustList');
  if (!target) return;
  target.innerHTML = content.trust.map((item) => `<div class="trust-item">${item}</div>`).join('');
}

function renderServices() {
  const target = document.getElementById('servicesList');
  if (!target) return;
  target.innerHTML = content.services.map((item) => `
    <article class="card" id="${item.id}">
      ${imageOrPlaceholder(item)}
      <div class="card-body">
        <h3>${item.title}</h3>
        <p class="sub">${item.subtitle}</p>
        <p>${item.text}</p>
      </div>
    </article>
  `).join('');
}

function renderPrices() {
  const target = document.getElementById('pricesList');
  if (!target) return;
  target.innerHTML = content.prices.map((item) => `
    <article class="price-card">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="price">${item.price}</div>
    </article>
  `).join('');
}

function renderProcess() {
  const target = document.getElementById('processList');
  if (!target) return;
  target.innerHTML = content.process.map((item) => `
    <article class="process-card">
      <div class="step">${item.step}</div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join('');
}

function renderGallery() {
  const target = document.getElementById('galleryList');
  if (!target) return;
  target.innerHTML = content.gallery.map((item) => `
    <article class="gallery-item">
      ${imageOrPlaceholder(item, 'gallery-placeholder')}
      <div class="gallery-caption">${item.title}</div>
    </article>
  `).join('');
}

function renderFaq() {
  const target = document.getElementById('faqList');
  if (!target) return;
  target.innerHTML = content.faq.map((item) => `
    <article class="faq-item">
      <h3>${item.q}</h3>
      <p>${item.a}</p>
    </article>
  `).join('');
}

function setupMobileNav() {
  const button = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!button || !nav) return;
  button.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));
}

// Sends the contact form to the Lead Hub server (Telegram), no e-mail program needed.
const FORM_ENDPOINT = 'https://leads.mastercleanpro.de/webhooks/website';

function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form || !window.fetch) return;
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const show = (text, ok) => {
    status.hidden = false;
    status.className = 'form-status ' + (ok ? 'ok' : 'error');
    status.textContent = text;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
      name: form.elements['Name'].value,
      phone: form.elements['Telefon / WhatsApp'].value,
      message: form.elements['Nachricht'].value,
      website: form.elements['website'].value
    };
    button.disabled = true;
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.status === 201 || response.status === 202) {
        form.reset();
        show('Vielen Dank! Ihre Anfrage ist bei uns angekommen. Wir melden uns schnell per Telefon oder WhatsApp.', true);
      } else if (response.status === 422) {
        show('Bitte prüfen Sie Ihren Namen und Ihre Telefonnummer.', false);
      } else {
        throw new Error('status ' + response.status);
      }
    } catch (error) {
      show(`Senden hat leider nicht geklappt. Bitte schreiben Sie uns per WhatsApp oder rufen Sie an: ${content.company.phoneDisplay}.`, false);
    } finally {
      button.disabled = false;
    }
  });
}

setTextByDataContent();
setupLinks();
setupHero();
renderTrust();
renderServices();
renderPrices();
renderProcess();
renderGallery();
renderFaq();
setupMobileNav();
setupContactForm();
