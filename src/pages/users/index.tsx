import { useState } from 'react'
import { trpc } from '@utils/trpc'

import styles from './Users.module.css'
import SearchBar from '@components/SearchBar/SearchBar'
import UserList from '@modules/users/UserList/UserList'

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isSuccess, isError, error } = trpc.useQuery([
    'user.getAll'
  ])

  let content
  let usersList

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    usersList = (
      <UserList query={searchQuery} users={[]} error={error?.message} />
    )
  }

  if (isSuccess) {
    usersList = <UserList query={searchQuery} users={data} />
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
