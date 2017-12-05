Only versions where code functionality changed are documented in this log. All
unmentioned versions are to documentation or are code cleanup.

## **3.2.0**
- [Refactor] No longer relies on randomly generated ID, now uses refs.
- [Refactor] Uses componentDidUpdate in order to adjust height on child prop
change once component update is in the DOM, rather than using stale DOM when
called from componentWillReceiveProps.

## **3.1.5**
- [Refactor] Fixed maxHeight (0 is now allowed - component max height will be
limited to 0).

## **3.1.2**
- [Refactor] Now uses nextProps for all incoming props when props change.

## **3.1.1**
- [Removed] Prop `timeoutDelay` - Listener was shown to be inexpensive even with
multiple concurrent components. As such, this prop is rendered unnecessary.
- [Removed] Prop `instantOnReceiveProps` - not needed since it is tightly linked
to timeoutDelay.
- [Refactor] Code refactored to maintain static typing, more error handling and
double-checking props in breaking areas.

## **3.0.0**
- [Refactor] Component is now entirely written and typed to typescript.
- [Removed] Dependency on prop-types, as well as babel dev dependencies.
- [Added] Dependency on tslib and dev dependencies on react.
- [Note] **MUST now import using curly braces, no longer default export.**

## **2.2.7**
- [Fix] Changes from 2.2.5 are now reflected in npm package, previously was not
built into npm package properly.

## **2.2.5**
- [Refactor] `componentWillReceiveProps` now gives resizeTimeout the nextProps
version of `instantOnReceiveProps`. Previously took in the outdated props,
meaning you could run into issues where changing instantOnReceiveProps may not
take effect until the next prop or window size change.

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

## **<2.0.0**
- [DEPRECATED] - Versions prior to 2.0.0 have been deprecated on NPM.
- [Note] Versions prior to 2.0.0 had some issues referencing the DOM
window.document object. However, I now have difficulty reproducing the bug, so
they may actually be fine. Nevertheless, many improvements have been made since
prior to 2.0's release, so it is highly encouraged that you use the latest
version.