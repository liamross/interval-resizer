import React, { Component } from 'react';
import Resizer from './Resizer/Resizer';
import './App.css';

const growthUnit = 50;

class App extends Component {
  render() {
    return (
      <div>
        {Array(20).fill(0).map((x, index) =>
          <div
            key={index}
            className="line"
            style={{ top: `${String(growthUnit * index + 18)}px` }}
          />
        )}

        <Resizer
          growthUnit={growthUnit}
          timeoutDelay={0}
          minHeight={200}
          maxHeight={500}
          uniqueId="test"
          className="resizing-widget"
        >
          <div className="Outer">
            <div className="Inner Inner--one">
              <div>
                One One One One One One One One One One One One One One One One
                One One One One One One One One One One One One One One One One
                One One
              </div>
            </div>
            <div className="Inner Inner--two">
              <div>
                Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two Two
                Two Two
              </div>
            </div>
            <div className="Inner Inner--three">
              <div>
                Three Three Three Three Three Three Three Three Three Three
                Three
                Three Three Three Three Three Three Three Three Three Three
                Three
                Three
              </div>
            </div>
          </div>
        </Resizer>
      </div>
    );
  }
}

App.defaultProps = {};

App.propTypes = {};

export default App;
