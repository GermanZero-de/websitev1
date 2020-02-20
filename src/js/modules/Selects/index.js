export default class Selects {
  static async build() {
    const selects = document.querySelectorAll('.js-select-custom');

    if (selects.length) {
      try {
        const [Module] = await Promise.all([
          import(/* webpackChunkName: "choices-js" */ 'choices.js'),
          import(/* webpackChunkName: "choices-css" */ 'choices.js/public/assets/styles/choices.min.css'),
        ]);
        const Choices = Module.default;
        selects.forEach((select) => new Choices(select,
          {
            removeItemButton: true,
            shouldSort: false,
          }));
      } catch (err) {
        console.error(err);
      }
    }
  }
}
