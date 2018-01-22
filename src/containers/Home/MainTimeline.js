import React, { Component } from 'react';

import Scroller from './Scroller'

import bookData from 'assets/book_metadata.json'
import { formatBook } from 'helper'
import styles from './MainTimeline.module.css'

const oldTestament = bookData.filter(book => book.bookSection === "OT")

class MainTimeline extends Component {
  render() {
    return (
      <div className={styles.timelineContainer}>
        <Scroller>
          <div className={styles.scrollerContainer}>
            {
              oldTestament.map((book, i) => [
                <div key={`books_${i}`} className={styles.bookContainer}>
                  <div className={styles.bookSelector} onMouseDown={(e) => { e.stopPropagation() }} onClick={() => {
                    this.props.history.push(`/book/${formatBook(book.bookName)}`)
                  }}>
                    {book.bookName}
                  </div>
                </div>,
                <hr key={`hr_${i}`} className={styles.dashedLine} />
              ])
            }
          </div>
        </Scroller>
      </div>
    );
  }
}

export default MainTimeline;
