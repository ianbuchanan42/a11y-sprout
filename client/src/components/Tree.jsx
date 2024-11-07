import React, { useState } from 'react';
import Element from './Element';
import Link from './Link';
import Branch from './Branch';
import { nanoid } from 'nanoid';

function Tree({ tree, activeTab }) {
  const skipLink = tree.skipLink;
  const h1 = tree.h1;
  //handle addToPriorities here?

  const links = tree.links.map(({ text, link }) => {
    return <Link text={text} link={link} key={nanoid()} />;
  });

  const nonSemanticLinks = tree.nonSemanticLinks.map(({ text, link }) => {
    return <Link text={text} link={link} key={nanoid()} />;
  });

  const headers = tree.headers.map(({ role, name, level, rating }) => {
    return (
      <Element
        role={role}
        name={name}
        level={level}
        rating={rating}
        key={nanoid()}
      />
    );
  });
  const tabElements = tree.tabIndex.map(({ role, name, level, rating }) => {
    return (
      <Element
        role={role}
        name={name}
        level={level}
        rating={rating}
        key={nanoid()}
      />
    );
  });
  const elements = tree.tree.map(({ role, name, level, rating }) => {
    return (
      <Element
        role={role}
        name={name}
        level={level}
        rating={rating}
        key={nanoid()}
      />
    );
  });
  return (
    <section id='tree'>
      {activeTab === 'Full Tree' && (
        <Branch title={'Full Tree'}>{elements}</Branch>
      )}
      {activeTab === 'Tab Index' && (
        <Branch title={'Tab Index'}>{tabElements}</Branch>
      )}
      {activeTab === 'Headers' && (
        <Branch h1={h1} title={'Headers'}>
          {headers}
        </Branch>
      )}
      {activeTab === 'Links' && <Branch title={'Links'}>{links}</Branch>}
      {activeTab === 'Non Semantic Links' && (
        <Branch title={'Non Semantic Links'}>{nonSemanticLinks}</Branch>
      )}
      {activeTab === 'Skip Link' && (
        <Branch title={'Skip Link'}>
          {' '}
          {skipLink.text.length ? (
            <Link text={skipLink.text} link={skipLink.link} />
          ) : (
            <>
              <span className='bad'>No Skip Link Found</span>
              <p>
                A{' '}
                <a
                  className='good'
                  href='https://webaim.org/techniques/skipnav/'
                >
                  skip link
                </a>{' '}
                is an essential accessibility feature that allows users,
                especially those relying on assistive technologies like screen
                readers and keyboard navigation, to bypass repetitive navigation
                and jump directly to the main content of a page. This improves
                navigation efficiency, reduces cognitive load, and aligns with
                Web Content Accessibility Guidelines (WCAG). Skip links enhance
                usability for all users by minimizing the need to repeatedly tab
                or scroll through the same elements, creating a more inclusive
                and user-friendly experience.
              </p>
            </>
          )}
        </Branch>
      )}
    </section>
  );
}

export default Tree;

// const TabContent = ({ activeTab }) => {
//   return (
//     <div className='tab-content'>
//       {activeTab === 'Tab1' && <div>Content for Tab 1</div>}
//       {activeTab === 'Tab2' && <div>Content for Tab 2</div>}
//       {activeTab === 'Tab3' && <div>Content for Tab 3</div>}
//     </div>
//   );
// };
