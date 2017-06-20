Object.defineProperty(exports,"__esModule",{value:true});exports.CameraIcon=undefined;var _jsxFileName='src/CameraIcon.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

CameraIcon=exports.CameraIcon=function(_Component){_inherits(CameraIcon,_Component);function CameraIcon(){_classCallCheck(this,CameraIcon);return _possibleConstructorReturn(this,(CameraIcon.__proto__||Object.getPrototypeOf(CameraIcon)).apply(this,arguments));}_createClass(CameraIcon,[{key:'render',value:function render()
{
return(
_react2.default.createElement(_reactNative.View,{
style:{
width:30,height:30,borderRadius:8,
backgroundColor:'white',
justifyContent:'center',alignItems:'center'},__source:{fileName:_jsxFileName,lineNumber:9}},


_react2.default.createElement(_reactNative.View,{
style:{
width:18,height:18,borderRadius:9,
backgroundColor:'black',
justifyContent:'center',alignItems:'center'},__source:{fileName:_jsxFileName,lineNumber:16}}),


_react2.default.createElement(_reactNative.View,{
style:{
width:4,height:4,borderRadius:2,
backgroundColor:'black',
position:'absolute',top:3,right:3},__source:{fileName:_jsxFileName,lineNumber:23}})));




}}]);return CameraIcon;}(_react.Component);