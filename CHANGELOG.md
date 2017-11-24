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