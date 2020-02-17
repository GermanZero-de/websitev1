import request from './Request';

import {
  DATA_SENT_EVENT, NOTIFICATION_ERROR, NOTIFICATION_SUCCESS,
  SEND_ERROR,
  SEND_START,
  SEND_SUCCESS,
} from '../constants';

export const API_PATH = 'https://germanzero.de';
export const API_PATH_ATTR = 'action';
export const SUCCESS_MESSAGE_ATTRIBUTE = 'data-success-message';

export const ApiHandler = (emitter) => (formEl) => formEl.addEventListener(DATA_SENT_EVENT, async (e) => {
  const { data } = e.detail;
  const formName = formEl.getAttribute('name');
  if (emitter) {
    emitter.emit(SEND_START, {
      name: formEl.getAttribute('name'),
      data,
    });
  }
  if (formEl.hasAttribute('with-captcha') && window.grecaptcha) {
    try {
      data.token = await window.grecaptcha.execute('6LcqGcoUAAAAAOx-ynLFWhuftjUAAX_tzw2fcaiD', { action: 'submit' });
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const response = await request({
      url: formEl.getAttribute(API_PATH_ATTR),
      data,
    });
    if (emitter) {
      emitter.emit(NOTIFICATION_SUCCESS, formEl.getAttribute(SUCCESS_MESSAGE_ATTRIBUTE) || (response ? response.message : undefined));
      emitter.emit(SEND_SUCCESS, { name: formName, data: response });
    }
  } catch (error) {
    if (emitter) {
      const text = error.message ? error.message : error;
      emitter.emit(NOTIFICATION_ERROR, text);
      emitter.emit(SEND_ERROR, { name: formName, data: text });
    }
  }
});
