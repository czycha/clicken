"use strict";

/**
 * @typedef {Object} Events
 * @property {Function} [onClick] - The onClick handler. Exactly the same as what was passed in.
 * @property {Function} [onKeyPress] - The onKeyPress handler. Listens to Space and Enter events to trigger the passed function. Optionally calls `e.preventDefault` based on settings
 */

/**
 * Returns onClick and onKeyPress events for accessibility in projects dealing with DOM elements.
 * @param {Function} [fn] - Event handler. If falsy, returns empty object.
 * @param {boolean} [preventDefaultOnKeyPress] - Calls `preventDefault` on the keypress event. This prevents jumping down the page due to the default nature of pressing space or enter.
 * @returns {Events}
 * @example <div {...clicken((e) => { console.log(e) })} />
 */
function clicken(fn, preventDefaultOnKeyPress) {
  if (fn) {
    return {
      onClick: fn,
      onKeyPress: clicken.onKeyPress(fn, preventDefaultOnKeyPress)
    };
  }
  return {};
}

/**
 * Constructs onKeyPress event targeted towards pressing Enter or Space.
 * @param {Function} [fn] - Event handler. If falsy, returns `undefined`,
 * @param {boolean} [preventDefault] - Calls `preventDefault` on the event. This prevents jumping down the page due to the default nature of pressing space or enter.
 * @returns {(Function|undefined)}
 * @example <div onClick={fn} onKeyPress={clicken.onKeyPress(fn)} />
 */
clicken.onKeyPress = function (fn, preventDefault) {
  if (fn) {
    return function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.which === 13 || e.which === 32) {
        if (preventDefault === true) {
          e.preventDefault();
        }
        fn(e);
      }
    }
  }
};

module.exports = clicken;