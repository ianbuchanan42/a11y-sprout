import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Call the logout route on the server
    fetch('/auth/logout', {
      method: 'GET',
      credentials: 'include', // Include credentials to allow cookies to be sent
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to home or login page after logout
          window.location.href = '/';
        } else {
          console.error('Failed to log out');
        }
      })
      .catch((error) => console.error('Logout error:', error));
  };

  return (
    <>
      <h2>Are you sure you want to log out?</h2>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Logout;
