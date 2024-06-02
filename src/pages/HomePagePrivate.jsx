import React from "react";
import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";
import LessonCard from "../components/LessonCard";

function HomePagePrivate() {
  const [allLessons, setAllLessons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAllLessons() {
      try {
        const response = await apiHandler.getAllLessons();

        setAllLessons(response.data);
      } catch (error) {
        setError(error.message);
      }
    }

    getAllLessons();
  }, []);
  return (
    <div>
      HomePagePrivate
      {allLessons.map((lesson) => {
        return <LessonCard key={lesson.id} lesson={lesson} />;
      })}
    </div>
  );
}

export default HomePagePrivate;
