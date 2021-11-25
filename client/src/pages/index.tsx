import type { NextPage } from 'next'
import Head from 'next/head'
import Inbody from '../components/menu/inbody'

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Trainers</title>
				<meta name="description" content="Generated by create next app" />
			</Head>

			<main className="flex justify-center">
				<div className="max-w-[800px] border p-2 w-full">Home</div>
			</main>
			<footer></footer>
		</div>
	)
}

export default Home
