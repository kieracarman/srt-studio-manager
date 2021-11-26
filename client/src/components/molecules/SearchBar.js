import React, { Component } from 'react';

import Button from '../atoms/Button';

const SearchBar = ({ item }) => (
  <div className='search-bar'>
    <form>
      <input
        className='search-bar-input'
        placeholder='Search'
      />
      <div className='search-bar-controls'>
        <Button type='btn-outline'>Filter</Button>
        <Button type='btn-outline'>Export</Button>
        <Button>Create {item}</Button>
      </div>
    </form>
  </div>
);

export default SearchBar;