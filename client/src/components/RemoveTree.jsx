import React from 'react';

//remove with no-cors mode!!!!!

function RemoveTree({ userId, treeUrl, updateTree }) {
  const handleRemove = (e) => {
    //e.preventDefault();
    fetch('api/', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: treeUrl, id: userId }),
    })
      .then((res) => res.json())
      .then((body) => {
        // Redirect to home or login page after logout
        console.log('removed tree from this user:', body);

        updateTree(body.trees[0]);
        //    window.location.href = '/';
      })

      .catch((error) => console.error('Remove error', error));
  };
  return (
    <button id='remove' onClick={handleRemove}>
      Remove Tree
    </button>
  );
}

export default RemoveTree;
