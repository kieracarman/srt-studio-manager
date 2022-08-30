import { useState } from 'react'

import styles from './Users.module.css'
import { SearchBar } from '../../components'
import { UserList } from './components'

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className={styles.users}>
      <SearchBar
        item='User'
        newItemPath='/users/new'
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <UserList query={searchQuery} />
    </section>
  )
}

export default Users
