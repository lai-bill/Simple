'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} = React;

var TabBar = React.createClass({
	render: function() {
		var back = null, rightText = null;
	 	back = <Text style={styles.tabTxt}>{'<<返回'}</Text>;

		if (this.props.rightText) 
			rightText = <Text style={[styles.tabTxt, {textAlign: 'right'}]}>{this.props.rightText}</Text>

		return (
			<View style={[styles.TabLayout, {backgroundColor: this.props.bgColor}]}>
				<TouchableOpacity 
					style={styles.labelTouch}
					onPress={back ? this.urlBack : null}>
					{back}
				</TouchableOpacity>
				<Text style={[styles.tabTxt, {flex: 5, textAlign: 'center'}]}>{this.props.title}</Text>
				<TouchableOpacity 
					style={styles.labelTouch} 
					onPress={rightText ? this.rightClick : null}>
					{rightText}
				</TouchableOpacity>
			</View>
		);
	},
	urlBack: function() {
		this.props.navigator.getCurrentRoutes().pop();
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