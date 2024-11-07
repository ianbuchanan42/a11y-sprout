import React, { useState, useEffect } from 'react';
import URLForm from './components/URLForm';
import Tree from './components/Tree';
import Tabs from './components/Tabs';
import Login from './components/Login';
import Logout from './components/Logout';
import InputDropdown from './components/InputDropdown';
import RemoveTree from './components/RemoveTree';
import logo from './assets/A11y-Sprout-Logo.png';

///Users/ianbuchanan/Codesmith/a11y-sprout/client/public/assets/A11y-Sprout-Logo.png

const App = () => {
  const [a11yTree, setA11yTree] = useState(null);

  const [user, setUser] = useState(null);

  const [auth, setAuth] = useState({ authenticated: false, user: null });

  useEffect(() => {
    // Fetch user data to check authentication status
    fetch('http://localhost:3000/auth/user', {
      method: 'GET',
      credentials: 'include', // Include credentials for session
    })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        // not sure if I need to check if trees is a property, might be default
        if (data.user.trees.length) {
          setA11yTree(data.user.trees[0]);
        }

        setUser(data.user);
        setAuth(data); // Update state with authentication status and user data
      })
      .catch((error) => {
        console.log(
          '!!!!!!!!!!!!!!!!!!!!!!!!!!! not fetching well !!!!!!!!!!!!!!!!!',
          error
        );
        console.error('Error checking user authentication:', error);
      });
  }, []);

  const [activeTab, setActiveTab] = useState('Full Tree');

  const handleTabChange = (tab) => {
    return () => {
      setActiveTab(tab);
    };
  };

  return (
    <main>
      <h1> 🌱 A11y Sprout</h1>

      <img src={logo} alt='A11y Sprout Logo' />
      <Login />
      <Logout />
      {auth.user ? <span>{auth.user.username}</span> : <span>no user</span>}
      <URLForm auth={auth} updateTree={setA11yTree} updateUser={setUser} />
      {console.log({ user })}
      {user && (
        <InputDropdown
          label={'Parsed A11y Trees'}
          user={user}
          updateTree={setA11yTree}
          currentTree={a11yTree}
        />
      )}
      {console.log({ a11yTree })}
      {a11yTree && (
        <section>
          <h2>{a11yTree.url}</h2>
          {user && <RemoveTree userId={user._id} treeUrl={a11yTree.url} />}
          <Tabs activeTab={activeTab} handleTabChange={handleTabChange} />
          <Tree activeTab={activeTab} tree={a11yTree} />
        </section>
      )}
    </main>
  );
};

export default App;

// {
// tree: [],
// tabIndex: [],
// headers: [],
// links: [],
// nonSemanticLinks: [],
// skipLink: { text: '', link: '' },
// }
