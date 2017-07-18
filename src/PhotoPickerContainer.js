// @flow
'use-strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  BackHandler,
  Platform,
} from 'react-native'
import { TopBar } from './TopBar'
import PresentationContext from './PresentationContext'
import PhotoPicker from './PhotoPicker'

const BACK_PRESS_EVENT: string = 'hardwareBackPress'

class PhotoPickerContainer extends Component {

  state: {
    pickerState: ('closed' | 'opened' | 'animating'),
    translationAnimated: Object,
  }

  constructor(props) {
    super(props)
    this.state = {
      pickerState: 'closed',
      translationAnimated: new Animated.Value(0),
    }
  }
  componentDidMount() {
    BackHandler.addEventListener(BACK_PRESS_EVENT, this._backEventHandler)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(BACK_PRESS_EVENT);
  }

  _backEventHandler = (): boolean => {
    const { dismissOnHardwareBackPress } = this.props;
    const { pickerState } = this.state;
    if (dismissOnHardwareBackPress && pickerState === 'opened') {
      this.dismiss()
      return true
    }
    return false
  }

  _togglePicker = (flag: number, callback?: Function = () => {}) => {
    const pickerState: string = flag === 0 ? 'animating' : 'opened'
    const toValue: number = flag
    this.setState({
      pickerState
    }, () => {
      Animated.timing(
        this.state.translationAnimated,
        {
          toValue,
          duration: this.props.animation.duration,
        }).start((completion: { finished: boolean }) => {
          if (!completion.finished) {
            const rollBack = flag === 0 ? 1 : 0
            this.state.translationAnimated.setValue(rollBack)
          }
          if (pickerState === 'animating') {
            this.setState({
              pickerState: 'closed'
            })
          }
        });
    });
  }

  _renderPickerTopBar = () => {
    return (
      <TopBar
        {...this.props}
        onClose={() => {this.dismiss()}}
        onDone={() => {this.dismiss()}}
      />
    )
  }

  show() {
    const { willShowCallback } = this.props
    this._togglePicker(1, willShowCallback)
  }

  dismiss() {
    const { willDismissCallback } = this.props
    this._togglePicker(0, willDismissCallback)
  }

  _dimissMyself = () => {
    const { willDismissCallback } = this.props
    this._togglePicker(0, willDismissCallback)
  }

  render() {
    const { tintColor, presentationContextStyle, contentContainerStyle, animation, action, onFinish } = this.props
    const { contextColor, contextOpacity, contextWidth, contextHeight } = presentationContextStyle
    const { width, height } = contentContainerStyle.size
    const { duration } = animation
    const { contextOnPress } = action
    const { translationAnimated, pickerState } = this.state
    const screenHeight: number = Dimensions.get('window').height
    const hidden = pickerState === 'closed' ? styles.hidden : null

    const topMargin = contextHeight - height
    const yPosition = translationAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [screenHeight, topMargin],
        extrapolate: 'clamp'
    })
    return(
      <View style={[styles.container, hidden]}>
        <PresentationContext
          { ...this.props }
          presentationContextStyle={{ ...defaultPresentationContextStyle, ...presentationContextStyle }}
          showContext={pickerState === 'opened'}
          onDismissByTouchingContext={this._dimissMyself}
        />
        <Animated.View style={{ transform: [{ translateY: yPosition }] }} >
          <View style={{ width, height }} >
            {this._renderPickerTopBar()}
            <PhotoPicker
              tintColor='blue'
              outputImageAspectRatio={null}
              allowCameraCapture={true}
              maxSelection={1}
              {...this.props}
              onResultCallback={(photos: Array<string>) => {
                //console.log('you need to pass in result callback')
                onFinish(photos)
                this._dimissMyself()
              }}
            />
          </View>
        </Animated.View>
      </View>
    )
  }
}
PhotoPickerContainer.propTypes = {
  tintColor: PropTypes.string,
  presentationContextStyle: PropTypes.object,
  contentContainerStyle: PropTypes.object,
  animation: PropTypes.object,
  action: PropTypes.object,
  onFinish: PropTypes.func,
}
PhotoPickerContainer.defaultProps = {
  tintColor: 'white',
  presentationContextStyle: {
    contextOpacity: 0.5,
    contextColor: '#000',
    contextWidth: Dimensions.get('window').width,
    contextHeight: Dimensions.get('window').height,
  },
  contentContainerStyle: {
    size: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
  },
  animation: {
    duration: 300,
    willShowCallback: () => {},
    willDismissCallback: () => {},
  },
  action: {
    dismissOnTouchContext: true,
    contextOnPress: () => {},
    dismissOnHardwareBackPress: true,
  },
  onFinish: (photos) => {},
}
export default PhotoPickerContainer

const defaultPresentationContextStyle = {
  contextOpacity: 0.5,
  contextColor: '#000',
  contextWidth: Dimensions.get('window').width,
  contextHeight: Dimensions.get('window').height,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
  },
});
