export default class MenuModal {
  constructor() {
    document.getElementById('menu-btn').addEventListener('click', () => {
      this.toggleMenuModal(false);
    }, false);

    document.getElementById('menu-btn-close').addEventListener('click', () => {
      this.toggleMenuModal(true);
    }, false);
    const menuList = document.getElementById("menu-screen-list");
    const menuItems = document.querySelectorAll("#menu-screen-list>.sublist");
    for (const item of menuItems ) {
      item.addEventListener('click', (e) => {
        this.toggleMenuModalList(e, menuList, menuItems);
      }, false);
    }
  }

  toggleMenuModalList(e, menuList, menuItems) {
    if (e.target.children[0]) {
      if (e.target.children[0].classList.contains('active')) {
        e.target.classList.remove('active')
        e.target.children[0].classList.remove('active')
        menuList.classList.remove('active')
      } else {
        for (const item of menuItems ) {
          item.classList.remove('active')
          item.children[0].classList.remove('active')
        }
        e.target.classList.add('active');
        e.target.children[0].classList.add('active');
        menuList.classList.add('active')
      }
    }
  }

  toggleMenuModal(isMenuOpened) {
    let menuScreen = document.getElementById('menu-screen');
    if (isMenuOpened) {
      document.body.style.overflow = 'auto';
      menuScreen.classList.remove('active');
    } else {
      document.body.style.overflow = 'hidden';
      menuScreen.classList.add('active');
    }
  }


}
