/* global $, Applab */

import * as elementUtils from './elementUtils';

/**
 * A map from prefix to the next numerical suffix to try to
 * use as an id in the applab app's DOM.
 * @type {Object.<string, number>}
 */
var nextElementIdMap = {};

/**
 * @readonly
 * @enum {string}
 */
var ElementType = {
  BUTTON: 'BUTTON',
  LABEL: 'LABEL',
  TEXT_INPUT: 'TEXT_INPUT',
  CHECKBOX: 'CHECKBOX',
  DROPDOWN: 'DROPDOWN',
  RADIO_BUTTON: 'RADIO_BUTTON',
  TEXT_AREA: 'TEXT_AREA',
  IMAGE: 'IMAGE',
  CANVAS: 'CANVAS',
  SCREEN: 'SCREEN',
  CHART: 'CHART',
  SLIDER: 'SLIDER'
};

import * as _buttonElement from './button';
import * as _labelElement from './label';
import * as _textInputElement from './textInput';
import * as _checkboxElement from './checkbox';
import * as _dropdownElement from './dropdown';
import * as _radioButtonElement from './radioButton';
import * as _textAreaElement from './textarea';
import * as _imageElement from './image';
import * as _canvasElement from './canvas';
import * as _screenElement from './screen';
import * as _chartElement from './chart';
import * as _sliderElement from './slider';

var elements = {};
elements[ElementType.BUTTON] = _buttonElement;
elements[ElementType.LABEL] = _labelElement;
elements[ElementType.TEXT_INPUT] = _textInputElement;
elements[ElementType.CHECKBOX] = _checkboxElement;
elements[ElementType.DROPDOWN] = _dropdownElement;
elements[ElementType.RADIO_BUTTON] = _radioButtonElement;
elements[ElementType.TEXT_AREA] = _textAreaElement;
elements[ElementType.IMAGE] = _imageElement;
elements[ElementType.CANVAS] = _canvasElement;
elements[ElementType.SCREEN] = _screenElement;
elements[ElementType.CHART] = _chartElement;
elements[ElementType.SLIDER] = _sliderElement;

export default {
  ElementType: ElementType,
  /**
   * Returns an element id with the given prefix which is unused within
   * the applab app's DOM.
   * @param {string} prefix
   * @returns {string}
   */
  // TODO (brent) - the following seems a little bit strange to me:
  // 1) Add item1, item2, delete item1
  // 2) Add another item, it gets id item3
  // 3) Reload page, add another item, it gets item1
  // Seems a little like we should always get the lowest available (as in step 3)
  // or always get the next (as in step 2)
  getUnusedElementId: function (prefix) {
    var i = nextElementIdMap[prefix] || 1;
    while (elementUtils.getPrefixedElementById(prefix + i)) {
      i++;
    }
    nextElementIdMap[prefix] = i + 1;
    return prefix + i;
  },

  /**
   * Resets the next element id for all prefixes to be 1. Called after clearing
   * all design mode elements
   */
  resetIds: function () {
    nextElementIdMap = {};
  },

  /**
   * Create a new element of the specified type
   * @param {ElementType} elementType Type of element to create
   * @param {number} left Position from left.
   * @param {number} top Position from top.
   * @param {boolean} [withoutId] If true, don't generate an id
   */
  createElement: function (elementType, left, top, withoutId) {
    var elementClass = elements[elementType];
    if (!elementClass) {
      throw new Error('Unknown elementType: ' + elementType);
    }

    var element = elementClass.create(withoutId);

    // Stuff that's common across all elements
    if (!withoutId) {
      elementUtils.setId(element, this.getUnusedElementId(elementType.toLowerCase()));
    }

    if (elementType !== ElementType.SCREEN) {
      element.style.position = 'absolute';
      element.style.left = left + 'px';
      element.style.top = top + 'px';
      element.style.margin = '0px';
    }

    return element;
  },

  getElementPropertyTab: function (elementType) {
    return elements[elementType].PropertyTab;
  },

  getElementEventTab: function (elementType) {
    return elements[elementType].EventTab;
  },

  /**
   * @param {HTMLElement} element
   * @param {boolean?} allowUnknown If true, we won't throw on unknown element types
   * @returns {string} String representing elementType
   */
  getElementType: function (element, allowUnknown) {
    var tagname = element.tagName.toLowerCase();

    switch (tagname) {
      case 'button':
        return ElementType.BUTTON;
      case 'label':
        return ElementType.LABEL;
      case 'select':
        return ElementType.DROPDOWN;
      case 'div':
        if ($(element).hasClass('screen')) {
          return ElementType.SCREEN;
        } else if ($(element).hasClass('chart')) {
          return ElementType.CHART;
        }
        return ElementType.TEXT_AREA;
      case 'img':
        return ElementType.IMAGE;
      case 'canvas':
        return ElementType.CANVAS;
      case 'input':
        switch (element.getAttribute('type')) {
          case 'checkbox':
            return ElementType.CHECKBOX;
          case 'radio':
            return ElementType.RADIO_BUTTON;
          case 'range':
            return ElementType.SLIDER;
          default:
            return ElementType.TEXT_INPUT;
        }
    }
    // Unknown elements are expected. Return null because we don't know type.
    if (allowUnknown) {
      return null;
    }
    throw new Error('unknown element type');
  },

  /**
   * Code to be called after deserializing element, allowing us to attach any
   * necessary event handlers.
   */
  onDeserialize: function (element, updateProperty) {
    var elementType = this.getElementType(element);
    if (elements[elementType] && elements[elementType].onDeserialize) {
      elements[elementType].onDeserialize(element, updateProperty);
    }
  },

  /**
   * Handle any element specific property changes. Called after designMode gets
   * first crack at handling change.
   * @returns {boolean} True if we modified the element in such a way that the
   *   property table needs to be updated.
   */
  typeSpecificPropertyChange: function (element, name, value) {
    var elementType = this.getElementType(element);
    if (elements[elementType].onPropertyChange) {
      return elements[elementType].onPropertyChange(element, name, value);
    }
    return false;
  }
};
