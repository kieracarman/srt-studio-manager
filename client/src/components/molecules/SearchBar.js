import React from 'react';

import Button from '../atoms/Button';

const SearchBar = ({ item, createNew }) => (
  <div className='search-bar'>
    <form>
      <input
        className='search-bar-input'
        placeholder='Search'
      />
      <div className='search-bar-controls'>
        <Button type='btn-outline'>Filter</Button>
        <Button type='btn-outline'>Export</Button>
        <Button onClick={createNew}>Create {item}</Button>
      </div>
    </form>
  </div>
);

export default SearchBar;