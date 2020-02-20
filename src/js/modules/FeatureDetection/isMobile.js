export default function isMobile() {
  return !!navigator.userAgent.toLowerCase().match(/mobile/i);
}
