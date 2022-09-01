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
  let usersList

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    usersList = (
      <UserList query={searchQuery} users={[]} error={error?.data?.message} />
    )
  }

  if (isSuccess) {
    const { ids } = users

    const usersArray = ids.map((id) => {
      return users.entities[id]
    })

    usersList = <UserList query={searchQuery} users={usersArray} />
  }

  content = (
    <section className={styles.users}>
      <SearchBar
        item='User'
        newItemPath='/users/new'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {usersList}
    </section>
  )

  return content
}

export default Users
