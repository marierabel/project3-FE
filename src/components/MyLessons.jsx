import React from "react";
import "../stylesheets/myLessons.css";
import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";

function MyLessons() {
  const [myLessons, setMyLessons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getLessons() {
      try {
        const response = await apiHandler.lessonsProf();

        setMyLessons(response.data);
      } catch (error) {
        setError(error.message);
      }
    }

    getLessons();
  }, []);

  return (
    <div className="compLessons">
      MyLessons
      {error && <div>{error}</div>}
      {myLessons.map((lesson) => {
        return (
          <div key={lesson._id}>
            <h2>{lesson.title}</h2>
            <h3>{lesson.field}</h3>
            <i>{lesson.durationInMin}</i>
            <p>{lesson.content}</p>
            <p>{lesson.keyword.join(", ")}</p>
          </div>
        );
      })}
    </div>
  );
}

export default MyLessons;
