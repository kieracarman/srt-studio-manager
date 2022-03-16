import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';

import Modal from './Modal';
import SearchBar from '../components/SearchBar';
import AssetList from '../components/Assets/AssetList';
import EditAsset from '../components/Assets/EditAsset';

const Assets = (props) => {
  const [assets, setAssets] = useState([]);
  const [updateAsset, setUpdateAsset] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/assets')
      .then(response => {
        // Create a holder array for data
        const list = response.data.slice();

        // Set assets state to list
        setAssets(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = (id) => {
    if (id === 'new') {
      const newAsset = {
        description: ''
      };
      setUpdateAsset(newAsset);
    } else {
        const holderObject = assets.find(obj => { return obj._id === id; });
        setUpdateAsset(holderObject);
    };
  };

  const handleChange = (asset) => {
    setUpdateAsset(asset);
  };

  const handleSubmit = () => {
    // Start loading
    setIsLoading(true);

    let holderArray = assets.slice();
    const data = updateAsset;
    
    if (!data._id) {
      axios.post('/api/assets', data)
        .then(res => {
          return console.log(res.data.message);
        })
        .catch(err => {
          return console.log(err);
      });
      holderArray = assets.concat(data);
    } else {
      axios.put('/api/assets/' + data._id, data)
        .then(res => {
          return console.log(res.data.message);
        })
        .catch(err => {
          return console.log(err);
      });
      const objIndex = holderArray.findIndex(obj => { return obj._id === data._id });
      holderArray[objIndex] = data;
    };

    // Update list in state
    setAssets(holderArray);

    // Reset updateAsset object
    setUpdateAsset({});

    // Done loading
    setIsLoading(false);
    
    // Redirect back to list page
    props.history.push('/assets');
  };

  return (
    <div className='view'>
      <h1>Assets</h1>
      <SearchBar item='Asset' newItemPath='/assets/new' />
      <AssetList assetList={assets} />

      <Switch>
        <Route 
          path='/assets/:id'
          children={({match}) => {
            return (
              <Modal onClose='/assets'>
                <EditAsset
                  asset={updateAsset}
                  id={match.params.id}
                  onEdit={handleEdit}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </Modal>
            )
          }}
        />

        <Route 
          path='/assets/new'
          children={() => (
            <Modal onClose='/assets'>
              <EditAsset />
            </Modal>
          )}
        />
      </Switch>
    </div>
  );
};

export default withRouter(Assets);