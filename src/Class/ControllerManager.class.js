/**
 * @file
 * JavaScript controller manager class which manages widgets behavior.
 *
 * Author: Sébastien Millart.
 * Version: 1.1.x
 * Licence: https://github.com/smillart/WAI-ARIA-Patterns-And-Widgets/blob/master/LICENSE
 */

class ControllerManager {

  /**
   * @constructor ControllerManager
   *
   * Local object for method references
   * and define script meta-data
   */
  constructor(currentItem, items) {
    this.currentItem = currentItem;
    this.items = items;
    this.keyCode = Object.freeze({
      RETURN: 13,
      SPACE: 32,
      END: 35,
      HOME: 36,
      UP: 38,
      DOWN: 40
    });
  }

  /*
   * @method setFocusToFirstItem()
   *
   * Moves focus to first 'item' element.
   */
  setFocusToFirstItem() {
    this.items[0].focus();
  }

  /*
   * @method setFocusToLastItem()
   *
   * Moves focus to last 'item' element.
   */
  setFocusToLastItem() {
    this.items[this.items.length - 1].focus();
  }

  /*
   * @method setFocusToPreviousItem()
   *
   * Moves focus to the previous 'item' element.
   */
  setFocusToPreviousItem() {
    var index;

    if (this.currentItem === this.items[0]) {
      this.setFocusToLastItem();
    }
    else {
      index = this.items.indexOf(this.currentItem);
      this.items[index - 1].focus();
    }
  }

  /*
   * @method setFocusToNextItem()
   *
   * Moves focus to the next 'item' element.
   */
  setFocusToNextItem() {
    var index;

    if (this.currentItem === this.items[this.items.length - 1]) {
      this.setFocusToFirstItem();
    }
    else {
      index = this.items.indexOf(this.currentItem);
      this.items[index + 1].focus();
    }
  }

  /*
   * @method showContent()
   *
   * Reveal the button associated hidden content.
   */
  showContent(ariaState, forceButton = false) {
    var button = (forceButton) ? forceButton : this.currentItem;
    button.setAttribute(`aria-${ariaState}`, 'true');
    document.getElementById(button.getAttribute('aria-controls')).removeAttribute('hidden');
  }

  /*
   * @method hideContent()
   *
   * Hide the button associated visible content.
   */
  hideContent(ariaState, forceButton = false) {
    var button = (forceButton) ? forceButton : this.currentItem;
    button.setAttribute(`aria-${ariaState}`, 'false');
    document.getElementById(button.getAttribute('aria-controls')).setAttribute('hidden', '');
  }
}