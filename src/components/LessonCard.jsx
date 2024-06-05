import { Link } from "react-router-dom";
import "../stylesheets/lessonCard.css";

function LessonCard({ lesson }) {
  return (
    <div className="lessonCard">
      <Link
        to={`/lessons/${lesson._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <p>{lesson.field}</p>

        <h2>{lesson.title}</h2>
        <h3>By {lesson.professor.pseudo}</h3>

        <p className="content">{lesson.content}</p>

        <p className="hashtags">#{lesson.keyword.join(" #")}</p>
      </Link>
    </div>
  );
}

export default LessonCard;
