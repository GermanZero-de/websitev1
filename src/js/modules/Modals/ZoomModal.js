import Modal from './Modal';

export default class ZoomModal extends Modal {
  constructor(props) {
    super(props);
    this.items = this.openBtns;

    this.render();
  }

  onOpen() {
    this.template = `<img class="modal__zoom-image" src=${this.data.src}/>`;
    this.render();
  }
}
