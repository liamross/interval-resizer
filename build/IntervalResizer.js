'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* IntervalResizer.jsx -- A React resizer which detects the height of its
 * internals, then expands them to the next-biggest multiple of a pre-defined
 * interval.
 *
 * Copyright (C) 2017 Liam Ross
 *
 * This software may be modified and distributed under the terms of the MIT
 * license. See the LICENSE file for details.
 */


var propTypes = {
  intervalUnit: _propTypes2.default.number.isRequired, // Unit interval to grow by.
  children: _propTypes2.default.element.isRequired, // Child to populate wrapper.
  documentRef: _propTypes2.default.object.isRequired, // Reference to the document.
  timeoutDelay: _propTypes2.default.number, // The re-render timeout.
  minHeight: _propTypes2.default.number, // The resizer's minimum height.
  maxHeight: _propTypes2.default.number, // The resizer's maximum height.
  className: _propTypes2.default.string, // A general class.
  instantOnReceiveProps: _propTypes2.default.bool, // Instant resize on get props.
  screenWidthCutoff: _propTypes2.default.number // Stop intervals at this width.
};

var defaultProps = {
  timeoutDelay: 0, // No delay by default.
  minHeight: null, // No min height by default.
  maxHeight: null, // No max height by default.
  className: null, // No class by default.
  instantOnReceiveProps: true, // Instant resize on prop change by default.
  screenWidthCutoff: 0 // Cutoff at 0 width by default.
};

var IntervalResizer = function (_Component) {
  _inherits(IntervalResizer, _Component);

  function IntervalResizer() {
    _classCallCheck(this, IntervalResizer);

    var _this = _possibleConstructorReturn(this, (IntervalResizer.__proto__ || Object.getPrototypeOf(IntervalResizer)).call(this));

    _this.waitToRender = null;
    _this.uid = new Date().valueOf() + '-' + Math.ceil(Math.random() * 10000000);
    _this.windowResizeListener = _this.windowResizeListener.bind(_this);
    return _this;
  }

  _createClass(IntervalResizer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resizeTimeout(true);
      window.addEventListener('resize', this.windowResizeListener);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.resizeTimeout(this.props.instantOnReceiveProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.windowResizeListener);
    }

    /**
     * Necessary to discard arguments passed from event listener binding and
     * pass false instead as resizeTimeout's 'instant' parameter.
     */

  }, {
    key: 'windowResizeListener',
    value: function windowResizeListener() {
      this.resizeTimeout(false);
    }

    /**
     * Starts a timeout based off of timeoutDelay prop. If function is called
     * while timeout is in progress, it clears the timeout and begins again. Takes
     * a boolean to determine whether it will call instantly.
     * @param {boolean} instant - True to call setWrapperHeight instantly, false
     * to wait for timeoutDelay.
     */

  }, {
    key: 'resizeTimeout',
    value: function resizeTimeout(instant) {
      var _this2 = this;

      clearTimeout(this.waitToRender);
      this.waitToRender = setTimeout(function () {
        _this2.setWrapperHeight();
      }, instant ? 0 : this.props.timeoutDelay);
    }

    /**
     * Detects the internal wrapper height and sets the resize wrapper to the next
     * larger intervalUnit multiple, then adjusts the content to fit that height.
     * If the window is smaller than the screenWidthCutoff, then the component
     * will match the height of the internals with no intervals.
     */

  }, {
    key: 'setWrapperHeight',
    value: function setWrapperHeight() {
      var _props = this.props,
          screenWidthCutoff = _props.screenWidthCutoff,
          documentRef = _props.documentRef;

      var resizeWrapper = documentRef.getElementById(this.uid);
      var internalWrapper = resizeWrapper.firstChild;
      if (documentRef.documentElement.clientWidth > screenWidthCutoff) {
        internalWrapper.style.height = 'auto';
        var contentHeight = internalWrapper.offsetHeight;
        var newHeight = this.getIntervalHeight(contentHeight);
        resizeWrapper.style.height = String(newHeight) + 'px';
        internalWrapper.style.height = '100%';
      } else {
        resizeWrapper.style.height = 'auto';
        internalWrapper.style.height = 'auto';
      }
    }

    /**
     * Sets the height to a multiple of the intervalUnit unit, while accounting
     * for the minHeight and maxHeight. Will override minHeight with maxHeight if
     * maxHeight is smaller than minHeight.
     * @param {number} contentHeight - The 'auto' height of the content.
     * @returns {number} - Returns a multiple of your intervalUnit.
     */

  }, {
    key: 'getIntervalHeight',
    value: function getIntervalHeight(contentHeight) {
      var _props2 = this.props,
          intervalUnit = _props2.intervalUnit,
          minHeight = _props2.minHeight,
          maxHeight = _props2.maxHeight;

      var newHeight = Math.ceil(contentHeight / intervalUnit) * intervalUnit;
      if (minHeight !== null) {
        newHeight = Math.max(newHeight, Math.ceil(minHeight / intervalUnit) * intervalUnit);
      }
      if (maxHeight !== null) {
        newHeight = Math.min(newHeight, Math.floor(maxHeight / intervalUnit) * intervalUnit);
      }
      return newHeight;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          id: this.uid,
          className: this.props.className },
        this.props.children
      );
    }
  }]);

  return IntervalResizer;
}(_react.Component);

IntervalResizer.propTypes = propTypes;
IntervalResizer.defaultProps = defaultProps;

exports.default = IntervalResizer;
//# sourceMappingURL=IntervalResizer.js.map