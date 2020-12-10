/**
 * @file
 * JavaScript class which manages the "Disclosure" behavior.
 *
 * Author: Sébastien Millart.
 * Version: 1.1.x
 * Licence: https://github.com/smillart/WAI-ARIA-Patterns-And-Widgets/blob/master/LICENSE
 */

// Concatenating files
// @prepros-prepend ../ControllerManager.class.js

class DisclosureController extends ControllerManager {

  /**
   * @constructor DisclosureController
   *
   * Local object for method references
   * and define script meta-data
   */
  constructor(controller, disclosureObj) {
    super(controller, disclosureObj.links);
    this.disclosure = disclosureObj;
    this.bindEvents();
  }

  /**
   * @method bindEvents()
   *
   * Initialize event listener on interactive elements.
   */
  bindEvents() {
    this.currentItem.addEventListener('click', this.handleClick.bind(this));
  }

  /*
   * @method handleClick()
   *
   * Handle the 'click' events which implements the 'EventListener' interface.
   */
  handleClick(event) {
    this.toggleContent();
  }

  /*
   * @method toggleContent()
   *
   * Expand/Collapse the associated hidden/visible content.
   */
  toggleContent() {
    if (this.currentItem.hasAttribute('aria-expanded')) {
      // Check if the associated content is expanded.
      var isExpanded = this.currentItem.getAttribute('aria-expanded') == 'true';

      if (isExpanded) {
        // Set `false` as the expanded state for the (button) controller
        // and collapse the associated content.
        this.hideContent('expanded');
      }
      else {
        // Set `true` as the expanded state for the (button) controller
        // and expand the associated content.
        this.showContent('expanded');
      }
    }
    else {
      // Set the disclosure widget to have the appropriately expand/collapse state:
      // Opened by default.
      if (this.disclosure.openDefault) {
        // Set `true` as the initial expanded state for the (button) controller
        // and expand the associated content.
        this.showContent('expanded');
      }
      // Or, closed by default.
      else {
        // Set `false` as the initial expanded state for the (button) controller
        // and collapse the associated content.
        this.hideContent('expanded');
      }
    }
  }
}