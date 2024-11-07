import React from 'react';

function Element({ role, name, level, rating }) {
  const emptyLink = role === 'link' && name === '';
  const classForName = emptyLink ? 'bad' : '';
  return (
    <li className='element'>
      <span className={`type ${rating}`}>
        {role}
        {level ? `: ${level} ` : ''}
      </span>{' '}
      <span> : </span>
      <span className={classForName}>{name ? name : 'no link context'}</span>
    </li>
  );
}

export default Element;
