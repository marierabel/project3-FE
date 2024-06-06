import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../utils/apiHandler";
import "../stylesheets/signup.css";

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
    <div className="signupPage">
      {error && <div>{error}</div>}
      <div className="triangle-code"></div>
      <p className="joinUs">Join Us</p>

      <form method="post" onSubmit={handleSubmit}>
        <label className="SPwhite" htmlFor="email">
          Email <br />
          <input type="email" name="email" id="email" onChange={handleChange} />
        </label>

        <label className="SPwhite" htmlFor="password">
          Password
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
        </label>

        <label className="SPwhite" htmlFor="name">
          Name
          <br />
          <input type="text" name="name" id="name" onChange={handleChange} />
        </label>

        <label htmlFor="pseudo">
          Pseudo
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="bio">
          Biography
          <br />
          <textarea
            name="bio"
            id="bio"
            raw="8"
            onChange={handleChange}
          ></textarea>
        </label>

        <input className="btnSubmit" type="submit" value="Signup" />
      </form>
      <p>you already have an account ? Welcome back and Login</p>
    </div>
  );
}

export default SignupPage;
