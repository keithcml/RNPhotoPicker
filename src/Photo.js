// @flow

'use-strict'
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native'

export class Photo extends PureComponent {
  constructor(props) {
    super(props);
    const { isSelected } = this.props
    this.state = {
      isSelected
    }
  }
  render() {
    const { onPress, isSelected, node, containerStyle, size } = this.props;
    return(
      <TouchableOpacity
        style={containerStyle}
        onPress={ () => {
          const value = !this.state.isSelected;
          this.setState({
            isSelected: value,
          })
          if (!onPress(node.image.uri, value)) {
            this.setState({
              isSelected: !value,
            })
          }
        }}
        activeOpacity={0.7}
      >
        <Image style={{ flex: 1, width: size, height: size, backgroundColor: 'whitesmoke' }} source={{ uri: node.image.uri }} />
        {
          this.state.isSelected ? (
            <View
              style={{
                position: 'absolute', right: 0, bottom: 0,
                width: 20, height: 20,
                backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
            </View>
          ) : null
        }
      </TouchableOpacity>
    );
  }
}
Photo.propTypes = {
  size: PropTypes.number,
  containerStyle: PropTypes.object,
  node: PropTypes.object,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
}
Photo.defaultProps = {
  size: 50,
  containerStyle: {},
  isSelected: false,
  onPress: () => {},
}
