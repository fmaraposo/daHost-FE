import React from 'react';
import './App.css';
import { /*  Redirect, */ Route, Switch } from 'react-router-dom';
import AuthService from './utils/auth';
import Home from './components/Home';
import QuizCreation from './components/QuizCreation';
import QuizCode from './components/QuizCode';
import LobbyGame from './components/LobbyGame';
import Game from './components/Game';
import PlaylistDisplay from './components/Playlist';
import Navbar from './components/Navbar/Navbar';
import PlaylistNotUser from './components/PlaylistNotUser';

class App extends React.Component {
  state = {
    loggedInUser: null,
  };

  setCurrentUser = (user) => {
    this.setState({
      loggedInUser: user,
    });
  };

  componentDidMount() {
    if (this.state.loggedInUser === null) {
      const authService = new AuthService();
      authService.loggedin().then((response) => {
        if (response.data._id) {
          this.setCurrentUser(response.data);
          localStorage.setItem('loggedInUser', response.data.displayName);
        } else {
          localStorage.removeItem('loggedInUser');
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Home loggedInUser={this.state.loggedInUser} />;
            }}
          />
          <Route
            path="/quiz-creation"
            render={() => {
              return (
                <div>
                  <Navbar
                    loggedInUser={this.state.loggedInUser}
                    setCurrentUser={this.setCurrentUser}
                  />
                  <QuizCreation loggedInUser={this.state.loggedInUser} />
                </div>
              );
            }}
          />
          <Route
            exact
            path="/quiz-code/:quizCode"
            render={() => {
              return (
                <div>
                  <Navbar
                    loggedInUser={this.state.loggedInUser}
                    setCurrentUser={this.setCurrentUser}
                  />
                  <QuizCode loggedInUser={this.state.loggedInUser} />
                </div>
              );
            }}
          />
          <Route
            path="/quiz-code/lobbygame/:quizCode"
            render={(props) => {
              return (
                <div>
                  <Navbar
                    loggedInUser={this.state.loggedInUser}
                    setCurrentUser={this.setCurrentUser}
                  />
                  <LobbyGame
                    {...props}
                    loggedInUser={localStorage.getItem('loggedInUser')}
                    setCurrentUser={this.setCurrentUser}
                  />
                </div>
              );
            }}
          />
          <Route
            path="/quiz-code/game/:quizCode"
            render={(props) => {
              return (
                <div>
                  <Navbar
                    loggedInUser={this.state.loggedInUser}
                    setCurrentUser={this.setCurrentUser}
                  />
                  <Game
                    {...props}
                    loggedInUser={localStorage.getItem('loggedInUser')}
                  />
                </div>
              );
            }}
          />
          <Route
            path="/quiz-code/playlist/finishedgame"
            render={() => {
              return (
                <div>
                  <Navbar
                    loggedInUser={this.state.loggedInUser}
                    setCurrentUser={this.setCurrentUser}
                  />
                  <PlaylistNotUser />
                </div>
              );
            }}
          />
          <Route
            path="/quiz-code/:quizCode/playlist"
            render={() => {
              return (
                <div>
                  <Navbar
                    loggedInUser={this.state.loggedInUser}
                    setCurrentUser={this.setCurrentUser}
                  />
                  <PlaylistDisplay loggedInUser={this.state.loggedInUser} />
                </div>
              );
            }}
          />
          <Route
            path="/login-spotify"
            render={() => {
              window.location.href = `${process.env.REACT_APP_PARTYPLAYLIST_API}/api/auth/spotify`;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
