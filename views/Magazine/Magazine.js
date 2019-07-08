import React, { Component } from 'react'
import firebase from 'react-native-firebase'
import Spinner from 'react-native-loading-spinner-overlay'
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native'

import { withContext } from '../../context/withContext'
import { fetchMagazine } from '../../api'
import { formatDate } from '../../utils/dates'

const { width: viewportWidth } = Dimensions.get('window')

const styles = StyleSheet.create({
  editionWrapper: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4
  },
  editionContainerStyle: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 30
  },
  editionStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000'
  },
  editionActiveStyle: {
    borderBottomWidth: 4,
    borderBottomColor: 'rgb(2, 46, 91)'
  },
  magazineContainer: {
    marginTop: 15,
    width: viewportWidth * 0.7,
    alignItems: 'center',
    marginLeft: 20
  },
  magazineText: {
    textAlign: 'center',
    fontSize: 20
  },
  imageStyle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    width: 200,
    height: 254
  }
})

class Magazine extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true,
      activeEdition: null
    }
  }

  componentDidMount () {
    // firebase
    //   .messaging()
    //   .getToken()
    //   .then((token) => {
    //     console.log('token: ', token)
    //   })
    fetchMagazine()
      .then((res) => {
        const activeEdition = res.years.sort((a, b) => b.HeaderEdition - a.HeaderEdition)[0]
        this.props.context.setMagazines(res.magazine)
        this.props.context.setEdition(res.years)
        this.setState({ activeEdition: activeEdition.HeaderEdition })
      })
      .catch((err) => {
        Alert.alert('Error', err)
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  renderEdition = () => {
    if (this.props.context.edition.length > 0) {
      return this.props.context.edition
        .sort((a, b) => b.HeaderEdition - a.HeaderEdition)
        .map(year => (
          // TODO: WHEN CLICK, SCROLL TO MUST BE IMPLEMENT TO ENHANCE UX
          <TouchableOpacity activeOpacity={0.5} style={[styles.editionContainerStyle, year.HeaderEdition === this.state.activeEdition && styles.editionActiveStyle]} key={year.HeaderEdition} onPress={() => this.setState({ activeEdition: year.HeaderEdition })}>
            <Text style={[styles.editionStyle]}>{ year.HeaderEdition }</Text>
          </TouchableOpacity>
        ))
    } 
  }

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

  renderMagazine = () => {
    const { activeEdition } = this.state
    if (this.props.context.magazines.length > 0) {
      return this.props.context.magazines
        .filter(magazine => magazine.edition_years === activeEdition)
        .map((mag) => {
          return (
            <View key={mag.id} style={[styles.magazineContainer]}>
              <View style={{ marginBottom: 10 }}>
                <Text style={[styles.magazineText, { textTransform: 'uppercase' }]}>
                  { formatDate(mag.edition, 'MMMM YYYY') }
                  { '\n' }
                  <Text style={[styles.magazineText, { color: '#000' }]}>{ mag.edition_number }</Text>
                </Text>
              </View>
              <View>
                <Image source={{ uri: mag.cover_image }} style={[styles.imageStyle]} />
              </View>
              <View style={{ marginVertical: 15 }}>
                <Text style={[styles.magazineText, { color: '#000', fontWeight: 'bold' }]}>{ mag.title }</Text>
              </View>
              <View>
                <Text style={[styles.magazineText]}>{ this.generateExcerpt(mag.description, 8) }</Text>
              </View>
            </View>
          )
        })
    }
  }

  render () {
    return (
      <ScrollView stickyHeaderIndices={[1]} >
        <Spinner
          visible={this.state.isLoading}
          overlayColor="rgba(0,0,0,0.7)"
          textStyle={{ color: '#fff' }}
        />
        <ScrollView style={[styles.editionWrapper]} horizontal showsHorizontalScrollIndicator={false}>
          { this.renderEdition() }
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          { this.renderMagazine() }
        </ScrollView>
      </ScrollView>
    )
  }
}

export default withContext(Magazine)