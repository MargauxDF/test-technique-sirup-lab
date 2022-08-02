import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Chapters.css";


const Chapters = ({ bookId, value }) => {
  const [chapters, setChapters] = useState([]);

  const getChapters = async () => {
    let chaptersList;
    try {
      const res = await axios.post(
        'https://api.lelivrescolaire.fr/graphql',
        {
          'query': 'query chapters($bookId:Int){viewer{chapters(bookIds:[$bookId]){hits{id title url valid}}}}',
          'variables': {
            'bookId': `${bookId}`
          }
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })
      chaptersList = res.data;
    } catch (err) {
      console.log(err);
    }

    return chaptersList;
  }

  useEffect(() => {
    getChapters().then((chaptersList) => {
      setChapters(chaptersList.data.viewer.chapters.hits)
    });
  }, [])

  useEffect(() => {
    if (value !== '') {
      const filteredChapters = chapters.filter((chapter) => chapter.title.toLowerCase().includes(value.toLowerCase()));
      setChapters(filteredChapters);
    } else {
      getChapters().then((chaptersList) => {
        setChapters(chaptersList.data.viewer.chapters.hits)
      });
    }
  }, [value])

  return (
    <div className="chapters-list">
      {chapters && chapters.map((chapter) => {
        let className = "chapters-img";
        if (!chapter.valid) {
          className += " disabled";
        }

        return (
          <div className="chapters-container" key={chapter.id}>
            <p className={!chapter.valid ? "disabled" : undefined}>{chapter.title}</p>
            <img className={className.toString()} src={chapter.url} alt={chapter.title} />
          </div>
        )
      })}
    </div>
  )
}

export default Chapters;
