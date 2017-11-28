"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var IntervalResizer = (function (_super) {
    tslib_1.__extends(IntervalResizer, _super);
    function IntervalResizer(props) {
        var _this = _super.call(this, props) || this;
        _this._waitToRender = null;
        _this._uid = new Date().valueOf() + '-' + Math.ceil(Math.random() * 10000000);
        _this._windowResizeListener = _this._windowResizeListener.bind(_this);
        props.uniqueId && console.warn('uniqueId is depreciated as of 2.1.0,'
            + ' and is no longer used, you can remove the prop from your code.');
        props.documentRef && console.warn('documentRef is depreciated as of 2.2.0,'
            + ' and is no longer used, you can remove the prop from your code.');
        return _this;
    }
    IntervalResizer.prototype.componentDidMount = function () {
        this._resizeTimeout(true);
        window.addEventListener('resize', this._windowResizeListener);
    };
    IntervalResizer.prototype.componentWillReceiveProps = function (newProps) {
        this._resizeTimeout(newProps.instantOnReceiveProps);
    };
    IntervalResizer.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this._windowResizeListener);
    };
    IntervalResizer.prototype.render = function () {
        return (React.createElement("div", { id: this._uid, className: this.props.className }, this.props.children));
    };
    /**
     * Necessary to discard arguments passed from event listener binding and
     * pass false instead as _resizeTimeout's 'instant' parameter.
     */
    IntervalResizer.prototype._windowResizeListener = function () {
        this._resizeTimeout(false);
    };
    /**
     * Starts a timeout based off of timeoutDelay prop. If function is called
     * while timeout is in progress, it clears the timeout and begins again. Takes
     * a boolean to determine whether it will call instantly.
     * @param {boolean} instant - True to call _setWrapperHeight instantly, false
     * to wait for timeoutDelay.
     */
    IntervalResizer.prototype._resizeTimeout = function (instant) {
        var _this = this;
        clearTimeout(this._waitToRender);
        this._waitToRender = setTimeout(function () {
            _this._setWrapperHeight();
        }, instant ? 0 : this.props.timeoutDelay);
    };
    /**
     * Detects the internal wrapper height and sets the resize wrapper to the next
     * larger intervalUnit multiple, then adjusts the content to fit that height.
     * If the window is smaller than the screenWidthCutoff, then the component
     * will match the height of the internals with no intervals.
     */
    IntervalResizer.prototype._setWrapperHeight = function () {
        var screenWidthCutoff = this.props.screenWidthCutoff;
        var resizeWrapper = window.document.getElementById(this._uid);
        var internalWrapper = resizeWrapper.firstChild;
        if (window.document.documentElement.clientWidth > screenWidthCutoff) {
            internalWrapper.style.height = 'auto';
            var contentHeight = internalWrapper.offsetHeight;
            var newHeight = this._getIntervalHeight(contentHeight);
            resizeWrapper.style.height = String(newHeight) + "px";
            internalWrapper.style.height = '100%';
        }
        else {
            resizeWrapper.style.height = 'auto';
            internalWrapper.style.height = 'auto';
        }
    };
    /**
     * Sets the height to a multiple of the intervalUnit unit, while accounting
     * for the minHeight and maxHeight. Will override minHeight with maxHeight if
     * maxHeight is smaller than minHeight.
     * @param {number} contentHeight - The 'auto' height of the content.
     * @returns {number} - Returns a multiple of your intervalUnit.
     */
    IntervalResizer.prototype._getIntervalHeight = function (contentHeight) {
        var _a = this.props, intervalUnit = _a.intervalUnit, minHeight = _a.minHeight, maxHeight = _a.maxHeight;
        var newHeight = Math.ceil(contentHeight / intervalUnit) * intervalUnit;
        if (minHeight !== null) {
            newHeight = Math.max(newHeight, Math.ceil(minHeight / intervalUnit) * intervalUnit);
        }
        if (maxHeight !== null) {
            newHeight = Math.min(newHeight, Math.floor(maxHeight / intervalUnit) * intervalUnit);
        }
        return newHeight;
    };
    IntervalResizer.defaultProps = {
        timeoutDelay: 0,
        instantOnReceiveProps: true,
        minHeight: null,
        maxHeight: null,
        className: null,
        screenWidthCutoff: 0,
    };
    return IntervalResizer;
}(React.Component));
exports.IntervalResizer = IntervalResizer;
//# sourceMappingURL=IntervalResizer.js.map