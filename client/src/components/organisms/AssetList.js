import React, { Component } from 'react';
import { ChevronDown } from 'react-feather';
import axios from 'axios';

import AssetListItem from '../molecules/AssetListItem';

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
          description={asset.description}
          make={asset.make}
          model={asset.model}
          location={asset.location}
          status={asset.status}
        />
      );
    })
  }

  render() {
    return (
      <div className='list'>
        <table>
          <thead className='list-header'>
            <tr>
              <th><a href='#'>Tag #<ChevronDown /></a></th>
              <th><a href='#'>Description<ChevronDown /></a></th>
              <th><a href='#'>Make<ChevronDown /></a></th>
              <th><a href='#'>Model<ChevronDown /></a></th>
              <th><a href='#'>Location<ChevronDown /></a></th>
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