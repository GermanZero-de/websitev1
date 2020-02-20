import TruncateText from '../Truncate/truncate';

export default class ReadMore {
  constructor() {
    if (document.querySelectorAll('.js-read-more').length) {
      try {
        TruncateText(document.querySelectorAll('.js-read-more'));
      } catch (e) {
        console.error(e);
      }
    }
  }
}
