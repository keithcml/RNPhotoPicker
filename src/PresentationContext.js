// @flow

'use-strict'
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';

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
      const toValue = nextProps.showContext ? nextProps.opacity : 0;
      Animated.timing(this.state.opacityAnimated, {
        toValue,
        duration: this.props.animationDuration,
      }).start();
    }
  }

  render() {
    const { onPress, backgroundColor } = this.props
    const { opacityAnimated } = this.state
    return (
      <Animated.View
        style={[styles.overlay, { backgroundColor, opacity: opacityAnimated }]}
      >
        <TouchableOpacity onPress={onPress} style={[styles.overlay]} activeOpacity={1} />
      </Animated.View>
    );
  }
}
PresentationContext.propTypes = {
  backgroundColor: PropTypes.string,
  opacity: PropTypes.number,
  animationDuration: PropTypes.number,
  showContext: PropTypes.bool,
  onPress: PropTypes.func,
}
PresentationContext.defaultProps = {
  backgroundColor: '#000',
  opacity: 0.5,
  animationDuration: 0.5,
  showContext: false,
  onPress: () => {},
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
