import React, { Component } from 'react';

const SearchBar = () => (
  <div className='search-bar'>
    <form>
      <input
        className='search-bar-input'
        placeholder='Search'
      />
      <div className='search-bar-controls'>
        <div>Filter</div>
        <div>Export</div>
      </div>
    </form>
  </div>
);

export default SearchBar;