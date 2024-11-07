import React, { useState } from 'react';

const InputDropdown = ({ label, user, updateTree }) => {
  const options = user.trees.map((tree) => {
    return tree.url;
  });

  const handleChange = (event) => {
    const selectedTree = user.trees.find(
      (tree) => tree.url === event.target.value
    );
    console.log({ selectedTree });

    if (selectedTree) {
      updateTree(selectedTree);
    }
  };

  return (
    <div>
      <label>{label}</label>
      <select onChange={handleChange}>
        <option value='' disabled>
          Select an option
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputDropdown;