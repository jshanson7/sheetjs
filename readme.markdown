# SheetJS

Easily create and manipulate `CSSStyleDeclaration`s with javascript:

```javascript
var s = require('sheetjs').createStyle;

// changes background color for all current and future matching elements
s('#content .my-selector').backgroundColor = 'green';
```
Good for when you have multple elements that need dynamic styling.

## jQuery `.css()` vs SheetJS

Imagine a web page with 1000 elements with class `my-el`, and you want to change their `background-color` to `green`.

Using jQuery:

```javascript
// changes background color for all current matching elements (new elements will not be green)
$('.my-el').css('background-color', 'green')
// took ~10ms
```

Using SheetJS:

```javascript
// changes background color for all current AND future matching elements
s('.my-el').backgroundColor = 'green';
// took <1ms
```

## Demo

http://codepen.io/jshanson7/pen/Jdpdga?editors=001

## Installation

```
npm install sheetjs
```

Then reference either `dist/sheet.js` or `dist/sheet.min.js` in your html, or `require('sheetjs')` with Browserify.  If a module environment is not detected, `sheetjs` will be attached to `window`.


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
