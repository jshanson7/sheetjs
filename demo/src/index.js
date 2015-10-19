import { extend, map, range, times } from 'lodash';
import $ from 'jquery';
import StyleSheet from '../../dist/StyleSheet.js';

window.sheetjs = { StyleSheet };
const s = (new StyleSheet()).stylesForSelector;

// state
var demoElClass = 'demo-el';
var isToggled = false;
var numberOfEls = 1000;
var toggleColor1 = '#EFEFEF';
var toggleColor2 = 'lightGreen';
var numberOfTimesToToggle = 101;
var selectedLibrary = 'SheetJS';

init();

function init() {
  s('html, body').margin = '0px';
  s('.button-bank').margin = '20px'
  s('.button-bank > *').margin = '0 14px 14px 0';
  s('.demo-el-container').margin = '20px';

  updateDemoElStyles();
  $('body').html(renderDemo());
  $('input, select').on('keyup change', inputChanged);
}

function toggleElements() {
  var $toggleStatus = $('.toggle-status').empty();
  var timestamp = Date.now();
  var toggler = selectedLibrary === 'SheetJS' ? toggleWithSheetjs : toggleWithJquery;
  
  times(numberOfTimesToToggle, toggler);
  $toggleStatus.html(
    '<span>' + numberOfTimesToToggle + ' toggles with <em>' +
    selectedLibrary + '</em>: <strong>' + (Date.now() - timestamp) +
    'ms</strong></span>'
  );
}

function toggleWithSheetjs() {
  isToggled = !isToggled;
  s('.' + demoElClass).backgroundColor = isToggled ? toggleColor2 : toggleColor1;
}

function toggleWithJquery() {
  isToggled = !isToggled;
  $('.' + demoElClass).css('background-color', isToggled ? toggleColor2 : toggleColor1);
}

function inputChanged() {
  $('.update-settings').attr('disabled', false);
  $('.toggle-elements').attr('disabled', true);
}

function updateSettings() {
  // isToggled = false;
  numberOfEls = parseInt( $('.number-of-els').val() );
  demoElClass = $('.demo-el-class').val();
  toggleColor1 = $('.color-1').val();
  toggleColor2 = $('.color-2').val();
  numberOfTimesToToggle = parseInt( $('.toggle-count').val() );
  selectedLibrary = $('.library-select').val();
  s('.' + demoElClass).backgroundColor = toggleColor1;
  
  $('.update-settings').attr('disabled', true);
  $('.toggle-elements').attr('disabled', false);
  $('.toggle-status').html('');
  updateDemoElStyles();
  updateDemoEls();
}

function updateDemoElStyles() {
  var demoElStyles = s('.' + demoElClass);
  extend(demoElStyles, {
    'float': 'left',
    'margin': '2px',
    'border': '1px solid black',
    'height': '10px',
    'width': '10px',
    'backgroundColor': isToggled ? toggleColor2 : toggleColor1,
  });
}

function updateDemoEls() {
  $('.demo-el-container')
    .empty()
    .html(renderDemoEls());
}

function renderDemoEls() {
  return map(range(numberOfEls), function (i) {
    return $('<div/>', { 
      class: demoElClass
    });
  });
}

function renderDemo() {
  return [
    $('<div/>', {
      class: 'button-bank',
      html: [
        $('<span/>', {
          html: 'Number of elements:'
        }),
        $('<input/>', {
          type: 'text',
          class: 'number-of-els',
          value: numberOfEls
        }),
        $('<br/>'),
        $('<span/>', {
          html: 'Dynamic element class:'
        }),
        $('<input/>', {
          type: 'text',
          class: 'demo-el-class',
          value: demoElClass
        }),
        $('<br/>'),
        $('<span/>', {
          html: 'Color 1:'
        }),
        $('<input/>', {
          type: 'text',
          class: 'color-1',
          value: toggleColor1
        }),
        $('<br/>'),
        $('<span/>', {
          html: 'Color 2:'
        }),
        $('<input/>', {
          type: 'text',
          class: 'color-2',
          value: toggleColor2
        }),
        $('<br/>'),
        $('<span/>', {
          html: '# of times to toggle color:'
        }),
        $('<input/>', {
          type: 'text',
          class: 'toggle-count',
          value: numberOfTimesToToggle
        }),
        $('<br/>'),
        $('<select/>', {
          class: 'library-select',
          value: selectedLibrary,
          html: [
            $('<option/>', {
              value: 'SheetJS',
              html: 'Toggle with Sheetjs'
            }),
            $('<option/>', {
              value: 'jQuery',
              html: 'Toggle with jQuery'
            })
          ]
        }),
        $('<br/>'),
        $('<button/>', {
          class: 'update-settings',
          disabled: true,
          html: 'Update Settings',
          on: {
            click: updateSettings
          }
        }),
        $('<button/>', {
          class: 'toggle-elements',
          html: 'Toggle',
          on: {
            click: toggleElements
          }
        }),
        $('<span/>', {
          class: 'toggle-status',
          html: ''
        })
      ]
    }),
    $('<hr/>'),
    $('<div/>', {
      class: 'demo-el-container',
      html: renderDemoEls()
    })
  ];
}
