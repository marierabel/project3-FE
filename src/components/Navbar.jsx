import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function NavBar() {
  const { user, updateToken } = useContext(AuthContext);

  function logOut() {
    updateToken(null);
  }

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/users/signup">Sign Up</NavLink>
      <NavLink to="/users/login">Login</NavLink>
      <NavLink to="/users/profile">My profil</NavLink>

      <button onClick={logOut}>Logout</button>
    </nav>
  );
}

export default NavBar;
