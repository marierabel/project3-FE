import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../stylesheets/navbar.css";
import imgUser from "../assets/user.png";
import imgMsg from "../assets/comment.png";
import imgTck from "../assets/ticket.png";
import logoWhite from "../assets/logoTeav2.png";
import logoBlack from "../assets/logoTeavBl.png";

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
            <NavLink to="/">
              <img src={logoWhite} alt="logoWhite" />
            </NavLink>
            <NavLink to="/users/signup">Sign Up</NavLink>
            <NavLink to="/users/login">Login</NavLink>
          </div>
        </>
      )}
      {user && (
        <>
          <div className="orange">
            <NavLink to="/home">
              <img src={logoBlack} alt="logoWhite" />
            </NavLink>
            <div>
              <NavLink to="/users/profile">
                <img className="NBimg" src={imgUser} alt="userImage" /> Create a
                lesson
              </NavLink>
              <NavLink to="/users/messagerie">
                <img className="NBimg" src={imgMsg} alt="msgImage" />
                messages
              </NavLink>
              <div className="NBtickets">
                <img className="NBimg" src={imgTck} alt="ticketImage" />
                {user.tickets}
              </div>
            </div>
          </div>

          <button onClick={logOut}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default NavBar;
