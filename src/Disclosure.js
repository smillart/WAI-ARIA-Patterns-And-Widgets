
/**
 * @file
 * Disclosure (Show/Hide).
 *
 * Author: Sébastien Millart.
 * Version: 1.1.x
 * Licence: https://github.com/smillart/WAI-ARIA-Patterns-And-Widgets/blob/master/LICENSE
 *
 * The following javascript implements ARIA Authoring Practices for a disclosure,
 * a button that controls visibility of a section of content. When the controlled
 * content is hidden, it is often styled as a typical push `button` that activating
 * will display additional content.
 */

// Concatenating files
// @prepros-prepend Class/Widget/Disclosure.class.js

// Initialize Disclosures
window.addEventListener('DOMContentLoaded', function (event) {
  document.querySelectorAll(`[data-aria-disclosure]`).forEach(function (disclosure, index) {
    var dis = new Disclosure(disclosure, index);
  });
});
