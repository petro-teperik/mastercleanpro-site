// content.js — файл контента сайта.
// Здесь Петр может менять цены, тексты, телефон, e-mail, услуги и фото без переписывания HTML.
// Wichtig: Немецкие тексты видит клиент на сайте.

window.siteContent = {
  company: {
    name: "Master Clean Pro",
    owner: "Petro Teperik",
    street: "Sonnenberger Straße 32",
    postalCity: "65193 Wiesbaden",
    country: "Deutschland",
    phoneDisplay: "+49 178 9233032",
    phoneHref: "+491789233032",
    email: "mastercleanpro.info@gmail.com",
    serviceArea: "Wiesbaden, Mainz und Frankfurt am Main",
    whatsappText: "Hallo Master Clean Pro, ich möchte eine Reinigung anfragen. Ich sende Ihnen Fotos und bitte um eine Preiseinschätzung."
  },

  hero: {
    badge: "MASTER CLEAN PRO",
    title: "Polster-, Leder- & Autositzreinigung",
    subtitle: "Professionelle Reinigung und Pflege von Sofas, Sesseln, Ledermöbeln und Autositzen – bei Ihnen vor Ort in Wiesbaden, Mainz & Frankfurt.",
    note: "Schonend. Gründlich. Sicher für Familie und Haustiere.",
    primaryButton: "Jetzt anfragen",
    secondaryButton: "Sofort anrufen",
    whatsappButton: "WhatsApp schreiben",
    image: "assets/images/hero-polsterreinigung-wiesbaden-photo.png",
    trust: [
      "Mobile Reinigung vor Ort",
      "Für Stoff, Leder & Autositze",
      "Wiesbaden · Mainz · Frankfurt",
      "Sicher für Kinder & Haustiere"
    ]
  },

  trust: [
    "Professioneller Extraktor Santoemma Sabrina SW15",
    "Transparente Preise ab 35 €",
    "Fotos senden & Einschätzung erhalten",
    "Schonende Reinigung für Polster und Leder"
  ],

  services: [
    {
      id: "polster",
      title: "Polsterreinigung",
      subtitle: "Sofas, Sessel, Stühle und Matratzen",
      text: "Wir reinigen Polstermöbel gründlich und materialschonend. Flecken, Alltagsschmutz und Gerüche werden professionell behandelt.",
      image: "images/services/polsterreinigung.jpg"
    },
    {
      id: "leder",
      title: "Ledermöbel-Restaurierung",
      subtitle: "Pflege, Auffrischung und lokale Reparatur",
      text: "Wir behandeln Abnutzung, Kratzer, Farbverlust und kleinere Beschädigungen. Das Ergebnis hängt vom Zustand, der Lederart und der Tiefe der Beschädigung ab.",
      image: "images/services/lederrestaurierung.jpg"
    },
    {
      id: "auto",
      title: "Autoinnenreinigung",
      subtitle: "Autositze, Kindersitze und Innenraum",
      text: "Reinigung von Autositzen, Kindersitzen und Polstern im Fahrzeug. Ideal bei Flecken, Gerüchen und sichtbarer Verschmutzung.",
      image: "images/services/autoinnenreinigung.jpg"
    }
  ],

  prices: [
    { title: "3-Sitzer Sofa", description: "Dreiersofa / Couch", price: "ab 99 €" },
    { title: "2-Sitzer Sofa", description: "Zweisitzer Sofa", price: "ab 70 €" },
    { title: "Sessel", description: "Polstersessel", price: "ab 35 €" },
    { title: "Stuhl", description: "Polsterstuhl", price: "ab 20–35 €" },
    { title: "Autositzreinigung", description: "Ein Autositz", price: "ab 35 €" },
    { title: "Kindersitzreinigung", description: "Kindersitz / Babyschale", price: "ab 35 €" },
    { title: "Mindestauftrag", description: "Mindestwert pro Termin", price: "ab 70 €" },
    { title: "Anfahrt Frankfurt am Main", description: "Je nach Entfernung", price: "ab 20 €" },
    { title: "Ledermöbel-Restaurierung", description: "Nach Zustand und Aufwand", price: "Preis nach Begutachtung" }
  ],

  process: [
    { step: "01", title: "Fotos senden", text: "Senden Sie uns Fotos per WhatsApp oder E-Mail." },
    { step: "02", title: "Einschätzung erhalten", text: "Wir nennen Ihnen eine transparente Preiseinschätzung." },
    { step: "03", title: "Termin vereinbaren", text: "Wir kommen zu Ihnen nach Hause oder zum Fahrzeug." },
    { step: "04", title: "Reinigung durchführen", text: "Wir reinigen gründlich, materialschonend und professionell." }
  ],

  gallery: [
    { title: "Stuhlreinigung", image: "images/gallery/stuhl-vorher-nachher.jpg" },
    { title: "Sofareinigung", image: "images/gallery/sofa-reinigung.jpg" },
    { title: "Santoemma Sabrina SW15", image: "images/gallery/santoemma-sabrina-sw15.jpg" },
    { title: "Lederpflege", image: "images/gallery/lederpflege.jpg" },
    { title: "Autositzreinigung", image: "images/gallery/autositzreinigung.jpg" },
    { title: "Polsterreinigung", image: "images/gallery/polsterreinigung.jpg" }
  ],

  faq: [
    {
      q: "Wie lange trocknet ein Sofa nach der Reinigung?",
      a: "In der Regel mehrere Stunden. Die genaue Trocknungszeit hängt vom Material, der Raumtemperatur, der Belüftung und dem Verschmutzungsgrad ab."
    },
    {
      q: "Kann jede Lederbeschädigung repariert werden?",
      a: "Nein. Das Ergebnis hängt vom Zustand, der Lederart und der Tiefe der Beschädigung ab. Wir geben vorab eine ehrliche Einschätzung."
    },
    {
      q: "Ist die Reinigung für Kinder und Haustiere geeignet?",
      a: "Wir arbeiten materialschonend und achten auf eine gründliche Entfernung von Rückständen. Nach der Reinigung sollte das Möbelstück vollständig trocknen."
    },
    {
      q: "Muss ich Möbel vorbereiten?",
      a: "Bitte entfernen Sie persönliche Gegenstände und sorgen Sie für freien Zugang. Alles Weitere besprechen wir vor dem Termin."
    },
    {
      q: "Kann ich Fotos per WhatsApp senden?",
      a: "Ja. Senden Sie uns Fotos per WhatsApp, damit wir den Zustand besser einschätzen und einen Preis nennen können."
    }
  ]
};
