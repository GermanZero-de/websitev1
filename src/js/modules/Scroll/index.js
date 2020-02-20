import scrollIt from './ScrollIt';

export default class Scroll {
  constructor() {
    document.querySelectorAll('.js-scroll-it').forEach((el) => el.addEventListener('click', (e) => {
      e.preventDefault();
      scrollIt(0, 700, 'easeInOutCubic');
    }));
  }
}
