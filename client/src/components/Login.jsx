import React from 'react';

function Login() {
  const clientID = 'Ov23lineeu6TmqbYLJG4';
  const redirectUri = 'http://localhost:3000/auth/github/callback';

  const handleLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=user&prompt=login`;
    window.location.href = githubAuthUrl;
    //window.location.href = 'http://localhost:3000/auth/github'; // Backend URL for GitHub login
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
}

export default Login;
