import React, {useCallback, useState} from "react";
import { useLocation, Link } from 'react-router-dom';
import "../styles/Book.css";
import Chapters from "./Chapters";

const Book = () => {
  const location = useLocation();
  const { book } = location.state;
  const bookId = book.id;

  const [value, setValue] = useState('');

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
  }, [setValue])

  return (
    <div className="book-details">
      <input type="text" name="search" onChange={handleChange} value={value} />
      <h1 className="book-title">{book.displayTitle}</h1>
      <img className="book-img" src={book.url} alt={book.displayTitle} />
      <p className="book-level">niveau {book.levels[0].name}</p>
      <p className="book-subject">{book.subjects[0].name}</p>
      <Chapters bookId={bookId} value={value}/>
      <Link className="return-link" to="/">Retour à la liste</Link>
    </div>
  )
}

export default Book;
