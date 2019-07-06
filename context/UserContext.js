import { createContext } from 'react'

export const UserContext = createContext(
  {
    userContext: {
      user: null,
      setUser: () => {}
    }
  }
)