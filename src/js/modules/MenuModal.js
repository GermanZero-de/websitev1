export default class MenuModal {
  constructor() {
    this.isOpen = false;
    this.activeSubList = -1;

    this.containerElement = document.querySelector('.js-menu-screen');
    this.listElement = document.querySelector('.js-menu-screen__list');
    this.openBtnElements = document.querySelectorAll('.js-menu-btn');
    this.closeBtnElements = document.querySelectorAll('.js-menu-btn-close');
    this.openSubBtnElements = document.querySelectorAll('.js-menu-btn-open-sub ');
    this.toggleModalHandler = this.toggleModalHandler.bind(this);
    this.subHandler = this.subHandler.bind(this);
    this.addListeners();
  }

  addListeners() {
    [...this.openBtnElements].forEach((el) => el.addEventListener('click', this.toggleModalHandler, true));
    [...this.closeBtnElements].forEach((el) => el.addEventListener('click', this.toggleModalHandler, false));
    [...this.openSubBtnElements].forEach((el) => el.addEventListener('click', this.subHandler, false));
  }

  removeListeners() {
    [...this.openBtnElements].forEach((el) => el.removeEventListener('click', this.toggleModalHandler, false));
    [...this.closeBtnElements].forEach((el) => el.removeEventListener('click', this.toggleModalHandler, false));
    [...this.openSubBtnElements].forEach((el) => el.removeEventListener('click', this.subHandler, false));
  }

  toggleModalHandler() {
    this.isOpen = !this.isOpen;
    document.body.style.overflow = this.isOpen ? 'hidden' : 'auto';
    this.containerElement.classList.toggle('active', this.isOpen);
  }

  subHandler(e) {
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      this.listElement.classList.remove('active');
    } else {
      [...this.openSubBtnElements].forEach((el) => el.classList.remove('active'));
      e.target.classList.add('active');
      this.listElement.classList.add('active');
    }
  }
}
