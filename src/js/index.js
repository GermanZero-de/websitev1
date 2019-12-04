import Swiper from './modules/Swiper';
import '../assets/img/svg-sprite/icon-user.svg';

window.load = () => {
  // eslint-disable-next-line no-new
  new Swiper('.swiper-container');
};
