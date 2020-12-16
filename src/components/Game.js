import React from 'react';
import Quiz from '../utils/api.js';
/* import SearchBar from './SearchBar'; */
import { withRouter } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

class Game extends React.Component {
  state = {
    questions: [],
    songs: {
      song0: '',
      song1: '',
      song2: '',
      song3: '',
      song4: '',
    },
  };

  componentDidMount() {
    const quizService = new Quiz();
    const quizCode = this.props.match.params.quizCode;
    quizService.getQuizQuestions(quizCode).then((response) => {
      const gameQuestions = response.data[0];
      this.setState({
        questions: gameQuestions.questions,
      });
    });
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState((prevState) => ({
      songs: {
        // object that we want to update
        ...prevState.songs, // keep all other key-value pairs
        [name]: value, // update the value of specific key
      },
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const quizService = new Quiz();
    const answerSongs = this.state.songs;
    const quizCode = this.props.match.params.quizCode;
    const songs = Object.values(answerSongs);
    console.log(`These songs: ${songs}`);
    quizService.addSongs(quizCode, songs).then((response) => {
      console.log(response);
      console.log(`These songs were submited: ${songs}`);
      console.log(`These quizCode was submited: ${quizCode}`);
      this.props.history.push(`/quiz-code/${quizCode}/playlist`);
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="lobby-game-wrapper">
          <h1 className="primary-title">Game</h1>
          <form onSubmit={this.handleFormSubmit}>
            <div className="gameQuestions">
              <form onSubmit={this.handleFormSubmit}>
                <ul className="game-board">
                  {this.state.questions.map((question, index) => {
                    return (
                      <div key={index}>
                        <li className="questions-game">{question}</li>
                        <input
                          className="primary-input-game"
                          type="text"
                          name={`song${index}`}
                          onChange={this.handleChange}
                          value={this.state.songs[`song${index}`]}
                        />
                      </div>
                    );
                  })}
                </ul>
              </form>
            </div>
            <button className="treat-button-quizcode">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Game);
