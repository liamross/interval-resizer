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
within the ~\interval-resizer\src folder. This demo uses the latest npm package
version of interval-resizer, and so any changes you make in the jsx will not be
reflected in the demo. Instead, try changing the demo reference to a copy of the
jsx that you make within the demo folder, or just use it in your own program!