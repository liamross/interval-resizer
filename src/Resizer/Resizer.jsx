/* Resizer.jsx -- A wrapper for resizing content to hit a pre-defined interval.
 *
 * Copyright (C) 2017 Liam Ross
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Resizer extends Component {
  constructor(props) {
    super(props);

    this.waitToRender = null;
    this.renderTimeout = this.renderTimeout.bind(this);
    this.setWrapperHeight = this.setWrapperHeight.bind(this);
  }

  componentDidMount() {
    this.renderTimeout();
    window.addEventListener('resize', this.renderTimeout);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.renderTimeout);
  }

  /**
   * Starts a timeout based off of timeoutDelay prop (makes the resize op less
   * expensive). If function is called while timeout is in progress, it clears
   * the timeout and begins again.
   */
  renderTimeout() {
    clearTimeout(this.waitToRender);
    this.waitToRender = setTimeout(() => {
      this.setWrapperHeight();
    }, this.props.timeoutDelay);
  }

  /**
   * Detects the internal wrapper height and sets the resize wrapper to the next
   * larger growthUnit multiple. It then adjusts the content to fit that height.
   */
  setWrapperHeight() {
    const { growthUnit, uniqueId, minHeight, maxHeight } = this.props;
    const resizeWrapper = document.getElementById(`_resizeWrapper_${uniqueId}`);
    const internalWrapper = resizeWrapper.firstChild;
    // 1. Set height of content to auto, allowing detection of content height.
    internalWrapper.style.height = 'auto';
    // 2. Store height of content.
    const contentHeight = internalWrapper.offsetHeight;
    // 3. Find the next larger growthUnit multiple.
    let newHeight = Math.ceil(contentHeight / growthUnit) * growthUnit;
    // 4. Make sure it's larger than min if min exists.
    if (minHeight !== null) {
      newHeight = Math.max(
        newHeight,
        Math.ceil(minHeight / growthUnit) * growthUnit,
      );
    }
    // 5. Make sure it's smaller than max if max exists.
    if (maxHeight !== null) {
      newHeight = Math.min(
        newHeight,
        Math.floor(maxHeight / growthUnit) * growthUnit,
      );
    }
    // 6. Set height of resizeWrapper to growthUnit multiple newHeight.
    resizeWrapper.style.height = `${String(newHeight)}px`;
    // 7. Set height of internals to 100% again.
    internalWrapper.style.height = '100%';
  }

  render() {
    return (
      <div
        id={`_resizeWrapper_${this.props.uniqueId}`}
        className={this.props.className}
      >
        {this.props.children}
      </div>
    );
  }
}

Resizer.defaultProps = {
  timeoutDelay: 0,  // Default delay is 0, meaning instant re-rendering.
  minHeight: null,  // No min height by default.
  maxHeight: null,  // No max height by default.
  uniqueId: '',     // No addition to id by default.
  className: null,  // No class name by default.
};

Resizer.propTypes = {
  growthUnit: PropTypes.number.isRequired,  // Unit interval to grow by.
  children: PropTypes.element.isRequired,   // Child to populate wrapper.
  timeoutDelay: PropTypes.number,           // The re-render timeout.
  minHeight: PropTypes.number,              // The wrapper's minimum height.
  maxHeight: PropTypes.number,              // The wrapper's maximum height.
  uniqueId: PropTypes.string,               // A unique id (> 1 wrapper).
  className: PropTypes.string,              // A general class (styling many).
};

export default Resizer;
