import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import CreateLessonPage from "./pages/CreateLesson.jsx";
import HomePagePrivate from "./pages/HomePagePrivate.jsx";
import HomePagePublic from "./pages/HomePagePublic.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NavBar from "./components/Navbar.jsx";
import LessonDetails from "./pages/LessonDetails.jsx";
import ConversationPage from "./pages/Conversation.jsx";
import IsPublicLayout from "./contexts/IsPublicLayout.jsx";
import IsPrivateLayout from "./contexts/IsPrivateLayout.jsx";
import Messagerie from "./pages/Messagerie.jsx";

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
        <Route path="/" Component={HomePagePublic} />
        <Route Component={IsPublicLayout}>
          <Route path="/users/login" Component={LoginPage} />
          <Route path="/users/signup" Component={SignupPage} />
        </Route>

        <Route Component={IsPrivateLayout}>
          <Route path="/home" Component={HomePagePrivate} />
          <Route path="/lessons/create" Component={CreateLessonPage} />
          <Route path="/users/profile" Component={ProfilePage} />
          <Route path="/lessons/:lessonId" Component={LessonDetails} />
          <Route
            path="/lessons/:lessonId/update"
            element={<CreateLessonPage edit={true} />}
          />
          <Route path="/users/messagerie" Component={Messagerie} />
          <Route
            path="/users/message/:conversationId"
            Component={ConversationPage}
            display={true}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
