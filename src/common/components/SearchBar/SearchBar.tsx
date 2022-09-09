import Link from 'next/link'

import styles from './SearchBar.module.css'

type SearchBarProps = {
  item: string
  newItemPath: string
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
}

const SearchBar = ({
  item,
  newItemPath,
  searchQuery,
  setSearchQuery
}: SearchBarProps) => {
  return (
    <section className={styles.searchBar}>
      <input
        className={styles.searchBarInput}
        placeholder='Search'
        value={searchQuery}
        onInput={(e) =>
          setSearchQuery((e.target as HTMLInputElement).value.toLowerCase())
        }
      />
      {/*<button className='btn-outline'>Filter</button>
      <button className='btn-outline'>Export</button>*/}
      <Link href={newItemPath}>
        <a className='button'>{`New ${item}`}</a>
      </Link>
    </section>
  )
}

export default SearchBar
