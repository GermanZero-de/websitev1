/* eslint-disable no-underscore-dangle */
export default class Modal {
  /**
   * Basic modal
   * @param container
   * @param template
   * @param openBtns
   * @param closeBtns
   */
  constructor(
    {
      container = document.querySelector('.js-modal'),
      template,
      openBtns,
      closeBtns = document.querySelectorAll('.js-modal-close'),
    },
  ) {
    this._open = false;
    this.container = container;
    this.template = template;
    this.openBtns = openBtns;
    this.closeBtns = closeBtns;
    this.addListeners();
    this.escapeListener = this.escapeListener.bind(this);
  }

  get open() {
    return this._open;
  }

  set open(newValue) {
    this._open = newValue;
    if (newValue) {
      document.addEventListener('keydown', this.escapeListener, true);
    } else {
      document.removeEventListener('keydown', this.escapeListener, true);
    }
    this.render();
  }

  addListeners() {

    if (this.closeBtns && this.closeBtns.length) {
      this.closeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.toggle(false);
        });
      });
    }

    if (this.openBtns && this.openBtns.length) {
      this.openBtns.forEach(((btn) => {
        btn.addEventListener('click', (e) => {
          this.data = btn.dataset;
          this.toggle(true);
          if (this.onOpen) {
            this.onOpen(e);
          }
        });
      }));
    }
  }

  toggle(state) {
    this.open = state;
  }

  escapeListener(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.toggle(false);
    }
  }

  render() {
    if (this.container) {
      if (this.open) {
        this.container.querySelector('.js-modal-content').innerHTML = this.template;
      }
      document.body.classList.toggle('overflow-hidden', this.open);
      this.container.classList.toggle('active', this.open);
    }
  }
}
