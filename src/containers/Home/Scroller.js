import React, { Component } from 'react';
import ReactGesture from 'react-gesture';

export default class Scroller extends Component {
  constructor(props) {
    super(props);
    this.state = { holding: false, holdStart: 0, scrollLeft: 0, scrollStart: 0 };
  }
  render() {
    return (
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
        {React.cloneElement(this.props.children, { style: { transform: `translate3d(${this.state.scrollLeft}px, 0,0)` } })}
      </ReactGesture>
    );
  }
}