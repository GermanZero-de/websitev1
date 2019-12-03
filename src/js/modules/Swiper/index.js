import SwiperPlugin from 'swiper';

const DEFAULT_OPTIONS = {
  loop: false,
  centeredSlides: false,
  autoPlay: 10000,
  navigation: false,
  pagination: false,

  allowTouchMove: false,
  autoHeight: true,
  slidesPerView: 1,

  breakpoints: {
    640: {
      centeredSlides: false,
      allowTouchMove: true,
      slidesPerView: 3,
    },
    1024: {
      centeredSlides: false,
      allowTouchMove: true,
      slidesPerView: 5,
    },
  },
};

export default class Swiper {
  constructor(el, customOptions = {}) {
    this.el = el;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...customOptions,
    };

    this.instance = new SwiperPlugin(this.el, this.options);
  }
}
