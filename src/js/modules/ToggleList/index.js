export default class ToggleList {
  constructor() {
    Array.from(document.querySelectorAll('.js-toggle-list')).forEach((listEl) => {
      let state = false;
      const toggler = listEl.querySelector('.js-toggle-list-button');
      toggler.addEventListener('click', () => {
        state = !state;
        ToggleList.render(state, listEl, toggler);
      });
    });
  }

  static render(state, listEl, toggler) {
    const items = Array.from(listEl.querySelectorAll('.js-toggle-list-item'));
    items.forEach((item) => {
      item.classList.toggle('hidden', !state);
    });
    toggler.querySelector('.js-toggle-list-more-text').classList.toggle('hidden', state);
    toggler.querySelector('.js-toggle-list-less-text').classList.toggle('hidden', !state);
  }
}
