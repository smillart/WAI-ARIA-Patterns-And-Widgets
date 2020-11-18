
# Disclosure (Show/Hide)

A disclosure is a `button` that controls visibility of a section of content. When the controlled content is hidden, it is often styled as a typical push button with a right-pointing arrow, triangle ... to hint that activating the button will display additional content. When the content is visible, the arrow, triangle ... typically points down.

## Examples

[Progressively Enhanced Disclosures Examples](https://smillart.github.io/WAI-ARIA-Patterns-And-Widgets/examples/disclosure/)

## Minimum Required Mark-up

Disclosures are enhanced from a basic HTML pattern:

```html
<div data-aria-disclosure>
  <p>Disclosure section of content</p>
</div>
```

The approach is with [Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) (PE) in mind. The principle is to start with a rock-solid markup foundation (as shown here before) and then adding enhancements to it. Any additional markup elements (e.g. `<button>`) or attributes (e.g. `class="aria-disclosure ... aria-disclosure__content"`, `id`, `aria-[...]`, ...) that do not exist in the found required markup will be generated when the script/page loads.

## Minimum Required Styles

To ensure legacy browsers support hidden disclosure contents need to use the following CSS rule (which are included in the [`/dist/css/aria-required.min.css`](../css/aria-required.min.css) CSS file):

```css
/* For legacy browsers support */
[class*=aria-][hidden] {
  display: none;
}
```

Other default (non mandatory) styles have been defined for disclosure contents where **CSS transitions** can be applied from hidden to revealed state (and vice versa). These styles are included in the [`/dist/css/aria-transition.min.css`](../css/aria-transition.min.css) CSS file. The `max-height` technique has been used but there are others (`transform: scaleY()`, Flexbox ...). Feel free to use your own styles.

## `data` attributes for disclosures setting options

| `data`&nbsp;Attribute&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Usage |
|:--|:--|
| **`data-aria-disclosure`** | Default required implementation. The section of content will be collapsed at all times when the script/page (re)loads. |
| **`data-aria-disclosure-open-default`** | Using this option will keep opened (expanded) the section of content when the script/page (re)loads. |
| **`data-aria-disclosure-custom-class`** | If different behaviors are needed on a same page, a custom class can be added on the main disclosure container that will be used as modifier class. |
| **`data-aria-disclosure-button-label`** | Allow you to choose a custom label to set for the disclosure button. By default, it will use *"Toggle Content"* as button label. |
| **`data-aria-disclosure-transition`** | Will add a modifier class to each section of content where CSS transitions can be applied from hidden to revealed state (and vice versa). |

## Keyboard Interaction

| Key&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Function |
|:--|:--|
| `Tab` | Moves keyboard focus to the disclosure button or to the next focusable element. |
| `Shift` + `Tab` | Moves keyboard focus to the disclosure button or to the previous focusable element. |
| `Space` or `Enter` | Activates the disclosure button, which toggles the visibility of the section of content. |