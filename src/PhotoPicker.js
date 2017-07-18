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
  Modal,
  Image,
} from 'react-native'
import { CameraView } from './CameraView'
import { CropView } from './CropView'
import CameraRollList from './CameraRollList'
import ImageResizer from 'react-native-image-resizer'

const { width } = Dimensions.get('window')

class PhotoPicker extends Component {
  state: {
    isCroppingPhoto: boolean,
    isTakingPhoto: boolean,
    cropImageUri: string,
    results: Array<string>,
    selectedPhotos: {| [string]: boolean |},
    capturedPhoto: string,
    croppedPhoto: string,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCroppingPhoto: false,
      isTakingPhoto: false,
      cropImageUri: '',
      results: [],
      selectedPhotos: {},
      capturedPhoto: '',
      croppedPhoto: '',
    }
  }

  _processBeforeFinishing = (photoURIs) => {
    const compressOptions = { ...defaultOutputSettings, ...this.props.outputSettings }
    if (compressOptions.noCompression) {
      return
    }
    const compressImage = (imageUri) => {
      return(
        ImageResizer.createResizedImage(
          imageUri,
          compressOptions.maximumWidth,
          compressOptions.maximumHeight,
          'JPEG',
          compressOptions.JPEGCompressionQuality,
          0,
          null)
        .then((resizedImageUri) => {
          // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
          console.log(resizedImageUri)
          return resizedImageUri
        })
        .catch((err) => {
          throw(err)
        })
      )
    }
    async function loop(originalURIs) {
      let uris = [];
      for (let key of originalURIs) {
        try {
          const resizedImageUri = await compressImage(key);
          uris = uris.concat(resizedImageUri);
        }
        catch (err) {
          throw(err)
        }
      }
      return uris
    }
    return(
      loop(Object.keys(this.state.selected))
      .then( res => res )
      .catch( err => { throw(err) })
    )
  }

  render() {
    const { pickerContainer } = this.props
    return(
      <View style={[styles.originalPickerContainer, pickerContainer]} >
        <CameraRollList
          { ...this.props }
          onSingleSelection={ (singlePhoto: string) => {
            return(
              this._processBeforeFinishing([singlePhoto])
              .then( (processedURIs) => {
                this.props.onResultCallback([processedURIs])
              })
              .catch( err => {
                console.log(err)
              })
            )
          }}
          onCrop={ (uri: string) => {
            this.setState({
              isCroppingPhoto: true,
              cropImageUri: uri,
            })
          }}
          onCapture={ () => {
            this.setState({
              isTakingPhoto: true,
            })
          }}
        />

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.isCroppingPhoto}
          onRequestClose={() => {
            alert("Modal has been closed.")
          }}
        >
          <CropView
            cropRatio={this.props.outputImageAspectRatio}
            cropImageUri={this.state.cropImageUri}
            {...this.props}
            onCloseCropping={() => {
              this.setState({
                isCroppingPhoto: false,
                cropImageUri: '',
              })
            }}
            onFinishCropping={(uri: string) => {
              this.setState({
                isCroppingPhoto: false,
                cropImageUri: '',
              })

              return(
                this._processBeforeFinishing([uri])
                .then( (processedURIs) => {
                  this.props.onResultCallback([processedURIs])
                })
                .catch( err => {
                  console.log(err)
                })
              )
            }}
          />
        </Modal>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.isTakingPhoto}
          onRequestClose={() => {
            alert("Modal has been closed.")
          }}
        >
          <CameraView
            width={width}
            {...this.props}
            onClose={() => {
              this.setState({
                isTakingPhoto: false,
              })
            }}
            onFinish={(uri) => {
              this.setState({
                isTakingPhoto: false,
              })
              return(
                this._processBeforeFinishing([uri])
                .then( (processedURIs) => {
                  this.props.onResultCallback([processedURIs])
                })
                .catch( err => {
                  console.log(err)
                })
              )
            }}
          />
        </Modal>
      </View>
    )
  }
}

PhotoPicker.propTypes = {
  // global props
  tintColor: PropTypes.string,
  pickerContainer: PropTypes.object,
  outputImageAspectRatio: PropTypes.number,
  allowCameraCapture: PropTypes.bool,
  maxSelection: PropTypes.number,
  outputSettings: PropTypes.object,
  onResultCallback: PropTypes.func,
}
PhotoPicker.defaultProps = {
  // global props
  tintColor: 'white',
  pickerContainer: {},
  // crop ratio, null to disable cropping
  outputImageAspectRatio: null,
  allowCameraCapture: true,
  // set 1 for single selection
  maxSelection: 1,
  outputSettings: {},
  onResultCallback: (photos: Array<string>) => {},
}
export default PhotoPicker

const defaultOutputSettings = {
  noCompression: true,
  JPEGCompressionQuality: 100,
  maximumWidth: 1200,
  maximumHeight: 1200,
}

const styles = StyleSheet.create({
  originalPickerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
})
