/*
 * TabBar: 顶部标题栏
 * 	@height: 66
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} = React;

var TabBar = React.createClass({
	getInitialState: function() {
		return {
			rightText: this.props.rightText ? 
							(<Text style={[styles.tabTxt, {textAlign: 'right'}]}>{this.props.rightText}</Text>) :
							null,
			title: this.props.title ?
							this.props.title : 
							this.props.navigator.getCurrentRoutes()[this.props.navigator.getCurrentRoutes().length - 1].title,
			back: this.props.navigator ? this.props.navigator.getCurrentRoutes().length > 1: null
		}
	},
	render: function() {
		var back = null, rightText = null, title = this.props.title;

		back = this.state.back ? (<Text style={styles.tabTxt}>{'<<返回'}</Text>) : back;
		rightText = this.state.rightText ? 
							(<Text style={[styles.tabTxt, {textAlign: 'right'}]}>{this.props.rightText}</Text>) : 
							rightText;
		title = title ? title : this.state.title;

		return (
			<View style={[styles.TabLayout, {backgroundColor: this.props.bgColor}]}>
				<TouchableOpacity 
					style={styles.labelTouch}
					onPress={back ? this.urlBack : null}>
					{back}
				</TouchableOpacity>
				<Text style={[styles.tabTxt, {flex: 5, textAlign: 'center'}]}>{title}</Text>
				<TouchableOpacity 
					style={styles.labelTouch} 
					onPress={rightText ? this.props.rightClick : null}>
					{rightText}
				</TouchableOpacity>
			</View>
		);
	},
	urlBack: function() {
		this.props.navigator.pop();
	}
});


var styles = StyleSheet.create({
	TabLayout: {
		padding: 10,
		marginBottom: 1,
		flexDirection: 'row'
	},
	tabTxt: {
		fontSize: 14,
		color: "#ffffff"
	},
	labelTouch: {
		flex: 1
	}
});

module.exports = TabBar;