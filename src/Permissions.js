// @flow

'use-strict'
import { Alert } from 'react-native'
import Permissions from 'react-native-permissions'

export const requestPhotoPermission = () => {
  return(
    Permissions.requestPermission('photo')
      .then(res => {
        if (res == 'denied' || res == 'restricted') {
          return 'denied';
        }
        return 'granted';
      })
  );
}
export const hasCameraPermissions = () => {
  return(
    Permissions.getPermissionStatus('camera')
      .then(response => {
        if (response == 'denied' || response == 'restricted') {
          return false;
        }
        return true;
      })
  );
}
export const getPhotoPermissions = () => {
  return(
    Permissions.getPermissionStatus('photo')
      .then(response => {
        if (response == 'undetermined') {
          return 'undetermined';
        }
        else if (response == 'denied' || response == 'restricted') {
          return 'denied';
        }
        return 'granted';
      })
  );
}

_alertForRestriction = (source: string) => {
  Alert.alert(
    source + 'has been restricted',
    'It may be blocked by parental controls or it is not supported by the device.',
    [ {text: 'OK', onPress: () => console.log('permission restricted'), style: 'cancel'} ]
  )
}
_alertForPhotoPermission = () => {
  Alert.alert(
    'Can we access your photo library?',
    'We need access so you can add photo for your item.',
    [
      {text: 'No', onPress: () => console.log('permission denied'), style: 'cancel'},
      {text: 'Open Settings', onPress: Permissions.openSettings}
    ]
  )
}
_alertForCameraPermission = () => {
  Alert.alert(
    'Can we access your camera?',
    'We need access so you can take photo for your item.',
    [
      {text: 'No', onPress: () => console.log('permission denied'), style: 'cancel'},
      {text: 'Open Settings', onPress: Permissions.openSettings}
    ]
  )
}
