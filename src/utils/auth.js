import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_PARTYPLAYLIST_API}/api`,
      withCredentials: true,
    });
    this.service = service;
  }

  loggedin = () => {
    return this.service.get('/loggedin');
  };

  logout = () => {
    return this.service.post('/logout');
  };
}

export default AuthService;
