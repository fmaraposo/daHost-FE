import React from 'react';
import Quiz from '../utils/api';
import Navbar from './Navbar/Navbar';
import '../App.css';

class LobbyGame extends React.Component {
  state = {
    users: [],
  };
  intervalID = 0;

  componentDidMount() {
    this.intervalID = setInterval(() => {
      const quizService = new Quiz();
      const quizCode = this.props.match.params.quizCode;
      quizService.getQuizUsers(quizCode).then((response) => {
        const game = response.data[0];
        this.setState({
          users: game.users,
        });
      });
    }, 500);
  }

  handleButton = () => {
    clearInterval(this.intervalID);
    const quizCode = this.props.match.params.quizCode;
    this.props.history.push(`/quiz-code/game/${quizCode}`);
  };

  render() {
    return this.state.users ? (
      <div className="lobby-game-wrapper">
        <div>
          <Navbar />
        </div>
        <div className="wrapper-lobbygame">
          <div>
            <h1 className="primary-title">Waiting for all players...</h1>
          </div>
          <div>
            <div className="users-display">
              <ul className="users-ul">
                {this.state.users.map((user, index) => {
                  return (
                    <li className="users-lobby" key={index}>
                      {user}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="form-field">
              <button className="treat-button" onClick={this.handleButton}>
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading</div>
    );
  }
}

export default LobbyGame;
