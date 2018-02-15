import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete'
import deepEqual from 'deep-equal'

import { oldTestament } from 'helper'

import styles from './BibleVerseSelector.module.css'

export default class BibleVerseSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: "", chapter: "", verse: "", // Input state
      chapterCount: null, verseCount: null, // To show placeholder limit 
      chapterDisabled: true, verseDisabled: true,
      lastValue: undefined, // Used to send onChange only when different value
    };
  }

  validate(stateName, value) {
    const placeholderCount = { chapterCount: null, verseCount: null }
    const nextState = { ...this.state, ...placeholderCount, chapterDisabled: true, verseDisabled: true }
    // Update input
    nextState[stateName] = value

    const book = oldTestament.find(el => el.bookName.toLowerCase() === nextState.book.toLowerCase())
    if (book) {
      nextState.chapterDisabled = false;

      const chapter = parseInt(nextState.chapter, 10)
      const chapterCount = book.chaptersCount
      const chapterValid = chapter > 0 && chapter < chapterCount + 1

      nextState.chapterCount = chapterCount;

      if (chapterValid) {
        nextState.verseDisabled = false;

        const verse = parseInt(nextState.verse, 10)
        const verseCount = book.chapters.find(chap => parseInt(chap.chapter, 10) === parseInt(nextState.chapter, 10)).verseCount
        const verseValid = verse > 0 && verse < verseCount + 1

        nextState.verseCount = verseCount;

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
          renderMenu={(items, value, style) => <div style={style} className={styles.menu} children={items} />}
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
          placeholder={this.state.chapterDisabled ? "Chapter" : `1-${this.state.chapterCount}`}
          disabled={this.state.chapterDisabled}
          value={this.state.chapter}
          onChange={(e) => { this.validate("chapter", e.target.value) }}
        />
        :
        <input
          data-testid="verse"
          className={styles.numberInput}
          type="text"
          placeholder={this.state.verseDisabled ? "Verse" : `1-${this.state.verseCount}`}
          disabled={this.state.verseDisabled}
          value={this.state.verse}
          onChange={(e) => { this.validate("verse", e.target.value) }}
        />
      </div>
    );
  }
}

BibleVerseSelector.defaultProps = { onChange: () => { } };