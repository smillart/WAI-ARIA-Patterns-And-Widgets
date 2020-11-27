/**
 * @file
 * "Disclosure" design pattern that implements ARIA Authoring Practices.
 *
 * Author: Sébastien Millart.
 * Version: 1.1.x
 * Licence: https://github.com/smillart/WAI-ARIA-Patterns-And-Widgets/blob/master/LICENSE
 */

// Concatenating files
// @prepros-prepend ../Controller/DisclosureController.class.js
// @prepros-prepend ../WidgetManager.class.js
// @prepros-prepend Button.class.js

class Disclosure extends WidgetManager {

  /**
   * @constructor Disclosure
   *
   * Local object for method references
   * and define script meta-data
   */
  constructor(domNode, index) {
    var controllerDataAttribute = `data-aria-disclosure-controller`;
    var msgPrefix = `Disclosure constructor argument domNode`;

    // Check whether domNode is a DOM element.
    if (!domNode instanceof Element) {
      throw new TypeError(`${msgPrefix} is not a DOM Element.`);
    }

    // Check whether controllerId target element is a BUTTON element.
    if (domNode.hasAttribute(controllerDataAttribute)) {
      var controller = document.getElementById(domNode.getAttribute(controllerDataAttribute));
      if (controller && controller.tagName !== 'BUTTON') {
        throw new Error(`${msgPrefix} uses a trigger that is not a BUTTON Element.`);
      }
    }

    super(domNode, `disclosure`);
    this.container;
    this.controller;
    this.links = [];
    this.buttonLabel;
    this.controllerId;
    this.customClass;
    this.openDefault;
    this.disclosureTransition;
    this.idCounter = 0;
    this.index = index;
    this.init();
  }

  /*
   * @method init()
   *
   * This function validates that the minimum required markup is present to create
   * the ARIA widget(s). Any additional markup elements or attributes that do not
   * exist in the found required markup patterns will be generated via this function.
   */
  init() {
    this.idCounter += 1;

    // Check for IDs and create one if needed for further use.
    if (!this.domNode.hasAttribute('id')) {
      this.domNode.setAttribute('id', `dis-${this.idCounter}-${this.index}`);
    }

    // Setup the '.aria-disclosure__content' class for styling.
    this.addClass(this.domNode, this.nodeClass, true, `__content`);

    // Check for 'data-aria-disclosure-transition' option:
    // Allow CSS transitions to be applied from hidden to revealed state (and vice versa).
    this.disclosureTransition = this.hasSetting('transition', false);
    // Setup the '.aria-disclosure__content--transition' class for CSS transitions styling.
    if (this.disclosureTransition) this.addClass(this.domNode, this.nodeClass, false, `__content--transition`);

    // Check for 'data-aria-disclosure-custom-class' option:
    // If different behaviors are needed on a same page, a custom class can be added
    // on the main disclosure container that will be used as modifier class.
    this.customClass = this.getSetting('custom-class', false);

    // Check for 'data-aria-disclosure-controller' option:
    // If a `button` already exists in the DOM, this can be used
    // as the disclosure controller.
    this.controllerId = this.getSetting('controller', false);

    // Check for 'data-aria-disclosure-button-label' option:
    // Set a custom disclosure button label.
    this.buttonLabel = this.getSetting('button-label', false);

    // Check for 'data-aria-disclosure-open-default' option:
    // Is the content opened by default?
    this.openDefault = this.hasSetting('open-default', false);

    // Setup both the disclosure container and button.
    this.setupContainer();
    this.setupController();
  }

  /*
   * @method setupContainer()
   *
   * This function generates the additional disclosure container (and
   * links) that do not exist in the found required markup patterns.
   */
  setupContainer() {
    // Create the main disclosure container.
    this.container = document.createElement('div');
    // Setup the '.aria-disclosure' default and custom (if exists) class(es) for styling.
    this.addClass(this.container, this.nodeClass);
    if (this.customClass) this.addClass(this.container, `${this.nodeClass}--${this.customClass}`);

    // Insert the main disclosure container to the DOM and append
    // the disclosuse section of content as a child.
    this.domNode.parentNode.insertBefore(this.container, this.domNode);
    this.container.appendChild(this.domNode);
  }

  /*
   * @method setupController()
   *
   * This function generates the additional disclosure controller that
   * do not exist in the found required markup patterns.
   */
  setupController() {
    // Check if an existing `button` is meant to be used as the controller.
    if (this.controllerId && document.getElementById(this.controllerId)) {
      this.controller = document.getElementById(this.controllerId);
      this.controller.setAttribute('type', 'button');
      this.controller.setAttribute('aria-controls', this.domNode.id);
    }
    // If no existing `button`, create one from scratch and insert
    // it to the DOM as a main disclosure container child.
    else {
      var buttonLabel = (this.buttonLabel) ? this.buttonLabel : `Toggle Content`;
      var controller = new Button(buttonLabel, this.domNode.id);
      this.controller = controller.domNode;
      this.container.insertBefore(this.controller, this.domNode);
    }

    // Create new disclosure controller using the `button` as trigger.
    // Add 'aria-expanded' attributes/values if applicable.
    var trigger = new DisclosureController(this.controller, this);
    trigger.toggleContent();
  }
}