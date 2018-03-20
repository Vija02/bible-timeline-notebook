import bookData from 'assets/book_metadata.json'

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
  let endPassage = ""
  let diff;
  if(startBookId !== endBookId){
    diff = "book"
  }else if(startChapter !== endChapter){
    diff = "chapter"
  }else if(startChapter !== endChapter){
    diff = "verse"
  }
  /* eslint-disable no-fallthrough */
  switch(diff){
    case "book":
      endPassage += `${bookNameFromId(endBookId)} `
    case "chapter":
      endPassage += `${endChapter}:`
    case "verse":
      endPassage += endVerse
    default:
  }
  /* eslint-enable no-fallthrough */
  return `${startPassage}-${endPassage}`
}