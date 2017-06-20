// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

export class CameraIcon extends Component {
  render() {
    return(
      <View
        style={{
          width: 30, height: 30, borderRadius: 8,
          backgroundColor: 'white',
          justifyContent: 'center', alignItems: 'center'
        }}
      >
        <View
          style={{
            width: 18, height: 18, borderRadius: 9,
            backgroundColor: 'black',
            justifyContent: 'center', alignItems: 'center'
          }}
        />
        <View
          style={{
            width: 4, height: 4, borderRadius: 2,
            backgroundColor: 'black',
            position: 'absolute', top: 3, right: 3,
          }}
        />
      </View>
    )
  }
}
