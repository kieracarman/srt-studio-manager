import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown, ChevronUp } from 'react-feather';

import AssetListItem from './AssetListItem';

const AssetList = (props) => {
  const { assets, isLoading } = useSelector((state) => state.assets);
  const [ sort, setSort ] = useState({});

  const sortedAssets = useMemo(() => {
    let sortedAssets = [...assets];
    if (sort.direction !== '') {
      sortedAssets.sort((a, b) => {
        if (a[sort.key] < b[sort.key]) {
          return sort.direction === 'ascending' ? -1 : 1;
        }
        if (a[sort.key] > b[sort.key]) {
          return sort.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedAssets;
  }, [assets, sort]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sort.key === key && sort.direction === 'ascending') {
      direction = 'descending';
    } else if (sort.key === key && sort.direction === 'descending') {
      direction = '';
    }
    setSort({ key, direction });
  };

  const sortArrow = (key) => {
    if (key === sort.key) {
      return sort.direction === 'ascending' ? <ChevronDown /> :
        sort.direction === 'descending' ? <ChevronUp /> : '';
    }
  }

  const filterArray = (array) => {
    return array.filter(item => {
      return props.query !== '' ? (
        [
          item.description,
          item.tagNumber,
          item.make,
          item.model,
        ].join(' ')
          .toString()
          .toLowerCase()
          .indexOf(props.query.toLowerCase()) > -1
      ) : true;
    });
  }

  const listAssets = () => {
    return filterArray(sortedAssets).map((asset) => {
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
            <th onClick={() => requestSort('tagNumber')}><div>Tag #{sortArrow('tagNumber')}</div></th>
            <th onClick={() => requestSort('description')}><div>Description{sortArrow('description')}</div></th>
            <th onClick={() => requestSort('make')}><div>Make{sortArrow('make')}</div></th>
            <th onClick={() => requestSort('model')}><div>Model{sortArrow('model')}</div></th>
            <th onClick={() => requestSort('location')}><div>Location{sortArrow('location')}</div></th>
            <th onClick={() => requestSort('status')}><div>Status{sortArrow('status')}</div></th>
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