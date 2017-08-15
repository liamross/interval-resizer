import React, { Component } from 'react';
import Resizer from './Resizer/Resizer';
import './App.css';

const growthUnit = 50;

class App extends Component {
  render() {
    return (
      <div>
        <div className="line"
             style={{ top: `${String(growthUnit * 1 + 18)}px` }} />
        <div className="line"
             style={{ top: `${String(growthUnit * 2 + 18)}px` }} />
        <div className="line"
             style={{ top: `${String(growthUnit * 3 + 18)}px` }} />
        <div className="line"
             style={{ top: `${String(growthUnit * 4 + 18)}px` }} />
        <div className="line"
             style={{ top: `${String(growthUnit * 5 + 18)}px` }} />
        <div className="line"
             style={{ top: `${String(growthUnit * 6 + 18)}px` }} />
        <div className="line"
             style={{ top: `${String(growthUnit * 7 + 18)}px` }} />
        <div className="line"
             style={{ top: `${String(growthUnit * 8 + 18)}px` }} />
        <div className="line"
             style={{ top: `${String(growthUnit * 9 + 18)}px` }} />
        <Resizer growthUnit={growthUnit} timeoutDelay={0}>
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
