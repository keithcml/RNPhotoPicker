

'use-strict';var _jsxFileName='src/CropView.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNative=require('react-native');







var _reactNativeImageCropper=require('react-native-image-cropper');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _Dimensions$get=

_reactNative.Dimensions.get('window'),width=_Dimensions$get.width,height=_Dimensions$get.height;var

CropView=function(_Component){_inherits(CropView,_Component);function CropView(){var _ref;var _temp,_this,_ret;_classCallCheck(this,CropView);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=CropView.__proto__||Object.getPrototypeOf(CropView)).call.apply(_ref,[this].concat(args))),_this),_this.

crop=function(){
_this.refs.cropper.crop().
then(function(base64){return console.log(base64);});
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(CropView,[{key:'render',value:function render()

{var
cropRatio=this.props.cropRatio;
var cropHeight=width*cropRatio;
return(
_react2.default.createElement(_reactNative.View,{style:{flex:1},__source:{fileName:_jsxFileName,lineNumber:30}},
_react2.default.createElement(_reactNativeImageCropper.ImageCrop,{
ref:'cropper',
image:this.state.image,
cropHeight:cropHeight,
cropWidth:width,
maxZoom:80,
minZoom:20,
panToMove:true,
pinchToZoom:true,__source:{fileName:_jsxFileName,lineNumber:31}}),

_react2.default.createElement(_reactNative.TouchableOpacity,{
style:{padding:1,alignSelf:'stretch',height:GRID_SIZE},
onPress:this.crop,__source:{fileName:_jsxFileName,lineNumber:41}},

_react2.default.createElement(_reactNative.Text,{__source:{fileName:_jsxFileName,lineNumber:45}},'OK'))));



}}]);return CropView;}(_react.Component);

CropView.propTypes={
cropRatio:_propTypes2.default.number};

CropView.defaultProps={
cropRatio:1};