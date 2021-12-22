import type { NextPage } from 'next'
import Head from 'next/head'
import Login from '../components/Login'
import Landing from '../components/Landing'
import Layout from '../components/Layout'

const Home: NextPage = () => {
	return (
		<div className='flex flex-col items-center justify-center'>
			{/* <Layout> */}
				<Head>
					<title>Bodysign</title>
				</Head>
				<Login />
				<Landing />
			{/* </Layout> */}
		</div>
	)
}

export default Home
