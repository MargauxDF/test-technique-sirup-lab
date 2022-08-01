import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/ListOfBooks.css";
import { Link } from "react-router-dom";
import SubjectFilter from "../components/SubjectFilter";
import LevelFilter from "../components/LevelFilter";

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

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }

  // Filter books by subject
  const subjects = books?.flatMap((book) => book.subjects?.map((subject) => subject.name));
  // Get unique subjects to display in the select option
  const subjectsList = subjects?.filter(onlyUnique);

  // Filter books by levels
  const levels = books?.flatMap((book) => book.levels?.map((level) => level.name));
  // Get unique levels to display in the select option
  const levelsList = levels?.filter(onlyUnique);

  return (
   <div className="book-list-page">
     <SubjectFilter
        subjectsList={subjectsList}
        activeSubject={activeSubject}
        setActiveSubject={setActiveSubject}
      />
     <LevelFilter
        levelsList={levelsList}
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
      />
      <div className="books-list">
        {books && books.map((book) => {
          let className = "books-img";
          if (!book.valid) {
            className += " disabled";
          }

          if (activeLevel === "" || book.levels.some((level) => level.name === activeLevel)) {
            if (activeSubject === "" || book.subjects.some((subject) => subject.name === activeSubject)) {
              return (
                <div className="books-container" key={book.id}>
                  <Link to={book.valid && `/book/${book.id}`} state={{ book }}>
                    <h3 className={!book.valid && "disabled"}>{book.displayTitle}</h3>
                    <img className={className} src={book.url} alt={book.displayTitle} />
                  </Link>
                </div>
              )
            }
          } else {
            return null;
          }})
        }
      </div>
    </div>
 );
}

export default ListOfBooks;
