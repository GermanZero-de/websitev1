/**
 * @typedef Meta
 * @type {object}
 * @property {string} title - <title> Meta title
 * @property {string} description - <meta name="description"> tag content
 * @property {string} keywords - <meta name="keywords"> tag content
 * @property {string} image - image for meta (social networks, etc)
 * @property {string|number} imageWidth - width of image for meta (social networks, etc)
 * @property {string|number} imageHeight - height of image for meta (social networks, etc)
 * /

 /**
 * @typedef RouteItem
 * @type {object}
 * @property {string} title - Title to be shown
 * @property {string} href - link be added
 * @property {boolean} [target] - adds target="X"
 * @property {boolean} [visible=true] Does it needed to be shown in menu
 * @property {string} [classes] - list of classes for item
 * @property {Array<RouteItem>} [children] - Nested routes
 * @property {Meta} [meta] - Seo meta information
 */

/**
 * Available routes
 * @type {RouteItem[]}
 */
const routes = [
  {
    title: 'Home',
    href: '/',
    visible: false,
    meta: {
      title: 'GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Die Mission von GermanZero ist ein klimaneutrales Deutschland bis spätestens 2035. Dafür liefern wir einen Klimaplan, entwickeln ein 1,5-Grad-Gesetzespaket inklusive einer CO2-Steuerreform und treiben die politische Umsetzung der Gesetze.',
    },
  },
  {
    title: 'Unser Vorgehen',
    href: '/fahrplan',
    meta: {
      image: 'https://germanzero.de/assets/img/machmit-first-screen.jpg',
      imageWidth: 1440,
      imageHeight: 639,
      title: 'Fahrplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
      description: 'GermanZero liefert jetzt den Fahrplan für ein klimaneutrales Deutschland bis spätestens 2035: Der Fahrplan enthält Klimaplan, 1,5-Grad-Gesetzespaket inklusive einer CO2-Steuerreform und das Vorantreiben der politischen Umsetzung.',
    },
  },
  {
    title: 'Der Klimaplan',
    href: '/klimaplan',
    meta: {
      image: 'https://germanzero.de/assets/img/plan.jpg',
      imageWidth: 1440,
      imageHeight: 639,
      title: 'Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
      description: 'GermanZero hat den Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten und gliedert sich in sieben Bereiche.',
    },
    children: [
      {
        title: 'Energie',
        href: '/klimaplan/energie',
        meta: {
          image: 'https://germanzero.de/assets/img/articles-temp/Energie.jpg',
          imageWidth: 1000,
          imageHeight: 667,
          title: 'Energie-Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den Energie-Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
      {
        title: 'Industrie',
        href: '/klimaplan/industrie',
        meta: {
          image: 'https://germanzero.de/assets/img/articles-temp/Industrie.jpg',
          imageWidth: 1000,
          imageHeight: 667,
          title: 'Industrie-Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den Industrie-Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
      {
        title: 'Verkehr',
        href: '/klimaplan/verkehr',
        meta: {
          image: 'https://germanzero.de/assets/img/articles-temp/Verkehr.jpg',
          imageWidth: 1000,
          imageHeight: 667,
          title: 'Verkehrs-Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den Verkehrs-Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
      {
        title: 'Gebäude & Wärme',
        href: '/klimaplan/gebaeude_waerme',
        meta: {
          image: 'https://germanzero.de/assets/img/articles-temp/Gebaeude_und_Waerme.jpg',
          imageWidth: 1000,
          imageHeight: 667,
          title: 'Gebäude-Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den Gebäude-Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
      {
        title: 'Landwirtschaft & Landnutzung',
        href: '/klimaplan/landwirtschaft_nutzung',
        meta: {
          image: 'https://germanzero.de/assets/img/articles-temp/Landwirtschaft_Landnutzung.jpg',
          imageWidth: 1000,
          imageHeight: 667,
          title: 'Landwirtschafts-Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den Landwirtschafts-Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
      {
        title: 'Individueller Klimaplan',
        href: '/klimaplan/konsum',
        meta: {
          image: 'https://germanzero.de/assets/img/articles-temp/Individueller_Klimaplan.jpg',
          imageWidth: 1000,
          imageHeight: 667,
          title: 'Individueller Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den individuellen Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
      {
        title: 'Internationaler Ausgleich',
        href: '/klimaplan/internationaler_ausgleich',
        meta: {
          image: 'https://germanzero.de/assets/img/articles-temp/Internationaler_Ausgleich.jpg',
          imageWidth: 1000,
          imageHeight: 667,
          title: 'Internationaler Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den Klimaplan mit internationalem Ausgleich für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
    ],
  },
  {
    title: 'Presse',
    href: '/presse',
    meta: {
      image: 'https://germanzero.de/assets/img/presse-bg.jpg',
      imageWidth: 1263,
      imageHeight: 560,
      title: 'Presse - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Finden Sie im Pressebereich alle Infos und Downloads zur Mission und den Maßnahmen von GermanZero für ein klimaneutrales Deutschland bis spätestens 2035: Mit Klimaplan, 1,5-Grad-Gesetzespaket und politischer Umsetzung.',
    },
  },
  {
    title: 'Profilbild erstellen',
    href: '/profilbild-erstellen',
    meta: {
      image: 'https://germanzero.de/assets/img/machmit-first-screen.jpg',
      imageWidth: 1440,
      imageHeight: 639,
      title: 'Profilbild - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Erstellen Sie Ihr personalisiertes Profilbild und zeigen Sie Flagge für GermanZero und der Mission für ein klimaneutrales Deutschland bis spätestens 2035: Mit Klimaplan, 1,5-Grad-Gesetzespaket und Vorantreiben der politischen Umsetzung.',
    },
  },
  {
    title: 'Machen Sie mit',
    href: '/mach-mit',
    meta: {
      image: 'https://germanzero.de/assets/img/machmit-first-screen.jpg',
      imageWidth: 1440,
      imageHeight: 639,
      title: 'Mitmachen - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Machen Sie mit bei GermanZero und der Mission für ein klimaneutrales Deutschland bis spätestens 2035! Wir sind auf ehrenamtliche Unterstützung angewiesen: Bringen Sie Ihr Fachwissen ein oder helfen Sie uns bei unseren Maßnahmen.',
    },
  },
  {
    title: 'Datenschutz',
    href: '/datenschutz',
    meta: {
      image: 'https://germanzero.de/assets/img/machmit-first-screen.jpg',
      imageWidth: 1440,
      imageHeight: 639,
      title: 'Datenschutz - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Wir freuen uns sehr über Ihr Interesse an GermanZero und der Mission für ein klimaneutrales Deutschland bis spätestens 2035. Datenschutz hat einen besonders hohen Stellenwert GermanZero: Hier alle Informationen.',
    },
  },
  {
    title: 'Impressum',
    href: '/impressum',
    meta: {
      image: 'https://germanzero.de/assets/img/machmit-first-screen.jpg',
      imageWidth: 1440,
      imageHeight: 639,
      title: 'Impressum - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Die Mission von GermanZero ist ein klimaneutrales Deutschland bis spätestens 2035. Dafür liefern wir einen Klimaplan, entwickeln ein 1,5-Grad-Gesetzespaket inklusive einer CO2-Steuerreform und treiben die politische Umsetzung der Gesetze.',
    },
  },
  {
    title: 'Partner',
    href: '/partner',
    meta: {
      image: 'https://germanzero.de/assets/img/machmit-first-screen.jpg',
      imageWidth: 1440,
      imageHeight: 639,
      title: 'Partner - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Die Partner von GermanZero für ein klimaneutrales Deutschland bis spätestens 2035. Unterstützer für einen Klimaplan, ein 1,5-Grad-Gesetzespaket und das Vorantreiben der politischen Umsetzung der Gesetze.',
    },
  },
  {
    title: 'Wer wir sind',
    href: '/werwirsind',
    meta: {
      image: 'https://germanzero.de/assets/img/machmit-first-screen.jpg',
      imageWidth: 1440,
      imageHeight: 639,
      title: 'Wer wir sind - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Lernen Sie uns kennen: Die Menschen hinter der Mission von GermanZero für ein klimaneutrales Deutschland bis spätestens 2035. Wir liefern einen Klimaplan, entwickeln ein 1,5-Grad-Gesetzespaket und treiben die politische Umsetzung.',
    },
  },
  {
    title: 'GermanZero in den Medien',
    href: '/medienspiegel',
    meta: {
      image: 'https://germanzero.de/assets/img/presse-bg.jpg',
      imageWidth: 1263,
      imageHeight: 560,
      title: 'Medienspiegel - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Der Medienspiegel rund um die Mission von GermanZero für ein klimaneutrales Deutschland bis spätestens 2035. Artikel, Informationen und Hintergrundberichte zu Klimaplan, 1,5-Grad-Gesetzespaket und politischer Umsetzung der Gesetze.',
    },
  },
  {
    title: 'Transparenz',
    href: '/transparenz',
    meta: {
      image: 'https://germanzero.de/assets/img/machmit-first-screen.jpg',
      imageWidth: 1440,
      imageHeight: 639,
      title: 'Transparenz - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Alle Informationen zu GermanZero für die Initiative Transparente Zivilgesellschaft: Name, Sitz, Anschrift, Gründungsjahr, Satzung, Gesellschaftervertrag, Entscheidungsträger, Personalstruktur, Mittelherkunft, Mittelverwendung, etc.',
    },
  },
  {
    title: 'Jobs',
    href: 'http://germanzero.join.com',
    meta: {
      title: '',
      description: '',
    },
    target: '_blank',
  },
  {
    title: 'English Summary',
    href: '/english_summary',
    meta: {
      title: 'English - GermanZero - Climate-neutral Germany by 2035 | GermanZero e.V.',
      description: 'Our mission is a climate-neutral Germany by 2035 at the latest. We will deliver a 1.5° legislative package including a CO2 tax reform, a comprehensive package of measures and climate protection to be anchored in the Basic Law.',
    },
    target: '_blank',
  },
];

module.exports = routes;
