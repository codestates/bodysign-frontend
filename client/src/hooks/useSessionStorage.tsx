import { useEffect, useState } from 'react'

const useSessionStorage = (key: string, initialState?: any) => {
	const [state, setState] = useState<any>(() =>
		JSON.parse(
			typeof window !== 'undefined'
				? (window.sessionStorage.getItem(key) as string)
				: '' || initialState
		)
	)

	useEffect(() => {
		window.sessionStorage.setItem(key, JSON.stringify(state))
	}, [key, state])
	return [state, setState]
}

export default useSessionStorage
