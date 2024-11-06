import React from 'react';

function Element({ role, name, level }) {
  return (
    <li>
      <span>
        {role}
        {level ? `: ${level} ` : ''}
      </span>
      <span>: {name}</span>
    </li>
  );
}

export default Element;
