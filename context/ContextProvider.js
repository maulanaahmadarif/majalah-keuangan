import React, { Component } from 'react'
import { Context } from './Context'

export default class ContextProvider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null,
      setUser: this.setUser,
      magazines: [],
      setMagazines: this.setMagazines,
      edition: [],
      setEdition: this.setEdition,
      articles: null,
      setArticles: this.setArticles,
      currentCategory: null,
      setCurrentCategory: this.setCurrentCategory,
      category: null,
      setCategory: this.setCategory,
      showShare: false,
      setShowShare: this.setShowShare
    }
  }

  setUser = (user) => {
    this.setState({ user })
  }

  setMagazines = (magazines) => {
    this.setState({ magazines })
  }

  setEdition = (edition) => {
    this.setState({ edition })
  }

  setArticles = (articles) => {
    this.setState({ articles })
  }

  setCurrentCategory = (index) => {
    this.setState({ currentCategory: index })
  }

  setCategory = (category) => {
    this.setState({ category })
  }

  setShowShare = (value) => {
    this.setState({ showShare: value })
  }

  render () {
    return (
      <Context.Provider value={{
        context: {
          ...this.state
        }
      }}>
        { this.props.children }
      </Context.Provider>
    )
  }
}