import React from "react";
import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";
import "../stylesheets/myProfil.css";

function MyProfil() {
  const [profil, setProfil] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProfil() {
      try {
        const response = await apiHandler.getUser();

        setProfil(response.data);
      } catch (error) {
        setError(error.message);
      }
    }

    getProfil();
  }, []);

  return (
    <div className="myProfil">
      <h1>My Profil</h1>
      {error && <div>{error}</div>}
      <div key={profil._id}>
        <p>
          <span>Email</span> <br /> {profil.email}
        </p>
        <p>
          <span>Name</span> <br /> {profil.name}
        </p>
        <p>
          <span>Pseudo</span> <br /> {profil.pseudo}
        </p>
        <p>
          <span> Little description</span> <br /> {profil.bio}
        </p>
        <p>
          <span> Number of tickets</span> <br /> {profil.tickets}
        </p>
      </div>
    </div>
  );
}

export default MyProfil;
