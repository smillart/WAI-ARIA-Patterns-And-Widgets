
/**
 * @file
 * Accordion (Sections With Show/Hide Functionality).
 *
 * The following javascript implements ARIA Authoring Practices for an accordion,
 * vertically stacked set of interactive headings that each contain a title,
 * content snippet, or thumbnail representing a section of content.
 */

// Concatenating files
// @prepros-prepend Class/Widget/Accordion.class.js

(function (window, document, undefined) {

  // Initialize Accordions
  window.addEventListener('DOMContentLoaded', function (event) {
    document.querySelectorAll('[data-aria-accordion]').forEach(function (accordion, index) {
      var acc = new Accordion(accordion, index);
    });
  });
})(this, this.document);
