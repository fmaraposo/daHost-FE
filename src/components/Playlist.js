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
      console.log('Playlist Response Data', response.data);
      this.setState({
        playlist: response.data,
      });
    });
  }

  render() {
    const size = {
      width: '50%',
      height: 300,
    };

    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'

    return (
      <div className="playlistWrapper">
        <h1 className="primary-title-playlist">Here's your playlist!!</h1> 
        <div className="playlistPlayer">
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
