import './polyfills';
import LazyLoad from 'vanilla-lazyload';
import Swiper from './modules/Swiper';
import MenuModal from './modules/MenuModal';
import VideoModal from './modules/VideoModal';
import scrollIt from './modules/ScrollIt/ScrollIt';
import {formsHandler} from './modules/Validation';
import {
  API_PATH, ApiHandler, checkStatus, DEFAULT_CONTENT_TYPE, parseJSON,
} from './modules/Api';
import Notifications from './modules/Notifications';
import EventEmitter from './modules/EventEmitter';
import GetQueryParams from './GetQueryParams';
import {NOTIFICATION_ERROR} from './modules/constants';
import LeaveModal from './modules/LeaveModal';
import TruncateText from './modules/Truncate/truncate';
import detectIE from './modules/detectIE';

document.addEventListener('DOMContentLoaded', async () => {
  const ieVersion = detectIE();
  if (ieVersion && ieVersion < 12) {
    document.body.classList.add('isIE');
    document.body.classList.add(`ie-${ieVersion}`);
  }

  const emitter = new EventEmitter();
  // eslint-disable-next-line no-unused-vars
  const notifications = new Notifications({emitter});
  const forms = document.querySelectorAll('.js-form');
  window.emitter = emitter;
  forms.forEach(ApiHandler(emitter));
  forms.forEach(formsHandler(emitter));

  document.querySelectorAll('.js-scroll-it').forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    scrollIt(0, 700, 'easeInOutCubic');
  }));

  const selects = document.querySelectorAll('.js-select-custom');

  if (selects.length) {
    try {
      const [Module] = await Promise.all([import('choices.js'), import('choices.js/public/assets/styles/choices.min.css')]);
      const Choices = Module.default;
      selects.forEach((select) => new Choices(select,
        {
          removeItemButton: true,
          shouldSort: false,
        }));
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Mach-mit form logic
   */
  if (document.querySelector('.js-custom-machmit-form')) {
    const showCustomRadios = document.querySelectorAll('.js-show-custom-field');
    showCustomRadios.forEach((radio) => radio.addEventListener('change', (e) => {
      document.querySelector('.js-custom-sphere').classList.toggle('hidden', e.target.value !== 'custom');
    }));

    document.querySelectorAll('.js-show-sphere').forEach((el) => el.addEventListener('change', () => {
      const show = document.querySelectorAll('.js-show-sphere:checked').length;
      document.querySelectorAll('.js-sphere-radios').forEach((radio) => radio.classList.toggle('hidden', !show));
    }));
  }

  /**
   * Toggle all functionality
   * @type {NodeListOf<Element>}
   */
  const showMoreElements = document.querySelectorAll('.js-toggle-list');
  if (showMoreElements.length) {
    showMoreElements.forEach((listElement) => {
      let show = false;
      const btn = listElement.querySelector('.js-toggle-list-button');
      if (btn) {
        btn.addEventListener('click', (e) => {
          const buttonElement = e.currentTarget;
          show = !show;
          listElement.querySelectorAll('.js-toggle-list-item').forEach((listItemElement) => {
            listItemElement.classList.toggle('hidden', !show);
          });
          const wrapperEl = listElement.querySelector('.js-toggle-list-wrapper');
          if (wrapperEl) {
            wrapperEl.classList.toggle('isShown', show);
          }
          buttonElement.querySelector('.js-toggle-list-more-text').classList.toggle('hidden', show);
          buttonElement.querySelector('.js-toggle-list-less-text').classList.toggle('hidden', !show);
        });
      }
    });
  }

  if (document.querySelectorAll('.js-read-more').length) {
    try {
      TruncateText(document.querySelectorAll('.js-read-more'));
    } catch (e) {
      console.error(e);
    }
  }

  if (document.querySelector('.swiper-container')) {
    try {
      const [Module] = await Promise.all([import('swiper'), import('swiper/css/swiper.min.css')]);
      const SwiperPlugin = Module.default;
      // eslint-disable-next-line no-unused-vars
      const mySwiper = new Swiper('.swiper-container', {}, SwiperPlugin);
    } catch (e) {
      console.error(e);
    }
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

  /* fixed header */
  const navbar = document.getElementById('nav-fixed');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
      navbar.style.top = '0';
    } else {
      navbar.style.top = '-50px';
    }
  });

  // eslint-disable-next-line no-new
  document.querySelectorAll('.js-video-element').forEach((videoModal) => {
    // eslint-disable-next-line no-new
    new VideoModal(videoModal);
  });

  // eslint-disable-next-line no-new
  new MenuModal();

  // eslint-disable-next-line no-unused-vars
  const lazyLoad = new LazyLoad({
    elements_selector: '.js-lazy-image',
  });

  // eslint-disable-next-line no-unused-vars
  const modal = new LeaveModal({
    template: '.js-leave-modal-template',
  });

  document.querySelectorAll('.js-text-crop-wrapper').forEach((el) => {
    let isVisible = false;
    el.addEventListener('click', () => {
      isVisible = !isVisible;
      el.querySelector('.js-text-crop').classList.toggle('isVisible', isVisible);
    });
  });
});
