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
  Dimensions,
  FlatList
} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

import { withContext } from '../../context/withContext'
import { fetchMagazine } from '../../api'
import { formatDate } from '../../utils/dates'
import { IMAGE_PROXY_URL } from '../../utils/constant'

const { width: viewportWidth } = Dimensions.get('window')

const styles = StyleSheet.create({
  editionWrapper: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 40
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

    this.inputRefs = {
      firstTextInput: null,
      favSport0: null
    }

    this.state = {
      isLoading: true,
      activeEdition: null,
      selectedYear: null
    }
  }

  getStyles () {
    const pickerSelectStyles = StyleSheet.create({
      inputIOS: {
        fontFamily: 'FiraSans-Regular',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: this.isDarkMode() ? '#FFF' : '#000',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        fontFamily: 'FiraSans-Regular',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        height: 50,
        color: this.isDarkMode() ? '#FFF' : '#000',
        width: 150,
        paddingRight: 30, // to ensure the text is never behind the icon
      },
    })
    return pickerSelectStyles
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
        if (res.status === 200) {
          // const activeEdition = res.years.sort((a, b) => b.HeaderEdition - a.HeaderEdition)[0]
          this.props.context.setMagazines(res.magazine)
          this.props.context.setEdition(res.years)
          // this.setState({ activeEdition: activeEdition.HeaderEdition })
          this.setState({
            activeEdition: res.years[0].HeaderEdition,
            selectedYear: res.years[0].HeaderEdition.toString(),
          })
        }
      })
      .catch((err) => {
        Alert.alert('Error', err.message)
        console.log(err)
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  isDarkMode = () => {
    return this.props.context.userSettings.readMode !== 'normal'
  }

  renderEdition = () => {
    if (this.props.context.edition.length > 0) {
      return this.props.context.edition
        .sort((a, b) => b.HeaderEdition - a.HeaderEdition)
        .map(year => (
          // TODO: WHEN CLICK, SCROLL TO MUST BE IMPLEMENT TO ENHANCE UX
          <TouchableOpacity activeOpacity={0.5} style={[styles.editionContainerStyle, year.HeaderEdition === this.state.activeEdition && styles.editionActiveStyle, this.isDarkMode() && { borderBottomColor: '#FFFFFF'}]} key={year.HeaderEdition} onPress={() => this.setState({ activeEdition: year.HeaderEdition })}>
            <Text style={[styles.editionStyle, this.isDarkMode() && { color: '#FFFFFF' }]}>{ year.HeaderEdition }</Text>
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

  getSortedMagazine = () => {
    const { activeEdition } = this.state
    if (this.props.context.magazines.length > 0) {
      return this.props.context.magazines
        .filter(magazine => magazine.edition_years === activeEdition)
        .sort((a, b) => {
          return new Date(b.edition) - new Date(a.edition)
        })
    }
  }

  // renderMagazine = () => {
  //   const { activeEdition } = this.state
  //   if (this.props.context.magazines.length > 0) {
  //     return this.props.context.magazines
  //       .filter(magazine => magazine.edition_years === activeEdition)
  //       .sort((a, b) => {
  //         return new Date(b.edition) - new Date(a.edition)
  //       })
  //       .map((mag) => {
  //         return (
  //           <TouchableOpacity activeOpacity={1} key={mag.id} style={[styles.magazineContainer]} onPress={() => this.props.navigation.navigate('Article', { id: mag.id, title: formatDate(mag.edition, 'MMMM YYYY') })}>
  //             <View style={{ marginBottom: 10 }}>
  //               <Text style={[styles.magazineText, { textTransform: 'uppercase' }, this.isDarkMode() && { color: '#FFFFFF' }]}>
  //                 { formatDate(mag.edition, 'MMMM YYYY') }
  //                 { '\n' }
  //                 <Text style={[styles.magazineText, { color: '#000' }, this.isDarkMode() && { color: '#FFFFFF' }]}>{ mag.edition_number }</Text>
  //               </Text>
  //             </View>
  //             <View>
  //               <Image source={{ uri: mag.cover_image }} style={[styles.imageStyle]} />
  //             </View>
  //             <View style={{ marginVertical: 15 }}>
  //               <Text style={[styles.magazineText, { color: '#000', fontWeight: 'bold' }, this.isDarkMode() && { color: '#FFFFFF' }]}>{ mag.title }</Text>
  //             </View>
  //             <View>
  //               <Text style={[styles.magazineText, this.isDarkMode() && { color: '#FFFFFF' }]}>{ this.generateExcerpt(mag.description, 8) }</Text>
  //             </View>
  //           </TouchableOpacity>
  //         )
  //       })
  //   }
  // }

  renderMagazine = (mag) => {
    return (
      <TouchableOpacity activeOpacity={1} style={[styles.magazineContainer]} onPress={() => this.props.navigation.navigate('Article', { id: mag.id, title: formatDate(mag.edition, 'MMMM YYYY') })}>
        <View style={{ marginBottom: 10 }}>
          <Text style={[styles.magazineText, { textTransform: 'uppercase' }, this.isDarkMode() && { color: '#FFFFFF' }]}>
            <Text style={[styles.magazineText, { color: '#000', fontFamily: 'FiraSans-Medium' }, this.isDarkMode() && { color: '#FFFFFF' }]}>{ mag.edition_number }</Text>
          </Text>
        </View>
        <View>
          <Image source={{ uri: IMAGE_PROXY_URL + mag.cover_image }} style={[styles.imageStyle]} />
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={[styles.magazineText, { color: '#000', fontFamily: 'FiraSans-Black' }, this.isDarkMode() && { color: '#FFFFFF' }]}>{ mag.title }</Text>
        </View>
        <View>
          <Text style={[styles.magazineText, { fontFamily: 'FiraSans-Regular' }, this.isDarkMode() && { color: '#FFFFFF' }]}>{ `${this.generateExcerpt(mag.description, 8)} ...` }</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderPickerItem () {
    if (this.props.context.edition.length > 0) {
      return this.props.context.edition
        .sort((a, b) => b.HeaderEdition - a.HeaderEdition)
        .map((year, index) => (
          { key: `edisi-${index}`, label: year.HeaderEdition.toString(), value: year.HeaderEdition.toString() }
        ))
    }
    return []
  }

  onSelectYearChange (value) {
    this.setState({
      selectedYear: value,
      activeEdition: parseInt(value, 10)
    })
  }

  render () {
    return (
      <ScrollView style={[ this.isDarkMode() && { backgroundColor: '#000000'} ]}>
        <Spinner
          visible={this.state.isLoading}
          overlayColor="rgba(0,0,0,0.7)"
          textStyle={{ color: '#fff' }}
        />
        {/* <ScrollView style={[styles.editionWrapper, this.isDarkMode() && { backgroundColor: '#000000', shadowColor: '#FFFFFF' }]} horizontal showsHorizontalScrollIndicator={false} >
          { this.renderEdition() }
        </ScrollView> */}
        <View style={{ paddingHorizontal: 15, paddingVertical: 15, alignItems: 'center' }}>
          <View><Text style={[{ fontFamily: 'FiraSans-Medium', fontSize: 18, textAlign: 'center' }, this.isDarkMode() ? { color: '#fff' } : { color: '#000' }]}>Pilih Tahun Edisi</Text></View>
          <View style={{ flex: 1 }}>
            <RNPickerSelect
              placeholder={{ label: 'Pilih Edisi', value: null }}
              items={this.renderPickerItem()}
              onValueChange={(itemValue) => this.onSelectYearChange(itemValue)}
              onUpArrow={() => {
                this.inputRefs.firstTextInput.focus();
              }}
              onDownArrow={() => {
                this.inputRefs.favSport0.togglePicker();
              }}
              style={this.getStyles()}
              value={this.state.selectedYear}
              ref={el => {
                this.inputRefs.favSport0 = el;
              }}
            />
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          { this.props.context.magazines.length !== 0 && (
            <FlatList
              horizontal
              extraData={this.props.context.userSettings.readMode}
              removeClippedSubviews
              data={this.getSortedMagazine()}
              keyExtractor={(item) => `id-${item.id}`}
              renderItem={({ item }) => this.renderMagazine(item)}
            />
          ) }
          {/* { this.renderMagazine() } */}
        </ScrollView>
      </ScrollView>
    )
  }
}

export default withContext(Magazine)