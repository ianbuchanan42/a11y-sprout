import React, { useState } from 'react';
import URLForm from './components/URLForm';
import TreeOutput from './components/Tree';

const App = () => {
  const [a11yTree, setA11Tree] = useState({
    tree: [],
    tabIndex: [],
    headers: [],
    links: [],
    nonSemanticLinks: [],
    skipLink: { text: '', link: '' },
  });
  return (
    <main>
      <h1>A11y Sprout</h1>
      <URLForm updateTree={setA11Tree} />
      {a11yTree.tree.length ? <TreeOutput tree={a11yTree} /> : <span>🌱</span>}
    </main>
  );
};

export default App;
