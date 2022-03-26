import React from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown } from 'react-feather';

import AssetListItem from './AssetListItem';

const AssetList = (props) => {
  const { assets, isLoading } = useSelector((state) => state.assets);
  

  const filterArray = (array) => {
    if (!props.query) {
      return array;
    }

    return array.filter((item) => {
      const itemDesc = item.description.toLowerCase();
      return itemDesc.includes(props.query);
    })
  }

  const listAssets = () => {
    return filterArray(assets).map((asset) => {
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
          {isLoading ? <h3>Loading...</h3> : listAssets()}
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;