import React from 'react'
import BottomBar from './organisms/BottomBar'

interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<div className="sm-max:w-screen sm:w-screen sm:mx-auto p-[2rem] mb-[6.3rem] font-IBM">
				{children}
			</div>
			<BottomBar />
		</>
	)
}

export default Layout
