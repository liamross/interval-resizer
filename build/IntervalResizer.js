'use strict';
/* IntervalResizer.js -- A React resizer which detects the height of its
 * internals, then expands them to the next-biggest multiple of a pre-defined
 * interval.
 *
 * Copyright (C) 2017 Liam Ross
 *
 * This software may be modified and distributed under the terms of the MIT
 * license. See the LICENSE file for details.
 */
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

var propTypes = {
  intervalUnit: _propTypes2.default.number.isRequired,
  children: _propTypes2.default.element.isRequired,
  timeoutDelay: _propTypes2.default.number,
  minHeight: _propTypes2.default.number,
  maxHeight: _propTypes2.default.number,
  uniqueId: _propTypes2.default.string,
  className: _propTypes2.default.string,
  instantOnReceiveProps: _propTypes2.default.bool,
  screenWidthCutoff: _propTypes2.default.number
};
var defaultProps = {
  timeoutDelay: 0,
  minHeight: null,
  maxHeight: null,
  uniqueId: 'noUID',
  className: null,
  instantOnReceiveProps: true,
  screenWidthCutoff: 0
};

var IntervalResizer = function (_Component) {
  _inherits(IntervalResizer, _Component);

  function IntervalResizer() {
    _classCallCheck(this, IntervalResizer);

    var _this = _possibleConstructorReturn(this, (IntervalResizer.__proto__ || Object.getPrototypeOf(IntervalResizer)).call(this));

    _this.waitToRender = null;
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
  }, {
    key: 'windowResizeListener',
    value: function windowResizeListener() {
      this.resizeTimeout(false);
    }
  }, {
    key: 'resizeTimeout',
    value: function resizeTimeout(instant) {
      var _this2 = this;

      clearTimeout(this.waitToRender);
      this.waitToRender = setTimeout(function () {
        _this2.setWrapperHeight();
      }, instant ? 0 : this.props.timeoutDelay);
    }
  }, {
    key: 'setWrapperHeight',
    value: function setWrapperHeight() {
      var _props = this.props,
        uniqueId = _props.uniqueId,
        screenWidthCutoff = _props.screenWidthCutoff;

      var resizeWrapper = document.getElementById('intervalResize_' + uniqueId);
      var internalWrapper = resizeWrapper.firstChild;
      if (document.documentElement.clientWidth > screenWidthCutoff) {
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
          id: 'intervalResize_' + this.props.uniqueId,
          className: this.props.className
        },
        this.props.children
      );
    }
  }]);

  return IntervalResizer;
}(_react.Component);

IntervalResizer.propTypes = propTypes;
IntervalResizer.defaultProps = defaultProps;
exports.default = IntervalResizer;