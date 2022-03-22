import React from 'react';
import { ChevronDown } from 'react-feather';

import AssetListItem from './AssetListItem';

const AssetList = (props) => {
  const listAssets = () => {
    return props.assetList.map((asset) => {
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

  return (
    <div className='list'>
      <table>
        <thead className='list-header'>
          <tr>
            <th><div>Tag #<ChevronDown /></div></th>
            <th><div>Description<ChevronDown /></div></th>
            <th><div>Make<ChevronDown /></div></th>
            <th><div>Model<ChevronDown /></div></th>
            <th><div>Location<ChevronDown /></div></th>
            <th><div>Status<ChevronDown /></div></th>
          </tr>
        </thead>
        <tbody className='asset-list-items'>
          {listAssets()}
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;