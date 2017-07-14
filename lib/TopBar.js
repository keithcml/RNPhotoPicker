Object.defineProperty(exports,"__esModule",{value:true});exports.TopBar=undefined;var _jsxFileName='src/TopBar.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _propTypes=require('prop-types');var _propTypes2=_interopRequireDefault(_propTypes);
var _reactNative=require('react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var








TopBar=exports.TopBar=function(_Component){_inherits(TopBar,_Component);function TopBar(){_classCallCheck(this,TopBar);return _possibleConstructorReturn(this,(TopBar.__proto__||Object.getPrototypeOf(TopBar)).apply(this,arguments));}_createClass(TopBar,[{key:'render',value:function render()
{
return(
_react2.default.createElement(_reactNative.View,{style:styles.defaultTopBar,__source:{fileName:_jsxFileName,lineNumber:17}},
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.touchable,activeOpacity:0.7,onPress:this.props.onClose,__source:{fileName:_jsxFileName,lineNumber:18}},
_react2.default.createElement(_reactNative.Text,{style:[styles.touchableText,{color:this.props.tintColor}],__source:{fileName:_jsxFileName,lineNumber:19}},'Close')),


this.props.maxSelection>1?
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.touchable,activeOpacity:0.7,onPress:this.props.onDone,__source:{fileName:_jsxFileName,lineNumber:23}},
_react2.default.createElement(_reactNative.Text,{style:[styles.touchableText,{color:this.props.tintColor}],__source:{fileName:_jsxFileName,lineNumber:24}},'Done')):

null,

_react2.default.createElement(_reactNative.View,{style:styles.hairline,__source:{fileName:_jsxFileName,lineNumber:28}})));


}}]);return TopBar;}(_react.Component);


TopBar.propTypes={
onClose:_propTypes2.default.func.isRequired,
onDone:_propTypes2.default.func.isRequired};


var styles=_reactNative.StyleSheet.create({
defaultTopBar:{
width:_reactNative.Dimensions.get('window').width,
height:_reactNative.Platform.OS==='ios'?64:50,
backgroundColor:'white',
justifyContent:'space-between',
flexDirection:'row',
alignItems:'flex-end'},

hairline:{
position:'absolute',
height:1,
bottom:0,
left:0,
right:0,
backgroundColor:'lightgray'},

touchable:{
height:40,
marginVertical:2,
marginHorizontal:4},

touchableText:{
fontSize:16,
padding:8}});