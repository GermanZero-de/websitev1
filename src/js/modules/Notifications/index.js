import {NOTIFICATION_ERROR, NOTIFICATION_SUCCESS} from '../constants';

const MAIN_CSS_CLASS = 'notifications';

export default class Notifications {
  constructor({emitter}) {
    this.el = document.querySelector('.js-notifications');
    this.visible = false;
    this.type = 'success'; // | 'error'
    this.tm = undefined;
    this.emitter = emitter;
    this.subscriptions = [];

    this.addListeners();
  }

  addListeners() {
    this.subscriptions.push(this.emitter.subscribe(NOTIFICATION_SUCCESS, (data) => {
      this.show({content: data});
    }));

    this.subscriptions.push(this.emitter.subscribe(NOTIFICATION_ERROR, (data) => {
      this.show({type: 'error', content: data && data.message ? data.message : 'Ups. Something went wrong!'});
    }));

    this.el.addEventListener('click', () => {
      this.hide();
    });
  }

  show({type = 'success', delay = 6000, content = ''}) {
    if (this.tm) {
      clearTimeout(this.tm);
    }
    this.visible = true;
    this.type = type;
    this.content = content;
    this.tm = setTimeout(() => {
      this.hide();
    }, delay);
    this.render();
  }

  hide() {
    this.visible = false;
    if (this.tm) {
      clearTimeout(this.tm);
    }
    this.tm = undefined;
    this.render();
  }

  destroy() {
    this.hide();
    this.el = undefined;
    this.subscriptions.forEach((subs) => subs());
    this.subscriptions = undefined;
  }

  render() {
    this.el.classList.toggle(`${MAIN_CSS_CLASS}--${this.type}`, true);
    this.el.classList.toggle('isShown', this.visible);
    this.el.textContent = this.content;
  }
}
