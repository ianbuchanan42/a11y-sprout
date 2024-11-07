import React, { useState } from 'react';

function Branch({ title, children }) {
  return (
    <section className='branch'>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
}

export default Branch;
