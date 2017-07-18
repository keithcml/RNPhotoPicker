// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'
import RNFS from 'react-native-fs'
import Camera from 'react-native-camera'
import { CameraIcon } from './CameraIcon'
const { width } = Dimensions.get('window')

export class CameraView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isPreviewing: false,
      previewURI: null,
    }
  }

  _takePicture = () => {
    this._camera.capture({
      metadata: {},
    })
    .then(({ path, size }) => {
      this.setState({
        isPreviewing: true,
        previewURI: path,
      })
    })
    .catch(err => console.error(err))
  }

  _onCancel = () => {
    if (this.state.isPreviewing) {
      this.setState({
        isPreviewing: false,
        previewURI: null,
      })
    }
    else {
      this.props.onClose()
    }
  }

  _onChoose = () => {
    this.props.onFinish(this.state.previewURI)
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
          captureTarget={Camera.constants.CaptureTarget.temp}
          flashMode={Camera.constants.FlashMode.off}
        />
        {
          this.state.isPreviewing ? (
            <View style={styles.previewPos} >
              <Image
                style={[styles.previewContent, { width, height: width * outputImageAspectRatio }]}
                source={{ uri: this.state.previewURI }}
              />
            </View>
          ) : null
        }
        {
          !this.state.isPreviewing ? (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.capture}
              onPress={this._takePicture}
            >
              <CameraIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.touchableRight} activeOpacity={0.7} onPress={this._onChoose} >
              <Text style={[styles.touchableText]} >Choose</Text>
            </TouchableOpacity>
          )
        }
        <TouchableOpacity style={styles.touchableLeft} activeOpacity={0.7} onPress={this._onCancel} >
          <Text style={[styles.touchableText]} >Cancel</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
CameraView.propTypes = {
  outputImageAspectRatio: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
}
CameraView.defaultProps = {
  outputImageAspectRatio: 1,
  onClose: () => {},
  onFinish: (uri) => {},
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
  previewPos: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  previewContent: {
    alignSelf: 'stretch',
  },
});
