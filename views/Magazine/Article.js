import React, { Component } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import Ionicons from 'react-native-vector-icons/Ionicons'
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
  TouchableOpacity
} from 'react-native'

import Container from '../../components/layout/Container'
import { withContext } from '../../context/withContext'
import { fetchArticles } from '../../api'

const { width: viewportWidth } = Dimensions.get('window')

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
    paddingVertical: 10,
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
      isLoading: true
    }
  }

  componentDidMount () {
    const { id } = this.props.navigation.state.params
    fetchArticles(id)
      .then((res) => {
        this.props.context.setArticles(res.magazine[0])
      })
      .catch((err) => {
        Alert.alert('Error', err)
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  renderBanner () {
    if (this.props.context.articles !== null) {
      const { title, description, cover_image } = this.props.context.articles
      return (
        <View>
          <ImageBackground source={{ uri: cover_image }} style={styles.bannerImage}>
            <View style={{ zIndex: 2, position: 'relative', paddingHorizontal: 15 }}>
              <Text style={[styles.bannerText, { marginBottom: 15, fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase' }]}>{ title }</Text>
              <Text style={[styles.bannerText]}>{ description }</Text>
            </View>
            <View style={styles.overlay} />
          </ImageBackground>
        </View>
      )
    }
  }

  renderCategory (category) {
    return category.map((cat, index) => {
      return (
        <TouchableOpacity activeOpacity={1} key={cat.id} style={[styles.categoryContainer]} onPress={() => this.onClickCategory(category, cat, index)}>
          { cat.main_image ? (
            <Image resizeMode='cover' source={{ uri: `http://mediakeuangan.kemenkeu.go.id/Images/article/${cat.main_image}` }} style={[styles.categoryImage]} />
          ) : (
            <Image resizeMode='cover' source={require('../../assets/images/logo.png')} style={[styles.categoryImage]} />
          )}
          <Text style={[styles.categoryText, { fontSize: 18, marginVertical: 10 }]}>{ cat.title }</Text>
          <Text style={[styles.categoryText]}>{ cat.author }</Text>
        </TouchableOpacity>
      )
    })
  }

  renderArticles () {
    if (this.props.context.articles !== null) {
      const { section } = this.props.context.articles
      return section.map((sec) => {
        return (
          <View key={sec.id} style={{ marginBottom: 20 }} ref={`section-${sec.id}`}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <View style={{ width: 15, height: 15, backgroundColor: '#000000', marginRight: 15 }}></View>
              <Text style={{ color: '#000000', fontSize: 18 }}>{ sec.title }</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              { this.renderCategory(sec.article) }
            </ScrollView>
          </View>
        )
      })
    }
  }

  onClickCategory = (category, cat, index) => {
    this.props.context.setCategory(category)
    this.props.navigation.navigate('Category', { id: cat.id, index, title: cat.title, totalCategory: category.length })
  }

  render () {
    return (
      <ScrollView stickyHeaderIndices={[1]} ref="scrollContainer">
        <Spinner
          visible={this.state.isLoading}
          overlayColor="rgba(0,0,0,0.7)"
          textStyle={{ color: '#fff' }}
        />
        <View style={styles.inputSearchContainer} >
          <TextInput
            style={styles.inputField}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='Cari Artikel'
            multiline={false}
          />
          <Ionicons style={styles.inputSearchIcon} name="ios-search" size={25} color="#000000" />
        </View>
        { this.renderBanner() }
        <View style={{ marginTop: 15 }}>
          <Container>
            { this.renderArticles() }
          </Container>
        </View>
      </ScrollView>
    )
  }
}

export default withContext(Article)