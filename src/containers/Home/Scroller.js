import React, { Component } from 'react';
import ReactGesture from 'react-gesture';
import { Motion, spring } from 'react-motion'

import GetSize from 'components/GetSize'
import { clampValue } from 'helper'

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
      propTargetValid: false, // Should the position be going to the target? (toogled on prop change)
    };
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.target !== this.props.target) {
      this.setState({ propTargetValid: true })
    }
  }
  render() {
    const xEnd = -this.state.width + document.documentElement.clientWidth

    let motionStyle;
    if (this.state.propTargetValid) {                                                           // Handle motion from props
      motionStyle = { x: spring(this.props.target ? -this.props.target : 0) }
    } else if (!this.state.holding && (this.state.targetX > 0 || this.state.targetX < xEnd)) {  // Handle out of bound
      motionStyle = { x: spring(clampValue(this.state.targetX, xEnd, 0)) }
    } else if (this.state.holding) {                                                            // Handle dragging
      motionStyle = { x: this.state.positionX }
    } else {                                                                                    // Handle velocity
      motionStyle = { x: spring(this.state.targetX) }
    }

    return (
      <Motion style={motionStyle} onRest={() => { this.state.propTargetValid && this.setState({ targetX: -this.props.target, propTargetValid: false }) }}>
        {({ x }) => {
          return (
            <ReactGesture
              disableClick={false}
              onMouseDown={(e) => { this.setState({ holding: true, positionX: x, positionStart: x, holdStart: e.clientX, targetX: x, propTargetValid: false }) }}
              onMouseUp={() => { this.setState({ holding: false }) }}
              onMouseMove={(e) => {
                if (this.state.holding) {
                  this.setState({ positionX: this.state.positionStart + (e.clientX - this.state.holdStart), targetX: this.state.positionX + e.movementX * velocityMultiplier })
                }
              }}
            >
              <div>
                <GetSize OnDimensionUpdate={({ width }) => { this.setState({ width }); this.props.onWidth(width) }}>
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