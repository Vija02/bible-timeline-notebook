import React, { Component } from 'react';
import ReactGesture from 'react-gesture';
import { Motion, spring } from 'react-motion'

import GetSize from 'components/GetSize'

const velocityMultiplier = 13;

export default class Scroller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holding: false, positionX: 0,
      positionStart: 0, // The position of x when the hold starts
      holdStart: 0, // The position of the cursor when the hold starts, used to calculate the distance from current hold
      width: 0,
      targetX: 0,
    };
  }
  render() {
    const xEnd = -this.state.width + document.documentElement.clientWidth

    const motionStyle = !this.state.holding && (this.state.targetX > 0 || this.state.targetX < xEnd) ?
      { x: spring(Math.min(Math.max(this.state.targetX, xEnd), 0)) } : // Handle out of bound
      this.state.holding ?
        { x: this.state.positionX } :
        { x: spring(this.state.targetX) }
    return (
      <Motion style={motionStyle}>
        {({ x }) => {
          return (
            <ReactGesture
              disableClick={false}
              onMouseDown={(e) => { this.setState({ holding: true, positionX: x, positionStart: x, holdStart: e.clientX, targetX: x }) }}
              onMouseUp={() => { this.setState({ holding: false }) }}
              onMouseMove={(e) => {
                if (this.state.holding) {
                  this.setState({ positionX: this.state.positionStart + (e.clientX - this.state.holdStart), targetX: this.state.positionX + e.movementX * velocityMultiplier })
                }
              }}
            >
              <div>
                <GetSize OnDimensionUpdate={({ width }) => { this.setState({ width }) }}>
                  {React.cloneElement(this.props.children, { style: { transform: `translate3d(${x}px, 0, 0)` } })}
                </GetSize>
              </div>
            </ReactGesture>
          )
        }}
      </Motion>
    );
  }
}