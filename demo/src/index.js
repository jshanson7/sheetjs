'use strict';
var _ = require('lodash');
var $ = require('../../node_modules/jquery/dist/jquery.js');
var s = require('../../src/sheet.js').createStyle;

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
  var bodyStyles = s('body');
  var buttonBankStyles = s('.button-bank');
  var buttonBankItemStyles = s(
    [
      '.button-bank span',
      '.button-bank input',
      '.button-bank button',
      '.button-bank select',
    ].join(', ')
  );
  var demoElContainerStyles = s('.demo-el-container');

  bodyStyles.margin = '0px';
  buttonBankStyles.margin = '20px';
  buttonBankItemStyles.margin = '0 14px 14px 0';
  demoElContainerStyles.margin = '20px';

  updateDemoElStyles();
  $('body').html(renderDemo());
  $('input, select').on('keyup change', inputChanged);
}

function toggleElements() {
  var $toggleStatus = $('.toggle-status').empty();
  var timestamp = Date.now();
  var toggler = selectedLibrary === 'SheetJS' ? toggleWithSheetjs : toggleWithJquery;
  
  _.times(numberOfTimesToToggle, toggler);
  $toggleStatus.html(
    '<span>' + numberOfTimesToToggle + ' toggles with <em>' +
    selectedLibrary + '</em>: <strong>' + (Date.now() - timestamp) +
    'ms</strong></span>'
  );
}

function toggleWithSheetjs() {
  isToggled = !isToggled;
  var demoElStyles = s('.' + demoElClass);
  demoElStyles.backgroundColor = isToggled ? toggleColor2 : toggleColor1;
  
}

function toggleWithJquery() {
  isToggled = !isToggled;
  var $demoEls = $('.' + demoElClass);
  $demoEls.css('background-color', isToggled ? toggleColor2 : toggleColor1);
}

function inputChanged() {
  $('.update-settings').attr('disabled', false);
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
  $('.toggle-status').html('');
  updateDemoElStyles();
  updateDemoEls();
}

function updateDemoElStyles() {
  var demoElStyles = s('.' + demoElClass);
  _.extend(demoElStyles, {
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
  return _.map(_.range(numberOfEls), function (i) {
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
        })
      ]
    }),
    $('<hr/>'),
    $('<div/>', {
      class: 'button-bank',
      html: [
        $('<button/>', {
          class: 'toggle-sheetjs',
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
    $('<div/>', {
      class: 'demo-el-container',
      html: renderDemoEls()
    })
  ];
}
