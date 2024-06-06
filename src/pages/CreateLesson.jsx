import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiHandler from "../utils/apiHandler";
import "../stylesheets/createLesson.css";

function CreateLessonPage({ edit = false }) {
  const [lessonForm, setLessonForm] = useState({
    title: "",
    content: "",
    durationInMin: 0,
    field: "",
    keyword: [],
  });

  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState([]);
  const [inputKeyword, setInputKeyword] = useState();
  const [duration, setDuration] = useState();
  const navigate = useNavigate();
  const { lessonId } = useParams();
  console.log(lessonId);

  console.log(edit);

  async function fetchOneLesson() {
    if (edit) {
      try {
        const response = await apiHandler.getOneLesson(lessonId);
        const lessonUpdate = response.data;
        setLessonForm({
          title: lessonUpdate.title,
          content: lessonUpdate.content,
          durationInMin: lessonUpdate.durationInMin,
          field: lessonUpdate.field,
          keyword: lessonUpdate.keyword,
        });
        setKeyword(lessonUpdate.keyword);
        setDuration(lessonUpdate.durationInMin.toString());
      } catch (error) {
        setError(error.message);
      }
    }
  }

  useEffect(() => {
    fetchOneLesson();
  }, []);

  function handleChangeKeyword(e) {
    setInputKeyword(e.target.value);
  }

  function handleEnterKeyword(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      setKeyword([...keyword, inputKeyword]);

      setInputKeyword("");
    }
  }

  function onOptionChange(e) {
    setDuration(e.target.value);
    handleChange(e);
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

  async function handleEdit(e) {
    e.preventDefault();

    try {
      await apiHandler.updateLesson({ ...lessonForm, keyword }, lessonId);
      setKeyword([]);
      setInputKeyword("");
      navigate("/users/profile");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  }

  function deleteKeyword(id) {
    const newKeyword = [...keyword];
    newKeyword.splice(id, 1);
    setKeyword(newKeyword);
  }

  return (
    <div className="createLesson">
      {error && <div>{error}</div>}

      <form method="post" onSubmit={edit ? handleEdit : handleSubmit}>
        <label htmlFor="title">
          Title <br />
          <input
            placeholder="your lesson's title"
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={lessonForm.title}
          />
        </label>

        <label htmlFor="content">
          Content <br />
          <textarea
            placeholder="describe what you can teach"
            name="content"
            id="content"
            onChange={handleChange}
            value={lessonForm.content}
          ></textarea>
        </label>

        <label htmlFor="durationInMin">
          Duration (min): <br />
          <input
            type="radio"
            name="durationInMin"
            id="durationInMin"
            onChange={onOptionChange}
            value={45}
            checked={duration === "45"}
            className="radio"
          />
          45
          <input
            type="radio"
            name="durationInMin"
            id="durationInMin"
            onChange={onOptionChange}
            value={60}
            checked={duration === "60"}
            className="radio"
          />
          60
        </label>

        <label htmlFor="field">
          Choose the field <br />
          <select
            name="field"
            id="field"
            onChange={handleChange}
            value={lessonForm.field}
          >
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
            <option value="e-sport">e-sport</option>
            <option value="other">other</option>
          </select>
        </label>

        <label htmlFor="keyword">
          Keywords :<br />
          <input
            placeholder="type your Keyword and press Enter"
            type="text"
            name="keyword"
            id="keyword"
            onKeyDown={handleEnterKeyword}
            onChange={handleChangeKeyword}
            value={inputKeyword}
          />
          <div>
            {keyword.map((word, index) => {
              return (
                <p key={word} onClick={() => deleteKeyword(index)}>
                  {word}
                </p>
              );
            })}
          </div>
        </label>

        <input
          className="btnSubmit"
          type="submit"
          value={!edit ? "Create lesson" : "Edit lesson"}
        />
      </form>
    </div>
  );
}

export default CreateLessonPage;
