import React, { Component } from 'react';
import sizeMe from 'react-sizeme'
import { Motion, spring } from 'react-motion'

import { formatBook, bookIdFromName } from 'helper'
import bookData from 'assets/book_metadata.json'

import styles from './BookContainer.module.css'

class BookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.width === 0) {
      this.props.onWidth(nextProps.size.width)
      this.setState({ width: nextProps.size.width })
    }
  }

  // Create the array of chapters
  getBookArray() {
    const chaptersCount = bookData[bookIdFromName(this.props.book.bookName) - 1].chaptersCount
    let arr = []
    for (let i = 0; i < chaptersCount; i++) {
      arr.push(i + 1)
    }
    return (
      <div className={styles.bookArrayContainer}>
        {
          arr.map((val, i) => (
            <div key={`book_container_${i}`} className={styles.bookSection}>
              <div className={styles.bookNumber}>
                {val}
              </div>
            </div>
          ))
        }
      </div>
    )
  }

  render() {
    const selected = this.props.match && this.props.match.params.bookName === formatBook(this.props.book.bookName)

    const motionStyle = selected ? {
      width: spring(this.props.extendedWidthPercentage / 100 * this.props.viewportWidth / (document.documentElement.clientWidth) * 100) // vw
    } : {
        width: spring(this.state.width / (document.documentElement.clientWidth) * 100)
      }

    return (
      <div className={styles.bookContainer}>
        <Motion style={motionStyle}>
          {({ width }) => {
            // If it's something and it isn't 0
            const bookStyle = width !== 0 && this.props.size.width ?
              { width: `calc(${width}vw - ${parseInt(styles.padding, 10) * 2}px)` } :
              {}
            return (
              <div
                className={selected ? styles.selectedBookSelector : styles.bookSelector}
                onMouseDown={(e) => { e.stopPropagation() }}
                style={bookStyle}
                onClick={() => {
                  this.props.history.push(`/book/${formatBook(this.props.book.bookName)}`)
                }}>
                {
                  selected && this.props.size.width ?
                    this.getBookArray() :
                    this.props.book.bookName
                }
              </div>
            )
          }}
        </Motion>
      </div>
    );
  }
}

export default sizeMe()(BookContainer)