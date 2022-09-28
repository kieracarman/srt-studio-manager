import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession } from 'next-auth/react'

import Layout from '@components/Layout/Layout'

const Home: NextPage = () => {
  const { status } = useSession({
    required: true
  })

  if (status === 'authenticated') {
    return (
      <>
        <Head>
          <title>SRT Studio Manager</title>
          <meta name='description' content='SRT Studio Manager' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Layout>
          <h1>Dashboard</h1>
        </Layout>
      </>
    )
  }

  return <p>Loading...</p>
}

export default Home
