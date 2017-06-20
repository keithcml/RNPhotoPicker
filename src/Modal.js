// @flow

import React, { cloneElement, Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  BackHandler,
  Animated,
  Dimensions,
} from 'react-native'
import PresentationContext from './PresentationContext'

const BACK_PRESS_EVENT: string = 'hardwareBackPress'

export class Modal extends Component {
  state: {
    modalState: ('closed' | 'opened' | 'animating'),
    translationAnimated: Object,
  }

  constructor(props) {
    super(props)
    this.state = {
      modalState: 'closed',
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
    const { dismissOnHardwareBackPress } = this.props
    const { modalState } = this.state
    if (dismissOnHardwareBackPress && modalState === 'opened') {
      this.dismiss()
      return true
    }
    return false
  }

  _toggle = (flag: number, callback?: Function = () => {}) => {
    const modalState: string = flag === 0 ? 'animating' : 'opened'
    const toValue: number = flag
    this.setState({
      modalState
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
          if (modalState === 'animating') {
            this.setState({
              modalState: 'closed'
            })
          }
        });
    });
  }

  show() {
    const { onShowed } = this.props
    this._toggle(1, onShowed)
  }

  dismiss() {
    const { onDismissed } = this.props
    this._toggle(0, onDismissed)
  }

  render() {
    const {
      children,
      dismissOnHardwareBackPress,
      contextColor,
      contextOpacity,
      animationDuration,
      contextOnPress,
      width,
      height,
    } = this.props
    const { modalState, translationAnimated } = this.state
    const hidden = modalState === 'closed' ? styles.hidden : null
    const screenHeight: number = Dimensions.get('window').height
    const yPosition = translationAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [screenHeight, 0],
        extrapolate: 'clamp'
    })
    return(
      <View style={[styles.container, hidden]}>
        <PresentationContext
          backgroundColor={contextColor}
          opacity={contextOpacity}
          animationDuration={animationDuration}
          showContext={modalState === 'opened'}
          onPress={contextOnPress}
        />
        <Animated.View
          style={[
            styles.contentContainer,
            { transform: [{ translateY: yPosition }] }
          ]}
        >
          {
            modalState !== 'closed' ? (
              <View style={{ width, height }} >
                {React.cloneElement(children, {...this.props})}
              </View>
            ) : null
          }

        </Animated.View>
      </View>
    )
  }
}
Modal.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  dismissOnHardwareBackPress: PropTypes.bool,
  contextOpacity: PropTypes.number,
  contextColor: PropTypes.string,
  dismissOnTouchOutside: PropTypes.bool,
  contextOnPress: PropTypes.func,
  animationDuration: PropTypes.number,
}
Modal.defaultProps = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  dismissOnHardwareBackPress: true,
  contextOpacity: 0.5,
  contextColor: '#000',
  dismissOnTouchOutside: true,
  contextOnPress: () => {},
  animationDuration: 300,
}

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
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
});
