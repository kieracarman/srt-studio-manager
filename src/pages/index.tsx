import type { NextPage } from 'next'
import Head from 'next/head'

import { Layout } from '@components/ui'
import { api } from '@utils/api'
import StudentHome from '@modules/student/StudentHome'

const Home: NextPage = () => {
  const { data: role } = api.user.getCurrentRole.useQuery()

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
          <div className='mt-32 flex items-center justify-center'>
            <div className='rounded-xl border-4 border-dashed border-gray-200 p-8'>
              <h2 className='mb-4 text-lg font-semibold'>Empty Dashboard</h2>
              <p>Nothing to see here!</p>
            </div>
          </div>
        </Layout>
      </>
    )
  }

  return null
}

export default Home
