import React, { Component } from 'react';
import { ChevronDown } from 'react-feather';

import AssetListItem from './AssetListItem';

const AssetList = () => (
  <div className='asset-list'>
    <table>
      <thead className='asset-list-header'>
        <tr>
          <th><a href='#'>ID<ChevronDown /></a></th>
          <th><a href='#'>Make<ChevronDown /></a></th>
          <th><a href='#'>Model<ChevronDown /></a></th>
          <th><a href='#'>Status<ChevronDown /></a></th>
        </tr>
      </thead>
      <tbody className='asset-list-items'>
        <AssetListItem />
        <AssetListItem />
        <AssetListItem />
        <AssetListItem />
        <AssetListItem />
      </tbody>
    </table>
  </div>
);

export default AssetList;