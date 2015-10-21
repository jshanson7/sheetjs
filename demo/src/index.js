import { map, range, times } from 'lodash';
import $ from 'jquery';
import StyleSheet from '../../StyleSheet';

window.sheetjs = { StyleSheet };
const styleSheet = new StyleSheet({
  'html, body': { margin: '0px' },
  '.button-bank': { margin: '20px' },
  '.button-bank > *': { margin: '0 14px 14px 0' },
  '.demo-el-container': { margin: '20px' }
});
const s = styleSheet.stylesForSelector;

// state
let demoElClass = 'demo-el';
let isToggled = false;
let numberOfEls = 1000;
let toggleColor1 = '#EFEFEF';
let toggleColor2 = 'lightGreen';
let numberOfTimesToToggle = 101;
let selectedLibrary = 'SheetJS';

init();

function init() {
  updateDemoElStyles();
  $('body').html(renderDemo());
  $('input, select').on('keyup change', inputChanged);
}

function toggleElements() {
  const $toggleStatus = $('.toggle-status').empty();
  const timestamp = Date.now();
  const toggler = selectedLibrary === 'SheetJS' ? toggleWithSheetjs : toggleWithJquery;

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
  styleSheet.setStylesForSelectors({
    ['.' + demoElClass]: {
      float: 'left',
      margin: '2px',
      border: '1px solid black',
      height: '10px',
      width: '10px',
      backgroundColor: isToggled ? toggleColor2 : toggleColor1,
    }
  });
}

function updateDemoEls() {
  $('.demo-el-container')
    .empty()
    .html(renderDemoEls());
}

function renderDemoEls() {
  return map(range(numberOfEls), function () {
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
