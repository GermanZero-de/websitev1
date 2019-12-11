import './polyfills';
// import Swiper from './modules/Swiper';
import MenuModal from './modules/MenuModal';
import scrollIt from './modules/ScrollIt/ScrollIt';
import { formsHandler } from './modules/Validation';
import { ApiHandler } from './modules/Api';
import Notifications from './modules/Notifications';
import EventEmitter from './modules/EventEmitter';
// import Choices from "choices.js";


document.addEventListener('DOMContentLoaded', () => {
  const emitter = new EventEmitter();
  // eslint-disable-next-line no-unused-vars
  const notifications = new Notifications({ emitter });
  const forms = document.querySelectorAll('.js-form');
  [...forms].forEach(formsHandler(emitter));
  [...forms].forEach(ApiHandler(emitter));

  document.querySelectorAll('.js-scroll-it').forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    scrollIt(0, 700, 'easeInOutCubic');
  }));

  const selects = document.querySelectorAll('.js-select-custom');

  if (selects.length) {
    Promise
      .all([
        import('choices.js'),
        import('choices.js/public/assets/styles/choices.min.css'),
      ])
      .then(([Module]) => {
        // eslint-disable-next-line no-new,new-cap
        [...selects].forEach((select) => new Module.default(select));
      })
      .catch((err) => {
        console.error(err);
      });
    // const choices = new Choices(selects);
  }
});

window.onload = () => {
  // eslint-disable-next-line no-new
  // new Swiper('.swiper-container');
};

// eslint-disable-next-line no-new
new MenuModal();
