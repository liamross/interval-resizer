# Interval Resizer

A React *resizer* which detects the height of its *internals*, then expands them
to the nearest multiple of a pre-defined interval.

> Note: A future change will implement
[guitarino's resize-sensor](https://github.com/guitarino/resize-sensor),
allowing for the event listener to fire on internal resizing, rather than window
resizing. This change will allow for much more flexibility while dealing with
dynamic internals, as currently a change in the height of the internal div would
not be detected by the resizer wrapper until a window resize occurs.

## About the Component

### What is this for?
The main usage for the *resizer* is in a Dashboard scenario, where you want your
components to expand with their content, but you don't want a bunch of uneven
heights. By setting your growthUnit, you give the *resizer* intervals to snap
to, without losing track of the original height of the *internals*. By allowing
the *internals* to snap back to their original height just long enough to get a
height measurement, the *resizer* is able to calculate the next interval to size
to, before snapping the *internals* back to fill its height.

### Logic flow within program
1. On window resize, waits the amount of time set through timeoutDelay (none by
default)
1. Once that time passes, sets *internals* to `height: auto` and detects height
1. Takes the next-largest multiple of your growthUnit, sets *resizer* to 
that height
1. Sets the *internals* to `height: 100%`, filling *resizer* height once more

With no timeoutDelay set, this happens instantaneously, causing a smooth cycle 
of snap-resizing to a multiple of your growthUnit. With a timeoutDelay set, you
begin to see the mechanisms at work. This will save on performance, but will
cost you in appearance, as the *internals* will wait until window resizing stops
and the timeout delay passes before resizing to fit the new multiple of
growthUnit.

## Get Started
To get the demo running:
1. `git clone https://github.com/liamross/interval-resizer.git`
1. `npm install` or `yarn`
1. `npm start` or `yarn start`

The component itself is found in `src/Resizer/Resizer.jsx`. This component can
be extracted from its file It is entirely self-contained and depends only on the
React and PropTypes libraries. It can easily be refactored to exclude the
prop-types requirement.

## Use

### Props
```
growthUnit:     number          (required)      // Unit interval to grow by.
children:       React.Component (required)      // Child to populate wrapper.
timeoutDelay:   number          (default: none) // The re-render timeout.
minHeight:      number          (defailt: none) // The resizer's minimum height.
maxHeight:      number          (defailt: none) // The resizer's maximum height.
uniqueId:       string          (defailt: none) // A unique id (> 1 resizer).
className:      string          (defailt: none) // A general class.
```

To use, extract the Resizer file found in `src/Resizer/Resizer.jsx` and place it
within your React project as needed. In order to work (as of August 15, 2017),
this component requires the following:
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