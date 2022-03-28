import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getAssets } from '../actions/assets';
import SearchBar from '../components/SearchBar';
import AssetList from '../components/Assets/AssetList';

const Assets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssets());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='view'>
      <h1>Assets</h1>
      <SearchBar
        item='Asset'
        newItemPath='/assets/new'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <AssetList query={searchQuery} />
    </div>
  );
};

export default Assets;