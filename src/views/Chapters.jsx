import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Chapters.css";


const Chapters = ({ bookId }) => {
  const [chapters, setChapters] = useState(null);

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

  return (
    <div className="chapters-list">
      {chapters && chapters.map((chapter) => {
        let className = "chapters-img";
        if (!chapter.valid) {
          className += " disabled";
        }

        return (
          <div className="chapters-container" key={chapter.id}>
            <p className={!chapter.valid && "disabled"}>{chapter.title}</p>
            <img className={className} src={chapter.url} alt={chapter.title} />
          </div>
        )
      })}
    </div>
  )
}

export default Chapters;
