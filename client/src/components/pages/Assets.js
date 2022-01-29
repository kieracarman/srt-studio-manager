import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SearchBar from '../molecules/SearchBar';
import AssetList from '../organisms/AssetList';
import Modal from './Modal';
import EditAsset from '../organisms/EditAsset';

const Assets = () => {

  return (
    <div className='view'>
      <h1>Assets</h1>
      <SearchBar item='Asset' newItemPath='/assets/new' />
      <AssetList />

      <Switch>
        <Route 
          path='/assets/:id'
          children={({match}) => {
            return (
              <Modal onClose='/assets'>
                <EditAsset id={match.params.id} />
              </Modal>
            )
          }}
        />

        <Route 
          path='/assets/new'
          children={({match}) => (
            <Modal onClose='/assets'>
              <EditAsset />
            </Modal>
          )}
        />
      </Switch>

    </div>
  );
};

export default Assets;