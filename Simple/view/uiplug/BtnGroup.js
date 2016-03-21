'use strict'
var React = require("react-native");
var {
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} = React;

var BtnGroup = React.createClass({
	render: function() {
		var btns = [];
		this.props.btns.forEach(function(btn) {
			var desc = null;
			if (btn.desc) {
				desc = <Text style={styles.btnText}>{btn.desc}</Text>;
			}
			btns.push((
				<View style={[styles.btnLayout, {flex: 1}]}>
					<TouchableOpacity 
						style={[styles.btn, {backgroundColor: btn.color}]} 
						onPress={() => btn.callback(btn.key)}>
						<Text style={styles.btnTitle}>{btn.title}</Text>
						{desc}
					</TouchableOpacity>
				</View>
			));
		});

		if (this.props.colum) {
			for (var i = btns.length; i < this.props.colum; i++) 
				btns.push(<View style={[styles.btnLayout, {flex: 1}]}></View>)
		}

		return (
			<View style={styles.btnGroup}>{btns}</View>
		);
	}
});

var styles = StyleSheet.create({
	btnGroup: {
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row'
	},
	btnLayout: {
		margin: 5
	},
	btn: {
		borderRadius: 5,
		backgroundColor: "#3394FA",
		paddingTop:15,
		paddingBottom: 15,
		paddingLeft: 5,
		paddingRight: 5,
		height: 90,
		justifyContent: 'center'

	},
	btnTitle: {
		fontSize: 20,
		color: "#ffffff",
		textAlign: 'center',
	},
	btnText: {
		fontSize: 12,
		color: "#ffffff",
		textAlign: 'center'
	}
})


module.exports = BtnGroup;