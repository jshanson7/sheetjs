'use strict';
;(function (window, undefined) {

  var _ = window._ = require('lodash');
  var $ = window.$ = require('../../node_modules/jquery/dist/jquery.js');
  var sheetjs = window.sheetjs = require('../../src/sheet.js');

  var bodyStyles = sheetjs.createStyle('body');
  var buttonBankStyles = sheetjs.createStyle('.button-bank');
  var buttonBankItemStyles = sheetjs.createStyle('.button-bank span, .button-bank input, .button-bank button');

  _.extend(bodyStyles, {
    'margin': '10px'
  });

  _.extend(buttonBankStyles, {
    'margin': '30px 0px'
  });

  _.extend(buttonBankItemStyles, {
    'marginRight': '10px'
  });

  
  var demoElClass = 'demo-el';
  var demoElSelector = '.' + demoElClass;
  var isToggled = false;
  var numberOfEls = 10000;
  var toggleColor1 = '#EFEFEF';
  var toggleColor2 = 'lightGreen';
  var numberOfTimesToToggle = 10;

  function createDemoElStyles() {
    var demoElStyles = sheetjs.createStyle(demoElSelector);
    _.extend(demoElStyles, {
      'float': 'left',
      'margin': '2px',
      'border': '1px solid black',
      'height': '10px',
      'width': '10px',
      'backgroundColor': '#EFEFEF',
    });
  }

  function renderDemoEls() {
    createDemoElStyles();
    $('.demo-el-container').empty().html(
      _.map(_.range(numberOfEls), function (i) {
        return $('<div/>', { 
          class: demoElClass
        });
      })
    );
  }

  function toggleWithSheetjs() {
    isToggled = !isToggled;
    var timestamp = Date.now();
    var demoElStyles = sheetjs.getStyle(demoElSelector);
    _.times(numberOfTimesToToggle, function () {
      demoElStyles.backgroundColor = isToggled ? toggleColor2 : toggleColor1; 
    });
    $('.time-of-toggle').html( (Date.now() - timestamp) + 'ms' )
  }

  function toggleWithJquery() {
    isToggled = !isToggled;
    var timestamp = Date.now();
    var $demoEls = $(demoElSelector);
    _.times(numberOfTimesToToggle, function () {
      $demoEls.css('background-color', isToggled ? toggleColor2 : toggleColor1);
    });    
    $('.time-of-toggle').html( (Date.now() - timestamp) + 'ms' )
  }

  function reset() {
    isToggled = false;
    numberOfEls = parseInt( $('.number-of-els').val() );
    demoElClass = $('.demo-el-class').val();
    demoElSelector = '.' + demoElClass;
    toggleColor1 = $('.color-1').val();
    toggleColor2 = $('.color-2').val();
    numberOfTimesToToggle = parseInt( $('.toggle-count').val() );
    sheetjs.getStyle(demoElSelector).backgroundColor = toggleColor1;
    $('.time-of-toggle').html('');
    renderDemoEls();
  }

  $('body').html(
    [].concat(
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
          $('<span/>', {
            html: 'Element class:'
          }),
          $('<input/>', {
            type: 'text',
            class: 'demo-el-class',
            value: demoElClass
          }),
          $('<span/>', {
            html: 'Color 1:'
          }),
          $('<input/>', {
            type: 'text',
            class: 'color-1',
            value: toggleColor1
          }),
          $('<span/>', {
            html: 'Color 2:'
          }),
          $('<input/>', {
            type: 'text',
            class: 'color-2',
            value: toggleColor2
          }),
          $('<span/>', {
            html: 'Toggle count:'
          }),
          $('<input/>', {
            type: 'text',
            class: 'toggle-count',
            value: numberOfTimesToToggle
          }),
          $('<button/>', {
            class: 'reset',
            html: 'Update',
            on: {
              'click': reset
            }
          })
        ]
      }),
      $('<div/>', {
        class: 'button-bank',
        html: [
          $('<button/>', {
            class: 'toggle-sheetjs',
            html: 'Toggle with Sheetjs',
            on: {
              'click': toggleWithSheetjs
            }
          }),
          $('<button/>', {
            class: 'toggle-jquery',
            html: 'Toggle with jQuery',
            on: {
              'click': toggleWithJquery
            }
          }),
          $('<span/>', {
            class: 'time-of-toggle',
            html: ''
          })
        ]
      }),
      $('<div/>', {
        class: 'demo-el-container'
      })
    )
  );

  renderDemoEls();

})(window);
