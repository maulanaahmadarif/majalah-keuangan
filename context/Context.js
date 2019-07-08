import { createContext } from 'react'

export const Context = createContext(
  {
    context: {
      user: null,
      setUser: () => {},
      magazines: [],
      setMagazines: () => {},
      edition: [],
      setEdition: () => {}
    }
  }
)