const axios = require('axios');

const allBooksAPI = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks';

const getAllBooks = () => {
  return axios.get(allBooksAPI).then(booksData => booksData.data);
};

const getBookRatingByID = (id) => {
  const bookRatingAPI = `https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${id}`;
  return axios.get(bookRatingAPI).then(ratings => ratings.data);
}

const combineBooksWithRatings = () => {
  return getAllBooks().then(booksData => {
    const booksDataCopy = booksData;
    // console.log(booksDataCopy);
    const allPromises = booksDataCopy.books.map(bookData => getBookRatingByID(bookData.id));
    return Promise.all(allPromises).then( allRatings => {
      // console.log('h',allRatings);
      return allRatings.map((rating, index) => Object.assign({},booksDataCopy.books[index], rating));
      });
  });
};

const groupBooksByAuthor = ()=> {
  return combineBooksWithRatings().then(
    booksDataWithRatings => booksDataWithRatings.reduce((acc,val) => {
      if(acc[val.Author] === undefined){
        acc[val.Author] = [val];
      } else {
        acc[val.Author].push(val);
      }
      return acc;
    },{})
  );
}

// groupBooksByAuthor().then(x => console.log(x));
module.exports = groupBooksByAuthor;