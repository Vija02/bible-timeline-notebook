export const formatBook = (book) => {
  return book.replace(/ /g, '_').toLowerCase();
}