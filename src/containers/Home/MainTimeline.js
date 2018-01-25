import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Scroller from './Scroller'
import BookContainer from './BookContainer'

import { oldTestament, booksRegex } from 'helper'
import styles from './MainTimeline.module.css'

class MainTimeline extends Component {
  render() {
    return (
      <div className={styles.timelineContainer}>
        <Scroller>
          <div className={styles.scrollerContainer}>
            <Route path={`/book/:bookName(${booksRegex})`} children={(props) => {
              return oldTestament.map((book, i) => [
                <BookContainer {...props} key={`book_${i}`} book={book} />,
                <hr key={`hr_${i}`} className={styles.dashedLine} />
              ])
            }} />
          </div>
        </Scroller>
      </div>
    );
  }
}

export default MainTimeline;
