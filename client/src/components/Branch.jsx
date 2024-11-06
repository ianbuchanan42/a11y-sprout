import React, { useState } from 'react';

function Branch({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
}

export default Branch;
