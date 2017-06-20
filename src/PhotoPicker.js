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
import CameraRollList from './CameraRollList'
import PresentationContext from './PresentationContext'

const BACK_PRESS_EVENT: string = 'hardwareBackPress'

class PhotoPicker extends Component {
  state: {
    pickerState: ('closed' | 'opened' | 'animating'),
    translationAnimated: Object,
  }

  constructor(props) {
    super(props)
    const pickerState = props.mode === 'modal' ? 'closed' : 'opened'
    // opened, opening, closed, closing,
    this.state = {
      pickerState,
      translationAnimated: new Animated.Value(0),
    }
  }

  componentDidMount() {
    const { mode } = this.props
    if (mode === 'modal') {
      BackHandler.addEventListener(BACK_PRESS_EVENT, this._backEventHandler)
    }
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
          duration: this.props.animationDuration,
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
    const { showTopBar, topBarComponent } = this.props
    if (!showTopBar) return null
    if (topBarComponent === null) {
      return (
        <TopBar {...this.props} onClose={() => {this.dismiss()}} />
      )
    }
    else {
      return topBarComponent
    }
  }

  show() {
    const { onShowed } = this.props
    this._togglePicker(1, onShowed)
  }

  dismiss() {
    const { onDismissed } = this.props
    this._togglePicker(0, onDismissed)
  }

  render() {
    const { mode, containerStyle } = this.props
    if (mode === 'child') {
      return(
        <View style={containerStyle} >
          <CameraRollList { ...this.props } />
        </View>
      )
    }
    const { width, height, animationDuration, contextColor, contextOpacity, show, contextOnPress } = this.props
    const { translationAnimated, pickerState } = this.state
    const screenHeight: number = Dimensions.get('window').height
    const hidden = pickerState === 'closed' ? styles.hidden : null
    const yPosition = translationAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [screenHeight, 0],
        extrapolate: 'clamp'
    })
    return(
      <View style={[styles.container, containerStyle, hidden]}>
        <PresentationContext
          backgroundColor={contextColor}
          opacity={contextOpacity}
          animationDuration={animationDuration}
          showContext={pickerState === 'opened'}
          onPress={contextOnPress}
        />
        <Animated.View
          style={[
            styles.pickerContainer,
            { transform: [{ translateY: yPosition }] }
          ]}
        >
          <View style={{ width, height }} >
            {this._renderPickerTopBar()}
            <CameraRollList { ...this.props } />
          </View>
        </Animated.View>
      </View>
    )
  }
}

PhotoPicker.propTypes = {
  // global props
  tintColor: PropTypes.string,
  mode: PropTypes.oneOf(['child', 'modal']),
  showTopBar: PropTypes.bool,
  topBarComponent: PropTypes.element,
  containerStyle: PropTypes.object,
  // modal mode props
  // presentation context
  contextOpacity: PropTypes.number,
  contextColor: PropTypes.string,
  dismissOnTouchOutside: PropTypes.bool,
  contextOnPress: PropTypes.func,
  animationDuration: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  dismissOnHardwareBackPress: PropTypes.bool,
  onShowed: PropTypes.func,
  onDismissed: PropTypes.func,
  show: PropTypes.bool,
  // picker props
  outputImageAspectRatio: PropTypes.number,
  hasCamera: PropTypes.bool,
  maxSelection: PropTypes.number,
  onFinishCapture: PropTypes.func,
}
PhotoPicker.defaultProps = {
  // global props
  tintColor: 'white',
  mode: 'modal',
  showTopBar: true,
  topBarComponent: null,
  containerStyle: {},
  // modal mode props
  contextOpacity: 0.5,
  contextColor: '#000',
  dismissOnTouchOutside: true,
  contextOnPress: () => {},
  animationDuration: 300,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  dismissOnHardwareBackPress: true,
  onShowed: () => {},
  onDismissed: () => {},
  show: false,
  // picker props
  outputImageAspectRatio: 1,
  hasCamera: true,
  maxSelection: 1,
  onFinishCapture: () => {},
}
export default PhotoPicker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  hidden: {
    top: -10000,
    left: 0,
    height: 0,
    width: 0,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
});
