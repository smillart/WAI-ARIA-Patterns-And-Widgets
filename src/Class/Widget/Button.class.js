/**
 * @file
 * JavaScript class which manages the "Button" behavior.
 *
 * Author: Sébastien Millart.
 * Version: 1.0.6
 * Licence: https://github.com/smillart/WAI-ARIA-Patterns-And-Widgets/blob/master/LICENSE
 */

class Button {

  /**
   * @constructor Button
   *
   * Local object for method references
   * and define script meta-data
   */
  constructor(textNode, targetID = false) {
    this.textNode = textNode;
    this.targetID = targetID;
    this.domNode;
    this.init();
  }

  /*
   * @method init()
   *
   * This function creates the ARIA "Button" widget(s). Any additional markup
   * elements or attributes will be generated via this function.
   */
  init() {
    // Setup new button, text content and required attribute(s).
    this.domNode = document.createElement('button');
    this.domNode.setAttribute('type', 'button');
    if (this.textNode) this.domNode.appendChild(document.createTextNode(this.textNode));

    // Add 'aria-controls' attribute if the button needs to control
    // an associated element.
    if (this.targetID && document.getElementById(this.targetID)) {
      this.domNode.setAttribute('aria-controls', this.targetID);
      this.domNode.setAttribute('id', `${this.targetID}-trigger`);
    }
  }
}