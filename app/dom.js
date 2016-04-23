export function addReadyListener(callback) {
  if (document.readyState === "complete") {
    setTimeout(callback, 1);
  } else {
    window.addEventListener('load', callback, false);
  }
};

export function getTouchEventName(eventName) {
  var isIE11Touch = window.navigator.pointerEnabled;
  var isIE10Touch = window.navigator.msPointerEnabled;
  var isStandardTouch = 'ontouchend' in document.documentElement;

  var key;
  if (isIE11Touch) {
    key = "ie11";
  } else if (isIE10Touch) {
    key = "ie10";
  } else if (isStandardTouch) {
    key = "standard";
  }
  if (key && TOUCH_MAP[eventName]) {
    return TOUCH_MAP[eventName][key];
  }
};

var addEvent = function (element, eventName, handler) {
  // Scope bound event map to this addEvent call - we only provide for unbinding
  // what we bind right here.
  var boundEvents = {};

  var bindEvent = function (type, eventName, handler) {
    element.addEventListener(eventName, handler, false);
    boundEvents[type] = { name: eventName, handler: handler };
  };

  var unbindEvent = function (type) {
    var eventInfo = boundEvents[type];
    if (eventInfo) {
      element.removeEventListener(eventInfo.name, eventInfo.handler);
      delete boundEvents[type];
    }
  };

  // Add click handler
  bindEvent('click', eventName, handler);

  // Optionally add touch handler
  var touchEvent = exports.getTouchEventName(eventName);
  if (touchEvent) {
    bindEvent('touch', touchEvent, function (e) {
      // Stop mouse events and suppress default event handler to prevent
      // unintentional double-clicking
      e.preventDefault();
      unbindEvent('click');
      handler.call(this, e);
    });
  }

  // Return function that unbinds all handlers
  return function () {
    unbindEvent('click');
    unbindEvent('touch');
  };
};

export function addMouseDownTouchEvent(element, handler) {
  return addEvent(element, 'mousedown', handler);
};

export function addMouseUpTouchEvent(element, handler) {
  return addEvent(element, 'mouseup', handler);
};

export function addMouseMoveTouchEvent(element, handler) {
  return addEvent(element, 'mousemove', handler);
};

export function addClickTouchEvent(element, handler) {
  return addEvent(element, 'click', handler);
};

// A map from standard touch events to various aliases.
var TOUCH_MAP = {
  //  Incomplete list, add as needed.
  click: {
    standard: 'touchstart',
    ie10: 'MSPointerDown',
    ie11: 'pointerdown'
  },
  mousedown: {
    standard: 'touchstart',
    ie10: 'MSPointerDown',
    ie11: 'pointerdown'
  },
  mouseup: {
    standard: 'touchend',
    ie10: 'MSPointerUp',
    ie11: 'pointerup'
  },
  mousemove: {
    standard: 'touchmove',
    ie10: 'MSPointerMove',
    ie11: 'pointermove'
  }
};

export function isMobile() {
  var reg = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/;
  return reg.test(window.navigator.userAgent);
};

export function isWindowsTouch() {
  var reg = /MSIE.*Touch/;
  return reg.test(window.navigator.userAgent);
};

export function isAndroid() {
  var reg = /Android/;
  return reg.test(window.navigator.userAgent);
};

export function isIOS() {
  var reg = /iP(hone|od|ad)/;
  return reg.test(window.navigator.userAgent);
};

export function isIPad() {
  var reg = /iPad/i;
  return reg.test(window.navigator.userAgent);
};
