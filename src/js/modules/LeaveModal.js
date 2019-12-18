import Modal from './Modal';

export default class LeaveModal extends Modal {
  constructor(props) {
    super(props);
    this.addLeaveListeners();
  }

  addLeaveListeners() {
    /*
    window.onbeforeunload = function (event) {

      console.log(JSON.stringify(event));
      if (window.location.hostname) {

      }

      const c = confirm('Machen Sie mit\n'
        + 'bei unserer Weihnachtskartenaktion\n'
        + 'und schicken Sie Ihrem\n'
        + 'Wahlkreisabgeordneten eine\n'
        + 'Postkarte.');
      if (c) {
        // https://weihnachten.germanzero.de/
        // Отправить карту сейчас
        return true;
      }
      return false;
    };
    */
  }
}
