import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';

import SearchBar from '../molecules/SearchBar';
import AssetList from '../organisms/AssetList';
import Modal from './Modal';
import EditAsset from '../organisms/EditAsset';

export default withRouter(class Assets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: [],
      updateAsset: {
        description: ''
      },
      isLoading: false,
      errors: {}
    }
  }

  componentDidMount() {
    axios.get('/api/assets')
      .then(response => {
        // Create a holder array for data
        const list = response.data.slice();

        // Set assets state to list
        this.setState({ assets: list });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleEdit(id) {
    if (id === 'new') {
      const newAsset = {
        description: ''
      };
      this.setState({ updateAsset: newAsset });
    } else {
        const holderObject = this.state.assets.find(obj => { return obj._id === id; });
        this.setState({ updateAsset: holderObject });
    };
  };

  handleChange(asset) {
    this.setState({ updateAsset: asset });
  };

  handleSubmit() {
    // Start loading
    this.setState({ isLoading: true });

    let holderArray = this.state.assets.slice();
    const data = this.state.updateAsset;
    
    if (!data._id) {
      axios.post('/api/assets', data)
        .then(res => {
          return console.log(res.data.message);
        })
        .catch(err => {
          return console.log(err);
      });
      holderArray = this.state.assets.concat(data);
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
    this.setState({ assets: holderArray });

    // Reset updateAsset object
    this.setState({ updateAsset: {} });

    // Done loading
    this.setState({ isLoading: false });
    
    // Redirect back to list page
    this.props.history.push('/assets');
  };

  render() {
    const assetList = this.state.assets;

    return (
      <div className='view'>
        <h1>Assets</h1>
        <SearchBar item='Asset' newItemPath='/assets/new' />
        <AssetList assetList={assetList} />

        <Switch>
          <Route 
            path='/assets/:id'
            children={({match}) => {
              return (
                <Modal onClose='/assets'>
                  <EditAsset
                    asset={this.state.updateAsset}
                    id={match.params.id}
                    onEdit={this.handleEdit.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    onSubmit={this.handleSubmit.bind(this)}
                    isLoading={this.state.isLoading}
                  />
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
});