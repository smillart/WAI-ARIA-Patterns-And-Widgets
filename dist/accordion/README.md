# Accordion (Sections With Show/Hide Functionality)

An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.

## Examples

[Progressively Enhanced Accordions Examples](https://smillart.github.io/WAI-ARIA-Patterns-And-Widgets/examples/accordion/)

## Minimum Required Mark-up

Accordions are enhanced from a basic HTML pattern:

```html
<div data-aria-accordion>
  <h3 data-aria-accordion-heading>Accordion Header</h3>
  <div data-aria-accordion-panel>
    <p>Accordion Panel</p>
  </div>
</div>
```

## Minimum Required Styles

To ensure legacy browsers support hidden accordion panels need to define default styles:

```css
/* For legacy browsers support */
.aria-accordion__panel[hidden] {
  display: none;
}
```

## `data` attributes for accordions setting options

The following `data` attributes can be added on the accordion `div` container to alter the default setup settings.

| `data` Attribute | Usage |
|:--|:--|
| **`data-aria-accordion`** | Default required implementation. One panel will be expanded at all times and only one panel will be allowed to be expanded; so, do not support a collapse function. |
| **`data-aria-accordion-custom-class`** | Allow to add a custom class on the accordion wrapper to be able to define a specific look and feel. |
| **`data-aria-accordion-open-default`** | With no value, it will open the first panel by default. With the panel number as value, it will open that specific panel by default. **e.g.** `data-aria-accordion-open-default="2"` will open the second panel. |
| **`data-aria-accordion-allow-toggle`** | Allow for each toggle to both open and close its section. Makes it possible for all sections to be closed. Assumes only one section may be open. |
| **`data-aria-accordion-allow-multiple`** | Allow for multiple accordion sections to be expanded at the same time. Assumes each toggle to both open and close otherwise the toggle on open sections would be disabled. |
| **`data-aria-accordion-panel-transition`** | Will add a modifier class to each accordion panel where CSS transitions can be applied from hidden to revealed state. |
