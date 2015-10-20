# SheetJS [![NPM version][npm-image]][npm-url] [![Build status][travis-image]][travis-url]

Easily create and manipulate `CSSStyleDeclarations` with javascript:

```javascript
import { StyleSheet } from 'sheetjs';
// or
const { StyleSheet } = window.sheetjs;

const styleSheet = new StyleSheet();
const s = styleSheet.stylesForSelector;

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

Then reference either `dist/sheet.js` or `dist/sheet.min.js` in your html, or `import 'sheetjs'`.  If a module environment is not detected, `sheetjs` will be exported to `window.sheetjs`.

## Advanced Usage

```javascript
import StyleSheet from 'sheetjs/StyleSheet';

const styleSheet = new StyleSheet({
  'html, body': {
    margin: 0,
    padding: 0
  },
  '.my-el': {
    backgroundColor: 'green'
  },
  '.my-el:hover': {
    backgroundColor: 'blue'
  }
});

```

## API

```javascript
import StyleSheet from 'sheetjs/StyleSheet';

const styleSheet = new StyleSheet();
const s = styleSheet.stylesForSelector;

// stylesForSelector - get CSSStyleDeclaration for selector (or create if it doesn't exist)
const styleDeclaration = styleSheet.stylesForSelector('.my-el');
styleDeclaration.backgroundColor = 'green';

// deleteStylesForSelector - delete CSSStyleDeclaration for selector
styleSheet.deleteStylesForSelector('.my-el'); // 'backgroundColor' is no longer green

// getStylesForSelector - get existing CSSStyleDeclaration for selector
const styleDeclaration2 = styleSheet.getStylesForSelector('.doesnt-exist');
styleDeclaration2 === undefined; // true

// disable - disables the stylesheet (and all generated styles)
styleSheet.disable();

// enable - enables the stylesheet (and all generated styles)
styleSheet.enable();
```

## Contributing

Clone repo, cd into it.

```
npm install && npm start
```

### Building

```
npm run build
```

### Testing

[Run the tests on your browser here.](https://rawgit.com/jshanson7/sheetjs/master/test/test.html)

```
npm test && npm run test-browser
```

### License

MIT

[npm-image]: https://badge.fury.io/js/sheetjs.svg
[npm-url]: https://npmjs.org/package/sheetjs
[travis-image]: https://travis-ci.org/jshanson7/sheetjs.svg
[travis-url]: https://travis-ci.org/jshanson7/sheetjs