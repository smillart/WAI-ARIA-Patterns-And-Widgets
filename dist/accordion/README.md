
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

The approach is with [Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) (PE) in mind. The principle is to start with a rock-solid markup foundation (as shown here before) and then adding enhancements to it. Any additional markup elements (e.g. `<button>`) or attributes (e.g. `class="aria-accordion ... aria-accordion__heading ... aria-accordion__panel"`, `id`, `role`, `aria-`...) that do not exist in the found required markup will be generated when the script/page loads.

## Minimum Required Styles

To ensure legacy browsers support hidden accordion panels need to define a default style. This style is included in the `css/accordion.min.css` CSS file.

```css
/* For legacy browsers support */
.aria-accordion__panel[hidden] {
  display: none;
}
```

## `data` attributes for accordions setting options

The following `data` attributes can be added on the accordion `div` container to alter the default setup settings.

| `data`&nbsp;Attribute&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Usage |
|:--|:--|
| **`data-aria-accordion`** | Default required implementation. One panel will be expanded at all times and only one panel will be allowed to be expanded; so, do not support a collapse function. |
| **`data-aria-accordion-custom-class`** | Allow to add a custom class on the accordion wrapper to be able to define a specific look and feel. |
| **`data-aria-accordion-open-default`** | With no value, it will open the first panel by default. With the panel number as value, it will open that specific panel by default. **e.g.** `data-aria-accordion-open-default="2"` will open the second panel. |
| **`data-aria-accordion-allow-toggle`** | Allow for each toggle to both open and close its section. Makes it possible for all sections to be closed. Assumes only one section may be open. |
| **`data-aria-accordion-allow-multiple`** | Allow for multiple accordion sections to be expanded at the same time. Assumes each toggle to both open and close otherwise the toggle on open sections would be disabled. |
| **`data-aria-accordion-panel-transition`** | Will add a modifier class to each accordion panel where CSS transitions can be applied from hidden to revealed state. |

## Keyboard Interaction

| Key&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Function |
|:--|:--|
| `Space` or `Enter` | **-** When focus is on the accordion header for a collapsed panel, expands the associated panel. If the implementation allows only one panel to be expanded, and if another panel is expanded, collapses that panel.<br>**-** When focus is on the accordion header for an expanded panel, collapses the panel if the implementation supports collapsing. Some implementations require one panel to be expanded at all times and allow only one panel to be expanded; so, they do not support a collapse function. |
| `Tab` | Moves focus to the next focusable element; all focusable elements in the accordion panel are included in the page `Tab` sequence. |
| `Shift` + `Tab` | Moves focus to the previous focusable element; all focusable elements in the accordion panel are included in the page `Tab` sequence. |
| `Down Arrow` | If focus is on an accordion header, moves focus to the next accordion header. If focus is on the last accordion header, moves focus to the first accordion header. |
| `Up Arrow` | If focus is on an accordion header, moves focus to the previous accordion header. If focus is on the first accordion header, moves focus to the last accordion header. |
| `Home` | When focus is on an accordion header, moves focus to the first accordion header. |
| `End` | When focus is on an accordion header, moves focus to the last accordion header. |