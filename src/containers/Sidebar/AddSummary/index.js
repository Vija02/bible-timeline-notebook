import React, { Component } from 'react';
import linkState from 'linkstate'

import BibleVerseSelector from 'components/BibleVerseSelector'

export default class AddSummaryIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verse1: null, verse2: null,
      title: "", summary: ""
    };
  }
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", marginBottom: 50 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <a>From</a>
          <BibleVerseSelector onChange={linkState(this, "verse1")} />
          <a>To</a>
          <BibleVerseSelector onChange={linkState(this, "verse2")} />
        </div>
        <p>Title</p>
        <input type="text" value={this.state.title} onChange={linkState(this, "title")} />
        <p>Summary</p>
        <textarea style={{ height: "100px" }} value={this.state.summary} onChange={linkState(this, "summary")} />
        <button style={{ width: "50px" }} disabled={!this.state.verse1 || !this.state.verse2}>Add</button>
      </div>
    );
  }
}