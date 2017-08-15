import React, { Component } from 'react';
import PropTypes from 'prop-types';

let waitToRender = null;

class Resizer extends Component {
  constructor(props) {
    super(props);

    // Binds.
    this.renderTimeout = this.renderTimeout.bind(this);
    this.setWrapperHeight = this.setWrapperHeight.bind(this);
  }

  /**
   * Add/remove listener on mount/unmount. Right now it listens to window
   * resize, may be more efficient to listen to div resize.
   */
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
    // Clear any previous timeouts.
    clearTimeout(waitToRender);
    // Start the timeout before setting the new height.
    waitToRender = setTimeout(() => {
      this.setWrapperHeight();
    }, this.props.timeoutDelay);
  }

  /**
   * Gets height of internal wrapper, then sets resize wrapper to next-largest
   * growthUnit interval. It also ensures that it is set larger than the
   * minHeight. Finally, sets internal wrapper to 100%.
   */
  setWrapperHeight() {
    const { growthUnit, uniqueId, minHeight, maxHeight } = this.props;
    // Get the resize wrapper.
    const sensorDiv = document.getElementById(`_resizeWrapper_${uniqueId}`);
    // Get the immediate child of the resize wrapper.
    const wrapper = sensorDiv.firstChild;
    // Set the height of the immediate child to auto.
    wrapper.style.height = 'auto';
    // Get the height of the immediate child.
    const contentHeight = wrapper.offsetHeight;
    // Set newHeight to the next-largest interval of growthUnit.
    let newHeight = Math.ceil(contentHeight / growthUnit) * growthUnit;
    // If minHeight is not null, then restrict newHeight to be above or be
    // equal to minHeight.
    if (minHeight !== null) {
      newHeight = Math.max(
        newHeight,
        Math.ceil(minHeight / growthUnit) * growthUnit,
      )
    }
    // If maxHeight is not null, then restrict newHeight to be below or be
    // equal to maxHeight.
    if (maxHeight !== null) {
      newHeight = Math.min(
        newHeight,
        Math.floor(maxHeight / growthUnit) * growthUnit,
      )
    }
    // Set the resize wrapper height to newHeight.
    sensorDiv.style.height = String(newHeight) + 'px';
    // Set the height of the immediate child to 100%. This is better than hard-
    // coding, as you may have internal borders on the _resizeWrapper_, or
    // padding, causing the content to be smaller than the hard height.
    wrapper.style.height = '100%';
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
  timeoutDelay: 0,
  minHeight: null,
  maxHeight: null,
  uniqueId: '',
  className: null,
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
