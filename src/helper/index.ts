import React from 'react'
import * as Yup from 'yup'
import bookData from 'assets/book_metadata.json'

type ChapterReference = {
	bookId: number
	chapter: number
	verseCount?: number
}
type ChapterContent = VerseData[]
type VerseData = [number, string]

export const clampValue = (val: number, min: number, max: number): number => {
	return Math.min(Math.max(val, min), max)
}

export const toTitleCase = (str: string): string => {
	return str.replace(/\w\S*/g, txt => {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})
}

export const formatBook = (book: string): string => {
	return book.replace(/ /g, '_').toLowerCase()
}

export const unformatBook = (book: string): string => {
	return toTitleCase(book.replace(/_/g, ' '))
}

export const getPreviousChapter = (bookId: number, chapter: number): ChapterReference | null => {
	if (chapter > 1) {
		return { bookId, chapter: chapter - 1 }
	} else if (bookId > 1) {
		return { bookId: bookId - 1, chapter: getChapterCount(bookId - 1) }
	} else {
		return null
	}
}

export const getNextChapter = (bookId: number, chapter: number): ChapterReference | null => {
	if (chapter < getChapterCount(bookId)) {
		return { bookId, chapter: chapter + 1 }
	} else if (bookId < 66) {
		return { bookId: bookId + 1, chapter: 1 }
	} else {
		return null
	}
}

export const randomChapter = (): ChapterReference => {
	const listOfChapters: ChapterReference[] = bookData
		.map(book => book.chapters.map(chapter => ({ ...chapter, bookId: book.bookId })))
		// [[{bookId, chapter, verseCount}, {bookId, chapter, verseCount}], [], ...]
		// Above ^. We want to flatten that
		.flat(Infinity)

	return listOfChapters[Math.floor(Math.random() * listOfChapters.length)]
}

export const sliceChapter = (chapterData: ChapterContent, maxChapter: number = 300) => {
	return chapterData.reduce((acc, val) => {
		// Get the current length in the acc
		const currentLength = acc.reduce((a, v) => {
			return a + v[1].length
		}, 0)

		if (currentLength < maxChapter) {
			const newArr: VerseData = [val[0], val[1].slice(0, maxChapter - currentLength)]
			return [...acc, newArr]
		} else {
			return acc
		}
	}, [] as ChapterContent)
}

export const bookIdFromName = (book: string): number | null => {
	return bookData.find(data => formatBook(data.bookName) === formatBook(book))?.bookId ?? null
}

export const bookNameFromId = (bookId: number | string): string | null => {
	return bookData.find(data => data.bookId === parseInt(bookId.toString(), 10))?.bookName ?? null
}

export const oldTestament = bookData.filter(book => book.bookSection === 'OT')
export const newTestament = bookData.filter(book => book.bookSection === 'NT')
export const booksRegex = bookData.map(book => formatBook(book.bookName)).join('|')

export const getChapterCount = (bookId: number): number => {
	// Let's return -1 when not found. Too bothersome to handle null and so on for now
	return bookData.find(data => data.bookId === bookId)?.chaptersCount ?? -1
}

export const getVerseCount = (bookId: number, chapter: number): number | null => {
	return (
		bookData.find(data => data.bookId === bookId)?.chapters.find(data => data.chapter === chapter)?.verseCount ??
		null
	)
}

export const composeReference = (
	startBookId: number,
	startChapter: number,
	startVerse: number,
	endBookId: number,
	endChapter: number,
	endVerse: number,
) => {
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

export const getUserIdFromJWT = (jwt: string) => {
	if (jwt) {
		return JSON.parse(atob(jwt.split('.')[1])).user_id
	}
	return -1
}

export const formatStringLineBreak = (str: string): (string | JSX.Element)[] => {
	return str
		.replace(/\n/g, '<br />')
		.split(/(<br \/>)/g)
		.map((text, i) => (text === '<br />' ? React.createElement('br', { key: i }) : text))
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

				return chapter > 0 && chapter <= (book?.chaptersCount ?? 0)
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
					// @ts-ignore
					const verseCount = book.chapters.find(chap => parseInt(chap.chapter, 10) === chapter)?.verseCount
					const verse = parseInt(value, 10)

					// @ts-ignore
					return verse > 0 && verse <= verseCount
				}
			}
			return false
		},
	})
})

export const bibleVerseSchema = Yup.object().shape({
	book: Yup.mixed().oneOf(bookData.map(book => book.bookName)),
	// @ts-ignore
	chapter: Yup.number().chapter(Yup.ref('book')),
	// @ts-ignore
	verse: Yup.number().verse(Yup.ref('book'), Yup.ref('chapter')),
})
