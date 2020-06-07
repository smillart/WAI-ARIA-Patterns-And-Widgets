/**
 * @file
 * JavaScript widget manager class which provides common, repetitive and useful operations.
 *
 * Author: Sébastien Millart.
 * Version: 1.0.x
 * Licence: https://github.com/smillart/WAI-ARIA-Patterns-And-Widgets/blob/master/LICENSE
 */

class WidgetManager {

  /**
   * @constructor WidgetManager
   *
   * Local object for method references
   * and define script meta-data
   */
  constructor(domNode, nodeClass) {
    this.domNode = domNode;
    this.nodeClass = `aria-${nodeClass}`;
  }

  /*
   * @method hasSetting()
   *
   * Return a setting (boolean) according to its related data attribute
   * which will be transform to CSS class (if forced).
   */
  hasSetting(dataAttribute, forceClass = true) {
    var setting = this.domNode.hasAttribute(`data-${this.nodeClass}-${dataAttribute}`);
    if (setting) {
      this.domNode.removeAttribute(`data-${this.nodeClass}-${dataAttribute}`);
      if (forceClass) this.addClass(this.domNode, `${this.nodeClass}--${dataAttribute}`, false);
    }
    return setting;
  }

  /*
   * @method getSetting()
   *
   * Return a setting (attribute value) according to its related data attribute
   * which will be transform to CSS class (if forced).
   */
  getSetting(dataAttribute, forceClass = true) {
    if (this.domNode.hasAttribute(`data-${this.nodeClass}-${dataAttribute}`)) {
      var setting = this.domNode.getAttribute(`data-${this.nodeClass}-${dataAttribute}`);
      this.domNode.removeAttribute(`data-${this.nodeClass}-${dataAttribute}`);
      if (forceClass && setting !== 'none') this.addClass(this.domNode, `${this.nodeClass}--${dataAttribute}`, false);
      return setting;
    }
  }

  /*
   * @method addClass()
   *
   * Generate custom class and remove related data attribute (if forced).
   */
  addClass(element, className, forceRemove = true) {
    if (typeof className === 'string') {
      var dataAttribute = `data-${className.replace(/__|--/g,`-`)}`;
      if (element) {
        element.classList.add(className);
        if (element.hasAttribute(dataAttribute) && forceRemove) element.removeAttribute(dataAttribute);
      }
    }
  }
}