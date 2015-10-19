//  // CSSStyleSheet:
//  {
//    // CSSRuleList
//    rules: [
//      // CSSStyleRule:
//      {
//        // CSSStyleDeclaration:
//        style: {
//          backgroundColor: 'red'
//        }
//      }
//    ]
//  }

let instanceCount = 0;

export default class StyleSheet {
  constructor(stylesBySelector) {
    // bind context of public methods
    const self = this;
    [
      'setStylesForSelectors',
      'setStylesForSelector',
      'stylesForSelector',
      'createStylesForSelector',
      'getStylesForSelector',
      'deleteStylesForSelector',
      'disable',
      'enable'
    ].forEach(method => self[method] = self[method].bind(self));

    if (stylesBySelector) {
      this.setStylesForSelectors(stylesBySelector);
    }
  }

  _instance = instanceCount++
  _styleSheet = null
  _sheet = null
  _rules = null

  setStylesForSelectors(stylesBySelector) {
    Object.keys(stylesBySelector).forEach(selector =>
      this.setStylesForSelector(selector, stylesBySelector[selector])
    );
    return this;
  }

  setStylesForSelector(selector, styles) {
    Object.assign(this.stylesForSelector(selector), styles);
    return this;
  }

  // returns a CSSStyleDeclaration
  stylesForSelector(selector) {
    return this.getStylesForSelector(selector) ||
      this.createStylesForSelector(selector);
  }

  createStylesForSelector(selector) {
    const sheet = this._getSheet();
    const rules = this._getRules();
    const nextRuleIndex = rules.length;
    const ruleText = selector + ' { }';

    // insert ruleText to generate a CSSStyleDeclaration object as a byproduct
    sheet.insertRule(ruleText, nextRuleIndex);

    return rules.item(nextRuleIndex).style;
  }

  getStylesForSelector(selector) {
    const rule = this._getRule(selector);
    return rule ? rule.style : undefined;
  }

  deleteStylesForSelector(selector) {
    const sheet = this._getSheet();
    const deleteRule = sheet.removeRule || sheet.deleteRule;
    const ruleIndex = this._getRuleIndex(selector);

    return ruleIndex === -1 ?
      false :
      deleteRule.call(sheet, ruleIndex);
  }

  disable() {
    this._getSheet().disabled = true;
    return this;
  }

  enable() {
    this._getSheet().disabled = false;
    return this;
  }

  _getRuleIndex(selector) {
    const rules = this._getRules();
    const rule = this._getRule(selector);

    return Array.prototype.indexOf.call(rules, rule);
  }

  _getRule(selector) {
    const rules = this._getRules();
    const il = rules.length;
    let i = 0;

    for (; i < il; i++) {
      if (rules[i].selectorText === selector) {
        return rules[i];
      }
    }

    return undefined;
  }

  _getSheet() {
    return this._sheet || (function () {
      return this._sheet = this._getStylesForSelectorsheet().sheet;
    }).call(this);
  }

  _getRules() {
    return this._rules || (function () {
      const sheet = this._getSheet();
      return this._rules = sheet.cssRules || sheet.rules;
    }).call(this);
  }

  _getStylesForSelectorsheet() {
    return this._styleSheet || (function () {
      const style = document.createElement('style');
      const head = document.head || document.getElementsByTagName('head')[0];
      style.type = 'text/css';
      style.setAttribute('id', 'sheetjs-' + this._instance);
      (head).appendChild(style);
      return this._styleSheet = style;
    }).call(this);
  }
}
