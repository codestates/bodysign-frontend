import Image from 'next/image'
import logo from '../../../public/logo.svg'

interface LogoProps {}

const Logo = () => {
	return <Image src={logo} width="50" height="50" alt="logo" />
}

export default Logo
