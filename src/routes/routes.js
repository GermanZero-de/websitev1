/**
 * @typedef RouteItem
 * @type {object}
 * @property {string} title - Title to be shown
 * @property {string} href - link be added
 * @property {boolean} [target] - adds target="X"
 * @property {string} [classes] - list of classes for item
 * @property {Array<RouteItem>} [children] - link be added
 */

/**
 * Available routes
 * @type {RouteItem[]}
 */
const routes = [
  {
    title: 'Unser Vorgehen',
    href: '/fahrplan',
  },
  {
    title: 'Der Klimaplan',
    href: '/klimaplan',
    children: [
      {
        title: 'Energie',
        href: '/klimaplan/energie',
      },
      {
        title: 'Industrie',
        href: '/klimaplan/industrie',
      },
      {
        title: 'Verkehr',
        href: '/klimaplan/verkehr',
      },
      {
        title: 'Gebäude & Wärme',
        href: '/klimaplan/gebaeude_waerme',
      },
      {
        title: 'Landwirtschaft & Landnutzung',
        href: '/klimaplan/landwirtschaft_nutzung',
      },
      {
        title: 'Konsum',
        href: '/klimaplan/konsum',
      },
    ],
  },
  {
    title: 'Presse',
    href: '/presse',
  },
  {
    title: 'Profilbild erstellen',
    href: '/profilbild-erstellen',
  },
  {
    title: 'Machen Sie mit',
    href: '/mach-mit',
  },
  {
    title: 'Datenschutz',
    href: '/datenschutz',
  },
  {
    title: 'Impressum',
    href: '/impressum',
  },
  {
    title: 'Partner',
    href: '/partner',
  },
  {
    title: 'Wer wir sind',
    href: '/werwirsind',
  },
  {
    title: 'GermanZero in den Medien',
    href: '/medienspiegel',
  },
  {
    title: 'Transparenz',
    href: '/transparenz',
  },
  {
    title: 'Jobs',
    href: 'http://germanzero.join.com',
    target: '_blank',
  },
  {
    title: 'English Summary',
    href: '/english_summary',
    target: '_blank',
  },
];

export default routes;
