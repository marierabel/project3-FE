import "../stylesheets/profilePage.css";
import React from "react";
import MyLessons from "../components/MyLessons";
import MyProfil from "../components/ProfilCard";
import imgPlus from "../assets/squareplus.png";
import { Link } from "react-router-dom";

function ProfilePage() {
  return (
    <div className="profilePage">
      <div className="flexProfil">
        <MyLessons />
        <div className="PPnewLesson">
          <Link
            to="/lessons/create"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img src={imgPlus} alt="" /> <br />
            New Lesson
          </Link>
        </div>
        <MyProfil />
      </div>
    </div>
  );
}

export default ProfilePage;
