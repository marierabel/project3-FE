import { Link } from "react-router-dom";

function LessonCard({ lesson }) {
  return (
    <div>
      <Link to={`/lessons/${lesson._id}`}>
        <h2>{lesson.title}</h2>
        <h3>By {lesson.professor.pseudo}</h3>
        <p>{lesson.content}</p>
        <p>{lesson.field}</p>
        <p>{lesson.keyword.join(", ")}</p>
      </Link>
    </div>
  );
}

export default LessonCard;
