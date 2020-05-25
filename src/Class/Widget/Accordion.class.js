/**
 * @file
 * "Accordion" design pattern that implements ARIA Authoring Practices.
 *
 * Author: Sébastien Millart.
 * Version: 1.0.1
 * Licence: https://github.com/smillart/WAI-ARIA-Patterns-And-Widgets/blob/master/LICENSE
 */

// Concatenating files
// @prepros-prepend ../Controller/AccordionController.class.js
// @prepros-prepend ../WidgetManager.class.js
// @prepros-prepend Button.class.js

class Accordion extends WidgetManager {

  /**
   * @constructor Accordion
   *
   * Local object for method references
   * and define script meta-data
   */
  constructor(domNode, index) {
    var msgPrefix = 'Accordion constructor argument domNode ';
    var msgHeading = 'H2-H6 [data-aria-accordion-heading]';
    var msgPanel = 'DIV [data-aria-accordion-panel]';
    var headingDataAttribute = 'data-aria-accordion-heading';
    var panelDataAttribute = 'data-aria-accordion-panel';

    // Check whether domNode is a DOM element.
    if (!domNode instanceof Element) {
      throw new TypeError(msgPrefix + 'is not a DOM Element.');
    }

    // Check whether domNode has child elements.
    if (domNode.childElementCount === 0) {
      throw new Error(msgPrefix + 'has no element children.');
    }

    // Check whether domNode descendant elements are correct one:
    // - H2-H6 [data-aria-accordion-heading]
    // - DIV [data-aria-accordion-panel]
    var regex = new RegExp('H2|H3|H4|H5|H6','gi');
    var childElement = domNode.firstElementChild;
    while (childElement) {
      if (childElement && childElement.tagName === 'LI') {
        var dataElement = childElement.firstElementChild;
        while (dataElement) {
          if (dataElement && 
            (!dataElement.tagName.match(regex) || !dataElement.hasAttribute(headingDataAttribute)) && 
            (dataElement.tagName !== 'DIV' || !dataElement.hasAttribute(panelDataAttribute))) {

            throw new Error(msgPrefix + 'has UL/OL descendant elements that do not match with ' 
              + msgHeading + ' or ' + msgPanel + ' as required.');
          }
          dataElement = dataElement.nextElementSibling;
        }
      }
      else {
        if (childElement && 
          (!childElement.tagName.match(regex) || !childElement.hasAttribute(headingDataAttribute)) && 
          (childElement.tagName !== 'DIV' || !childElement.hasAttribute(panelDataAttribute))) {

          throw new Error(msgPrefix + 'has direct descendant elements that do not match with ' 
            + msgHeading + ' or ' + msgPanel + ' as required.');
        }
      }
      childElement = childElement.nextElementSibling;
    }

    super(domNode, 'accordion');
    this.accordionHeadingClass = this.nodeClass + '__heading';
    this.accordionPanelClass = this.nodeClass + '__panel';
    this.accordionHeading = '[' + headingDataAttribute + ']';
    this.accordionPanel = '[' + panelDataAttribute + ']';
    this.buttons = [];
    this.headings;
    this.panels;
    this.customClass;
    this.openDefault;
    this.panelTransition;
    this.allowMultiple;
    this.allowToggle;
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
      this.domNode.setAttribute('id', 'acc-' + this.idCounter + '-' + this.index);
    }

    // Setup the '.accordion' default class for styling.
    this.addClass(this.domNode, this.nodeClass);

    // Get all panels & headings of an accordion pattern based on a specific ID > direct
    // child selector (this will ensure that nested accordions don't get properties
    // meant for the parent accordion, or vice-versa).
    //
    // If accordions are contained within an ol/ul, the selector needs to be different.
    if (document.querySelectorAll('#' + this.domNode.id + ' > li').length) {
      this.headings = document.querySelectorAll('#' + this.domNode.id + ' > li > ' + this.accordionHeading);
      this.panels = document.querySelectorAll('#' + this.domNode.id + ' > li > ' + this.accordionPanel);
    }
    else {
      this.headings = document.querySelectorAll('#' + this.domNode.id + ' > ' + this.accordionHeading);
      this.panels = document.querySelectorAll('#' + this.domNode.id + ' > ' + this.accordionPanel);
    }

    // Check for 'data-aria-accordion-custom-class' option: If different behaviors are
    // needed on a same page, a custom class can be added on the main accordion container
    // that will be used as modifier class.
    this.customClass = this.getSetting('custom-class', false);
    if (this.customClass) this.addClass(this.domNode, this.nodeClass + '--' + this.customClass);


    // Check for 'data-aria-accordion-open-default' option: Is there a default opened panel?
    this.openDefault = this.getSetting('open-default');

    // Check for 'data-aria-accordion-allow-multiple' option: Allow for multiple accordion
    // sections to be expanded at the same time. 
    this.allowMultiple = this.hasSetting('allow-multiple');

    // Check for 'data-aria-accordion-allow-toggle' option: Allow for each toggle
    // to both open and close individually.
    this.allowToggle = (this.allowMultiple) ? this.allowMultiple : this.hasSetting('allow-toggle');

    // Check for 'data-aria-accordion-panel-transition' option: Allow accordion panels transition.
    this.panelTransition = this.hasSetting('panel-transition', false);

    // Setup Panels, Headings & Buttons.
    this.setupPanels();
    this.setupHeadingButton();
  }

  /*
   * @method setupPanels()
   *
   * This function generates additional attributes for panels that do not
   * exist in the found required markup patterns.
   */
  setupPanels() {
    this.panels.forEach(function (panel, index) {
      // Setup both '.accordion__panel' class for styling and ID.
      this.addClass(panel, this.accordionPanelClass);
      panel.setAttribute('id', this.domNode.id + '-panel-' + (index + 1));

      // If accordion panels are meant to transition, apply this inline style. This is to
      // help mitigate a quick flash of CSS being applied to the no-js styling, and having
      // an unwanted transition on initial page load.
      if (this.panelTransition) {
        this.addClass(panel, this.accordionPanelClass + '--transition', false);
      }
    }, this);
  }

  /*
   * @method setupHeadingButton()
   *
   * This function generates additional attributes and buttons for headings
   * that do not exist in the found required markup patterns.
   */
  setupHeadingButton() {
    this.headings.forEach(function (heading, index) {
      // Setup the '.accordion__heading' class for styling.
      this.addClass(heading, this.accordionHeadingClass);

      // Setup new heading buttons.
      var button = new Button(heading.textContent, heading.nextElementSibling.id);
      this.buttons.push(button);
      // Clear out the heading's content and append the button to the DOM as heading's child.
      heading.innerHTML = '';
      heading.appendChild(button.domNode);

      // If less than 7 panels (contextualized that can be expanded at the same time),
      // those have role 'region' and 'aria-labelledby' with a value that refers to
      // this heading button.
      if (((this.allowMultiple && this.panels.length < 7) || !this.allowMultiple) && button.domNode.hasAttribute('id')) {
        document.getElementById(button.domNode.getAttribute('aria-controls')).setAttribute('role', 'region');
        document.getElementById(button.domNode.getAttribute('aria-controls')).setAttribute('aria-labelledby', button.domNode.id);
      }

      // Create new accordion controllers using the buttons as triggers. Check the
      // corresponding panel to see if it was set up to be hidden or shown by default.
      // Add 'aria-expanded' and 'aria-disabled' (or not) attributes if appropriate.
      var trigger = new AccordionController(button, this);
      trigger.togglePanel();
    }, this);
  }

  /*
   * @method getOpenDefault()
   *
   * Get the appropriately opened panel if an 'Open default' value is set.
   */
  getOpenDefault() {
    var activePanel;

    if (typeof(this.openDefault) != 'undefined' && this.openDefault !== 'none' && parseInt(this.openDefault) !== NaN) {
      // If value is 1 or less, open the first panel by default.
      if (this.openDefault <= 1) {
        activePanel = 0;
      }
      // If value is more than the number of panels, then open the last panel by default.
      else if ((this.openDefault - 1) >= this.panels.length) {
        activePanel = (this.panels.length - 1);
      }
      // For any other value between 2 and the last panel number, open the corresponding panel by default.
      else {
        activePanel = (this.openDefault - 1);
      }
    }
    // If toggling is allowed or the 'Open default' value is explicitly set to "none", then no panels are open.
    else if (this.allowToggle || this.openDefault === 'none') {
      activePanel = false;
    }
    // In all over cases, open the first panel by default.
    else {
      activePanel = 0;
    }

    return activePanel;
  }
}