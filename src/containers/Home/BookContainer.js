import React, { Component } from 'react';

import { formatBook } from 'helper'

import styles from './BookContainer.module.css'

export default class BookContainer extends Component {
  render() {
    return (
      <div className={styles.bookContainer}>
        <div className={styles.bookSelector} onMouseDown={(e) => { e.stopPropagation() }} onClick={() => {
          this.props.history.push(`/book/${formatBook(this.props.book.bookName)}`)
        }}>
          {this.props.book.bookName}
        </div>
      </div>
    );
  }
}