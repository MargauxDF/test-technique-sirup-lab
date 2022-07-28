import React from "react";
import { useLocation, Link } from 'react-router-dom';
import "../styles/Book.css";

const Book = () => {
  const location = useLocation();
  const { book } = location.state;

  console.log(book);
  return (
    <div className="book-details">
      <h1 className="book-title">{book.displayTitle}</h1>
      <img className="book-img" src={book.url} alt={book.displayTitle} />
      <p className="book-level">niveau {book.levels[0].name}</p>
      <p className="book-subject">{book.subjects[0].name}</p>
      <Link className="return-link" to="/">Retour à la liste</Link>
    </div>
  )
}

export default Book;
