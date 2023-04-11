import { useState } from 'react'
import { api } from '@utils/api'

import { Layout, SearchBar, Loader } from '@components/ui'
import RoomList from '@modules/rooms/RoomList/RoomList'

const Rooms = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isSuccess, isError, error } =
    api.room.getAll.useQuery()

  let content
  let roomsList

  if (isLoading) content = <Loader />

  if (isError) {
    roomsList = (
      <RoomList query={searchQuery} rooms={[]} error={error?.message} />
    )
  }

  if (isSuccess) {
    roomsList = <RoomList query={searchQuery} rooms={data} />
  }

  content = (
    <Layout>
      <section className='grid grid-rows-[auto_1fr]'>
        <SearchBar
          item='room'
          newItemPath='/rooms/new'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {roomsList}
      </section>
    </Layout>
  )

  return content
}

export default Rooms
