/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import PhotoPicker from './src/index'
import { PhotoPickerContainer } from './src/index'

export default class RNPhotoPickerExample extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'whitesmoke' }} >
        <Text style={{ height: 60, paddingTop: 30 }} >Photo Picker attached to this view</Text>
        <PhotoPicker
          containerStyle={{ flex: 2, backgroundColor: 'white', alignSelf: 'stretch' }}
          tintColor='red'
          maxSelection={2}
          allowCameraCapture={true}
          outputImageAspectRatio={null}
          outputSettings={{
            noCompression: false,
            JPEGCompressionQuality: 90,
          }}
          onResultCallback={(photos)=>{
            console.log(photos);
          }}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={ () => {
              this._pickerContainer.show()
            }}
            activeOpacity={0.7}
          >
            <Text>Click to present Photo Picker</Text>
          </TouchableOpacity>
        </View>

        <PhotoPickerContainer
          ref={(pickerContainer => { this._pickerContainer = pickerContainer })}
          tintColor='red'
          maxSelection={1}
          outputImageAspectRatio={1}
          outputSettings={{
            noCompression: false,
            JPEGCompressionQuality: 90,
          }}
          onFinish={(photos)=>{
            console.log(photos)
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RNPhotoPickerExample', () => RNPhotoPickerExample);
