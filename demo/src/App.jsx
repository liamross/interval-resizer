import React, { Component } from 'react';
import { IntervalResizer } from 'interval-resizer';
import './App.css';

const lorem = ('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim nunc faucibus a pellentesque sit. Tortor condimentum lacinia quis vel eros donec. Tellus id interdum velit laoreet id donec ultrices tincidunt. In egestas erat imperdiet sed. Neque convallis a cras semper. Vitae purus faucibus ornare suspendisse sed nisi lacus sed. Venenatis tellus in metus vulputate eu scelerisque felis. Viverra nam libero justo laoreet sit amet cursus. Urna neque viverra justo nec ultrices dui. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Eget velit aliquet sagittis id. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Bibendum ut tristique et egestas quis ipsum suspendisse ultrices gravida. Maecenas pharetra convallis posuere morbi leo urna molestie at. At urna condimentum mattis pellentesque id nibh tortor id aliquet. Arcu non sodales neque sodales ut etiam sit amet nisl. Eleifend donec pretium vulputate sapien nec. Aliquam etiam erat velit scelerisque in dictum non consectetur.').split(' ');
export const demoTextLength = lorem.length;

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
