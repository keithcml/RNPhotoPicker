// @flow

'use-strict'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { ImageCrop } from 'react-native-image-cropper'

const { width, height } = Dimensions.get('window')

export class CropView extends Component {

  crop = () => {
    this.refs.cropper.crop()
    .then(base64 => {
      console.log(base64)
      this.props.onFinishCropping(base64)
    })
  }

  render() {
    const { cropRatio, imageUri } = this.props
    const cropHeight = width * cropRatio
    return(
      <View style={{ flex: 1 }} >
        <ImageCrop
          ref={'cropper'}
          image={imageUri}
          cropHeight={cropHeight}
          cropWidth={width}
          maxZoom={80}
          minZoom={20}
          panToMove={true}
          pinchToZoom={true}
        />
        <TouchableOpacity
          style={{ padding: 1, alignSelf: 'stretch', height: cropHeight }}
          onPress={this.crop}
        >
          <Text>Crop</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
CropView.propTypes = {
  cropRatio: PropTypes.number,
  imageUri: PropTypes.object.isRequired,
  onCloseCropping: PropTypes.func.isRequired,
  onFinishCropping: PropTypes.func.isRequired,
}
CropView.defaultProps = {
  cropRatio: 1,
}
