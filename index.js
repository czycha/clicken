"use strict";

/**
 * Returns onClick and onKeyPress events for accessibility in React projects
 * @param {Function} fn
 * @returns {?onClick: Function, ?onKeyPress: Function}
 * @example <div {...clicken((e) => { console.log(e) })} />
 */
function clicken(fn) {
  if(fn) {
    return {
      onClick: fn,
      onKeyPress: function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          fn(e)
        }
      }
    }
  }
  return {}
}

module.exports = clicken;