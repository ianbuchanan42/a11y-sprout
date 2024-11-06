import React from 'react';

function Login() {
  const clientID = 'Ov23lineeu6TmqbYLJG4';
  const redirectUri = 'http://localhost:3000/auth/github/callback';

  const handleLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=user`;
    window.location.href = githubAuthUrl;
    //window.location.href = 'http://localhost:3000/auth/github'; // Backend URL for GitHub login
  };

  return (
    <div>
      <h2>Login with GitHub</h2>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
}

export default Login;
