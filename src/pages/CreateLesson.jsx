import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../utils/apiHandler";

function CreateLessonPage() {
  const [lessonForm, setLessonForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState([]);
  const [inputKeyword, setInputKeyword] = useState();
  const navigate = useNavigate();

  function handleChangeKeyword(e) {
    setInputKeyword(e.target.value);
  }

  function handleEnterKeyword(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      setKeyword([...keyword, inputKeyword]);
      console.log(keyword, "1");
      setInputKeyword("");
      console.log(keyword, "2");
    }
  }

  function handleChange(e) {
    setLessonForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await apiHandler.createLesson({ ...lessonForm, keyword });
      setKeyword([]);
      setInputKeyword("");

      navigate("/users/profile");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      {error && <div>{error}</div>}

      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title
          <input type="text" name="title" id="title" onChange={handleChange} />
        </label>

        <label htmlFor="content">
          Content
          <textarea
            name="content"
            id="content"
            onChange={handleChange}
          ></textarea>
        </label>

        <label htmlFor="durationInMin">
          Duration (min):
          <input
            type="radio"
            name="durationInMin"
            id="durationInMin"
            onChange={handleChange}
            value={45}
          />
          45
          <input
            type="radio"
            name="durationInMin"
            id="durationInMin"
            onChange={handleChange}
            value={60}
          />
          60
        </label>

        <label htmlFor="field">
          Choose the field
          <select name="field" id="field" onChange={handleChange}>
            <option value="">Choose a field</option>
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
            <option value="other">other</option>
          </select>
        </label>

        <label htmlFor="keyword">
          Keywords :
          <input
            type="text"
            name="keyword"
            id="keyword"
            onKeyDown={handleEnterKeyword}
            onChange={handleChangeKeyword}
            value={inputKeyword}
          />
          <p>{keyword.join(", ")}</p>
        </label>

        <input type="submit" value="CreateLesson" />
      </form>
      <a href="">you already have an account ? Welcome back and Login</a>
    </div>
  );
}

export default CreateLessonPage;
