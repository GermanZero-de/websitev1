export default class FixedHeader {
  constructor() {
    /* fixed header */
    const navbar = document.getElementById('nav-fixed');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        navbar.style.top = '0';
      } else {
        navbar.style.top = '-50px';
      }
    });
  }
}
