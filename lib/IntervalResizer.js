"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/* IntervalResizer.(tsx|js) -- Interval Resizer is a React package for resizing
 * components along pre-defined intervals.
 *
 * Copyright (C) 2017 Liam Ross
 *
 * This software may be modified and distributed under the terms of the MIT
 * license. See the LICENSE file for details.
 */
var React = require("react");
var IntervalResizer = (function (_super) {
    __extends(IntervalResizer, _super);
    function IntervalResizer(props) {
        var _this = _super.call(this, props) || this;
        /**
         * A pass-through to _setWrapperHeight, allows passing props instead of
         * event from the listener, since sometimes we would like to call
         * _setWrapperHeight directly with nextProps or from componentDidMount.
         * @private
         */
        _this._resizeListener = function () {
            _this._setWrapperHeight(_this.props);
        };
        /**
         * Detects the internal wrapper height and sets the resize wrapper to the next
         * larger intervalUnit multiple, then adjusts the content to fit that height.
         * If the window is smaller than the screenWidthCutoff, then the component
         * will match the height of the internals with no intervals.
         * @param {IIntervalResizerProps} props - The current props.
         * @private
         */
        _this._setWrapperHeight = function (props) {
            var screenWidthCutoff = props.screenWidthCutoff;
            if (_this._resizerRef) {
                var internalWrapper = _this._resizerRef.firstChild;
                if (!screenWidthCutoff || window.document.documentElement.clientWidth > screenWidthCutoff) {
                    internalWrapper.style.height = 'auto';
                    var contentHeight = internalWrapper.offsetHeight;
                    var newHeight = _this._getIntervalHeight(contentHeight, props);
                    _this._resizerRef.style.height = String(newHeight) + "px";
                    internalWrapper.style.height = '100%';
                }
                else {
                    _this._resizerRef.style.height = 'auto';
                    internalWrapper.style.height = 'auto';
                }
            }
            else {
                console.error('Error: unable to find interval resizer in DOM.');
            }
        };
        /**
         * Sets the height to a multiple of the intervalUnit unit, while accounting
         * for the minHeight and maxHeight. Will override minHeight with maxHeight if
         * maxHeight is smaller than minHeight.
         * @param {number} contentHeight - The 'auto' height of the content.
         * @param {IIntervalResizerProps} props - The current props.
         * @returns {number} - Returns a multiple of your intervalUnit.
         * @private
         */
        _this._getIntervalHeight = function (contentHeight, props) {
            var intervalUnit = props.intervalUnit, minHeight = props.minHeight, maxHeight = props.maxHeight;
            var newHeight = Math.ceil(contentHeight / intervalUnit) * intervalUnit;
            if (typeof minHeight === 'number' && minHeight > 0) {
                newHeight = Math.max(newHeight, Math.ceil(minHeight / intervalUnit) * intervalUnit);
            }
            if (typeof maxHeight === 'number' && maxHeight >= 0) {
                newHeight = Math.min(newHeight, Math.floor(maxHeight / intervalUnit) * intervalUnit);
            }
            return newHeight;
        };
        props.uniqueId && console.error('uniqueId is depreciated as of 2.1.0,'
            + ' and is no longer used.');
        props.documentRef && console.error('documentRef is depreciated as of 2.2.0,'
            + ' and is no longer used.');
        props.timeoutDelay && console.error('timeoutDelay is depreciated as of'
            + ' 3.1.0, and is no longer used.');
        props.instantOnReceiveProps && console.error('instantOnReceiveProps is'
            + ' depreciated as of 3.1.0, and is no longer used.');
        return _this;
    }
    ;
    IntervalResizer.prototype.componentDidMount = function () {
        this._setWrapperHeight(this.props);
        window.addEventListener('resize', this._resizeListener);
    };
    ;
    IntervalResizer.prototype.componentDidUpdate = function () {
        this._setWrapperHeight(this.props);
    };
    IntervalResizer.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this._resizeListener);
    };
    ;
    IntervalResizer.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: this.props.className, ref: function (ref) { return _this._resizerRef = ref; } }, this.props.children));
    };
    ;
    IntervalResizer.defaultProps = {
        minHeight: 0,
        maxHeight: -1,
        className: '',
        screenWidthCutoff: 0,
    };
    return IntervalResizer;
}(React.Component));
exports.IntervalResizer = IntervalResizer;
//# sourceMappingURL=IntervalResizer.js.map