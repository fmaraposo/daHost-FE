import React from 'react';
import { useHistory } from 'react-router';
import AuthService from '../../utils/auth';
import './Button.css';

const STYLES = ['btn--primary', 'btn--outline'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = (props, { type, buttonStyle, buttonSize }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const history = useHistory();

  const logoutUser = () => {
    const authService = new AuthService();
    authService.logout().then(() => {
      props.setCurrentUser(null);
      localStorage.removeItem('loggedInUser');
      history.push({
        pathname: '/',
      });
      console.log('The LogOut Button is Working');
    });
  };

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={logoutUser}
      type={type}
    >
      Log Out
    </button>
  );
};
