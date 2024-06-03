import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiHandler from "../utils/apiHandler";
import LessonCard from "../components/LessonCard";

function HomePagePrivate() {
  const [allLessons, setAllLessons] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keywordValue, setKeywordValue] = useState("");

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

  const lessonField = searchParams.get("field");

  const lessonKeyword = searchParams.get("keyword");

  function changeKeyword(e) {
    const keyword = e.target.value.toLowerCase();
    setKeywordValue(keyword);
    setSearchParams({ keyword });
  }

  // function searchByKeyword(e) {
  //   if (e.key === "Enter" || e.keyCode === 13) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     setSearchParams({ keyword: keywordValue });
  //   }
  // }

  function searchByField(e) {
    const field = e.target.value;
    setSearchParams({ field });
  }

  const fieldFilteredLessons = lessonField
    ? allLessons.filter((lesson) => {
        return lesson.field?.toLowerCase() === lessonField;
      })
    : allLessons;

  const filteredLessons = lessonKeyword
    ? fieldFilteredLessons.filter((lesson) => {
        return lesson.keyword.includes(lessonKeyword);
      })
    : fieldFilteredLessons;

  return (
    <div>
      HomePagePrivate
      <select
        name="field"
        id="field"
        onChange={searchByField}
        defaultValue={searchParams.get("field")}
      >
        <option value="">All</option>
        <option value="academic">academic</option>
        <option value="music">music</option>
        <option value="sport">sport</option>
        <option value="well-being">well-being</option>
        <option value="cooking">cooking</option>
        <option value="crafting">crafting</option>
        <option value="sciences">sciences</option>
        <option value="languages">languages</option>
        <option value="esthetics">esthetics</option>
        <option value="arts">arts</option>
        <option value="IT">IT</option>
        <option value="danse">danse</option>
        <option value="repair">repair</option>
        <option value="e-sport">e-sport</option>
        <option value="other">other</option>
      </select>
      <input
        type="text"
        name="keyword"
        id="keyword"
        value={searchParams.get("keyword")}
        onChange={changeKeyword}
      />
      {filteredLessons.map((lesson) => {
        return <LessonCard key={lesson.id} lesson={lesson} />;
      })}
    </div>
  );
}

export default HomePagePrivate;
