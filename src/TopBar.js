// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Platform,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'

export class TopBar extends Component {
  render() {
    return(
      <View style={styles.defaultTopBar} >
        <TouchableOpacity style={styles.touchable} activeOpacity={0.7} onPress={this.props.onClose} >
          <Text style={[styles.touchableText, { color: this.props.tintColor }]} >Close</Text>
        </TouchableOpacity>
        {
          this.props.maxSelection > 1 ? (
            <TouchableOpacity style={styles.touchable} activeOpacity={0.7} onPress={this.props.onDone} >
              <Text style={[styles.touchableText, { color: this.props.tintColor }]} >Done</Text>
            </TouchableOpacity>
          ) : null
        }
        <View style={styles.hairline} />
      </View>
    )
  }
}

TopBar.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  defaultTopBar: {
    width: Dimensions.get('window').width,
    height: Platform.OS === 'ios' ? 64 : 50,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  hairline: {
    position: 'absolute',
    height: 1,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'lightgray',
  },
  touchable: {
    height: 40,
    marginVertical: 2,
    marginHorizontal: 4,
  },
  touchableText: {
    fontSize: 16,
    padding: 8,
  },
});
