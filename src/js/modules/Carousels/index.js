import Swiper from './Swiper';

export default class Carousels {
  static async build() {
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
  }
}
