import { createContext } from 'react'

const MainContext = createContext({
    loggedIn: false,
    setLoggedIn: () => {},
    userInfo: {},
    setUserInfo: () => {}
})

export default MainContext
