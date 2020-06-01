/**
 * @file
 * JavaScript controller manager class which manages widgets behavior.
 *
 * Author: Sébastien Millart.
 * Version: 1.0.x
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
   * Moves focus to first widget item.
   */
  setFocusToFirstItem() {
    this.items[0].domNode.focus();
  }

  /*
   * @method setFocusToLastItem()
   *
   * Moves focus to last widget item.
   */
  setFocusToLastItem() {
    this.items[this.items.length - 1].domNode.focus();
  }

  /*
   * @method setFocusToPreviousItem()
   *
   * Moves focus to the previous wiget item.
   */
  setFocusToPreviousItem() {
    var index;

    if (this.currentItem === this.items[0]) {
      this.setFocusToLastItem();
    }
    else {
      index = this.items.indexOf(this.currentItem);
      this.items[index - 1].domNode.focus();
    }
  }

  /*
   * @method setFocusToNextItem()
   *
   * Moves focus to the next widget item.
   */
  setFocusToNextItem() {
    var index;

    if (this.currentItem === this.items[this.items.length - 1]) {
      this.setFocusToFirstItem();
    }
    else {
      index = this.items.indexOf(this.currentItem);
      this.items[index + 1].domNode.focus();
    }
  }
}