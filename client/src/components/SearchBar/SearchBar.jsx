import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './SearchBar.module.css'

const SearchBar = ({ item, newItemPath, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate()

  return (
    <section className={styles.searchBar}>
      <input
        className={styles.searchBarInput}
        placeholder='Search'
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value.toLowerCase())}
      />
      {/*<button className='btn-outline'>Filter</button>
      <button className='btn-outline'>Export</button>*/}
      <button onClick={() => navigate(newItemPath)}>Create {item}</button>
    </section>
  )
}

export default SearchBar
