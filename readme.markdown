# SheetJS

Easily create and manipulate `CSSStyleDeclarations` with javascript:

```javascript
var s = require('sheetjs').createStyle;

// changes background color for all current and future matching elements
s('#content .my-selector').backgroundColor = 'green';
```
Good for when you have a dynamic number of elements that need dynamic styling.

## jQuery .css() vs SheetJS

Imagine a web page with 1000 elements with class `my-el`, and you want to change their `background-color` to `green`.

Using jQuery:

```javascript
// changes background color for all current matching elements
$('.my-el').css('background-color', 'green')
// took ~10ms
// new elements will not be green
```

Using SheetJS:

```javascript
// changes background color for all current and future matching elements
s('.my-el').backgroundColor = 'green';
// took <1ms
// new elements will be green
```

## Demo

http://codepen.io/jshanson7/pen/Jdpdga?editors=001

## Installation

```
npm install sheetjs
```

Then reference either `dist/sheet.js` or `dist/sheet.min.js` in your html, or `require('sheetjs')` with Browserify.  If a module environment is not detected, `sheetjs` will be attached to `window`.

## API

```javascript
var sheetjs = require('sheetjs');

// createStyle - get CSSStyleDeclaration for selector (or create if it doesn't exist)
var styleDeclaration = sheetjs.createStyle('.my-el');
styleDeclaration.backgroundColor = 'green';

// deleteStyle - delete CSSStyleDeclaration for selector (removes all sheetjs rules for selector)
sheetjs.deleteStyle('.my-el'); // 'backgroundColor' is no longer green

// getStyle - get CSSStyleDeclaration for selector (returns undefined if it doesn't exist)
var styleDeclaration2 = sheetjs.getStyle('.new-selector');
styleDeclaration2 === undefined; // true

// disable - temporarily disables the stylesheet associated with sheetjs (and all generated styles)
sheetjs.disable();

// enable - enables the stylesheet associated with sheetjs (and all generated styles)
sheetjs.enable();
```

## Contributing

Clone repo, cd into it.

```
npm install
npm install -g gulp
```

### Development

```
gulp watch
```

### Production

```
gulp bundle --produciton
```

### License

MIT
