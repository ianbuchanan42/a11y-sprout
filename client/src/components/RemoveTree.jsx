import React from 'react';

//remove with no-cors mode!!!!!

function RemoveTree({ userId, treeUrl }) {
  const handleRemove = () => {
    fetch('api/', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: treeUrl, id: userId }),
    })
      .then((response) => {
        console.log('logout', response.body);
        if (response.ok) {
          // Redirect to home or login page after logout
          window.location.href = '/';
        } else {
          console.error('Failed to remove tree');
        }
      })
      .catch((error) => console.error('Remove error', error));
  };
  return <button onClick={handleRemove}>Remove Tree</button>;
}

export default RemoveTree;
