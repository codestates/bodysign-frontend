import type { NextPage } from 'next'
import Head from 'next/head'
import Landing from '../components/Landing'
import Login from '../components/Login'

const Home: NextPage = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<Head>
				<title>Bodysign</title>
			</Head>
			<Login />
			<Landing />
		</div>
	)
}

export default Home
