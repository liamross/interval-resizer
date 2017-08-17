/* IntervalResizer.jsx -- A React resizer which detects the height of its
 * internals, then expands them to the nearest multiple of a pre-defined
 * interval.
 *
 * Copyright (C) 2017 Liam Ross
 *
 * This software may be modified and distributed under the terms of the MIT
 * license.  See the LICENSE file for details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Resizer extends Component {
  constructor() {
    super();
    this.waitToRender = null;
    this.resizeInstant = this.resizeInstant.bind(this);
    this.resizeTimeout = this.resizeTimeout.bind(this);
    this.setWrapperHeight = this.setWrapperHeight.bind(this);
    this.getIntervalHeight = this.getIntervalHeight.bind(this);
  }

  componentWillReceiveProps() {
    this.props.instantOnReceiveProps ?
      this.resizeInstant():
      this.resizeTimeout();
  }

  componentDidMount() {
    this.resizeInstant();
    window.addEventListener('resize', this.resizeTimeout);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeTimeout);
  }

  /**
   * Calls setWrapperHeight with no delay regardless of timeoutDelay. This is
   * only called on initial render and when props change
   */
  resizeInstant() {
    clearTimeout(this.waitToRender);
    this.waitToRender = setTimeout(() => {
      this.setWrapperHeight();
    });
  }

  /**
   * Starts a timeout based off of timeoutDelay prop (makes the resize op less
   * expensive). If function is called while timeout is in progress, it clears
   * the timeout and begins again.
   */
  resizeTimeout() {
    clearTimeout(this.waitToRender);
    this.waitToRender = setTimeout(() => {
      this.setWrapperHeight();
    }, this.props.timeoutDelay);
  }

  /**
   * Detects the internal wrapper height and sets the resize wrapper to the next
   * larger intervalUnit multiple, then adjusts the content to fit that height.
   */
  setWrapperHeight() {
    const { uniqueId } = this.props;
    const resizeWrapper = document.getElementById(`_intervalResize${uniqueId}`);
    const internalWrapper = resizeWrapper.firstChild;
    internalWrapper.style.height = 'auto';
    const contentHeight = internalWrapper.offsetHeight;
    const newHeight = this.getIntervalHeight(contentHeight);
    resizeWrapper.style.height = `${String(newHeight)}px`;
    internalWrapper.style.height = '100%';
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
        id={`_intervalResize${this.props.uniqueId}`}
        className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

Resizer.defaultProps = {
  timeoutDelay: 0,              // No delay by default.
  minHeight: null,              // No min height by default.
  maxHeight: null,              // No max height by default.
  uniqueId: '',                 // No addition to id by default.
  className: null,              // No class name by default.
  instantOnReceiveProps: true,  // Instant resize on prop change by default.
};

Resizer.propTypes = {
  intervalUnit: PropTypes.number.isRequired,  // Unit interval to grow by.
  children: PropTypes.element.isRequired,     // Child to populate wrapper.
  timeoutDelay: PropTypes.number,             // The re-render timeout.
  minHeight: PropTypes.number,                // The resizer's minimum height.
  maxHeight: PropTypes.number,                // The resizer's maximum height.
  uniqueId: PropTypes.string,                 // A unique id (> 1 resizer).
  className: PropTypes.string,                // A general class.
  instantOnReceiveProps: PropTypes.bool,      // Instant resize on get props.
};

export default Resizer;
