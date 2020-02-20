import { ApiHandler } from '../Api';
import { formsHandler } from '../Validation';

export default class Forms {
  constructor({ emitter }) {
    this.emitter = emitter;
    this.initForms();
  }

  initForms() {
    const forms = document.querySelectorAll('.js-form');
    forms.forEach(ApiHandler(this.emitter));
    forms.forEach(formsHandler(this.emitter));
  }
}
