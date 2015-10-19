# SheetJS

Easily create and manipulate `CSSStyleDeclarations` with javascript:

```javascript
var styleSheet = new sheetjs.StyleSheet();
var s = styleSheet.stylesForSelector;

// changes background color for all current and future matching elements
s('#content .my-selector').backgroundColor = 'green';
```
Good for when you have a dynamic number of elements that need dynamic styling.

## jQuery .css() vs SheetJS

Imagine a web page with 1000 elements with class `my-el`, and you want to change their `background-color` to `green`.

Using jQuery:

```javascript
// changes background color for all current matching elements
$('.my-el').css('background-color', 'green');
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

[http://codepen.io/jshanson7/pen/Jdpdga?editors=001](http://codepen.io/jshanson7/pen/Jdpdga?editors=001)

## Installation

```
npm install sheetjs
```

Then reference either `dist/sheet.js` or `dist/sheet.min.js` in your html, or `require('sheetjs')` with Browserify.  If a module environment is not detected, `sheetjs` will be attached to `window`.

## API

```javascript
var StyleSheet = require('sheetjs').StyleSheet;
// or
var StyleSheet = window.sheetjs.StyleSheet;

var styleSheet = new StyleSheet();
var s = styleSheet.stylesForSelector;

// stylesForSelector - get CSSStyleDeclaration for selector (or create if it doesn't exist)
var styleDeclaration = styleSheet.stylesForSelector('.my-el');
styleDeclaration.backgroundColor = 'green';

// deleteStylesForSelector - delete CSSStyleDeclaration for selector
styleSheet.deleteStylesForSelector('.my-el'); // 'backgroundColor' is no longer green

// getStylesForSelector - get existing CSSStyleDeclaration for selector
var styleDeclaration2 = styleSheet.getStylesForSelector('.doesnt-exist');
styleDeclaration2 === undefined; // true

// disable - disables the stylesheet (and all generated styles)
styleSheet.disable();

// enable - enables the stylesheet (and all generated styles)
styleSheet.enable();
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
gulp bundle --production
```

### License

MIT
