import React from 'react';

import SearchBar from '../layout/SearchBar';
import AssetList from '../layout/AssetList';

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