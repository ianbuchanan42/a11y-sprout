import React, { useState } from 'react';

function Branch({ title, children, aside }) {
  return (
    <section className='branch'>
      <h2>{title}</h2>
      <aside>{aside}</aside>
      <ul>{children}</ul>
    </section>
  );
}

export default Branch;
