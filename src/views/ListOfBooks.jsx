import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import "../styles/ListOfBooks.css";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";

const ListOfBooks = () => {
  const [activeSubject, setActiveSubject] = useState("");
  const [activeLevel, setActiveLevel] = useState("");
  const [books, setBooks] = useState(null);
  const getListOfBooks = async () => {
    let booksList;
    try {
      const res = await axios.post(
        'https://api.lelivrescolaire.fr/graphql',
        {
          'query': 'query{viewer{books{hits{id displayTitle url subjects{name}levels{name}valid}}}}',
          'variables': {}
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
      booksList = res.data;
    } catch (err) {
      console.log(err);
    }

    return booksList;
  }

  useEffect(() => {
    getListOfBooks().then((booksList) => {
      setBooks(booksList.data.viewer.books.hits);
    });
  },[]);

  // Filter books by subject
  const subjects = books?.flatMap((book) => book.subjects?.map((subject) => subject.name));
  // Get unique subjects to display in the select option
  const subjectsList = [...new Set(subjects)]

  // Filter books by levels
  const levels = books?.flatMap((book) => book.levels?.map((level) => level.name));
  // Get unique levels to display in the select option
  const levelsList = [...new Set(levels)]

  const filters = useMemo(() => {
      return books?.filter(book =>
        (activeSubject === "" || book.subjects?.some(subject => subject.name === activeSubject))
        && (activeLevel === "" || book.levels?.some(level => level.name === activeLevel)))
    }, [activeSubject, activeLevel]
  )

  return (
   <div className="book-list-page">
     <Filter
        name="sujets"
        filtersList={subjectsList}
        activeFilter={activeSubject}
        setActiveFilter={setActiveSubject}
      />
     <Filter
       name="niveaux"
       filtersList={levelsList}
       activeFilter={activeLevel}
       setActiveFilter={setActiveLevel}
      />
      <div className="books-list">
        {filters && filters.map((book) => {
          let className = "books-img";
          if (!book.valid) {
            className += " disabled";
          }

              return (
                <div className="books-container" key={book.id}>
                  <Link to={`/book/${book.id}`} state={{ book }} className={!book.valid ? "disabled-link" : undefined }>
                    <h3 className={!book.valid ? "disabled" : undefined}>{book.displayTitle}</h3>
                    <img className={className.toString()} src={book.url} alt={book.displayTitle} />
                  </Link>
                </div>
              )
           })
        }
      </div>
    </div>
 );
}

export default ListOfBooks;
