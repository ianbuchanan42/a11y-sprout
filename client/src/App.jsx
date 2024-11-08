import React, { useState, useEffect, Suspense, lazy } from 'react';
import URLForm from './components/URLForm';
import Tree from './components/Tree';
import Tabs from './components/Tabs';
import InputDropdown from './components/InputDropdown';
import RemoveTree from './components/RemoveTree';
import UpdateTree from './components/UpdateTree';
import Header from './components/Header';
//const Header = lazy(() => import('./components/Header'));
import Footer from './components/Footer';
//const Footer = lazy(() => import('./components/Footer'));
import logo from './assets/A11y-Sprout-Logo.png';

// future features list
// * loading spinner
// * update current tree
// * github link to project
// - show state of img alt text
// - test out headers hierarchy parsing output
// - timeout if parsing takes longer than x amount of time
// - get Emmma R. to look at over all styling
// - make A11y Sprout accessible
// - create production build
// - launch on github
// - include pagination for long list of elements
// - include user avatar when logged in

const App = () => {
  const [a11yTree, setA11yTree] = useState(null);

  const [user, setUser] = useState(null);

  const [auth, setAuth] = useState({ authenticated: false, user: null });

  const [activeTab, setActiveTab] = useState('Full Tree');

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
        if (data?.user?.trees.length) {
          setA11yTree(data.user.trees[0]);
        }

        setUser(data.user);
        setAuth(data); // Update state with authentication status and user data
      })
      .catch((error) => {
        console.error('Error checking user authentication:', error);
      });
  }, []);

  const handleTabChange = (tab) => {
    return () => {
      setActiveTab(tab);
    };
  };

  return (
    <>
      <Header logo={logo} auth={auth} />
      <main>
        <URLForm auth={auth} updateTree={setA11yTree} updateUser={setUser} />
        {console.log({ user })}
        {user && user.trees.length > 0 && (
          <InputDropdown
            label={'Parsed A11y Trees'}
            user={user}
            updateTree={setA11yTree}
            currentTree={a11yTree}
          />
        )}
        {console.log({ a11yTree })}
        {a11yTree && (
          <section id='a11yTree'>
            <h2>{a11yTree.url}</h2>
            <span>
              {user && (
                <RemoveTree
                  userId={user._id}
                  treeUrl={a11yTree.url}
                  updateTree={setA11yTree}
                />
              )}
              {user && (
                <UpdateTree
                  userId={user._id}
                  treeUrl={a11yTree.url}
                  updateTree={setA11yTree}
                />
              )}
            </span>

            <Tabs activeTab={activeTab} handleTabChange={handleTabChange} />
            <Tree activeTab={activeTab} tree={a11yTree} />
          </section>
        )}
      </main>
      <Footer />
    </>
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
