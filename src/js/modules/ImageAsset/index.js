/* eslint-disable no-underscore-dangle */
import hasScrollSupport from '../../helpers/hasScrollSupport';

export default class ImageAsset {
  constructor({ element = document.querySelectorAll('.js-image-asset') }) {
    this._wasVisible = false;
    this._visible = false;
    this.baseCssClass = 'image-asset__image';

    this.element = element;

    if (hasScrollSupport) {
      this.startIntersectionObserver();
    } else {
      this.wasVisible = true;
    }

    this.observer = this.startIntersectionObserver();
  }

  get wasVisible() {
    return this._wasVisible;
  }

  set wasVisible(newValue) {
    if (!this._wasVisible && newValue) {
      const loadHandler = () => {
        this.element.classList.add(`${this.baseCssClass}--loaded`);
        this.element.classList.remove(`${this.baseCssClass}--not-loaded`);
      };

      this.element.addEventListener('onload', loadHandler);
      this.element.addEventListener('load', loadHandler);

      this.element.setAttribute('srcset', this.element.dataset.srcset);
    }

    this._wasVisible = newValue;
  }

  get visible() {
    return this._visible;
  }

  set visible(newValue) {
    this._visible = newValue;
    this.element.classList.toggle(`${this.baseCssClass}--visible`, newValue);
    this.element.classList.toggle(`${this.baseCssClass}--hidden`, !newValue);
  }

  startIntersectionObserver() {
    const options = {
      rootMargin: '0px',
      threshold: 0.1,
    };
    const observer = new window.IntersectionObserver(this.intersectionHandler.bind(this), options);
    observer.observe(this.element);
  }

  intersectionHandler([element]) {
    if (element.isIntersecting) {
      this.wasVisible = true;
      this.visible = true;
    } else {
      this.visible = false;
    }
  }
}
