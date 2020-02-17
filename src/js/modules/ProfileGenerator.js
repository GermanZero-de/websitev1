import overlay1 from '../../assets/img/avatar-overlays/facebook-profile-overlay20200212-01.svg';
import overlay2 from '../../assets/img/avatar-overlays/facebook-profile-overlay20200212-02.svg';
import overlay3 from '../../assets/img/avatar-overlays/facebook-profile-overlay20200212-03.svg';
import overlay4 from '../../assets/img/avatar-overlays/facebook-profile-overlay20200212-04.svg';
import overlay5 from '../../assets/img/avatar-overlays/facebook-profile-overlay20200212-05.svg';
import overlay6 from '../../assets/img/avatar-overlays/facebook-profile-overlay20200212-06.svg';

const errorTypes = {
  TYPE_ERROR: 'TYPE_ERROR',
  SRC_ERROR: 'SRC_ERROR',
  SIZE_ERROR: 'SIZE_ERROR',
  LOAD_ERROR: 'LOAD_ERROR',
};

const createError = (message, name) => {
  const e = new Error(message);
  e.name = name;
  return e;
};

const validateImage = (src, size = 4 * 1024 * 1024) => {
  if (!src) {
    throw createError('no src for image', errorTypes.SRC_ERROR);
  }
  if (!src.type.match(/image.*/)) {
    throw createError('File is not an image.', errorTypes.TYPE_ERROR);
  }
  if (src.size > size) {
    throw createError(
      `The image is too large. It should be smaller than ${size / 1024 / 1024} MB`,
      errorTypes.SIZE_ERROR,
    );
  }
};

const calcOffsetToCenter = (width, height) => {
  const size = Math.min(width, height);
  let x;
  let y;
  if (width === size) {
    x = 0;
    y = -(height - size) / 2;
  } else {
    x = -(width - size) / 2;
    y = 0;
  }
  return {
    x,
    y,
  };
};

export default class ProfileGenerator {
  constructor(downloadName) {
    this.downloadName = downloadName;
    this.fileUploadInput = document.querySelector('.js-profile-upload-file-dialog');
    this.uploadProfileButton = document.querySelector('.js-upload-profile');
    this.downloadProfileButton = document.querySelector('.js-download-profile');
    this.overlays = [overlay1, overlay2, overlay3, overlay4, overlay5, overlay6];
    this.profileOverlays = document.querySelectorAll('.js-profile-overlay');
    this.profileImageSrc = '';
    this.profileOrientation = 0;
    this.canvas = document.querySelector('.js-profile-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.overlayImageSrc = this.profileOverlays.length > 0 && this.getOverlaySrc(this.profileOverlays[0].getAttribute('src'));

    this.changeOverlayHandler = this.changeOverlayHandler.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.addListeners();
    this.mergeProfileImageWithOverlay();
  }

  getOverlaySrc(previewSrc) {
    const overlayFilename = previewSrc.split('/')
      .pop();
    return this.overlays.find((overlay) => overlay.includes(overlayFilename));
  }

  clearAndFitCanvas(size) {
    // Overlays can only be squares
    this.canvas.width = size;
    this.canvas.height = size;
    this.ctx.clearRect(0, 0, size, size);
  }

  uploadImage(event) {
    const src = event.target.files[0];
    try {
      validateImage(src, 6 * 1024 * 1024);
      this.getImageOrientation(src);
      this.loadImage(src);
    } catch (e) {
      alert(e.message);
    }
  }

  getImageOrientation(file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const view = new DataView(event.target.result);
      if (view.getUint16(0, false) !== 0xFFD8) {
        this.profileOrientation = -2;
        return;
      }
      const length = view.byteLength;
      let offset = 2;
      while (offset < length) {
        if (view.getUint16(offset + 2, false) <= 8) {
          this.profileOrientation = -1;
          return;
        }
        const marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xFFE1) {
          // eslint-disable-next-line no-cond-assign
          if (view.getUint32(offset += 2, false) !== 0x45786966) {
            this.profileOrientation = -1;
            return;
          }

          const little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              this.profileOrientation = view.getUint16(offset + (i * 12) + 8, little);
              return;
            }
          }
          // eslint-disable-next-line no-bitwise
        } else if ((marker & 0xFF00) !== 0xFF00) {
          break;
        } else {
          offset += view.getUint16(offset, false);
        }
      }
      this.profileOrientation = -1;
    };

    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  }

  loadImage(src) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      this.profileImageSrc = event.target.result;
      await this.mergeProfileImageWithOverlay();
    };
    reader.readAsDataURL(src);
  }

  async changeOverlayHandler(index) {
    const overlayImagePreview = this.profileOverlays[index];
    const previewSrc = overlayImagePreview && overlayImagePreview.getAttribute('src');
    this.overlayImageSrc = this.getOverlaySrc(previewSrc);
    await this.mergeProfileImageWithOverlay();
  }

  // eslint-disable-next-line class-methods-use-this
  async openImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onerror = () => reject(createError('Could not load image.', errorTypes.LOAD_ERROR));
      img.onload = () => {
        resolve(img);
      };
      img.src = src;
    });
  }

  transformContext(size) {
    switch (this.profileOrientation) {
      case 2:
        this.ctx.transform(-1, 0, 0, 1, size, 0);
        break;
      case 3:
        this.ctx.transform(-1, 0, 0, -1, size, size);
        break;
      case 4:
        this.ctx.transform(1, 0, 0, -1, 0, size);
        break;
      case 5:
        this.ctx.transform(0, 1, 1, 0, 0, 0);
        break;
      case 6:
        this.ctx.transform(0, 1, -1, 0, size, 0);
        break;
      case 7:
        this.ctx.transform(0, -1, -1, 0, size, size);
        break;
      case 8:
        this.ctx.transform(0, -1, 1, 0, 0, size);
        break;
      default:
        break;
    }
  }

  async mergeProfileImageWithOverlay() {
    let size;
    if (this.profileImageSrc !== '') {
      const profileImage = await this.openImage(this.profileImageSrc);
      size = Math.min(profileImage.width, profileImage.height);
      const { x, y } = calcOffsetToCenter(profileImage.width, profileImage.height);

      this.clearAndFitCanvas(size);
      this.ctx.save();
      this.transformContext(size);
      this.ctx.drawImage(profileImage, x, y);
      this.ctx.restore();
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.ctx.fillRect(0, 0, size, size);
    } else {
      size = 400;
      this.clearAndFitCanvas(size);
    }

    const overlayImage = await this.openImage(this.overlayImageSrc);
    this.ctx.drawImage(overlayImage, 0, 0, size, size);
  }

  async downloadProfileImage(downloadName) {
    const link = document.createElement('a');
    link.download = downloadName;
    this.canvas.toBlob((blob) => {
      link.href = URL.createObjectURL(blob);
      link.click();
    }, 'image/jpeg', 0.92);
  }

  addListeners() {
    this.fileUploadInput.addEventListener('change', this.uploadImage);
    this.uploadProfileButton.addEventListener('click', () => this.fileUploadInput.click());
    this.downloadProfileButton.addEventListener('click', () => this.downloadProfileImage(this.downloadName));
    this.profileOverlays.forEach((el, index) => el.addEventListener('click', () => this.changeOverlayHandler(index), true));
  }

  removeListeners() {
    this.fileUploadInput.removeEventListener('change', this.uploadImage);
    this.uploadProfileButton.removeEventListener('click', () => this.fileUploadInput.click());
    this.downloadProfileButton.removeEventListener('click', () => this.downloadProfileImage(this.downloadName));
    this.profileOverlays.forEach((el, index) => el.removeEventListener('click', () => this.changeOverlayHandler(index), true));
  }
}
