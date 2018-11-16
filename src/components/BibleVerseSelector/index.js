import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import deepEqual from 'deep-equal'

import { oldTestament } from 'helper'

import styles from './BibleVerseSelector.module.css'

export default class BibleVerseSelector extends Component {
	handleChange(valObj) {
		const newVal = { ...this.props.value, ...valObj }
		if (!deepEqual(newVal, this.props.value)) {
			this.props.onChange(newVal)
		}
	}

	renderItem(item, highlighted) {
		return (
			<div key={item.bookId} style={{ backgroundColor: highlighted ? '#868686' : 'transparent' }}>
				{item.bookName}
			</div>
		)
	}

	render() {
		const value = { book: null, chapter: null, verse: null, ...this.props.value }

		let chapterCount = null
		let verseCount = null

		const book = value.book ? oldTestament.find(el => el.bookName.toLowerCase() === value.book.toLowerCase()) : null
		if (book) {
			chapterCount = book.chaptersCount

			const chapter = parseInt(value.chapter, 10)
			const chapterValid = chapter > 0 && chapter < chapterCount + 1

			if (chapterValid) {
				verseCount = book.chapters.find(chap => parseInt(chap.chapter, 10) === chapter).verseCount
			}
		}

		return (
			<div className={styles.container}>
				<Autocomplete
					data-testid="book"
					items={oldTestament}
					getItemValue={item => item.bookName}
					shouldItemRender={(item, value) => item.bookName.toLowerCase().indexOf(value.toLowerCase()) > -1}
					renderItem={this.renderItem}
					renderMenu={(items, value, style) => {
						return <div style={style} className={styles.menu} children={items} />
					}}
					renderInput={props => <input type="text" placeholder="Book" {...props} />}
					value={this.props.value.book || ''}
					onChange={e => {
						this.handleChange({ book: e.target.value, chapter: null, verse: null })
					}}
					onSelect={val => {
						this.handleChange({ book: val, chapter: null, verse: null })
					}}
					wrapperStyle={{ display: 'contents' }}
				/>{' '}
				<div className={styles.chapterVerseContainer}>
					<input
						data-testid="chapter"
						className={styles.numberInput}
						type="text"
						placeholder={!chapterCount ? 'Chapter' : `1-${chapterCount}`}
						disabled={!chapterCount}
						value={this.props.value.chapter || ''}
						onChange={e => {
							this.handleChange({ chapter: parseInt(e.target.value, 10), verse: null })
						}}
					/>
					:
					<input
						data-testid="verse"
						className={styles.numberInput}
						type="text"
						placeholder={!verseCount ? 'Verse' : `1-${verseCount}`}
						disabled={!verseCount}
						value={this.props.value.verse || ''}
						onBlur={this.props.onBlur}
						onChange={e => {
							this.handleChange({ verse: parseInt(e.target.value, 10) })
						}}
					/>
				</div>
			</div>
		)
	}
}

BibleVerseSelector.defaultProps = { value: { book: null, chapter: null, verse: null }, onChange: () => {} }
