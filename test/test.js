import assert from 'assert';
import { range, isFunction, omit, sample } from 'lodash';
import $ from 'jquery';
import Color from 'color';
import colors from 'material-colors';
import sheetjs from '../';
import StyleSheet from '../StyleSheet';

const isBrowser = process.browser === true;
const testCount = 100;
const $testEls = isBrowser ? range(testCount).map(() => $('<ul/>', { class: `test-element` }) ) : null;
const $testElements = isBrowser ? $('<ul/>', { class: 'test-elements' }) : null;

if (isBrowser) { $testElements.html($testEls).prependTo('#mocha'); }

describe('mocha', () => it('is working', () => assert(true)));

describe('sheetjs', () => {
  it('has .StyleSheet', () => assert(isFunction(isBrowser ? window.sheetjs.StyleSheet : sheetjs.StyleSheet)));

  if (isBrowser) {
    it('is availaible on window', () => assert(window.sheetjs !== undefined));
  }
});

describe('StyleSheet', () => {
  const styleSheet = new StyleSheet();

  if (isBrowser) {
    describe('#setStylesForSelectors()', () => {
      styleSheet.setStylesForSelectors({
        '.test-elements': { display: 'flex', flexWrap: 'wrap' },
        '.test-element': { height: 20, width: 20 }
      });

      it('should style the test elements', () =>
        assert($('.test-elements').css('display') === 'flex')
      );

      it('should set backgroundColor', () => {
        $testEls.forEach(($el, i) => {
          const color = randomColor();
          styleSheet.setStylesForSelectors({
            [`.test-element:nth-child(${i + 1})`]: { backgroundColor: color }
          });
          assert($el.css('backgroundColor') === color);
        });
      });
    });
  }
});

function randomColor() {
  return new Color(sample(omit(colors, 'white', 'black'))['200']).rgbString();
}
