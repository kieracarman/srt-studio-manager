import { useState } from 'react'
import { api } from '@utils/api'

import styles from './Users.module.css'
import { Layout, SearchBar } from '@components/ui'
import UserList from '@modules/users/UserList/UserList'

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isSuccess, isError, error } =
    api.user.getAll.useQuery()

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
          item='user'
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
