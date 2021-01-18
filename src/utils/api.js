import axios from 'axios';

class Quiz {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PARTYPLAYLIST_API}/api`,
      withCredentials: true,
    });
    this.service = service;
  }

  //Adding a Guest User in the Home Component
  addUsers(code, users) {
    return this.service.put(`/quiz/${code}/users`, { users });
  }

  //Quiz Creation Component
  addQuestionsAndQuizCode(user, questions, playlistTitle, playlistDescription) {
    return this.service.post('/quiz', {
      user,
      questions,
      playlistTitle,
      playlistDescription,
    });
  }

  /*  getQuizCode(code) {
    return this.service.get(`/quiz/${code}`);
  } */

  //Lobby Game Component
  getQuizUsers(code) {
    return this.service.get(`/quiz-code/${code}`);
  }

  //Game Component -> Displaying Questions
  getQuizQuestions(code) {
    return this.service.get(`/quiz-code/${code}`);
  }

  //Game Component -> Adding Songs
  addSongs(quizCode, songs) {
    return this.service.put(`/quiz/${quizCode}/addsongs`, { songs });
  }

  //Playlist Component -> Displaying the Playlist
  getSongs(code, userToken) {
    return this.service.post(`/quiz/${code}/playlist`, { userToken });
  }
}
export default Quiz;
