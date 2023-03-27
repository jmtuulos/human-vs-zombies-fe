import { createContext, useContext, useState } from 'react'


const AppUserContext = createContext()

export const useAppUser = () => {
    return useContext(AppUserContext)
}

const AppUserProvider = ({ children }) => {

    const [appUser, setAppUser] = useState(null)

    const state = {
        appUser,
        setAppUser
    }

    return (
        <AppUserContext.Provider value={state}>
            {children}
        </AppUserContext.Provider>
    )
}

export default AppUserProvider
