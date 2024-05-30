import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../utils/apiHandler";

function SignupPage() {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    name: "",
    pseudo: "",
    biography: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setSignupForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await apiHandler.signup(signupForm);

      navigate("/users/login");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      {error && <div>{error}</div>}

      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input type="email" name="email" id="email" onChange={handleChange} />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="name">
          Name
          <input type="text" name="name" id="name" onChange={handleChange} />
        </label>

        <label htmlFor="pseudo">
          Pseudo
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="bio">
          Biography
          <textarea
            name="bio"
            id="bio"
            raw="8"
            onChange={handleChange}
          ></textarea>
        </label>

        <input type="submit" value="Signup" />
      </form>
      <a href="">you already have an account ? Welcome back and Login</a>
    </div>
  );
}

export default SignupPage;
