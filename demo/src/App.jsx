import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IntervalResizer from 'interval-resizer';
import './App.css';

const propTypes = {
  componentMounted: PropTypes.bool.isRequired,
  blueWords: PropTypes.number.isRequired,
  redWords: PropTypes.number.isRequired,
  greenWords: PropTypes.number.isRequired,
  intervalUnit: PropTypes.number,
  timeoutDelay: PropTypes.number,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  instantOnReceiveProps: PropTypes.bool.isRequired,
  screenWidthCutoff: PropTypes.number,
};

const defaultProps = {
  intervalUnit: null,
  timeoutDelay: null,
  minHeight: null,
  maxHeight: null,
  screenWidthCutoff: null,
};

class App extends Component {
  render() {
    return (
      <div>
        <div className="resizeDemo-header">
          <p>
            Resize window with draggable border on right side, or adjust the
            Props in the 'Knobs' panel to see interval resizing in action!
          </p>
        </div>
        <div className="resizeDemo-body">
          {Array(Math.round(3240 / (this.props.intervalUnit === '' ?
            20 : Math.max(Number(this.props.intervalUnit), 20))))
            .fill(0).map((x, i) => {
              const top = `${String((this.props.intervalUnit === '' ?
                20 : Math.max(Number(this.props.intervalUnit), 20)) * i)}px`;
              return <div key={i} className="line" style={{ top }}>
                {top}
              </div>
            })}
          {this.props.componentMounted &&
            <IntervalResizer
              intervalUnit={this.props.intervalUnit === '' ?
                20 : Math.max(Number(this.props.intervalUnit), 20)}
              timeoutDelay={this.props.timeoutDelay}
              minHeight={this.props.minHeight}
              maxHeight={this.props.maxHeight}
              className="resizing-widget"
              instantOnReceiveProps={this.props.instantOnReceiveProps}
              screenWidthCutoff={this.props.screenWidthCutoff}
            >
              <div className="Outer">
                <div className="Inner Inner--one">
                  <div>
                    {'blue '.repeat(this.props.blueWords || 0)}
                  </div>
                </div>
                <div className="Inner Inner--two">
                  <div>
                    {'red '.repeat(this.props.redWords || 0)}
                  </div>
                </div>
                <div className="Inner Inner--three">
                  <div>
                    {'green '.repeat(this.props.greenWords || 0)}
                  </div>
                </div>
              </div>
            </IntervalResizer>
          }
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;
export default App;
