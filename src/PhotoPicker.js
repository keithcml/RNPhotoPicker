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
} from 'react-native'
import { CameraView } from './CameraView'
import { CropView } from './CropView'
import CameraRollList from './CameraRollList'

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
      cropImageUri: null,
      results: [],
      selectedPhotos: {},
      capturedPhoto: '',
      croppedPhoto: '',
    }
  }

  render() {
    const { pickerContainer } = this.props
    return(
      <View style={[originalPickerContainer, pickerContainer]} >
        <CameraRollList
          { ...this.props }
          onSingleSelection={ (singlePhoto: string) => {
            this.props.onResultCallback([singlePhoto])
          }}
          onCrop={ (uri) => {
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
            imageUri={this.state.cropImageUri}
            {...this.props}
            onCloseCropping={() => {
              this.setState({
                isCroppingPhoto: false,
                cropImageUri: null,
              })
            }}
            onFinishCropping={(base64Data) => {
              this.setState({
                isCroppingPhoto: false,
                cropImageUri: null,
              })
              // convert base64 to uri
              //this.props.onResultCallback([singlePhoto])
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
              this.props.onResultCallback([uri])
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
  // picker props
  outputImageAspectRatio: PropTypes.number,
  allowCameraCapture: PropTypes.bool,
  maxSelection: PropTypes.number,
  onResultCallback: PropTypes.func,
}
PhotoPicker.defaultProps = {
  // global props
  tintColor: 'white',
  pickerContainer: {},
  // picker props
  // crop ratio, null to disable cropping
  outputImageAspectRatio: null,
  allowCameraCapture: true,
  // set 1 for single selection
  maxSelection: 1,
  onResultCallback: (photos: Array<string>) => {},
}
export default PhotoPicker

const styles = StyleSheet.create({
  originalPickerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
});
