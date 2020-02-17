import VideoModal from './VideoModal';

export default class Video {
  constructor() {
    // eslint-disable-next-line no-new
    document.querySelectorAll('.js-video-element').forEach((videoModal) => {
      // eslint-disable-next-line no-new
      new VideoModal(videoModal);
    });
  }
}
