import React, { Component } from 'react';
import ReactGesture from 'react-gesture';

import oldTestament from 'assets/old.json'

import { formatBook } from 'helper'

class MainTimeline extends Component {
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
          <div style={{ paddingLeft: 40, userSelect: "none", display: "inline-flex", alignItems: "center", flexDirection: "row", backgroundColor: "yellow", height: 300, transform: `translate3d(${this.state.scrollLeft}px, 0,0)` }}>
            {
              oldTestament.map((book, i) => [
                <div key={`books_${i}`} style={{ flex: "1 0 0" }}>
                  <div style={{ padding: 5, backgroundColor: "grey", cursor: "pointer" }} onClick={() => { this.props.history.push(`/book/${formatBook(book)}`) }}>
                    {book}
                  </div>
                </div>,
                <hr key={`hr_${i}`} style={{ width: 50, border: 0, borderTop: "dashed 1px" }} />
              ])
            }
          </div>
        </ReactGesture>
      </div>
    );
  }
}

export default MainTimeline;
