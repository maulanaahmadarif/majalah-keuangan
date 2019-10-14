import { createContext } from 'react'

export const Context = createContext(
  {
    context: {
      accessToken: null,
      setAccessToken: () => {},
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
      setShowShare: () => {},
      userSettings: {
        imageMode: 'show',
        readMode: 'normal',
        fontSizeMode: 'medium',
        lineHeightMode: 'medium'
      },
      setUserSettings: () => {},
      showSettingsModal: false,
      setShowSettingsModal: () => {}
    }
  }
)