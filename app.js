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
          mode='child'
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={ () => {
              this._picker.show()
            }}
            activeOpacity={0.7}
          >
            <Text>Click to present Photo Picker</Text>
          </TouchableOpacity>
        </View>

        <PhotoPicker
          ref={(picker => { this._picker = picker })}
          tintColor='red'
          mode='modal'
          onShowed={() => {}}
          onDismissed={() => {}}
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
