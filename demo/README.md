# Interval Resizer Demo

A React *resizer* which detects the height of its *internals*, then expands them
to the nearest multiple of a pre-defined interval.

[Click here to see a working demo](https://liamross.github.io/interval-resizer/)

| Site                                                   | Install command                                              |
|--------------------------------------------------------|--------------------------------------------------------------|
| [GitHub](https://github.com/liamross/interval-resizer) | `git clone https://github.com/liamross/interval-resizer.git` |
| [npm](https://www.npmjs.com/package/interval-resizer)  | `npm i interval-resizer`                                     |
| [yarn](https://yarn.pm/interval-resizer)               | `yarn add interval-resizer`                                  |

## About the demo

1. Make sure your terminal is cd to ~\interval-resizer\demo
1. Run `npm install` or `yarn`
1. Run `npm start` or `yarn start`

## If you choose to edit IntervalResizer.jsx

> Note: if you are going to edit IntervalResizer.jsx and use it in it's jsx
> format, just move it into ~\interval-resizer\demo\src and remove
> IntervalResizer.js, as it is simply the minified plain-javascript version.

The source IntervalResizer.jsx file is actually outside of demo, in the root
~\interval-resizer\src folder, and is compiled down into minified javascript
within the ~\interval-resizer\demo\src folder for use by this demo. As a result,
any changes made to the original IntervalResizer.jsx won't be reflected in the
demo until you run `npm run build` or `yarn run build` while in
~\interval-resizer. This triggers babel to compile the jsx.