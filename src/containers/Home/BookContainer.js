import React, { Component } from 'react';
import sizeMe from 'react-sizeme'
import { Motion, spring } from 'react-motion'

import { formatBook } from 'helper'

import styles from './BookContainer.module.css'

class BookContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
  }
  componentWillUpdate(nextProps, nextState) {
    // Get inital size
    const selected = nextProps.match && nextProps.match.params.bookName === formatBook(nextProps.book.bookName)
    if (selected && this.state.width === 0) {
      this.setState({ width: nextProps.size.width })
    }
  }
  render() {
    const selected = this.props.match && this.props.match.params.bookName === formatBook(this.props.book.bookName)

    const motionStyle = selected ? {
      width: spring(90) // vw
    } : {
        width: spring(this.state.width / document.documentElement.clientWidth * 100)
      }

    return (
      <div className={styles.bookContainer}>
        <Motion style={motionStyle}>
          {({ width }) => {
            return (
              <div className={selected ? styles.selectedBookSelector : styles.bookSelector} onMouseDown={(e) => { e.stopPropagation() }} style={width !== 0 && this.props.size.width ? { width: `${width}vw` } : {}} onClick={() => {
                this.props.history.push(`/book/${formatBook(this.props.book.bookName)}`)
              }}>
                {this.props.book.bookName}
              </div>
            )
          }}
        </Motion>
      </div>
    );
  }
}

export default sizeMe()(BookContainer)