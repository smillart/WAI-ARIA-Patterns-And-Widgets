# Accessible Rich Internet Application (WAI-ARIA) Patterns and Widgets

Here you will find ARIA implementation patterns for common widgets that both enumerate expected behaviors and demonstrate those behaviors with working code. The implementation patterns and examples are based on the [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/) and refer to detailed explanations of supporting concepts in subsequent guidance sections.

## Design Patterns and Widgets

This section provide common accessible rich internet application patterns and widgets using the fast, lightweight, cross-platform **Vanilla JS** framework and the powerful **progressive enhancement (PE)** methodology.

 - [**Accordion (Sections With Show/Hide Functionality)**](dist/accordion)
   An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content.
- **...**

## WAI-ARIA Widgets Delivery (CDN)

### Load any widget release

When you only need to include individual widget's compiled CSS or JS, you can use [jsDelivr](https://www.jsdelivr.com/). **jsDelivr** has an API for developers, no traffic limits and is accessible worldwide.

```html
<!-- CSS Required styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/smillart/WAI-ARIA-Patterns-And-Widgets@1.1.0/dist/css/aria-required.min.css">

<!-- Load any WAI-ARIA Widget release -->
<script src="https://cdn.jsdelivr.net/gh/smillart/WAI-ARIA-Patterns-And-Widgets@1.1.0/dist/accordion/js/accordion.min.js"></script>
```

### Combine multiple files

The combine endpoint allows you to load several files from GitHub endpoints in one request. All features that work for individual files work here as well. All combined files come with source maps and can be easily used during development.

```html
<!-- CSS Required & Transition styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/gh/smillart/WAI-ARIA-Patterns-And-Widgets@1.1.0/dist/css/aria-required.min.css,gh/smillart/WAI-ARIA-Patterns-And-Widgets@1.1.0/dist/css/aria-transition.min.css">

<!-- Load multiple WAI-ARIA JS Widgets -->
<script src="https://cdn.jsdelivr.net/combine/gh/smillart/WAI-ARIA-Patterns-And-Widgets@1.1.0/dist/accordion/js/accordion.min.js,gh/smillart/WAI-ARIA-Patterns-And-Widgets@1.1.0/dist/disclosure/js/disclosure.min.js"></script>
```
**Note:** Combining large/many files can take several seconds. However, **jsDelivr** stores all generated files in its permanent storage, so this delay only applies to the first few requests.

## Browser and Assistive Technology Support

JavaScript and CSS is written to be compatible with the most recent version of Chrome, Firefox, Internet Explorer, and Safari at the time of writing. In particular, some JavaScript and CSS may not function correctly in Internet Explorer version 9 or earlier.

## Mobile and Touch Support

Currently, widgets strive to be compatible with mobile browsers or touch interfaces. While some of the examples include specific features that enhance mobile and touch support, some ARIA features are not supported in any mobile browser. In addition, there is not yet a standardized approach for providing touch interactions that work across mobile browsers.
