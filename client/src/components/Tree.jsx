import React, { useState } from 'react';
import Element from './Element';
import Link from './Link';
import Branch from './Branch';
import {
  h1Aside,
  headerAside,
  skipLinkFound,
  skipLinkAside,
  linksAside,
  treeAside,
  tabIndexAside,
  nonSemanticLinksAside,
} from './AsideContent';
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

  const h1Aside =
    h1 === false ? (
      <p>
        <span className='bad'>No h1 found! </span>The h1 tag is the main heading
        or title of a page, and it should match the page's title closely. This
        helps screen reader users understand what the page is about.
      </p>
    ) : (
      ''
    );

  const skipLinkFound = skipLink.text.length ? (
    <Link text={skipLink.text} link={skipLink.link} />
  ) : (
    <span className='bad tan'>No Skip Link Found</span>
  );

  return (
    <section id='tree'>
      {activeTab === 'Full Tree' && (
        <Branch key={nanoid()} aside={treeAside} title={'Full Tree'}>
          {elements}
        </Branch>
      )}
      {activeTab === 'Tab Index' && (
        <Branch key={nanoid()} aside={tabIndexAside} title={'Tab Index'}>
          {tabElements}
        </Branch>
      )}
      {activeTab === 'Headers' && (
        <Branch key={nanoid()} aside={[headerAside, h1Aside]} title={'Headers'}>
          {headers}
        </Branch>
      )}
      {activeTab === 'Links' && (
        <Branch key={nanoid()} aside={linksAside} title={'Links'}>
          {links}
        </Branch>
      )}
      {activeTab === 'Non Semantic Links' && (
        <Branch
          key={nanoid()}
          aside={nonSemanticLinksAside}
          title={'Non Semantic Links'}
        >
          {nonSemanticLinks}
        </Branch>
      )}
      {activeTab === 'Skip Link' && (
        <Branch
          key={nanoid()}
          aside={[skipLinkFound, skipLinkAside]}
          title={'Skip Link'}
        ></Branch>
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
