import './polyfills';
import Swiper from './modules/Swiper';
import MenuModal from './modules/MenuModal';
import '../assets/img/svg-sprite/icon-user.svg';
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
  forms.forEach(formsHandler(emitter));
  forms.forEach(ApiHandler(emitter));

  document.querySelectorAll('.js-scroll-it').forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    scrollIt(0, 700, 'easeInOutCubic');
  }));
});

window.onload = () => {
  // eslint-disable-next-line no-new
  new Swiper('.swiper-container');
};

// eslint-disable-next-line no-new
new MenuModal();
