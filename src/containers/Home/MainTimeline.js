import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Scroller from './Scroller'

import { formatBook, oldTestament } from 'helper'
import styles from './MainTimeline.module.css'

class MainTimeline extends Component {
  render() {
    return (
      <div className={styles.timelineContainer}>
        <Scroller>
          <div className={styles.scrollerContainer}>
            <Switch>
              <Route path="/" render={() => {
                return oldTestament.map((book, i) => [
                  <div key={`books_${i}`} className={styles.bookContainer}>
                    <div className={styles.bookSelector} onMouseDown={(e) => { e.stopPropagation() }} onClick={() => {
                      this.props.history.push(`/book/${formatBook(book.bookName)}`)
                    }}>
                      {book.bookName}
                    </div>
                  </div>,
                  <hr key={`hr_${i}`} className={styles.dashedLine} />
                ])
              }} />
            </Switch>
          </div>
        </Scroller>
      </div>
    );
  }
}

export default MainTimeline;
