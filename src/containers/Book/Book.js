import React, { Component } from 'react';

export default class Book extends Component {
  render() {
    return (
      <div>
        <p>{this.props.match.params.bookName}</p>
      </div>
    );
  }
}