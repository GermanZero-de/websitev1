export default class MachMitForm {
  constructor() {
    /**
     * Mach-mit form logic
     */
    if (document.querySelector('.js-custom-machmit-form')) {
      const showCustomRadios = document.querySelectorAll('.js-show-custom-field');
      showCustomRadios.forEach((radio) => radio.addEventListener('change', (e) => {
        document.querySelector('.js-custom-sphere').classList.toggle('hidden', e.target.value === 'custom' ? !e.target.checked : true);
      }));

      document.querySelectorAll('.js-show-sphere').forEach((el) => el.addEventListener('change', () => {
        const show = document.querySelectorAll('.js-show-sphere:checked').length;
        document.querySelectorAll('.js-sphere-radios').forEach((radio) => radio.classList.toggle('hidden', !show));
      }));
    }
  }
}
