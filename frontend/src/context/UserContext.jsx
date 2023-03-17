import { createContext, useContext, useState } from 'react'


const UserContext = createContext()

export const useUser = () => {
	return useContext(UserContext)
}

const UserProvider = ({ children }) => {

	const [user, setUser] = useState('user')

	const state = {
		user,
		setUser
	}

	return (
		<UserContext.Provider value={ state }>
			{ children }
		</UserContext.Provider>
	)
}

export default UserProvider
