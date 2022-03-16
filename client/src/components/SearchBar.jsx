import React from 'react';

import Button from './Button';

const SearchBar = ({ item, newItemPath }) => (
  <div className='search-bar'>
    <form>
      <input
        className='search-bar-input'
        placeholder='Search'
      />
      <div className='search-bar-controls'>
        <button className='btn-outline'>Filter</button>
        <button className='btn-outline'>Export</button>
        <Button to={newItemPath}>Create {item}</Button>
      </div>
    </form>
  </div>
);

export default SearchBar;