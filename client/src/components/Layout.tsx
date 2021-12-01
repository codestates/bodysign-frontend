type WeborApp = 'Web' | 'App'

interface LayoutProps {
	children: React.ReactNode
	variant: WeborApp
}

const Layout = ({ children, variant = 'Web' }: LayoutProps) => {
	return (
		<div
			className={`flex-col justify-center border m-auto ${
				variant === 'Web' ? 'max-w-[450px]' : 'w-full'
			}`}>
			{children}
		</div>
	)
}

export default Layout
