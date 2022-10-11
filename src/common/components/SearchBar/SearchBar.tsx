import styles from './SearchBar.module.css'
import { Button } from '@components/ui'

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

      <Button href={newItemPath}>New {item}</Button>
    </section>
  )
}

export default SearchBar
