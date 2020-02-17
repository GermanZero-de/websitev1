import EventEmitter from './EventEmitter';

export default class Emitter {
  constructor() {
    const emitter = new EventEmitter();
    this.emitter = emitter;
    window.emitter = emitter;
  }
}
