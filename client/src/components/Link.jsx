import React, { useState, addToPriorities } from 'react';

function Link({ text, link }) {
  return (
    <li className='link'>
      <span className={text.length ? 'good' : 'bad'}>
        {text.length ? text : 'no text found'}
      </span>
      <span>: {link}</span>
    </li>
  );
}

export default Link;
