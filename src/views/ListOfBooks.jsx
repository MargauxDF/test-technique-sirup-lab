import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/ListOfBooks.css";

const ListOfBooks = () => {
  const [books, setBooks] = useState(null);
  const getListOfBooks = async () => {
    let booksList;
    await axios.post(
      'https://api.lelivrescolaire.fr/graphql',
      {
        'query': 'query{viewer{books{hits{id displayTitle url subjects{name}levels{name}valid}}}}',
        'variables': {}
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    ).then((res) => {
      booksList = res.data;
    }).catch((err) => {
      console.log(err);
    });

    return booksList;
  }

  useEffect(() => {
    getListOfBooks().then((booksList) => {
      setBooks(booksList.data.viewer.books.hits);
    });
  },[]);

  return (
   <div className="books-list">
      {books && books.map((book) => {
        return (
          <div className="books-container" key={book.id}>
            <h3 className={book.valid ? "" : "not-valid-books-title"}>{book.displayTitle}</h3>
            <img className={book.valid ? "valid-books-img" : "not-valid-books-img"} src={book.url} alt={book.displayTitle} />
          </div>
        )
      })}
   </div>
 );
}

export default ListOfBooks;
