import Image from 'next/image'

interface AvatarProps {
	gender: string
}

const Avatar = ({ gender }: AvatarProps) => {
	if (gender === 'male') {
		return <Image src="/man.png" width="36" height="30" alt="image" />
	} else if (gender === 'female') {
		return <Image src="/woman.png" width="36" height="30" alt="image" />
	}
	return null
}

export default Avatar
