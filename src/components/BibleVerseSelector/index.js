import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete'
import deepEqual from 'deep-equal'

import { oldTestament } from 'helper'

import styles from './BibleVerseSelector.module.css'

export default class BibleVerseSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: "", chapter: "", verse: "",
      chapterDisabled: true, verseDisabled: true,
      lastValue: undefined,
    };
  }

  validate(stateName, value) {
    const nextState = { ...this.state, chapterDisabled: true, verseDisabled: true }
    nextState[stateName] = value

    const book = oldTestament.find(el => el.bookName.toLowerCase() === nextState.book.toLowerCase())
    if (book) {
      nextState.chapterDisabled = false;

      const chapter = parseInt(nextState.chapter, 10)
      const chapterCount = book.chaptersCount
      const chapterValid = chapter > 0 && chapter < chapterCount + 1
      if (chapterValid) {
        nextState.verseDisabled = false;

        const verse = parseInt(nextState.verse, 10)
        const verseCount = book.chapters.find(chap => parseInt(chap.chapter, 10) === parseInt(nextState.chapter, 10)).verseCount
        const verseValid = verse > 0 && verse < verseCount + 1
        if (verseValid) {

          this.setState(nextState)
          this.onComplete(book.bookId, chapter, verse)
          return;
        }
      }
    }
    this.setState(nextState)
    this.onIncomplete()
  }

  onChange(val) {
    if (!deepEqual(val, this.state.lastValue)) {
      this.props.onChange(val)
      this.setState({ lastValue: val })
    }
  }

  onComplete(book, chapter, verse) {
    this.onChange({ book, chapter, verse })
  }
  onIncomplete() {
    this.onChange(null)
  }

  renderItem(item, highlighted) {
    return (
      <div
        key={item.bookId}
        style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
      >
        {item.bookName}
      </div>
    )
  }
  render() {
    return (
      <div>
        <Autocomplete
          data-testid="book"
          items={oldTestament}
          getItemValue={(item) => item.bookName}
          shouldItemRender={(item, value) => item.bookName.toLowerCase().indexOf(value.toLowerCase()) > -1}
          renderItem={this.renderItem}
          renderInput={(props) => <input type="text" placeholder="Book" {...props} />}
          value={this.state.book}
          onChange={(e) => { this.validate("book", e.target.value) }}
          onSelect={(val) => { this.validate("book", val) }}
        />
        {' '}
        <input
          data-testid="chapter"
          className={styles.numberInput}
          type="text"
          placeholder="Chapter"
          disabled={this.state.chapterDisabled}
          value={this.state.chapter}
          onChange={(e) => { this.validate("chapter", e.target.value) }}
        />
        :
        <input
          data-testid="verse"
          className={styles.numberInput}
          type="text"
          placeholder="Verse"
          disabled={this.state.verseDisabled}
          value={this.state.verse}
          onChange={(e) => { this.validate("verse", e.target.value) }}
        />
      </div>
    );
  }
}

BibleVerseSelector.defaultProps = { onChange: () => { } };