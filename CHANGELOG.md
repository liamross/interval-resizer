## **2.1.0**
- [Refactor] Now self-generates unique-ID to differentiate components within the
DOM.
- [Removed] Prop `uniqueId` - no longer needed, self-generates unique-ID.

## **2.0.0**
- [New] Prop `documentRef` - allows the user to pass in a reference to the
document object, interval-resizer now works as installed as an npm package.

> ***WARNING***: do not use npm versions prior to `2.0.0`, as they were unable
> to access the DOM document object. Versions prior to `2.0.0` can still have
> the IntervalResizer.jsx extracted from the src folder and used in a project,
> as the only issues occured when installing as an npm package.