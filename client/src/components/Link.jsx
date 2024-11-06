import React from 'react';

function Link({ text, link }) {
  return (
    <li>
      <span>{text.length ? text : 'no text found'}</span>
      <span>: {link}</span>
    </li>
  );
}

export default Link;
