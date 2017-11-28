> Note: Only code changes are listed below, all other releases are documentation
updates.

## **2.3.0**
- [Refactor] component is now entirely written and typed to typescript.
- [Removed] dependency on prop-types, as well as babel dev dependencies.
- [Added] dependency on tslib and dev dependencies on react.

## **2.2.7**
- [Fix] changes from 2.2.5 are now reflected in npm package, previously was not
built into npm package properly.

## **2.2.5**
- [Refactor] componentWillReceiveProps now gives resizeTimeout the nextProps
version of instantOnReceiveProps. Previously took in the outdated props, meaning
you could run into issues where changing instantOnReceiveProps may not take
effect until the next prop or window size change.

## **2.2.0**
- [Refactor] npm package now has reference to the window.document object, no
longer a need for it to be passed as a prop.
- [Removed] Prop `documentRef` - no longer needed, can reference document.
- [New] Warnings for depreciated props. Will likely maintain these until the
next major release, or multiple minor releases.

## **2.1.0**
- [Refactor] Now self-generates unique-ID to differentiate components within the
DOM.
- [Removed] Prop `uniqueId` - no longer needed, self-generates unique-ID.

## **2.0.0**
- [New] Prop `documentRef` - allows the user to pass in a reference to the
document object, interval-resizer now works as installed as an npm package.

> Note: the Props uniqueId and documentRef in this version are both removed in
versions 2.1.0 and 2.2.0 respectively, as fixes to that code remove the need for
these props.

## **<2.0.0**

- Versions prior to 2.0.0 had some issues referencing the DOM window.document
object. However, I now have difficulty reproducing the bug, so they may actually
be fine. However, many improvements have been made since prior to 2.0's release,
so it is highly encouraged that you use the latest version.