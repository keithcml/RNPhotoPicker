

'use-strict';Object.defineProperty(exports,"__esModule",{value:true});exports.getPhotoPermissions=exports.hasCameraPermissions=exports.requestPhotoPermission=undefined;
var _reactNative=require('react-native');
var _reactNativePermissions=require('react-native-permissions');var _reactNativePermissions2=_interopRequireDefault(_reactNativePermissions);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var requestPhotoPermission=exports.requestPhotoPermission=function requestPhotoPermission(){
return(
_reactNativePermissions2.default.requestPermission('photo').
then(function(res){
if(res=='denied'||res=='restricted'){
return'denied';
}
return'granted';
}));

};
var hasCameraPermissions=exports.hasCameraPermissions=function hasCameraPermissions(){
return(
_reactNativePermissions2.default.getPermissionStatus('camera').
then(function(response){
if(response=='denied'||response=='restricted'){
return false;
}
return true;
}));

};
var getPhotoPermissions=exports.getPhotoPermissions=function getPhotoPermissions(){
return(
_reactNativePermissions2.default.getPermissionStatus('photo').
then(function(response){
if(response=='undetermined'){
return'undetermined';
}else
if(response=='denied'||response=='restricted'){
return'denied';
}
return'granted';
}));

};

_alertForRestriction=function _alertForRestriction(source){
_reactNative.Alert.alert(
source+'has been restricted',
'It may be blocked by parental controls or it is not supported by the device.',
[{text:'OK',onPress:function onPress(){return console.log('permission restricted');},style:'cancel'}]);

};
_alertForPhotoPermission=function _alertForPhotoPermission(){
_reactNative.Alert.alert(
'Can we access your photo library?',
'We need access so you can add photo for your item.',
[
{text:'No',onPress:function onPress(){return console.log('permission denied');},style:'cancel'},
{text:'Open Settings',onPress:_reactNativePermissions2.default.openSettings}]);


};
_alertForCameraPermission=function _alertForCameraPermission(){
_reactNative.Alert.alert(
'Can we access your camera?',
'We need access so you can take photo for your item.',
[
{text:'No',onPress:function onPress(){return console.log('permission denied');},style:'cancel'},
{text:'Open Settings',onPress:_reactNativePermissions2.default.openSettings}]);


};