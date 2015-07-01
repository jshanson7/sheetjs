# SheetJS

Easily create and manipulate `CSSStyleDeclarations` with javascript.  Good for when you have multiple elements with a dynamic class, and you want a more efficient way to style them than with the `style` attribute or jQuery's `.css()`.

```javascript
var s = require('sheetjs').createStyle;
var styleRef = s('#content .my-dynamic-class');

// changes background color for all current and future matching elements
styleRef.backgroundColor = 'green';

```

## Installation

`npm install sheetjs`

Then reference either `dist/sheet.js` or `dist/sheet.min.js` in your html, or `require('sheetjs')` with Browserify.  If a module environment is not detected, `sheetjs` will be attached to `window`.


## Contributing

Clone repo, cd into it.

```
npm install
npm install -g gulp
gulp bunlde
```

### Development

```
gulp watch
```

### Production

```
gulp bundle --produciton
```
