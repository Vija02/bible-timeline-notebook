import React, { Component } from 'react';

import Scroller from './Scroller'

import oldTestament from 'assets/old.json'
import { formatBook } from 'helper'
import styles from './MainTimeline.module.css'

class MainTimeline extends Component {
  render() {
    return (
      <div className={styles.timelineContainer}>
        <Scroller>
          <div className={styles.scrollerContainer}>
            {
              oldTestament.map((book, i) => [
                <div key={`books_${i}`} className={styles.bookContainer}>
                  <div className={styles.bookSelector} onClick={() => {
                    this.props.history.push(`/book/${formatBook(book)}`)
                  }}>
                    {book}
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
