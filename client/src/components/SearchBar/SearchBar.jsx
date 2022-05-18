import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SearchBar.module.css';

const SearchBar = ({ item, newItemPath, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.searchBar}>
      <form>
        <input
          className={styles.searchBarInput}
          placeholder='Search'
          value={searchQuery}
          onInput={e => setSearchQuery(e.target.value.toLowerCase())}
        />
        <div className={styles.searchBarControls}>
          {/*<button className='btn-outline'>Filter</button>
          <button className='btn-outline'>Export</button>*/}
          <button onClick={() => navigate(newItemPath)}>Create {item}</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;