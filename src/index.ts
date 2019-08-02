type Falsey = false | null | undefined | 0
type EventHandler = (ev: any) => any

/**
 * Constructs onKeyPress event targeted towards pressing Enter or Space.
 * @param {Function} [fn] - Event handler. If falsy, returns `undefined`,
 * @param {boolean} [preventDefault] - Calls `preventDefault` on the event. This prevents jumping down the page due to the default nature of pressing space or enter.
 * @returns {(Function|undefined)}
 * @example <div onClick={fn} onKeyPress={clicken.onKeyPress(fn)} />
 * @example jQuery('.element').keypress(clicken.onKeyPress(fn))
 */
function onKeyPress (fn: Falsey, preventDefault?: boolean): void
function onKeyPress (fn: EventHandler, preventDefault?: boolean): EventHandler
function onKeyPress (fn: Falsey | EventHandler, preventDefault: boolean = false): void | EventHandler {
  if (fn && typeof fn === 'function') {
    const keypress: EventHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar' || e.which === 13 || e.which === 32) {
        if (preventDefault === true && typeof e.preventDefault === 'function') {
          e.preventDefault()
        }
        return fn(e)
      }
    }
    return keypress
  }
}

/**
 * @typedef {Object} ClickenEvents
 * @property {Function} [onClick] - The onClick handler. Exactly the same as what was passed in.
 * @property {Function} [onKeyPress] - The onKeyPress handler. Listens to Space and Enter events to trigger the passed function. Optionally calls `e.preventDefault` based on settings
 */
 interface ClickenEvents {
   onClick: EventHandler,
   onKeyPress: EventHandler
 }

/**
 * Returns onClick and onKeyPress events for accessibility in projects dealing with DOM elements.
 * @param {Function} [fn] - Event handler. If falsy, returns empty object.
 * @param {boolean} [preventDefaultOnKeyPress] - Calls `preventDefault` on the keypress event. This prevents jumping down the page due to the default nature of pressing space or enter.
 * @returns {ClickenEvents}
 * @example <div {...clicken((e) => { console.log(e) })} />
 */
function clicken (fn: Falsey, preventDefaultOnKeyPress?: boolean): {}
function clicken <T extends MouseEvent | KeyboardEvent>(fn: EventHandler, preventDefaultOnKeyPress?: boolean): ClickenEvents
function clicken <T extends MouseEvent | KeyboardEvent>(fn: Falsey | EventHandler, preventDefaultOnKeyPress: boolean = false): {} | ClickenEvents {
  if (fn && typeof fn === 'function') {
    return {
      onClick: fn,
      onKeyPress: onKeyPress(fn, preventDefaultOnKeyPress)
    }
  }
  return {}
}
clicken.onKeyPress = onKeyPress

export default clicken
