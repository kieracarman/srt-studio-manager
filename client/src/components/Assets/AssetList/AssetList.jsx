import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown, ChevronUp } from 'react-feather';

import styles from './AssetList.module.css';
import { AssetListItem } from '../';

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

  const sortArrow = key => {
    if (key === sort.key) {
      return sort.direction === 'ascending' ? <ChevronDown /> :
        sort.direction === 'descending' ? <ChevronUp /> : '';
    };
  };

  const filterArray = (array) => {
    return array.filter(item => {
      return props.query !== '' ? (
        [
          item._id,
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
    });
  };

  return (
    <table className={styles.list}>
      <thead>
        <tr>
          <th onClick={() => requestSort('tagNumber')}>Tag #{sortArrow('tagNumber')}</th>
          <th onClick={() => requestSort('description')}>Description{sortArrow('description')}</th>
          <th onClick={() => requestSort('make')}>Make{sortArrow('make')}</th>
          <th onClick={() => requestSort('model')}>Model{sortArrow('model')}</th>
          <th onClick={() => requestSort('location')}>Location{sortArrow('location')}</th>
          <th onClick={() => requestSort('status')}>Status{sortArrow('status')}</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? <tr><td></td><td>Loading...</td></tr> : listAssets()}
      </tbody>
    </table>
  );
};

export default AssetList;