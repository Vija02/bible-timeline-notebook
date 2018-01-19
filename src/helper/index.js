import bookData from 'assets/book_metadata.json'

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}

export const formatBook = (book) => {
  return book.replace(/ /g, '_').toLowerCase();
}

export const unformatBook = (book) => {
  return toTitleCase(book.replace(/_/g, ' '));
}

export const bookIdFromName = (book) => {
  return bookData.find(data => formatBook(data.bookName) === book).bookId
}