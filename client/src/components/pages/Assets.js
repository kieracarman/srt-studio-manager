import React from 'react';

import SearchBar from '../molecules/SearchBar';
import AssetList from '../organisms/AssetList';

const Assets = () => (
  <div>
    <h1>Assets</h1>
    <div className='list-container'>
      <SearchBar />
      <AssetList />
    </div>

  </div>
);

export default Assets;