'use strict'
var React = require("react-native");
var Dimensions = require("Dimensions");
var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} = React;

var Module_Alert = React.createClass({

	getInitialState: function() {
		return {
			code: this.props.code,
			info: this.props.info,
			click: false
		}
	},

	render: function() {
		var operDOM = null;

		if (!this.state.click) {
			this.state.code = this.props.code
			this.state.info = this.props.info
		}


		if (!this.state.info) return (<View></View>);
		if (this.state.code == 0) {
			operDOM = (
						<View style={styles.operLayout}>
							<TouchableOpacity style={styles.quest} onPress={() => this.questClick(true)}>
								<Text style={[styles.questText, {color: this.props.textColor}]}>确认</Text>
							</TouchableOpacity>
						</View>
					  );
		} else if (this.props.code == 1) {
			operDOM = (<View style={styles.operLayout}>
							<TouchableOpacity style={styles.quest} onPress={() => this.questClick(true)}>
								<Text style={[styles.questText, {color: this.props.textColor}]}>确认</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.quest} onPress={() => this.questClick(false)}>
								<Text style={styles.questText}>取消</Text>
							</TouchableOpacity>
					  </View>);
		};

		return (
			<View style={[
							styles.module_layout, 
							{height: Dimensions.get('window').height}, 
							{width: Dimensions.get('window').width}
						]}>
				<View style={styles.contentLayout}>
					<Text style={styles.info}>{this.state.info}</Text>
					{operDOM}
				</View>
			</View>
		);
	},
	questClick: function(alert_bool) {
		this.setState({
			info: "",
			click: true
		});
		var that = this;
		setTimeout(function(){
			that.state.click = false;
			that.props.quitCall && that.props.quitCall(alert_bool);
		})
	}
});

var styles = StyleSheet.create({
	module_layout: {
		position: 'absolute',
		backgroundColor: 'rgba(0,0,0,0.6)',
		top: 0,
		left: 0,
		height: 500,
		alignItems: 'center',
		justifyContent: 'center'
	},
	contentLayout: {
		backgroundColor: '#ffffff',
		borderRadius: 5,
		width: 300,
		paddingTop:20,
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 30,
		marginTop: -20
	},
	operLayout: {
		flexDirection: 'row',
		alignItems: 'center'

	},
	info: {
		fontSize: 13,
		color: '#0A0A0A',
	},
	quest: {
		paddingTop: 15,
		flex: 1,
	},
	questText: {
		fontSize: 14,
		color: '#030303',
		textAlign: 'center',
	}
})

module.exports = Module_Alert;