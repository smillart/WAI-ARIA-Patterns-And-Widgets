
/**
 * @file
 * Accordion (Sections With Show/Hide Functionality).
 *
 * Author: Sébastien Millart.
 * Version: 1.0.5
 * Licence: https://github.com/smillart/WAI-ARIA-Patterns-And-Widgets/blob/master/LICENSE
 *
 * The following javascript implements ARIA Authoring Practices for an accordion,
 * vertically stacked set of interactive headings that each contain a title,
 * content snippet, or thumbnail representing a section of content.
 */

// Polyfills
// @prepros-prepend Polyfills/Element.addEventListener.js
// @prepros-prepend Polyfills/Element.classList.js
// @prepros-prepend Polyfills/NodeList.forEach.js
// @prepros-prepend Polyfills/Array.forEach.js

// Concatenating files
// @prepros-prepend Class/Widget/Accordion.class.js

(function (window, document, undefined) {

  // Initialize Accordions
  window.addEventListener('DOMContentLoaded', function (event) {
    document.querySelectorAll(`[data-aria-accordion]`).forEach(function (accordion, index) {
      var acc = new Accordion(accordion, index);
    });
  });
})(this, this.document);
