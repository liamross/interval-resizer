# Interval Resizer

Interval Resizer is a React package for resizing components along pre-defined
intervals.

[Click here to see a working demo](https://liamross.github.io/interval-resizer/)

| Site (click to open)                                   | Install command                                              |
|--------------------------------------------------------|--------------------------------------------------------------|
| [npm](https://www.npmjs.com/package/interval-resizer)  | `npm i interval-resizer`                                     |
| [yarn](https://yarn.pm/interval-resizer)               | `yarn add interval-resizer`                                  |
| [GitHub](https://github.com/liamross/interval-resizer) | `git clone https://github.com/liamross/interval-resizer.git` |

[![npm version](https://badge.fury.io/js/interval-resizer.svg)](https://www.npmjs.com/package/interval-resizer)
[![dependencies Status](https://david-dm.org/liamross/interval-resizer/status.svg)](https://david-dm.org/liamross/interval-resizer)
[![devDependencies Status](https://david-dm.org/liamross/interval-resizer/dev-status.svg)](https://david-dm.org/liamross/interval-resizer?type=dev)
[![peerDependencies Status](https://david-dm.org/liamross/interval-resizer/peer-status.svg)](https://david-dm.org/liamross/interval-resizer?type=peer)

## About the Component

### What is this for?
Interval-resizer is useful in a dashboard widget scenario, where you want your
components to expand with their content, but you don't want a bunch of uneven
heights. By setting your intervalUnit, you give the interval-resizer intervals
to snap to, which means nice even heights among all your widget components, and
a good end-user visual experience.

### How does it do this?
By allowing the *internals* to return to their original height just long enough
to get a height measurement, the interval-resizer is able to calculate the next
interval to size to, before reverting the *internals* back to fill the height.
This all happens without any visual indication, meaning to the end-user it
appears to be cleanly snapping between intervals whenever its content or the
window width change.

## Get Started
Options:
1. Install the npm package and use it in your application  
  `npm i interval-resizer`
1. View the working demo [here](https://liamross.github.io/interval-resizer/)
to play around with functionality and props
1. Download from GitHub, and customize the original component:  
  `git clone https://github.com/liamross/interval-resizer.git`

## Use

### Inside your component

> See [Props](#props) for explanation and use for each prop.

```jsx
import React, {Component} from 'react'
import IntervalResizer from 'interval-resizer';
// ...

export default class App extends Component {
  // ...
  render() {
    return (
      <IntervalResizer
        intervalUnit={intervalUnit}
        timeoutDelay={timeoutDelay}
        minHeight={minHeight}
        maxHeight={maxHeight}
        className={className}
        instantOnReceiveProps={instantOnReceiveProps}
        screenWidthCutoff={screenWidthCutoff}
      >
        <div className="internals-wrapper">
          <div className="internals-content internals-content--one">
            {/*content*/}
          </div>
          <div className="internals-content internals-content--two">
            {/*content*/}
          </div>
        </div>
      </IntervalResizer>
    )
  }
}
```

### Styling

To benefit from the interval-resizer, content within the *internals* wrapper
must be set in a way to fill the wrapper's height. This allows the interaction
where the wrapper becomes `height: auto`. The easiest way is with flexbox, as
demonstrated in the following examples (obviously the class names can be
whatever you want, I just use these for the example).

#### SCSS

```scss
.internals-wrapper {
  display: flex;
  flex-direction: column;

  > .internals-content {
    flex: 1 1 auto;
    // Or flex: 1 1 0; for all even heights.
    // (Shorthand for flex-grow, flex-shrink, flex-basis)
    // Technically, only one of the internal components has
    // to have any flex properties, and if you set it to
    // flex: 1 1 auto; it will fill the remaining height
    // in the wrapper.
  }
}
```

#### CSS

```css
.internals-wrapper {
  display: flex;
  flex-direction: column;
}

.internals-wrapper > .internals-content {
  flex: 1 1 auto;
  /* Or flex: 1 1 0; for all even heights.
  (Shorthand for flex-grow, flex-shrink, flex-basis)
  Technically, only one of the internal components has
  to have any flex properties, and if you set it to
  flex: 1 1 auto; it will fill the remaining height
  in the wrapper. */
}
```

Of course you can always use percentages, or have hard-coded height and just
ensure they float or position how you want. The best method is the one that fits
your use case.

## Props

### intervalUnit `number`

**Default**  
none - required Prop

**Description**  
Defines the interval in pixels to adjust height by when
resizing.

**Use**  
This is the main feature of the component; it allows for your component
to resize to a clean pixel height, at intervals defined using intervalUnit. A
large value for intervalUnit means nice clean sizing, but the downside is lots
of unused space within the component once it resizes to a larger height.
Alternatively, a small value for intervalUnit will cause more accurate resizing,
but less guarantee that your components will round to the same height.

---

### children `JSX.Element`

**Default**  
none - required Prop

**Description**  
The internal content wrapped by the IntervalResizer.

**Use**  
See [Styling](#styling) for a detailed explanation of how to structure
the *internals*.

---

### timeoutDelay `number`

**Default**  
0

**Description**  
Set a re-render timeout to wait for all prop changes and
resizing. This does not apply to props if
[instantOnReceiveProps](#instantonreceiveprops-boolean) is true.

**Use**  
This exists solely to reduce the expense of watching the window for
resize events. Setting even a small value (i.e `150`) causes the component to
wait for resizing to stop before calculating the new *internals* height and
subsequently the new interval height.

---

### instantOnReceiveProps `boolean`

**Default**  
true

**Description**  
Causes any `timeoutDelay` to be ignored for cases where the
props are updated. `timeoutDelay` will still fire on window resize events.

**Use**  
When props change, it triggers a single fire of React's
`componentWillReceiveProps`. This is not expensive, and presumably will fire
infrequently unless new props are always being passed. However, window resizing
will rapid-fire calls to the resizer as the window is adjusted, which is the
reason for `timeoutDelay`. Since in most use cases the prop change is
inexpensive, `instantOnReceiveProps` is defaulted to true, and probably should
remain true for most use cases.

---

### minHeight `number`

**Default**  
null

**Description**: The minimum height in pixels of the interval-resizer. If given,
will not allow the component to become smaller than the provided height.

**Use**: For if you don't want your component to shrink beyond a certain height.

---

### maxHeight `number`

**Default**: null

**Description**  
The maximum height in pixels of the interval-resizer. If given,
will not allow the component to become larger than the provided height.

**Use**  
For if you don't want your component to grow beyond a certain height.

---

### className `string`

**Default**  
null

**Description**  
A value for the class attribute on the component.

**Use**  
For applying styling to the component, as it has no inherent styling.

---

### screenWidthCutoff `number`

**Default**  
0

**Description**  
Defined the minimum width in pixels for interval resizing. Any
browser window width below this amount will be resized normally with content
(height: auto).

**Use**  
Used in tandem with styling breakpoints, this allows you to stop
interval resizing below a certain screen width. The main use case is when you
only have one column of dashboard widgets and you no longer need the heights to
round off as the components fall one after another in a scrolling UI.

## Additional notes
If you want to remove the PropTypes depedency from interval-resizer, extract the
IntervalResizer file found in `src/IntervalResizer.jsx` and place it within your
React project as needed. However, you should use PropTypes, they're great!
