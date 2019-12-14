import {
  DATA_SENT_EVENT, SEND_ERROR, SEND_START, SEND_SUCCESS,
} from '../constants';
import CustomEventPoly from '../../CustomEventPoly';
import scrollIt from '../ScrollIt/ScrollIt';
import getCoords from '../../GetCoords';

export const validationRules = {
  required: /^.+$/,
  email: /^(([a-zA-Z0-9&+-=_])+((\.([a-zA-Z0-9&+-=_]){1,})+)?){1,64}@([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,
  PLZ: /^\S{4,5}$/,
};

export const FORM_ERROR_SELECTOR = 'form__error-message';
export const UNKNOWN_VALIDATION_TEXT = 'Field is invalid';
export const VALIDATION_ATTRIBUTE = 'data-validation-rule';

export const formsHandler = (emitter) => (formEl) => {
  let formIsValid = true;
  const submitEl = formEl.querySelector('.js-form-submit');
  if (emitter) {
    emitter.subscribe(SEND_START, (formName) => {
      if (formEl.getAttribute('name') === formName) {
        formEl.classList.add('isPending');
      }
    });
    emitter.subscribe(SEND_ERROR, (formName) => {
      if (formEl.getAttribute('name') === formName) {
        formEl.classList.remove('isPending');
      }
    });
    emitter.subscribe(SEND_SUCCESS, (formName) => {
      if (formEl.getAttribute('name') === formName) {
        formEl.classList.remove('isPending');
        formEl.reset();
      }
    });
  }
  if (submitEl) {
    submitEl.addEventListener('click', () => {
      formIsValid = true;
      formEl
        .querySelectorAll('.js-form-control')
        .forEach((controlEl) => {
          let controlIsValid = true;
          try {
            const validationAttribute = controlEl.getAttribute(VALIDATION_ATTRIBUTE);
            let errorMessage = '';
            if (validationAttribute) {
              const validations = JSON.parse(validationAttribute);
              validations.forEach((validation) => {
                if (!validationRules[validation].test(controlEl.value)) {
                  controlIsValid = false;
                  formIsValid = false;
                  errorMessage = window.validationMessages[validation] || UNKNOWN_VALIDATION_TEXT;
                }
              });
            }
            const errorEl = controlEl.parentElement.querySelector(`.${FORM_ERROR_SELECTOR}`);
            if (errorEl) {
              errorEl.classList.toggle('isActive', !controlIsValid);
              errorEl.textContent = errorMessage;
              controlEl.classList.toggle('invalid', !controlIsValid);
            }
          } catch (e) {
            console.error(e);
          }
        });

      formEl.classList.toggle('isValid', formIsValid);

      if (formIsValid) {
        formEl.classList.add('isPending');
        const formData = new FormData(formEl);
        const formEntries = formData.entries();
        const json = Object.assign(...Array.from(formEntries, ([x, y]) => ({ [x]: y })));

        const cEvent = CustomEventPoly(DATA_SENT_EVENT, { data: json });
        formEl.dispatchEvent(cEvent);
      } else {
        const errorsElements = [...formEl.querySelectorAll(`.${FORM_ERROR_SELECTOR}`)];
        if (errorsElements.length) {
          const minOffset = errorsElements.reduce((acc, cur) => {
            const curTop = getCoords(cur.parentElement).top;
            return (curTop < acc ? curTop : acc);
          }, 99999999);
          if (minOffset !== 99999999) scrollIt(minOffset, 700, 'easeInOutCubic');
        }
      }
    });
  }
};
