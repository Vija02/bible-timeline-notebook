import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Scroller from './Scroller'
import BookContainer from './BookContainer'

import { oldTestament, booksRegex, bookIdFromName, clampValue } from 'helper'
import styles from './MainTimeline.module.css'

// Width in vw when the book selector is expanded
const extendedWidth = 90;

class MainTimeline extends Component {
  constructor(props) {
    super(props);
    this.state = { sizes: [], width: 0 };
  }
  render() {
    const xEnd = -this.state.width + document.documentElement.clientWidth

    return (
      <div className={styles.timelineContainer}>
        <Route path={`/book/:bookName(${booksRegex})`} children={(props) => {
          const dashTotalWidth = parseInt(styles.dashSideMargin, 10) * 2 + parseInt(styles.dashWidth, 10)

          let startOfBook;
          let centerBookPos;
          if (props.match) {
            const bookId = bookIdFromName(props.match.params.bookName)

            startOfBook = 0
            // Add all books width
            for (let j = 0; j < bookId - 1; j++) {
              startOfBook += this.state.sizes[j + 1]
            }
            // Add miscellaneous
            startOfBook += (bookId - 1) * dashTotalWidth + parseInt(styles.scrollerSidePadding, 10)

            // Calculate center by subtracting the start val with (remaining space / 2)
            centerBookPos = clampValue(startOfBook - (document.documentElement.clientWidth - (extendedWidth / 100 * document.documentElement.clientWidth)) / 2, 0, -xEnd)
          }

          return (
            <Scroller
              target={centerBookPos || centerBookPos === 0 ? centerBookPos : undefined}
              onWidth={(width) => { this.state.width !== width && this.setState({ width }) }}
              onScrollDown={() => {
                props.history.push('/')
              }}
            >
              <div className={styles.scrollerContainer}>
                {
                  oldTestament.map((book, i) => [
                    <BookContainer {...props}
                      key={`book_${i}`}
                      book={book}
                      extendedWidth={extendedWidth}
                      onWidth={(width) => { this.state.sizes[bookIdFromName(book.bookName)] !== width && this.setState(state => ({ sizes: { ...state.sizes, [bookIdFromName(book.bookName)]: width } })) }}
                    />,
                    <hr key={`hr_${i}`} className={styles.dashedLine} />
                  ])
                }
              </div>
            </Scroller>
          )
        }}
        />
      </div>
    );
  }
}

export default MainTimeline;
