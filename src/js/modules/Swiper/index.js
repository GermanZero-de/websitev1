import SwiperPlugin from 'swiper';

const DEFAULT_OPTIONS = {
  loop: false,
  centeredSlides: false,
  autoPlay: 10000,
  pagination: false,
  spaceBetween: 30,
  allowTouchMove: false,
  autoHeight: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
  breakpoints: {
    768: {
      centeredSlides: false,
      allowTouchMove: true,
      slidesPerView: 2,
    },
    1024: {
      centeredSlides: false,
      allowTouchMove: true,
      slidesPerView: 3,
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
