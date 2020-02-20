import Swiper from './Swiper';

export default class Carousels {
  static async build() {
    if (document.querySelector('.swiper-container')) {
      try {
        const [Module] = await Promise.all([
          import(
            // eslint-disable-next-line comma-dangle
            'swiper'
            /* webpackPreload: true */
            /* webpackChunkName: "swiper-js" */
          ),
          import(
            // eslint-disable-next-line comma-dangle
            'swiper/css/swiper.min.css'
            /* webpackPreload: true */
            /* webpackChunkName: "swiper-css" */
          ),
        ]);
        const SwiperPlugin = Module.default;
        // eslint-disable-next-line no-unused-vars
        const mySwiper = new Swiper('.swiper-container', {}, SwiperPlugin);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
