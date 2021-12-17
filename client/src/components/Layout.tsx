interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="font-IBM flex flex-col justify-center sm:w-[450px] sm:mx-auto">
			<div className="h-screen sm-max:w-screen">{children}</div>
		</div>
	)
}

export default Layout
