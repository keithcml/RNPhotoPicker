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
import RNFS from 'react-native-fs'

const { width, height } = Dimensions.get('window')

export class CropView extends Component {

  crop = () => {
    this.refs.cropper.crop()
    .then(base64 => {
      console.log(base64)
      let path = RNFS.DocumentDirectoryPath + '/crop.jpg'

      RNFS.writeFile(
        path,
        base64,
        'base64')
      .then((success) => {
        console.log('FILE WRITTEN!');
        this.props.onFinishCropping(path)
      })
      .catch((err) => {
        throw(err)
      })
    })
    .catch((err) => {
      console.log(err.message);
    })
  }

  render() {
    const { cropRatio, cropImageUri, onCloseCropping } = this.props
    let cropHeight = width * cropRatio
    let cropWidth = width
    if (cropHeight > height * 0.75) {
      cropHeight = height * 0.75
      cropWidth = cropHeight/cropRatio
    }
    console.log('cropping ' + cropImageUri);
    return(
      <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center' }} >

        <Text
          style={{
            paddingTop: 40,
            paddingBottom: 20,
            fontSize: 14,
            color: 'white',
          }}
        >
          'Pinch' and 'Move' to adjust cropping area
        </Text>

        <ImageCrop
          ref={'cropper'}
          image={cropImageUri}
          cropHeight={cropHeight}
          cropWidth={cropWidth}
          maxZoom={80}
          minZoom={20}
          panToMove={true}
          pinchToZoom={true}
        />

        <View style={styles.buttonContainerStyles} >
          <TouchableOpacity
            style={styles.buttonStyles}
            activeOpacity={0.7}
            onPress={onCloseCropping}
          >
            <Text style={styles.buttonTextStyles} >Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyles}
            activeOpacity={0.7}
            onPress={this.crop}
          >
            <Text style={[styles.buttonTextStyles, { fontWeight: '600' }]} >Crop</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}
CropView.propTypes = {
  cropRatio: PropTypes.number,
  cropImageUri: PropTypes.string.isRequired,
  onCloseCropping: PropTypes.func.isRequired,
  onFinishCropping: PropTypes.func.isRequired,
}
CropView.defaultProps = {
  cropRatio: 1,
  cropImageUri: '',
}

const styles = StyleSheet.create({
  buttonContainerStyles: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonStyles: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyles: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontSize: 14,
    color: 'white',
  },
})
