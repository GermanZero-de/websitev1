const CustomEventPoly = (name, data) => {
  // IE-way creation of custom event
  const customEvent = document.createEvent('CustomEvent');
  customEvent.initCustomEvent(name, false, false, data);
  return customEvent;
};

export default CustomEventPoly;
