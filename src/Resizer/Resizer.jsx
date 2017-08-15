import React, { Component } from 'react';
import PropTypes from 'prop-types';
let waitToRender = null;
let isWrapperHeightSet;
class Resizer extends Component {
  constructor(props) {
    super(props);
    isWrapperHeightSet = false;
    this.renderTimeout = this.renderTimeout.bind(this);
    this.setWrapperHeight = this.setWrapperHeight.bind(this);
    this.resetWrapperHeight = this.resetWrapperHeight.bind(this);
  }
  componentDidMount() {
    this.renderTimeout();
    window.addEventListener('resize', this.renderTimeout);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.renderTimeout);
  }
  renderTimeout() {
    clearTimeout(waitToRender);
    isWrapperHeightSet && setTimeout(() => { this.resetWrapperHeight() });
    waitToRender = setTimeout(() => {
      this.setWrapperHeight();
    }, this.props.timeoutDelay);
  }
  setWrapperHeight() {
    const { growthUnit, uniqueId, minHeight, maxHeight } = this.props;
    const sensorDiv = document.getElementById(`_resizeWrapper_${uniqueId}`);
    const wrapper = sensorDiv.firstChild;
    const contentHeight = wrapper.offsetHeight;
    let newHeight = Math.ceil(contentHeight / growthUnit) * growthUnit;
    if (minHeight !== null) {
      newHeight = Math.max(
        newHeight,
        Math.ceil(minHeight / growthUnit) * growthUnit,
      )
    }
    if (maxHeight !== null) {
      newHeight = Math.min(
        newHeight,
        Math.floor(maxHeight / growthUnit) * growthUnit,
      )
    }
    sensorDiv.style.height = String(newHeight) + 'px';
    wrapper.style.height = '100%';
    isWrapperHeightSet = true;
  }
  resetWrapperHeight() {
    const { uniqueId } = this.props;
    const sensorDiv = document.getElementById(`_resizeWrapper_${uniqueId}`);
    const wrapper = sensorDiv.firstChild;
    wrapper.style.height = 'auto';
    isWrapperHeightSet = false;
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
  growthUnit: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
  timeoutDelay: PropTypes.number,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  uniqueId: PropTypes.string,
  className: PropTypes.string,
};
export default Resizer;
