import { createContext } from 'react'

export const Context = createContext(
  {
    context: {
      user: null,
      setUser: () => {},
      magazines: [],
      setMagazines: () => {},
      edition: [],
      setEdition: () => {},
      articles: null,
      setArticles: () => {},
      category: null,
      setCategory: () => {},
      currentCategory: null,
      setCurrentCategory: () => {},
      showShare: false,
      setShowShare: () => {}
    }
  }
)