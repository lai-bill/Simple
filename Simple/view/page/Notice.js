'use strict'

var React = require("react-native");
var Dimensions = require("Dimensions");
var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} = React;

var List = require("../uiplug/List");
var NoticeInfo = require("./NoticeInfo");
var TabBar = require("../uiplug/TabBar");

var Notice = React.createClass({
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



		fetch("https://raw.githubusercontent.com/lai-bill/Simple/master/Simple/data/NoticeInfo")
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
		var index = item.author.substring(0, 1);
		return (
			<TouchableOpacity style={styles.itemLayout} key={item.author} onPress={() => this.jumpInfo(item.id)}>
				<View style={styles.itemBtn}>
					<Text style={styles.itemTitle}>{index}</Text>
				</View>
				<View style={styles.info}>
					<Text style={styles.name} numberOfLines={2}>{item.content}</Text>
					<Text style={styles.date}>{item.date}</Text>
				</View>
				<View style={styles.basic}>
					<Text style={{textAlign: 'right'}}>{item.author}</Text>
				</View>
			</TouchableOpacity>
		);
	},
	jumpInfo: function(id) {
		this.props.navigator.push({
			title: '消息详情',
			component: NoticeInfo,
			name: 'NoticeInfo',
			params: {
				id: id,
				navigator: this.props.navigator
			}
		})
	}

});


var styles = StyleSheet.create({
	itemLayout: {
		flexDirection: 'row'
	},
	itemBtn: {
		borderRadius: 5,
		alignItems: 'center',
		backgroundColor: '#57B648',
		justifyContent: 'center',
		flex: 1,
		paddingTop: 12,
		paddingBottom: 12,
		marginRight: 15
	},
	itemTitle: {
		fontSize: 24,
		color: '#ffffff'
	},
	info: {
		flex: 4,
	},
	name: {
		fontSize: 14,
		color: '#575757'
	}, 
	basic: {
		flex: 1,
		paddingTop: 10,
	},
	date: {
		fontSize: 12,
		color: '#D1D1D1'
	},
	pr: {
		color: '#66C6FC',
		fontSize: 14
	}
	
});


module.exports = Notice;