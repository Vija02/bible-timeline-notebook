import React, { Component } from 'react';
import ReactGesture from 'react-gesture';

import oldTestament from 'assets/old.json'

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = { holding: false, holdStart: 0, scrollLeft: 0, scrollStart: 0 };
  }
  render() {

    return (
      <div style={{ overflow: "hidden" }}>
        <ReactGesture
          onMouseDown={(a) => { this.setState({ holding: true }) }}
          onMouseUp={() => { this.setState({ holding: false, holdStart: 0, scrollStart: this.state.scrollLeft }) }}
          onMouseMove={(a) => {
            if (this.state.holding) {
              if (this.state.holdStart === 0) {
                this.setState({ holdStart: a.clientX })
              }

              this.setState({ scrollLeft: this.state.scrollStart + a.clientX - this.state.holdStart })
            }
          }}
        >
          <div style={{ userSelect: "none", display: "inline-flex", flexDirection: "row", backgroundColor: "yellow", height: 600, transform: `translate3d(${this.state.scrollLeft}px, 0,0)` }}>
            {
              oldTestament.map((book, i) => (
                <div key={i} style={{ flex: "1 0 0", marginRight: 10 }}>
                  <div style={{ padding: 5, backgroundColor: "grey" }}>
                    {book}
                  </div>
                </div>
              ))
            }
          </div>
        </ReactGesture>
      </div>
    );
  }
}

export default Root;
