import React, { Component } from 'react';
import IntervalResizer from './IntervalResizer/IntervalResizer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      blueWords: 46,
      redWords: 60,
      greenWords: 37,
      intervalUnit: 50,
      timeoutDelay: null,
      minHeight: null,
      maxHeight: null,
      instantOnReceiveProps: true,
      screenWidthCutoff: null,
    };
  }

  render() {
    return (
      <div>
        <h3>
          Interval Resize Demo
        </h3>
        <div className="resizeDemo-settings">
          <div>
            <span className="nowrapLabel">Blue words:</span>
            <input
              type="number"
              value={this.state.blueWords}
              onChange={e => this.setState({
                ...this.state,
                blueWords: e.target.value === '' ?
                  '' : Math.max(Number(e.target.value), 0),
              })}
            />
          </div>
          <div>
            <span className="nowrapLabel">Red words:</span>
            <input
              type="number"
              value={this.state.redWords}
              onChange={e => this.setState({
                ...this.state,
                redWords: e.target.value === '' ?
                  '' : Math.max(Number(e.target.value), 0),
              })}
            />
          </div>
          <div>
            <span className="nowrapLabel">Green words:</span>
            <input
              type="number"
              value={this.state.greenWords}
              onChange={e => this.setState({
                ...this.state,
                greenWords: e.target.value === '' ?
                  '' : Math.max(Number(e.target.value), 0),
              })}
            />
          </div>
          <div>
            <span className="nowrapLabel">Interval Unit:</span>
            <input
              type="number"
              placeholder="Minimum 20"
              value={this.state.intervalUnit}
              onChange={e => this.setState({
                ...this.state,
                intervalUnit: e.target.value === '' ?
                  '' : Math.max(Number(e.target.value), 0),
              }, () => console.log(this.state))}
            />
          </div>
          <div>
            <span className="nowrapLabel">Resize Delay:</span>
            <input
              type="number"
              placeholder="Empty is no delay"
              value={this.state.timeoutDelay || ''}
              onChange={e => this.setState({
                ...this.state,
                timeoutDelay: Number(e.target.value),
              })}
            />
          </div>
          <div>
            <span className="nowrapLabel">Min Height:</span>
            <input
              type="number"
              placeholder="Empty is no min"
              value={this.state.minHeight || ''}
              onChange={e => this.setState({
                ...this.state,
                minHeight: Number(e.target.value) || undefined,
              })}
            />
          </div>
          <div>
            <span className="nowrapLabel">Max Height:</span>
            <input
              type="number"
              placeholder="Empty is no max"
              value={this.state.maxHeight || ''}
              onChange={e => this.setState({
                ...this.state,
                maxHeight: Number(e.target.value) || undefined,
              })}
            />
          </div>
          <div>
            <span className="nowrapLabel">No delay on prop change:</span>
            <input
              checked={this.state.instantOnReceiveProps}
              onChange={e => this.setState({
                ...this.state,
                instantOnReceiveProps: e.target.checked,
              })}
              type="checkbox"
            />
          </div>
          <div>
            <span className="nowrapLabel">Min width for intervals:</span>
            <input
              type="number"
              placeholder="Empty is no min"
              value={this.state.screenWidthCutoff || ''}
              onChange={e => this.setState({
                ...this.state,
                screenWidthCutoff: Number(e.target.value) || undefined,
              })}
            />
          </div>
        </div>
        <div className="resizeDemo-body">
          {Array(Math.round(3240 / (this.state.intervalUnit === '' ? 
              20 : Math.max(Number(this.state.intervalUnit), 20))))
            .fill(0).map((x, i) => {
            const top = `${String((this.state.intervalUnit === '' ? 
              20 : Math.max(Number(this.state.intervalUnit), 20)) * i)}px`;
              return <div key={i} className="line" style={{ top }}>
                {top}
                </div>
            })}
          <IntervalResizer
            intervalUnit={this.state.intervalUnit === '' ? 
              20 : Math.max(Number(this.state.intervalUnit), 20)}
            timeoutDelay={this.state.timeoutDelay}
            minHeight={this.state.minHeight}
            maxHeight={this.state.maxHeight}
            uniqueId="test"
            className="resizing-widget"
            instantOnReceiveProps={this.state.instantOnReceiveProps}
            screenWidthCutoff={this.state.screenWidthCutoff}
          >
            <div className="Outer">
              <div className="Inner Inner--one">
                <div>
                  {'blue '.repeat(this.state.blueWords || 0)}
                </div>
              </div>
              <div className="Inner Inner--two">
                <div>
                  {'red '.repeat(this.state.redWords || 0)}
                </div>
              </div>
              <div className="Inner Inner--three">
                <div>
                  {'green '.repeat(this.state.greenWords || 0)}
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
