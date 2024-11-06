import React, { useState } from 'react';
import Element from './Element';
import Link from './Link';
import Branch from './Branch';
import { nanoid } from 'nanoid';

function Tree({ tree }) {
  const skipLink = tree.skipLink;

  const links = tree.links.map(({ text, link }) => {
    return <Link text={text} link={link} key={nanoid()} />;
  });

  const nonSemanticLinks = tree.nonSemanticLinks.map(({ text, link }) => {
    return <Link text={text} link={link} key={nanoid()} />;
  });
  const headers = tree.headers.map(({ role, name, level }) => {
    return <Element role={role} name={name} level={level} key={nanoid()} />;
  });
  const tabElements = tree.tabIndex.map(({ role, name, level }) => {
    return <Element role={role} name={name} level={level} key={nanoid()} />;
  });
  const elements = tree.tree.map(({ role, name, level }) => {
    return <Element role={role} name={name} level={level} key={nanoid()} />;
  });
  return (
    <section id='tree'>
      <Branch title={'Full Tree'}>{elements}</Branch>
      <Branch title={'Tab Index'}>{tabElements}</Branch>
      <Branch title={'Headers'}>{headers}</Branch>
      <Branch title={'Links'}>{links}</Branch>
      <Branch title={'Non Semantic Links'}>{nonSemanticLinks}</Branch>
      <Branch title={'Skip Link'}>
        {' '}
        {skipLink.text.length ? (
          <Link text={skipLink.text} link={skipLink.link} />
        ) : (
          <span>No Skip Link Found</span>
        )}
      </Branch>
    </section>
  );
}

export default Tree;
