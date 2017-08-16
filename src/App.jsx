import React, { Component } from 'react';
import Resizer from './Resizer/Resizer';
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
        <div className="resizeDemo-settings">
          <label>
            Growth Units:
            <input
              type="number"
              placeholder="Minimum 50"
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
              placeholder="After movement stops"
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
              placeholder="Blank is no min"
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
              placeholder="Blank is no max"
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
          <Resizer
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
          </Resizer>
        </div>
      </div>
    );
  }
}

App.defaultProps = {};

App.propTypes = {};

export default App;
