import React, { useState } from 'react';

function URLForm({ updateTree }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    // !!!!!! clean up and use async await
    try {
      new URL(url);
      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({ url }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          updateTree(data);
        });
    } catch (err) {
      console.log(err);
      setError('Please enter a valid URL.');
    }
  };
  return (
    <form id='url-form' onSubmit={handleSubmit}>
      <label htmlFor='url'>Enter URL:</label>
      <input
        type='url'
        id='url'
        value={url}
        onChange={handleInputChange}
        placeholder='https://example.com'
        required
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

// {error && <p style={{ color: 'red' }}>{error}</p>}

export default URLForm;
