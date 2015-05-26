# SheetJS

Easily create and manipulate `CSSStyleDeclaration`s with javascript.  Good for when you have dynamic classes, and you don't want to style elements individually using jQuery `.css()`.

```javascript
var sheetjs = require('sheetjs');
var mySelector = '#content .my-dynamic-class';
var styleRef = sheetjs.createStyle(mySelector);

styleRef.backgroundColor = 'green';

```