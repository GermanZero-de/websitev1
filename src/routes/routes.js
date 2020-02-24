/**
 * @typedef Meta
 * @type {object}
 * @property {string} title - <title> Meta title
 * @property {string} description - <description> tag content
 * /

/**
 * @typedef RouteItem
 * @type {object}
 * @property {string} title - Title to be shown
 * @property {string} href - link be added
 * @property {boolean} [target] - adds target="X"
 * @property {string} [classes] - list of classes for item
 * @property {Array<RouteItem>} [children] - link be added
 * @property {Meta} [meta] - link be added
 */

/**
 * Available routes
 * @type {RouteItem[]}
 */
const routes = [
  {
    title: 'Unser Vorgehen',
    href: '/fahrplan',
    meta: {
      title: 'GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Die Mission von GermanZero ist ein klimaneutrales Deutschland bis spätestens 2035. Dafür liefern wir einen Klimaplan, entwickeln ein 1,5-Grad-Gesetzespaket inklusive einer CO2-Steuerreform und treiben die politische Umsetzung der Gesetze.',
    },
  },
  {
    title: 'Der Klimaplan',
    href: '/klimaplan',
    meta: {
      title: 'Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
      description: 'GermanZero hat den Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten und gliedert sich in sieben Bereiche.',
    },
    children: [
      {
        title: 'Energie',
        href: '/klimaplan/energie',
        meta: {
          title: 'Energie-Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den Energie-Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
      {
        title: 'Industrie',
        href: '/klimaplan/industrie',
        meta: {
          title: 'Industrie-Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den Industrie-Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
      {
        title: 'Verkehr',
        href: '/klimaplan/verkehr',
        meta: {
          title: 'Verkehrs-Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den Verkehrs-Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
      {
        title: 'Gebäude & Wärme',
        href: '/klimaplan/gebaeude_waerme',
        meta: {
          title: 'Gebäude-Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den Gebäude-Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
      {
        title: 'Landwirtschaft & Landnutzung',
        href: '/klimaplan/landwirtschaft_nutzung',
        meta: {
          title: 'Landwirtschafts-Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den Landwirtschafts-Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
      {
        title: 'Individueller Klimaplan',
        href: '/klimaplan/konsum',
        meta: {
          title: 'Individueller Klimaplan - GermanZero - Für ein klimaneutrales Deutschland bis 2035 | GermanZero e.V.',
          description: 'GermanZero hat den individuellen Klimaplan für ein klimaneutrales Deutschland bis spätestens 2035 geschrieben: Er beruht auf einem intensiven Austausch mit führenden Politik- und Umweltfachleuten.',
        },
      },
      {
        title: 'Internationaler Ausgleich',
        href: '/klimaplan/internationaler_ausgleich',
        meta: {
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
      title: 'Presse - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Finden Sie im Pressebereich alle Infos und Downloads zur Mission und den Maßnahmen von GermanZero für ein klimaneutrales Deutschland bis spätestens 2035: Mit Klimaplan, 1,5-Grad-Gesetzespaket und politischer Umsetzung.',
    },
  },
  {
    title: 'Profilbild erstellen',
    href: '/profilbild-erstellen',
    meta: {
      title: 'Profilbild - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Erstellen Sie Ihr personalisiertes Profilbild und zeigen Sie Flagge für GermanZero und der Mission für ein klimaneutrales Deutschland bis spätestens 2035: Mit Klimaplan, 1,5-Grad-Gesetzespaket und Vorantreiben der politischen Umsetzung.',
    },
  },
  {
    title: 'Machen Sie mit',
    href: '/mach-mit',
    meta: {
      title: 'Mitmachen - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Machen Sie mit bei GermanZero und der Mission für ein klimaneutrales Deutschland bis spätestens 2035! Wir sind auf ehrenamtliche Unterstützung angewiesen: Bringen Sie Ihr Fachwissen ein oder helfen Sie uns bei unseren Maßnahmen.',
    },
  },
  {
    title: 'Datenschutz',
    href: '/datenschutz',
    meta: {
      title: 'Datenschutz - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Wir freuen uns sehr über Ihr Interesse an GermanZero und der Mission für ein klimaneutrales Deutschland bis spätestens 2035. Datenschutz hat einen besonders hohen Stellenwert GermanZero: Hier alle Informationen.',
    },
  },
  {
    title: 'Impressum',
    href: '/impressum',
    meta: {
      title: 'Impressum - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Die Mission von GermanZero ist ein klimaneutrales Deutschland bis spätestens 2035. Dafür liefern wir einen Klimaplan, entwickeln ein 1,5-Grad-Gesetzespaket inklusive einer CO2-Steuerreform und treiben die politische Umsetzung der Gesetze.',
    },
  },
  {
    title: 'Partner',
    href: '/partner',
    meta: {
      title: 'Partner - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Die Partner von GermanZero für ein klimaneutrales Deutschland bis spätestens 2035. Unterstützer für einen Klimaplan, ein 1,5-Grad-Gesetzespaket und das Vorantreiben der politischen Umsetzung der Gesetze.',
    },
  },
  {
    title: 'Wer wir sind',
    href: '/werwirsind',
    meta: {
      title: 'Wer wir sind - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Lernen Sie uns kennen: Die Menschen hinter der Mission von GermanZero für ein klimaneutrales Deutschland bis spätestens 2035. Wir liefern einen Klimaplan, entwickeln ein 1,5-Grad-Gesetzespaket und treiben die politische Umsetzung.',
    },
  },
  {
    title: 'GermanZero in den Medien',
    href: '/medienspiegel',
    meta: {
      title: 'Medienspiegel - GermanZero - Deutschland bis 2035 klimaneutral machen | GermanZero e.V.',
      description: 'Der Medienspiegel rund um die Mission von GermanZero für ein klimaneutrales Deutschland bis spätestens 2035. Artikel, Informationen und Hintergrundberichte zu Klimaplan, 1,5-Grad-Gesetzespaket und politischer Umsetzung der Gesetze.',
    },
  },
  {
    title: 'Transparenz',
    href: '/transparenz',
    meta: {
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
