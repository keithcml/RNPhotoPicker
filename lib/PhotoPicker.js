

'use-strict';Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _jsxFileName='src/PhotoPicker.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNative=require('react-native');







var _TopBar=require('./TopBar');
var _CameraRollList=require('./CameraRollList');var _CameraRollList2=_interopRequireDefault(_CameraRollList);
var _PresentationContext=require('./PresentationContext');var _PresentationContext2=_interopRequireDefault(_PresentationContext);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var BACK_PRESS_EVENT='hardwareBackPress';var

PhotoPicker=function(_Component){_inherits(PhotoPicker,_Component);





function PhotoPicker(props){_classCallCheck(this,PhotoPicker);var _this=_possibleConstructorReturn(this,(PhotoPicker.__proto__||Object.getPrototypeOf(PhotoPicker)).call(this,
props));_initialiseProps.call(_this);
var pickerState=props.mode==='modal'?'closed':'opened';

_this.state={
pickerState:pickerState,
translationAnimated:new _reactNative.Animated.Value(0)};return _this;

}_createClass(PhotoPicker,[{key:'componentDidMount',value:function componentDidMount()

{var
mode=this.props.mode;
if(mode==='modal'){
_reactNative.BackHandler.addEventListener(BACK_PRESS_EVENT,this._backEventHandler);
}
}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
_reactNative.BackHandler.removeEventListener(BACK_PRESS_EVENT);
}},{key:'show',value:function show()

















































{var
onShowed=this.props.onShowed;
this._togglePicker(1,onShowed);
}},{key:'dismiss',value:function dismiss()

{var
onDismissed=this.props.onDismissed;
this._togglePicker(0,onDismissed);
}},{key:'render',value:function render()

{var _props=
this.props,mode=_props.mode,containerStyle=_props.containerStyle;
if(mode==='child'){
return(
_react2.default.createElement(_reactNative.View,{style:containerStyle,__source:{fileName:_jsxFileName,lineNumber:110}},
_react2.default.createElement(_CameraRollList2.default,_extends({},this.props,{__source:{fileName:_jsxFileName,lineNumber:111}}))));


}var _props2=
this.props,width=_props2.width,height=_props2.height,animationDuration=_props2.animationDuration,contextColor=_props2.contextColor,contextOpacity=_props2.contextOpacity,show=_props2.show,contextOnPress=_props2.contextOnPress;var _state=
this.state,translationAnimated=_state.translationAnimated,pickerState=_state.pickerState;
var screenHeight=_reactNative.Dimensions.get('window').height;
var hidden=pickerState==='closed'?styles.hidden:null;
var yPosition=translationAnimated.interpolate({
inputRange:[0,1],
outputRange:[screenHeight,0],
extrapolate:'clamp'});

return(
_react2.default.createElement(_reactNative.View,{style:[styles.container,containerStyle,hidden],__source:{fileName:_jsxFileName,lineNumber:125}},
_react2.default.createElement(_PresentationContext2.default,{
backgroundColor:contextColor,
opacity:contextOpacity,
animationDuration:animationDuration,
showContext:pickerState==='opened',
onPress:contextOnPress,__source:{fileName:_jsxFileName,lineNumber:126}}),

_react2.default.createElement(_reactNative.Animated.View,{
style:[
styles.pickerContainer,
{transform:[{translateY:yPosition}]}],__source:{fileName:_jsxFileName,lineNumber:133}},


_react2.default.createElement(_reactNative.View,{style:{width:width,height:height},__source:{fileName:_jsxFileName,lineNumber:139}},
this._renderPickerTopBar(),
_react2.default.createElement(_CameraRollList2.default,_extends({},this.props,{__source:{fileName:_jsxFileName,lineNumber:141}}))))));




}}]);return PhotoPicker;}(_react.Component);var _initialiseProps=function _initialiseProps(){var _this2=this;this._backEventHandler=function(){var dismissOnHardwareBackPress=_this2.props.dismissOnHardwareBackPress;var pickerState=_this2.state.pickerState;if(dismissOnHardwareBackPress&&pickerState==='opened'){_this2.dismiss();return true;}return false;};this._togglePicker=function(flag){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){};var pickerState=flag===0?'animating':'opened';var toValue=flag;_this2.setState({pickerState:pickerState},function(){_reactNative.Animated.timing(_this2.state.translationAnimated,{toValue:toValue,duration:_this2.props.animationDuration}).start(function(completion){if(!completion.finished){var rollBack=flag===0?1:0;_this2.state.translationAnimated.setValue(rollBack);}if(pickerState==='animating'){_this2.setState({pickerState:'closed'});}});});};this._renderPickerTopBar=function(){var _props3=_this2.props,showTopBar=_props3.showTopBar,topBarComponent=_props3.topBarComponent;if(!showTopBar)return null;if(topBarComponent===null){return _react2.default.createElement(_TopBar.TopBar,_extends({},_this2.props,{onClose:function onClose(){_this2.dismiss();},__source:{fileName:_jsxFileName,lineNumber:88}}));}else{return topBarComponent;}};};


PhotoPicker.propTypes={

tintColor:_propTypes2.default.string,
mode:_propTypes2.default.oneOf(['child','modal']),
showTopBar:_propTypes2.default.bool,
topBarComponent:_propTypes2.default.element,
containerStyle:_propTypes2.default.object,


contextOpacity:_propTypes2.default.number,
contextColor:_propTypes2.default.string,
dismissOnTouchOutside:_propTypes2.default.bool,
contextOnPress:_propTypes2.default.func,
animationDuration:_propTypes2.default.number,
width:_propTypes2.default.number,
height:_propTypes2.default.number,
dismissOnHardwareBackPress:_propTypes2.default.bool,
onShowed:_propTypes2.default.func,
onDismissed:_propTypes2.default.func,
show:_propTypes2.default.bool,

outputImageAspectRatio:_propTypes2.default.number,
hasCamera:_propTypes2.default.bool,
maxSelection:_propTypes2.default.number,
onFinishCapture:_propTypes2.default.func};

PhotoPicker.defaultProps={

tintColor:'white',
mode:'modal',
showTopBar:true,
topBarComponent:null,
containerStyle:{},

contextOpacity:0.5,
contextColor:'#000',
dismissOnTouchOutside:true,
contextOnPress:function contextOnPress(){},
animationDuration:300,
width:_reactNative.Dimensions.get('window').width,
height:_reactNative.Dimensions.get('window').height,
dismissOnHardwareBackPress:true,
onShowed:function onShowed(){},
onDismissed:function onDismissed(){},
show:false,

outputImageAspectRatio:1,
hasCamera:true,
maxSelection:1,
onFinishCapture:function onFinishCapture(){}};exports.default=

PhotoPicker;

var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
position:'absolute',
top:0,
left:0},

hidden:{
top:-10000,
left:0,
height:0,
width:0},

pickerContainer:{
flex:1,
justifyContent:'flex-end',
backgroundColor:'white'}});