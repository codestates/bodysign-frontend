interface LayoutProps {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="font-IBM flex flex-col justify-center sm:w-[450px] sm:mx-auto">
			<div className="sm-max:w-screen layout p-[2rem]">{children}</div>
		</div>
	)
}

export default Layout
