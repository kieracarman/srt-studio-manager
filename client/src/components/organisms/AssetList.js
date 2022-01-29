import React, { Component } from 'react';
import { ChevronDown } from 'react-feather';

import AssetListItem from '../molecules/AssetListItem';

export default class AssetList extends Component {
  listAssets() {
    const assets = this.props.assetList;

    return assets.map((asset) => {
      return(
        <AssetListItem
          key={asset._id}
          id={asset._id}
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
    );
  };
};