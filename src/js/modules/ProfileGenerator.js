export default class ProfileGenerator {
  constructor() {
    this.fileUploadInput = document.querySelector('.js-profile-upload-file-dialog');
    this.uploadProfileButton = document.querySelector('.js-upload-profile');
    this.profileImageSrc = '';

    this.loadImage = this.loadImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.addListeners();
  }

  uploadImage(event) {
    const src = event.target.files[0];
    try {
      this.loadImage(src);
    } catch (e) {
      alert(e.message);
    }
  }

  loadImage(src) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      this.profileImageSrc = event.target.result;
    };
    reader.readAsDataURL(src);
  }

  addListeners() {
    this.fileUploadInput.addEventListener('change', this.uploadImage);
    this.uploadProfileButton.addEventListener('click', () => this.fileUploadInput.click());
  }

  removeListeners() {
    this.fileUploadInput.removeEventListener('change', this.uploadImage);
    this.uploadProfileButton.removeEventListener('click', () => this.fileUploadInput.click());
  }
}
