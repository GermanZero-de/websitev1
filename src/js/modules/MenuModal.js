export default class MenuModal {
  constructor() {
    this.isOpen = false;
    this.activeSubList = -1;

    this.containerElement = document.querySelector('.js-menu-screen');
    this.openBtnElements = document.querySelectorAll('.js-menu-btn');
    this.closeBtnElements = document.querySelectorAll('.js-menu-btn-close');
    this.openSubBtnElements = document.querySelectorAll('.js-menu-btn-open-sub ');

    this.openHandler = this.openHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.subHandler = this.subHandler.bind(this);

    this.addListeners();

    this.render();
  }

  addListeners() {
    this.openBtnElements.forEach((el) => el.addEventListener('click', this.openHandler, false));
    this.closeBtnElements.forEach((el) => el.addEventListener('click', this.closeHandler, false));
    this.openSubBtnElements.forEach((el) => el.addEventListener('click', this.subHandler, false));
  }

  removeListeners() {
    this.openBtnElements.forEach((el) => el.removeEventListener('click', this.openHandler, false));
    this.closeBtnElements.forEach((el) => el.removeEventListener('click', this.closeHandler, false));
    this.openSubBtnElements.forEach((el) => el.removeEventListener('click', this.subHandler, false));
  }

  openHandler() {
    this.isOpen = true;
    this.render();
  }

  closeHandler() {
    this.isOpen = false;
    this.render();
  }

  subHandler(e) {
    const el = e.target;
    const allLists = Array.prototype.slice.call(el.parentNode.children);
    const activeSubList = allLists.indexOf(el);
    this.activeSubList = this.activeSubList === activeSubList ? -1 : activeSubList;
    this.render();
  }

  toggleMenuModalList(e, menuList, menuItems) {
    if (e.target.children[0]) {
      if (e.target.children[0].classList.contains('active')) {
        e.target.classList.remove('active');
        e.target.children[0].classList.remove('active');
        menuList.classList.remove('active');
      } else {
        for (const item of menuItems) {
          item.classList.remove('active');
          item.children[0].classList.remove('active');
        }
        e.target.classList.add('active');
        e.target.children[0].classList.add('active');
        menuList.classList.add('active');
      }
    }
  }

  render() {
    document.body.style.overflow = this.isOpen ? 'hidden' : 'auto';
    this.containerElement.classList.toggle('active', this.isOpen);
    const rootLists = this.containerElement.querySelectorAll('.js-menu-list-item');
    rootLists.forEach((el) => el.classList.remove('active'));
    // eslint-disable-next-line no-bitwise
    if (rootLists[this.activeSubList]) {
      rootLists[this.activeSubList].classList.add('active');
    }
  }
}
