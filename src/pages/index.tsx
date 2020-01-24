import { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import { NextContextWithApollo } from '../interfaces/NextContextWithApollo'

import JOBS_QUERY from '../graphql/jobs.query'

type Job = { id: string; title: string }

interface Props {
  data: {
    jobs: Job[]
  }
}

const Home: NextPage<Props> = ({ data }) => (
  <div>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <ul>
      {data.jobs.map((job: Job) => {
        return <li key={`job__${job.id}`}>{job.title}</li>
      })}
    </ul>
  </div>
)

Home.getInitialProps = async ({ apolloClient }: NextContextWithApollo) => {
  const { data } = await apolloClient.query({ query: JOBS_QUERY })

  return { data }
}

export default Home
