import './polyfills';
import Swiper from './modules/Swiper';
import MenuModal from './modules/MenuModal';
import VideoModal from './modules/VideoModal';
import scrollIt from './modules/ScrollIt/ScrollIt';
import { formsHandler } from './modules/Validation';
import {
  API_PATH, ApiHandler, checkStatus, DEFAULT_CONTENT_TYPE, parseJSON,
} from './modules/Api';
import Notifications from './modules/Notifications';
import EventEmitter from './modules/EventEmitter';
import GetQueryParams from './GetQueryParams';
import { NOTIFICATION_ERROR } from './modules/constants';
import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.min.css';

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
    // eslint-disable-next-line no-new,new-cap,dot-notation
    [...selects].forEach((select) => new Choices(select, { removeItemButton: true }));
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
      [...document.querySelectorAll('.js-sphere-radios')].forEach((radio) => radio.classList.toggle('hidden', !~selectedOptions.indexOf('tatkräftig')));
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
      // slidesPerView: 1,
      // speed: 400,
      // spaceBetween: 100,Bleiben Sie informiert!
    });
  }

  /**
   *  email confirmation
   *  */
  const params = GetQueryParams(window.location.href);
  if (params.contactId && params.token) {
    fetch(`${API_PATH}/contacts/${params.contactId}/confirmations/${params.token}`, {
      method: 'GET',
      headers: {
        'Content-Type': DEFAULT_CONTENT_TYPE,
      },
      body: JSON.stringify({
        contactId: params.contactId,
        token: params.token,
      }),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(() => {
        window.location = '/membership/confirm';
      })
      .catch((e) => {
        emitter.emit(NOTIFICATION_ERROR, e);
        console.error(e);
        window.location = '/membership/reject';
      });
  }

  const navbar = document.getElementById('nav-fixed');
  window.onscroll = function () {
    if (window.pageYOffset > 100) {
      navbar.style.top = '0';
    } else {
      navbar.style.top = '-50px';
    }
  };
});

window.onload = () => {
  // eslint-disable-next-line no-new
  // new Swiper('.swiper-container');
};

// eslint-disable-next-line no-new
new MenuModal();
new VideoModal();
