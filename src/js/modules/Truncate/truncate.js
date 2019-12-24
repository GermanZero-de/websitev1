import ResizeObserver from 'resize-observer-polyfill';

/**
 *
 * @param elements {HTMLElement[]} Collection of elements to watch on
 * @constructor
 */
export default function TruncateText(elements = []) {
  const observer = new ResizeObserver((entries) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const entry of entries) {
      entry.target.classList.toggle('isTruncated', entry.target.scrollHeight > entry.contentRect.height);
    }
  });

  elements.forEach((el) => observer.observe(el));
}
