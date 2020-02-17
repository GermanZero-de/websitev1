export default class TextCrop {
  constructor() {
    document.querySelectorAll('.js-text-crop-wrapper').forEach((el) => {
      let isVisible = false;
      el.addEventListener('click', () => {
        isVisible = !isVisible;
        el.querySelector('.js-text-crop').classList.toggle('isVisible', isVisible);
      });
    });
  }
}
