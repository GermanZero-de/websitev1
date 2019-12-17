export default class VideoModal {
  constructor(videoElement) {
    this.isOpen = false;
    this.videoElement = videoElement;
    this.containerElement = document.querySelector('.js-video-modal');
    this.containerElementFrame = document.querySelector('.js-video-modal-frame');
    this.openBtnElements = videoElement.querySelectorAll('.js-video-modal-btn');
    this.closeBtnElements = document.querySelectorAll('.js-video-modal-btn-close');
    this.toggleModalHandler = this.toggleModalHandler.bind(this);
    this.addListeners();
  }

  addListeners() {
    [...this.openBtnElements].forEach((el) => el.addEventListener('click', this.toggleModalHandler, true));
    [...this.closeBtnElements].forEach((el) => el.addEventListener('click', this.toggleModalHandler, false));
  }

  removeListeners() {
    [...this.openBtnElements].forEach((el) => el.removeEventListener('click', this.toggleModalHandler, true));
    [...this.closeBtnElements].forEach((el) => el.removeEventListener('click', this.toggleModalHandler, false));
  }

  toggleModalHandler(event) {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      const id = event.target.getAttribute('data-youtube-id');
      const autoplay = '?autoplay=1';
      const relatedNo = '&rel=0';
      const src = `//www.youtube.com/embed/${id}${autoplay}${relatedNo}`;
      this.containerElementFrame.setAttribute('src', src);
    } else {
      this.containerElementFrame.setAttribute('src', '');
    }

    document.body.style.overflow = this.isOpen ? 'hidden' : 'auto';
    this.containerElement.classList.toggle('active', this.isOpen);
    // this.containerElement.childNodes this.openBtnElements.attr('data-youtube-id')
  }
}
