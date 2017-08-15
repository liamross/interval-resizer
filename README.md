# Interval Resizer

A React component that wraps an item, and dynamically resizes its content to a
multiple of a provided unit. This allows for a component to adapt to its
contents, but still round off cleanly to a multiple of your base unit. This
solves the paradox of having internals fit to container height, while still
having container fit height of internal content (arises when you want to have
set height of container).

At its core, this relies on the fact that contents set to fill the height of a
container that has height auto will still only be as large as they need to be.
As a result, you are able to **detect the internal height** while still **having
the internals fit to the container**.

## Explanation
1. On window resize, waits the amount of time set through timeoutDelay
1. Once that time passes, sets content height to auto (so it fits it's contents)
1. Detects content height
1. Takes the next-largest multiple of your growthUnit, sets interval resizer to 
that height
1. Sets the height of the content to 100%, filling interval resizer

With no timeoutDelay set, this happens instantaneously, causing a smooth cycle 
of snap-resizing to a multiple of your growthUnit. With a timeoutDelay set, you
begin to see the mechanisms at work. This will save on performance, but will
cost you in appearance, as the content will now shrink back to its natural
height, resize, then grow to match the new interval resizer height.
