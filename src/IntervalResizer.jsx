
/* IntervalResizer.jsx -- A React resizer which detects the height of its
 * internals, then expands them to the next-biggest multiple of a pre-defined
 * interval.
 *
 * Copyright (C) 2017 Liam Ross
 *
 * This software may be modified and distributed under the terms of the MIT
 * license. See the LICENSE file for details.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  intervalUnit: PropTypes.number.isRequired,  // Unit interval to grow by.
  children: PropTypes.element.isRequired,     // Child to populate wrapper.
  documentRef: PropTypes.object.isRequired,   // Reference to the document.
  timeoutDelay: PropTypes.number,             // The re-render timeout.
  minHeight: PropTypes.number,                // The resizer's minimum height.
  maxHeight: PropTypes.number,                // The resizer's maximum height.
  className: PropTypes.string,                // A general class.
  instantOnReceiveProps: PropTypes.bool,      // Instant resize on get props.
  screenWidthCutoff: PropTypes.number,        // Stop intervals at this width.
};

const defaultProps = {
  timeoutDelay: 0,              // No delay by default.
  minHeight: null,              // No min height by default.
  maxHeight: null,              // No max height by default.
  className: null,              // No class by default.
  instantOnReceiveProps: true,  // Instant resize on prop change by default.
  screenWidthCutoff: 0,         // Cutoff at 0 width by default.
};

class IntervalResizer extends Component {
  constructor() {
    super();
    this.waitToRender = null;
    this.uid = new Date().valueOf() + '-' + Math.ceil(Math.random() * 10000000);
    this.windowResizeListener = this.windowResizeListener.bind(this);
  }

  componentDidMount() {
    this.resizeTimeout(true);
    window.addEventListener('resize', this.windowResizeListener);
  }

  componentWillReceiveProps() {
    this.resizeTimeout(this.props.instantOnReceiveProps);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResizeListener);
  }

  /**
   * Necessary to discard arguments passed from event listener binding and
   * pass false instead as resizeTimeout's 'instant' parameter.
   */
  windowResizeListener() {
    this.resizeTimeout(false);
  }

  /**
   * Starts a timeout based off of timeoutDelay prop. If function is called
   * while timeout is in progress, it clears the timeout and begins again. Takes
   * a boolean to determine whether it will call instantly.
   * @param {boolean} instant - True to call setWrapperHeight instantly, false
   * to wait for timeoutDelay.
   */
  resizeTimeout(instant) {
    clearTimeout(this.waitToRender);
    this.waitToRender = setTimeout(() => {
      this.setWrapperHeight();
    }, instant ? 0 : this.props.timeoutDelay);
  }

  /**
   * Detects the internal wrapper height and sets the resize wrapper to the next
   * larger intervalUnit multiple, then adjusts the content to fit that height.
   * If the window is smaller than the screenWidthCutoff, then the component
   * will match the height of the internals with no intervals.
   */
  setWrapperHeight() {
    const { screenWidthCutoff, documentRef } = this.props;
    const resizeWrapper = documentRef.getElementById(this.uid);
    const internalWrapper = resizeWrapper.firstChild;
    if (documentRef.documentElement.clientWidth > screenWidthCutoff) {
      internalWrapper.style.height = 'auto';
      const contentHeight = internalWrapper.offsetHeight;
      const newHeight = this.getIntervalHeight(contentHeight);
      resizeWrapper.style.height = `${String(newHeight)}px`;
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
  getIntervalHeight(contentHeight) {
    const { intervalUnit, minHeight, maxHeight } = this.props;
    let newHeight = Math.ceil(contentHeight / intervalUnit) * intervalUnit;
    if (minHeight !== null) {
      newHeight = Math.max(
        newHeight,
        Math.ceil(minHeight / intervalUnit) * intervalUnit,
      );
    }
    if (maxHeight !== null) {
      newHeight = Math.min(
        newHeight,
        Math.floor(maxHeight / intervalUnit) * intervalUnit,
      );
    }
    return newHeight;
  }

  render() {
    return (
      <div
        id={this.uid}
        className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

IntervalResizer.propTypes = propTypes;
IntervalResizer.defaultProps = defaultProps;

export default IntervalResizer;
