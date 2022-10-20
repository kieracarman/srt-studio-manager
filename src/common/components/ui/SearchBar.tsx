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
    <section className='flex md:justify-between md:p-4'>
      <input
        className='border-b border-b-gray-200 p-2 text-xl outline-none focus:border-b-black md:w-1/2 md:rounded-md md:border md:border-gray-200 md:px-3 md:py-2 md:text-sm md:focus:border-black'
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
