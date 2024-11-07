import React from 'react';

function Tabs({ activeTab, handleTabChange }) {
  return (
    <section className='tabs'>
      <button
        className={activeTab === 'Full Tree' ? 'active' : ''}
        onClick={handleTabChange('Full Tree')}
      >
        Full Tree
      </button>
      <button
        className={activeTab === 'Tab Index' ? 'active' : ''}
        onClick={handleTabChange('Tab Index')}
      >
        Tab Index
      </button>
      <button
        className={activeTab === 'Headers' ? 'active' : ''}
        onClick={handleTabChange('Headers')}
      >
        Headers
      </button>
      <button
        className={activeTab === 'Links' ? 'active' : ''}
        onClick={handleTabChange('Links')}
      >
        Links
      </button>
      <button
        className={activeTab === 'Non Semantic Links' ? 'active' : ''}
        onClick={handleTabChange('Non Semantic Links')}
      >
        Non Semantic Links
      </button>
      <button
        className={activeTab === 'Skip Link' ? 'active' : ''}
        onClick={handleTabChange('Skip Link')}
      >
        Skip Link
      </button>
    </section>
  );
}

export default Tabs;

// const Tabs = ({ activeTab> handleTabChange }) => {
//   return (
//     <div className='tabs'>
//       <button
//         className={activeTab === 'Tab1' ? 'active' : ''}
//         onClick={() => handleTabChange('Tab1')}
//       >
//         Tab 1
//       </button>
//       <button
//         className={activeTab === 'Tab2' ? 'active' : ''}
//         onClick={() => handleTabChange('Tab2')}
//       >
//         Tab 2
//       </button>
//       <button
//         className={activeTab === 'Tab3' ? 'active' : ''}
//         onClick={() => handleTabChange('Tab3')}
//       >
//         Tab 3
//       </button>
//     </div>
//   );
// };
