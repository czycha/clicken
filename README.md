# clicken 🐓

Give `clicken` a function and it will return an onClick and an onKeyPress handler. The onClick is exactly your function, while the onKeyPress executes the function on pressing enter or space. This is to comply with [accessibility standards for elements that are typically non-interactive](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md) (for example, `div`s and `span`s as opposed to `a`s and `button`s).

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

const events = clicken((e) => { console.log(e) }) // returns { onClick, onKeyPress}
const emptyObject = clicken(undefined) // returns {}
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
	>Alert!</div>
)

export default AlertButton
```

This would create an element that would perform an alert on click and on pressing the enter or space button when focused on the element.

This is equivalent to the following:

```js
import React from 'react'
import clicken from 'clicken'

const AlertButton = ({ text }) => {
	const { onClick, onKeyPress } = clicken(() => { window.alert(text) })
	return (
		<div
			className='button--alert'
			tabIndex='0'
			role='button'
			onClick={onClick}
			onKeyPress={onKeyPress}
		>Alert!</div>
	)
}

export default AlertButton
```

## License

MIT © James Anthony Bruno