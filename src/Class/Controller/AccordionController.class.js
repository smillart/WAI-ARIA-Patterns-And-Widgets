/**
 * @file
 * JavaScript class which manages the "Accordion" behavior.
 *
 * Author: Sébastien Millart.
 * Version: 1.0.5
 * Licence: https://github.com/smillart/WAI-ARIA-Patterns-And-Widgets/blob/master/LICENSE
 */

// Concatenating files
// @prepros-prepend ../ControllerManager.class.js

class AccordionController extends ControllerManager {

  /**
   * @constructor AccordionController
   *
   * Local object for method references
   * and define script meta-data
   */
  constructor(buttonObj, accordionObj) {
    super(buttonObj, accordionObj.buttons);
    this.trigger = this.currentItem.domNode;
    this.accordion = accordionObj;
    this.bindEvents();
  }

  /**
   * @method bindEvents()
   *
   * Initialize event listener on focusable trigger buttons.
   */
  bindEvents() {
    this.trigger.addEventListener('click', this.handleClick.bind(this));
    this.trigger.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  /*
   * @method handleClick()
   *
   * Handle the 'click' events which implements the 'EventListener' interface.
   */
  handleClick(event) {
    this.togglePanel();
  }

  /*
   * @method handleKeydown()
   *
   * Handle the 'keydown' events which implements the 'EventListener' interface.
   */
  handleKeydown(event) {
    console.log(`[keydown]`);
    var flag = false;

    switch (event.keyCode) {

      case this.keyCode.UP:
        this.setFocusToPreviousItem();
        flag = true;
        break;

      case this.keyCode.DOWN:
        this.setFocusToNextItem();
        flag = true;
        break;

      case this.keyCode.HOME:
        this.setFocusToFirstItem();
        flag = true;
        break;

      case this.keyCode.END:
        this.setFocusToLastItem();
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  /*
   * @method togglePanel()
   *
   * Toggle panels, if appropriate:
   * 
   * 1. If collapsed: Expand the associated panel. If the implementation allows only
   *    one panel to be expanded, and if another panel is expanded, collapses that panel.
   *
   * 2. If expanded: Collapse the panel if the implementation supports collapsing.
   *    Some implementations require one panel to be expanded at all times and allow
   *    only one panel to be expanded; so, they do not support a collapse function.
   */
  togglePanel() {
    if (this.trigger.hasAttribute('aria-expanded')) {
      // Check if the current panel is expanded.
      var isExpanded = this.trigger.getAttribute('aria-expanded') == 'true';
      var active = false;

      // Check if the active button is an accordion direct child.
      this.items.forEach(function (button, index) {
        if (button.domNode.getAttribute('aria-expanded') === 'true') active = button.domNode;
      }, this);

      // Without allow multiple, collapse the opened panel.
      if (!this.accordion.allowMultiple && active && active !== this.trigger) {
        // Set the expanded state on the active button.
        active.setAttribute('aria-expanded', 'false');
        // Collapse the associated panel, using 'aria-controls' to specify the desired panel.
        document.getElementById(active.getAttribute('aria-controls')).setAttribute('hidden', '');

        // When toggling is not allowed, clean up disabled state.
        if (!this.accordion.allowToggle) {
          active.removeAttribute('aria-disabled');
        }
      }

      if (!isExpanded) {
        // Set the expanded state on the triggered button.
        this.trigger.setAttribute('aria-expanded', 'true');
        // Expand the associated panel, using 'aria-controls' to specify the desired panel.
        document.getElementById(this.trigger.getAttribute('aria-controls')).removeAttribute('hidden');

        // If toggling is not allowed, set disabled state on the triggered button.
        if (!this.accordion.allowToggle) {
          this.trigger.setAttribute('aria-disabled', 'true');
        }
      }
      else if (this.accordion.allowToggle && isExpanded) {
        // Set the expanded state on the triggered button.
        this.trigger.setAttribute('aria-expanded', 'false');
        // Collapse the associated panel, using 'aria-controls' to specify the desired panel.
        document.getElementById(this.trigger.getAttribute('aria-controls')).setAttribute('hidden', '');
      }
    }
    else {
      // Set the accordion to have the appropriately opened panel (if opened by default).
      if (this.items.indexOf(this.currentItem) === this.accordion.getOpenDefault()) {
        // Set the initial expanded state on the triggered button.
        this.trigger.setAttribute('aria-expanded', 'true');

        // If toggling is not allowed, set disabled state on the triggered button.
        if (!this.accordion.allowToggle) {
          this.trigger.setAttribute('aria-disabled', 'true');
        }
      }
      // Or do not open any panels.
      else {
        // Set the initial expanded state on the triggered button.
        this.trigger.setAttribute('aria-expanded', 'false');
        // Collapse the initial associated panels, using 'aria-controls' to specify the desired panel.
        document.getElementById(this.trigger.getAttribute('aria-controls')).setAttribute('hidden', '');
      }
    }
  }
}