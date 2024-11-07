import React from 'react';

function Element({ role, name, level }) {
  return (
    <li className='element'>
      <span>
        {role}
        {level ? `: ${level} ` : ''}
      </span>
      <span>: {name}</span>
    </li>
  );
}

export default Element;
