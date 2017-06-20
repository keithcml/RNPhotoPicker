Object.defineProperty(exports,"__esModule",{value:true});exports.CameraView=undefined;var _jsxFileName='src/CameraView.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNative=require('react-native');






var _reactNativeCamera=require('react-native-camera');var _reactNativeCamera2=_interopRequireDefault(_reactNativeCamera);
var _CameraIcon=require('./CameraIcon');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=
_reactNative.Dimensions.get('window'),width=_Dimensions$get.width;var

CameraView=exports.CameraView=function(_Component){_inherits(CameraView,_Component);

function CameraView(props){_classCallCheck(this,CameraView);var _this=_possibleConstructorReturn(this,(CameraView.__proto__||Object.getPrototypeOf(CameraView)).call(this,
props));_this.





_takePicture=function(){
var options={};

_this.camera.capture({
metadata:options}).

then(function(data){return console.log(data);}).
catch(function(err){return console.error(err);});
};_this.state={preview:false};return _this;}_createClass(CameraView,[{key:'render',value:function render()

{var _this2=this;var
outputImageAspectRatio=this.props.outputImageAspectRatio;
var height=width*outputImageAspectRatio;
return(
_react2.default.createElement(_reactNative.View,{style:{backgroundColor:'black',flex:1,justifyContent:'center'},__source:{fileName:_jsxFileName,lineNumber:39}},
_react2.default.createElement(_reactNativeCamera2.default,{
ref:function ref(cam){
_this2._camera=cam;
},
keepAwake:true,
style:{width:width,height:height},
aspect:_reactNativeCamera2.default.constants.Aspect.fill,
flashMode:_reactNativeCamera2.default.constants.FlashMode.off,__source:{fileName:_jsxFileName,lineNumber:40}}),


!this.state.preview?
_react2.default.createElement(_reactNative.TouchableOpacity,{
activeOpacity:0.9,
style:styles.capture,
onPress:this._takePicture,__source:{fileName:_jsxFileName,lineNumber:51}},

_react2.default.createElement(_CameraIcon.CameraIcon,{__source:{fileName:_jsxFileName,lineNumber:56}})):


_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.touchableRight,activeOpacity:0.7,onPress:this.props.onFinish,__source:{fileName:_jsxFileName,lineNumber:59}},
_react2.default.createElement(_reactNative.Text,{style:[styles.touchableText],__source:{fileName:_jsxFileName,lineNumber:60}},'Choose')),



_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.touchableLeft,activeOpacity:0.7,onPress:this.props.onClose,__source:{fileName:_jsxFileName,lineNumber:64}},
_react2.default.createElement(_reactNative.Text,{style:[styles.touchableText],__source:{fileName:_jsxFileName,lineNumber:65}},'Close'))));



}}]);return CameraView;}(_react.Component);

CameraView.propTypes={
onClose:_propTypes2.default.func.isRequired,
onFinish:_propTypes2.default.func.isRequired};

CameraView.defaultProps={
onClose:function onClose(){},
onFinish:function onFinish(){}};


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
padding:8}});