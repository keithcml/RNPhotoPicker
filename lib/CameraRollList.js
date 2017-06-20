

'use-strict';Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/CameraRollList.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNative=require('react-native');










var _Modal=require('./Modal');
var _Photo=require('./Photo');
var _CameraIcon=require('./CameraIcon');
var _CameraView=require('./CameraView');
var _reactNativeImageResizer=require('react-native-image-resizer');var _reactNativeImageResizer2=_interopRequireDefault(_reactNativeImageResizer);
var _Permissions=require('./Permissions');var Permissions=_interopRequireWildcard(_Permissions);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=

_reactNative.Dimensions.get('window'),width=_Dimensions$get.width;
var GRID_SIZE=(width-3)/4;
var FETCH_COUNT=24;var

CameraRollList=function(_Component){_inherits(CameraRollList,_Component);










function CameraRollList(props){_classCallCheck(this,CameraRollList);var _this=_possibleConstructorReturn(this,(CameraRollList.__proto__||Object.getPrototypeOf(CameraRollList)).call(this,
props));_this.




















getSelectedPhotoURI=function(clearSelection){
var compressImage=function compressImage(imageUri){
return(
_reactNativeImageResizer2.default.createResizedImage(imageUri,800,800,'JPEG',90,0,null).
then(function(resizedImageUri){

console.log(resizedImageUri);
return resizedImageUri;
}).catch(function(err){
throw err;
}));

};
function loop(originalURIs){var uris,_iterator,_isArray,_i,_ref,key,resizedImageUri;return regeneratorRuntime.async(function loop$(_context){while(1){switch(_context.prev=_context.next){case 0:
uris=[];_iterator=
originalURIs,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:_iterator[typeof Symbol==='function'?typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator':'@@iterator']();case 2:if(!_isArray){_context.next=8;break;}if(!(_i>=_iterator.length)){_context.next=5;break;}return _context.abrupt('break',25);case 5:_ref=_iterator[_i++];_context.next=12;break;case 8:_i=_iterator.next();if(!_i.done){_context.next=11;break;}return _context.abrupt('break',25);case 11:_ref=_i.value;case 12:key=_ref;_context.prev=13;_context.next=16;return regeneratorRuntime.awrap(

compressImage(key));case 16:resizedImageUri=_context.sent;
uris=uris.concat(resizedImageUri);_context.next=23;break;case 20:_context.prev=20;_context.t0=_context['catch'](13);throw _context.t0;case 23:_context.next=2;break;case 25:return _context.abrupt('return',





uris);case 26:case'end':return _context.stop();}}},null,this,[[13,20]]);}

return(
loop(Object.keys(_this.state.selected)).
then(function(res){return res;}).
catch(function(err){throw err;}));

};_this.

_getPhotos=function(){
Permissions.getPhotoPermissions().
then(function(response){
if(response==='granted'){
var options={
first:FETCH_COUNT,
mimeTypes:['image/jpeg']};

_reactNative.CameraRoll.getPhotos(options).
then(function(r){var _r$page_info=
r.page_info,has_next_page=_r$page_info.has_next_page,end_cursor=_r$page_info.end_cursor;
_this.setState({
connectingAlbum:false,
isLoadingNext:false,
hasNextPage:has_next_page,
endCursor:end_cursor,
photos:r.edges,
noPhotoPermission:false});

});
}else
if(response==='undetermined'){
Permissions.requestPhotoPermission().
then(function(r){
_this._getPhotos();
});
}else
if(response==='denied'){
_this.setState({
connectingAlbum:false,
isLoadingNext:false,
noPhotoPermission:true});

}
});
};_this.

_getNextPage=function(){
_this.setState({
isLoadingNext:true,
hasNextPage:false});

var options={
first:FETCH_COUNT,
mimeTypes:['image/jpeg'],
after:_this.state.endCursor};

_reactNative.CameraRoll.getPhotos(options).
then(function(r){var _r$page_info2=
r.page_info,has_next_page=_r$page_info2.has_next_page,end_cursor=_r$page_info2.end_cursor;
_this.setState(function(previousState){
var photos=previousState.photos.slice(0);
return{
connectingAlbum:false,
isLoadingNext:false,
hasNextPage:has_next_page,
endCursor:end_cursor,
photos:photos.concat(r.edges),
noPhotoPermission:false};

});
});
};_this.

_renderFooter=function(){
if(_this.state.noPhotoPermission){
return(
_react2.default.createElement(_reactNative.TouchableOpacity,{
style:{margin:1,alignSelf:'stretch',height:GRID_SIZE*2,backgroundColor:'whitesmoke'},
onPress:function onPress(){

},__source:{fileName:_jsxFileName,lineNumber:161}},

_react2.default.createElement(_reactNative.View,{style:{height:4},__source:{fileName:_jsxFileName,lineNumber:167}}),
_react2.default.createElement(_reactNative.Text,{style:{color:'lightgray',fontSize:13},__source:{fileName:_jsxFileName,lineNumber:168}},'Allow Accessing Your Photo Lirary')));


}else
if(_this.state.isLoadingNext||_this.state.connectingAlbum){
return(
_react2.default.createElement(_reactNative.View,{style:{paddingVertical:16,height:50,alignSelf:'stretch'},__source:{fileName:_jsxFileName,lineNumber:174}},
_react2.default.createElement(_reactNative.ActivityIndicator,{
animating:true,
size:'small',
color:'lightgray',__source:{fileName:_jsxFileName,lineNumber:175}})));



}
return _react2.default.createElement(_reactNative.View,{style:{height:40},__source:{fileName:_jsxFileName,lineNumber:183}});
};_this.
_renderCameraButton=function(){






return(
_react2.default.createElement(_reactNative.TouchableOpacity,{
activeOpacity:0.9,
style:{
width:GRID_SIZE,height:GRID_SIZE,
backgroundColor:'black',
justifyContent:'center',alignItems:'center',
marginRight:1},

onPress:function onPress(){
var count=0;
for(var _iterator2=Object.keys(_this.state.selected),_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[typeof Symbol==='function'?typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator':'@@iterator']();;){var _ref2;if(_isArray2){if(_i2>=_iterator2.length)break;_ref2=_iterator2[_i2++];}else{_i2=_iterator2.next();if(_i2.done)break;_ref2=_i2.value;}var key=_ref2;
if(_this.state.selected[key]==true){
count=count+1;
}
}
if(count>=_this.props.maxSelection){
_reactNative.Alert.alert(
'You select too many photos','You cannot select/capture more than '+
_this.props.maxSelection+' photos.',
[{text:'Got it',onPress:function onPress(){},style:'cancel'}]);

return;
}
_this._cameraView.show();






},__source:{fileName:_jsxFileName,lineNumber:193}},

_react2.default.createElement(_CameraIcon.CameraIcon,{__source:{fileName:_jsxFileName,lineNumber:225}})));


};_this.
_renderItem=function(_ref3){var item=_ref3.item,index=_ref3.index;
if(index===0&&_this.props.hasCamera){
return _react2.default.createElement(_reactNative.View,{__source:{fileName:_jsxFileName,lineNumber:231}},_this._renderCameraButton());
}
return(
_react2.default.createElement(_Photo.Photo,_extends({},
_this.props.props,{
size:GRID_SIZE,
containerStyle:{
width:GRID_SIZE,height:GRID_SIZE,
marginRight:1},

node:item.node,
isSelected:
_this.state.selected[item.node.image.uri],

onPress:function onPress(uri,isSelected){
if(!isSelected){
_this.setState(function(oldState){
var selected=oldState.selected;
delete selected[uri];
return{selected:selected};
});
return true;
}
var count=0;
for(var _iterator3=Object.keys(_this.state.selected),_isArray3=Array.isArray(_iterator3),_i3=0,_iterator3=_isArray3?_iterator3:_iterator3[typeof Symbol==='function'?typeof Symbol==='function'?typeof Symbol==='function'?Symbol.iterator:'@@iterator':'@@iterator':'@@iterator']();;){var _ref4;if(_isArray3){if(_i3>=_iterator3.length)break;_ref4=_iterator3[_i3++];}else{_i3=_iterator3.next();if(_i3.done)break;_ref4=_i3.value;}var key=_ref4;
if(_this.state.selected[key]==true){
count=count+1;
}
}
if(count>=_this.props.maxSelection){
_reactNative.Alert.alert(
'You select too many photos','You cannot select more than '+
_this.props.maxSelection+' photos.',
[
{text:'OK',
onPress:function onPress(){
_this.forceUpdate();
},
style:'cancel'}]);



return false;
}
_this.setState(function(oldState){
return{
selected:_extends({},
oldState.selected,_defineProperty({},
uri,isSelected))};


});
return true;
},__source:{fileName:_jsxFileName,lineNumber:234}})));


};_this.state={connectingAlbum:true,isLoadingNext:false,hasNextPage:false,endCursor:'',photos:[],selected:{},noPhotoPermission:false};_this._getPhotos();return _this;}_createClass(CameraRollList,[{key:'shouldComponentUpdate',value:function shouldComponentUpdate(nextProps,nextState){if(nextState.photos===this.state.photos&&nextState.noPhotoPermission===this.state.noPhotoPermission){return false;}return true;}},{key:'render',value:function render()
{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1},__source:{fileName:_jsxFileName,lineNumber:290}},
_react2.default.createElement(_reactNative.FlatList,{
numColumns:4,
columnWrapperStyle:{
flexDirection:'row',

marginBottom:1},

ListHeaderComponent:this._renderHeader,
ListFooterComponent:this._renderFooter,
renderItem:this._renderItem,
data:[
{
node:{
image:{
uri:'camera'}}}].concat(_toConsumableArray(


this.state.photos)),
keyExtractor:function keyExtractor(item,index){return item.node.image.uri;},
onEndReachedThreshold:0.5,
onEndReached:function onEndReached(){
if(_this2.state.hasNextPage){
_this2._getNextPage();
}
},__source:{fileName:_jsxFileName,lineNumber:291}}),

_react2.default.createElement(_Modal.Modal,_extends({
ref:function ref(camera){_this2._cameraView=camera;},
dismissOnHardwareBackPress:true,
contextOpacity:0.5,
contextColor:'#000',
dismissOnTouchOutside:true,
contextOnPress:function contextOnPress(){},
animationDuration:300},
this.props,{__source:{fileName:_jsxFileName,lineNumber:317}}),

_react2.default.createElement(_CameraView.CameraView,{
onClose:function onClose(){
_this2._cameraView.dismiss();
},
onFinish:function onFinish(){

},__source:{fileName:_jsxFileName,lineNumber:327}}))));




}}]);return CameraRollList;}(_react.Component);


CameraRollList.propTypes={
maxSelection:_propTypes2.default.number,
onFinishCapture:_propTypes2.default.func};

CameraRollList.defaultProps={
maxSelection:1,
onFinishCapture:function onFinishCapture(){}};exports.default=

CameraRollList;