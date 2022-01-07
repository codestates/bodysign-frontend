import { useEffect, useState } from 'react'

const useSessionStorage = (key: string, initialState?: any) => {
	const [state, setState] = useState(
		() =>
			JSON.parse(window.sessionStorage.getItem(key) as string) ||
			initialState
	)

	useEffect(() => {
		window.sessionStorage.setItem(key, JSON.stringify(state))
	}, [key, state])
	return [state, setState]
}

export default useSessionStorage
