import UserProvider from "./UserContext"
import AppUserProvider from "./AppUserContext"

const AppContext = ({ children }) => {

	return (
		<AppUserProvider>
			<UserProvider>
				{children}
			</UserProvider>
		</AppUserProvider>
	)
}

export default AppContext
