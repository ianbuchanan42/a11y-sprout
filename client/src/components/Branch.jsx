import React, { useState } from 'react';

function Branch({ title, children, h1 }) {
  return (
    <section className='branch'>
      <h2>{title}</h2>
      {h1 === false && <p className='bad'>No h1 found!</p>}
      <ul>{children}</ul>
    </section>
  );
}

export default Branch;
