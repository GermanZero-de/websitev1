import './polyfills';
import LazyLoad from 'vanilla-lazyload';
import FeatureDetection from './modules/FeatureDetection';
import Emitter from './modules/Emitter';
import Notifications from './modules/Notifications';
import Forms from './modules/Forms';
import FixedHeader from './modules/FixedHeader';
import Scroll from './modules/Scroll';
import MenuModal from './modules/MenuModal';
import LeaveModal from './modules/LeaveModal';
import Carousels from './modules/Carousels';
import TextCrop from './modules/TextCrop';
import Video from './modules/Video';
import Selects from './modules/Selects';
import ReadMore from './modules/ReadMore';
import App from './app';
import ProfileGenerator from './modules/ProfileGenerator';

document.addEventListener('DOMContentLoaded', async () => {
  /* eslint-disable no-new */

  new FeatureDetection();

  const { emitter } = new Emitter();

  new Notifications({ emitter });

  new Forms({ emitter });

  new Scroll();

  /* warning: is async ! */
  Selects.build();

  /* warning: is async ! */
  Carousels.build();

  new FixedHeader();

  new Video();

  new MenuModal();

  new LazyLoad({
    elements_selector: '.js-lazy-image',
  });

  new LeaveModal({
    template: '.js-leave-modal-template',
  });

  new ReadMore();

  new TextCrop();

  /**
   * Profil Generator logik
   */
  if (document.querySelector('.js-profile-upload-file-dialog')) {
    // eslint-disable-next-line no-new
    new ProfileGenerator('gz-profilbild.jpg');
  }

  /**
   * Custom app logic
   */
  new App();
});
