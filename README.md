# clicken 🐓

Give `clicken` a function and it will return an onKeyPress handler. This is to comply with [accessibility standards for elements that are typically non-interactive](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md) (for example, `div`s and `span`s as opposed to `a`s and `button`s).

## Install

```
yarn add clicken
```

```
npm i --save clicken
```

## Usage

```js
import clicken from 'clicken'

const emptyObject = clicken(undefined) // returns {}
const empty = clicken.onKeyPress(false) // returns undefined

const events = clicken((e) => { console.log(e) }) // returns { onClick, onKeyPress }, onClick === the passed function
const keyPressOnly = clicken.onKeyPress((e) => { console.log(`Pressed '${e.key}'`) }) // returns function

const eventsKeyPressDefaultPrevented = clicken(() => { console.log('No page jumps!') }, true) // returns { onClick, onKeyPress }, where onKeyPress auto-calls e.preventDefault() to stop page jumps
const keyPressDefaultPrevented = clicken.onKeyPress(() => { console.log('No page jumps!') }, true) // returns function which auto-calls e.preventDefault() to stop page jumps
```

## Examples

```js
import React from 'react'
import clicken from 'clicken'

const AlertButton = ({ text }) => (
  <div
    className='button--alert'
    tabIndex='0'
    role='button'
    {...clicken(() => { window.alert(text) })}
  >
    Alert!
  </div>
)

export default AlertButton
```

This would create an element that would perform an alert on click and on pressing the enter or space button when focused on the element.

This is equivalent to the following:

```js
import React from 'react'
import clicken from 'clicken'

const AlertButton = ({ text }) => {
  const onClick = () => { window.alert(text) }
  const onKeyPress = clicken.onKeyPress(() => { window.alert(text) })
  return (
    <div
      className='button--alert'
      tabIndex='0'
      role='button'
      onClick={onClick}
      onKeyPress={onKeyPress}
    >
      Alert!
    </div>
  )
}

export default AlertButton
```

## Why return `onClick`?

The returned `onClick` is exactly the same as the passed function, so what's the point in returning it? It's basically just there as a shortcut for React and other frameworks that use JSX so a developer can define the onClick and onKeyPress in one function call.

This:
```js
return <div {...clicken(() => { console.log('event') })} />
```

is simpler than this:
```js
const onClick = () => { console.log('event') }
const onKeyPress = clicken.onKeyPress(fn)
return <div onClick={onClick} onKeyPress={onKeyPress} />
```

However, `clicken.onKeyPress` has its uses, especially when interacting with non-JSX frameworks such as jQuery:
```js
const onClick = () => { console.log('event') }
const onKeyPress = clicken.onKeyPress(onClick)
$('div').click(onClick).keypress(onKeyPress);
```

## License

MIT © James Anthony Bruno