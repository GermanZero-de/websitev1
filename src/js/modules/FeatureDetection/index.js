import detectIE from './detectIE';
import isMobile from './isMobile';

export default class FeatureDetection {
  constructor() {
    const ieVersion = detectIE();
    if (ieVersion && ieVersion < 12) {
      document.body.classList.add('isIE');
      document.body.classList.add(`ie-${ieVersion}`);
    }

    if (isMobile()) {
      document.body.classList.add('mobile');
    }
  }
}
