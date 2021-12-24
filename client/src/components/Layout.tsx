import { useQuery } from '@apollo/client'
import { UserDocument } from '../graphql/graphql'

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	// const { loading, data } = useQuery(UserDocument, {
	// 	variables: { id: 1 }
	// })
	console.log(111)

	return (
		<div className="font-IBM flex flex-col justify-center sm:w-[450px] sm:mx-auto">
			<div className="sm-max:w-screen h-screen layout p-[2rem]">
				{children}
			</div>
		</div>
	)
}

export default Layout
