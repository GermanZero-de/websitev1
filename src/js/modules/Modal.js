export default class Modal {
  /**
   * @param container HTMLElement
   * @param template HTMLElement
   */
  constructor(
    {
      container = document.querySelector('.js-modal'),
      template,
      openBtn,
    },
  ) {
    this.container = container;
    this.template = template;
    this.openBtn = openBtn;
    this.closeBtn = document.querySelector('.js-close-modal');
    this.open = false;
    this.addListeners();
  }

  addListeners() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        this.toggle(false);
        this.render();
      });
    }
    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => {
        this.toggle(true);
        this.render();
      });
    }
  }

  toggle(state) {
    this.open = state;
  }

  render() {
    if (this.container) {
      if (this.open) {
        this.container.innerHTML = this.template;
      }
      document.body.style.overflow = this.open ? 'hidden' : 'auto';
      this.container.classList.toggle('active', this.open);
    }
  }
}
