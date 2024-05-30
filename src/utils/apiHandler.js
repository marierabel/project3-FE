import axios from "axios";
import { API_BASE_URL } from "../consts";

class ApiHandler {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
    });

    this.api.interceptors.request.use(
      (config) => {
        const authToken = localStorage.getItem("authToken");

        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  login(creadentials) {
    return this.api.post("/users/login", creadentials);
  }

  signup(profilData) {
    return this.api.post("/users/signup", profilData);
  }

  getUser() {
    return this.api.get("/users/me");
  }

  deleteUser() {
    return this.api.delete("/users/me");
  }

  lessonsProf() {
    return this.api.get("/users/me/lessons");
  }

  createLesson(lessonData) {
    return this.api.post("/lessons", lessonData);
  }

  getOneLesson() {
    return this.api.get("/:lessonId");
  }

  getAllLessons() {
    return this.api.get("/lessons");
  }

  updateLesson(upLessonData) {
    return this.api.put("/:lessonId", upLessonData);
  }

  deleteLesson() {
    return this.api.delete("/:lessonId");
  }

  createMessage(messageData) {
    return this.api.post("/lessons/:lessonId/message", messageData);
  }

  lessonMessages() {
    return this.api.get("/lessons/:lessonId/messages");
  }

  userMessages() {
    return this.api.get("/me/messages");
  }
}

const apiHandler = new ApiHandler();

export default apiHandler;
