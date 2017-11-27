# Interval Resizer Demo

## Get it running

1. Make sure your terminal is cd to ~\interval-resizer\demo
1. Run `npm install` or `yarn` to install node_modules
1. Run `npm start` or `yarn start` to view demo locally

## If you choose to edit IntervalResizer.jsx

The source IntervalResizer.jsx file is actually outside of demo, in the root
~\interval-resizer\src folder, and is compiled down into minified javascript
within the ~\interval-resizer\src folder. This demo uses the latest npm package
version of interval-resizer, and so any changes you make in the jsx will not be
reflected in the demo. If you want to edit the component, and you want to use
the storybook interface to test it, do the following:


1. Copy the IntervalResizer.jsx file into your ~\interval-resizer\demo\src
folder
1. Change the import in App.jsx from `'interval-resizer'` to
`'./IntervalResizer'` in order to import the original file instead of the npm
package.
1. All changes you make will now be reflected in the storybook demo.

> If you have any questions, email me at the email listed on
> [GitHub](https://github.com/liamross), or report any issues to the
> [Issue Board](https://github.com/liamross/interval-resizer/issues).