import type { NextPage } from 'next'
import Head from 'next/head'
import Login from '../components/login'
import Landing from '../components/landing'
import Layout from '../components/Layout'

const Home: NextPage = () => {
	return (
		<div>
			<Layout variant="Web">
				<Head>
					<title>Bodysign</title>
				</Head>
				<Login />
				<Landing />
			</Layout>
		</div>
	)
}

export default Home
