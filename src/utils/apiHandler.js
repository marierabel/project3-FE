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

  getOneLesson(lessonId) {
    return this.api.get(`/lessons/${lessonId}`);
  }

  getAllLessons() {
    return this.api.get("/lessons");
  }

  updateLesson(upLessonData, lessonId) {
    return this.api.put(`/lessons/${lessonId}`, upLessonData);
  }

  deleteLesson(lessonId) {
    return this.api.delete(`/lessons/${lessonId}`);
  }

  createConversation(lessonId) {
    return this.api.post(`/lessons/${lessonId}/conversation`);
  }

  getConversations(messageType) {
    return this.api.get(`/me/conversations?messageType=${messageType}`);
  }

  createMessage(messageData, conversationId) {
    return this.api.post(
      `/conversations/${conversationId}/messages`,
      messageData
    );
  }

  // lessonMessages(lessonId) {
  //   return this.api.get(`/lessons/${lessonId}/message`);
  // }

  convMessages(conversationId) {
    return this.api.get(`/conversations/${conversationId}/messages`);
  }
}

const apiHandler = new ApiHandler();

export default apiHandler;
