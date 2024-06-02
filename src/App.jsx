import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CreateLessonPage from "./pages/CreateLesson.jsx";
import HomePagePrivate from "./pages/HomePagePrivate.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NavBar from "./components/Navbar.jsx";
import LessonDetails from "./pages/LessonDetails.jsx";
import ConversationPage from "./pages/Conversation.jsx";

function App() {
  const { isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" Component={HomePagePrivate} />
        <Route path="/users/login" Component={LoginPage} />
        <Route path="/users/signup" Component={SignupPage} />
        <Route path="/lessons/create" Component={CreateLessonPage} />
        <Route path="/users/profile" Component={ProfilePage} />
        <Route path="/lessons/:lessonId" Component={LessonDetails} />
        <Route
          path="/users/message/:conversationId"
          Component={ConversationPage}
        />
      </Routes>
    </>
  );
}

export default App;
