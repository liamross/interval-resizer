import React, { Component } from 'react';
import IntervalResizer from './IntervalResizer/IntervalResizer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      intervalUnit: 50,
      timeoutDelay: null,
      minHeight: null,
      maxHeight: null,
      instantOnReceiveProps: true,
    };
  }

  render() {
    return (
      <div>
        <h3>
          Interval Resize Demo
        </h3>
        <div className="resizeDemo-settings">
          <label>
            Interval Unit:
            <input
              type="number"
              placeholder="Minimum: 50"
              value={this.state.intervalUnit}
              onChange={e => this.setState({
                ...this.state,
                intervalUnit: Math.max(Number(e.target.value), 1),
              })}
            />
          </label>
          <label>
            Resize Delay:
            <input
              type="number"
              placeholder="Empty is no delay"
              value={this.state.timeoutDelay || ''}
              onChange={e => this.setState({
                ...this.state,
                timeoutDelay: Number(e.target.value),
              })}
            />
          </label>
          <label>
            Min Height:
            <input
              type="number"
              placeholder="Empty is no min"
              value={this.state.minHeight || ''}
              onChange={e => this.setState({
                ...this.state,
                minHeight: Number(e.target.value) || undefined,
              })}
            />
          </label>
          <label>
            Max Height:
            <input
              type="number"
              placeholder="Empty is no max"
              value={this.state.maxHeight || ''}
              onChange={e => this.setState({
                ...this.state,
                maxHeight: Number(e.target.value) || undefined,
              })}
            />
          </label>
          <label>
            No delay on prop change:
            <input
              checked={this.state.instantOnReceiveProps}
              onChange={e => this.setState({
                ...this.state,
                instantOnReceiveProps: e.target.checked,
              })}
              type="checkbox"
            />
          </label>
        </div>
        <div className="resizeDemo-body">
          {Array(Math.round(3240 / this.state.intervalUnit))
            .fill(0).map((x, i) => {
            const top = `${String(Math.max(this.state.intervalUnit, 1) * i)}px`;
              return <div key={i} className="line" style={{ top }}>
                {top}
                </div>
            })}
          <IntervalResizer
            intervalUnit={Math.max(this.state.intervalUnit, 1)}
            timeoutDelay={this.state.timeoutDelay}
            minHeight={this.state.minHeight}
            maxHeight={this.state.maxHeight}
            uniqueId="test"
            className="resizing-widget"
            instantOnReceiveProps={this.state.instantOnReceiveProps}
          >
            <div className="Outer">
              <div className="Inner Inner--one">
                <div>
                  One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One
                </div>
              </div>
              <div className="Inner Inner--two">
                <div>
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                </div>
              </div>
              <div className="Inner Inner--three">
                <div>
                  Three Three Three Three Three Three Three Three Three Three
                  Three Three Three Three Three Three Three Three Three Three
                  Three Three Three Three Three Three Three Three Three Three
                  Three Three Three Three Three Three Three Three Three Three
                  Three Three Three Three Three Three Three Three Three Three
                  Three Three Three Three Three Three Three Three Three Three
                  Three Three Three Three Three Three Three Three Three Three
                  Three Three Three Three Three Three Three Three Three Three
                  Three Three Three Three Three Three Three Three Three Three
                  Three Three Three Three Three Three Three Three Three Three
                  Three Three Three Three Three Three Three Three Three Three
                  Three Three Three Three Three Three Three Three Three Three
                </div>
              </div>
            </div>
          </IntervalResizer>
        </div>
      </div>
    );
  }
}

App.defaultProps = {};

App.propTypes = {};

export default App;
