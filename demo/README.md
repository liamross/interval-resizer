# Interval Resizer Demo

## Get it running

1. Make sure your terminal is cd to ~\interval-resizer\demo
1. Run `npm install` or `yarn` to install node_modules
1. Run `npm start` or `yarn start` to view demo locally

## If you choose to edit IntervalResizer.tsx

The source IntervalResizer.tsx file is actually outside of demo, in the root
~\interval-resizer\src folder, and is compiled down into javascript within the
~\interval-resizer\lib folder. This demo uses the latest npm package version of
interval-resizer, and so any changes you make in the tsx will not be reflected
in the demo. If you want to edit the component, and you want to use the
storybook interface to test it, you must use some type of compiler to port the
javascript into the demo file and import it into App.jsx.

> If you have any questions, email me at the email listed on
> [GitHub](https://github.com/liamross), or report any issues to the
> [Issue Board](https://github.com/liamross/interval-resizer/issues).
