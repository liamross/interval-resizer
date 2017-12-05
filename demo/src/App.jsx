import React, { Component } from 'react';
import { IntervalResizer } from 'interval-resizer';
import './App.css';

const lorem = ('Try playing around with the word count to see how this component grows with a change to its internals. Also try adjusting the width by sliding the dividers within this demo to constrain the width of the component. If you find any issues with the component or the documentation, open an issue in the GitHub repository. If you have any improvement suggestions, either email me at the email listed on GitHub, or open an issue. If you’ve used this component in a project and are ok with me posting it as an example (or you just want to tell me about it), email me, I’d love to hear about it. I’m running out of things to say. I guess I’ll just have to start repeating.').split(' ');

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
              minHeight={typeof this.props.minHeight === 'number' ? this.props.minHeight : 0}
              maxHeight={typeof this.props.maxHeight === 'number' ? this.props.maxHeight : -1}
              className="resizing-widget"
              screenWidthCutoff={typeof this.props.screenWidthCutoff === 'number' ? this.props.screenWidthCutoff : 0}
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
