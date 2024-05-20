import Personal from '@components/Personal/Personal'
import Head from 'next/head'

function Dashboard() {
  return (
    <div>
      <Head>
        <title>Личный кабинет</title>
        <meta
          name="robots"
          content="nofollow, noindex"
        />
      </Head>
      <Personal />
    </div>
  )
}

export default Dashboard
