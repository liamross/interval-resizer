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
          <div className="some-header">
            I'm a header
          </div>
          <div className="internals-content">
            {/* see 'Styling' below for more info* /}
          </div>
          <div className="some-footer">
            I'm a footer
          </div>
        </div>
      </IntervalResizer>
    )
  }
}
```

### Styling

Style the internals of this component however you'd style any div that resizes
with its content. However, keep in mind that the div will snap to a height that
is larger than its internals. As such, it is probably best if something inside
is able to grow and fill the extra space. I personally do this with flex box,
as shown in the following example:

#### SCSS

```scss
// This is the child you give to the interval-resizer component.
// The styling can be anything, but keep in mind that the height
// attribute will be overwritten by the interval-resizer in order
// to switch between measuring the height and snapping to an
// interval, so it's best to not put a height in here.
.internals-wrapper {
  display: flex;
  flex-direction: column;

  // This is an example of how to style at least one of the
  // children inside of your internals-wrapper. By allowing it
  // to flex-grow and flex-shrink, and making the flex-basis auto,
  // this component will fill any remaining height after the
  // component expands to the next-biggest interval.
  > .internals-content {
    flex: 1 1 auto;
    /*
    same as:
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    */
  }
}
```

Of course you can always use percentages, or have hard-coded height and just
ensure they float or position how you want. The best method is the one that fits
your use case.

## Props

Required

- [intervalUnit](#intervalunit---number)
- [children](#children---jsxelement)

Not Required

- [timeoutDelay](#timeoutdelay---number)
- [instantOnReceiveProps](#instantonreceiveprops---boolean)
- [minHeight](#minheight---number)
- [maxHeight](#maxheight---number)
- [className](#classname---string)
- [screenWidthCutoff](#screenwidthcutoff---number)

---

### intervalUnit - `number`

**Default**: *none* - required Prop

**Description**:  
Defines the interval in pixels to adjust height by when
resizing.

**Use**:  
This is the main feature of the component; it allows for your component
to resize to a clean pixel height, at intervals defined using intervalUnit. A
large value for intervalUnit means nice clean sizing, but the downside is lots
of unused space within the component once it resizes to a larger height.
Alternatively, a small value for intervalUnit will cause more accurate resizing,
but less guarantee that your components will round to the same height.

---

### children - `JSX.Element`

**Default**: *none* - required Prop

**Description**:  
The internal content wrapped by the IntervalResizer.

**Use**:  
See [Styling](#styling) for a detailed explanation of how to structure
the *internals*.

---

### timeoutDelay - `number`

**Default**: `0`

**Description**:  
Set a re-render timeout to wait for all prop changes and
resizing. This does not apply to props if instantOnReceiveProps is true.

**Use**:  
This exists solely to reduce the expense of watching the window for
resize events. Setting even a small value (i.e `150`) causes the component to
wait for resizing to stop before calculating the new *internals* height and
subsequently the new interval height.

---

### instantOnReceiveProps - `boolean`

**Default**: `true`

**Description**:  
Causes any `timeoutDelay` to be ignored for cases where the
props are updated. `timeoutDelay` will still fire on window resize events.

**Use**:  
When props change, it triggers a single fire of React's
`componentWillReceiveProps`. This is not expensive, and presumably will fire
infrequently unless new props are always being passed. However, window resizing
will rapid-fire calls to the resizer as the window is adjusted, which is the
reason for `timeoutDelay`. Since in most use cases the prop change is
inexpensive, `instantOnReceiveProps` is defaulted to true, and probably should
remain true for most use cases.

---

### minHeight - `number`

**Default**: `null`

**Description**: The minimum height in pixels of the interval-resizer. If given,
will not allow the component to become smaller than the provided height.

**Use**: For if you don't want your component to shrink beyond a certain height.

---

### maxHeight - `number`

**Default**: `null`

**Description**:  
The maximum height in pixels of the interval-resizer. If given,
will not allow the component to become larger than the provided height.

**Use**:  
For if you don't want your component to grow beyond a certain height.

---

### className - `string`

**Default**: `null`

**Description**:  
A value for the class attribute on the component.

**Use**:  
For applying styling to the component, as it has no inherent styling.

---

### screenWidthCutoff - `number`

**Default**: `0`

**Description**:  
Defined the minimum width in pixels for interval resizing. Any
browser window width below this amount will be resized normally with content
(height: auto).

**Use**:  
Used in tandem with styling breakpoints, this allows you to stop
interval resizing below a certain screen width. The main use case is when you
only have one column of dashboard widgets and you no longer need the heights to
round off as the components fall one after another in a scrolling UI.

---

## Removing the prop-types dependency
If you want to remove the PropTypes dependency from interval-resizer, extract
the IntervalResizer file found in `src/IntervalResizer.jsx` and place it within
your React project as needed. Then remove all references to propTypes. However,
the prop-types package provides this function with useful warnings, and it is
recommended that it remains in.
