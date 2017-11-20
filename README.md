# Interval Resizer

A React *resizer* which detects the height of its *internals*, then expands them
to the nearest multiple of a pre-defined interval.

[Click here to see a working demo](https://liamross.github.io/interval-resizer/)

| Site                                                   | Install command                                              |
|--------------------------------------------------------|--------------------------------------------------------------|
| [GitHub](https://github.com/liamross/interval-resizer) | `git clone https://github.com/liamross/interval-resizer.git` |
| [npm](https://www.npmjs.com/package/interval-resizer)  | `npm i interval-resizer`                                     |
| [yarn](https://yarn.pm/interval-resizer)               | `yarn add interval-resizer`                                  |

## Updates

> Upcoming:
> - Callbacks for changed height

*18/11/2017* | **2.1.0**  - Now generates unique ID, no need for it to be passed.

*18/11/2017* | **2.0.2**  - NOW WORKS! Had no reference to document when used as
npm package, now passed as prop.

## About the Component

### What is this for?
The main usage for the *resizer* is in a Dashboard scenario, where you want your
components to expand with their content, but you don't want a bunch of uneven
heights. By setting your intervalUnit, you give the *resizer* intervals to snap
to, without losing track of the original height of the *internals*. By allowing
the *internals* to snap back to their original height just long enough to get a
height measurement, the *resizer* is able to calculate the next interval to size
to, before snapping the *internals* back to fill its height. This all happens
without any visual indication, meaning to the end user it appears to be cleanly
snapping between intervals whenever its content or the window width change.

### Logic flow within program
1. On window resize or prop change (including internals changing), waits the
amount of time set through timeoutDelay (none by default)
1. Once that time passes, sets *internals* to `height: auto` and detects height
1. Takes the next-largest multiple of your intervalUnit, sets *resizer* to 
that height
1. Sets the *internals* to `height: 100%`, filling *resizer* height once more

With no timeoutDelay set, this happens instantaneously, causing a smooth cycle 
of snap-resizing to a multiple of your intervalUnit. With a timeoutDelay set,
you begin to see the mechanisms at work. This will save on performance, but will
cost you in appearance, as the *internals* will wait until window resizing stops
and the timeout delay passes before resizing to fit the new multiple of
intervalUnit.

## Get Started
Options:
1. Install the npm package  
  `npm i interval-resizer`
1. [Click here to see a working demo](https://liamross.github.io/interval-resizer/)
1. Download the github yourself, along with the original component:  
  `git clone https://github.com/liamross/interval-resizer.git`  
  `cd .\demo\`  
  `npm install` or `yarn`  
  `npm start` or `yarn start`

## Use

### Importing and syntax

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
        documentRef={document}  // Must pass reference to DOM document
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

### Props

| Name                  | Type          | Default       | Description                                                                                                                                                                                                                                                                                                                    |
|-----------------------|---------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| intervalUnit          | number        | *required     | Defines the interval in pixels to adjust height by when resizing.                                                                                                                                                                                                                                                              |
| children              | React element | *required     | The internal content wrapped by the IntervalResizer.                                                                                                                                                                                                                                                                           |
| documentRef           | object        | *required     | Reference to the document object.                                                                                                                                                                                                                                                                                              |
| timeoutDelay          | number        | 0             | Set a re-render timeout to wait for all prop changes and resizing. This does not apply to props if instantOnReceiveProps is true.                                                                                                                                                                                              |
| minHeight             | number        | null          | The minimum height in pixels of the IntervalResizer. If given, will not allow the component to become smaller than the provided height.                                                                                                                                                                                        |
| maxHeight             | number        | null          | The maximum height in pixels of the IntervalResizer. If given, will not allow the component to become larger than the provided height.                                                                                                                                                                                         |
| className             | string        | null          | A value for the class attribute on the component.                                                                                                                                                                                                                                                                              |
| instantOnReceiveProps | boolean       | true          | Causes any timeoutDelay to be ignored for cases where the props are updated. This allows for instant resizing when the content height changes (a single set height call from componentWillReceiveProps) while still allowing for timeoutDelay to wait for the browser to stop resizing before calling the set height function. |
| screenWidthCutoff     | number        | 0             | Defined the minimum width in pixels for interval resizing. Any browser window width below this amount will be resized normally with content (height: auto).                                                                                                                                                                    |


### Best practices
To use, add it to your project using npm or yarn, or to customize extract the
IntervalResizer file found in `src/IntervalResizer.jsx` and place it within your
React project as needed. This will allow you to remove PropTypes if you don't
want them as a dependency in your project. In order to work (as of November 18,
2017), this component requires the following:
- A single child *internals*, which wraps all of the things rendered into the
*resizer*
- The prop-types package installed (the only dependency, besides a peer
dependency on react - or refactor to remove PropTypes, they're just there for
throwing helpful warnings)

To benefit from the *resizer*, content within the *internals* wrapper must be
set in a way to fill the wrapper's height. This allows the interaction where the
wrapper becomes `height: auto`. The easiest way is with flexbox, as demonstrated
in the following examples (obviously the class names can be whatever you want,
I just use these for the example).

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
ensure they float or position how you want. The best method is the one that
fits your use case!
