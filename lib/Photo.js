

'use-strict';Object.defineProperty(exports,"__esModule",{value:true});exports.Photo=undefined;var _jsxFileName='src/Photo.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var









Photo=exports.Photo=function(_PureComponent){_inherits(Photo,_PureComponent);
function Photo(props){_classCallCheck(this,Photo);var _this=_possibleConstructorReturn(this,(Photo.__proto__||Object.getPrototypeOf(Photo)).call(this,
props));var
isSelected=_this.props.isSelected;
_this.state={
isSelected:isSelected};return _this;

}_createClass(Photo,[{key:'render',value:function render()
{var _this2=this;var _props=
this.props,_onPress=_props.onPress,isSelected=_props.isSelected,node=_props.node,containerStyle=_props.containerStyle,size=_props.size;
return(
_react2.default.createElement(_reactNative.TouchableOpacity,{
style:containerStyle,
onPress:function onPress(){
var value=!_this2.state.isSelected;
_this2.setState({
isSelected:value});

if(!_onPress(node.image.uri,value)){
_this2.setState({
isSelected:!value});

}
},
activeOpacity:0.7,__source:{fileName:_jsxFileName,lineNumber:27}},

_react2.default.createElement(_reactNative.Image,{style:{flex:1,width:size,height:size,backgroundColor:'whitesmoke'},source:{uri:node.image.uri},__source:{fileName:_jsxFileName,lineNumber:42}}),

this.state.isSelected?
_react2.default.createElement(_reactNative.View,{
style:{
position:'absolute',right:0,bottom:0,
width:20,height:20,
backgroundColor:'blue',
justifyContent:'center',
alignItems:'center'},__source:{fileName:_jsxFileName,lineNumber:45}}):



null));



}}]);return Photo;}(_react.PureComponent);

Photo.propTypes={
size:_propTypes2.default.number,
containerStyle:_propTypes2.default.object,
node:_propTypes2.default.object,
isSelected:_propTypes2.default.bool,
onPress:_propTypes2.default.func};

Photo.defaultProps={
size:50,
containerStyle:{},
isSelected:false,
onPress:function onPress(){}};