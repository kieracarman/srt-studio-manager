import React, { Component } from 'react';
import { ChevronDown } from 'react-feather';
import axios from 'axios';

import AssetListItem from './AssetListItem';

export default class AssetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: [],
      errors: {}
    }
  }

  // Starting lifecycle and calling for data from the database
  componentDidMount() {
    axios.get('/api/assets/')
      .then(response => {
        // Create a holder array for data
        const list = response.data.slice()

        // Set assets state to list
        this.setState({assets: list});
        console.log(this.state.assets);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  listAssets() {
    return this.state.assets.map((asset) => {
      return(
        <AssetListItem
          key={asset._id}
          tagNumber={asset.tagNumber}
          make={asset.make}
          model={asset.model}
          status={asset.status}
        />
      );
    })
  }

  render() {
    return (
      <div className='asset-list'>
        <table>
          <thead className='asset-list-header'>
            <tr>
              <th><a href='#'>Tag #<ChevronDown /></a></th>
              <th><a href='#'>Make<ChevronDown /></a></th>
              <th><a href='#'>Model<ChevronDown /></a></th>
              <th><a href='#'>Status<ChevronDown /></a></th>
            </tr>
          </thead>
          <tbody className='asset-list-items'>
            {this.listAssets()}
          </tbody>
        </table>
      </div>
    )
  }

};