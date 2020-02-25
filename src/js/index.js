import './polyfills';
import LazyLoad from 'vanilla-lazyload';
import FeatureDetection from './modules/FeatureDetection';
import Emitter from './modules/Emitter';
import Notifications from './modules/Notifications';
import Forms from './modules/Forms';
import FixedHeader from './modules/FixedHeader';
import Scroll from './modules/Scroll';
import MenuModal from './modules/Modals/MenuModal';
import Carousels from './modules/Carousels';
import TextCrop from './modules/TextCrop';
import Video from './modules/Video';
import Selects from './modules/Selects';
import ReadMore from './modules/ReadMore';
import App from './app';
import ProfileGenerator from './modules/ProfileGenerator';
import ImageAsset from './modules/ImageAsset';
import ZoomModal from './modules/Modals/ZoomModal';

document.addEventListener('DOMContentLoaded', async () => {
  /* eslint-disable no-new */

  new FeatureDetection();

  const {emitter} = new Emitter();

  new Notifications({emitter});

  new Forms({emitter});

  new Scroll();

  /* warning: is async ! */
  Selects.build();

  /* warning: is async ! */
  Carousels.build();

  new FixedHeader();

  new Video();

  new MenuModal();

  new ZoomModal({
    container: document.querySelector('.js-modal'),
    openBtns: document.querySelectorAll('.js-zoom-modal'),
  });

  new LazyLoad({
    elements_selector: '.js-lazy-image',
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

  document.querySelectorAll('.js-image-asset ').forEach((element) => new ImageAsset({element}));

  /**
   * Custom app logic
   */
  new App();
});
