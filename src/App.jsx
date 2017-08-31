import React, { Component } from 'react';
import IntervalResizer from './IntervalResizer/IntervalResizer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      blueWords: 40,
      redWords: 52,
      greenWords: 32,
      intervalUnit: 50,
      timeoutDelay: null,
      minHeight: null,
      maxHeight: null,
      instantOnReceiveProps: true,
      screenWidthCutoff: null,
      isSettingsPanelOpen: false,
    };
  }

  render() {
    return (
      <div>
        <div className="resizeDemo-header">
          <h3>
            Interval Resize Demo
          </h3>
          <br />
          <a
            onClick={() => this.setState({
              ...this.state,
              isSettingsPanelOpen: !this.state.isSettingsPanelOpen,
            })}
          >
            Toggle settings/props panel
          </a>
        </div>
        {this.state.isSettingsPanelOpen &&
          <div className="resizeDemo-settings">
            <a
              className="close-panel"
              onClick={() => this.setState({
                ...this.state,
                isSettingsPanelOpen: false,
              })}
            >
              Close panel
            </a>
            <h4>Test Variables</h4>
            <div>
              <span className="nowrapLabel">Blue words:</span>
              <input
                type="number"
                placeholder="0 words"
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
                placeholder="0 words"
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
                placeholder="0 words"
                value={this.state.greenWords}
                onChange={e => this.setState({
                  ...this.state,
                  greenWords: e.target.value === '' ?
                    '' : Math.max(Number(e.target.value), 0),
                })}
              />
            </div>
            <h4>Component Props</h4>
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
                })}
              />
            </div>
            <div>
              <span className="nowrapLabel">Resize Delay:</span>
              <input
                type="number"
                placeholder="No delay"
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
                placeholder="No min"
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
                placeholder="No max"
                value={this.state.maxHeight || ''}
                onChange={e => this.setState({
                  ...this.state,
                  maxHeight: Number(e.target.value) || undefined,
                })}
              />
            </div>
            <div>
              <span className="nowrapLabel">
                Override delay if prop change:
              </span>
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
                placeholder="No min"
                value={this.state.screenWidthCutoff || ''}
                onChange={e => this.setState({
                  ...this.state,
                  screenWidthCutoff: Number(e.target.value) || undefined,
                })}
              />
            </div>
          </div>
        }
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
