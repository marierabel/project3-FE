import React from "react";
import { useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";

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
    <div>
      My Profil
      {error && <div>{error}</div>}
      <div key={profil._id}>
        <p>Email : {profil.email}</p>
        <p>Name : {profil.name}</p>
        <p>Pseudo : {profil.pseudo}</p>
        <p>Little description : {profil.bio}</p>
        <p>Number of tickets : {profil.tickets}</p>
      </div>
    </div>
  );
}

export default MyProfil;
