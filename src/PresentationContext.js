// @flow

'use-strict'
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';

class PresentationContext extends Component {
  state: {
    opacityAnimated: Object,
  }

  constructor(props) {
    super(props)
    this.state = {
      opacityAnimated: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps: OverlayType) {
    if (this.props.showContext !== nextProps.showContext) {
      const toValue = nextProps.showContext ? nextProps.presentationContextStyle.contextOpacity : 0;
      Animated.timing(this.state.opacityAnimated, {
        toValue,
        duration: this.props.animation.duration,
      }).start();
    }
  }

  _onPressContext = () => {
    console.log('_onPressContext')
    if (this.props.action.dismissOnTouchContext) {
      this.props.onDismissByTouchingContext()
    }
  }

  render() {
    const { presentationContextStyle, animation, action } = this.props
    const { opacityAnimated } = this.state
    return (
      <Animated.View
        style={[
          styles.overlay,
          {
            backgroundColor: presentationContextStyle.contextColor,
            opacity: opacityAnimated,
            width: presentationContextStyle.contextWidth,
            height: presentationContextStyle.contextHeight,
          }
        ]}
      >
        <TouchableOpacity onPress={this._onPressContext} style={[styles.overlay]} activeOpacity={1} />
      </Animated.View>
    )
  }
}
PresentationContext.propTypes = {
  presentationContextStyle: PropTypes.object,
  animation: PropTypes.object,
  action: PropTypes.object,
  showContext: PropTypes.bool,
  onDismissByTouchingContext: PropTypes.func.isRequired,
}
PresentationContext.defaultProps = {
  presentationContextStyle: {
    contextOpacity: 0.5,
    contextColor: '#000',
    contextWidth: Dimensions.get('window').width,
    contextHeight: Dimensions.get('window').height,
  },
  animation: {
    duration: 300,
  },
  action: {
    dismissOnTouchContext: false,
    contextOnPress: () => {},
  },
  showContext: false,
}
export default PresentationContext

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    top: 0,
    left: 0,
    position: 'absolute',
  },
});
