import React, { useState, useEffect } from 'react';
import URLForm from './components/URLForm';
import TreeOutput from './components/Tree';
import Tabs from './components/Tabs';
import Login from './components/Login';
import Logout from './components/Logout';

const App = () => {
  const [a11yTree, setA11Tree] = useState({
    tree: [],
    tabIndex: [],
    headers: [],
    links: [],
    nonSemanticLinks: [],
    skipLink: { text: '', link: '' },
  });

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
      <h1>A11y Sprout</h1>
      <Login />
      <Logout />
      {auth.user ? <span>{auth.user.username}</span> : <span>no user</span>}
      <URLForm updateTree={setA11Tree} />

      {a11yTree.tree.length ? (
        <>
          <Tabs activeTab={activeTab} handleTabChange={handleTabChange} />
          <TreeOutput activeTab={activeTab} tree={a11yTree} />
        </>
      ) : (
        <span>🌱</span>
      )}
    </main>
  );
};

export default App;

// import React, { useState } from 'react';

// const TabbedPage = () => {
//     // State to track which tab is active
//     const [activeTab, setActiveTab] = useState('Tab1');

//     // Function to handle tab change
//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//     };

//     return (
//         <div>
//             <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
//             <TabContent activeTab={activeTab} />
//         </div>
//     );
// };

// export default TabbedPage;
