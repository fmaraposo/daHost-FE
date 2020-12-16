import React from 'react';
import Quiz from '../utils/api';
import SpotifyPlayer from 'react-spotify-player';
import { withRouter } from 'react-router-dom';

class Playlist extends React.Component {
  state = {
    playlist: null,
  };

  componentDidMount() {
    const code = this.props.match.params.quizCode;
    let userToken = this.props.loggedInUser.accessToken;
    const quizService = new Quiz();
    quizService.getSongs(code, userToken).then((response) => {
      console.log(response.data);
      this.setState({
        playlist: response.data,
      });
    });
  }

  render() {
    const size = {
      width: '100%',
      height: 300,
    };

    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'

    //  const spotifyUri =[ "spotify:track:3bWGaqVeYKMlLss40mPgNn", "spotify:track:7iN1s7xHE4ifF5povM6A48"]

    return (
      <div>
        <h1>Playlist display</h1>
        <div>
          {/* <ReactAudioPlayer src={this.state.playlist[index].preview_url} controls /> */}
          <SpotifyPlayer
            uri={this.state.playlist}
            size={size}
            view={view}
            theme={theme}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Playlist);
