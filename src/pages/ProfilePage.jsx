import "../stylesheets/profilePage.css";
import React from "react";
import MyLessons from "../components/MyLessons";
import MyProfil from "../components/ProfilCard";
import { Link } from "react-router-dom";

function ProfilePage() {
  return (
    <div>
      Profil Page
      <div className="flexProfil">
        <Link to="/lessons/create">New Lesson</Link>
        <MyLessons />
        <MyProfil />
      </div>
    </div>
  );
}

export default ProfilePage;
