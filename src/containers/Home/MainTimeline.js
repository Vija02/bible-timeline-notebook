import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Scroller from './Scroller'
import BookContainer from './BookContainer'

import { oldTestament } from 'helper'
import styles from './MainTimeline.module.css'

class MainTimeline extends Component {
  render() {
    return (
      <div className={styles.timelineContainer}>
        <Scroller>
          <div className={styles.scrollerContainer}>
            <Switch>
              <Route path="/" render={(props) => {
                return oldTestament.map((book, i) => [
                  <BookContainer {...props} key={`book_${i}`} book={book} />,
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
