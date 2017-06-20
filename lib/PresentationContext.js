

'use-strict';Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/PresentationContext.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

PresentationContext=function(_Component){_inherits(PresentationContext,_Component);




function PresentationContext(props){_classCallCheck(this,PresentationContext);var _this=_possibleConstructorReturn(this,(PresentationContext.__proto__||Object.getPrototypeOf(PresentationContext)).call(this,
props));
_this.state={
opacityAnimated:new _reactNative.Animated.Value(0)};return _this;

}_createClass(PresentationContext,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){
if(this.props.showContext!==nextProps.showContext){
var toValue=nextProps.showContext?nextProps.opacity:0;
_reactNative.Animated.timing(this.state.opacityAnimated,{
toValue:toValue,
duration:this.props.animationDuration}).
start();
}
}},{key:'render',value:function render()

{var _props=
this.props,onPress=_props.onPress,backgroundColor=_props.backgroundColor;var
opacityAnimated=this.state.opacityAnimated;
return(
_react2.default.createElement(_reactNative.Animated.View,{
style:[styles.overlay,{backgroundColor:backgroundColor,opacity:opacityAnimated}],__source:{fileName:_jsxFileName,lineNumber:34}},

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:onPress,style:[styles.overlay],activeOpacity:1,__source:{fileName:_jsxFileName,lineNumber:37}})));


}}]);return PresentationContext;}(_react.Component);

PresentationContext.propTypes={
backgroundColor:_propTypes2.default.string,
opacity:_propTypes2.default.number,
animationDuration:_propTypes2.default.number,
showContext:_propTypes2.default.bool,
onPress:_propTypes2.default.func};

PresentationContext.defaultProps={
backgroundColor:'#000',
opacity:0.5,
animationDuration:0.5,
showContext:false,
onPress:function onPress(){}};exports.default=

PresentationContext;

var styles=_reactNative.StyleSheet.create({
overlay:{
flex:1,
top:0,
left:0,
position:'absolute'}});