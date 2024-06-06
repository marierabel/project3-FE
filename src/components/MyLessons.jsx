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
    <div className="myLessons">
      My Lessons
      {/* {error && <div>{error}</div>} */}
      {myLessons.map((lesson) => {
        return (
          <div className="MLcard">
            <div key={lesson._id}>
              <Link
                to={`/lessons/${lesson._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h2>{lesson.title}</h2>
                <h3>{lesson.field}</h3>
                <i>Duration :{lesson.durationInMin}</i>
                <p className="MLcontent">{lesson.content}</p>
                <p className="MLhashtags">#{lesson.keyword.join(" #")}</p>
              </Link>
              <div className="MLbutton">
                <button onClick={(e) => dltLesson(lesson._id)}>Delete</button>
                <Link
                  to={`/lessons/${lesson._id}/update`}
                  style={{ textDecoration: "none" }}
                >
                  Update
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MyLessons;
