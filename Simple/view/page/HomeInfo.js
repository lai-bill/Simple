'use strict'

var React = require('react-native');
var TabBar = require("../uiplug/TabBar");
var Dimensions = require("Dimensions");
var {
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} = React;


var List = require("../uiplug/List");

var HomeInfo = React.createClass({
	getInitialState: function() {
		return {
			data: [],
			page: 1,
			pageCount: 5
		}
	},
	componentDidMount: function() {
		this.requestData(this.state.page);
	},
	render: function() {
		return (
			<View>
				<TabBar bgColor="#3394FA" navigator={this.props.navigator} />
				<List 
					data={this.state.data} 
					height={Dimensions.get('window').height - 66} 
					refresh={this.refresh} 
					loadding={this.loadding}/>
			</View>
		);
	},
	refresh: function(callback) {
		this.state.page = 1;
		this.requestData(this.state.page, callback, true);
	},
	loadding: function(callback) {
		this.state.page += 1;
		this.requestData(this.state.page, callback, false);
	},
	requestData: function(page, callback, refer) {
		var that = this;
		var start = (page - 1) * that.state.pageCount;
		var end = page * that.state.pageCount;

		if (!refer && that.data) {
			if (start > that.data.length) return callback(500);
			if (end > that.data.length) end = that.data.length;

			that.setState({
				data: this.state.data.concat(that.data.slice(start, end))
			})
			return callback(200);
		}



		fetch("https://raw.githubusercontent.com/lai-bill/Simple/master/Simple/data/HomeInfo")
			.then((response) => response.text())
			.then((responseText) => {
				var data = JSON.parse(responseText).content;
				var views = [];
				data.forEach(function(item) {
					views.push(that.packageView(item));
				})
				that.data = views;
				if (end > views.length) end = views.length;
				
				that.setState({
					data: views.slice(start, end)
				});

				callback && callback();
			})
			.catch((error) => {
				alert(error);
			})
	},
	packageView: function(item) {
		var index = item.name.substring(0, 1);
		return (
			<View style={styles.itemLayout} key={item.name}>
				<View style={styles.itemBtn}>
					<Text style={styles.itemTitle}>{index}</Text>
				</View>
				<View style={styles.info}>
					<Text style={styles.name}>{item.name}</Text>
					<Text style={styles.desc}>{item.type + '-' + item.desc}</Text>
				</View>
				<View style={styles.basic}>
					<Text style={styles.pr}>{item.iphone}</Text>
					<Text>{item.email}</Text>
				</View>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	itemLayout: {
		flexDirection: 'row'
	},
	itemBtn: {
		borderRadius: 5,
		alignItems: 'center',
		backgroundColor: '#45ACC6',
		justifyContent: 'center',
		flex: 1.5,
		paddingTop: 10,
		paddingBottom: 10,
		marginRight: 15
	},
	itemTitle: {
		fontSize: 30,
		color: '#ffffff'
	},
	info: {
		flex: 3,
		paddingTop: 10
	},
	name: {
		fontSize: 16,
		color: '#4B4B4B'
	}, 
	basic: {
		flex: 2,
		paddingTop: 10
	},
	desc: {
		fontSize: 14,
		color: '#6E6D6D'
	},
	pr: {
		color: '#66C6FC',
		fontSize: 14
	}
	
});

module.exports = HomeInfo;