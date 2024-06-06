import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../stylesheets/navbar.css";

function NavBar() {
  const { user, updateToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function logOut() {
    updateToken(null);
    navigate("/");
  }

  return (
    <nav className="navbar">
      {!user && (
        <>
          <div className="white">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/users/signup">Sign Up</NavLink>
            <NavLink to="/users/login">Login</NavLink>
          </div>
        </>
      )}
      {user && (
        <>
          <div className="orange">
            <NavLink to="/home">Home</NavLink>
            <div>
              <NavLink to="/users/profile">My profil</NavLink>
              <NavLink to="/users/messagerie">My messages</NavLink>
              <div>Tickets : {user.tickets}</div>
            </div>
          </div>

          <button onClick={logOut}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default NavBar;
