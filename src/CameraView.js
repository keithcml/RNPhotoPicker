// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native'
import Camera from 'react-native-camera'
import { CameraIcon } from './CameraIcon'
const { width } = Dimensions.get('window')

export class CameraView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      preview: false,
    }
  }

  _takePicture = () => {
    const options = {};
    //options.location = ...
    this.camera.capture({
      metadata: options
    })
    .then((data) => console.log(data))
    .catch(err => console.error(err))
  }

  render() {
    const { outputImageAspectRatio } = this.props
    const height = width*outputImageAspectRatio
    return(
      <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'center' }} >
        <Camera
          ref={(cam) => {
            this._camera = cam
          }}
          keepAwake
          style={{ width, height }}
          aspect={Camera.constants.Aspect.fill}
          flashMode={Camera.constants.FlashMode.off}
        />
        {
          !this.state.preview ? (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.capture}
              onPress={this._takePicture}
            >
              <CameraIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.touchableRight} activeOpacity={0.7} onPress={this.props.onFinish} >
              <Text style={[styles.touchableText]} >Choose</Text>
            </TouchableOpacity>
          )
        }
        <TouchableOpacity style={styles.touchableLeft} activeOpacity={0.7} onPress={this.props.onClose} >
          <Text style={[styles.touchableText]} >Close</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
CameraView.propTypes = {
  onClose: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
}
CameraView.defaultProps = {
  onClose: () => {},
  onFinish: () => {},
}

const styles = StyleSheet.create({
  capture: {
    position: 'absolute',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    bottom: 32,
  },
  touchableLeft: {
    position: 'absolute',
    bottom: 16,
    left: 4,
    height: 40,
    marginVertical: 2,
    marginHorizontal: 4,
  },
  touchableRight: {
    position: 'absolute',
    bottom: 16,
    right: 4,
    height: 40,
    marginVertical: 2,
    marginHorizontal: 4,
  },
  touchableText: {
    color: 'white',
    fontSize: 16,
    padding: 8,
  },
});
