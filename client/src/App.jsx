import React, { useState } from 'react';
import URLForm from './components/URLForm';
import TreeOutput from './components/Tree';
import Tabs from './components/Tabs';

const App = () => {
  const [a11yTree, setA11Tree] = useState({
    tree: [],
    tabIndex: [],
    headers: [],
    links: [],
    nonSemanticLinks: [],
    skipLink: { text: '', link: '' },
  });

  const [activeTab, setActiveTab] = useState('Full Tree');

  const handleTabChange = (tab) => {
    return () => {
      setActiveTab(tab);
    };
  };

  return (
    <main>
      <h1>A11y Sprout</h1>
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
