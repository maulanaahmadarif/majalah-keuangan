import React, { Component } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HTML from 'react-native-render-html'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList
} from 'react-native'

import Container from '../../components/layout/Container'
import { withContext } from '../../context/withContext'
import { fetchArticles } from '../../api'
import { IMAGE_PROXY_URL } from '../../utils/constant'
import Database from '../../Database'

const { width: viewportWidth } = Dimensions.get('window')

const db = new Database()

const styles = StyleSheet.create({
  inputSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    position: 'relative',
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4
  },
  inputSearchIcon: {
    paddingVertical: 7,
    position: 'absolute',
    right: 15
  },
  inputField: {
    flex: 1,
    borderColor: '#000',
    alignItems: 'stretch',
    color: '#000',
    height: 40,
    textAlignVertical: 'top',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 40,
    backgroundColor: 'rgba(255,255,255,.7)',
    borderRadius: 5
  },
  bannerImage: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    width: viewportWidth,
    height: 250,
    resizeMode: 'cover'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1
  },
  bannerText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  categoryContainer: {
    width: viewportWidth * 0.6,
    marginRight: 15
  },
  categoryImage: {
    width: viewportWidth * 0.6,
    height: 150
  },
  categoryText: {
    color: '#000000'
  }
})
class Article extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      articles: null,
      searchText: '',
      searchResults: [],
      bookmarkItems: []
    }
  }

  isBookMarked (id) {
    const data = this.state.bookmarkItems
    let bookmarked = false
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        bookmarked = true
        break
      }
    }
    return bookmarked
  }

  onArticleBookmarkPress (article) {
    const data = {
      id: article.id,
      title: article.title,
      main_image: article.main_image,
      author: article.author,
      content: JSON.stringify(article.content),
      isLoved: this.isBookMarked(article.id) ? 'no' : 'yes'
    }
    db.updateMagazine(data)
      .then((res) => {
        this.refresh()
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  refresh = () => {
    db.listFavoriteMagazine('yes')
      .then((data) => {
        this.setState({
          bookmarkItems: data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount () {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.refresh()
    })
    const { id } = this.props.navigation.state.params
    fetchArticles(id)
      .then((res) => {
        this.props.context.setArticles(res.magazine[0])
        this.setState({
          articles: res.magazine[0]
        })
      })
      .catch((err) => {
        Alert.alert('Error', err)
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  componentWillUnmount () {
    this.setState({
      searchText: '',
      searchResults: []
    })
  }

  renderBanner () {
    if (this.state.articles !== null) {
      const { title, description, cover_image } = this.state.articles
      return (
        <View>
          <ImageBackground source={{ uri: IMAGE_PROXY_URL + cover_image }} style={styles.bannerImage}>
            <View style={{ zIndex: 2, position: 'relative', paddingHorizontal: 15 }}>
              <Text style={[styles.bannerText, { marginBottom: 15, fontSize: 20, fontFamily: 'FiraSans-Black', textTransform: 'uppercase' }]}>{ title }</Text>
              <Text style={[styles.bannerText, { fontFamily: 'FiraSans-Regular' }]}>{ description }</Text>
            </View>
            <View style={styles.overlay} />
          </ImageBackground>
        </View>
      )
    }
  }

  // renderCategory (category) {
  //   return category.map((cat, index) => {
  //     return (
  //       <TouchableOpacity activeOpacity={1} key={cat.id} style={[styles.categoryContainer]} onPress={() => this.onClickCategory(category, cat, index)}>
  //         { cat.main_image ? (
  //             <Image resizeMode='cover' source={{ uri: `http://mediakeuangan.kemenkeu.go.id/Images/article/${cat.main_image}` }} style={[styles.categoryImage]} />
  //           ) : (
  //             <Image resizeMode='cover' source={require('../../assets/images/logo.png')} style={[styles.categoryImage]} />
  //         ) }
  //         <Text style={[styles.categoryText, { fontSize: 18, marginVertical: 10 }, this.isDarkMode() && { color: '#FFFFFF'}]}>{ cat.title }</Text>
  //         <Text style={[styles.categoryText, { fontSize: 14 }, this.isDarkMode() && { color: '#aaaaaa' }]}>Author</Text>
  //         <Text style={[styles.categoryText, this.isDarkMode() && { color: '#FFFFFF'}]}>{ cat.author }</Text>
  //       </TouchableOpacity>
  //     )
  //   })
  // }


  // renderArticles (items) {
  //   return items.map((sec) => {
  //     return (
  //       <View key={sec.id} style={{ marginBottom: 20 }} ref={`section-${sec.id}`}>
  //         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
  //           <View style={[{ width: 15, height: 15, backgroundColor: '#000000', marginRight: 15}, this.isDarkMode() && { backgroundColor: '#FFFFFF'}]}></View>
  //           <Text style={[{ color: '#000000', fontSize: 18 }, this.isDarkMode() && { color: '#FFFFFF'}]}>{ sec.title }</Text>
  //         </View>
  //         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  //           { this.renderCategory(sec.article) }
  //         </ScrollView>
  //       </View>
  //     )
  //   })
  // }

  generateExcerpt = (text, maxWord) => {
    const textArr = text.split(' ')
    if (maxWord > textArr.length) {
      maxWord = textArr.length
    }
    const excerpt = []
    for (let i = 0; i < maxWord; i++) {
      excerpt.push(textArr[i])
    }
    return excerpt.join(' ')
  }

  removeHTMLTag (htmlContent) {
    const regex = /(<([^>]+)>)/ig;
    return htmlContent.replace(regex, '');
  }

  getExcerptCategory (content) {
    let text = ''
    for (let i = 0;i < content.length; i++) {
      if (content[i].type === 'paragraph') {
        text = `${this.generateExcerpt(this.removeHTMLTag(content[i].body), 15)} ...`
        break
      }
    }
    return text
  }

  renderCategory (cat, index, category) {
    return (
      <TouchableOpacity activeOpacity={1} key={cat.id} style={[styles.categoryContainer]} onPress={() => this.onClickCategory(category, cat, index)}>
        <View>
          <View>
            { cat.main_image ? (
                <Image resizeMode='cover' source={{ uri: `${IMAGE_PROXY_URL}https://mediakeuangan.kemenkeu.go.id/Images/article/${cat.main_image}` }} style={[styles.categoryImage]} />
              ) : (
                <Image resizeMode='cover' source={require('../../assets/images/logo.png')} style={[styles.categoryImage]} />
            ) }
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: '85%', paddingRight: 15 }}>
              <Text style={[styles.categoryText, { fontSize: 18, marginVertical: 10, fontFamily: 'FiraSans-Regular' }, this.isDarkMode() && { color: '#FFFFFF'}]}>{ cat.title }</Text>
            </View>
            <View style={{ width: '15%', marginTop: 10 }}>
              { this.isDarkMode() ? (
                <Ionicons onPress={() => this.onArticleBookmarkPress(cat)} style={[styles.inputSearchIcon]} name="ios-bookmark" size={25} color={ this.isBookMarked(cat.id) ? '#ffffff' : 'rgba(255,255,255,.3)' } />
              ) : (
                <Ionicons onPress={() => this.onArticleBookmarkPress(cat)} style={[styles.inputSearchIcon]} name="ios-bookmark" size={25} color={ this.isBookMarked(cat.id) ? '#000000' : 'rgba(0,0,0,.3)' } />
              ) }
            </View>
          </View>
          <View>
            <View style={{ marginBottom: 10 }}>
              <Text style={[styles.categoryText, { fontFamily: 'FiraSans-Regular' }, this.isDarkMode() && { color: '#FFFFFF'}]}>{ this.getExcerptCategory(cat.content) }</Text>
            </View>
            { cat.author ? (
              <View>
                <Text style={[styles.categoryText, { fontSize: 14, fontFamily: 'FiraSans-Regular' }, this.isDarkMode() && { color: '#aaaaaa'}]}>Author</Text>
                <Text style={[styles.categoryText, { fontFamily: 'FiraSans-Regular' }, this.isDarkMode() && { color: '#FFFFFF'}]}>{ cat.author }</Text>
              </View>
            ) : null }
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  renderArticles (data) {
    return (
      <View style={{ marginBottom: 20 }} ref={`section-${data.id}`}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <View style={[{ width: 15, height: 15, backgroundColor: '#000000', marginRight: 15}, this.isDarkMode() && { backgroundColor: '#FFFFFF'}]}></View>
          <Text style={[{ color: '#000000', fontSize: 18, fontFamily: 'FiraSans-Regular' }, this.isDarkMode() && { color: '#FFFFFF'}]}>{ data.title }</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={data.article}
            horizontal
            // extraData={this.props.context.userSettings.readMode}
            extraData={this.state.bookmarkItems}
            removeClippedSubviews
            keyExtractor={(item) => `id-${item.id}`}
            renderItem={({ item, index }) => this.renderCategory(item, index, data.article)}
          />
        </ScrollView>
      </View>
    )
  }

  onClickCategory = (category, cat, index) => {
    this.props.context.setCategory(category)
    this.props.context.setCurrentCategory(index)
    this.props.navigation.navigate('Category', { id: cat.id, index, title: cat.title, totalCategory: category.length })
  }

  isDarkMode = () => {
    return this.props.context.userSettings.readMode !== 'normal'
  }

  onSearch = () => {
    const { section } = this.state.articles
    const searchResults = []
    for (let i = 0; i < section.length; i++) {
      const sec = section[i]
      const articles = []
      for (let j = 0; j < section[i].article.length; j++) {
        if (section[i].article[j].title.toLowerCase().includes(this.state.searchText.toLowerCase())) {
          articles.push(section[i].article[j])
        }
      }
      if (articles.length !== 0) {
        searchResults.push({
          id: sec.id,
          title: sec.title,
          description: sec.description,
          article: articles
        })
      }
    }
    if (searchResults.length === 0) {
      Alert.alert('Info', `Tidak ditemukan kata kunci ${this.state.searchText}`)
    } else {
      this.setState({
        searchResults
      })
    }
  }

  renderArticlesAndSearch = () => {
    const { articles, searchResults } = this.state
    if (this.state.searchResults.length !== 0) {

      // return this.renderArticles(searchResults)
      return <FlatList
        data={searchResults}
        extraData={this.state.bookmarkItems}
        removeClippedSubviews
        keyExtractor={(item) => `id-${item.id}`}
        renderItem={({ item }) => this.renderArticles(item)}
      />
    } else if (articles !== null) {
      // return this.renderArticles(articles.section)
      return <FlatList
        data={articles.section}
        extraData={this.state.bookmarkItems}
        removeClippedSubviews
        keyExtractor={(item) => `id-${item.id}`}
        renderItem={({ item }) => this.renderArticles(item)}
      />
    }
  }

  render () {
    return (
      <ScrollView stickyHeaderIndices={[1]} ref="scrollContainer" style={[ this.isDarkMode() && { backgroundColor: '#000000'} ]} >
        <Spinner
          visible={this.state.isLoading}
          overlayColor="rgba(0,0,0,0.7)"
          textStyle={{ color: '#fff' }}
        />
        <View style={[styles.inputSearchContainer, this.isDarkMode() && { backgroundColor: '#000000'}]} >
          <TextInput
            style={[styles.inputField, { fontFamily: 'FiraSans-Regular' }, this.isDarkMode() && { borderColor: '#aaaaaa', backgroundColor: '#FFFFFF' }]}
            onChangeText={(searchText) => this.setState({ searchText })}
            value={this.state.searchText}
            placeholder='Cari Artikel'
            multiline={false}
            onSubmitEditing={this.onSearch}
          />
          <Ionicons style={[styles.inputSearchIcon]} name="ios-search" size={25} color="#000000" />
        </View>
        { this.renderBanner() }
        <View style={{ marginTop: 15 }}>
          <Container>
            { this.renderArticlesAndSearch() }
          </Container>
        </View>
      </ScrollView>
    )
  }
}

export default withContext(Article)