import type { NextPage } from 'next'
import Head from 'next/head'
import Landing from '../components/Landing'
import Login from '../components/Login'
import logo from '../../public/logo3.svg'

const Home: NextPage = () => {
	return (
		<div className="flex flex-col items-center justify-center box-border m-0 p-0">
			<Head>
				<title>Bodysign</title>
			</Head>
			<div className="flex">
				<img src={logo} alt="image" width="50rem" height="50rem" />
				<div className="text-[3.2rem] text-left font-bold text-[#FDAD00] my-[3rem] mx-[1.5rem]">Bodysign</div>
			</div>
			<Login />
			<Landing />
		</div>
	)
}

export default Home
