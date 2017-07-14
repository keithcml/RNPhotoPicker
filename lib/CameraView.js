Object.defineProperty(exports,"__esModule",{value:true});exports.CameraView=undefined;var _jsxFileName='src/CameraView.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNative=require('react-native');







var _reactNativeFs=require('react-native-fs');var _reactNativeFs2=_interopRequireDefault(_reactNativeFs);
var _reactNativeCamera=require('react-native-camera');var _reactNativeCamera2=_interopRequireDefault(_reactNativeCamera);
var _CameraIcon=require('./CameraIcon');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=
_reactNative.Dimensions.get('window'),width=_Dimensions$get.width;var

CameraView=exports.CameraView=function(_Component){_inherits(CameraView,_Component);

function CameraView(props){_classCallCheck(this,CameraView);var _this=_possibleConstructorReturn(this,(CameraView.__proto__||Object.getPrototypeOf(CameraView)).call(this,
props));_this.






_takePicture=function(){
_this._camera.capture({
metadata:{},
jpegQuality:90}).

then(function(_ref){var path=_ref.path,size=_ref.size;
_this.setState({
isPreviewing:true,
previewURI:path});

}).
catch(function(err){return console.error(err);});
};_this.

_onCancel=function(){
if(_this.state.isPreviewing){
_this.setState({
isPreviewing:false,
previewURI:null});

}else
{
_this.props.onClose();
}
};_this.

_onChoose=function(){
_this.props.onFinish(_this.state.previewURI);
};_this.state={isPreviewing:false,previewURI:null};return _this;}_createClass(CameraView,[{key:'render',value:function render()

{var _this2=this;var
outputImageAspectRatio=this.props.outputImageAspectRatio;
var height=width*outputImageAspectRatio;
return(
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'black',flex:1,justifyContent:'center'},__source:{fileName:_jsxFileName,lineNumber:62}},
_react2.default.createElement(_reactNativeCamera2.default,{
ref:function ref(cam){
_this2._camera=cam;
},
keepAwake:true,
style:{width:width,height:height},
aspect:_reactNativeCamera2.default.constants.Aspect.fill,
captureTarget:_reactNativeCamera2.default.constants.CaptureTarget.temp,
flashMode:_reactNativeCamera2.default.constants.FlashMode.off,__source:{fileName:_jsxFileName,lineNumber:63}}),


this.state.isPreviewing?
_react2.default.createElement(_reactNative.View,{style:styles.previewPos,__source:{fileName:_jsxFileName,lineNumber:75}},
_react2.default.createElement(_reactNative.Image,{
style:[styles.previewContent,{width:width,height:width*outputImageAspectRatio}],
source:{uri:this.state.previewURI},__source:{fileName:_jsxFileName,lineNumber:76}})):


null,


!this.state.isPreviewing?
_react2.default.createElement(_reactNative.TouchableOpacity,{
activeOpacity:0.9,
style:styles.capture,
onPress:this._takePicture,__source:{fileName:_jsxFileName,lineNumber:85}},

_react2.default.createElement(_CameraIcon.CameraIcon,{__source:{fileName:_jsxFileName,lineNumber:90}})):


_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.touchableRight,activeOpacity:0.7,onPress:this._onChoose,__source:{fileName:_jsxFileName,lineNumber:93}},
_react2.default.createElement(_reactNative.Text,{style:[styles.touchableText],__source:{fileName:_jsxFileName,lineNumber:94}},'Choose')),



_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.touchableLeft,activeOpacity:0.7,onPress:this._onCancel,__source:{fileName:_jsxFileName,lineNumber:98}},
_react2.default.createElement(_reactNative.Text,{style:[styles.touchableText],__source:{fileName:_jsxFileName,lineNumber:99}},'Cancel'))));



}}]);return CameraView;}(_react.Component);

CameraView.propTypes={
outputImageAspectRatio:_propTypes2.default.number,
onClose:_propTypes2.default.func.isRequired,
onFinish:_propTypes2.default.func.isRequired};

CameraView.defaultProps={
outputImageAspectRatio:1,
onClose:function onClose(){},
onFinish:function onFinish(uri){}};


var styles=_reactNative.StyleSheet.create({
capture:{
position:'absolute',
backgroundColor:'transparent',
alignSelf:'center',
bottom:32},

touchableLeft:{
position:'absolute',
bottom:16,
left:4,
height:40,
marginVertical:2,
marginHorizontal:4},

touchableRight:{
position:'absolute',
bottom:16,
right:4,
height:40,
marginVertical:2,
marginHorizontal:4},

touchableText:{
color:'white',
fontSize:16,
padding:8},

previewPos:{
position:'absolute',
top:0,
left:0,
right:0,
bottom:0,
justifyContent:'center',
alignItems:'stretch',
backgroundColor:'black'},

previewContent:{
alignSelf:'stretch'}});