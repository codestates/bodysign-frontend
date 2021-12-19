import { useEffect, useState } from 'react'

export function useGetScroll() {
	const [scrollY, setScrollY] = useState(0)

	const listener = () => {
		setScrollY(window.scrollY)
	}

	useEffect(() => {
		window.addEventListener('scroll', listener)
		return () => window.addEventListener('scroll', listener)
	})

	return { scrollY }
}
