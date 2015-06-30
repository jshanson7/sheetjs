# SheetJS

Easily create and manipulate `CSSStyleDeclarations` with javascript.  Good for when you have multiple elements with a dynamic class, and you want a more efficient way to style them than with jQuery's `.css()`.

```javascript
var sheetjs = require('sheetjs');
var mySelector = '#content .my-dynamic-class';
var styleRef = sheetjs.createStyle(mySelector);

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