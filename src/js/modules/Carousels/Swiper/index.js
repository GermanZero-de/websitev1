import debounce from 'lodash.debounce';

const DEFAULT_OPTIONS = {
  loop: false,
  centeredSlides: false,
  autoPlay: 10000,
  pagination: false,
  spaceBetween: 30,
  allowTouchMove: false,
  autoHeight: false,
  updateOnWindowResize: true,
  calculateHeight: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
  breakpoints: {
    800: {
      centeredSlides: false,
      allowTouchMove: true,
      slidesPerView: 2,
    },
    1280: {
      centeredSlides: false,
      allowTouchMove: true,
      slidesPerView: 3,
    },
  },
};

export default class Swiper {
  constructor(el, customOptions = {}, SwiperPlugin) {
    this.update = debounce(this.update.bind(this), 500);
    this.el = el;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...customOptions,
    };
    this.SwiperPlugin = SwiperPlugin;

    this.init();

    this.updateOnResize();
  }

  init() {
    this.instance = new this.SwiperPlugin(this.el, this.options);
  }

  destroy() {
    if (this.instance && this.instance.destroy) {
      this.instance.destroy();
    }
  }

  updateOnResize() {
    window.addEventListener('resize', this.update);
  }

  update() {
    this.destroy();
    this.init();
  }
}
