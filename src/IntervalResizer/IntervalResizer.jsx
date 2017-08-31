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

/**
 * Returns a resizer component, which detects the height of a single child
 * component and resizes to a multiple of an intervalUnit prop. Also accounts
 * for a min and max size, and a re-render timeout delay on window resize.
 * @class IntervalResizer
 * @extends {Component}
 */
class IntervalResizer extends Component {
  constructor() {
    super();
    this.waitToRender = null;
    this.resizeTimeout = this.resizeTimeout.bind(this);
    this.setWrapperHeight = this.setWrapperHeight.bind(this);
    this.getIntervalHeight = this.getIntervalHeight.bind(this);
  }
  
  componentWillReceiveProps() {
      this.resizeTimeout(this.props.instantOnReceiveProps);
  }

  componentDidMount() {
    this.resizeTimeout(true);
    window.addEventListener('resize', () => this.resizeTimeout());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.resizeTimeout());
  }

  /**
   * Starts a timeout based off of timeoutDelay prop (makes the resize op less
   * expensive). If function is called while timeout is in progress, it clears
   * the timeout and begins again. Takes a boolean to determine whether it will
   * call instantly.
   * @param {boolean} instant
   * @memberof IntervalResizer
   */
  resizeTimeout(instant = false) {
    const delay = instant ? 0 : this.props.timeoutDelay;
    clearTimeout(this.waitToRender);
    this.waitToRender = setTimeout(() => {
      this.setWrapperHeight();
    }, delay);
  }

  /**
   * Detects the internal wrapper height and sets the resize wrapper to the next
   * larger intervalUnit multiple, then adjusts the content to fit that height.
   * If the window is smaller than the screenWidthCutoff, then the component
   * will match the height of the internals with no intervals.
   * @memberof IntervalResizer
   */
  setWrapperHeight() {
    const { uniqueId, screenWidthCutoff } = this.props;
    const resizeWrapper = document.getElementById(`intervalResize_${uniqueId}`);
    const internalWrapper = resizeWrapper.firstChild;
    if (document.documentElement.clientWidth > screenWidthCutoff) {
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
   * @memberof IntervalResizer
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
        id={`intervalResize_${this.props.uniqueId}`}
        className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

IntervalResizer.defaultProps = {
  timeoutDelay: 0,              // No delay by default.
  minHeight: null,              // No min height by default.
  maxHeight: null,              // No max height by default.
  uniqueId: 'noUID',            // 'noUID' by default.
  className: null,              // No class name by default.
  instantOnReceiveProps: true,  // Instant resize on prop change by default.
  screenWidthCutoff: 0,         // Cutoff at 0 width by default.
};

IntervalResizer.propTypes = {
  intervalUnit: PropTypes.number.isRequired,  // Unit interval to grow by.
  children: PropTypes.element.isRequired,     // Child to populate wrapper.
  timeoutDelay: PropTypes.number,             // The re-render timeout.
  minHeight: PropTypes.number,                // The resizer's minimum height.
  maxHeight: PropTypes.number,                // The resizer's maximum height.
  uniqueId: PropTypes.string,                 // A unique id (> 1 resizer).
  className: PropTypes.string,                // A general class.
  instantOnReceiveProps: PropTypes.bool,      // Instant resize on get props.
  screenWidthCutoff: PropTypes.number,        // Stop intervals at this width.
};

export default IntervalResizer;
