import "../stylesheets/profilePage.css";
import React from "react";
import MyLessons from "../components/MyLessons";
import MyProfil from "../components/ProfilCard";

function ProfilePage() {
  return (
    <div>
      Profil Page
      <div className="flexProfil">
        <MyLessons />
        <MyProfil />
      </div>
    </div>
  );
}

export default ProfilePage;
