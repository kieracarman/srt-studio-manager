import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data } = useSession()

  console.log('sesh?', data)

  return (
    <>
      <Head>
        <title>SRT Studio Manager</title>
        <meta name='description' content='SRT Studio Manager' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>Dashboard</h1>
    </>
  )
}

export default Home
