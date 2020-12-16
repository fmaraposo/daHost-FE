import axios from 'axios';

class Quiz {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PARTYPLAYLIST_API}/api`,
      withCredentials: true
    });
    this.service = service;
  }

  addUsers(code, users) {
    return this.service.put(`/quiz/${code}/users`, { users });
  }

  addQuestionsAndQuizCode(user, questions, playlistTitle, playlistDescription) {
    return this.service.post('/quiz', {
      user,
      questions,
      playlistTitle,
      playlistDescription,
    });
  }

  getQuizCode(code) {
    return this.service.get(`/quiz/${code}`);
  }

  getQuizUsers(code) {
    return this.service.get(`/quiz-code/${code}`);
  }

  getQuizQuestions(code) {
    return this.service.get(`/quiz-code/${code}`);
  }

  addSongs(quizCode, songs) {
    return this.service.put(`/quiz/${quizCode}/addsongs`, { songs });
  }

  getSongs(code, userToken) {
    return this.service.post(`/quiz/${code}/playlist`, { userToken });
  }
}
export default Quiz;
