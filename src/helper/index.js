import React from 'react'
import * as Yup from 'yup'
import bookData from 'assets/book_metadata.json'
import esv from 'assets/esv.json'

export const clampValue = (val, min, max) => {
	return Math.min(Math.max(val, min), max)
}

export const toTitleCase = str => {
	return str.replace(/\w\S*/g, txt => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})
}

export const formatBook = book => {
	return book.replace(/ /g, '_').toLowerCase()
}

export const unformatBook = book => {
	return toTitleCase(book.replace(/_/g, ' '))
}

export const getPreviousChapter = (bookId, chapter) => {
	if (chapter > 1) {
		return { bookId, chapter: chapter - 1 }
	} else if (bookId > 1) {
		return { bookId: bookId - 1, chapter: getChapterCount(bookId - 1) }
	} else {
		return null
	}
}

export const getNextChapter = (bookId, chapter) => {
	if (chapter < getChapterCount(bookId)) {
		return { bookId, chapter: chapter + 1 }
	} else if (bookId < 66) {
		return { bookId: bookId + 1, chapter: 1 }
	} else {
		return null
	}
}

export const randomChapter = () => {
	// [[{bookId, chapter, verseCount}, {bookId, chapter, verseCount}], [], ...]
	const chaptersPerBookArray = bookData.map(book =>
		book.chapters.map(chapter => ({ ...chapter, bookId: book.bookId })),
	)
	// We want to flatten that
	const listOfChapters = chaptersPerBookArray.reduce((acc, val) => {
		return [...acc, ...val]
	}, [])

	return listOfChapters[Math.floor(Math.random() * listOfChapters.length)]
}

export const getChapter = (bookId, chapter) => {
	const esvChaptersObject = esv[bookNameFromId(bookId)][chapter]

	return Object.entries(esvChaptersObject).sort(([aKey], [bKey]) => {
		if (parseInt(aKey, 10) < parseInt(bKey, 10)) {
			return -1
		} else if (parseInt(aKey, 10) > parseInt(bKey, 10)) {
			return 1
		} else {
			return 0
		}
	})
}

export const getSlicedChapter = (bookId, chapter, maxChapter = 300) => {
	return getChapter(bookId, chapter).reduce((acc, val) => {
		// Get the current length in the acc
		const currentLength = acc.reduce((a, v) => {
			return a + v[1].length
		}, 0)

		if (currentLength < maxChapter) {
			return [...acc, [val[0], val[1].slice(0, maxChapter - currentLength)]]
		} else {
			return acc
		}
	}, [])
}

export const bookIdFromName = book => {
	return bookData.find(data => formatBook(data.bookName) === formatBook(book)).bookId
}

export const bookNameFromId = bookId => {
	return bookData.find(data => data.bookId === parseInt(bookId, 10)).bookName
}

export const oldTestament = bookData.filter(book => book.bookSection === 'OT')
export const newTestament = bookData.filter(book => book.bookSection === 'NT')
export const booksRegex = bookData.map(book => formatBook(book.bookName)).join('|')

export const getChapterCount = bookId => {
	return bookData.find(data => data.bookId === bookId).chaptersCount
}

export const getVerseCount = (bookId, chapter) => {
	return bookData.find(data => data.bookId === bookId).chapters.find(data => data.chapter === chapter).verseCount
}

export const composeReference = (startBookId, startChapter, startVerse, endBookId, endChapter, endVerse) => {
	const startPassage = `${bookNameFromId(startBookId)} ${startChapter}:${startVerse}`
	let endPassage = ''
	let diff
	if (startBookId !== endBookId) {
		diff = 'book'
	} else if (startChapter !== endChapter) {
		diff = 'chapter'
	} else if (startChapter !== endChapter) {
		diff = 'verse'
	}
	/* eslint-disable no-fallthrough */
	switch (diff) {
		case 'book':
			endPassage += `${bookNameFromId(endBookId)} `
		case 'chapter':
			endPassage += `${endChapter}:`
		case 'verse':
			endPassage += endVerse
		default:
	}
	/* eslint-enable no-fallthrough */
	return `${startPassage}-${endPassage}`
}

export const getUserIdFromJWT = jwt => {
	if (jwt) {
		return JSON.parse(atob(jwt.split('.')[1])).user_id
	}
	return -1
}

export const formatStringLineBreak = str => {
	return str
		.replace(/\n/g, '<br />')
		.split(/(<br \/>)/g)
		.map((text, i) => (text === '<br />' ? <br key={i} /> : text))
}

// Validate chapter
Yup.addMethod(Yup.number, 'chapter', function(bookRef) {
	return Yup.mixed().test({
		name: 'chapter',
		exclusive: false,
		message: 'Chapter needs to exist according to the selected book.',
		params: {
			reference: bookRef.path,
		},
		test: function(value) {
			const bookInput = this.resolve(bookRef)
			if (bookInput) {
				const book = bookData.find(el => el.bookName.toLowerCase() === bookInput.toLowerCase())
				const chapter = parseInt(value, 10)

				return chapter > 0 && chapter <= book.chaptersCount
			}
			return false
		},
	})
})

// Validate verse
Yup.addMethod(Yup.number, 'verse', function(bookRef, chapterRef) {
	return Yup.mixed().test({
		name: 'verse',
		exclusive: false,
		message: 'Verse needs to exist according to the selected book and chapters.',
		params: {
			reference: bookRef.path,
		},
		test: function(value) {
			const bookInput = this.resolve(bookRef) || ''
			const book = bookData.find(el => el.bookName.toLowerCase() === bookInput.toLowerCase())
			if (book) {
				const chapterCount = book.chaptersCount
				const chapter = parseInt(this.resolve(chapterRef), 10)
				const chapterValid = chapter > 0 && chapter <= chapterCount

				if (chapterValid) {
					const verseCount = book.chapters.find(chap => parseInt(chap.chapter, 10) === chapter).verseCount
					const verse = parseInt(value, 10)

					return verse > 0 && verse <= verseCount
				}
			}
			return false
		},
	})
})

export const bibleVerseSchema = Yup.object().shape({
	book: Yup.mixed().oneOf(bookData.map(book => book.bookName)),
	chapter: Yup.number().chapter(Yup.ref('book')),
	verse: Yup.number().verse(Yup.ref('book'), Yup.ref('chapter')),
})
