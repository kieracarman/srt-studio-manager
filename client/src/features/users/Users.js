import { useState } from 'react'

import styles from './Users.module.css'
import { SearchBar } from '../../components'
import { UserList } from './components'
import { useGetUsersQuery } from './usersApiSlice'

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('usersList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = users

    const usersArray = ids.map((id) => {
      return users.entities[id]
    })

    content = (
      <section className={styles.users}>
        <SearchBar
          item='User'
          newItemPath='/users/new'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <UserList query={searchQuery} users={usersArray} />
      </section>
    )
  }

  return content
}

export default Users
