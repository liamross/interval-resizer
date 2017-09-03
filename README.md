# Interval Resizer

[Click here to see a working demo](https://liamross.github.io/interval-resizer/)

A React *resizer* which detects the height of its *internals*, then expands them
to the nearest multiple of a pre-defined interval.

## About the Component

### What is this for?
The main usage for the *resizer* is in a Dashboard scenario, where you want your
components to expand with their content, but you don't want a bunch of uneven
heights. By setting your intervalUnit, you give the *resizer* intervals to snap
to, without losing track of the original height of the *internals*. By allowing
the *internals* to snap back to their original height just long enough to get a
height measurement, the *resizer* is able to calculate the next interval to size
to, before snapping the *internals* back to fill its height.

### Logic flow within program
1. On window resize, waits the amount of time set through timeoutDelay (none by
default)
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
To get the demo running:
1. `git clone https://github.com/liamross/interval-resizer.git`
1. `npm install` or `yarn`
1. `npm start` or `yarn start`

The component itself is found in `src/IntervalResizer/IntervalResizer.jsx`. This
component can be extracted from its file It is entirely self-contained and
depends only on the React and PropTypes libraries. It can easily be refactored
to exclude the prop-types requirement.

## Use

### Props

```text
intervalUnit: number          - Unit interval to grow by.     (required)     
children:     React.Component - Child to populate wrapper.    (required)     
timeoutDelay: number          - The re-render timeout.        (default: none)
minHeight:    number          - The resizer's minimum height. (default: none)
maxHeight:    number          - The resizer's maximum height. (default: none)
uniqueId:     string          - A unique id (> 1 resizer).    (default: none)
className:    string          - A general class.              (default: none)
instantOnReceiveProps: 
              boolean,        - Instant resize on get props.  (default: true)
screenWidthCutoff: 
              number,         - Stop intervals at this width. (default: 0)
```

### Best practices
To use, extract the IntervalResizer file found in
`src/IntervalResizer/IntervalResizer.jsx` and place it within your React project
as needed. In order to work (as of August 15, 2017), this component requires the
following:
- A single child *internals*, which wraps all of the things rendered into the
*resizer*
- To benefit from the *resizer*, content within the *internals* wrapper must be
set in a way to fill the wrapper's height. This allows the interaction where the
wrapper becomes `height: auto`. The easiest way is with flexbox (I'll use 
scss):  
    ```scss
    .internals-wrapper {
        display: flex;
        flex-direction: column;
        
        .internals-content {
            flex: 1 1 auto; 
            // Or flex: 1 1 0; for all even heights.
            // (Shorthand for flex-grow, flex-shrink, flex-basis)
            // Technically, only one of the internal components has to have any
            // flex properties, and if you set it to flex: 1 1 auto; it will
            // fill the remaining height in the wrapper.
        }
    }
    ```  
    Of course you can always use percentages, or have hard-coded height and just
    ensure they float or position how you want. The best method is the one that
    fits your use case!
