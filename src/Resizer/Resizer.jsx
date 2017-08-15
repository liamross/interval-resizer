import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Resizer.css';

let waitToRender = null;

class Resizer extends Component {
  constructor(props) {
    super(props);

    // Binds.
    this.renderTimeout = this.renderTimeout.bind(this);
    this.setWrapperHeight = this.setWrapperHeight.bind(this);
    this.resetWrapperHeight = this.resetWrapperHeight.bind(this);
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
    // Reset the height of the internal wrapper. This must be async or else the
    // internals flicker. If a better solution exists then implement it instead.
    setTimeout(() => {
      this.resetWrapperHeight();
    });
    // Start the timeout before setting the new height.
    waitToRender = setTimeout(() => {
      this.setWrapperHeight();
    }, this.props.timeoutDelay);
  }

  /**
   * Gets height of internal wrapper, then sets resize wrapper to next-largest
   * growthUnit interval. Finally, sets internal wrapper to 100%.
   */
  setWrapperHeight() {
    const { growthUnit, uniqueId } = this.props;
    // Get the resize wrapper.
    const sensorDiv = document.getElementById(`_resizeWrapper_${uniqueId}`);
    // Get the immediate child of the resize wrapper.
    const wrapper = sensorDiv.firstChild;
    // Get the height of the immediate child.
    const contentHeight = wrapper.offsetHeight;
    // Find the next-largest interval.
    const newHeight = Math.ceil(contentHeight / growthUnit) * growthUnit;
    // Set the resize wrapper height to newHeight.
    sensorDiv.style.height = String(newHeight) + 'px';
    // Set the height of the immediate child to 100%. Could also hard code it
    // to be String(newHeight)+'px' as well. Not sure which is better.
    wrapper.style.height = '100%';
  }

  /**
   * Resets the internal wrapper height to auto to adapt to its children.
   */
  resetWrapperHeight() {
    const { uniqueId } = this.props;
    const sensorDiv = document.getElementById(`_resizeWrapper_${uniqueId}`);
    const wrapper = sensorDiv.firstChild;
    wrapper.style.height = 'auto';
  }

  render() {
    return (
      <div id={`_resizeWrapper_${this.props.uniqueId}`}>
        {this.props.children}
      </div>
    );
  }
}

Resizer.defaultProps = {
  timeoutDelay: 400,
  uniqueId: '',
};

Resizer.propTypes = {
  growthUnit: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  uniqueId: PropTypes.string,
  timeoutDelay: PropTypes.number,
};

export default Resizer;
