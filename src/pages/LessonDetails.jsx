import React from "react";
import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";
import { useParams, useNavigate } from "react-router-dom";
import "../stylesheets/lessonDetails.css";

function LessonDetails() {
  const [oneLesson, setOneLesson] = useState([]);
  const [error, setError] = useState(null);
  const { lessonId } = useParams();
  const navigate = useNavigate();

  async function createConversation(e) {
    e.preventDefault();

    try {
      const { data } = await apiHandler.createConversation(lessonId);
      const convId = data._id;
      console.log(convId);
      navigate(`/users/message/${convId}`);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  }

  useEffect(() => {
    async function getLesson() {
      try {
        const response = await apiHandler.getOneLesson(lessonId);

        setOneLesson(response.data);
      } catch (error) {
        setError(error.message);
      }
    }

    getLesson();
  }, []);
  return (
    <div className="lessonDetails">
      <h2>{oneLesson.title}</h2>
      <h3>By {oneLesson.professor}</h3>
      <p>{oneLesson.content}</p>
      <p>{oneLesson.durationInMin} </p>
      <p>{oneLesson.field}</p>
      <p>#{oneLesson.keyword?.join(" #")}</p>
      <button onClick={createConversation}>Send a message</button>
    </div>
  );
}

export default LessonDetails;
