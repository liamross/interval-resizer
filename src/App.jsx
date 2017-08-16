import React, { Component } from 'react';
import IntervalResizer from './IntervalResizer/IntervalResizer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      growthUnit: null,
      timeoutDelay: null,
      minHeight: null,
      maxHeight: null,
    }
  }
  render() {
    return (
      <div>
        <h3>
          Interval Resize Demo
        </h3>
        <div className="resizeDemo-settings">
          <label>
            Growth Units:
            <input
              type="number"
              placeholder="Minimum: 50"
              value={this.state.growthUnit || ''}
              onChange={e => this.setState({
                ...this.state,
                growthUnit: Number(e.target.value),
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
                minHeight: Number(e.target.value),
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
                maxHeight: Number(e.target.value),
              })}
            />
          </label>
        </div>
        <div className="resizeDemo-body">
          {Array(20).fill(0).map((x, index) =>
            <div
              key={index}
              className="line"
              style={{ top: `${String((this.state.growthUnit ?
                Math.max(this.state.growthUnit, 50) : 50) * index)}px` }}
            />
          )}
          <IntervalResizer
            growthUnit={ this.state.growthUnit ?
              Math.max(this.state.growthUnit, 50) : 50
            }
            timeoutDelay={this.state.timeoutDelay}
            minHeight={this.state.minHeight}
            maxHeight={this.state.maxHeight}
            uniqueId="test"
            className="resizing-widget"
          >
            <div className="Outer">
              <div className="Inner Inner--one">
                <div>
                  One One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One One
                  One One One One One One One One One One One One One One One One
                </div>
              </div>
              <div className="Inner Inner--two">
                <div>
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                  Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
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
