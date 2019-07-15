import React, { Component } from 'react'
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import step1 from '../../assets/images/step-1.jpeg'
import step2 from '../../assets/images/step-2.jpeg'
import step3 from '../../assets/images/step-3.jpeg'
import step4 from '../../assets/images/step-4.jpeg'
import step5 from '../../assets/images/step-5.jpeg'

const IconComponent = Ionicons;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

// NEED REWORK
const ENTRIES = [
  {
    image: step1
  },
  {
    image: step2
  },
  {
    image: step3
  },
  {
    image: step4
  },
  {
    image: step5
  }
]

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  imageStyle: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  textStyle: {
    color: '#fff',
    fontWeight: '700'
  },
  textContainerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'rgb(113, 114, 116)'
  },
  paginationStyle: {
    position: 'absolute',
    top: (viewportHeight / 2  - 80 ),
    zIndex: 1
  }
})

const ACTIVE_SLIDE = 0

class Guide extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeSlider: ACTIVE_SLIDE
    }
  }

  renderItem = ({ item }, parallaxProps) => {
    return (
      <View style={{ width: (viewportWidth), height: (viewportHeight * 0.8), paddingHorizontal: 8 }}>
        <View style={styles.imageContainer}>
          <ParallaxImage
            source={item.image}
            containerStyle={styles.imageContainer}
            style={styles.imageStyle}
            parallaxFactor={0.35}
            showSpinner={true}
            spinnerColor="rgb(0, 0, 0)"
            {...parallaxProps}
          />
        </View>
      </View>
    )
  }

  render () {
    return (
      <ScrollView>
        <View>
          <Carousel
            ref={(c) => this._slider1Ref = c}
            data={ENTRIES}
            renderItem={this.renderItem}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            hasParallaxImages={true}
            firstItem={ACTIVE_SLIDE}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            // inactiveSlideShift={20}
            containerCustomStyle={{ overflow: 'visible' }}
            contentContainerCustomStyle={{ paddingVertical: 10 }}
            loop={false}
            loopClonesPerSide={2}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => this.setState({ activeSlider: index }) }
          />
          <TouchableOpacity style={[styles.paginationStyle, { left: 10 }]} onPress={() => this._slider1Ref.snapToPrev()} >
            <IconComponent name="ios-arrow-back" size={25} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.paginationStyle, { right: 10 }]} onPress={() => this._slider1Ref.snapToNext()}>
            <IconComponent name="ios-arrow-forward" size={25} color="#000000" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.textContainerStyle, { flex: 2 }]}>
            <Text style={[styles.textStyle, { fontSize: 20 }]}>Info { this.state.activeSlider + 1 } dari { ENTRIES.length }</Text>
          </View>
          <TouchableOpacity activeOpacity={1} style={[styles.textContainerStyle, { flex: 1, borderLeftWidth: 1, borderLeftColor: '#000000' }]} onPress={() => this.props.navigation.goBack()}>
            <Text style={[styles.textStyle, { textAlign: 'center' }]}>Lewati</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default Guide