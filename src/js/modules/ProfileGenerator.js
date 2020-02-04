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

const calcScaledDimensions = (imageToScale, fixedImage) => {
  const { width: width1, height: height1 } = imageToScale;
  const { width: width2, height: height2 } = fixedImage;

  const widthDiff = width1 - width2;
  const heightDiff = height1 - height2;

  let width;
  let height;

  if (widthDiff < heightDiff) {
    width = (width1 * width2) / width1;
    height = (height1 * width2) / width1;
  } else {
    width = (width1 * height2) / height1;
    height = (height1 * height2) / height1;
  }

  return {
    width,
    height,
  };
};

export default class ProfileGenerator {
  constructor() {
    this.fileUploadInput = document.querySelector('.js-profile-upload-file-dialog');
    this.uploadProfileButton = document.querySelector('.js-upload-profile');
    this.previewImage = document.querySelector('.js-profile-preview');
    this.profileOverlays = document.querySelectorAll('.js-profile-overlay');
    this.profileImageSrc = '';
    this.overlayImageSrc = this.profileOverlays.length > 0 && this.profileOverlays[0].getAttribute('src');
    this.mergedProfileImageSrc = '';

    this.changeOverlayHandler = this.changeOverlayHandler.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.addListeners();
  }

  updateImagePreview() {
    if (this.previewImage) this.previewImage.setAttribute('src', this.mergedProfileImageSrc);
  }

  uploadImage(event) {
    const src = event.target.files[0];
    try {
      validateImage(src, 6 * 1024 * 1024);
      this.loadImage(src);
    } catch (e) {
      alert(e.message);
    }
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
    this.overlayImageSrc = overlayImagePreview && overlayImagePreview.getAttribute('src');
    await this.mergeProfileImageWithOverlay();
  }

  // eslint-disable-next-line class-methods-use-this
  async openImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onerror = () => reject(createError('Could not load image.', errorTypes.LOAD_ERROR));
      img.onload = () => {
        resolve(img);
      };
      img.src = src;
    });
  }

  async mergeProfileImageWithOverlay() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const overlayImage = await this.openImage(this.overlayImageSrc);
    canvas.width = overlayImage.width;
    canvas.height = overlayImage.height;

    if (this.profileImageSrc !== '') {
      const profileImage = await this.openImage(this.profileImageSrc);
      const { width, height } = calcScaledDimensions(profileImage, overlayImage);
      ctx.drawImage(profileImage, 0, 0, width, height);
    }

    ctx.drawImage(overlayImage, 0, 0);

    const imgSrc = canvas.toDataURL('image/png', 0.92);
    this.mergedProfileImageSrc = imgSrc;
    this.updateImagePreview();
  }

  addListeners() {
    this.fileUploadInput.addEventListener('change', this.uploadImage);
    this.uploadProfileButton.addEventListener('click', () => this.fileUploadInput.click());
    this.profileOverlays.forEach((el, index) => el.addEventListener('click', () => this.changeOverlayHandler(index), true));
  }

  removeListeners() {
    this.fileUploadInput.removeEventListener('change', this.uploadImage);
    this.uploadProfileButton.removeEventListener('click', () => this.fileUploadInput.click());
    this.profileOverlays.forEach((el, index) => el.removeEventListener('click', () => this.changeOverlayHandler(index), true));
  }
}
