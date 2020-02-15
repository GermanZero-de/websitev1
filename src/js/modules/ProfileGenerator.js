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
    this.previewImage = document.querySelector('.js-profile-preview');
    this.profileOverlays = document.querySelectorAll('.js-profile-overlay');
    this.profileImageSrc = '';
    this.mergedProfileImageSrc = '';
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.overlayImageSrc = this.profileOverlays.length > 0 && this.profileOverlays[0].getAttribute('src');

    this.changeOverlayHandler = this.changeOverlayHandler.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.addListeners();
  }

  clearAndFitCanvas(size) {
    // Overlays can only be squares
    this.canvas.width = size;
    this.canvas.height = size;
    this.ctx.clearRect(0, 0, size, size);
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
    const previewSrc = overlayImagePreview && overlayImagePreview.getAttribute('src');
    this.overlayImageSrc = previewSrc;
    this.overlayImage = overlayImagePreview;
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
    let size;
    if (this.profileImageSrc !== '') {
      const profileImage = await this.openImage(this.profileImageSrc);
      size = Math.min(profileImage.width, profileImage.height);
      const { x, y } = calcOffsetToCenter(profileImage.width, profileImage.height);

      this.clearAndFitCanvas(size);
      this.ctx.drawImage(profileImage, x, y);
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      this.ctx.fillRect(0, 0, size, size);
    } else {
      size = 400;
      this.clearAndFitCanvas(size);
    }

    // const overlayImage = await this.openImage(this.overlayImageSrc);
    // this.ctx.drawImage(overlayImage, 0, 0, size, size);
    this.ctx.drawImage(this.overlayImage, 0, 0, size, size);

    const imgSrc = this.canvas.toDataURL('image/png', 0.92);
    this.mergedProfileImageSrc = imgSrc;
    this.updateImagePreview();
  }

  async downloadProfileImage(downloadName) {
    if (this.mergedProfileImageSrc !== '') {
      const link = document.createElement('a');
      link.download = downloadName;
      this.canvas.toBlob((blob) => {
        link.href = URL.createObjectURL(blob);
        link.click();
      });
    }
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
