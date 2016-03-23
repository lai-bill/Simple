'use strict'
var React = require("react-native");

var {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity
} = React;

var List = require("../uiplug/List");
var Dimensions = require("Dimensions");
var UpdPwd = require("./UpdPwd");
var Module_Alert = require("../uiplug/Module_Alert")

var Manage = React.createClass({

	getInitialState: function() {
		return {
			data: [
				null, {
					id: "upd_pwd",
					icon: require("../../public/img/user_u.png"),
					text: "修改密码",
					click: this.jumpPage
				}, {
					id: "add_user",
					icon: require("../../public/img/user_a.png"),
					text: "增加联系人",
					click: this.jumpPage
				}, {
					id: "del_user",
					icon: require("../../public/img/user_d.png"),
					text: "删除联系人",
					click: this.jumpPage
				}, {
					id: "add_notice",
					icon: require("../../public/img/user_m.png"),
					text: "发布公告",
					click: this.jumpPage
				}, null, {
					id: "quit_login",
					icon: require("../../public/img/user_q.png"),
					text: "退出登录",
					click: this.jumpPage
				}
			],
			views: [],
			info: ""
		}
	},
	render: function() {
		return (
			<View>
				<View style={{backgroundColor: '#F5F5F5'}}>
					<List 
						data={this.state.views} 
						height={Dimensions.get('window').height - 66 - 64} />
				</View>
			</View>
		);
	},
	componentWillMount: function() {
		var views = [];
		var that = this;
		this.state.data.forEach(function(item) {
			views.push(that.packageView(item));
		});

		this.setState({
			views: views
		});
	},
	packageView: function(item) {

		if (!item) 
			return <View style={{height: 5}} />

		return {view: (
			<TouchableOpacity onPress={() => item.click(item.id)} key={item.id} style={{flexDirection: 'row'}}>
				<Image source={item.icon} style={{height: 18, width: 18, marginRight: 15}} />
				<Text style={{color: '#191919'}}>{item.text}</Text>
			</TouchableOpacity>
		), css: [{backgroundColor: '#ffffff'}]};

	},
	jumpPage: function(id) {
		var componentDOM = null;
		var title = "";
		if (id === "upd_pwd") {
			componentDOM = UpdPwd;
			title = "修改密码";
		} else {
			alert({info: '暂未开放'});
		}

		this.props.navigator.push({
			title: title,
			component: componentDOM,
			name: id,
			params: {
				navigator: this.props.navigator
			}
		});
	}
})


var styles = StyleSheet.create({
	
});

module.exports = Manage;