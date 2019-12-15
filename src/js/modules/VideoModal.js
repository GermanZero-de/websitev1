export default class VideoModal {
  constructor() {
    this.isOpen = false;
    this.activeSubList = -1;

    this.containerElement = document.querySelector('.js-video-modal');
    this.containerElementFrame = document.querySelector('.js-video-modal-frame');
    this.openBtnElements = document.querySelectorAll('.js-video-modal-btn');
    this.closeBtnElements = document.querySelectorAll('.js-video-modal-btn-close');
    this.toggleModalHandler = this.toggleModalHandler.bind(this);
    this.addListeners();
  }

  addListeners() {
    [...this.openBtnElements].forEach((el) => el.addEventListener('click', this.toggleModalHandler, true));
    [...this.closeBtnElements].forEach((el) => el.addEventListener('click', this.toggleModalHandler, false));
  }

  removeListeners() {
    [...this.openBtnElements].forEach((el) => el.removeEventListener('click', this.toggleModalHandler, false));
    [...this.closeBtnElements].forEach((el) => el.removeEventListener('click', this.toggleModalHandler, false));
  }

  toggleModalHandler(event) {
    this.isOpen = !this.isOpen;
    document.body.style.overflow = this.isOpen ? 'hidden' : 'auto';
    this.containerElement.classList.toggle('active', this.isOpen);

    let id = event.target.getAttribute('data-youtube-id');
    let autoplay = '?autoplay=1';
    let related_no = '&rel=0';
    let src = '//www.youtube.com/embed/'+id+autoplay+related_no;
    this.containerElementFrame.setAttribute('src', src);
    //this.containerElement.childNodes this.openBtnElements.attr('data-youtube-id')
  }
}
