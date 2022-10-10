import type { NextPage } from 'next'
import Head from 'next/head'

import Layout from '@components/Layout/Layout'
import { trpc } from '@utils/trpc'
import StudentHome from '@modules/student/StudentHome'

const Home: NextPage = () => {
  const { data: role } = trpc.useQuery(['user.getCurrentRole'])

  if (role === 'basic') {
    return <StudentHome />
  }

  if (role === 'admin' || role === 'supervisor') {
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

  return null
}

export default Home
