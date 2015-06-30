# SheetJS

Easily create and manipulate `CSSStyleDeclarations` with javascript.  Good for when you have multiple elements with a dynamic class, and you want a more efficient way to style them than with the `style` attribute or jQuery's `.css()`.

```javascript
var s = require('sheetjs').createStyle;
var styleRef = s('#content .my-dynamic-class');

// changes background color for all current and future matching elements in the DOM
styleRef.backgroundColor = 'green';

```

## Installation

```
npm install
npm install -g gulp
gulp bundle --produciton
```

## Development

```
gulp watch
```