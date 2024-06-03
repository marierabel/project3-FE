import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import apiHandler from "../utils/apiHandler";

function NavBar() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const { user, updateToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function logOut() {
    updateToken(null);
    navigate("/");
  }

  useEffect(() => {
    async function getTickets() {
      try {
        const response = await apiHandler.getUser();
        const newTickets = response.data.tickets;
        setTickets(newTickets);
      } catch (error) {
        setError(error.message);
      }
    }

    getTickets();
  }, []);

  return (
    <nav>
      {!user && (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/users/signup">Sign Up</NavLink>
          <NavLink to="/users/login">Login</NavLink>
        </>
      )}
      {user && (
        <>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/users/profile">My profil</NavLink>
          <NavLink to="/users/messagerie">My messages</NavLink>
          <div>Tickets : {tickets}</div>

          <button onClick={logOut}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default NavBar;
