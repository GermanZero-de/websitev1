import MachMitForm from './MachMitForm';
import EmailConfirmationRequest from './EmailConfirmationRequest';

export default class App {
  constructor() {
    this.machMitForm = new MachMitForm();
    this.emailConfirmation = new EmailConfirmationRequest();
  }
}
