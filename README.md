# Interval Resizer

A React component that wraps an item, and dynamically resizes its content to a
multiple of a provided unit. This allows for a component to adapt to its
contents, but still round off cleanly to a multiple of your base unit.

## Explanation

1. On window resize, sets content height to auto (so it fits it's contents).
2. Waits the amount of time set through timeoutDelay.
3. Once that time passes, detects content height.
4. Takes the next-largest multiple of your growthUnit, sets interval resizer to that height.
5. Sets the height of the content to 100%, filling interval resizer.

With no timeoutDelay set, this happens instantaneously, causing a smooth cycle of snap-resizing
to a multiple of your growthUnit. With a timeoutDelay set, you begin to see the mechanisms at work.
This will save on performance, but will cost you in appearance, as the content will now shrink
back to its natural height, resize, then grow to match the new interval resizer height.
