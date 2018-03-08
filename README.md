<p align="center">
  <a href="https://www.npmjs.com/package/interval-resizer">
    <img alt="Interval Resizer" src="assets/interval-resizer-header.png?raw=true" width="800">
  </a>
</p>

<p align="center">
  A React wrapper for resizing components at pre-defined intervals.<br />
  <a href="https://liamross.github.io/interval-resizer/">
    Click here to see a working demo
  </a>
</p>

<p align="center">
  <a href="https://github.com/liamross/interval-resizer/blob/master/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/interval-resizer.svg"></a>
  <a href="https://www.npmjs.com/package/interval-resizer"><img alt="NPM Version" src="https://badge.fury.io/js/interval-resizer.svg"></a>
</p>

---
  
| Site (click to open)                                   | Install command                                              |
|:------------------------------------------------------:|--------------------------------------------------------------|
| [npm](https://www.npmjs.com/package/interval-resizer)  | `npm i interval-resizer`                                     |
| [yarn](https://yarn.pm/interval-resizer)               | `yarn add interval-resizer`                                  |
| [GitHub](https://github.com/liamross/interval-resizer) | `git clone https://github.com/liamross/interval-resizer.git` |


## About the Component

### What is this for?
Interval-resizer is useful in a dashboard widget scenario, where you want your
components to expand with their content, but you don't want a bunch of uneven
heights. By setting your [intervalUnit](#intervalunit), you give the
interval-resizer intervals to snap to, which means nice even heights among all
your widget components, and a good end-user visual experience.

### How does it work?
Whenever there is a change in the width of the window or a component update
(triggered by prop changes or by any changes to the child wrapped in the
interval-resizer), the interval-resizer will evaluate what the natural height of
the *internals*. Then, the interval-resizer calculates the next interval to size
to. This allows the *internals* to resize naturally, while still rounding to a
clean interval height.

### Why is it in TypeScript?
Don't worry, the npm package is in ES5 JavaScript! The source is written in
TypeScript to generate a typings file just in case someone uses
interval-resizer in a TypeScript project. Additionally some IDEs use typing in
their corrective hinting, so it's just nice to have.

### How big is it?

**minify:** `~2200 bytes` (small)

**minify + gzip:** `~900 bytes` (very small)

## Use

### Inside your component

> See [Props](#props) for explanation and use for each prop.

```jsx
import React, { Component } from 'react';
import { IntervalResizer } from 'interval-resizer';

export default class App extends Component {
  // ...
  render() {
    return (
      <IntervalResizer
        intervalUnit={intervalUnit}
        minHeight={minHeight}
        maxHeight={maxHeight}
        className={className}
        screenWidthCutoff={screenWidthCutoff}
      >
        <div className="internals-wrapper">
          <div className="some-header">
            I'm a header
          </div>
          <div className="internals-content">
            {/* see 'Styling' below for more info */}
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

## Props

Required

- [intervalUnit](#intervalunit)
- [children](#children)

Not Required

- [minHeight](#minheight)
- [maxHeight](#maxheight)
- [className](#classname)
- [screenWidthCutoff](#screenwidthcutoff)

<h3><a name="intervalunit" href="#intervalunit">#</a> <b>intervalUnit</b> - <code>number</code></h3>

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

<h3><a name="children" href="#children">#</a> <b>children</b> - <code>JSX.Element</code></h3>

**Default**: *none* - required Prop

**Description**:  
The internal content wrapped by the IntervalResizer.

**Use**:  
See [Styling](#styling) for a detailed explanation of how to structure
the *internals*.

<h3><a name="minheight" href="#minheight">#</a> <b>minHeight</b> - <code>number</code></h3>

**Default**: `0` (not applied)

**Description**: The minimum height in pixels of the interval-resizer. If given,
will not allow the component to become smaller than the provided height.

**Use**: For if you don't want your component to shrink beyond a certain height.

<h3><a name="maxheight" href="#maxheight">#</a> <b>maxHeight</b> - <code>number</code></h3>

**Default**: `-1` (not applied)

**Description**:  
The maximum height in pixels of the interval-resizer. If given,
will not allow the component to become larger than the provided height.

**Use**:  
For if you don't want your component to grow beyond a certain height.

<h3><a name="classname" href="#classname">#</a> <b>className</b> - <code>string</code></h3>

**Default**: `undefined` (no class)

**Description**:  
A value for the class attribute on the component.

**Use**:  
For applying styling to the component, as it has no inherent styling.

<h3><a name="screenwidthcutoff" href="#screenwidthcutoff">#</a> <b>screenWidthCutoff</b> - <code>number</code></h3>

**Default**: `0` (not applied)

**Description**:  
Defined the minimum width in pixels for interval resizing. Any
browser window width below this amount will be resized normally with content
(height: auto).

**Use**:  
Used in tandem with styling breakpoints, this allows you to stop
interval resizing below a certain screen width. The main use case is when you
only have one column of dashboard widgets and you no longer need the heights to
round off as the components fall one after another in a scrolling UI.
