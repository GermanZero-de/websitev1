import {
  DATA_SENT_EVENT,
  NOTIFICATION_ERROR,
  NOTIFICATION_SUCCESS,
  SEND_ERROR,
  SEND_START,
  SEND_SUCCESS,
} from '../constants';

export const API_PATH = 'https://germanzero.de';
export const API_PATH_ATTR = 'action';
export const DEFAULT_CONTENT_TYPE = 'application/json; charset=utf-8';
export const SUCCESS_MESSAGE_ATTRIBUTE = 'data-success-message';

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}

export const ApiHandler = (emitter) => (formEl) => formEl.addEventListener(DATA_SENT_EVENT, async (e) => {
  const { data } = e.detail;
  const formName = formEl.getAttribute('name');
  if (emitter) {
    emitter.emit(SEND_START, formEl.getAttribute('name'));
  }
  if (formEl.hasAttribute('with-captcha') && window.grecaptcha) {
    try {
      data.token = await window.grecaptcha.execute('6LcqGcoUAAAAAOx-ynLFWhuftjUAAX_tzw2fcaiD', { action: 'submit' });
    } catch (error) {
      console.error(error);
    }
  }
  fetch(formEl.getAttribute(API_PATH_ATTR), {
    method: 'POST',
    headers: {
      'Content-Type': DEFAULT_CONTENT_TYPE,
    },
    // mode: 'cors',
    body: JSON.stringify(data),
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((res) => {
      if (emitter) {
        emitter.emit(NOTIFICATION_SUCCESS, formEl.getAttribute(SUCCESS_MESSAGE_ATTRIBUTE) || res ? res.message : undefined);
        emitter.emit(SEND_SUCCESS, formName);
      }
    })
    .catch((error) => {
      if (emitter) {
        if (error.response) {
          error.response.json().then((errRes) => {
            console.error(errRes);
            emitter.emit(NOTIFICATION_ERROR, errRes);
            emitter.emit(SEND_ERROR, formName);
          });
        }
      }
    });
});
