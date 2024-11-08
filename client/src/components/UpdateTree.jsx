import React from 'react';

//remove with no-cors mode!!!!!

function UpdateTree({ userId, treeUrl, updateTree }) {
  const handleRemove = (e) => {
    e.preventDefault();
    console.log({ userId, treeUrl });
    fetch('api/', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: treeUrl, id: userId }),
    })
      .then((res) => res.json())
      .then((body) => {
        // Redirect to home or login page after logout
        console.log('Updating this tree:', body);

        updateTree(body);
        //    window.location.href = '/';
      })
      .catch((error) => console.error('Remove error', error));
  };
  return (
    <button id='update' onClick={handleRemove}>
      Update Tree
    </button>
  );
}

export default UpdateTree;
