import React from "react";
import "../stylesheets/myLessons.css";
import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CreateLessonPage from "../pages/CreateLesson";

function MyLessons() {
  const [myLessons, setMyLessons] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function getLessons() {
    try {
      const response = await apiHandler.lessonsProf();

      setMyLessons(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getLessons();
  }, []);

  async function dltLesson(id) {
    await apiHandler.deleteLesson(id);
    await getLessons();
  }

  return (
    <div className="compLessons">
      MyLessons
      {error && <div>{error}</div>}
      {myLessons.map((lesson) => {
        return (
          <div key={lesson._id}>
            <Link to={`/lessons/${lesson._id}`}>
              <h2>{lesson.title}</h2>
              <h3>{lesson.field}</h3>
              <i>{lesson.durationInMin}</i>
              <p>{lesson.content}</p>
              <p>{lesson.keyword.join(", ")}</p>
            </Link>
            <button onClick={(e) => dltLesson(lesson._id)}>delete</button>
            <Link to={`/lessons/${lesson._id}/update`}>Update</Link>
          </div>
        );
      })}
    </div>
  );
}

export default MyLessons;
