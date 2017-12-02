import React, { Component } from 'react';
import { IntervalResizer } from 'interval-resizer';
import './App.css';

const lorem = ('Man oh man this is a pretty sweet demo. I bet whoever'
  + ' made this really wanted to demo this application in an easy-to-use'
  + ' way, and boy does it pay off. I mean look at this stuff! Granted, he'
  + ' used an awesome open source thing called storybook because he saw AirBnB'
  + ' use it for their datepicker component and thought it looked pretty cool.'
  + ' Anyways this is an example dashboard component and as you can see, when'
  + ' you add more text, it grows to the next-largest interval! Check this'
  + ' project out on GitHub or use it in your next Dashboard Project! Make sure'
  + ' you open an issue if you find any mistakes, or maybe even star it if you'
  + ' like it, but hey I\'d never say that myself.').split(' ');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lorem: this.setLorem(props.bodyWords),
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.bodyWords !== this.props.bodyWords) {
      this.setState({
        lorem: this.setLorem(nextProps.bodyWords),
      })
    }
  }

  setLorem(bodyWords) {
    let returnedLorem = '';
    for(let i = 0; i < bodyWords; i++) {
      returnedLorem = returnedLorem + lorem[i % lorem.length] + ' ';
    }
    return returnedLorem;
  }

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
              minHeight={this.props.minHeight}
              maxHeight={this.props.maxHeight}
              className="resizing-widget"
              screenWidthCutoff={this.props.screenWidthCutoff}
            >
              <div className="Outer">
                <div className="Header">
                  <h4>
                    Dashboard Widget
                  </h4>
                </div>
                <div className="Body">
                  {this.state.lorem}
                </div>
                <div className="Footer">
                  <h4>
                    Some Neat Footer
                  </h4>
                </div>
              </div>
            </IntervalResizer>
          }
        </div>
      </div>
    );
  }
}
export default App;
