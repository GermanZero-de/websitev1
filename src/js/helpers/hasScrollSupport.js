/**
 * Has scroll support. Needed for SEO
 * @returns {boolean}
 */
export default function hasScrollSupport() {
  let supports = true;
  if (process.client) {
    supports = ('onscroll' in window) && !(/(gle|ing)bot/.test(navigator.userAgent));
  }
  return supports;
}
