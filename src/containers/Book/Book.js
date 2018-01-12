import React, { Component } from 'react';

export default class Book extends Component {
  render() {
    return (
      <div style={{ paddingLeft: 40 }}>
        <p>{this.props.match.params.bookName}</p>
        <p style={{ width: "30vw" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean velit velit, consequat nec porttitor rutrum, molestie eget nibh. Nullam accumsan commodo dolor, sed porta augue. Pellentesque tempus tincidunt neque a efficitur. Aliquam semper efficitur ante, nec malesuada risus blandit non. Proin scelerisque, est eget dignissim viverra, ligula odio dictum mauris, eget porttitor risus elit et magna. Sed molestie, augue non sollicitudin malesuada, nisl neque finibus lorem, ut sollicitudin sem justo sed quam. Nunc aliquam lacus diam, eget dignissim leo convallis et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed porta sit amet arcu sit amet sollicitudin. Quisque posuere eu libero et eleifend. In et fringilla sapien. Aenean eu justo sed quam sollicitudin ultrices vitae pharetra felis. Sed ac dolor purus.</p>
      </div>
    );
  }
}