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
    <section className='flex justify-between gap-2 px-2 py-1 sm:px-8'>
      <input
        className='w-full max-w-lg rounded-md px-4 py-2 text-sm shadow-sm transition duration-200 ease-in-out focus:border-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        type='text'
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
