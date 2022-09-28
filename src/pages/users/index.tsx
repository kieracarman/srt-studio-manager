import { useState } from 'react'
import { trpc } from '@utils/trpc'

import styles from './Users.module.css'
import Layout from '@components/Layout/Layout'
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
    <Layout>
      <section className={styles.users}>
        <SearchBar
          item='User'
          newItemPath='/users/new'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {usersList}
      </section>
    </Layout>
  )

  return content
}

export default Users
