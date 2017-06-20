// @flow

'use-strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  CameraRoll,
  FlatList,
  Dimensions,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { Modal } from './Modal'
import { Photo } from './Photo'
import { CameraIcon } from './CameraIcon'
import { CameraView } from './CameraView'
import ImageResizer from 'react-native-image-resizer'
import * as Permissions from './Permissions'

const { width } = Dimensions.get('window')
const GRID_SIZE: number = (width-3)/4
const FETCH_COUNT: number = 24

class CameraRollList extends Component {
  state: {
    connectingAlbum: boolean,
    isLoadingNext: boolean,
    hasNextPage: boolean,
    endCursor: string,
    photos: Array<string>,
    selected: {| [string]: boolean |},
    noPhotoPermission: boolean,
  }

  constructor(props) {
    super(props)
    this.state = {
      connectingAlbum: true,
      isLoadingNext: false,
      hasNextPage: false,
      endCursor: '',
      photos: [],
      selected: {},
      noPhotoPermission: false,
    }
    this._getPhotos()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.photos === this.state.photos &&
        nextState.noPhotoPermission === this.state.noPhotoPermission) {
          return false
        }
    return true
  }

  getSelectedPhotoURI = (clearSelection) => {
    const compressImage = (imageUri) => {
      return(
        ImageResizer.createResizedImage(imageUri, 800, 800, 'JPEG', 90, 0, null)
        .then((resizedImageUri) => {
          // resizeImageUri is the URI of the new image that can now be displayed, uploaded...
          console.log(resizedImageUri);
          return resizedImageUri;
        }).catch((err) => {
          throw(err);
        })
      );
    }
    async function loop(originalURIs) {
      let uris = [];
      for (let key of originalURIs) {
        try {
          const resizedImageUri = await compressImage(key);
          uris = uris.concat(resizedImageUri);
        }
        catch (err) {
          throw(err);
        }
      }
      return uris;
    }
    return(
      loop(Object.keys(this.state.selected))
      .then( res => res )
      .catch( err => { throw(err) })
    );
  }

  _getPhotos = () => {
    Permissions.getPhotoPermissions()
    .then(response => {
      if (response === 'granted') {
        const options = {
          first: FETCH_COUNT,
          mimeTypes: ['image/jpeg'],
        }
        CameraRoll.getPhotos(options)
        .then(r => {
          const { has_next_page, end_cursor } = r.page_info
          this.setState({
            connectingAlbum: false,
            isLoadingNext: false,
            hasNextPage: has_next_page,
            endCursor: end_cursor,
            photos: r.edges,
            noPhotoPermission: false,
          })
        })
      }
      else if (response === 'undetermined') {
        Permissions.requestPhotoPermission()
        .then(r => {
          this._getPhotos()
        })
      }
      else if (response === 'denied') {
        this.setState({
          connectingAlbum: false,
          isLoadingNext: false,
          noPhotoPermission: true,
        })
      }
    })
  }

  _getNextPage = () => {
    this.setState({
      isLoadingNext: true,
      hasNextPage: false,
    })
    const options = {
      first: FETCH_COUNT,
      mimeTypes: ['image/jpeg'],
      after: this.state.endCursor,
    }
    CameraRoll.getPhotos(options)
    .then(r => {
      const { has_next_page, end_cursor } = r.page_info
      this.setState((previousState) => {
        let photos = previousState.photos.slice(0)
        return {
          connectingAlbum: false,
          isLoadingNext: false,
          hasNextPage: has_next_page,
          endCursor: end_cursor,
          photos: photos.concat(r.edges),
          noPhotoPermission: false,
        }
      })
    })
  }

  _renderFooter = () => {
    if (this.state.noPhotoPermission) {
      return(
        <TouchableOpacity
          style={{ margin: 1, alignSelf: 'stretch', height: GRID_SIZE*2, backgroundColor: 'whitesmoke' }}
          onPress={() => {
            //openPhotoLibrary({});
          }}
        >
          <View style={{ height: 4 }} />
          <Text style={{ color: 'lightgray', fontSize: 13 }} >Allow Accessing Your Photo Lirary</Text>
        </TouchableOpacity>
      );
    }
    else if (this.state.isLoadingNext || this.state.connectingAlbum) {
      return(
        <View style={{ paddingVertical: 16, height: 50, alignSelf: 'stretch' }} >
          <ActivityIndicator
            animating={true}
            size="small"
            color={'lightgray'}
          />
        </View>
      );
    }
    return <View style={{ height: 40 }} />;
  }
  _renderCameraButton = () => {
    // const pickerOptions = {
    //   maxWidth: 800,
    //   maxHeight: 800,
    //   mediaType: 'photo',
    //   noData: true,
    // };
    return(
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          width: GRID_SIZE, height: GRID_SIZE,
          backgroundColor: 'black',
          justifyContent: 'center', alignItems: 'center',
          marginRight: 1,
        }}
        onPress={() => {
          let count = 0
          for (let key of Object.keys(this.state.selected)) {
            if (this.state.selected[key] == true) {
              count = count + 1
            }
          }
          if (count >= this.props.maxSelection) {
            Alert.alert(
              'You select too many photos',
              `You cannot select/capture more than ${this.props.maxSelection} photos.`,
              [ { text: 'Got it', onPress: () => {}, style: 'cancel' } ]
            )
            return
          }
          this._cameraView.show()
          // openCamera(pickerOptions, (response) => {
          //   if (response.hasOwnProperty('didCancel') && response.didCancel) {
          //     return;
          //   }
          //   this.props.onFinishCapture(response.uri)
          // });
        }}
      >
        <CameraIcon />
      </TouchableOpacity>
    );
  }
  _renderItem = ({ item, index }) => {
    if (index === 0 && this.props.hasCamera) {
      return <View>{this._renderCameraButton()}</View>
    }
    return(
      <Photo
        { ...this.props.props }
        size={GRID_SIZE}
        containerStyle={{
          width: GRID_SIZE, height: GRID_SIZE,
          marginRight: 1,
        }}
        node={item.node}
        isSelected={
          this.state.selected[item.node.image.uri] // renderItem depends on state
        }
        onPress={ (uri, isSelected) => {
          if (!isSelected) {
            this.setState((oldState) => {
              let selected = oldState.selected
              delete selected[uri]
              return { selected }
            })
            return true
          }
          let count = 0
          for (let key of Object.keys(this.state.selected)) {
            if (this.state.selected[key] == true) {
              count = count + 1
            }
          }
          if (count >= this.props.maxSelection) {
            Alert.alert(
              'You select too many photos',
              `You cannot select more than ${this.props.maxSelection} photos.`,
              [
                { text: 'OK',
                  onPress: () => {
                    this.forceUpdate();
                  },
                  style: 'cancel'
                }
              ]
            )
            return false
          }
          this.setState((oldState) => {
            return {
              selected: {
                ...oldState.selected,
                [uri]: isSelected,
              }
            }
          })
          return true
        }}
      />
    )
  }
  render() {
    return(
      <View style={{ flex: 1 }} >
        <FlatList
          numColumns={4}
          columnWrapperStyle={{
            flexDirection: 'row',
            //justifyContent: 'space-between',
            marginBottom: 1,
          }}
          ListHeaderComponent={this._renderHeader}
          ListFooterComponent={this._renderFooter}
          renderItem={this._renderItem}
          data={[
            {
              node: {
                image: {
                  uri: 'camera'
                }
              }
            }, ...this.state.photos]}
          keyExtractor={ (item, index) => item.node.image.uri }
          onEndReachedThreshold={0.5}
          onEndReached={ () => {
            if (this.state.hasNextPage) {
              this._getNextPage()
            }
          }}
        />
        <Modal
          ref={ (camera) => {this._cameraView = camera} }
          dismissOnHardwareBackPress
          contextOpacity={0.5}
          contextColor='#000'
          dismissOnTouchOutside
          contextOnPress={() => {}}
          animationDuration={300}
          {...this.props}
        >
          <CameraView
            onClose={() => {
              this._cameraView.dismiss()
            }}
            onFinish={() => {

            }}
          />
        </Modal>
      </View>
    );
  }
}

CameraRollList.propTypes = {
  maxSelection: PropTypes.number,
  onFinishCapture: PropTypes.func,
}
CameraRollList.defaultProps = {
  maxSelection: 1,
  onFinishCapture: () => {},
}
export default CameraRollList
