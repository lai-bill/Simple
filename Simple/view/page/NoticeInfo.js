'use strict'
var React = require("react-native");
var {
	View,
	Text,
	ScrollView,
	StyleSheet
} = React;
var Dimensions = require("Dimensions");
var TabBar = require("../uiplug/TabBar");

var NoticeInfo = React.createClass({
	getInitialState: function() {
		return {
			item: null
		}
	},
	render: function() {

		var viewDOM = null;

		if (!this.state.item) {
			viewDOM = <View><Text>加载中……</Text></View>
		} else {
			viewDOM = <View>
						<Text style={styles.content}>{this.state.item.content}</Text>
						<View style={styles.footLayot}>
							<View style={{flex: 4}}></View>
							<View style={styles.footView}>
								<Text style={styles.footText}>{this.state.item.author}</Text>
								<Text style={styles.footText}>{this.state.item.date}</Text>
							</View>
						</View>
					  </View>
		}

		return (
			<View>
				<TabBar bgColor="#3394FA" navigator={this.props.navigator} />
				<ScrollView style={[styles.infoLayout, {height: Dimensions.get('window').height - 66}]}>
					{viewDOM}
				</ScrollView>
			</View>
		);
	},
	componentWillMount: function() {
		var that = this;
		fetch("https://raw.githubusercontent.com/lai-bill/Simple/master/Simple/data/NoticeInfo")
			.then((response) => response.text())
			.then((responseText) => {
				var items = JSON.parse(responseText).content;

				items.forEach(function(item) {
					if (item.id == that.props.id) {
						that.setState({
							item: item
						})
					}
				});
			});
	}
})

var styles = StyleSheet.create({
	infoLayout: {
		padding:10,
		paddingTop: 15
	},
	content: {
		fontSize: 16,
		color: '#575757'
	},
	footLayot: {
		flexDirection: 'row',
		paddingTop: 20
	},
	footView: {
		flex: 1,
	},
	footText: {
		fontSize: 14,
		color: '#3395FB'
	}
})

module.exports = NoticeInfo;