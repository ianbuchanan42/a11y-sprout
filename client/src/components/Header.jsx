import React from 'react';
import Login from './Login';
import Logout from './Logout';

function Header({ logo, auth }) {
  return (
    <header>
      <div id='title'>
        <img id='logo' src={logo} alt='A11y Sprout Logo' />
        <h1>A11y Sprout</h1>
      </div>
      <div id='user'>
        {auth.user && <h3 id='username'>{auth.user.username}</h3>}
        {auth.user ? <Logout /> : <Login />}
      </div>
    </header>
  );
}

export default Header;
