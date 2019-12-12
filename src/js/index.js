import './polyfills';
import Swiper from './modules/Swiper';
import MenuModal from './modules/MenuModal';
import scrollIt from './modules/ScrollIt/ScrollIt';
import { formsHandler } from './modules/Validation';
import { ApiHandler } from './modules/Api';
import Notifications from './modules/Notifications';
import EventEmitter from './modules/EventEmitter';

document.addEventListener('DOMContentLoaded', () => {
  const emitter = new EventEmitter();
  // eslint-disable-next-line no-unused-vars
  const notifications = new Notifications({ emitter });
  const forms = document.querySelectorAll('.js-form');
  [...forms].forEach(formsHandler(emitter));
  [...forms].forEach(ApiHandler(emitter));

  [...document.querySelectorAll('.js-scroll-it')].forEach((el) => el.addEventListener('click', (e) => {
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
        [...selects].forEach((select) => new Module.default(select, { removeItemButton: true }));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /**
   * Mach-mit form logic
   */
  if (document.querySelector('.js-custom-machmit-form')) {
    const showCustomRadios = document.querySelectorAll('.js-show-custom-field');
    [...showCustomRadios].forEach((radio) => radio.addEventListener('change', (e) => {
      document.querySelector('.js-custom-sphere').classList.toggle('hidden', e.target.value !== 'custom');
    }));

    document.querySelector('.js-show-sphere').addEventListener('change', (e) => {
      const selectedOptions = [];
      for (let i = 0, len = e.target.options.length; i < len; i++) {
        const opt = e.target.options[i];

        if (opt.selected) {
          selectedOptions.push(opt.value);
        }
      }

      // eslint-disable-next-line no-bitwise
      document.querySelector('.js-sphere-radios').classList.toggle('hidden', !~selectedOptions.indexOf('tatkräftig'));
    });
  }

  /**
   * Toggle all functionality
   * @type {NodeListOf<Element>}
   */
  const showMoreElements = document.querySelectorAll('.js-toggle-list');
  if (showMoreElements.length) {
    [...showMoreElements].forEach((listElement) => {
      let show = false;
      listElement.querySelector('.js-toggle-list-button').addEventListener('click', (e) => {
        const buttonElement = e.currentTarget;
        show = !show;
        [...listElement.querySelectorAll('.js-toggle-list-item')].forEach((listItemElement) => {
          listItemElement.classList.toggle('hidden', !show);
        });
        const wrapperEl = listElement.querySelector('.js-toggle-list-wrapper');
        if (wrapperEl) {
          wrapperEl.classList.toggle('isShown', show);
        }
        buttonElement.querySelector('.js-toggle-list-more-text').classList.toggle('hidden', show);
        buttonElement.querySelector('.js-toggle-list-less-text').classList.toggle('hidden', !show);
      });
    });
  }

  if (document.querySelector('.swiper-container')) {
    const mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      speed: 400,
      spaceBetween: 100,
    });
  }
});

window.onload = () => {
  // eslint-disable-next-line no-new
  // new Swiper('.swiper-container');
};

// eslint-disable-next-line no-new
new MenuModal();
