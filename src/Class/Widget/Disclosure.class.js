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
    var msgPrefix = `Disclosure constructor argument domNode`;

    // Check whether domNode is a DOM element.
    if (!domNode instanceof Element) {
      throw new TypeError(`${msgPrefix} is not a DOM Element.`);
    }

    super(domNode, `disclosure`);
    this.container;
    this.buttonLabel;
    this.buttons = [];
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

    // Check for 'data-aria-disclosure-custom-class' option: If different behaviors
    // are needed on a same page, a custom class can be added on the main disclosure
    // container that will be used as modifier class.
    this.customClass = this.getSetting('custom-class', false);

    // Check for 'data-aria-disclosure-button-label' option: Set a custom disclosure
    // button label.
    this.buttonLabel = this.getSetting('button-label', false);
    if (typeof(this.buttonLabel) === 'undefined') this.buttonLabel = `Toggle Content`;

    // Check for 'data-aria-disclosure-open-default' option: Is the content opened by default?
    this.openDefault = this.hasSetting('open-default', false);

    // Check for 'data-aria-disclosure-transition' option: Allow disclosure content
    // transition.
    this.disclosureTransition = this.hasSetting('transition', false);
    if (this.disclosureTransition) this.addClass(this.domNode, this.nodeClass, false, `__content--transition`);

    // Setup the disclosure container and button.
    this.setupDisclosureContainerMarkup();
  }

  /*
   * @method setupDisclosureContainerMarkup()
   *
   * This function generates the additional disclosure container and button that
   * do not exist in the found required markup patterns.
   */
  setupDisclosureContainerMarkup() {
    // Create the main disclosure container.
    this.container = document.createElement('div');
    // Setup the '.aria-disclosure' default and custom (if exists) class(es) for styling.
    this.addClass(this.container, this.nodeClass);
    if (this.customClass) this.addClass(this.container, `${this.nodeClass}--${this.customClass}`);

    // Setup new disclosure button.
    var button = new Button(this.buttonLabel, this.domNode.id);
    this.buttons.push(button);
    this.container.appendChild(button.domNode);

    // Insert the main disclosure container to the DOM and append the toggled
    // content as a child.
    this.domNode.parentNode.insertBefore(this.container, this.domNode);
    this.container.appendChild(this.domNode);

    // Create new disclosure controller using the button as trigger.
    // Add 'aria-expanded' attributes if appropriate.
    var trigger = new DisclosureController(button, this);
    trigger.toggleContent();
  }
}