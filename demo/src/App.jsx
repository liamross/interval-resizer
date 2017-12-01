import React, { Component } from 'react';
import { IntervalResizer } from 'interval-resizer';
import './App.css';

const lorem = ("Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
  + " Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar"
  + " ultricies, purus lectus malesuada libero, sit amet commodo magna eros"
  + " quis urna. Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus."
  + " Pellentesque habitant morbi tristique senectus et netus et malesuada"
  + " fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci."
  + " Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse"
  + " dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris"
  + " eget neque at sem venenatis eleifend. Ut nonummy.").split(' ');

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
