import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import AssetList from '../components/Assets/AssetList';

const Assets = (props) => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const pullAsset = (id) => {
    if (id === 'new') {
      return {
        _id: 'new',
        description: ''
      };
    } else {
        return assets.find(obj => { return obj._id === id; });
    };
  };

  const handleSubmit = (updateAsset) => {
    // Start loading
    setIsLoading(true);

    let holderArray = assets.slice();
    let data = updateAsset;
    
    if (!data._id) {
      axios.post('/api/assets', data)
        .then(res => {
          data['_id'] = res.data.id;
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

    // Done loading
    setIsLoading(false);
    
    // Redirect back to list page
    props.history.push('/assets');
  };

  const handleDelete = (id) => {
    setIsLoading(true);

    let holderArray = assets.slice();
    const index = assets.findIndex(obj => { return obj._id === id });

    axios.delete('/api/assets/' + id)
    .then(res => {
      return console.log(res.data.message);
    })
    .catch(err => {
      return console.log(err);
    });

    if (index > -1) {
      holderArray.splice(index, 1)
    }

    // Set assets array to updated array
    setAssets(holderArray);

    // Set loading to false
    setIsLoading(false);

    // Redirect back to list page
    props.history.push('/assets');
  }

  const filterAssets = (list, query) => {
    if (!query) {
      return list;
    }

    return list.filter((asset) => {
      const assetDesc = asset.description.toLowerCase();
      return assetDesc.includes(query);
    })
  }

  return (
    <div className='view'>
      <h1>Assets</h1>
      <SearchBar
        item='Asset'
        newItemPath='/assets/new'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <AssetList assetList={filterAssets(assets, searchQuery)} />
    </div>
  );
};

export default Assets;