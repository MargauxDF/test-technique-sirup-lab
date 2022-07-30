import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/ListOfBooks.css";
import { Link } from "react-router-dom";
import SubjectFilter from "../components/SubjectFilter";

const ListOfBooks = () => {
  const [activeSubject, setActiveSubject] = useState("");
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

  // Filter books by subject
  const subjects = books?.flatMap((book) => book.subjects?.map((subject) => subject.name));

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }

  // Get unique subjects to display in the select option
  const subjectsList = subjects?.filter(onlyUnique);

  return (
   <div className="books-list">
     <SubjectFilter
        subjectsList={subjectsList}
        activeSubject={activeSubject}
        setActiveSubject={setActiveSubject}
      />
      {books && books.map((book) => {
        if (activeSubject === "" || book.subjects.some((subject) => subject.name === activeSubject)) {
          return (
            <div className="books-container" key={book.id}>
              <Link to={book.valid && `/book/${book.id}`} state={{ book }}>
                <h3 className={book.valid ? "" : "not-valid-books-title"}>{book.displayTitle}</h3>
                <img className={book.valid ? "valid-books-img" : "not-valid-books-img"} src={book.url} alt={book.displayTitle} />
              </Link>
            </div>
          )
      } else {
        return null;
      }})}
   </div>
 );
}

export default ListOfBooks;
