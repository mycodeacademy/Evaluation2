const groupBooksByAuthor = require('../../bookData');

const getBooksData = {
  path: '/books',
  method: 'GET',
  handler: async (request, h) => {
    const booksData = await groupBooksByAuthor();
    // console.log(booksData);
    return booksData;
  }
}

module.exports = getBooksData;