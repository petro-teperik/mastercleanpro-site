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
    whatsappText: "Hallo Master Clean Pro, ich möchte eine Polsterreinigung anfragen. Ich sende Fotos und meinen Standort. Bitte nennen Sie mir eine Preiseinschätzung und mögliche Termine."
  },

  hero: {
    title: "Polsterreinigung in Wiesbaden – Preis per WhatsApp erhalten",
    subtitle: "Sofa, Sessel, Stühle und Autositze professionell vor Ort reinigen lassen. Senden Sie Fotos per WhatsApp – wir geben Ihnen schnell eine ehrliche Preiseinschätzung.",
    note: "Vor Ort in Wiesbaden, Mainz und Frankfurt. Termine oft kurzfristig möglich.",
    primaryButton: "Fotos senden & Preis erhalten",
    secondaryButton: "Jetzt anrufen",
    image: "assets/images/hero-approved.png"
  },

  trust: [
    "Preis per WhatsApp nach Fotos",
    "Vor-Ort-Service in Wiesbaden, Mainz & Frankfurt",
    "Sofas, Sessel, Stühle, Autositze",
    "Schonend für Familien und Haustiere"
  ],

  services: [
    {
      id: "polster",
      title: "Polsterreinigung",
      subtitle: "Sofas, Sessel, Stühle und Autositze",
      text: "Wir reinigen Polstermöbel gründlich und materialschonend. Flecken, Alltagsschmutz und Gerüche werden professionell behandelt.",
      image: "images/services/polsterreinigung.jpg"
    },
    {
      id: "leder",
      title: "Ledermöbel-Reinigung / Pflege",
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
    { title: "Stuhl", description: "Polsterstuhl", price: "ab 35 €" },
    { title: "Autositzreinigung", description: "Ein Autositz", price: "ab 35 €" },
    { title: "Kindersitzreinigung", description: "Kindersitz / Babyschale", price: "ab 35 €" },
    { title: "Mindestauftrag pro Termin", description: "Mindestwert pro Termin", price: "ab 70 €" },
    { title: "Anfahrt Frankfurt am Main", description: "Je nach Entfernung", price: "ab 20 €" },
    { title: "Ledermöbel-Reinigung / Pflege", description: "Nach Zustand und Aufwand", price: "Preis nach Begutachtung" }
  ],

  process: [
    { step: "01", title: "Foto schicken", text: "Senden Sie uns Fotos per WhatsApp oder E-Mail." },
    { step: "02", title: "Preis erhalten", text: "Wir nennen Ihnen eine transparente Preiseinschätzung." },
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
      a: "Ja. Wir verwenden professionelle, hypoallergene und zertifizierte Reinigungsmittel aus Deutschland, die für Haushalte mit Kindern und Haustieren geeignet sind. Die Polster werden gründlich mit einem professionellen Extraktionsgerät ausgespült, sodass Schmutz und Reinigungsrückstände zuverlässig entfernt werden. Nach der vollständigen Trocknung kann das Möbelstück wieder sicher genutzt werden."
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
