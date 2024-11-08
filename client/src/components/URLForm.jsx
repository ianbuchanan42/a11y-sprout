import React, { useState } from 'react';

function URLForm({ auth, updateTree, updateUser }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUrl(e.target.value);
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    // !!!!!! clean up and use async await
    try {
      new URL(url);
      let body = { url, id: null };
      if (auth.user) {
        console.log(url, auth.user._id);
        body.id = auth.user._id;
      }

      fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUrl('');
          setLoading(false);
          if (auth.user) {
            updateUser(data.user);
            updateTree(data.tree);
          } else {
            updateTree(data);
          }
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

      {loading ? (
        <span className='wiggle-emoji'>🌱</span>
      ) : (
        <button type='submit'>Submit</button>
      )}
    </form>
  );
}

export default URLForm;
